import { posts } from '../data/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on distributed systems, engineering culture, and the craft of software.',
}

export default function BlogPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Writing</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          Guides, deep dives, and opinions on software engineering.
          {' '}{posts.length} articles so far.
        </p>
      </div>

      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-5 border-b border-[var(--border)] last:border-0 hover:no-underline"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0 space-y-1.5">
                <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <time className="text-xs text-[var(--muted)] font-mono block">{post.date}</time>
                <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
