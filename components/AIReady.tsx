'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type ReactNode } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

// ── Syntax-highlight token helpers ─────────────────────────────────
const KW = (s: string) => <span style={{ color: '#C991F0' }}>{s}</span>
const FN = (s: string) => <span style={{ color: '#7FB3FF' }}>{s}</span>
const PARAM = (s: string) => <span style={{ color: '#FFB86C' }}>{s}</span>
const STR = (s: string) => <span style={{ color: '#A7F070' }}>{s}</span>
const NUM = (s: string) => <span style={{ color: '#A7F070' }}>{s}</span>
const CMT = (s: string) => <span style={{ color: '#6B7EA8', fontStyle: 'italic' }}>{s}</span>

// ── The SQL query — each line is (content, plain) for length-aware typing
const sqlLines: { node: ReactNode; plain: string }[] = [
  { node: <>{CMT('-- Nearest active users ranked by semantic similarity')}</>, plain: '-- Nearest active users ranked by semantic similarity' },
  { node: <>{KW('SELECT')}</>, plain: 'SELECT' },
  { node: <>{'  u.id, u.name,'}</>, plain: '  u.id, u.name,' },
  { node: <>{'  v.embedding '}{FN('<=>')}{' '}{PARAM('$query_vec')}{'          '}{KW('AS')}{' cosine_dist,'}</>, plain: '  v.embedding <=> $query_vec          AS cosine_dist,' },
  { node: <>{'  '}{FN('ST_Distance')}{'(u.geo, '}{PARAM('$origin')}{')'}{'         '}{KW('AS')}{' distance_m,'}</>, plain: '  ST_Distance(u.geo, $origin)         AS distance_m,' },
  { node: <>{'  ts.value                            '}{KW('AS')}{' last_reading'}</>, plain: '  ts.value                            AS last_reading' },
  { node: <>{KW('FROM')}{' users u'}</>, plain: 'FROM users u' },
  { node: <>{KW('JOIN')}{' vectors    v  '}{KW('ON')}{' v.user_id  = u.id'}</>, plain: 'JOIN vectors    v  ON v.user_id  = u.id' },
  { node: <>{KW('JOIN')}{' timeseries ts '}{KW('ON')}{' ts.user_id = u.id'}</>, plain: 'JOIN timeseries ts ON ts.user_id = u.id' },
  { node: <>{KW('WHERE')}{' ts.ts > '}{FN('now')}{'() '}{KW('- INTERVAL')}{' '}{STR("'1 hour'")}</>, plain: "WHERE ts.ts > now() - INTERVAL '1 hour'" },
  { node: <>{'  '}{KW('AND')}{' v.embedding '}{FN('<=>')}{' '}{PARAM('$query_vec')}{' < '}{NUM('0.30')}</>, plain: '  AND v.embedding <=> $query_vec < 0.30' },
  { node: <>{KW('ORDER BY')}{' cosine_dist '}{KW('ASC')}</>, plain: 'ORDER BY cosine_dist ASC' },
  { node: <>{KW('LIMIT')}{' '}{NUM('25')}{';'}</>, plain: 'LIMIT 25;' },
]

// Phases: 'typing' (reveal lines one by one) → 'hold' (full query visible) → 'erase' (clear) → repeat
type Phase = 'typing' | 'hold' | 'erase'

function SQLBlock() {
  // Own ref + useInView (not once) so the typewriter pauses off-screen
  // and resumes when the user scrolls back.
  const blockRef = useRef<HTMLPreElement>(null)
  const inView = useInView(blockRef, { margin: '-120px' })

  const [visibleLines, setVisibleLines] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  // Infinite typewriter loop — only while in view
  useEffect(() => {
    if (!inView) return
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (visibleLines < sqlLines.length) {
        timer = setTimeout(() => setVisibleLines((n) => n + 1), 220)
      } else {
        timer = setTimeout(() => setPhase('hold'), 0)
      }
    } else if (phase === 'hold') {
      // Fully revealed — pause here so readers can scan the query
      timer = setTimeout(() => setPhase('erase'), 4200)
    } else if (phase === 'erase') {
      // Clear all lines, then start typing again
      timer = setTimeout(() => {
        setVisibleLines(0)
        setPhase('typing')
      }, 650)
    }

    return () => clearTimeout(timer)
  }, [visibleLines, phase, inView])

  const totalLines = sqlLines.length

  return (
    <pre
      ref={blockRef}
      style={{
        margin: 0,
        padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2vw, 20px)',
        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
        fontSize: 'clamp(10px, 1.2vw, 13.5px)',
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.92)',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
      }}
    >
      <code>
        {sqlLines.map(({ node }, i) => {
          const lineVisible = i < visibleLines && phase !== 'erase'
          // Cursor lives on the last-visible line while typing/hold,
          // and on line 0 while erase phase is empty
          const showCursor =
            phase === 'erase'
              ? i === 0 && visibleLines === 0
              : i === Math.min(visibleLines - 1, totalLines - 1) &&
                visibleLines > 0

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: lineVisible ? 1 : 0,
                x: lineVisible ? 0 : -4,
              }}
              transition={{
                duration: phase === 'erase' ? 0.28 : 0.32,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              style={{ whiteSpace: 'pre', minHeight: '1.7em' }}
            >
              {lineVisible ? node : ' '}
              {showCursor && (
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '14px',
                    background: '#7FB3FF',
                    marginLeft: '4px',
                    verticalAlign: 'middle',
                    borderRadius: '1px',
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </code>
    </pre>
  )
}

// readinessProofs are partly tech terms (gRPC, REST, SQL, etc.) and partly
// translatable. Each row is built at runtime so '1 process', 'Vectorized', etc.
// can come from the dictionary.
function buildReadinessProofs(t: Record<string, string>): string[][] {
  return [
    [
      t.readinessProof1Item1 ?? '1 process',
      t.readinessProof1Item2 ?? '0 sidecars',
      t.readinessProof1Item3 ?? '0 YAML files',
    ],
    [
      t.readinessProof2Item1 ?? 'C++20',
      t.readinessProof2Item2 ?? 'Vectorized',
      t.readinessProof2Item3 ?? 'ARM + x86_64',
    ],
    ['SQL', 'gRPC', 'REST', 'Kafka', 'JDBC'],
    ['On-Prem', 'Air-Gapped', 'SOC 2', 'ISO 27001'],
  ]
}

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function AIReady() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).aiReady) ?? {}) as Record<string, string>
  const readinessProofs = buildReadinessProofs(t)
  const readiness = [
    { n: '01', label: t.row1Label, headline: t.row1Headline, body: t.row1Body, proof: readinessProofs[0] },
    { n: '02', label: t.row2Label, headline: t.row2Headline, body: t.row2Body, proof: readinessProofs[1] },
    { n: '03', label: t.row3Label, headline: t.row3Headline, body: t.row3Body, proof: readinessProofs[2] },
    { n: '04', label: t.row4Label, headline: t.row4Headline, body: t.row4Body, proof: readinessProofs[3] },
  ]

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Section chapter line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-4 mb-5 sm:mb-7 lg:mb-9"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: '#1A38E8',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
            }}
          />
        </motion.div>

        {/* Editorial two-col */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              textWrap: 'balance',
              maxWidth: 'clamp(280px, 100%, 640px)',
            }}
          >
            {t.titleMain}
            <span className="text-gray-400 dark:text-gray-500"> </span>
            <span style={{ color: '#1A38E8' }}>{t.titleAccent}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="text-gray-600 dark:text-gray-300"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.65,
              maxWidth: '560px',
            }}
          >
            {t.intro}
          </motion.p>
        </div>

        {/* Platform portfolio: Monk AIO + SmartX */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5"
        >
          {[
            {
              kicker: t.card1Kicker,
              title: 'Monk AIO',
              sub: t.card1Sub,
              body: t.card1Body,
              tags: [
                t.monkAioTag1 ?? 'Autonomous',
                t.monkAioTag2 ?? 'Real-time',
                t.monkAioTag3 ?? 'Sovereign',
              ],
            },
            {
              kicker: t.card2Kicker,
              title: 'SmartX Platforms',
              sub: t.card2Sub,
              body: t.card2Body,
              tags: ['SmartMine', 'SmartMobility', 'SmartFinance', t.smartxMore ?? '+ more'],
            },
          ].map((card) => (
            <article
              key={card.title}
              className="relative rounded-[20px] p-6 sm:p-7 lg:p-8 bg-[#F8F4F0] dark:bg-white/[0.03]"
              style={{
                border: '1px solid rgba(10,34,128,0.08)',
                boxShadow:
                  '0 2px 4px rgba(10,20,80,0.04), 0 12px 36px rgba(10,20,80,0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1A38E8',
                }}
              >
                {card.kicker}
              </span>
              <h3
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  fontWeight: 300,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                  marginTop: '12px',
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-[#1A38E8] dark:text-blue-300"
                style={{
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  marginTop: '4px',
                }}
              >
                {card.sub}
              </p>
              <p
                className="text-gray-600 dark:text-gray-300"
                style={{
                  fontSize: 'clamp(13.5px, 1vw, 15px)',
                  lineHeight: 1.65,
                  marginTop: '16px',
                  maxWidth: '520px',
                }}
              >
                {card.body}
              </p>
              <ul
                className="flex flex-wrap gap-2"
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '20px 0 0 0',
                }}
              >
                {card.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-gray-800 dark:text-gray-200"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(10,34,128,0.12)',
                      background: 'rgba(255,255,255,0.7)',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#1E8AFF',
                      }}
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>

        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="flex items-center gap-4 mt-16 sm:mt-20 mb-10 sm:mb-14"
        >
          <div
            style={{
              flex: '0 0 48px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(26,56,232,0.55))',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1A38E8',
            }}
          >
            {t.dividerLabel}
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(26,56,232,0.55), transparent)',
            }}
          />
        </motion.div>

        {/* Numbered editorial rows */}
        <ul
          className="border-t"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            borderColor: 'rgba(10,34,128,0.09)',
          }}
        >
          {readiness.map((r, i) => (
            <motion.li
              key={r.n}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.2 + i * 0.08,
                ease: EASE,
              }}
              className="group border-b"
              style={{ borderColor: 'rgba(10,34,128,0.09)' }}
            >
              <div
                className="relative grid grid-cols-[44px_1fr] md:grid-cols-[72px_160px_minmax(0,1.5fr)_minmax(0,1fr)] items-start gap-x-4 sm:gap-x-6 lg:gap-x-10 py-6 sm:py-8 lg:py-10"
                style={{
                  transition: 'padding 260ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '10px'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '0px'
                }}
              >
                {/* Hover accent line on the left */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 pointer-events-none"
                  style={{
                    width: '2px',
                    background: '#1A38E8',
                    transform: 'scaleY(0)',
                    transformOrigin: 'center',
                    transition:
                      'transform 260ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  ref={(el) => {
                    if (!el) return
                    const row = el.parentElement
                    if (!row) return
                    const on = () => {
                      el.style.transform = 'scaleY(1)'
                    }
                    const off = () => {
                      el.style.transform = 'scaleY(0)'
                    }
                    row.addEventListener('mouseenter', on)
                    row.addEventListener('mouseleave', off)
                  }}
                />

                {/* Number */}
                <span
                  className="text-gray-400 dark:text-gray-500"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    paddingTop: '8px',
                  }}
                >
                  {r.n}
                </span>

                {/* Label + headline + body — wrapped together on mobile so
                    they stack in column 2 under the number. On md+ the wrapper
                    uses `contents` so each child becomes its own grid cell. */}
                <div className="md:contents">
                  <span
                    className="text-[#1A38E8] dark:text-blue-300 block md:inline"
                    style={{
                      fontSize: 'clamp(14px, 1.1vw, 17px)',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      marginBottom: '8px',
                    }}
                  >
                    {r.label}
                  </span>

                  {/* Headline + body */}
                  <div>
                    <p
                      className="text-gray-900 dark:text-white"
                      style={{
                        fontSize: 'clamp(18px, 1.8vw, 24px)',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                        textWrap: 'balance',
                        marginBottom: '10px',
                      }}
                    >
                      {r.headline}
                    </p>
                    <p
                      className="text-gray-600 dark:text-gray-300"
                      style={{
                        fontSize: 'clamp(13.5px, 1vw, 15px)',
                        lineHeight: 1.65,
                      }}
                    >
                      {r.body}
                    </p>
                  </div>
                </div>

                {/* Proof-point tags */}
                <ul
                  className="hidden md:flex flex-wrap gap-2 items-start justify-end content-start"
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    paddingTop: '8px',
                  }}
                >
                  {r.proof.map((tag) => (
                    <li
                      key={tag}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(10,34,128,0.12)',
                        background: 'rgba(10,34,128,0.02)',
                        color: '#1F2937',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#1E8AFF',
                        }}
                      />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Unified-query proof — one SQL, four modalities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-10 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8 lg:gap-12 items-start"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1A38E8',
                }}
              >
                <span className="sm:hidden">{t.proofKickerMobile}</span>
                <span className="hidden sm:inline">{t.proofKickerDesktop}</span>
              </span>
            </div>
            <h3
              className="text-gray-900 dark:text-white mb-4"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 30px)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                lineHeight: 1.2,
                textWrap: 'balance',
              }}
            >
              {t.proofTitle}
            </h3>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: 'clamp(13.5px, 1vw, 15px)',
                lineHeight: 1.65,
                maxWidth: '520px',
              }}
            >
              {t.proofBody}
            </p>
          </div>

          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{
              background: '#0A1028',
              border: '1px solid rgba(26,56,232,0.25)',
              boxShadow:
                '0 12px 36px rgba(10,20,80,0.18), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '10px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center gap-1.5">
                {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
                  <span
                    key={c}
                    aria-hidden="true"
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: c,
                      opacity: 0.75,
                    }}
                  />
                ))}
              </div>
              <span
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#34D399',
                    boxShadow: '0 0 6px rgba(52,211,153,0.7)',
                    display: 'inline-block',
                  }}
                />
                monkdb · psql
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 500,
                  color: '#7FB3FF',
                  letterSpacing: '0.08em',
                }}
              >
                SQL
              </span>
            </div>

            {/* Code — line-by-line reveal */}
            <div className="relative">
              <SQLBlock />
              {/* Right-edge fade hinting scrollability on narrow screens */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 sm:hidden"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(10,16,40,0.95))',
                }}
              />
            </div>


            {/* Badges showing which modalities are in play */}
            <div
              className="flex flex-wrap gap-2 items-center"
              style={{
                padding: '10px 16px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(26,56,232,0.08)',
              }}
            >
              {['Vector', 'Geospatial', 'Time-Series', 'SQL'].map((mod) => (
                <span
                  key={mod}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(127,179,255,0.3)',
                    background: 'rgba(26,56,232,0.15)',
                    color: '#BFD4FF',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#1E8AFF',
                    }}
                  />
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
