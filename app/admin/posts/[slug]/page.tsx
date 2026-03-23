'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'

interface Props {
  params: Promise<{ slug: string }>
}

export default function EditPost({ params }: Props) {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [postId, setPostId] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    tags: '',
    date: '',
    reading_time: '',
    published: false,
  })

  useEffect(() => {
    params.then(({ slug: s }) => {
      setSlug(s)
      supabase
        .from('posts')
        .select('*')
        .eq('slug', s)
        .single()
        .then(({ data }) => {
          if (data) {
            setPostId(data.id)
            setForm({
              title: data.title,
              slug: data.slug,
              description: data.description,
              content: data.content,
              tags: (data.tags as string[]).join(', '),
              date: data.date,
              reading_time: data.reading_time,
              published: data.published,
            })
          }
          setLoading(false)
        })
    })
  }, [params])

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { error } = await supabase.from('posts').update({
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      date: form.date,
      reading_time: form.reading_time,
      published: form.published,
    }).eq('id', postId)
    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      router.push('/admin/posts')
    }
  }

  if (loading) {
    return <div className="text-sm text-[var(--muted)]">Loading post…</div>
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← Posts
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Title" required>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Slug">
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
              <span className="text-sm">Published</span>
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
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link
            href={`/blog/${slug}`}
            target="_blank"
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            View post ↗
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
