'use client'

/**
 * HomeCapabilities — docx Page 1, Capabilities section.
 *
 *   Headline: "Six engines, one system"
 *   Six capability spec-cards.
 *
 * Enterprise spec-sheet pattern:
 *   - SectionLabel chapter marker
 *   - Editorial 2-col header
 *   - 6-card 3×2 grid. Each card is a structured "spec":
 *       row 1  — mono index 01–06 + Lucide icon + mono metric chip
 *       hairline divider
 *       row 2  — H3 title + body description
 *       hairline divider
 *       row 3  — concrete tech-keyword chips
 *   - Refined hover: accent rule slides in from the left, card lifts subtly
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Layers,
  Workflow,
  Activity,
  Gauge,
  ShieldCheck,
  Cloud,
  type LucideIcon,
} from 'lucide-react'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

type Cap = {
  title: string
  body: string
  metric: string
  tags: string[]
  Icon: LucideIcon
}

export default function HomeCapabilities() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homeCapabilities) ?? {}) as Record<
    string,
    string
  >

  // Build the spec list. Each entry pulls 4 concrete tech keywords from i18n.
  const tagsFor = (i: number, fallback: string[]) =>
    [
      t[`cap${i}Tag1`] ?? fallback[0],
      t[`cap${i}Tag2`] ?? fallback[1],
      t[`cap${i}Tag3`] ?? fallback[2],
      t[`cap${i}Tag4`] ?? fallback[3],
    ].filter(Boolean) as string[]

  const caps: Cap[] = [
    {
      title: t.cap1Title ?? 'Multi-model engine',
      body:
        t.cap1Body ??
        'Nine workloads in one binary. Query across them with standard SQL.',
      metric: t.cap1Metric ?? '9 workloads',
      tags: tagsFor(1, ['Vector', 'Time-Series', 'Geospatial', 'Document', 'Streaming SQL', 'Blob', 'Full-Text', 'Graph', 'Multi-Modal AI']),
      Icon: Layers,
    },
    {
      title: t.cap2Title ?? 'Hybrid query engine',
      body:
        t.cap2Body ??
        'Vector similarity, graph traversals, and full-text search combined in a single statement.',
      metric: t.cap2Metric ?? '1 dialect',
      tags: tagsFor(2, ['Vector', 'Graph', 'Full-Text']),
      Icon: Workflow,
    },
    {
      title: t.cap3Title ?? 'Real-time ingestion',
      body:
        t.cap3Body ??
        'Streaming and batch ingestion, sub-millisecond write path, no separate broker required.',
      metric: t.cap3Metric ?? '<1 ms write',
      tags: tagsFor(3, ['Kafka', 'CDC', 'S3 batch', 'Pulsar']),
      Icon: Activity,
    },
    {
      title: t.cap4Title ?? 'High performance',
      body:
        t.cap4Body ??
        'Vectorized execution, native code paths, and a compact memory layout. Built in C++.',
      metric: t.cap4Metric ?? 'C++ engine',
      tags: tagsFor(4, ['SIMD', 'Vectorized', 'ARM + x86', 'Zero-copy']),
      Icon: Gauge,
    },
    {
      title: t.cap5Title ?? 'Enterprise security',
      body:
        t.cap5Body ??
        'Identity, access, audit, and lineage built into every query before it executes.',
      metric: t.cap5Metric ?? 'SOC2 / ISO27001',
      tags: tagsFor(5, ['RBAC', 'ABAC', 'Audit log', 'AES-256']),
      Icon: ShieldCheck,
    },
    {
      title: t.cap6Title ?? 'Flexible deployment',
      body:
        t.cap6Body ??
        'Cloud, on-premises, edge, or air-gapped. The same binary, the same semantics.',
      metric: t.cap6Metric ?? 'ARM + x86_64',
      tags: tagsFor(6, ['Cloud', 'On-prem', 'Edge', 'Air-gapped']),
      Icon: Cloud,
    },
  ]

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Capabilities'} />

        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mt-6 sm:mt-10 lg:mt-14 mb-10 sm:mb-14 lg:mb-16">
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
              margin: 0,
              textWrap: 'balance',
              textDecoration: 'none',
              maxWidth: 'clamp(280px, 100%, 640px)',
            }}
          >
            {t.headline?.split(', ')[0] ?? 'Six engines'}
            <span style={{ color: '#1A38E8' }}>,</span>{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.headline?.split(', ')[1] ?? 'one system'}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: '560px',
              margin: 0,
            }}
          >
            {t.lead ??
              'MonkDB supports SQL, vector search, and real-time analytics in one execution layer.'}
          </motion.p>
        </div>

        {/* 6-card spec-sheet grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {caps.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.07,
                ease: EASE,
              }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              className="cap-card group relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'white',
                border: '1px solid rgba(10,34,128,0.10)',
              }}
            >
              {/* Hover accent rail (left edge) */}
              <span
                aria-hidden="true"
                className="cap-card-rail absolute left-0 top-0 bottom-0"
                style={{
                  width: '2px',
                  background:
                    'linear-gradient(180deg, #1A38E8 0%, #1E8AFF 100%)',
                  transform: 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 380ms ease',
                }}
              />

              {/* Row 1 — index + icon + metric chip */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: 'clamp(18px, 2vw, 22px) clamp(20px, 2.4vw, 28px)',
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.4)',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="inline-flex items-center justify-center rounded-lg"
                    style={{
                      width: 'clamp(36px, 3.6vw, 42px)',
                      height: 'clamp(36px, 3.6vw, 42px)',
                      background:
                        'linear-gradient(135deg, rgba(26,56,232,0.10) 0%, rgba(30,138,255,0.06) 100%)',
                      border: '1px solid rgba(26,56,232,0.16)',
                      color: '#1A38E8',
                    }}
                  >
                    <c.Icon size={18} strokeWidth={1.6} />
                  </span>
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 9px',
                    borderRadius: '6px',
                    background: 'rgba(26,56,232,0.06)',
                    border: '1px solid rgba(26,56,232,0.16)',
                    color: '#1A38E8',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#1A38E8',
                    }}
                  />
                  {c.metric}
                </span>
              </div>

              {/* Hairline divider */}
              <div
                aria-hidden="true"
                style={{
                  height: '1px',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(10,34,128,0.10) 8%, rgba(10,34,128,0.10) 92%, transparent 100%)',
                }}
              />

              {/* Row 2 — title + body, occupies the flex-1 middle space */}
              <div
                className="flex-1"
                style={{
                  padding:
                    'clamp(18px, 2vw, 24px) clamp(20px, 2.4vw, 28px)',
                }}
              >
                <h3
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.012em',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                  }}
                >
                  {c.title}
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
                  {c.body}
                </p>
              </div>

              {/* Hairline divider */}
              <div
                aria-hidden="true"
                style={{
                  height: '1px',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(10,34,128,0.10) 8%, rgba(10,34,128,0.10) 92%, transparent 100%)',
                }}
              />

              {/* Row 3 — tech-keyword chip row */}
              <div
                className="flex flex-wrap items-center gap-1.5"
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 18px) clamp(20px, 2.4vw, 28px)',
                  background: 'rgba(248,244,240,0.5)',
                }}
              >
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      background: 'white',
                      border: '1px solid rgba(10,34,128,0.10)',
                      color: 'rgba(10,34,128,0.7)',
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.cap-card:hover) {
          border-color: rgba(26, 56, 232, 0.30) !important;
          box-shadow: 0 18px 42px rgba(10, 34, 128, 0.08);
          transition:
            transform 360ms ease,
            box-shadow 360ms ease,
            border-color 360ms ease;
        }
        :global(.cap-card:hover .cap-card-rail) {
          transform: scaleY(1);
        }
      `}</style>
    </section>
  )
}
