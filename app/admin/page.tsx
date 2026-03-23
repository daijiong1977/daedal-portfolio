'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

interface Stats {
  totalPosts: number
  publishedPosts: number
  totalProjects: number
  unreviewedFeedback: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function load() {
      const [posts, published, projects, feedback] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact', head: true }),
        supabase.from('posts').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('feedback').select('id', { count: 'exact', head: true }).eq('reviewed', false),
      ])
      setStats({
        totalPosts: posts.count ?? 0,
        publishedPosts: published.count ?? 0,
        totalProjects: projects.count ?? 0,
        unreviewedFeedback: feedback.count ?? 0,
      })
    }
    load()
  }, [])

  const cards = stats
    ? [
        { label: 'Total posts', value: stats.totalPosts, href: '/admin/posts' },
        { label: 'Published', value: stats.publishedPosts, href: '/admin/posts' },
        { label: 'Projects', value: stats.totalProjects, href: '/admin/posts' },
        { label: 'Unreviewed feedback', value: stats.unreviewedFeedback, href: '/admin/feedback' },
      ]
    : []

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Welcome back, Daedal.</p>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-1 hover:border-[var(--accent)] transition-colors"
            >
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-xs text-[var(--muted)]">{card.label}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-sm text-[var(--muted)]">Loading stats…</div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/posts/new" className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            + New post
          </Link>
          <Link href="/admin/about" className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--card)] transition-colors">
            Edit about
          </Link>
          <Link href="/admin/feedback" className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--card)] transition-colors">
            Review feedback
          </Link>
        </div>
      </div>
    </div>
  )
}
