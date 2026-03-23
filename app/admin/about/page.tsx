'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
}

export default function AdminAbout() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [bio, setBio] = useState('')
  const [facts, setFacts] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [experience, setExperience] = useState<ExperienceItem[]>([])

  useEffect(() => {
    supabase
      .from('about')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setBio(data.bio)
          setFacts((data.facts as string[]).join('\n'))
          setContactEmail(data.contact_email)
          setGithubUrl(data.github_url)
          setTwitterUrl(data.twitter_url)
          setExperience((data.experience as unknown as ExperienceItem[]) ?? [])
        }
        setLoading(false)
      })
  }, [])

  function setExp(i: number, field: keyof ExperienceItem, value: string) {
    setExperience((prev) => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }

  function addExp() {
    setExperience((prev) => [...prev, { role: '', company: '', period: '', description: '' }])
  }

  function removeExp(i: number) {
    setExperience((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    const { error } = await supabase
      .from('about')
      .update({
        bio,
        facts: facts.split('\n').map((f) => f.trim()).filter(Boolean),
        contact_email: contactEmail,
        github_url: githubUrl,
        twitter_url: twitterUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        experience: experience as any,
      })
      .eq('id', 1)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  if (loading) return <div className="text-sm text-[var(--muted)]">Loading…</div>

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Edit about</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <Field label="Bio" hint="Use blank lines for paragraph breaks">
          <textarea
            rows={6}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Current work" hint="One item per line">
          <textarea
            rows={5}
            value={facts}
            onChange={(e) => setFacts(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Contact email">
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Twitter/X URL">
            <input type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Experience</label>
            <button type="button" onClick={addExp} className="text-xs text-[var(--accent)] hover:underline">
              + Add role
            </button>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Role">
                  <input type="text" value={exp.role} onChange={(e) => setExp(i, 'role', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Company">
                  <input type="text" value={exp.company} onChange={(e) => setExp(i, 'company', e.target.value)} className={inputCls} />
                </Field>
              </div>
              <Field label="Period">
                <input type="text" value={exp.period} onChange={(e) => setExp(i, 'period', e.target.value)} className={inputCls} placeholder="2023 – present" />
              </Field>
              <Field label="Description">
                <textarea rows={2} value={exp.description} onChange={(e) => setExp(i, 'description', e.target.value)} className={inputCls} />
              </Field>
              <button
                type="button"
                onClick={() => removeExp(i)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-500">Saved!</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

const inputCls = 'w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">
        {label}
        {hint && <span className="ml-2 text-xs text-[var(--muted)] font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  )
}
