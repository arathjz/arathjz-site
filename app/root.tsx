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
    <html lang="en" suppressHydrationWarning>
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
      <body suppressHydrationWarning>
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
                to="/about"
                className="t-nav text-ink-soft hover:text-ink transition-colors"
              >
                about
              </Link>
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
