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

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
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
