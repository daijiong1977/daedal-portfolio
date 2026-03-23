'use client'

import { useLang } from '../lib/lang-context'

interface Post {
  slug: string
  title: string
  title_cn: string
  description: string
  description_cn: string
  content: string
  content_cn: string
  tags: string[]
  date: string
  reading_time: string
}

export default function BlogPostContent({ post }: { post: Post }) {
  const { lang } = useLang()

  const title = lang === 'cn' && post.title_cn ? post.title_cn : post.title
  const description = lang === 'cn' && post.description_cn ? post.description_cn : post.description
  const rawContent = lang === 'cn' && post.content_cn ? post.content_cn : post.content

  const paragraphs = rawContent
    ? rawContent.split('\n\n').filter(Boolean)
    : ['This post is still being written. Check back soon!']

  return (
    <>
      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono bg-[var(--border)] text-[var(--muted)] px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.reading_time}</span>
        </div>
        <p className="text-lg text-[var(--muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-4">
          {description}
        </p>
      </header>

      {/* Body */}
      <div className="space-y-5 text-[var(--foreground)] leading-relaxed">
        {paragraphs.map((paragraph, i) => {
          if (paragraph.startsWith('**') && paragraph.includes('.**')) {
            const parts = paragraph.split('**').filter(Boolean)
            const boldPart = parts[0]
            const rest = parts.slice(1).join(' ')
            return (
              <p key={i}>
                <strong className="font-semibold text-[var(--foreground)]">{boldPart.replace(/\.$/, '')}.{' '}</strong>
                {rest}
              </p>
            )
          }
          return <p key={i} className="text-[var(--foreground)]/90">{paragraph}</p>
        })}
      </div>
    </>
  )
}
