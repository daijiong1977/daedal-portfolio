'use client'

import { useLang } from '../lib/lang-context'

interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
}

interface AboutData {
  bio: string
  bioCn: string
  facts: string[]
  factsCn: string[]
  experience: ExperienceItem[]
  experienceCn: ExperienceItem[]
  contactEmail: string
  githubUrl: string
  twitterUrl: string
}

export default function AboutContent(props: AboutData) {
  const { lang } = useLang()

  const bio = lang === 'cn' && props.bioCn ? props.bioCn : props.bio
  const facts = lang === 'cn' && props.factsCn.length > 0 ? props.factsCn : props.facts
  const experience = lang === 'cn' && props.experienceCn.length > 0 ? props.experienceCn : props.experience

  const bioParagraphs = bio.split('\n\n').filter(Boolean)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)] lg:items-start">
      <div className="space-y-8 text-[var(--foreground)]/90 leading-relaxed">
        <section className="surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 space-y-4">
          <p className="section-label">Profile</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {lang === 'cn' ? '关于我' : 'About Me'}
          </h1>
          {bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-xl text-[var(--foreground)] leading-relaxed font-medium' : ''}>
              {p}
            </p>
          ))}
        </section>

        {lang === 'cn' ? (
          <section className="surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">为何叫 &quot;Daedal&quot;？</h2>
            <p>
              <em>Daedal</em> 源自希腊语，与神话中建造迷宫的工匠代达罗斯（Daedalus）有关，意为&quot;精巧制作、独具匠心、错综复杂&quot;。我选择这个名字，是因为它捕捉到了我对软件的一种信念：优秀的工程是一门手艺，而不仅仅是一门技术学科。
            </p>
            <p>
              我所读过的最好的代码，与一件精心制作的实物具有同样的品质——你能感受到其中倾注的心血。
            </p>
          </section>
        ) : (
          <section className="surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 space-y-4">
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
        )}

        <section className="surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            {lang === 'cn' ? '当前在做什么' : "What I'm Working On"}
          </h2>
          <ul className="space-y-2">
            {facts.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1.5 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            {lang === 'cn' ? '工作经历' : 'Experience'}
          </h2>
          <div className="space-y-6">
            {experience.map((job, i) => (
              <div key={i} className="grid gap-x-4 gap-y-2 border-l-2 border-[var(--accent-soft)] pl-4 sm:grid-cols-[1fr,auto]">
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
      </div>

      <aside className="lg:sticky lg:top-24 space-y-5">
        <section className="surface-card rounded-[2rem] px-6 py-7 space-y-4">
          <p className="section-label">Contact</p>
          <h2 className="text-lg font-semibold tracking-tight">
            {lang === 'cn' ? '联系方式' : 'Get in Touch'}
          </h2>
          <p>
            {lang === 'cn'
              ? <>联系我的最佳方式是发送邮件至 <a href={`mailto:${props.contactEmail}`}>{props.contactEmail}</a>。我很乐意聊聊分布式系统、开源，或者工程文化。</>
              : <>The best way to reach me is <a href={`mailto:${props.contactEmail}`}>{props.contactEmail}</a>. I&apos;m always happy to chat about distributed systems, open source, or engineering culture.</>
            }
          </p>
          <p>
            {lang === 'cn' ? '我也在' : "I'm also on"}{' '}
            <a href={props.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
            {lang === 'cn' ? '和' : 'and'}{' '}
            <a href={props.twitterUrl} target="_blank" rel="noopener noreferrer">X/Twitter</a>
            {lang === 'cn' ? '上。' : '.'}
          </p>
        </section>

        <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-strong)] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
            {lang === 'cn' ? '工程取向' : 'Working Thesis'}
          </p>
          <p className="text-sm leading-relaxed text-[var(--foreground)]/84">
            {lang === 'cn'
              ? '好的系统不该只在理想路径上工作，也要在边界情况和未来修改里保持清晰。'
              : 'Good systems should not just survive the happy path. They should remain clear under edge cases, growth, and future edits.'}
          </p>
        </section>
      </aside>
    </div>
  )
}
