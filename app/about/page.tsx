import { supabaseServer } from '../lib/supabase'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description: 'About Daedal Dai — software engineer, open-source contributor.',
}

interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
}

export default async function AboutPage() {
  const { data: about } = await supabaseServer
    .from('about')
    .select('bio, experience, facts, contact_email, github_url, twitter_url')
    .eq('id', 1)
    .single()

  const bioParagraphs = about?.bio
    ? about.bio.split('\n\n').filter(Boolean)
    : [
        "I'm Daedal Dai — software engineer, open-source tinkerer, and perpetual learner.",
        "I've been writing software professionally for over eight years, and unprofessionally for longer than that. I started with PHP and jQuery, fell in love with Python, and eventually found my home in systems programming with Go and Rust.",
        "These days I spend most of my time on backend infrastructure: distributed systems, developer tooling, and the invisible plumbing that makes everything else possible. I find the reliability/performance/simplicity tradeoff space endlessly interesting.",
      ]

  const experience: ExperienceItem[] = Array.isArray(about?.experience)
    ? (about.experience as unknown as ExperienceItem[])
    : [
        {
          role: 'Senior Software Engineer',
          company: 'Distributed Systems Lab',
          period: '2023 – present',
          description: 'Leading backend infrastructure for a real-time data platform processing 100k+ events/sec. Focus on reliability engineering and observability.',
        },
        {
          role: 'Software Engineer',
          company: 'Inference Co.',
          period: '2021 – 2023',
          description: 'Built the ML serving infrastructure for production AI models. Designed the feature store that powers real-time recommendations.',
        },
        {
          role: 'Software Engineer',
          company: 'Early-stage startup (stealth)',
          period: '2019 – 2021',
          description: 'First engineering hire. Designed and built the full backend from scratch. Survived two pivots.',
        },
      ]

  const facts: string[] = Array.isArray(about?.facts)
    ? (about.facts as string[])
    : [
        'Building distributed systems infrastructure at scale',
        'Contributing to open-source observability tooling',
        'Writing about engineering culture and technical craft',
        'Learning more Rust. Always more Rust.',
      ]

  const contactEmail = about?.contact_email || 'hello@daedal.dev'
  const githubUrl = about?.github_url || 'https://github.com/daedaldai'
  const twitterUrl = about?.twitter_url || 'https://twitter.com/daedaldai'

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-10">About Me</h1>

      <div className="space-y-8 text-[var(--foreground)]/90 leading-relaxed">
        <section className="space-y-4">
          {bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-xl text-[var(--foreground)] leading-relaxed font-medium' : ''}>
              {p}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Why &quot;Daedal&quot;?</h2>
          <p>
            <em>Daedal</em> comes from Greek — related to Daedalus, the master craftsman of myth
            who built the Labyrinth. It means skillfully made, ingenious, intricate. I picked it
            because it captures something I believe about software: good engineering is a craft,
            not just a technical discipline.
          </p>
          <p>
            The best code I&apos;ve read has the same quality as a well-made physical object —
            you can feel the care in it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">What I&apos;m Working On</h2>
          <ul className="space-y-2">
            {facts.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1.5 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.role} className="grid grid-cols-[1fr,auto] gap-x-4 gap-y-1">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{job.role}</h3>
                  <p className="text-sm text-[var(--accent)]">{job.company}</p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{job.description}</p>
                </div>
                <time className="text-xs font-mono text-[var(--muted)] text-right pt-0.5 whitespace-nowrap">
                  {job.period}
                </time>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Get in Touch</h2>
          <p>
            The best way to reach me is{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. I&apos;m always happy to
            chat about distributed systems, open source, or engineering culture.
          </p>
          <p>
            I&apos;m also on{' '}
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            and{' '}
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              X/Twitter
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
