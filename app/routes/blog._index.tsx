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
