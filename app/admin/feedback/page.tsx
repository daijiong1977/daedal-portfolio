'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Feedback {
  id: string
  name: string
  email: string
  message: string
  post_slug: string | null
  reviewed: boolean
  created_at: string
}

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unreviewed'>('unreviewed')

  useEffect(() => {
    supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setFeedback((data as Feedback[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function markReviewed(id: string) {
    await supabase.from('feedback').update({ reviewed: true }).eq('id', id)
    setFeedback((prev) => prev.map((f) => f.id === id ? { ...f, reviewed: true } : f))
  }

  async function deleteFeedback(id: string) {
    if (!confirm('Delete this feedback?')) return
    await supabase.from('feedback').delete().eq('id', id)
    setFeedback((prev) => prev.filter((f) => f.id !== id))
  }

  const filtered = filter === 'unreviewed' ? feedback.filter((f) => !f.reviewed) : feedback

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Feedback</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            {feedback.filter((f) => !f.reviewed).length} unreviewed
          </p>
        </div>
        <div className="flex gap-2">
          {(['unreviewed', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-[var(--accent)] text-white' : 'border border-[var(--border)] hover:bg-[var(--card)]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No feedback yet.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-5 space-y-3 ${item.reviewed ? 'border-[var(--border)] opacity-60' : 'border-[var(--accent)]/30 bg-[var(--card)]'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.email && <span>{item.email} · </span>}
                    {new Date(item.created_at).toLocaleDateString()}
                    {item.post_slug && <span> · re: <span className="font-mono">{item.post_slug}</span></span>}
                  </p>
                </div>
                {item.reviewed && (
                  <span className="text-xs text-[var(--muted)] border border-[var(--border)] px-2 py-0.5 rounded-full shrink-0">
                    reviewed
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--foreground)]/90 leading-relaxed">{item.message}</p>
              <div className="flex gap-2">
                {!item.reviewed && (
                  <button
                    onClick={() => markReviewed(item.id)}
                    className="text-xs px-2.5 py-1 rounded border border-[var(--border)] hover:bg-[var(--background)] transition-colors"
                  >
                    Mark reviewed
                  </button>
                )}
                <button
                  onClick={() => deleteFeedback(item.id)}
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
