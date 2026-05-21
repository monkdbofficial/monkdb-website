'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname, useRouter } from 'next/navigation'
import { Globe, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { defaultLocale, locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'

const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const

type Props = {
  iconColor: string
  panelBg: string
  panelBorder: string
  panelText: string
  panelTextHover: string
  variant?: 'compact' | 'full'
}

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function LanguageSwitcher({
  iconColor,
  panelBg,
  panelBorder,
  panelText,
  panelTextHover,
  variant = 'compact',
}: Props) {
  const { locale, dict } = useI18n()
  const navDict = (((dict as Record<string, unknown>).nav) ?? {}) as Record<string, string>
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useIsoLayoutEffect(() => {
    if (!open) return
    const updateCoords = () => {
      const btn = buttonRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      setCoords({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      })
    }
    updateCoords()
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, true)
    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClickAway = (e: MouseEvent) => {
      const target = e.target as Node
      if (buttonRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onClickAway)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onClickAway)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const switchTo = (next: Locale) => {
    setOpen(false)
    if (next === locale) return
    const segments = pathname.split('/').filter(Boolean)
    // Strip any existing locale prefix so we work with the bare path.
    if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
      segments.shift()
    }
    // Default locale renders unprefixed (canonical /about, not /en/about).
    // The proxy rewrites unprefixed paths to /<defaultLocale> internally.
    if (next === defaultLocale) {
      const target = segments.length === 0 ? '/' : '/' + segments.join('/')
      router.push(target)
      return
    }
    router.push('/' + [next, ...segments].join('/'))
  }

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: SANAS_EASE }}
          style={{
            position: 'fixed',
            top: coords.top,
            right: coords.right,
            minWidth: '180px',
            backgroundColor: panelBg,
            border: `1px solid ${panelBorder}`,
            borderRadius: '14px',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 16px 40px rgba(10, 20, 80, 0.22)',
            padding: '6px',
            zIndex: 9999,
          }}
        >
          {locales.map((loc) => {
            const active = loc === locale
            return (
              <button
                key={loc}
                type="button"
                onClick={() => switchTo(loc)}
                className="w-full flex items-center justify-between rounded-lg"
                style={{
                  padding: '8px 12px',
                  color: active ? panelTextHover : panelText,
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 150ms linear, color 150ms linear',
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget
                  t.style.background = 'rgba(26,56,232,0.08)'
                  t.style.color = panelTextHover
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget
                  t.style.background = 'transparent'
                  t.style.color = active ? panelTextHover : panelText
                }}
              >
                <span>{localeNames[loc]}</span>
                {active && <Check size={14} strokeWidth={2.2} />}
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={navDict.switchLanguage ?? 'Switch language'}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full"
        style={{
          color: iconColor,
          padding: variant === 'full' ? '8px 12px' : '8px',
          background: 'transparent',
          border: 'none',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'color 150ms linear',
        }}
      >
        <Globe size={16} strokeWidth={1.9} />
        {variant === 'full' && <span>{localeFlags[locale]}</span>}
      </button>

      {mounted && createPortal(panel, document.body)}
    </>
  )
}
