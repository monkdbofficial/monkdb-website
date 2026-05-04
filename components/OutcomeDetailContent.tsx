'use client'

/**
 * OutcomeDetailContent — distinct visual treatment for /outcomes/[slug] pages.
 * NOT the same as the generic SectionDetailContent. Each outcome page is a
 * 4-block narrative: hero metric, story, proof grid, industry impact table.
 */

import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowUpRight,
  TrendingDown,
  Zap,
  ShieldCheck,
  Workflow,
  FileCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import type {
  OutcomeDetail,
  OutcomeIconName,
} from '@/content/outcomesDetail'

const ICON_MAP: Record<OutcomeIconName, LucideIcon> = {
  'trending-down': TrendingDown,
  zap: Zap,
  'shield-check': ShieldCheck,
  workflow: Workflow,
  'file-check': FileCheck,
  timer: Timer,
}

const EASE = [0.165, 0.84, 0.44, 1] as const

function StatCounter({ value, suffix }: { value: string; suffix: string }) {
  // If the value is purely numeric, animate from 0. Otherwise (e.g. "<5", "0.8"),
  // render statically — animation would be misleading.
  const ref = useRef<HTMLSpanElement>(null)
  const sentinel = useRef<HTMLSpanElement>(null)
  const inView = useInView(sentinel, { once: true, margin: '-80px' })
  const numeric = /^\d+$/.test(value)

  useEffect(() => {
    if (!numeric || !inView || !ref.current) return
    const to = parseInt(value, 10)
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.floor(v).toString()
      },
    })
    return () => controls.stop()
  }, [inView, value, numeric])

  return (
    <>
      <span
        ref={sentinel}
        style={{ position: 'absolute', pointerEvents: 'none' }}
      />
      <span
        className="gradient-text-animate"
        style={{
          fontSize: 'clamp(80px, 14vw, 200px)',
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        <span ref={ref}>{numeric ? '0' : value}</span>
        <span
          style={{
            fontSize: '0.5em',
            marginLeft: '0.05em',
            color: '#1A38E8',
            opacity: 0.85,
          }}
        >
          {suffix}
        </span>
      </span>
    </>
  )
}

export default function OutcomeDetailContent({
  item,
  related,
}: {
  item: OutcomeDetail
  related: { title: string; refined: string; href: string }[]
}) {
  const { locale } = useI18n()
  const introRef = useRef<HTMLDivElement>(null)
  const introInView = useInView(introRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title={item.title} subtitle={item.refined} />

      {/* HERO STAT — large outline numeral with icon */}
      <section
        ref={introRef}
        className="relative overflow-hidden py-12 sm:py-20 lg:py-24"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
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
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            left: '20%',
            right: '20%',
            height: '80%',
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(30,138,255,0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Outcome" variant="dark" />
          <div className="grid grid-cols-1 lg:grid-cols-[0.55fr_0.45fr] gap-10 lg:gap-16 items-center mt-6 sm:mt-10 lg:mt-12">
            {/* Big stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="relative inline-flex items-center gap-5">
                <span
                  className="inline-flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{
                    width: 'clamp(56px, 6vw, 80px)',
                    height: 'clamp(56px, 6vw, 80px)',
                    background:
                      'linear-gradient(135deg, rgba(26,56,232,0.20) 0%, rgba(30,138,255,0.10) 100%)',
                    border: '1px solid rgba(127,179,255,0.30)',
                    color: '#7FB3FF',
                  }}
                >
                  {(() => {
                    const Icon = ICON_MAP[item.iconName]
                    return <Icon size={28} strokeWidth={1.5} />
                  })()}
                </span>
                <div
                  className="relative"
                  style={{
                    fontSize: 'clamp(80px, 14vw, 200px)',
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  <StatCounter
                    value={item.metric.value}
                    suffix={item.metric.suffix}
                  />
                </div>
              </div>
              <p
                className="mt-5 max-w-[440px]"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 'clamp(13.5px, 1.05vw, 15.5px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                }}
              >
                {item.metric.caption}
              </p>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(16px, 1.4vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  letterSpacing: '-0.005em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                {item.story}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROOF — 3 column grid on light bg */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Proof" />
          <h2
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12 lg:mb-14"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '40px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Why this outcome lands{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              with MonkDB
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {item.proof.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: '#1A38E8',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-[#0A2280] dark:text-white"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '14px 0 10px 0',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY IMPACT TABLE */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="By industry" />
          <h2
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-8 sm:mb-10"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 48px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '40px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            How {item.title.toLowerCase()} shows up across industries
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(10,34,128,0.12)',
              background: 'white',
            }}
          >
            <div
              className="grid grid-cols-[0.4fr_0.6fr]"
              style={{
                background: '#F8F4F0',
                borderBottom: '1px solid rgba(10,34,128,0.10)',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.55)',
              }}
            >
              <div
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 20px) clamp(18px, 2.2vw, 28px)',
                }}
              >
                Industry
              </div>
              <div
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 20px) clamp(18px, 2.2vw, 28px)',
                  borderLeft: '1px solid rgba(10,34,128,0.06)',
                }}
              >
                Result
              </div>
            </div>
            {item.industries.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                className="grid grid-cols-[0.4fr_0.6fr]"
                style={{
                  borderBottom:
                    i < item.industries.length - 1
                      ? '1px solid rgba(10,34,128,0.06)'
                      : 'none',
                }}
              >
                <div
                  className="text-gray-900 dark:text-white"
                  style={{
                    padding:
                      'clamp(14px, 1.6vw, 20px) clamp(18px, 2.2vw, 28px)',
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    fontWeight: 500,
                  }}
                >
                  {row.name}
                </div>
                <div
                  className="text-gray-600"
                  style={{
                    padding:
                      'clamp(14px, 1.6vw, 20px) clamp(18px, 2.2vw, 28px)',
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    borderLeft: '1px solid rgba(10,34,128,0.06)',
                  }}
                >
                  {row.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DRIVERS — solutions that produce this outcome */}
      {item.driverSolutions.length > 0 && (
        <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="Drivers" />
            <h2
              className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-8 sm:mb-10"
              style={{
                fontSize: 'clamp(24px, 3.2vw, 42px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '40px 0 0 0',
                textDecoration: 'none',
              }}
            >
              Solutions that produce this outcome
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {item.driverSolutions.map((s) => (
                <Link
                  key={s.href}
                  href={`/${locale}${s.href}`}
                  className="group block rounded-2xl overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                    padding: 'clamp(22px, 2.4vw, 30px)',
                    textDecoration: 'none',
                    transition: 'all 280ms ease',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-[#0A2280] dark:text-white"
                      style={{
                        fontSize: 'clamp(16px, 1.4vw, 20px)',
                        fontWeight: 500,
                        letterSpacing: '-0.005em',
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 36,
                        height: 36,
                        background: 'rgba(26,56,232,0.08)',
                        color: '#1A38E8',
                      }}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED — other outcomes */}
      {related.length > 0 && (
        <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="Other outcomes" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-10 lg:mt-12">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={`/${locale}${r.href}`}
                  className="group block rounded-2xl"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    textDecoration: 'none',
                  }}
                >
                  <h3
                    className="text-[#0A2280]"
                    style={{
                      fontSize: 'clamp(15px, 1.3vw, 18px)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                      fontWeight: 400,
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {r.refined}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner heading={item.ctaHeading} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
