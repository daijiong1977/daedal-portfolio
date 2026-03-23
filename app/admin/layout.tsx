'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login')
      } else {
        setChecking(false)
      }
    })
  }, [pathname, router])

  if (checking && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--muted)] text-sm">
        Checking authentication…
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen">
      {/* Admin nav bar */}
      <nav className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-semibold text-[var(--accent)]">
              Admin
            </Link>
            <Link href="/admin/posts" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Posts
            </Link>
            <Link href="/admin/about" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              About
            </Link>
            <Link href="/admin/feedback" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Feedback
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              ← View site
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.replace('/admin/login')
              }}
              className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
