'use client'

/**
 * ResourceContent — bespoke detail page for the 4 Learn / Resources sub-pages.
 * Each gets a distinct theme: accent + hero motif. Content from
 * `content/learn.ts` (sourced from Website content part II.docx).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  PlayCircle,
  Quote,
  BookOpen,
  Calendar,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import type { CoreSystem as Section } from '@/content/coreSystems'

const EASE = [0.165, 0.84, 0.44, 1] as const

type SlugKey = 'resources' | 'customer-stories' | 'blog' | 'events'
type Motif = 'reels' | 'testimonial' | 'article' | 'calendar'

type Theme = {
  index: string
  accent: string
  accentSoft: string
  Icon: LucideIcon
  heroGradient: string
  motif: Motif
  ctaLabel: string
}

const THEMES: Record<SlugKey, Theme> = {
  resources: {
    index: '01',
    accent: '#0EA5E9',
    accentSoft: '#7DD3FC',
    Icon: PlayCircle,
    heroGradient: 'linear-gradient(160deg, #042F36 0%, #0C4A6E 55%, #0f1623 100%)',
    motif: 'reels',
    ctaLabel: 'Browse the resource library',
  },
  'customer-stories': {
    index: '02',
    accent: '#10B981',
    accentSoft: '#6EE7B7',
    Icon: Quote,
    heroGradient: 'linear-gradient(160deg, #022C22 0%, #064E3B 55%, #0f1623 100%)',
    motif: 'testimonial',
    ctaLabel: 'See customer outcomes',
  },
  blog: {
    index: '03',
    accent: '#8B5CF6',
    accentSoft: '#C4B5FD',
    Icon: BookOpen,
    heroGradient: 'linear-gradient(160deg, #2A1065 0%, #4C1D95 55%, #0f1623 100%)',
    motif: 'article',
    ctaLabel: 'Subscribe to the blog',
  },
  events: {
    index: '04',
    accent: '#F97316',
    accentSoft: '#FDBA74',
    Icon: Calendar,
    heroGradient: 'linear-gradient(160deg, #431407 0%, #7C2D12 55%, #0f1623 100%)',
    motif: 'calendar',
    ctaLabel: 'See upcoming events',
  },
}

function MotifWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      {children}
    </div>
  )
}

function ReelsMotif({ theme }: { theme: Theme }) {
  /* Stack of video thumbnails */
  return (
    <MotifWrapper>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          className="absolute"
          style={{
            top: `${20 + i * 14}%`,
            left: `${18 + i * 6}%`,
            right: `${24 - i * 4}%`,
            aspectRatio: '16 / 9',
            background: 'rgba(7,9,26,0.85)',
            border: `1px solid ${theme.accent}66`,
            borderRadius: 12,
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3 - i,
            boxShadow: `0 14px 30px ${theme.accent}22`,
          }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 'clamp(36px, 5vw, 56px)',
              height: 'clamp(36px, 5vw, 56px)',
              background: `${theme.accent}33`,
              border: `1px solid ${theme.accent}99`,
              color: theme.accentSoft,
            }}
          >
            <PlayCircle size={20} strokeWidth={1.6} />
          </span>
        </motion.div>
      ))}
    </MotifWrapper>
  )
}

function TestimonialMotif({ theme }: { theme: Theme }) {
  /* Big quote card */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '12% 14%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}66`,
          borderRadius: 16,
          padding: 'clamp(18px, 2.4vw, 28px)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          boxShadow: `0 14px 30px ${theme.accent}22`,
        }}
      >
        <span style={{ fontFamily: 'serif', fontSize: 60, lineHeight: 0.5, color: theme.accent }}>
          &ldquo;
        </span>
        <p
          style={{
            fontSize: 'clamp(13px, 1.05vw, 15px)',
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.5,
            fontWeight: 300,
            margin: 0,
          }}
        >
          We retired four systems and a CDC layer in one quarter. Latency dropped, on-call burden dropped, cost dropped.
        </p>
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: theme.accentSoft,
            marginTop: 'auto',
          }}
        >
          — VP PLATFORM, TIER-1 BANK
        </div>
      </div>
    </MotifWrapper>
  )
}

function ArticleMotif({ theme }: { theme: Theme }) {
  /* Article card with header bar + lines */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '12% 14%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}66`,
          borderRadius: 16,
          padding: 'clamp(18px, 2.4vw, 28px)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: `0 14px 30px ${theme.accent}22`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: theme.accentSoft,
            }}
          >
            POV / TECHNICAL
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              color: theme.accent,
            }}
          >
            06 MIN
          </span>
        </div>
        <div
          style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)',
            fontWeight: 500,
            color: 'white',
            lineHeight: 1.3,
          }}
        >
          AI is rewriting what a database is.
        </div>
        {[1, 0.85, 0.72, 0.92, 0.6].map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            style={{
              height: 4,
              borderRadius: 2,
              background: `${theme.accent}22`,
              border: `1px solid ${theme.accent}44`,
              transformOrigin: 'left',
              width: `${w * 100}%`,
            }}
          />
        ))}
      </div>
    </MotifWrapper>
  )
}

function CalendarMotif({ theme }: { theme: Theme }) {
  /* 6-cell calendar grid */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '14% 16%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}66`,
          borderRadius: 16,
          padding: 'clamp(16px, 2vw, 24px)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          boxShadow: `0 14px 30px ${theme.accent}22`,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: theme.accentSoft,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>UPCOMING</span>
          <span style={{ color: theme.accent }}>MAY 2026</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 4,
          }}
        >
          {Array.from({ length: 21 }, (_, i) => {
            const isEvent = [4, 9, 13, 18].includes(i)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: 4,
                  background: isEvent ? theme.accent : 'rgba(255,255,255,0.04)',
                  border: isEvent
                    ? `1px solid ${theme.accentSoft}`
                    : '1px solid rgba(255,255,255,0.08)',
                }}
              />
            )
          })}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 'auto',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: theme.accent,
            }}
          />
          4 EVENTS THIS MONTH
        </div>
      </div>
    </MotifWrapper>
  )
}

function HeroMotif({ theme }: { theme: Theme }) {
  switch (theme.motif) {
    case 'reels':
      return <ReelsMotif theme={theme} />
    case 'testimonial':
      return <TestimonialMotif theme={theme} />
    case 'article':
      return <ArticleMotif theme={theme} />
    case 'calendar':
      return <CalendarMotif theme={theme} />
  }
}

export default function ResourceContent({
  item,
  related,
}: {
  item: Section
  related: { title: string; body: string; href: string }[]
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const theme = THEMES[item.slug as SlugKey] ?? THEMES.resources

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: theme.heroGradient,
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
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
            background: `radial-gradient(circle, ${theme.accent}3D 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${theme.accentSoft}1A 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
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
                  color: theme.accentSoft,
                }}
              >
                <theme.Icon size={13} strokeWidth={2} />
                Learn · {theme.index}
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(36px, 5.6vw, 84px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  margin: '0 0 24px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {item.title}
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: 2,
                  width: 64,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${theme.accentSoft} 0%, ${theme.accent} 100%)`,
                  marginBottom: 28,
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 16px 0',
                  maxWidth: 560,
                }}
              >
                {item.subtitle}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 540,
                }}
              >
                {item.overview}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <HeroMotif theme={theme} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What's inside ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start mb-12">
            <div>
              <SectionLabel text="What's inside" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {item.headline}
              </h2>
            </div>
            <div className="lg:pt-8">
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.introBody}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {item.capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(20px, 2.2vw, 26px)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 40,
                      height: 40,
                      background: `${theme.accent}1A`,
                      border: `1px solid ${theme.accent}55`,
                      color: theme.accent,
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: 'rgba(10,34,128,0.45)',
                    }}
                  >
                    Category
                  </span>
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
                  {c.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center">
            <a
              href="https://docs.monkdb.com"
              target="_blank"
              rel="noreferrer"
              className="rl-cta inline-flex items-center gap-2"
              style={{
                background: theme.accent,
                color: 'white',
                borderRadius: 999,
                padding: '14px 28px',
                fontWeight: 600,
                fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                textDecoration: 'none',
                boxShadow: `0 10px 30px ${theme.accent}33`,
                transition: 'transform 250ms ease, box-shadow 250ms ease',
              }}
            >
              {theme.ctaLabel}
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Related (other Learn surfaces) ── */}
      {related.length > 0 && (
        <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="More from Learn" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10">
              {related.map((r, i) => (
                <motion.a
                  key={r.title}
                  href={r.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="rl-related group block rounded-2xl"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                    padding: 'clamp(20px, 2.2vw, 26px)',
                    textDecoration: 'none',
                    transition:
                      'border-color 350ms ease, box-shadow 350ms ease, transform 350ms ease',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: theme.accent,
                      }}
                    >
                      Learn
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.6}
                      className="rl-related-arrow"
                      style={{ color: theme.accent }}
                    />
                  </div>
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(17px, 1.5vw, 22px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {r.body}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner heading={item.ctaHeading} />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.rl-cta:hover) {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px ${theme.accent}55;
        }
        :global(.rl-related:hover) {
          border-color: ${theme.accent}55 !important;
          box-shadow: 0 18px 42px ${theme.accent}1A;
          transform: translateY(-3px);
        }
        :global(.rl-related:hover .rl-related-arrow) {
          transform: translateX(4px);
          transition: transform 280ms ease;
        }
      `}</style>
    </main>
  )
}
