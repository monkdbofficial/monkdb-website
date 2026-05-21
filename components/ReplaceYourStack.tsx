'use client'

/**
 * ReplaceYourStack — docx Page 1, Replace Your Stack section.
 *
 * Clean enterprise comparison table. Three columns:
 *   Workload  |  Traditional Stack (vendor names)  |  MonkDB (Native)
 * No marketing animations. Just the spec table buyers actually want to scan.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

type Row = {
  workload: string
  traditional: string
}

export default function ReplaceYourStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homeReplaceStack) ?? {}) as Record<
    string,
    string
  >

  const rows: Row[] = [
    {
      workload: t.row1Workload ?? 'Operational data',
      traditional: t.row1Traditional ?? 'PostgreSQL, MySQL',
    },
    {
      workload: t.row2Workload ?? 'Vector search',
      traditional: t.row2Traditional ?? 'Pinecone, Weaviate',
    },
    {
      workload: t.row3Workload ?? 'Time-series',
      traditional: t.row3Traditional ?? 'InfluxDB, TimescaleDB',
    },
    {
      workload: t.row4Workload ?? 'Streaming SQL',
      traditional: t.row4Traditional ?? 'Kafka + Flink',
    },
    {
      workload: t.row5Workload ?? 'Search and full-text',
      traditional: t.row5Traditional ?? 'Elasticsearch, OpenSearch',
    },
    {
      workload: t.row6Workload ?? 'Geospatial',
      traditional: t.row6Traditional ?? 'PostGIS, custom',
    },
    {
      workload: t.row7Workload ?? 'AI inference',
      traditional: t.row7Traditional ?? 'vLLM, Triton, custom',
    },
  ]

  const monkLabel = t.rowMonkDB ?? 'Native'

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-28"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Stack'} />

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
            {t.headline?.split(' with ')[0] ?? 'Replace complexity'}{' '}
            <span style={{ color: '#1A38E8' }}>with</span>{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.headline?.split(' with ')[1] ?? 'one system'}
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="self-end"
          >
            <p
              className="text-gray-600 dark:text-gray-400"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.7,
                margin: '0 0 12px 0',
                maxWidth: '560px',
              }}
            >
              {t.lead ??
                'Replace databases, pipelines, vector DBs, and AI layers with a single unified platform.'}
            </p>
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                fontWeight: 400,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '560px',
              }}
            >
              {t.explore ??
                'MonkDB reduces infrastructure overhead, simplifies architecture, and accelerates time to production.'}
            </p>
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(10,34,128,0.12)',
            background: 'white',
          }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[1.2fr_1.4fr_1fr]"
            style={{
              background: '#F8F4F0',
              borderBottom: '1px solid rgba(10,34,128,0.10)',
            }}
          >
            <div
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.55)',
              }}
            >
              {t.tableHeaderWorkload ?? 'Workload'}
            </div>
            <div
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.55)',
                borderLeft: '1px solid rgba(10,34,128,0.06)',
              }}
            >
              {t.tableHeaderTraditional ?? 'Traditional Stack'}
            </div>
            <div
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#1A38E8',
                borderLeft: '1px solid rgba(10,34,128,0.06)',
                background:
                  'linear-gradient(180deg, rgba(26,56,232,0.05) 0%, rgba(26,56,232,0.02) 100%)',
              }}
            >
              {t.tableHeaderMonkDB ?? 'MonkDB'}
            </div>
          </div>

          {/* Table rows */}
          {rows.map((r, i) => (
            <motion.div
              key={r.workload}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.3 + i * 0.05,
                ease: EASE,
              }}
              className="grid grid-cols-[1.2fr_1.4fr_1fr]"
              style={{
                borderBottom:
                  i < rows.length - 1
                    ? '1px solid rgba(10,34,128,0.06)'
                    : 'none',
              }}
            >
              {/* Workload */}
              <div
                className="text-gray-900 dark:text-white"
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                  fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {r.workload}
              </div>
              {/* Traditional vendors — strikethrough effect */}
              <div
                className="text-gray-500"
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: 'clamp(12px, 0.95vw, 13.5px)',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  borderLeft: '1px solid rgba(10,34,128,0.06)',
                  letterSpacing: '0.005em',
                }}
              >
                {r.traditional}
              </div>
              {/* MonkDB — Native */}
              <div
                className="flex items-center gap-2"
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                  borderLeft: '1px solid rgba(10,34,128,0.06)',
                  background: 'rgba(26,56,232,0.025)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center rounded flex-shrink-0"
                  style={{
                    width: 18,
                    height: 18,
                    background: 'rgba(26,56,232,0.10)',
                    color: '#1A38E8',
                  }}
                >
                  <Check size={11} strokeWidth={2.4} />
                </span>
                <span
                  style={{
                    color: '#1A38E8',
                    fontSize: 'clamp(12.5px, 1vw, 14px)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    textTransform: 'uppercase',
                  }}
                >
                  {monkLabel}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Footer summary row */}
          <div
            className="grid grid-cols-[1.2fr_1.4fr_1fr]"
            style={{
              background: '#F8F4F0',
              borderTop: '1px solid rgba(10,34,128,0.10)',
            }}
          >
            <div
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.5)',
              }}
            >
              {rows.length} workloads
            </div>
            <div
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(10,34,128,0.5)',
                borderLeft: '1px solid rgba(10,34,128,0.06)',
              }}
            >
              {rows.length}+ vendors · {rows.length}+ ops surfaces
            </div>
            <div
              className="flex items-center gap-2"
              style={{
                padding:
                  'clamp(14px, 1.6vw, 20px) clamp(16px, 2vw, 28px)',
                borderLeft: '1px solid rgba(10,34,128,0.06)',
                background:
                  'linear-gradient(180deg, rgba(26,56,232,0.06) 0%, rgba(26,56,232,0.02) 100%)',
              }}
            >
              <span
                style={{
                  color: '#1A38E8',
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  textTransform: 'uppercase',
                }}
              >
                1 binary · 1 vendor
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
