'use client'
// dense-cards-v2

/**
 * DetailPageLayout — reusable shell for inner content pages.
 *
 * Used by every Phase 1 page (use-case sub-pages, MonkEdge, MonkSmartX hub
 * and sub-products, Developers). Same enterprise pattern across the suite:
 *
 *   Navbar
 *   PageBanner (overrides title/subtitle from props, theme matches global)
 *   Intro section (light, eyebrow + title + body)
 *   Problem section (parchment, eyebrow + title + body)   — optional
 *   Solution section (light, eyebrow + title + body)      — optional
 *   Capabilities grid (dark, 4-6 bento cards)
 *   Closing section (parchment, eyebrow + title + body)   — optional
 *   Related grid (light, cross-linking cards)             — optional
 *   CTABanner
 *   Footer
 *
 * No font-bold on headings. clamp() typography. Responsive grid breakpoints.
 * No em dashes in user copy.
 */

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import PageBanner from './PageBanner'
import CTABanner from './CTABanner'
import ScrollToTop from './ScrollToTop'
import ScrollProgressBar from './ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export type DetailSection = {
  eyebrow?: string
  title: string
  body: string | ReactNode
  variant?: 'light' | 'parchment' | 'dark'
}

export type CapabilityCard = {
  title: string
  body: string
  icon?: ReactNode
}

export type RelatedItem = {
  title: string
  body: string
  href: string
}

export type DetailPageLayoutProps = {
  /** Banner title (overrides PageBanner default) */
  title: string
  /** Banner subtitle (overrides PageBanner default) */
  subtitle?: string
  /** Ordered narrative sections shown above the capabilities grid */
  sections?: DetailSection[]
  /** Optional capability cards block */
  capabilities?: {
    eyebrow?: string
    title: string
    items: CapabilityCard[]
  }
  /** Optional sections shown after the capabilities grid */
  closingSections?: DetailSection[]
  /** Optional cross-link grid (e.g. related use cases) */
  related?: {
    eyebrow?: string
    title: string
    items: RelatedItem[]
    exploreCta?: string
  }
  /** Override CTABanner heading. Falls back to dictionary cta namespace. */
  ctaHeading?: string
  /** Override CTABanner description */
  ctaDescription?: string
  /** Override CTABanner button label */
  ctaButton?: string
  /** Override CTABanner href */
  ctaHref?: string
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Reusable atoms                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

function Eyebrow({ text, color = '#1A38E8' }: { text: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
        }}
      />
      {text}
    </span>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(22px, 3vw, 48px)',
        fontWeight: 300,
        letterSpacing: '-0.01em',
        lineHeight: 1.15,
        textWrap: 'balance',
        textDecoration: 'none',
      }}
    >
      {children}
    </h2>
  )
}

function NarrativeSection({
  section,
  index,
}: {
  section: DetailSection
  index: number
}) {
  const variant = section.variant ?? (index % 2 === 0 ? 'light' : 'parchment')
  const isDark = variant === 'dark'
  const bgClass =
    variant === 'parchment'
      ? 'bg-[#F8F4F0] dark:bg-[#0A1326]'
      : isDark
        ? 'bg-[#07091A]'
        : 'bg-white dark:bg-[#0f1623]'
  const titleColor = isDark ? 'text-white' : 'text-gray-900 dark:text-white'
  const bodyColor = isDark
    ? 'text-white/65'
    : 'text-gray-600 dark:text-gray-400'
  const eyebrowColor = isDark ? '#1E8AFF' : '#1A38E8'

  return (
    <section className={`${bgClass} py-10 sm:py-14 lg:py-20`}>
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-6 sm:gap-10 lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            {section.eyebrow && (
              <Eyebrow text={section.eyebrow} color={eyebrowColor} />
            )}
            <div className={titleColor}>
              <SectionHeading>{section.title}</SectionHeading>
            </div>
          </div>
          <div className={`flex flex-col justify-center ${bodyColor}`}>
            {typeof section.body === 'string' ? (
              <p
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  margin: 0,
                  letterSpacing: '0.005em',
                }}
              >
                {section.body}
              </p>
            ) : (
              section.body
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CapabilitiesGrid({
  data,
}: {
  data: NonNullable<DetailPageLayoutProps['capabilities']>
}) {
  const cols = data.items.length >= 6 ? 3 : data.items.length >= 4 ? 2 : 2
  const gridClass =
    cols === 3
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5'

  return (
    <section className="bg-white dark:bg-[#0f1623] pb-10 sm:pb-14 lg:pb-20">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-[28px] overflow-hidden relative"
          style={{
            background:
              'linear-gradient(180deg, #07091A 0%, #050D6A 100%)',
            padding: 'clamp(28px, 4vw, 56px) clamp(20px, 3.5vw, 48px)',
          }}
        >
          {/* Dot grid backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.5,
            }}
          />
          {/* Section header */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-6 lg:gap-16 items-end mb-8 sm:mb-10 lg:mb-12">
            <div className="flex flex-col gap-4">
              {data.eyebrow && <Eyebrow text={data.eyebrow} color="#1E8AFF" />}
              <div className="text-white">
                <SectionHeading>{data.title}</SectionHeading>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="hidden lg:block"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                marginBottom: '14px',
              }}
            />
          </div>

          {/* Cards — dense uniform grid */}
          <div className={`relative ${gridClass}`}>
            {data.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="capability-tile rounded-[20px] overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: 'clamp(20px, 2.2vw, 26px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="flex items-center gap-3 mb-3 sm:mb-4"
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(127,179,255,0.85)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '24px',
                      height: '1px',
                      background:
                        'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
                    }}
                  />
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 20px)',
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white/65"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function RelatedGrid({
  data,
  locale,
}: {
  data: NonNullable<DetailPageLayoutProps['related']>
  locale: string
}) {
  return (
    <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-10 sm:py-14 lg:py-20">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-4 mb-8 sm:mb-10 lg:mb-12"
        >
          {data.eyebrow && <Eyebrow text={data.eyebrow} />}
          <div className="text-gray-900 dark:text-white">
            <SectionHeading>{data.title}</SectionHeading>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {data.items.map((item, i) => {
            const target = item.href.startsWith('/')
              ? `/${locale}${item.href}`
              : item.href
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
              >
                <Link
                  href={target}
                  className="group block rounded-[20px] overflow-hidden h-full"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,20,60,0.08)',
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    textDecoration: 'none',
                    transition: 'all 250ms ease',
                  }}
                >
                  <div
                    className="related-card-inner h-full flex flex-col"
                  >
                    <h3
                      className="text-gray-900"
                      style={{
                        fontSize: 'clamp(15px, 1.4vw, 20px)',
                        fontWeight: 400,
                        lineHeight: 1.3,
                        marginBottom: '10px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-600 flex-1"
                      style={{
                        fontSize: 'clamp(13px, 1vw, 15px)',
                        fontWeight: 400,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {item.body}
                    </p>
                    <div
                      className="flex items-center gap-2 mt-5"
                      style={{
                        color: '#1A38E8',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.005em',
                      }}
                    >
                      {data.exploreCta ?? 'Explore'}
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Layout                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function DetailPageLayout(props: DetailPageLayoutProps) {
  const { locale } = useI18n()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title={props.title} subtitle={props.subtitle} />

      {/* Narrative sections */}
      {(props.sections ?? []).map((section, i) => (
        <NarrativeSection
          key={`section-${i}`}
          section={section}
          index={i}
        />
      ))}

      {/* Capabilities */}
      {props.capabilities && <CapabilitiesGrid data={props.capabilities} />}

      {/* Closing sections */}
      {(props.closingSections ?? []).map((section, i) => (
        <NarrativeSection
          key={`closing-${i}`}
          section={section}
          index={i}
        />
      ))}

      {/* Related grid */}
      {props.related && <RelatedGrid data={props.related} locale={locale} />}

      <CTABanner
        heading={props.ctaHeading}
        description={props.ctaDescription}
        buttonText={props.ctaButton}
        buttonHref={props.ctaHref}
      />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
