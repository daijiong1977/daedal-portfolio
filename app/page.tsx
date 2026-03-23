import Link from 'next/link'
import { supabaseServer } from './lib/supabase'

export const revalidate = 60

export default async function Home() {
  const [{ data: posts }, { data: projects }] = await Promise.all([
    supabaseServer
      .from('posts')
      .select('slug, title, date')
      .eq('published', true)
      .order('date', { ascending: false })
      .limit(4),
    supabaseServer
      .from('projects')
      .select('id, name, description, github_url, url, tags')
      .eq('featured', true)
      .order('stars', { ascending: false }),
  ])

  const recentPosts = posts ?? []
  const featuredProjects = projects ?? []

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid gap-8 pt-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.9fr)] lg:items-end">
        <div className="space-y-6 surface-card rounded-[2rem] px-7 py-8 sm:px-10 sm:py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new opportunities
          </div>

          <div className="space-y-4">
            <p className="section-label">Software Engineer</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.02]">
              Building calm, durable systems for messy real-world software.
            </h1>
            <p className="max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
              I work on distributed systems, developer tooling, and infrastructure that needs
              to stay legible under pressure. The goal is simple: make complex systems feel
              understandable, fast, and dependable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              About me
            </Link>
          </div>
        </div>

        <aside className="surface-card rounded-[2rem] px-6 py-6 sm:px-7 sm:py-7 space-y-5">
          <div>
            <p className="section-label mb-3">Current Focus</p>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--foreground)]/88">
              <li>Designing reliable backend paths for AI-heavy and distributed systems.</li>
              <li>Writing about engineering culture, reliability, and technical craft.</li>
              <li>Shipping small tools with a bias toward clarity over novelty.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[var(--background)] px-4 py-4 border border-[var(--border)]">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">Working Style</p>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/84">
              Low drama. Strong defaults. Systems that can survive real traffic and future edits.
            </p>
          </div>
        </aside>
      </section>

      {/* Recent Writing */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label mb-2">Writing</p>
            <h2 className="text-2xl font-semibold tracking-tight">Recent essays and notes</h2>
          </div>
          <Link href="/blog" className="text-sm text-[var(--accent)] hover:underline">
            All posts →
          </Link>
        </div>

        <div className="grid gap-3 rounded-[2rem] surface-card p-4 sm:p-5">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-transparent bg-[var(--background)] px-4 py-4 transition-colors hover:border-[var(--card-border)] hover:bg-[var(--card)] hover:no-underline sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="max-w-2xl font-medium leading-snug group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </span>
              <time className="shrink-0 font-mono text-xs text-[var(--muted)] uppercase tracking-[0.14em]">
                {post.date}
              </time>
            </Link>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label mb-2">Projects</p>
            <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
          </div>
          <Link href="/projects" className="text-sm text-[var(--accent)] hover:underline">
            All projects →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <a
              key={project.id}
              href={project.url ?? project.github_url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group block rounded-[1.6rem] border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3 soft-ring"
            >
              <h3 className="font-semibold group-hover:text-[var(--accent)] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--background)] border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Current Stack */}
      <section className="space-y-6 surface-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div>
          <p className="section-label mb-2">Tooling</p>
          <h2 className="text-2xl font-semibold tracking-tight">Current stack</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: 'Languages', items: ['Go', 'Rust', 'TypeScript', 'Python'] },
            { label: 'Backend', items: ['gRPC', 'PostgreSQL', 'Redis', 'Kafka'] },
            { label: 'Infra', items: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus'] },
            { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind', 'tRPC'] },
          ].map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--foreground)]/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
