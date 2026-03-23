'use client'

import Link from 'next/link'
import { useLang } from '../lib/lang-context'

interface Post {
  slug: string
  title: string
  title_cn: string
  description: string
  description_cn: string
  tags: string[] | null
  date: string
  reading_time: string
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const { lang } = useLang()

  return (
    <div className="space-y-1">
      {posts.map((post) => {
        const title = lang === 'cn' && post.title_cn ? post.title_cn : post.title
        const description = lang === 'cn' && post.description_cn ? post.description_cn : post.description
        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-5 border-b border-[var(--border)] last:border-0 hover:no-underline"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0 space-y-1.5">
                <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                  {description}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  {(post.tags ?? []).slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <time className="text-xs text-[var(--muted)] font-mono block">{post.date}</time>
                <span className="text-xs text-[var(--muted)]">{post.reading_time}</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
