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
  // Dark mode toggle is temporarily disabled. The site is forced to light mode.
  // To re-enable, restore the commented block below and restore the toggle
  // buttons in components/Navbar.tsx.
  const [theme] = useState<Theme>('light')

  // Ensure the `dark` class is never applied to <html>.
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  const setTheme = (_t: Theme) => {
    // no-op while dark mode is disabled
  }

  /*
  // Original implementation (re-enable when dark mode is restored):
  const [theme, setThemeState] = useState<Theme>('light')

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
  */

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
