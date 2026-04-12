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
