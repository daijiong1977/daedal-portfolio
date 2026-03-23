import { posts } from '../../data/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
  }
}

// Placeholder post body content for demo
const bodyContent: Record<string, string[]> = {
  'distributed-systems-observability': [
    "Distributed systems fail in ways that are fundamentally different from monoliths. When you have dozens of services talking to each other, a single slow database query can cascade into a timeout storm that takes down half your platform — and your logs won't tell you why.",
    "The answer isn't more logs. It's structured, correlated telemetry: traces that span service boundaries, metrics that tell you what's happening right now, and the tooling to connect them when something goes wrong at 3am.",
    "In this post, I'll walk through the observability strategy we built for a platform handling 100k requests per second — what worked, what didn't, and the mental models that changed how I think about production systems.",
    "**Start with traces, not logs.** A trace tells the story of a single request as it moves through your system. Unlike logs, traces have causality baked in — you can see exactly which service called which, how long each hop took, and where time was lost.",
    "We use OpenTelemetry for instrumentation and Jaeger for storage. One thing that took us too long to learn: trace sampling strategy matters enormously. Head-based sampling (decide at the edge) is simple but misses rare failures. Tail-based sampling (decide after the fact) captures the interesting cases but is operationally harder.",
    "For metrics, we use Prometheus with a strict naming convention: `<namespace>_<subsystem>_<metric>_<unit>`. Consistency here pays off enormously when you're building dashboards at 2am.",
  ],
  'rust-ownership-in-practice': [
    "I first tried to learn Rust in 2021 and gave up after two weeks. The borrow checker felt arbitrary and hostile. I understood the rules intellectually but couldn't internalize them fast enough to make progress.",
    "Something changed on my second attempt. I was implementing a simple HTTP server and I stopped fighting the compiler. Instead, I started asking: why is the compiler rejecting this? What invariant is it protecting?",
    "That question — *what invariant is it protecting?* — is the mental shift that made Rust click for me.",
    "The ownership model enforces a single invariant: at any given moment, a value has exactly one owner, and references to it must not outlive the owner. That's it. The borrow checker is just the compiler verifying this invariant holds.",
    "Once you see it that way, error messages stop feeling adversarial. 'Cannot borrow as mutable because it is already borrowed as immutable' is the compiler saying: you'd have two live mutable views of this data, which breaks the invariant.",
  ],
  'cicd-from-prototype-to-production': [
    "In 2022, our team deployed on Fridays. We deployed manually, to a single server, while watching the logs scroll by in a Slack channel. It worked — until it didn't.",
    "A bad deploy on a Friday afternoon that corrupted our database took us 14 hours to recover from. The postmortem was brutal, but the lessons were clear: we needed automated testing, automated deployments, and the ability to roll back in under five minutes.",
    "What followed was eight months of infrastructure work that fundamentally changed how we operated. Here's what we built and why.",
    "**Phase 1: Get tests running automatically.** This sounds obvious, but the discipline of writing tests that pass reliably in CI is genuinely hard. Flaky tests are worse than no tests — they erode trust in the whole system. We spent three weeks just eliminating test flakiness before we could trust CI.",
    "**Phase 2: Deploy to staging automatically.** Every merge to main triggers a deploy to staging. We defined 'done' as 'running in staging,' not 'merged.' This single change made our feedback loops dramatically faster.",
    "**Phase 3: Blue-green deployments.** The killer feature for zero-downtime deploys. We run two identical environments and switch traffic between them. Rollback is instant — just switch back.",
  ],
  'the-art-of-code-review': [
    "Most code review advice focuses on what to look for in code. Check for bugs. Look for performance issues. Verify security boundaries. All correct, all important.",
    "But the thing most advice misses: code review is a conversation between people, and conversations have dynamics that code doesn't.",
    "The reviewer has context the author doesn't. The author has context the reviewer doesn't. The best reviews surface this asymmetry and use it to make the code — and both people — better.",
    "**Ask questions, not commands.** 'Have you considered handling the nil case here?' lands very differently than 'Handle the nil case here.' The first invites collaboration. The second is a command. Commands breed resentment; questions breed understanding.",
    "**Prefix opinions as opinions.** 'I'd probably use a map here' signals clearly that this is a preference, not a requirement. 'This should be a map' implies objectively correct truth where there may be none.",
    "**Approve when it's good enough, not perfect.** The goal of code review is not to produce perfect code. It's to produce code that's better than it would have been without review, that the team understands, and that can be shipped. Blocking good code waiting for perfect code has a real cost.",
  ],
  'understanding-llm-context-windows': [
    "If you're building production applications on top of large language models, understanding context windows is one of the most important things you can do. It determines what your model can 'see,' affects latency and cost, and shapes every design decision about how you structure your prompts.",
    "The simplest mental model: a context window is RAM. It's fast, it's expensive, and it's limited. Everything the model needs to reason about — the system prompt, conversation history, retrieved documents, your user's input — has to fit.",
    "Modern frontier models have context windows in the range of 128k to 1M tokens. One token is roughly 3-4 characters of English text, so 128k tokens is about 100k words — a short novel. That sounds like a lot until you start asking the model to summarize a codebase.",
    "**Context is not free.** Processing longer contexts costs more (linear in many architectures, quadratic in attention). Latency scales with context length. For production applications serving thousands of users, context window management is directly on your cost and latency critical path.",
    "**The lost-in-the-middle problem.** Research has shown that LLMs reliably pay more attention to content at the beginning and end of the context window, and less to content in the middle. If your most important information lives in the middle of a 100k token context, the model might effectively ignore it.",
  ],
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const body = bodyContent[slug] ?? [
    "This post is still being written. Check back soon!",
  ]

  return (
    <article className="max-w-2xl">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-10 no-underline"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        All posts
      </Link>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono bg-[var(--border)] text-[var(--muted)] px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <p className="text-lg text-[var(--muted)] leading-relaxed border-l-2 border-[var(--accent)] pl-4">
          {post.description}
        </p>
      </header>

      {/* Body */}
      <div className="space-y-5 text-[var(--foreground)] leading-relaxed">
        {body.map((paragraph, i) => {
          if (paragraph.startsWith('**') && paragraph.includes('.**')) {
            const [boldPart, ...rest] = paragraph.split('**').filter(Boolean)
            return (
              <p key={i}>
                <strong className="font-semibold text-[var(--foreground)]">{boldPart.replace(/\.$/, '')}.{' '}</strong>
                {rest.join(' ')}
              </p>
            )
          }
          return <p key={i} className="text-[var(--foreground)]/90">{paragraph}</p>
        })}
      </div>

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-[var(--border)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors no-underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
