import { projects } from '../data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects and side experiments.',
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          Open-source tools, experiments, and things I&apos;ve built.
          Most live on{' '}
          <a href="https://github.com/daedaldai" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Featured */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-5">
          Featured
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((project) => (
            <div
              key={project.name}
              className="card-hover border border-[var(--card-border)] rounded-xl p-6 bg-[var(--card)] space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] leading-tight">{project.name}</h3>
                  <span className="text-xs text-[var(--muted)] font-mono">{project.year}</span>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono bg-[var(--border)] text-[var(--muted)] px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-5">
            Other
          </h2>
          <div className="space-y-1">
            {others.map((project) => (
              <div
                key={project.name}
                className="flex items-start justify-between gap-4 py-4 border-b border-[var(--border)] last:border-0"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-[var(--foreground)]">{project.name}</h3>
                    <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono bg-[var(--border)] text-[var(--muted)] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mt-1"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
