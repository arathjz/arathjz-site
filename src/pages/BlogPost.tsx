import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../lib/posts'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Arath Jimenez`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', post.description)
    } else {
      document.title = 'Post Not Found — Arath Jimenez'
    }
    return () => { document.title = 'Arath Jimenez' }
  }, [post])

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
        <h1 className="t-headline text-accent mb-3">{post.title}</h1>
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
