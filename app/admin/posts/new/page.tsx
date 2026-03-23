'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'

export default function NewPost() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    tags: '',
    date: new Date().toISOString().split('T')[0],
    reading_time: '5 min read',
    published: false,
  })

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function titleToSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { error } = await supabase.from('posts').insert({
      title: form.title,
      slug: form.slug || titleToSlug(form.title),
      description: form.description,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      date: form.date,
      reading_time: form.reading_time,
      published: form.published,
    })
    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      router.push('/admin/posts')
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← Posts
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">New post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" required>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => {
              set('title', e.target.value)
              if (!form.slug) set('slug', titleToSlug(e.target.value))
            }}
            className={inputCls}
          />
        </Field>

        <Field label="Slug" hint="Auto-generated from title">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>

        <Field label="Description">
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Content" hint="Paragraphs separated by blank lines">
          <textarea
            rows={16}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Tags" hint="Comma-separated">
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set('tags', e.target.value)}
              className={inputCls}
              placeholder="go, distributed-systems"
            />
          </Field>

          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Reading time">
            <input
              type="text"
              value={form.reading_time}
              onChange={(e) => set('reading_time', e.target.value)}
              className={inputCls}
              placeholder="5 min read"
            />
          </Field>

          <Field label="Published">
            <label className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent)]"
              />
              <span className="text-sm">Publish immediately</span>
            </label>
          </Field>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? 'Saving…' : 'Create post'}
          </button>
          <Link
            href="/admin/posts"
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

const inputCls = 'w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        {hint && <span className="ml-2 text-xs text-[var(--muted)] font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  )
}
