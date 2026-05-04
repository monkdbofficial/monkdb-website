'use client'

/**
 * WhatIsMonkDB — docx Page 1, "What is MonkDB" section.
 *
 *   Headline: "The AI-Native Unified Execution Engine"
 *   Body + Explore More + proof terminal showing one SQL query hitting
 *   multiple workloads (vector, time-series, geospatial, document) at once.
 *
 * Pattern parity with About + AIReady (SQL block):
 *   - SectionLabel chapter marker
 *   - Two-column 42% / 1fr split
 *   - gradient-text-animate accent on key noun
 *   - Right column: terminal-style mac chrome with syntax-highlighted SQL,
 *     workload chips above the terminal showing what the query touches.
 */

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

/* ── Syntax-highlight token helpers ─────────────────────────────────── */
const KW = (s: string) => <span style={{ color: '#C991F0' }}>{s}</span>
const FN = (s: string) => <span style={{ color: '#7FB3FF' }}>{s}</span>
const PARAM = (s: string) => <span style={{ color: '#FFB86C' }}>{s}</span>
const STR = (s: string) => <span style={{ color: '#A7F070' }}>{s}</span>
const NUM = (s: string) => <span style={{ color: '#A7F070' }}>{s}</span>
const CMT = (s: string) => (
  <span style={{ color: '#6B7EA8', fontStyle: 'italic' }}>{s}</span>
)

/* The proof query — vector + time-series + geospatial + document, all at once */
const sqlLines: ReactNode[] = [
  <>{CMT('-- One query, four workloads, one engine')}</>,
  <>{KW('SELECT')}{' '}{FN('id')}{', '}{FN('name')}{','}</>,
  <>{'  v.embedding '}{FN('<=>')}{' '}{PARAM('$query_vec')}{' '}{KW('AS')}{' similarity,'}</>,
  <>{'  '}{FN('ST_Distance')}{'(geo, '}{PARAM('$origin')}{') '}{KW('AS')}{' distance_m,'}</>,
  <>{'  ts.value '}{KW('AS')}{' last_reading'}</>,
  <>{KW('FROM')}{' events e'}</>,
  <>{KW('JOIN')}{' vectors    v  '}{KW('ON')}{' v.event_id  = e.id'}</>,
  <>{KW('JOIN')}{' timeseries ts '}{KW('ON')}{' ts.event_id = e.id'}</>,
  <>{KW('WHERE')}{' ts.ts > '}{FN('now')}{'() '}{KW('- INTERVAL')}{' '}{STR("'1 minute'")}</>,
  <>{'  '}{KW('AND')}{' v.embedding '}{FN('<=>')}{' '}{PARAM('$query_vec')}{' < '}{NUM('0.30')}</>,
  <>{KW('ORDER BY')}{' similarity '}{KW('ASC')}{' '}{KW('LIMIT')}{' '}{NUM('25')}{';'}</>,
]

const queryWorkloads = ['Vector', 'Time-Series', 'Geospatial', 'SQL']

export default function WhatIsMonkDB() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homeWhatIs) ?? {}) as Record<
    string,
    string
  >

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Platform'} />

        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-10 lg:gap-16 items-center mt-6 sm:mt-10 lg:mt-14">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              className="text-gray-900 dark:text-white"
              style={{
                fontSize: 'clamp(28px, 4vw, 58px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                margin: 0,
                textWrap: 'balance',
                textDecoration: 'none',
              }}
            >
              {t.headline?.split('Unified Execution')[0] ?? 'The AI-Native '}
              <span className="gradient-text-animate" style={{ fontWeight: 500 }}>
                Unified Execution Engine
              </span>
            </h2>

            <div
              aria-hidden="true"
              style={{
                height: '2px',
                width: '48px',
                marginTop: '24px',
                borderRadius: '2px',
                background:
                  'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
              }}
            />

            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                marginTop: '24px',
                maxWidth: '560px',
              }}
            >
              {t.lead ??
                'MonkDB is a unified system where data is ingested, understood, and acted upon in real time. No pipelines, no delays, no fragmented tools.'}
            </p>

            {/* Workload pills strip */}
            <ul
              className="flex flex-wrap gap-2 mt-7"
              style={{ listStyle: 'none', padding: 0, margin: '28px 0 0 0' }}
            >
              {[
                t.chip1 ?? 'Vector',
                t.chip2 ?? 'Time-Series',
                t.chip3 ?? 'Geospatial',
                t.chip4 ?? 'Document',
                t.chip5 ?? 'Blob',
                t.chip6 ?? 'Streaming SQL',
                t.chip7 ?? 'Full-Text',
                t.chip8 ?? 'Key-Value',
                t.chip9 ?? 'Graph',
              ].map((label, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + i * 0.04,
                    ease: EASE,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 12px',
                      borderRadius: '999px',
                      border: '1px solid rgba(26,56,232,0.18)',
                      background: 'rgba(26,56,232,0.05)',
                      color: '#1A38E8',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.005em',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background:
                          i % 2 === 0 ? '#1A38E8' : '#60a0ff',
                      }}
                    />
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontSize: 'clamp(13.5px, 1.05vw, 15.5px)',
                lineHeight: 1.7,
                marginTop: '28px',
                maxWidth: '560px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(10,34,128,0.10)',
              }}
            >
              {t.exploreBody ??
                'MonkDB consolidates vector, time-series, geospatial, document, blob, and streaming data into a single platform.'}
            </p>
          </motion.div>

          {/* RIGHT — terminal-style proof block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            className="relative"
          >
            {/* Workload-touched chips above the terminal */}
            <div
              className="flex flex-wrap items-center gap-2 mb-3"
              aria-label="Workloads touched by this query"
            >
              <span
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: 'rgba(10,34,128,0.55)',
                  textTransform: 'uppercase',
                  marginRight: '4px',
                }}
              >
                Touched
              </span>
              {queryWorkloads.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.08,
                    ease: EASE,
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: '#0A2280',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#7FB3FF',
                      boxShadow: '0 0 6px rgba(127,179,255,0.9)',
                    }}
                  />
                  {w}
                </motion.span>
              ))}
            </div>

            {/* Terminal */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #0E1430 0%, #07091A 100%)',
                border: '1px solid rgba(127,179,255,0.18)',
                boxShadow:
                  '0 24px 60px rgba(10,34,128,0.28), 0 8px 24px rgba(10,34,128,0.18), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Terminal chrome bar */}
              <div
                className="flex items-center gap-2"
                style={{
                  padding: '11px 14px',
                  borderBottom: '1px solid rgba(127,179,255,0.10)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: '#FF6058',
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: '#FFBC30',
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: '#28C940',
                  }}
                />
                <span
                  className="ml-3"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.04em',
                  }}
                >
                  monkdb shell · production
                </span>
                <span
                  className="ml-auto inline-flex items-center gap-1.5"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    color: '#7FB3FF',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#34D399',
                      boxShadow: '0 0 6px rgba(52,211,153,0.9)',
                    }}
                  />
                  Live
                </span>
              </div>

              {/* SQL body */}
              <pre
                style={{
                  margin: 0,
                  padding: 'clamp(14px, 1.6vw, 20px) clamp(16px, 1.8vw, 22px)',
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: 'clamp(11.5px, 1vw, 13.5px)',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.92)',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
                }}
              >
                <code>
                  {sqlLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.32,
                        delay: 0.6 + i * 0.06,
                        ease: EASE,
                      }}
                      style={{ whiteSpace: 'pre' }}
                    >
                      {line}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop:
                        '1px dashed rgba(127,179,255,0.18)',
                      color: 'rgba(127,179,255,0.7)',
                    }}
                  >
                    <span style={{ color: '#7FB3FF' }}>→</span>{' '}
                    <span style={{ color: '#A7F070' }}>25 rows</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {'  in  '}
                    </span>
                    <span style={{ color: '#A7F070' }}>0.8 ms</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {' p99'}
                    </span>
                  </motion.div>
                </code>
              </pre>
            </div>

            {/* Below-terminal caption */}
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: 'rgba(10,34,128,0.55)',
                textTransform: 'uppercase',
              }}
            >
              No federation. No glue code. No data movement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
