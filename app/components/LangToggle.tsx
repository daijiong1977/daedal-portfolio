'use client'

import { useLang } from '../lib/lang-context'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
      className="px-2.5 py-1 text-xs font-medium rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
      aria-label="Toggle language"
    >
      {lang === 'cn' ? 'EN' : '中文'}
    </button>
  )
}
