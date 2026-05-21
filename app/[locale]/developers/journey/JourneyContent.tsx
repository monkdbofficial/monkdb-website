'use client'

/**
 * Developer Journey Map — visualises the 8-stage developer path from
 * Website content part II.docx, image 5.
 *
 *   Header (PageBanner with title/subtitle)
 *   Reference diagram (the source image embedded as a feature)
 *   8 stage cards rendered as a numbered grid (4×2 on desktop)
 *   Closing strip: "Powered by the 6 Core Systems"
 *   CTA + Footer
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import HubDiagramBanner from '@/components/HubDiagramBanner'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'
import { DEVELOPER_JOURNEY } from '@/content/developerJourney'

const EASE = [0.165, 0.84, 0.44, 1] as const

const POWERED_BY = [
  'Unified Operational Engine',
  'Real-Time Processing Engine',
  'AI-Native Execution Engine',
  'Decision Action Engine',
  'Edge to Cloud Execution Fabric',
  'Sovereignty and Trust Layer',
]

export default function JourneyContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { locale } = useI18n()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Developer Journey Map"
        subtitle="A guided path to understand, build, and run intelligent systems on MonkDB."
      />

      {/* Reference diagram from the docx */}
      <HubDiagramBanner
        label="Journey Map"
        src="/diagram-developer-journey.png"
        alt="MonkDB Developer Journey Map showing 8 stages from Discover to Optimize"
        width={1379}
        height={920}
        caption="From first contact to continuous optimization. The eight stages below correspond to the official MonkDB developer journey, with the six Core Systems powering every step."
        tagline="One System. One Truth. Real-Time Intelligence. Instant Action."
      />

      {/* 8-stage grid */}
      <section
        ref={ref}
        className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24"
      >
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Stages" />
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginTop: 'clamp(24px, 3vw, 48px)',
              marginBottom: 'clamp(12px, 1.4vw, 20px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Eight stages.{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              One continuous path.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-gray-600 dark:text-gray-400 mb-10 sm:mb-14"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: '720px',
              marginTop: '20px',
            }}
          >
            Each stage maps to a concrete outcome and a next-step CTA. Use this
            as a teaching tool, an onboarding checklist, or a reference for
            production rollout.
          </motion.p>

          {/* Stage cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DEVELOPER_JOURNEY.map((stage, i) => {
              const href = stage.ctaHref.startsWith('/')
                ? localizedHref(stage.ctaHref, locale)
                : stage.ctaHref
              const external = !stage.ctaHref.startsWith('/')
              return (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.06,
                    ease: EASE,
                  }}
                  className="journey-card group relative rounded-2xl flex flex-col overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                  }}
                >
                  {/* Top accent rail (animates in on hover) */}
                  <span
                    aria-hidden="true"
                    className="journey-card-rail absolute top-0 left-0 right-0"
                    style={{
                      height: '2px',
                      background:
                        'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 380ms ease',
                    }}
                  />
                  {/* Header */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding:
                        'clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 24px)',
                      borderBottom: '1px solid rgba(10,34,128,0.08)',
                      background: 'rgba(248,244,240,0.5)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        color: '#1A38E8',
                      }}
                    >
                      {stage.number}
                    </span>
                    {i < DEVELOPER_JOURNEY.length - 1 && (
                      <ArrowRight
                        size={16}
                        strokeWidth={1.6}
                        style={{ color: 'rgba(10,34,128,0.3)' }}
                      />
                    )}
                  </div>

                  {/* Body */}
                  <div
                    className="flex-1 flex flex-col"
                    style={{
                      padding:
                        'clamp(18px, 2vw, 24px) clamp(18px, 2vw, 24px)',
                    }}
                  >
                    <h3
                      className="text-gray-900 dark:text-white"
                      style={{
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        fontWeight: 400,
                        letterSpacing: '-0.012em',
                        lineHeight: 1.15,
                        margin: '0 0 6px 0',
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      className="text-[#1A38E8]"
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 500,
                        letterSpacing: '0.005em',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {stage.tagline}
                    </p>

                    <ul
                      className="space-y-2 flex-1"
                      style={{ listStyle: 'none', padding: 0, margin: 0 }}
                    >
                      {stage.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                          style={{
                            fontSize: 'clamp(12.5px, 0.95vw, 13.5px)',
                            lineHeight: 1.55,
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: 'rgba(26,56,232,0.4)',
                              marginTop: 7,
                              flexShrink: 0,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Outcome divider + line */}
                    <div
                      className="mt-5 pt-4"
                      style={{
                        borderTop: '1px dashed rgba(10,34,128,0.12)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(10,34,128,0.5)',
                          marginBottom: '6px',
                        }}
                      >
                        Outcome
                      </div>
                      <p
                        className="text-[#0A2280] dark:text-white/85"
                        style={{
                          fontSize: 'clamp(12.5px, 0.95vw, 13.5px)',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {stage.outcome}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-center justify-between"
                    style={{
                      padding:
                        'clamp(12px, 1.4vw, 16px) clamp(18px, 2vw, 24px)',
                      borderTop: '1px solid rgba(10,34,128,0.08)',
                      background: 'rgba(26,56,232,0.04)',
                      color: '#1A38E8',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      letterSpacing: '0.005em',
                    }}
                  >
                    <span>{stage.cta}</span>
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Powered by the 6 Core Systems */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(127,179,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7FB3FF',
              }}
            >
              Powered by the 6 Core Systems
            </span>
            <ul
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5"
              style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0' }}
            >
              {POWERED_BY.map((cs, i) => (
                <motion.li
                  key={cs}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: EASE,
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: '1px solid rgba(127,179,255,0.25)',
                    background: 'rgba(7,9,26,0.6)',
                    backdropFilter: 'blur(8px)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 'clamp(11.5px, 0.95vw, 13px)',
                    fontWeight: 500,
                    letterSpacing: '0.005em',
                  }}
                >
                  {cs}
                </motion.li>
              ))}
            </ul>
            <p
              className="mt-8"
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: 'clamp(11px, 0.95vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(127,179,255,0.7)',
              }}
            >
              One System. One Truth. Real-Time Intelligence. Instant Action.
            </p>
          </motion.div>
        </div>
      </section>

      <CTABanner
        heading="Start your MonkDB journey."
        description="Pick a stage and go. Or talk to an engineer for a guided proof of value."
        buttonText="Request a demo"
      />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.journey-card:hover) {
          transform: translateY(-3px);
          border-color: rgba(26, 56, 232, 0.25) !important;
          box-shadow: 0 18px 42px rgba(10, 34, 128, 0.10);
          transition:
            transform 320ms ease,
            box-shadow 320ms ease,
            border-color 320ms ease;
        }
        :global(.journey-card:hover .journey-card-rail) {
          transform: scaleX(1);
        }
      `}</style>
    </main>
  )
}
