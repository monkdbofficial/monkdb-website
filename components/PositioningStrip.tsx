'use client'

/**
 * PositioningStrip — docx Page 1, Positioning Strip section.
 *
 *   Headline: "From Data Systems to Execution Systems"
 *   Three points: Unify, Understand, Act.
 *
 * Pattern parity with About / Mission / ArchitecturePillars:
 *   - SectionLabel chapter marker
 *   - Editorial 2-col header (heading left, lead right)
 *   - 3-up cell row, hairline borders, mono numerals
 *   - section-grid background utility
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, BrainCircuit, Zap, type LucideIcon } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function PositioningStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homePositioning) ?? {}) as Record<
    string,
    string
  >

  const points: {
    n: string
    title: string
    body: string
    spec: string
    Icon: LucideIcon
  }[] = [
    {
      n: t.point1Number ?? '01',
      title: t.point1Title ?? 'Unify',
      body:
        t.point1Body ??
        'All data in one engine. Vector, time-series, geospatial, document, blob, and streaming.',
      spec: t.point1Spec ?? '9 workloads, 1 engine',
      Icon: Layers,
    },
    {
      n: t.point2Number ?? '02',
      title: t.point2Title ?? 'Understand',
      body:
        t.point2Body ??
        'Live AI context built into the engine. Intelligence runs where the data lives.',
      spec: t.point2Spec ?? 'Vector + hybrid retrieval',
      Icon: BrainCircuit,
    },
    {
      n: t.point3Number ?? '03',
      title: t.point3Title ?? 'Act',
      body:
        t.point3Body ??
        'Decisions trigger actions inside the system. No external orchestrators.',
      spec: t.point3Spec ?? 'In-engine triggers',
      Icon: Zap,
    },
  ]

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-6 sm:py-10 lg:py-12"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Positioning'} />

        {/* Editorial two-col intro — same shape as ArchitecturePillars */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mt-6 sm:mt-10 lg:mt-14 mb-10 sm:mb-14 lg:mb-20">
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
              textWrap: 'balance',
              margin: 0,
              textDecoration: 'none',
              maxWidth: 'clamp(280px, 100%, 640px)',
            }}
          >
            {t.headline?.split(' to ')[0] ?? 'From Data Systems'}{' '}
            <span style={{ color: '#1A38E8' }}>to</span>{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.headline?.split(' to ')[1] ?? 'Execution Systems'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="text-gray-600 dark:text-gray-300"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.65,
              maxWidth: '560px',
              margin: 0,
            }}
          >
            {t.lead ??
              'Three shifts that turn fragmented stacks into one continuous operating plane.'}
          </motion.p>
        </div>

        {/* 3 cells with hairline divider */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{
            borderTop: '1px solid rgba(10,34,128,0.12)',
          }}
        >
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.18 + i * 0.12,
                ease: EASE,
              }}
              className="relative"
              style={{
                padding: 'clamp(28px, 3vw, 44px) clamp(18px, 2vw, 28px)',
                borderBottom: '1px solid rgba(10,34,128,0.12)',
                borderLeft:
                  i > 0 ? '1px solid rgba(10,34,128,0.12)' : undefined,
              }}
            >
              {/* Icon + number row */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className="inline-flex items-center justify-center rounded-xl"
                  style={{
                    width: 'clamp(40px, 4vw, 48px)',
                    height: 'clamp(40px, 4vw, 48px)',
                    background:
                      'linear-gradient(135deg, rgba(26,56,232,0.10) 0%, rgba(30,138,255,0.08) 100%)',
                    border: '1px solid rgba(26,56,232,0.18)',
                    color: '#1A38E8',
                  }}
                >
                  <p.Icon size={20} strokeWidth={1.6} />
                </div>
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
                  {p.n}
                </span>
              </div>
              <h3
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 34px)',
                  fontWeight: 400,
                  letterSpacing: '-0.012em',
                  lineHeight: 1.15,
                  margin: '0 0 12px 0',
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(13.5px, 1.05vw, 15.5px)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: '320px',
                }}
              >
                {p.body}
              </p>
              {/* Spec line */}
              <div
                className="mt-5 pt-4"
                style={{
                  borderTop: '1px dashed rgba(10,34,128,0.10)',
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'rgba(10,34,128,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                {p.spec}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
