'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors no-underline"
        >
          daedal<span className="text-[var(--accent)]">.</span>dev
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors no-underline
                  ${active
                    ? 'text-[var(--foreground)] bg-[var(--border)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]'
                  }`}
              >
                {label}
              </Link>
            )
          })}
          <div className="ml-2 pl-2 border-l border-[var(--border)]">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
