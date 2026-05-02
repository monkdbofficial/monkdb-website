'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme | undefined
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  // Sync from localStorage on mount. First paint is always 'light' (the default),
  // so dark-mode users may see a ~50ms flash on first load. We accept this so
  // we don't have to inject an inline script (which React 19 warns about).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored === 'dark' || stored === 'light') {
        setThemeState(stored)
        document.documentElement.classList.toggle('dark', stored === 'dark')
      }
    } catch {}
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {}
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return { theme: undefined as Theme | undefined, setTheme: () => {} }
  }
  return ctx
}
