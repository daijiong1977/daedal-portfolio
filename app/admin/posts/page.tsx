'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

interface Post {
  id: string
  slug: string
  title: string
  date: string
  reading_time: string
  published: boolean
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const { data } = await supabase
      .from('posts')
      .select('id, slug, title, date, reading_time, published')
      .order('date', { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('posts').update({ published: !current }).eq('id', id)
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, published: !current } : p))
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await supabase.from('posts').delete().eq('id', id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{posts.length} total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          + New post
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No posts yet.</p>
      ) : (
        <div className="space-y-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
            >
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${post.published ? 'bg-emerald-500/15 text-emerald-500' : 'bg-[var(--border)] text-[var(--muted)]'}`}>
                    {post.published ? 'published' : 'draft'}
                  </span>
                  <h3 className="font-medium text-sm truncate">{post.title}</h3>
                </div>
                <p className="text-xs text-[var(--muted)] font-mono">{post.date} · {post.reading_time}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublish(post.id, post.published)}
                  className="text-xs px-2.5 py-1 rounded border border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="text-xs px-2.5 py-1 rounded border border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post.id, post.title)}
                  className="text-xs px-2.5 py-1 rounded border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
