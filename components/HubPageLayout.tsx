'use client'

/**
 * HubPageLayout — landing/overview shell for sections that have many sub-pages
 * (e.g. /solutions/use-cases hub, /products/monksmartx hub).
 *
 *   Navbar
 *   PageBanner (title/subtitle props)
 *   Intro section (eyebrow + heading + body)
 *   Card grid (cards link to sub-pages)
 *   Optional closing block
 *   CTABanner
 *   Footer
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import PageBanner from './PageBanner'
import CTABanner from './CTABanner'
import HubDiagramBanner from './HubDiagramBanner'
import ScrollToTop from './ScrollToTop'
import ScrollProgressBar from './ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export type HubCard = {
  title: string
  body: string
  href: string
}

export type HubPageLayoutProps = {
  title: string
  subtitle?: string
  intro?: {
    eyebrow?: string
    title: string
    body: string
  }
  /**
   * Optional architecture / overview diagram from the docx. Renders as a
   * full-width dark feature panel between the intro and the card grid.
   */
  diagram?: {
    label: string
    src: string
    alt: string
    width: number
    height: number
    caption?: string
    tagline?: string
  }
  cards: HubCard[]
  cardsExploreLabel?: string
  closing?: {
    eyebrow?: string
    title: string
    body: string
  }
  ctaHeading?: string
  ctaDescription?: string
  ctaButton?: string
  ctaHref?: string
}

export default function HubPageLayout(props: HubPageLayoutProps) {
  const { locale } = useI18n()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title={props.title} subtitle={props.subtitle} />

      {/* Intro */}
      {props.intro && (
        <section className="bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-6 sm:gap-10 lg:gap-16"
            >
              <div className="flex flex-col gap-4">
                {props.intro.eyebrow && (
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#1A38E8',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#1A38E8',
                        display: 'inline-block',
                      }}
                    />
                    {props.intro.eyebrow}
                  </span>
                )}
                <h2
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: 'clamp(22px, 3vw, 48px)',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    margin: '0 0 clamp(28px, 3.5vw, 48px) 0',
                    maxWidth: 'clamp(580px, 75vw, 940px)',
                    textWrap: 'balance',
                    textDecoration: 'none',
                  }}
                >
                  {props.intro.title}
                </h2>
              </div>
              <p
                className="text-gray-600 dark:text-gray-400 self-center"
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {props.intro.body}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Optional architecture diagram from the docx */}
      {props.diagram && (
        <HubDiagramBanner
          label={props.diagram.label}
          src={props.diagram.src}
          alt={props.diagram.alt}
          width={props.diagram.width}
          height={props.diagram.height}
          caption={props.diagram.caption}
          tagline={props.diagram.tagline}
        />
      )}

      {/* Cards */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {props.cards.map((card, i) => {
              const href = card.href.startsWith('/')
                ? localizedHref(card.href, locale)
                : card.href
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={href}
                    className="group block rounded-[24px] overflow-hidden h-full hub-card"
                    style={{
                      background: 'white',
                      border: '1px solid rgba(10,34,128,0.08)',
                      padding: 'clamp(22px, 2.6vw, 30px)',
                      textDecoration: 'none',
                      transition:
                        'transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Top corner number */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center justify-center rounded-md flex-shrink-0"
                        style={{
                          width: 32,
                          height: 24,
                          background: 'rgba(26,56,232,0.10)',
                          border: '1px solid rgba(26,56,232,0.30)',
                          color: '#1A38E8',
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hub-card-arrow"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#F8F4F0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1A38E8',
                          transition: 'all 300ms ease',
                        }}
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <h3
                      className="text-gray-900"
                      style={{
                        fontSize: 'clamp(18px, 1.7vw, 24px)',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        marginBottom: '12px',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-gray-600 flex-1"
                      style={{
                        fontSize: 'clamp(14px, 1.1vw, 16px)',
                        fontWeight: 400,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {card.body}
                    </p>
                    <div
                      className="flex items-center gap-2 mt-6"
                      style={{
                        color: '#1A38E8',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      {props.cardsExploreLabel ?? 'Explore'}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing block */}
      {props.closing && (
        <section className="bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-[28px] overflow-hidden relative"
              style={{
                background:
                  'linear-gradient(135deg, #07091A 0%, #0A2280 50%, #050D6A 100%)',
                padding: 'clamp(36px, 5vw, 72px) clamp(24px, 4vw, 60px)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  opacity: 0.5,
                }}
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-center">
                <div className="flex flex-col gap-4">
                  {props.closing.eyebrow && (
                    <span
                      className="inline-flex items-center gap-2"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#1E8AFF',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#1E8AFF',
                          display: 'inline-block',
                        }}
                      />
                      {props.closing.eyebrow}
                    </span>
                  )}
                  <h2
                    className="text-white"
                    style={{
                      fontSize: 'clamp(22px, 3vw, 44px)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                      margin: 0,
                      maxWidth: 'clamp(420px, 90%, 720px)',
                      textWrap: 'balance',
                      textDecoration: 'none',
                    }}
                  >
                    {props.closing.title}
                  </h2>
                </div>
                <p
                  className="text-white/65"
                  style={{
                    fontSize: 'clamp(15px, 1.2vw, 18px)',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {props.closing.body}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <CTABanner
        heading={props.ctaHeading}
        description={props.ctaDescription}
        buttonText={props.ctaButton}
        buttonHref={props.ctaHref}
      />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.hub-card:hover) {
          transform: translateY(-4px);
          border-color: rgba(26, 56, 232, 0.3) !important;
          box-shadow: 0 18px 40px rgba(10, 20, 80, 0.12);
        }
        :global(.hub-card:hover .hub-card-arrow) {
          background: #1a38e8 !important;
          color: white !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </main>
  )
}
