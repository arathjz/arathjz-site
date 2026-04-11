# Site Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify arathjz.com to a single-screen personal page with terminal aesthetic, dark/light mode, and a markdown-powered blog.

**Architecture:** React SPA with react-router-dom for routing (`/`, `/blog`, `/blog/:slug`). Markdown blog posts stored in `content/blog/`, loaded at build time via Vite's `import.meta.glob`, parsed with `front-matter`, rendered with `react-markdown`. Theme toggle persists to localStorage, defaults to OS preference.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom, react-markdown, remark-gfm, front-matter

---

## File Structure

```
src/
  main.tsx              — BrowserRouter + App mount
  App.tsx               — Route definitions
  index.css             — CSS vars, light/dark themes, typography tokens, prose styles, animations
  components/
    Layout.tsx          — Shared nav + footer wrapper
    ThemeToggle.tsx     — Sun/moon toggle button
    RecentPosts.tsx     — Recent posts teaser for home page
  pages/
    Home.tsx            — Single-screen home page
    Blog.tsx            — Blog listing page
    BlogPost.tsx        — Individual blog post page
  lib/
    posts.ts            — Load and parse markdown blog posts
content/
  blog/
    hello-world.md      — Sample blog post
.claude/
  skills/
    write-blog/
      write-blog.md     — Claude Code skill for creating blog posts
```

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
cd /Users/arathjz/projects/arathjz-site && pnpm add react-router-dom react-markdown remark-gfm front-matter
```

- [ ] **Step 2: Install type declarations**

```bash
cd /Users/arathjz/projects/arathjz-site && pnpm add -D @types/front-matter
```

Note: `react-router-dom`, `react-markdown`, and `remark-gfm` ship their own types. `front-matter` needs `@types/front-matter`.

- [ ] **Step 3: Verify dev server still runs**

```bash
cd /Users/arathjz/projects/arathjz-site && pnpm dev
```

Expected: Vite starts without errors on http://localhost:5173/

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add react-router-dom, react-markdown, remark-gfm, front-matter"
```

---

### Task 2: Theme System — CSS Variables + Light Mode

Refactor the color system so Tailwind uses CSS custom properties. Add a `.light` class override. This must happen before any component work since everything references these tokens.

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Update `tailwind.config.js` to reference CSS custom properties**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        hairline: 'var(--color-hairline)',

        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          faint: 'var(--color-ink-faint)',
          mute: 'var(--color-ink-mute)',
          dim: 'var(--color-ink-dim)',
        },

        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },

        terminal: 'var(--color-terminal)',

        line: {
          DEFAULT: 'var(--color-line)',
          dim: 'var(--color-line-dim)',
          hover: 'var(--color-line-hover)',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['Lora', 'serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update `src/index.css` with theme variables and light mode overrides**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ── CANVAS / SURFACE ───────────────────────────── */
    --color-canvas: #0d0d0d;
    --color-surface: #1a1a1a;
    --color-hairline: #1c1c1c;

    /* ── INK (text) ──────────────────────────────────── */
    --color-ink: #f2ead8;
    --color-ink-soft: #dccfb5;
    --color-ink-faint: #bdb098;
    --color-ink-mute: #cfcfcf;
    --color-ink-dim: #968a78;

    /* ── ACCENT / BRAND ─────────────────────────────── */
    --color-accent: #f0b648;
    --color-accent-hover: #ffcb6a;
    --color-terminal: #6ee29a;

    /* ── LINES / BORDERS ────────────────────────────── */
    --color-line: #4a4a4a;
    --color-line-dim: #5a5a5a;
    --color-line-hover: #8a8a8a;
  }

  .light {
    --color-canvas: #faf8f5;
    --color-surface: #f0ece6;
    --color-hairline: #e0dbd3;

    --color-ink: #1a1a1a;
    --color-ink-soft: #4a4540;
    --color-ink-faint: #7a756e;
    --color-ink-mute: #5a5a5a;
    --color-ink-dim: #8a8580;

    --color-accent: #c8941a;
    --color-accent-hover: #a67a10;
    --color-terminal: #1a8a4a;

    --color-line: #d0cbc3;
    --color-line-dim: #c0bbb3;
    --color-line-hover: #8a8580;
  }

  html {
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--color-canvas);
    color: var(--color-ink);
  }

  ::selection {
    background-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
    color: var(--color-ink);
  }
}

@layer components {
  /* ── TYPOGRAPHY TOKENS ──────────────────────────── */
  .t-display {
    @apply font-mono font-bold leading-[1.05] text-ink;
    font-size: clamp(2.5rem, 7vw, 6rem);
  }

  .t-headline {
    @apply font-serif text-3xl md:text-4xl text-ink leading-snug;
  }

  .t-lead {
    @apply font-serif text-lg md:text-xl text-ink-soft leading-relaxed;
  }

  .t-body {
    @apply font-serif text-lg text-ink-soft leading-relaxed;
  }

  .t-label {
    @apply font-mono text-xs uppercase tracking-widest;
  }

  .t-section-label {
    @apply t-label text-terminal opacity-80;
  }

  .t-prompt {
    @apply font-mono text-sm text-terminal;
  }

  .t-nav {
    @apply font-mono text-sm tracking-wide transition-colors;
  }

  .t-caption {
    @apply font-mono text-xs text-ink-faint;
  }

  .page-container {
    @apply px-6 md:px-12 lg:px-28 max-w-7xl mx-auto;
  }

  /* ── PROSE (blog markdown) ─────────────────────── */
  .prose h1 { @apply font-serif text-3xl text-ink mb-6 mt-10 leading-snug; }
  .prose h2 { @apply font-serif text-2xl text-ink mb-4 mt-8 leading-snug; }
  .prose h3 { @apply font-serif text-xl text-ink mb-3 mt-6 leading-snug; }
  .prose p { @apply font-serif text-lg text-ink-soft leading-relaxed mb-5; }
  .prose a { @apply text-accent hover:text-accent-hover underline-offset-2 hover:underline transition-colors; }
  .prose strong { @apply text-ink font-semibold; }
  .prose em { @apply italic; }
  .prose ul { @apply list-disc pl-6 mb-5 space-y-2 text-ink-soft font-serif text-lg; }
  .prose ol { @apply list-decimal pl-6 mb-5 space-y-2 text-ink-soft font-serif text-lg; }
  .prose li { @apply leading-relaxed; }
  .prose blockquote { @apply border-l-2 border-accent pl-4 italic text-ink-faint mb-5; }
  .prose code { @apply font-mono text-sm bg-surface px-1.5 py-0.5 rounded; }
  .prose pre { @apply bg-surface rounded-lg p-4 mb-5 overflow-x-auto; }
  .prose pre code { @apply bg-transparent p-0; }
  .prose img { @apply max-w-full rounded-lg my-6; }
  .prose hr { @apply border-hairline my-8; }

  /* ── ANIMATIONS ─────────────────────────────────── */
  .fade-in-up {
    @apply opacity-0 animate-fade-up animation-fill-forwards;
  }
}

@layer utilities {
  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-600 { animation-delay: 0.6s; }
  .animation-fill-forwards { animation-fill-mode: forwards; }
}
```

- [ ] **Step 3: Verify the page still renders correctly on dev server**

Open http://localhost:5173/ — colors should look identical to before since dark is the default.

- [ ] **Step 4: Verify light mode by temporarily adding class**

Open browser DevTools, add `light` class to `<html>`. Page should switch to light warm colors. Remove the class after checking.

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "feat: refactor color system to CSS variables with light theme support"
```

---

### Task 3: Theme Toggle Component + Flash Prevention

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Modify: `index.html`

- [ ] **Step 1: Add inline script to `index.html` to prevent flash of wrong theme**

In `index.html`, add this script tag right before `<div id="root">`:

```html
    <script>
      (function() {
        var saved = localStorage.getItem('theme');
        if (saved === 'light' || (!saved && window.matchMedia('(prefers-color-scheme: light)').matches)) {
          document.documentElement.classList.add('light');
        }
      })();
    </script>
```

- [ ] **Step 2: Create `src/components/ThemeToggle.tsx`**

```tsx
import { useEffect, useState } from 'react'

function getInitialTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="opacity-60 hover:opacity-100 transition-opacity duration-200 text-ink"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.tsx index.html
git commit -m "feat: add theme toggle component with flash prevention"
```

---

### Task 4: Shared Layout Component (Nav + Footer)

**Files:**
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Create `src/components/Layout.tsx`**

```tsx
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-canvas/80 backdrop-blur-sm">
        <Link to="/" className="t-nav text-accent hover:text-accent-hover">
          ~/arathjz
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/blog" className="t-nav text-ink-soft hover:text-ink transition-colors">
            blog
          </Link>
          <ThemeToggle />
          <a
            href="https://github.com/arathjz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="opacity-60 hover:opacity-100 transition-opacity duration-200 text-ink"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/arathjz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-60 hover:opacity-100 transition-opacity duration-200 text-ink"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-hairline px-6 md:px-12 py-8 max-w-7xl mx-auto w-full">
        <span className="t-caption">
          &copy; {new Date().getFullYear()} Arath Jimenez. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "feat: add shared Layout component with nav and footer"
```

---

### Task 5: Router Setup + Home Page

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Update `src/main.tsx` to add BrowserRouter**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 2: Create `src/pages/Home.tsx`**

```tsx
import { Link } from 'react-router-dom'
import RecentPosts from '../components/RecentPosts'

const EMAIL = 'me@arathjz.com'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center page-container pt-20 pb-16">
      <p className="t-prompt mb-7 fade-in-up animation-delay-100">
        $ whoami
      </p>

      <div className="flex items-center gap-6 mb-4 fade-in-up animation-delay-200">
        <img
          src="/images/main-picture.jpeg"
          alt="Arath Jimenez"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 flex-shrink-0"
        />
        <h1 className="t-display">
          Arath Jimenez<span className="text-accent">.</span>
          <span
            aria-hidden="true"
            className="inline-block bg-accent ml-3 animate-blink"
            style={{ width: '0.08em', height: '0.85em', verticalAlign: '-0.08em' }}
          />
        </h1>
      </div>

      <p className="t-lead max-w-md mb-10 fade-in-up animation-delay-300">
        Software engineer. Finance enthusiast.
        <br />
        Powered by espresso <span className="text-accent">&coffee;</span>
      </p>

      <div className="max-w-xl space-y-5 mb-10 fade-in-up animation-delay-400">
        <p className="t-body">
          Hi! I'm Arath, a software engineer with 7+ years in the industry.
          I'm a generalist who loves solving problems and learning new things.
        </p>
        <p className="t-body">
          Currently an Engineering Manager at Keep, leading the Capital team.
          I believe technology should be easy and accessible for everyone,
          which fuels my focus on user experience, accessibility, and design
          in every project.
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
        <RecentPosts />
      </div>
    </div>
  )
}
```

Note: The `☕` coffee emoji can be used directly. Replace `&coffee;` with the literal `☕` character.

- [ ] **Step 3: Rewrite `src/App.tsx` as the router**

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 4: Create placeholder `src/components/RecentPosts.tsx`**

```tsx
export default function RecentPosts() {
  return null
}
```

This will be implemented after the blog infrastructure is built (Task 8).

- [ ] **Step 5: Verify the home page renders on dev server**

Open http://localhost:5173/ — should show the single-screen layout with $ whoami, photo, name, tagline, intro paragraphs, email link. Animations should fire. Theme toggle should switch between dark/light.

- [ ] **Step 6: Commit**

```bash
git add src/main.tsx src/App.tsx src/pages/Home.tsx src/components/RecentPosts.tsx
git commit -m "feat: add router, home page with single-screen layout"
```

---

### Task 6: Blog Infrastructure — Post Loader + Sample Post

**Files:**
- Create: `src/lib/posts.ts`
- Create: `content/blog/hello-world.md`

- [ ] **Step 1: Create `content/blog/` directory and a sample post**

```bash
mkdir -p /Users/arathjz/projects/arathjz-site/content/blog
```

Create `content/blog/hello-world.md`:

```markdown
---
title: "Hello World"
slug: hello-world
date: 2026-04-11
tags: [personal]
description: "First post on my new blog. Testing the waters."
---

## Welcome

This is my first blog post. I'm excited to start writing here.

I'll be sharing thoughts on **software engineering**, building products, and things I'm learning along the way.

### What to expect

- Technical posts about frontend, backend, and everything in between
- Reflections on engineering management
- Occasional coffee recommendations ☕

Stay tuned!
```

- [ ] **Step 2: Create `src/lib/posts.ts`**

```ts
import fm from 'front-matter'

export interface Post {
  title: string
  slug: string
  date: string
  tags: string[]
  description: string
  body: string
}

interface PostFrontmatter {
  title: string
  slug: string
  date: string
  tags: string[]
  description: string
}

const modules = import.meta.glob<string>('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parsePost(raw: string): Post {
  const { attributes, body } = fm<PostFrontmatter>(raw)
  return {
    title: attributes.title,
    slug: attributes.slug,
    date: attributes.date,
    tags: attributes.tags ?? [],
    description: attributes.description ?? '',
    body,
  }
}

const allPosts: Post[] = Object.values(modules)
  .map(parsePost)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): Post[] {
  return allPosts
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug)
}

export function getRecentPosts(count = 3): Post[] {
  return allPosts.slice(0, count)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  allPosts.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}
```

- [ ] **Step 3: Verify the module compiles**

Check the dev server console for errors. There should be none. The sample post should be loadable.

- [ ] **Step 4: Commit**

```bash
git add content/blog/hello-world.md src/lib/posts.ts
git commit -m "feat: add blog post loader and sample hello-world post"
```

---

### Task 7: Blog Listing Page

**Files:**
- Create: `src/pages/Blog.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/pages/Blog.tsx`**

```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getAllTags } from '../lib/posts'

export default function Blog() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts

  return (
    <div className="page-container pt-28 pb-16 min-h-screen">
      <p className="t-prompt mb-6">$ ls ~/blog</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs px-3 py-1 rounded-full border transition-colors ${
              activeTag === null
                ? 'border-accent text-accent'
                : 'border-line-dim text-ink-faint hover:border-line-hover hover:text-ink-soft'
            }`}
          >
            all
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-mono text-xs px-3 py-1 rounded-full border transition-colors ${
                activeTag === tag
                  ? 'border-accent text-accent'
                  : 'border-line-dim text-ink-faint hover:border-line-hover hover:text-ink-soft'
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
          {filtered.map(post => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-terminal opacity-60 font-mono text-sm">&gt;</span>
                  <h2 className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </div>
                <div className="ml-6">
                  <span className="t-caption">{formatDate(post.date)}</span>
                  {post.description && (
                    <p className="t-body text-base mt-1">{post.description}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="font-mono text-xs text-ink-faint">
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
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
```

- [ ] **Step 2: Add the `/blog` route to `src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 3: Verify blog listing page**

Open http://localhost:5173/blog — should show the `$ ls ~/blog` heading, the "all" and "#personal" tag filters, and the hello-world post with title, date, description. Clicking the post title should 404 for now (post page not built yet). Tag filters should work.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Blog.tsx src/App.tsx
git commit -m "feat: add blog listing page with tag filtering"
```

---

### Task 8: Blog Post Page + Prose Rendering

**Files:**
- Create: `src/pages/BlogPost.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/pages/BlogPost.tsx`**

```tsx
import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../lib/posts'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="page-container pt-28 pb-16 min-h-screen">
        <p className="t-prompt mb-6">$ cat not-found</p>
        <p className="t-body mb-6">Post not found.</p>
        <Link to="/blog" className="t-nav text-accent hover:text-accent-hover">
          &larr; back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container pt-28 pb-16 min-h-screen">
      <Link
        to="/blog"
        className="t-nav text-ink-faint hover:text-ink transition-colors inline-block mb-8"
      >
        &larr; back to blog
      </Link>

      <header className="mb-10">
        <h1 className="t-headline mb-3">{post.title}</h1>
        <div className="flex items-center gap-4">
          <span className="t-caption">{formatDate(post.date)}</span>
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="font-mono text-xs text-ink-faint">
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
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

- [ ] **Step 2: Add the `/blog/:slug` route to `src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Layout>
  )
}
```

- [ ] **Step 3: Verify blog post page**

Open http://localhost:5173/blog, click the "Hello World" post. Should show the back link, title, date, tags, and rendered markdown content. Verify:
- Headings (h2, h3) are serif with correct sizes
- Paragraphs are in ink-soft color
- Bold text is in ink color
- The list renders with bullets
- All prose styles match the terminal aesthetic

- [ ] **Step 4: Test dark/light mode on blog post**

Toggle theme — all prose styles should adapt correctly. Links should use darkened accent in light mode.

- [ ] **Step 5: Commit**

```bash
git add src/pages/BlogPost.tsx src/App.tsx
git commit -m "feat: add blog post page with markdown rendering"
```

---

### Task 9: Recent Posts Teaser on Home Page

**Files:**
- Modify: `src/components/RecentPosts.tsx`

- [ ] **Step 1: Implement `src/components/RecentPosts.tsx`**

Replace the placeholder with:

```tsx
import { Link } from 'react-router-dom'
import { getRecentPosts } from '../lib/posts'

export default function RecentPosts() {
  const posts = getRecentPosts(3)

  if (posts.length === 0) return null

  return (
    <div>
      <p className="font-mono text-sm text-ink-faint mb-4">recent posts</p>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex items-baseline gap-3"
            >
              <span className="text-terminal opacity-60 font-mono text-sm">&gt;</span>
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
  )
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}
```

- [ ] **Step 2: Verify on home page**

Open http://localhost:5173/ — below the email link, should see "recent posts" with the hello-world post listed with `>` prefix, title, and date. "view all →" link should navigate to `/blog`.

- [ ] **Step 3: Commit**

```bash
git add src/components/RecentPosts.tsx
git commit -m "feat: add recent posts teaser to home page"
```

---

### Task 10: Create `write-blog` Claude Code Skill

**Files:**
- Create: `.claude/skills/write-blog/write-blog.md`

- [ ] **Step 1: Create the skill directory**

```bash
mkdir -p /Users/arathjz/projects/arathjz-site/.claude/skills/write-blog
```

- [ ] **Step 2: Create `.claude/skills/write-blog/write-blog.md`**

````markdown
---
name: write-blog
description: Create a new blog post with frontmatter and markdown template. Use when the user wants to write a new blog post.
---

# Write Blog Post

Create a new markdown blog post in the `content/blog/` directory.

## Steps

1. **Ask for the title.** Ask the user: "What's the title of your blog post?"

2. **Propose a slug.** Derive a slug from the title: lowercase, replace spaces with hyphens, remove special characters, trim to ~60 chars. Present it to the user: "Proposed slug: `{slug}` — want to use this or change it?"

3. **Ask for a description.** Ask: "Give me a one-sentence description (used in the blog listing and SEO)."

4. **Ask for tags (optional).** First, read existing posts in `content/blog/` to find all tags currently in use. Present them to the user: "Existing tags: `#tag1`, `#tag2`, ... — pick any of these or add new ones (comma-separated). Or skip."

5. **Create the file.** Write `content/blog/{slug}.md` with this template:

```markdown
---
title: "{title}"
slug: {slug}
date: {YYYY-MM-DD of today}
tags: [{comma-separated tags}]
description: "{description}"
---

Start writing here...
```

6. **Confirm.** Tell the user the file was created at `content/blog/{slug}.md` and that they can start writing. The dev server will hot-reload to show the post.
````

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/write-blog/write-blog.md
git commit -m "feat: add write-blog Claude Code skill"
```

---

### Task 11: Cleanup Unused Assets and Files

**Files:**
- Delete: `public/images/icons/dark/twitter.svg`
- Delete: `public/images/companies/` (entire directory)
- Delete: `public/images/icons/dark/toggle.svg` (replaced by inline SVG)

- [ ] **Step 1: Remove unused assets**

```bash
cd /Users/arathjz/projects/arathjz-site
rm public/images/icons/dark/twitter.svg
rm public/images/icons/dark/toggle.svg
rm -rf public/images/companies/
```

- [ ] **Step 2: Verify nothing breaks**

Open http://localhost:5173/ — no broken images or console errors. Navigate to `/blog` and `/blog/hello-world` — all clean.

- [ ] **Step 3: Commit**

```bash
git add -u public/images/
git commit -m "chore: remove unused assets (twitter, toggle, company logos)"
```

---

### Task 12: Final Verification

- [ ] **Step 1: Full walkthrough — dark mode**

1. Open http://localhost:5173/ — home page loads, animations fire in sequence, photo is circular, name has blinking cursor, tagline and intro paragraphs render, email link works, recent posts shows hello-world post
2. Click "blog" in nav — goes to `/blog`, shows listing with tag filter and hello-world post
3. Click the post — goes to `/blog/hello-world`, markdown renders with correct prose styles
4. Click "← back to blog" — returns to listing
5. Click `~/arathjz` logo — returns home
6. Click GitHub icon — opens github.com/arathjz in new tab
7. Click LinkedIn icon — opens linkedin.com/in/arathjz in new tab

- [ ] **Step 2: Full walkthrough — light mode**

1. Click sun icon to toggle to light mode
2. Page switches to warm off-white background, dark text
3. Repeat all navigation from Step 1 — all pages render correctly in light mode
4. Refresh the page — light mode persists (localStorage)
5. Toggle back to dark — works correctly

- [ ] **Step 3: Mobile responsiveness**

1. Open DevTools, toggle device toolbar
2. Check home page at 375px width (iPhone) — layout stacks correctly, photo and name wrap, text is readable
3. Check blog listing and post pages — all readable on mobile

- [ ] **Step 4: Build check**

```bash
cd /Users/arathjz/projects/arathjz-site && pnpm build
```

Expected: Build succeeds with no TypeScript or Vite errors.
