import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../../src/types/database.types'

// This route can be triggered manually or by a cron job.
// It fetches public repos from GitHub and upserts them into the projects table.
const GITHUB_USERNAME = 'daijiong1977'
const FEATURED_REPOS = new Set(['daedal-portfolio', 'demousers']) // mark these as featured

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Missing Supabase service role key' }, { status: 500 })
  }

  // Use service role key for upserts (bypasses RLS)
  const supabase = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  })

  // Fetch all public repos from GitHub
  const repos: GitHubRepo[] = []
  let page = 1
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&per_page=100&page=${page}`,
      { headers: { Accept: 'application/vnd.github+json' }, next: { revalidate: 0 } }
    )
    if (!res.ok) {
      return NextResponse.json({ error: `GitHub API error: ${res.status}` }, { status: 502 })
    }
    const batch: GitHubRepo[] = await res.json()
    if (!batch.length) break
    repos.push(...batch)
    if (batch.length < 100) break
    page++
  }

  // Upsert all repos into projects table
  const rows = repos.map((r) => ({
    github_id: r.id,
    name: r.name,
    full_name: r.full_name,
    description: r.description ?? '',
    url: r.homepage || null,
    github_url: r.html_url,
    language: r.language || null,
    tags: r.topics ?? [],
    stars: r.stargazers_count,
    forks: r.forks_count,
    featured: FEATURED_REPOS.has(r.name),
    archived: r.archived,
    synced_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from('projects')
    .upsert(rows, { onConflict: 'github_id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ synced: rows.length })
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  homepage: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  archived: boolean
}
