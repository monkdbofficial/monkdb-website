'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

const STORAGE_KEY = 'monkdb-announcement-dismissed-v1'
const BANNER_HEIGHT_PX = 40

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { dict } = useI18n()
  const t = ((dict as Record<string, unknown>).banner ?? {}) as Record<
    string,
    string
  >

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      setDismissed(stored === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty(
      '--banner-h',
      dismissed ? '0px' : `${BANNER_HEIGHT_PX}px`,
    )
  }, [dismissed, mounted])

  if (!mounted || dismissed) return null

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore quota / privacy mode errors
    }
    setDismissed(true)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center"
      style={{
        height: `${BANNER_HEIGHT_PX}px`,
        backgroundColor: '#0A1020',
        color: 'rgba(255,255,255,0.86)',
        fontSize: 'clamp(12px, 0.95vw, 13px)',
        fontWeight: 400,
        letterSpacing: '0.01em',
        paddingLeft: '48px',
        paddingRight: '48px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="text-center">
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: '#1E8AFF',
            marginRight: 10,
            transform: 'translateY(-1px)',
            verticalAlign: 'middle',
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>
          {(t.prefix ?? 'Notice').replace(/[\s:：]+$/u, '')}
        </span>
        <span
          style={{
            margin: '0 10px',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          ·
        </span>
        <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
          {t.text ??
            'This site is under active development. Some pages and content may change.'}
        </span>
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t.dismiss ?? 'Dismiss announcement'}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center rounded-full transition-colors"
        style={{
          width: 22,
          height: 22,
          color: 'rgba(255,255,255,0.75)',
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 2L10 10M10 2L2 10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
