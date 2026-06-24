'use client'

/**
 * Press — chronological news feed + media kit + media inquiries.
 * Distinct from other company pages: vertical timeline-style article list.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { renderBrand } from '@/components/BrandAccent'
import { useI18n } from '@/i18n/I18nProvider'
import type { PressItem } from '@/content/press'
import { PRESS_CATEGORY_LABELS } from '@/content/press'
import type { PressAssetItem } from '@/content/pressAssets'

type Article = {
  date: string
  label: string
  title: string
  excerpt: string
  imageUrl?: string
  linkUrl?: string
}

function formatDate(iso: string, locale: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PressContent() {
  const { dict, locale } = useI18n()
  const t = (((dict as Record<string, unknown>).press) ?? {}) as Record<string, string>

  const [press, setPress] = useState<PressItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/press', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { items?: PressItem[] }) => {
        if (!cancelled) setPress(data.items ?? [])
      })
      .catch(() => {
        if (!cancelled) setPress([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Press releases are managed entirely from the admin panel and stored in
  // MongoDB. The page renders exactly what is in the database.
  const loading = press === null
  const ARTICLES: Article[] = (press ?? []).map((p) => ({
    date: p.date,
    label: PRESS_CATEGORY_LABELS[p.category] ?? p.category,
    title: p.title,
    excerpt: p.excerpt,
    imageUrl: p.imageUrl,
    linkUrl: p.linkUrl,
  }))

  const [assets, setAssets] = useState<PressAssetItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/press-assets', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { items?: PressAssetItem[] }) => {
        if (!cancelled) setAssets(data.items ?? [])
      })
      .catch(() => {
        if (!cancelled) setAssets([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Media-kit assets are managed from the admin panel and stored in MongoDB.
  const PRESS_ASSETS = assets ?? []

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Press'}
        subtitle={t.subtitle ?? 'Latest news, releases, and media resources from MonkDB.'}
      />

      {/* Article feed — vertical timeline */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.newsroomLabel ?? 'Newsroom'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginTop: 'clamp(24px, 3vw, 48px)',
              marginBottom: 'clamp(28px, 3.5vw, 56px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.newsroomTitlePart1 ?? 'What we have been'}{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.newsroomTitlePart2 ?? 'shipping and saying'}
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-16">
            {/* Left: timeline */}
            <ol
              className="relative flex flex-col gap-8 sm:gap-10"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {/* Vertical rule */}
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0"
                style={{
                  left: '6px',
                  width: '1px',
                  background:
                    'linear-gradient(180deg, rgba(26,56,232,0.5), rgba(26,56,232,0.05))',
                }}
              />
              {loading && (
                <li
                  className="relative pl-8 sm:pl-10 text-gray-500 dark:text-gray-400"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 16px)' }}
                >
                  {t.loading ?? 'Loading the latest news…'}
                </li>
              )}
              {!loading && ARTICLES.length === 0 && (
                <li
                  className="relative pl-8 sm:pl-10 text-gray-500 dark:text-gray-400"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.7 }}
                >
                  {t.empty ??
                    'No press releases yet. Check back soon for the latest MonkDB news.'}
                </li>
              )}
              {ARTICLES.map((a) => (
                <motion.li
                  key={`${a.date}-${a.title}`}
                  initial={false}
                  className="relative pl-8 sm:pl-10 press-item-in"
                >
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{
                      left: '0',
                      top: '6px',
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: 'white',
                      border: '2px solid #1A38E8',
                      boxShadow: '0 0 0 4px rgba(26,56,232,0.10)',
                    }}
                  />
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <time
                      dateTime={a.date}
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'rgba(10,34,128,0.55)',
                      }}
                    >
                      {formatDate(a.date, locale === 'en' ? 'en-US' : locale)}
                    </time>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#1A38E8',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(26,56,232,0.06)',
                        border: '1px solid rgba(26,56,232,0.16)',
                      }}
                    >
                      {a.label}
                    </span>
                  </div>
                  {a.imageUrl && (
                    <a
                      href={a.linkUrl || a.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden"
                      style={{
                        borderRadius: 14,
                        border: '1px solid rgba(10,34,128,0.10)',
                        margin: '0 0 14px 0',
                        maxWidth: 560,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-auto"
                        style={{
                          display: 'block',
                          objectFit: 'cover',
                          aspectRatio: '16 / 9',
                        }}
                      />
                    </a>
                  )}
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(18px, 1.7vw, 24px)',
                      fontWeight: 500,
                      letterSpacing: '-0.012em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {a.linkUrl ? (
                      <a
                        href={a.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 hover:underline"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <span>{renderBrand(a.title)}</span>
                        <ArrowUpRight
                          size={16}
                          style={{ marginTop: 4, flexShrink: 0, color: '#1A38E8' }}
                        />
                      </a>
                    ) : (
                      renderBrand(a.title)
                    )}
                  </h3>
                  {/<\/?[a-z][\s\S]*>/i.test(a.excerpt) ? (
                    <div
                      className="richtext text-gray-600 dark:text-gray-400"
                      style={{
                        fontSize: 'clamp(14px, 1.1vw, 16px)',
                        maxWidth: '720px',
                      }}
                      dangerouslySetInnerHTML={{ __html: a.excerpt }}
                    />
                  ) : (
                    <p
                      className="text-gray-600 dark:text-gray-400"
                      style={{
                        fontSize: 'clamp(14px, 1.1vw, 16px)',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        margin: 0,
                        maxWidth: '720px',
                      }}
                    >
                      {a.excerpt}
                    </p>
                  )}
                </motion.li>
              ))}
            </ol>

            {/* Right: media kit + inquiries sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-5">
              <div
                className="rounded-2xl"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.4vw, 28px)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#1A38E8',
                  }}
                >
                  {t.mediaKitLabel ?? 'Media Kit'}
                </span>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '12px 0 16px 0',
                  }}
                >
                  {t.mediaKitTitle ?? 'Brand assets and resources'}
                </h3>
                <ul
                  className="flex flex-col gap-3"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {assets !== null && PRESS_ASSETS.length === 0 && (
                    <li
                      style={{
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        color: '#6b7280',
                        lineHeight: 1.6,
                      }}
                    >
                      {t.mediaKitEmpty ?? 'Media-kit assets are coming soon.'}
                    </li>
                  )}
                  {PRESS_ASSETS.map((asset) => {
                    const inner = (
                      <>
                        <span style={{ fontWeight: 500 }}>{asset.label}</span>
                        <span className="flex items-center gap-2">
                          {asset.size && (
                            <span
                              style={{
                                fontFamily:
                                  'var(--font-mono, ui-monospace, monospace)',
                                fontSize: '10.5px',
                                fontWeight: 500,
                                color: 'rgba(10,34,128,0.5)',
                              }}
                            >
                              {asset.size}
                            </span>
                          )}
                          <Download size={14} style={{ color: '#1A38E8' }} />
                        </span>
                      </>
                    )
                    const liStyle = {
                      padding: '10px 14px',
                      background: 'white',
                      borderRadius: '10px',
                      border: '1px solid rgba(10,34,128,0.08)',
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      color: '#374151',
                    } as const
                    return (
                      <li key={asset.id}>
                        {asset.url ? (
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="flex items-center justify-between gap-3"
                            style={{ ...liStyle, textDecoration: 'none' }}
                          >
                            {inner}
                          </a>
                        ) : (
                          <div
                            className="flex items-center justify-between gap-3"
                            style={liStyle}
                          >
                            {inner}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div
                className="rounded-2xl text-white relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 60%, #050D6A 100%)',
                  padding: 'clamp(22px, 2.4vw, 28px)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-[10%] right-[10%]"
                  style={{
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                />
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#7FB3FF',
                  }}
                >
                  {t.inquiriesLabel ?? 'Media inquiries'}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '12px 0 12px 0',
                  }}
                >
                  {t.inquiriesTitle ?? 'Reach our communications team'}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13.5px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: '0 0 14px 0',
                  }}
                >
                  {t.inquiriesBody ?? 'Press inquiries, briefings, and analyst meetings.'}
                </p>
                <a
                  href="mailto:press@monkdb.com"
                  className="inline-flex items-center gap-2"
                  style={{
                    background: 'white',
                    color: '#0A2280',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '10px 16px',
                    borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={14} />
                  press@monkdb.com
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner heading={t.ctaHeading ?? 'Stay close to MonkDB news.'} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
