import { supabaseServer } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import BlogPostContent from '../../components/BlogPost'

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
    .select('slug, title, title_cn, description, description_cn, content, content_cn, tags, date, reading_time')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

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

      <BlogPostContent post={post} />

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
