# Site Simplification — Design Spec

## Goal

Simplify arathjz.com from a multi-section scrollable site to a single-screen personal page inspired by cassidoo.co, with a markdown-powered blog. Retain the terminal aesthetic and animations that give it personality.

## Layout

Single screen. Everything visible without scrolling on a laptop viewport. Top to bottom:

1. **Fixed nav bar**
2. **Hero block** (prompt, name + photo, tagline)
3. **Intro paragraphs** (2 short paragraphs)
4. **Email link**
5. **Recent posts teaser** (2-3 latest blog post titles)
6. **Footer**

No sections, no dividers, no section numbering.

```
┌──────────────────────────────────────────┐
│  ~/arathjz    [blog] [sun/moon] [gh][li] │
│                                          │
│         $ whoami                         │
│                                          │
│   [photo]   Arath Jimenez.▌              │
│             Software engineer.           │
│             Finance enthusiast.          │
│             Powered by espresso coffee   │
│                                          │
│   Hi! I'm Arath, a software engineer    │
│   with 7+ years in the industry. I'm    │
│   a generalist who loves solving         │
│   problems and learning new things.      │
│                                          │
│   Currently an Engineering Manager at    │
│   Keep, leading the Capital team. I      │
│   believe technology should be easy and  │
│   accessible for everyone, which fuels   │
│   my focus on user experience,           │
│   accessibility, and design in every     │
│   project.                               │
│                                          │
│   $ me@arathjz.com                       │
│                                          │
│   Recent posts                           │
│   > Example Post Title        Apr 2026   │
│   > Another Post              Mar 2026   │
│   > One More Post             Feb 2026   │
│                                          │
│  ──────────────────────────────────────  │
│  © 2026 Arath Jimenez. All rights res.   │
└──────────────────────────────────────────┘
```

## Nav Bar

- Fixed top, same horizontal padding as current.
- Left: `~/arathjz` logo link (accent color, mono font).
- Right: `blog` text link + dark/light toggle icon (sun/moon) + GitHub icon link + LinkedIn icon link.
- GitHub URL: https://github.com/arathjz
- LinkedIn URL: https://www.linkedin.com/in/arathjz
- Twitter removed.
- Icons: small (w-5 h-5), opacity-based hover, same as current.

## Hero Block

- `$ whoami` prompt in terminal green, mono font, small text.
- Name: `Arath Jimenez.` in large mono bold display font (current `t-display` style) with blinking cursor.
- Small circular photo (~80-120px) positioned to the left of the name, vertically centered with name + tagline block.
- Tagline below name: "Software engineer. Finance enthusiast. Powered by espresso coffee-emoji" in `t-lead` style (serif, ink-soft color).

## Intro Paragraphs

Two paragraphs in `t-body` style (serif, ink-soft), max-width constrained for readability:

> Hi! I'm Arath, a software engineer with 7+ years in the industry. I'm a generalist who loves solving problems and learning new things.

> Currently an Engineering Manager at Keep, leading the Capital team. I believe technology should be easy and accessible for everyone, which fuels my focus on user experience, accessibility, and design in every project.

## Email Link

- Styled like current contact section: `$ me@arathjz.com` with terminal green `$`, accent-colored email, mono font.
- Smaller than current (no `text-4xl`). Sized to fit the single-screen flow.
- Links to `mailto:me@arathjz.com`.

## Footer

- Thin top border (hairline).
- Single line: `© {year} Arath Jimenez. All rights reserved.`
- No "Icons by" credit.

## Animations

Keep current staggered `fade-in-up` animations with delays:

1. `$ whoami` — delay 100ms
2. Name + photo block — delay 200ms
3. Tagline — delay 300ms
4. Intro paragraphs — delay 400ms
5. Email link — delay 500ms

Same `fadeUp` keyframes (0.6s ease-out, translateY 20px to 0).

## Dark / Light Mode

### Toggle

- Sun/moon icon button in nav bar (between logo and social icons or rightmost).
- Defaults to `prefers-color-scheme` media query on first visit.
- User choice persisted in `localStorage` key (e.g., `theme`).
- Toggling adds/removes a class on `<html>` (e.g., `class="light"`).

### Dark Theme (default, current palette)

- Canvas: `#0d0d0d`
- Surface: `#1a1a1a`
- Ink: `#f2ead8`
- Ink-soft: `#dccfb5`
- Ink-faint: `#bdb098`
- Accent: `#f0b648`
- Terminal: `#6ee29a`

### Light Theme

- Canvas: `#faf8f5` (warm off-white)
- Surface: `#f0ece6`
- Ink: `#1a1a1a`
- Ink-soft: `#4a4540`
- Ink-faint: `#7a756e`
- Accent: `#c8941a` (darkened gold for contrast on light bg)
- Terminal: `#1a8a4a` (darkened green for contrast on light bg)

Light theme colors applied via CSS variables scoped to `.light` class on `<html>`.

### Tailwind Integration

Use CSS custom properties for all color tokens. Tailwind config references `var(--color-*)`. The `.light` class overrides the custom properties.

## Removed

- About section (`#about`) — content merged into intro paragraphs.
- Work section (`#work`) — already removed (companies array deleted).
- Contact section (`#contact`) — replaced by inline email link.
- Section dividers, section numbering (`// 01`, `// 02`).
- "about me" and "get in touch" CTA buttons.
- Twitter social link.
- "Icons by Simple Icons" footer credit.
- Companies array and logos.

## Kept

- Terminal aesthetic: `$ whoami`, blinking cursor, `~/arathjz`, `$` prefix on email.
- Mono + serif font pairing (Space Mono + Lora).
- Fade-in-up animations with staggered delays.
- Photo (`/images/main-picture.jpeg`), now smaller and circular.
- Current accent color scheme (gold + green).
- Responsive design (mobile-friendly).

## Blog

### Architecture

- **Router:** `react-router-dom` for client-side routing (`/`, `/blog`, `/blog/:slug`).
- **Markdown files:** Stored in `content/blog/` directory at project root.
- **Loading:** Vite's `import.meta.glob` to discover and load markdown files at build time.
- **Parsing:** `gray-matter` for frontmatter extraction, `react-markdown` for rendering with `remark-gfm` for GitHub-flavored markdown.
- **Styling:** Markdown content rendered inside a prose container that inherits the site's semantic tokens (ink, ink-soft, accent colors). Headings, links, code blocks, lists all styled via CSS to match the terminal aesthetic.

### Frontmatter Format

```yaml
---
title: "Example Post"
slug: example-post
date: 2026-04-11
tags: [technical, learning]
description: "A short summary for the listing page and SEO."
---

Markdown content here...
```

### Routes

- `/` — Home page (single screen layout as designed above).
- `/blog` — Blog listing page. All posts sorted by date descending. Each entry shows title (linked), date, description, and tags.
- `/blog/:slug` — Individual blog post. Renders the markdown with the site's typography tokens. Shows title, date, tags at the top, then content.

### Home Page — Recent Posts Teaser

Below the email link, a small "Recent posts" block showing 2-3 latest post titles with dates. Each title links to `/blog/:slug`. Terminal-styled with `>` prefix on each entry. A "view all" link goes to `/blog`.

### Blog Listing Page (`/blog`)

- Same nav bar as home.
- Heading: `$ ls ~/blog` (terminal-styled).
- List of all posts, sorted by date descending.
- Each entry: title (link), date, description text, tag pills.
- Tags are clickable — filter the list by tag (client-side filtering, no separate route needed).
- Same footer as home.

### Blog Post Page (`/blog/:slug`)

- Same nav bar as home.
- Post header: title in `t-headline`, date in `t-caption`, tags as small pills.
- Markdown body rendered with semantic tokens:
  - `h1`-`h3`: scaled serif headings in `ink` color.
  - `p`: `t-body` style (serif, ink-soft).
  - `a`: accent color, underline on hover.
  - `code` inline: mono font, surface background, slight padding.
  - `pre` code blocks: mono font, surface background, rounded, padded, horizontal scroll.
  - `ul`/`ol`: ink-soft, proper spacing.
  - `blockquote`: left accent border, ink-faint text.
  - `img`: max-width 100%, rounded corners.
- Same footer as home.

## Claude Code Skill — `write-blog`

A skill installed at `.claude/skills/write-blog/` that helps create new blog posts.

### Behavior

1. Asks the user for a **title**.
2. Proposes a **slug** derived from the title (lowercase, hyphenated, no special chars). User can override.
3. Asks for a **description** (1 sentence summary).
4. Asks for **tags** (optional, suggests from existing tags in other posts).
5. Creates the markdown file at `content/blog/{slug}.md` with frontmatter populated (title, slug, today's date, tags, description) and a placeholder body.
6. Opens the file for editing.

### Skill File

```yaml
---
name: write-blog
description: Create a new blog post with frontmatter and markdown template
---
```

The skill creates the file and lets the user write the content.

## Files Changed

- `src/App.tsx` — rewrite to single-screen layout, add theme toggle. Becomes the home page component.
- `src/main.tsx` — add react-router-dom setup with routes.
- `src/pages/Home.tsx` — home page extracted from App.tsx.
- `src/pages/Blog.tsx` — blog listing page.
- `src/pages/BlogPost.tsx` — individual blog post page.
- `src/index.css` — update CSS variables to use custom properties, add `.light` theme overrides, add markdown prose styles, remove unused component styles (divider, section-pad, btn-primary, btn-secondary).
- `tailwind.config.js` — update color references to use CSS variables.
- `content/blog/` — directory for markdown blog posts.
- `.claude/skills/write-blog/` — Claude Code skill for creating blog posts.
- Social icon assets: keep `github.svg` and `linkedin.svg` (dark versions). Create or source light versions for light mode (or use CSS filter to invert).
- Add sun/moon toggle icons (inline SVG or simple icon).
- `package.json` — add `react-router-dom`, `gray-matter`, `react-markdown`, `remark-gfm` dependencies.
