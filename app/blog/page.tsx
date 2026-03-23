import type { Metadata } from 'next'
import { supabaseServer } from '../lib/supabase'
import BlogList from '../components/BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on distributed systems, engineering culture, and the craft of software.',
}

export const revalidate = 60

export default async function BlogPage() {
  const { data: posts } = await supabaseServer
    .from('posts')
    .select('slug, title, title_cn, description, description_cn, tags, date, reading_time')
    .eq('published', true)
    .order('date', { ascending: false })

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Writing</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          Guides, deep dives, and opinions on software engineering.
          {' '}{posts?.length ?? 0} articles so far.
        </p>
      </div>

      <div className="space-y-1">
        <BlogList posts={(posts ?? []) as Parameters<typeof BlogList>[0]['posts']} />
      </div>
    </div>
  )
}
