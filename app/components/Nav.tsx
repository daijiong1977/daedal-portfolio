'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-semibold tracking-[0.02em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors no-underline"
        >
          daedal<span className="text-[var(--accent)]">.</span>dev
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-2 py-1 soft-ring">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors no-underline
                  ${active
                    ? 'text-[var(--foreground)] bg-[var(--surface-strong)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-soft)]'
                  }`}
              >
                {label}
              </Link>
            )
          })}
          <div className="ml-2 pl-2 border-l border-[var(--border)] flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
