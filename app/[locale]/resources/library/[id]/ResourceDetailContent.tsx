'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Github,
  PlayCircle,
  Youtube,
  Download,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import type { ResourceItem, ResourceKind } from '@/content/resourceLibrary'
import { RESOURCE_KIND_LABELS } from '@/content/resourceLibrary'
import { localizedHref, type Locale } from '@/i18n/config'

const EASE = [0.165, 0.84, 0.44, 1] as const

const KIND_ICONS: Record<ResourceKind, LucideIcon> = {
  whitepaper: FileText,
  github: Github,
  demo: PlayCircle,
  video: Youtube,
}

const KIND_ACCENTS: Record<ResourceKind, { accent: string; soft: string }> = {
  whitepaper: { accent: '#1A38E8', soft: '#7DA8FF' },
  github: { accent: '#0A2280', soft: '#7DA8FF' },
  demo: { accent: '#1E8AFF', soft: '#7FB3FF' },
  video: { accent: '#0033A0', soft: '#7DA8FF' },
}

const KIND_CTA: Record<ResourceKind, { label: string; Icon: LucideIcon }> = {
  whitepaper: { label: 'Download PDF', Icon: Download },
  github: { label: 'View on GitHub', Icon: Github },
  demo: { label: 'Open demo', Icon: ExternalLink },
  video: { label: 'Watch on YouTube', Icon: Youtube },
}

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
      if (u.pathname.startsWith('/embed/')) return url
    }
    return null
  } catch {
    return null
  }
}

export default function ResourceDetailContent({
  item,
  related,
  locale,
}: {
  item: ResourceItem
  related: ResourceItem[]
  locale: Locale
}) {
  const { accent, soft } = KIND_ACCENTS[item.kind]
  const KindIcon = KIND_ICONS[item.kind]
  const { label: ctaLabel, Icon: CtaIcon } = KIND_CTA[item.kind]
  const embedUrl = item.kind === 'video' ? youtubeEmbedUrl(item.url) : null
  const backHref = localizedHref('/resources/resources', locale)

  const bodyParagraphs = (item.body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, #0A1326 0%, ${accent}33 55%, #0f1623 100%)`,
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(60px, 8vw, 110px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            right: '-12%',
            width: '60%',
            height: '70%',
            background: `radial-gradient(circle, ${accent}3D 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 mb-8"
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to resource library
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-2 mb-6"
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: soft,
              }}
            >
              <KindIcon size={13} strokeWidth={2} />
              {RESOURCE_KIND_LABELS[item.kind]}
              {item.meta ? <span style={{ color: 'rgba(255,255,255,0.45)' }}>· {item.meta}</span> : null}
            </span>
            <h1
              className="text-white"
              style={{
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 300,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                margin: '0 0 24px 0',
                textWrap: 'balance',
                textDecoration: 'none',
                maxWidth: 980,
              }}
            >
              {item.title}
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 300,
                lineHeight: 1.55,
                margin: '0 0 32px 0',
                maxWidth: 760,
              }}
            >
              {item.summary}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: accent,
                color: '#fff',
                borderRadius: 999,
                padding: '14px 28px',
                fontWeight: 600,
                fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                textDecoration: 'none',
                boxShadow: `0 14px 36px ${accent}55`,
                transition: 'transform 250ms ease',
              }}
            >
              <CtaIcon size={16} strokeWidth={2} />
              {ctaLabel}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Body + embed ── */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel text="About this resource" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(22px, 3vw, 40px)',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                  margin: '24px 0 16px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                What you'll get
              </h2>
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {item.kind === 'whitepaper' &&
                  'A long-form PDF you can read in-browser or download to share with your team.'}
                {item.kind === 'github' &&
                  'An open-source repository with code, issues, and a README explaining how it fits together.'}
                {item.kind === 'demo' &&
                  'A working environment that demonstrates the capability live, no install required.'}
                {item.kind === 'video' &&
                  'A recorded walkthrough you can watch end-to-end or jump through with chapter markers.'}
              </p>
            </div>
            <div>
              {embedUrl ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: `1px solid ${accent}44`,
                    boxShadow: `0 24px 60px ${accent}1F`,
                  }}
                >
                  <iframe
                    src={embedUrl}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {bodyParagraphs.length > 0 ? (
                    bodyParagraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-gray-600 dark:text-gray-400"
                        style={{
                          fontSize: 'clamp(14px, 1.15vw, 16px)',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {p}
                      </p>
                    ))
                  ) : (
                    <p
                      className="text-gray-600 dark:text-gray-400"
                      style={{
                        fontSize: 'clamp(14px, 1.15vw, 16px)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.summary}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {embedUrl && bodyParagraphs.length > 0 && (
            <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20">
              <div />
              <div className="space-y-4">
                {bodyParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(14px, 1.15vw, 16px)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text={`More ${RESOURCE_KIND_LABELS[item.kind].toLowerCase()}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10">
              {related.map((r, i) => {
                const RIcon = KIND_ICONS[r.kind]
                const a = KIND_ACCENTS[r.kind].accent
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={localizedHref(`/resources/library/${r.id}`, locale)}
                      className="block rounded-2xl"
                      style={{
                        background: '#fff',
                        border: '1px solid rgba(10,34,128,0.10)',
                        padding: 'clamp(20px, 2.2vw, 26px)',
                        textDecoration: 'none',
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="inline-flex items-center justify-center rounded-xl"
                          style={{
                            width: 36,
                            height: 36,
                            background: `${a}14`,
                            border: `1px solid ${a}44`,
                            color: a,
                          }}
                        >
                          <RIcon size={16} strokeWidth={1.8} />
                        </span>
                        <ArrowRight size={16} strokeWidth={1.6} style={{ color: a }} />
                      </div>
                      <h3
                        className="text-[#0A2280] dark:text-white"
                        style={{
                          fontSize: 'clamp(15px, 1.3vw, 18px)',
                          fontWeight: 500,
                          letterSpacing: '-0.005em',
                          lineHeight: 1.3,
                          margin: '0 0 6px 0',
                        }}
                      >
                        {r.title}
                      </h3>
                      <p
                        className="text-gray-600 dark:text-gray-400"
                        style={{
                          fontSize: 'clamp(13px, 1vw, 14.5px)',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {r.summary}
                      </p>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
