'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText,
  Github,
  PlayCircle,
  Youtube,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'
import {
  RESOURCE_LIBRARY,
  RESOURCE_KIND_LABELS,
  type ResourceItem,
  type ResourceKind,
} from '@/content/resourceLibrary'

const EASE = [0.165, 0.84, 0.44, 1] as const

const KIND_ICONS: Record<ResourceKind, LucideIcon> = {
  whitepaper: FileText,
  github: Github,
  demo: PlayCircle,
  video: Youtube,
}

const KIND_ACCENTS: Record<ResourceKind, string> = {
  whitepaper: '#1A38E8',
  github: '#0A2280',
  demo: '#0EA5E9',
  video: '#DC2626',
}

type Filter = ResourceKind | 'all'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'whitepaper', label: RESOURCE_KIND_LABELS.whitepaper },
  { id: 'github', label: RESOURCE_KIND_LABELS.github },
  { id: 'demo', label: RESOURCE_KIND_LABELS.demo },
  { id: 'video', label: RESOURCE_KIND_LABELS.video },
]

export default function ResourceLibrary() {
  const [filter, setFilter] = useState<Filter>('all')
  const [allItems, setAllItems] = useState<ResourceItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/resources', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data: { items?: ResourceItem[] }) => {
        if (cancelled) return
        setAllItems(Array.isArray(data.items) ? data.items : [])
        setLoaded(true)
      })
      .catch(() => {
        if (cancelled) return
        // On API failure, fall back to the static seed so the page is not blank.
        setAllItems(RESOURCE_LIBRARY)
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => {
    if (filter === 'all') return allItems
    return allItems.filter((it) => it.kind === filter)
  }, [filter, allItems])

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: allItems.length,
      whitepaper: 0,
      github: 0,
      demo: 0,
      video: 0,
    }
    for (const it of allItems) c[it.kind]++
    return c
  }, [allItems])

  return (
    <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text="Resource Library" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start mt-6 mb-10 lg:mb-12">
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(22px, 3vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            Browse the catalog
          </h2>
          <p
            className="text-gray-600 dark:text-gray-400 lg:pt-6"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            White papers, open-source repositories, live product demos, and
            recorded videos. Filter by type to find what you need.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {FILTERS.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className="inline-flex items-center gap-2 transition-colors"
                style={{
                  borderRadius: 999,
                  padding: '8px 16px',
                  fontSize: 'clamp(0.78rem, 1vw, 0.85rem)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  background: active ? '#1A38E8' : 'rgba(10,34,128,0.06)',
                  color: active ? '#ffffff' : '#0A2280',
                  border: active
                    ? '1px solid #1A38E8'
                    : '1px solid rgba(10,34,128,0.12)',
                }}
              >
                <span>{f.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '0.7rem',
                    opacity: 0.7,
                  }}
                >
                  {counts[f.id]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <ResourceCard key={it.id} item={it} index={i} />
          ))}
        </div>

        {loaded && items.length === 0 && (
          <div
            className="text-center text-gray-500 dark:text-gray-400"
            style={{ padding: '40px 0', fontSize: 14 }}
          >
            {allItems.length === 0
              ? 'No resources yet. Add some from /admin.'
              : 'No resources match this filter yet.'}
          </div>
        )}
      </div>
    </section>
  )
}

function ResourceCard({ item, index }: { item: ResourceItem; index: number }) {
  const Icon = KIND_ICONS[item.kind]
  const accent = KIND_ACCENTS[item.kind]
  const { locale } = useI18n()
  const href = item.id
    ? localizedHref(`/resources/library/${item.id}`, locale)
    : item.url

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
    >
      <Link
        href={href}
        className="group block rounded-2xl"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(10,34,128,0.10)',
          padding: 'clamp(20px, 2.2vw, 26px)',
          textDecoration: 'none',
          transition:
            'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = `0 14px 36px ${accent}1F`
          e.currentTarget.style.borderColor = `${accent}55`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'rgba(10,34,128,0.10)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center justify-center rounded-xl"
            style={{
              width: 40,
              height: 40,
              background: `${accent}14`,
              border: `1px solid ${accent}44`,
              color: accent,
            }}
          >
            <Icon size={18} strokeWidth={1.8} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'rgba(10,34,128,0.45)',
              textTransform: 'uppercase',
            }}
          >
            {RESOURCE_KIND_LABELS[item.kind]}
          </span>
        </div>
        <h3
          className="text-[#0A2280] dark:text-white"
          style={{
            fontSize: 'clamp(15px, 1.4vw, 20px)',
            fontWeight: 400,
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
            margin: '0 0 8px 0',
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-gray-600 dark:text-gray-400"
          style={{
            fontSize: 'clamp(13px, 1vw, 14.5px)',
            lineHeight: 1.55,
            margin: '0 0 18px 0',
          }}
        >
          {item.summary}
        </p>
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'rgba(10,34,128,0.55)',
              textTransform: 'uppercase',
            }}
          >
            {item.meta ?? 'Learn more'}
          </span>
          <ArrowRight
            size={14}
            strokeWidth={2}
            style={{ color: accent }}
            aria-hidden
          />
        </div>
      </Link>
    </motion.div>
  )
}
