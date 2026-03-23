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
    <div className="max-w-2xl space-y-20">
      {/* Hero */}
      <section className="space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for new opportunities
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="gradient-text">Daedal Dai</span>
        </h1>

        <p className="text-lg text-[var(--muted)] leading-relaxed">
          Software engineer specialising in distributed systems and developer tooling.
          I build things that are fast, reliable, and hopefully a little bit elegant.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            View projects
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Recent Writing</h2>
          <Link href="/blog" className="text-sm text-[var(--accent)] hover:underline">
            All posts →
          </Link>
        </div>

        <div className="space-y-1">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-baseline justify-between gap-4 rounded-lg px-2 py-2.5 -mx-2 transition-colors hover:bg-[var(--card)]"
            >
              <span className="font-medium group-hover:text-[var(--accent)] transition-colors">
                {post.title}
              </span>
              <time className="shrink-0 font-mono text-xs text-[var(--muted)]">
                {post.date}
              </time>
            </Link>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Open Source</h2>
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
              className="card-hover group block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-2"
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
      <section className="space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">Current Stack</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: 'Languages', items: ['Go', 'Rust', 'TypeScript', 'Python'] },
            { label: 'Backend', items: ['gRPC', 'PostgreSQL', 'Redis', 'Kafka'] },
            { label: 'Infra', items: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus'] },
            { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind', 'tRPC'] },
          ].map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
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
