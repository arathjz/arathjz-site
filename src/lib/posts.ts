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
  date: string | Date
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
  const date =
    attributes.date instanceof Date
      ? attributes.date.toISOString().slice(0, 10)
      : String(attributes.date)
  return {
    title: attributes.title,
    slug: attributes.slug,
    date,
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
