'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'cn' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue>({ lang: 'cn', setLang: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('cn')

  useEffect(() => {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'cn') setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    localStorage.setItem('lang', l)
    setLangState(l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
