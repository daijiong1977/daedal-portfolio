import { supabaseServer } from '../lib/supabase'
import type { Metadata } from 'next'
import AboutContent from '../components/AboutContent'

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
    .select('bio, bio_cn, experience, experience_cn, facts, facts_cn, contact_email, github_url, twitter_url')
    .eq('id', 1)
    .single()

  const bio = about?.bio ?? [
    "I'm Daedal Dai — software engineer, open-source tinkerer, and perpetual learner.",
    "I've been writing software professionally for over eight years, and unprofessionally for longer than that. I started with PHP and jQuery, fell in love with Python, and eventually found my home in systems programming with Go and Rust.",
    "These days I spend most of my time on backend infrastructure: distributed systems, developer tooling, and the invisible plumbing that makes everything else possible. I find the reliability/performance/simplicity tradeoff space endlessly interesting.",
  ].join('\n\n')

  const bioCn = about?.bio_cn ?? ''

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

  const experienceCn: ExperienceItem[] = Array.isArray(about?.experience_cn)
    ? (about.experience_cn as unknown as ExperienceItem[])
    : []

  const facts: string[] = Array.isArray(about?.facts)
    ? (about.facts as string[])
    : [
        'Building distributed systems infrastructure at scale',
        'Contributing to open-source observability tooling',
        'Writing about engineering culture and technical craft',
        'Learning more Rust. Always more Rust.',
      ]

  const factsCn: string[] = Array.isArray(about?.facts_cn) ? (about.facts_cn as string[]) : []

  const contactEmail = about?.contact_email ?? 'hello@daedal.dev'
  const githubUrl = about?.github_url ?? 'https://github.com/daedaldai'
  const twitterUrl = about?.twitter_url ?? 'https://twitter.com/daedaldai'

  return (
    <AboutContent
      bio={bio}
      bioCn={bioCn}
      facts={facts}
      factsCn={factsCn}
      experience={experience}
      experienceCn={experienceCn}
      contactEmail={contactEmail}
      githubUrl={githubUrl}
      twitterUrl={twitterUrl}
    />
  )
}
