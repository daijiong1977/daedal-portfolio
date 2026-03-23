export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
}

export const posts: Post[] = [
  {
    slug: 'distributed-systems-observability',
    title: 'Distributed Systems Observability: Beyond Logs',
    date: 'March 12, 2026',
    description:
      'How to build meaningful telemetry for distributed systems using structured tracing, metrics correlation, and anomaly detection — lessons learned the hard way.',
    tags: ['distributed-systems', 'observability', 'Go'],
    readingTime: '12 min read',
  },
  {
    slug: 'rust-ownership-in-practice',
    title: "Rust's Ownership Model: From Confusion to Clarity",
    date: 'February 3, 2026',
    description:
      'I spent three months fighting the borrow checker before something clicked. This is the mental model that finally made Rust feel natural.',
    tags: ['rust', 'systems-programming'],
    readingTime: '9 min read',
  },
  {
    slug: 'cicd-from-prototype-to-production',
    title: 'From Prototype to Production: A CI/CD Story',
    date: 'January 18, 2026',
    description:
      'How we went from "deploy on Fridays and pray" to zero-downtime continuous delivery — the tools, the failures, and the culture shifts that got us there.',
    tags: ['devops', 'ci-cd', 'kubernetes'],
    readingTime: '15 min read',
  },
  {
    slug: 'the-art-of-code-review',
    title: 'The Art of Code Review',
    date: 'December 8, 2025',
    description:
      'Code review is a conversation, not an inspection. How to give reviews that make the team better, not just the code.',
    tags: ['engineering-culture', 'code-review'],
    readingTime: '7 min read',
  },
  {
    slug: 'understanding-llm-context-windows',
    title: 'Understanding LLM Context Windows for Engineers',
    date: 'November 20, 2025',
    description:
      'A practical guide to context window mechanics — what they are, why they matter for production AI applications, and how to design around their limits.',
    tags: ['ai', 'llm', 'architecture'],
    readingTime: '11 min read',
  },
]
