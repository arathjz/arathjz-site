# Remix Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the existing Vite + React Router SPA to Remix with SSR, Netlify adapter, and native meta/loader support — eliminating the custom prerender script.

**Architecture:** Remix with Vite, file-based routing (`app/routes/`), server-side loaders that read markdown from `content/blog/` via `fs`, Remix `meta` exports for per-route SEO, and `@netlify/remix-adapter` for deployment. The existing Tailwind CSS theme system, components, and visual design remain unchanged.

**Tech Stack:** Remix (with Vite), React 18, TypeScript, Tailwind CSS 3, react-markdown, remark-gfm, front-matter, @netlify/remix-adapter

---

## File Structure

```
app/
  root.tsx               — Root layout (html shell, head, nav, footer, theme script)
  routes/
    _index.tsx           — Home page (/)
    blog._index.tsx      — Blog listing (/blog)
    blog.$slug.tsx       — Individual blog post (/blog/:slug)
  components/
    ThemeToggle.tsx       — Dark/light mode toggle (client component)
    RecentPosts.tsx       — Recent posts teaser for home page
  lib/
    posts.server.ts      — Load and parse markdown blog posts (server-only)
  index.css              — Tailwind + CSS variables + typography tokens (unchanged)
content/
  blog/
    hello-world.md       — Existing blog post (unchanged)
vite.config.ts           — Remix Vite plugin + Netlify plugin
tailwind.config.js       — Unchanged
postcss.config.js        — Unchanged
tsconfig.json            — Updated for Remix
```

**Files to delete after migration:**
- `src/` (entire directory — replaced by `app/`)
- `index.html` (Remix manages its own HTML shell via `root.tsx`)
- `scripts/prerender.js` (Remix SSR replaces this)
- `src/main.tsx`, `src/App.tsx` (entry points replaced by Remix)

---

### Task 1: Install Remix dependencies and configure Vite

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install Remix packages**

Run:
```bash
pnpm add @remix-run/node @remix-run/react @remix-run/serve react-router
pnpm add -D @remix-run/dev @netlify/remix-adapter vite-tsconfig-paths
pnpm remove @vitejs/plugin-react react-router-dom
```

Note: Remix v2 re-exports react-router, so `react-router-dom` is replaced by `@remix-run/react` and `react-router`.

- [ ] **Step 2: Update vite.config.ts**

Replace the entire file with:

```typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    netlifyPlugin(),
  ],
});
```

- [ ] **Step 3: Update tsconfig.json**

Replace with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "~/*": ["./app/*"]
    }
  },
  "include": ["app", "content"]
}
```

- [ ] **Step 4: Delete tsconfig.node.json**

```bash
rm tsconfig.node.json
```

This was only needed for the old Vite config reference setup.

- [ ] **Step 5: Update package.json scripts**

Replace the `scripts` section:

```json
{
  "scripts": {
    "dev": "remix vite:dev",
    "build": "remix vite:build",
    "start": "remix-serve ./build/server/index.js",
    "preview": "remix vite:build && remix-serve ./build/server/index.js"
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.ts tsconfig.json
git rm tsconfig.node.json
git commit -m "chore: install Remix dependencies and configure Vite"
```

---

### Task 2: Create the blog posts server module

This must exist before any route that needs blog data.

**Files:**
- Create: `app/lib/posts.server.ts`

- [ ] **Step 1: Create the server-only posts module**

Create `app/lib/posts.server.ts`:

```typescript
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import fm from "front-matter";

export interface Post {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
  body: string;
}

interface PostFrontmatter {
  title: string;
  slug: string;
  date: string | Date;
  tags: string[];
  description: string;
}

const CONTENT_DIR = join(process.cwd(), "content/blog");

function parsePost(raw: string): Post {
  const { attributes, body } = fm<PostFrontmatter>(raw);
  const date =
    attributes.date instanceof Date
      ? attributes.date.toISOString().slice(0, 10)
      : String(attributes.date);
  return {
    title: attributes.title,
    slug: attributes.slug,
    date,
    tags: attributes.tags ?? [],
    description: attributes.description ?? "",
    body,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await readdir(CONTENT_DIR);
  const posts: Post[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
    posts.push(parsePost(raw));
  }
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getRecentPosts(count = 3): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
```

- [ ] **Step 2: Commit**

```bash
git add app/lib/posts.server.ts
git commit -m "feat: add server-side blog posts module for Remix loaders"
```

---

### Task 3: Create the root layout

The root layout replaces both `index.html` and `src/components/Layout.tsx`. It defines the HTML shell, head tags, nav, footer, and the theme flash-prevention script.

**Files:**
- Create: `app/root.tsx`
- Move: `src/index.css` → `app/index.css` (no changes to content)

- [ ] **Step 1: Move the CSS file**

```bash
mkdir -p app
cp src/index.css app/index.css
```

- [ ] **Step 2: Create app/root.tsx**

```tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import ThemeToggle from "~/components/ThemeToggle";
import stylesheet from "~/index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap",
  },
];

export const meta: MetaFunction = () => [
  { title: "Arath Jimenez" },
  { name: "description", content: "Arath Jimenez — Software Engineer" },
  { property: "og:title", content: "Arath Jimenez" },
  {
    property: "og:description",
    content: "Software engineer. Finance enthusiast. Coffee obsessed.",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230d0d0d'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='monospace' font-size='22' font-weight='700' fill='%23e8a838'%3Ea.%3C/text%3E%3C/svg%3E"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');if(s==='light'||(!s&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light')}})()`,
          }}
        />
        <div className="bg-canvas text-ink min-h-screen flex flex-col">
          <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-canvas/80 backdrop-blur-sm">
            <Link
              to="/"
              className="t-nav text-accent hover:text-accent-hover"
            >
              ~/arathjz
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                to="/blog"
                className="t-nav text-ink-soft hover:text-ink transition-colors"
              >
                blog
              </Link>
              <ThemeToggle />
              <a
                href="https://github.com/arathjz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-ink-soft hover:text-ink transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/arathjz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-ink-soft hover:text-ink transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </nav>
          </header>

          <main className="flex-1 flex flex-col">
            <Outlet />
          </main>

          <footer className="border-t border-hairline px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
            <span className="t-caption">
              &copy; {new Date().getFullYear()} Arath Jimenez. All rights
              reserved.
            </span>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/root.tsx app/index.css
git commit -m "feat: add Remix root layout with theme, nav, and meta"
```

---

### Task 4: Create the ThemeToggle client component

**Files:**
- Create: `app/components/ThemeToggle.tsx`

- [ ] **Step 1: Create the component**

Create `app/components/ThemeToggle.tsx`. This is identical to the existing component except `"use client"` is not needed — Remix hydrates all components by default. However, we need to guard against SSR since `localStorage` and `window` don't exist on the server.

```tsx
import { useEffect, useState } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="opacity-60 hover:opacity-100 transition-opacity duration-200 text-ink"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component with SSR guard"
```

---

### Task 5: Create the home page route

**Files:**
- Create: `app/routes/_index.tsx`
- Create: `app/components/RecentPosts.tsx`

- [ ] **Step 1: Create the RecentPosts component**

Create `app/components/RecentPosts.tsx`. In Remix, this component receives posts as props from the loader rather than importing them directly.

```tsx
import { Link } from "@remix-run/react";
import type { Post } from "~/lib/posts.server";

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-sm text-ink-faint mb-4">recent posts</p>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex items-baseline gap-3"
            >
              <span className="text-terminal opacity-60 font-mono text-sm">
                &gt;
              </span>
              <span className="font-serif text-ink-soft group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <span className="t-caption ml-auto hidden sm:inline">
                {formatShortDate(post.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/blog"
        className="t-nav text-ink-faint hover:text-accent transition-colors inline-block mt-4 text-xs"
      >
        view all &rarr;
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create the home route**

Create `app/routes/_index.tsx`:

```tsx
import { useLoaderData } from "@remix-run/react";
import { getRecentPosts } from "~/lib/posts.server";
import RecentPosts from "~/components/RecentPosts";

const EMAIL = "me@arathjz.com";

export async function loader() {
  const posts = await getRecentPosts(3);
  return { posts };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col justify-center page-container pt-20 pb-8">
      <p className="t-prompt mb-7 fade-in-up animation-delay-100">$ whoami</p>

      <h1 className="t-display mb-4 fade-in-up animation-delay-200">
        Arath Jimenez<span className="text-accent">.</span>
        <span
          aria-hidden="true"
          className="inline-block bg-accent ml-2 animate-blink"
          style={{ width: "0.08em", height: "0.85em", verticalAlign: "-0.08em" }}
        />
      </h1>

      <p className="t-lead max-w-md mb-10 fade-in-up animation-delay-300">
        <span className="text-accent">Software engineer</span>. Finance
        enthusiast.
        <br />
        Powered by espresso <span className="text-accent">☕</span>
      </p>

      <div className="max-w-xl space-y-5 mb-10 fade-in-up animation-delay-400">
        <p className="t-body">
          Hi! I&apos;m Arath, a software engineer with 7+ years in the industry.
          I&apos;m a <span className="text-accent">generalist</span> who loves
          solving problems and learning new things.
        </p>
        <p className="t-body">
          Currently an Engineering Manager at{" "}
          <a
            href="https://trykeep.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Keep
          </a>
          , leading the Capital team. I believe technology should be easy and
          accessible for everyone, which fuels my focus on user experience,
          accessibility, and design in every project.
        </p>
      </div>

      <div className="fade-in-up animation-delay-500">
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono text-lg md:text-xl text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-2 group"
        >
          <span className="text-terminal opacity-80">$</span>
          <span className="border-b border-accent/30 group-hover:border-accent transition-colors pb-0.5">
            {EMAIL}
          </span>
        </a>
      </div>

      <div className="mt-12 fade-in-up animation-delay-600">
        <RecentPosts posts={posts} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/RecentPosts.tsx app/routes/_index.tsx
git commit -m "feat: add home page route with loader-driven recent posts"
```

---

### Task 6: Create the blog listing route

**Files:**
- Create: `app/routes/blog._index.tsx`

- [ ] **Step 1: Create the blog index route**

Create `app/routes/blog._index.tsx`:

```tsx
import { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { getAllPosts, getAllTags } from "~/lib/posts.server";

export const meta: MetaFunction = () => [
  { title: "Blog — Arath Jimenez" },
  {
    name: "description",
    content: "Posts on software engineering, AI, and more.",
  },
  { property: "og:title", content: "Blog — Arath Jimenez" },
  {
    property: "og:description",
    content: "Posts on software engineering, AI, and more.",
  },
];

export async function loader() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  return { posts, tags };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const { posts, tags } = useLoaderData<typeof loader>();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="page-container pt-28 pb-16 min-h-screen">
      <p className="t-prompt mb-6">$ ls ~/blog</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs px-3 py-1 rounded-full border transition-colors ${
              activeTag === null
                ? "border-accent text-accent"
                : "border-line-dim text-ink-faint hover:border-line-hover hover:text-ink-soft"
            }`}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setActiveTag(activeTag === tag ? null : tag)
              }
              className={`font-mono text-xs px-3 py-1 rounded-full border transition-colors ${
                activeTag === tag
                  ? "border-accent text-accent"
                  : "border-line-dim text-ink-faint hover:border-line-hover hover:text-ink-soft"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="t-body">No posts yet.</p>
      ) : (
        <ul className="space-y-8">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-terminal opacity-60 font-mono text-sm">
                    &gt;
                  </span>
                  <h2 className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </div>
                <div className="ml-6">
                  <span className="t-caption">{formatDate(post.date)}</span>
                  {post.description && (
                    <p className="t-body text-base mt-1">
                      {post.description}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-ink-faint"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/blog._index.tsx
git commit -m "feat: add blog listing route with loader and meta"
```

---

### Task 7: Create the blog post route

**Files:**
- Create: `app/routes/blog.$slug.tsx`

- [ ] **Step 1: Create the blog post route**

Create `app/routes/blog.$slug.tsx`:

```tsx
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "~/lib/posts.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getPostBySlug(params.slug!);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Post Not Found — Arath Jimenez" }];
  }
  return [
    { title: `${data.post.title} — Arath Jimenez` },
    { name: "description", content: data.post.description },
    { property: "og:title", content: `${data.post.title} — Arath Jimenez` },
    { property: "og:description", content: data.post.description },
  ];
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="page-container pt-28 pb-16 min-h-screen">
      <Link
        to="/blog"
        className="t-nav text-ink-faint hover:text-ink transition-colors inline-block mb-8"
      >
        &larr; back to blog
      </Link>

      <header className="mb-10">
        <h1 className="t-headline text-accent mb-3">{post.title}</h1>
        <div className="flex items-center gap-4">
          <span className="t-caption">{formatDate(post.date)}</span>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-ink-faint"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <article className="prose max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/blog.\$slug.tsx
git commit -m "feat: add blog post route with dynamic meta and 404 handling"
```

---

### Task 8: Update Tailwind config and clean up old files

**Files:**
- Modify: `tailwind.config.js`
- Delete: `src/` (entire directory)
- Delete: `index.html`
- Delete: `scripts/prerender.js`

- [ ] **Step 1: Update Tailwind content paths**

In `tailwind.config.js`, change the content array to scan `app/` instead of `src/`:

```javascript
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
```

(Remove `"./index.html"` — Remix doesn't use a separate HTML file.)

- [ ] **Step 2: Delete old source files**

```bash
rm -rf src/
rm index.html
rm scripts/prerender.js
rmdir scripts/ 2>/dev/null || true
```

- [ ] **Step 3: Add .gitignore entries for Remix build output**

Append to `.gitignore`:

```
# Remix
/build
.cache
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js .gitignore
git rm -r src/ index.html scripts/prerender.js
git commit -m "chore: update Tailwind paths, remove old SPA files and prerender script"
```

---

### Task 9: Verify the build and test locally

- [ ] **Step 1: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 2: Run the dev server**

```bash
pnpm dev
```

Verify in browser:
- `http://localhost:5173/` — Home page loads with nav, content, recent posts, animations
- `http://localhost:5173/blog` — Blog listing shows hello-world post, tag filter works
- `http://localhost:5173/blog/hello-world` — Blog post renders markdown, meta tags correct
- Theme toggle works (dark ↔ light)
- View page source on `/blog/hello-world` — HTML contains the post title and meta tags (SSR working)

- [ ] **Step 3: Run the production build**

```bash
pnpm build
```

Expected: Build completes without errors, outputs to `build/` directory.

- [ ] **Step 4: Test the production server locally**

```bash
pnpm start
```

Verify the same pages work at `http://localhost:3000/`.

- [ ] **Step 5: Commit any fixes**

If any issues were found and fixed during testing, commit them:

```bash
git add -A
git commit -m "fix: address issues found during local testing"
```

---

### Task 10: Update Netlify configuration

- [ ] **Step 1: Update Netlify build settings**

In the Netlify UI, update:

| Setting | Value |
|---|---|
| **Build command** | `pnpm run build` |
| **Publish directory** | `.netlify` |

The `@netlify/remix-adapter` handles the publish directory automatically — Netlify's Remix integration knows where to find the build output.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

- [ ] **Step 3: Verify Netlify deployment**

Check the Netlify deploy log — it should:
1. Install pnpm dependencies
2. Run `remix vite:build` successfully
3. Deploy with SSR functions

Verify the live site:
- All three routes load
- View source shows server-rendered HTML with correct meta tags
- Theme toggle works
- Blog post renders correctly
