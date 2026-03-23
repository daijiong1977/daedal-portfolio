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
    <div className="space-y-4">
      {posts.map((post) => {
        const title = lang === 'cn' && post.title_cn ? post.title_cn : post.title
        const description = lang === 'cn' && post.description_cn ? post.description_cn : post.description
        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-[1.7rem] border border-[var(--card-border)] bg-[var(--card)] px-5 py-5 soft-ring hover:no-underline card-hover"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{post.reading_time}</span>
                </div>
                <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-snug text-xl">
                  {title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 max-w-3xl">
                  {description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(post.tags ?? []).slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-mono text-[var(--muted)] bg-[var(--background)] border border-[var(--border)] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 self-start rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                Read article
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
