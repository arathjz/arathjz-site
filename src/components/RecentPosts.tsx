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
