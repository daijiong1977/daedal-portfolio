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
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        {lang === 'cn' ? '关于我' : 'About Me'}
      </h1>

      <div className="space-y-8 text-[var(--foreground)]/90 leading-relaxed">
        <section className="space-y-4">
          {bioParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-xl text-[var(--foreground)] leading-relaxed font-medium' : ''}>
              {p}
            </p>
          ))}
        </section>

        {lang === 'cn' ? (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">为何叫 &quot;Daedal&quot;？</h2>
            <p>
              <em>Daedal</em> 源自希腊语，与神话中建造迷宫的工匠代达罗斯（Daedalus）有关，意为"精巧制作、独具匠心、错综复杂"。我选择这个名字，是因为它捕捉到了我对软件的一种信念：优秀的工程是一门手艺，而不仅仅是一门技术学科。
            </p>
            <p>
              我所读过的最好的代码，与一件精心制作的实物具有同样的品质——你能感受到其中倾注的心血。
            </p>
          </section>
        ) : (
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
        )}

        <section className="space-y-4">
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

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            {lang === 'cn' ? '工作经历' : 'Experience'}
          </h2>
          <div className="space-y-6">
            {experience.map((job, i) => (
              <div key={i} className="grid grid-cols-[1fr,auto] gap-x-4 gap-y-1">
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
      </div>
    </div>
  )
}
