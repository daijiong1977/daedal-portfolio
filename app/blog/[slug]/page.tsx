import { supabaseServer } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await supabaseServer
    .from('posts')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabaseServer
    .from('posts')
    .select('title, description')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (!post) return {}
  return { title: post.title, description: post.description }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const { data: post } = await supabaseServer
    .from('posts')
    .select('slug, title, description, content, tags, date, reading_time')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  const paragraphs = post.content
    ? post.content.split('\n\n').filter(Boolean)
    : ['This post is still being written. Check back soon!']

  return (
    <article className="max-w-2xl">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 no-underline"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        All posts
      </Link>

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
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.reading_time}</span>
        </div>
        <p className="text-lg text-[var(--muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-4">
          {post.description}
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

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-[var(--border)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors no-underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
