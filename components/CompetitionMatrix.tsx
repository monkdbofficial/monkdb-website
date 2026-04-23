'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus, Star } from 'lucide-react'

// ── Cell value types ───────────────────────────────────────────────
type Cell =
  | { kind: 'yes' }
  | { kind: 'no' }
  | { kind: 'partial'; label?: string }
  | { kind: 'text'; label: string; tone?: 'good' | 'bad' | 'neutral' }

type Row = {
  feature: string
  sub?: string
  cells: Cell[] // order: MonkDB, SingleStore, Snowflake, Clickhouse, Aerospike, SAP HANA
}

const vendors = [
  'MonkDB',
  'SingleStore',
  'Snowflake',
  'Clickhouse',
  'Aerospike',
  'SAP HANA',
]

const rows: Row[] = [
  {
    feature: 'Deployment',
    sub: 'Where it runs',
    cells: [
      { kind: 'text', label: 'Cloud · On-Prem · Edge', tone: 'good' },
      { kind: 'text', label: 'Cloud · On-Prem', tone: 'neutral' },
      { kind: 'text', label: 'Cloud only', tone: 'bad' },
      { kind: 'text', label: 'Cloud · On-Prem', tone: 'neutral' },
      { kind: 'text', label: 'Cloud · On-Prem', tone: 'neutral' },
      { kind: 'text', label: 'Cloud · On-Prem', tone: 'neutral' },
    ],
  },
  {
    feature: 'Processor',
    sub: 'CPU architectures supported',
    cells: [
      { kind: 'text', label: 'ARM · x86_64', tone: 'good' },
      { kind: 'text', label: 'x86_64 only', tone: 'bad' },
      { kind: 'text', label: 'x86_64 only', tone: 'bad' },
      { kind: 'partial', label: 'ARM partial' },
      { kind: 'text', label: 'ARM · x86_64', tone: 'good' },
      { kind: 'text', label: 'In-mem arch', tone: 'bad' },
    ],
  },
  {
    feature: 'Multi-Model',
    sub: 'V · TS · GIS · FTS · DOC · SQL · BLOB · KV · G',
    cells: [
      { kind: 'text', label: '9 / 9', tone: 'good' },
      { kind: 'text', label: '5 / 9', tone: 'neutral' },
      { kind: 'text', label: '6 / 9', tone: 'neutral' },
      { kind: 'text', label: '6 / 9', tone: 'neutral' },
      { kind: 'text', label: '6 / 9', tone: 'neutral' },
      { kind: 'text', label: '7 / 9', tone: 'neutral' },
    ],
  },
  {
    feature: 'Hybrid Search',
    sub: 'Vector + keyword in one query',
    cells: [
      { kind: 'yes' },
      { kind: 'yes' },
      { kind: 'yes' },
      { kind: 'no' },
      { kind: 'yes' },
      { kind: 'no' },
    ],
  },
  {
    feature: 'HTAP',
    sub: 'Transactional + analytical',
    cells: [
      { kind: 'yes' },
      { kind: 'yes' },
      { kind: 'yes' },
      { kind: 'no' },
      { kind: 'yes' },
      { kind: 'yes' },
    ],
  },
  {
    feature: 'AI-Native',
    sub: 'Built-in embeddings, vector indexing, agent context',
    cells: [
      { kind: 'yes' },
      { kind: 'partial', label: 'Add-on' },
      { kind: 'partial', label: 'Add-on' },
      { kind: 'no' },
      { kind: 'partial', label: 'Add-on' },
      { kind: 'no' },
    ],
  },
  {
    feature: 'Sovereignty',
    sub: 'Air-gapped, on-prem, zero egress',
    cells: [
      { kind: 'yes' },
      { kind: 'partial', label: 'On-prem only' },
      { kind: 'no' },
      { kind: 'yes' },
      { kind: 'yes' },
      { kind: 'yes' },
    ],
  },
  {
    feature: 'Licensing',
    sub: 'Commercial model',
    cells: [
      { kind: 'text', label: 'Flexible EULAs', tone: 'good' },
      { kind: 'text', label: 'Flexible EULAs', tone: 'good' },
      { kind: 'text', label: 'Consumption-based', tone: 'neutral' },
      { kind: 'text', label: 'Open core + Enterprise', tone: 'good' },
      { kind: 'text', label: 'Open source + Enterprise', tone: 'good' },
      { kind: 'text', label: 'Extremely expensive', tone: 'bad' },
    ],
  },
]

const EASE = [0.165, 0.84, 0.44, 1] as const

// ── Cell renderer ──────────────────────────────────────────────────
function CellContent({
  cell,
  isMonk,
}: {
  cell: Cell
  isMonk: boolean
}) {
  if (cell.kind === 'yes') {
    return (
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: 'rgba(16,185,129,0.12)',
          color: '#059669',
          border: '1px solid rgba(16,185,129,0.25)',
        }}
      >
        <Check size={13} strokeWidth={2.6} />
      </span>
    )
  }
  if (cell.kind === 'no') {
    return (
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: 'rgba(239,68,68,0.10)',
          color: '#B91C1C',
          border: '1px solid rgba(239,68,68,0.22)',
        }}
      >
        <X size={13} strokeWidth={2.6} />
      </span>
    )
  }
  if (cell.kind === 'partial') {
    return (
      <span
        className="inline-flex items-center gap-1.5"
        style={{
          padding: '3px 8px',
          borderRadius: 999,
          background: 'rgba(245,158,11,0.10)',
          color: '#B45309',
          border: '1px solid rgba(245,158,11,0.25)',
          fontSize: '11.5px',
          fontWeight: 600,
          letterSpacing: '0.01em',
        }}
      >
        <Minus size={11} strokeWidth={3} />
        {cell.label || 'Partial'}
      </span>
    )
  }
  // text
  const toneColor =
    cell.tone === 'good'
      ? isMonk
        ? '#0A2280'
        : '#047857'
      : cell.tone === 'bad'
        ? '#B91C1C'
        : '#4B5563'
  return (
    <span
      style={{
        fontSize: 'clamp(12px, 0.95vw, 13.5px)',
        fontWeight: cell.tone === 'good' ? 600 : 500,
        color: toneColor,
        letterSpacing: '-0.005em',
      }}
    >
      {cell.label}
    </span>
  )
}

export default function CompetitionMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="competition"
      ref={ref}
      className="relative bg-white dark:bg-[#0f1623] py-20 sm:py-28 lg:py-32"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Section chapter line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-4 mb-10 sm:mb-14"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#1A38E8',
            }}
          >
            07 / COMPARISON
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

        {/* Editorial two-col intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start mb-12 sm:mb-16">
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
            }}
          >
            How MonkDB compares,
            <br />
            feature by feature.
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
            A side-by-side of the capabilities enterprise teams evaluate when
            consolidating onto a unified data plane. Sources: vendor
            documentation, public benchmarks, and customer deployments.
          </motion.p>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative overflow-x-auto scrollbar-hide rounded-[20px]"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(10,34,128,0.08)',
            boxShadow:
              '0 1px 2px rgba(10,20,80,0.03), 0 12px 36px rgba(10,20,80,0.05)',
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
          }}
        >
          {/* Right-edge fade on mobile */}
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 w-10 z-10 lg:hidden"
            style={{ background: 'linear-gradient(to right, transparent, #ffffff)' }}
            aria-hidden="true"
          />

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '960px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    background: '#F8F4F0',
                    borderBottom: '1px solid rgba(10,34,128,0.08)',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    minWidth: '180px',
                  }}
                >
                  Capability
                </th>
                {vendors.map((v, idx) => {
                  const isMonk = idx === 0
                  return (
                    <th
                      key={v}
                      style={{
                        padding: '16px 18px',
                        textAlign: 'left',
                        background: isMonk ? '#0A2280' : '#F8F4F0',
                        borderBottom: isMonk
                          ? '1px solid rgba(127,179,255,0.35)'
                          : '1px solid rgba(10,34,128,0.08)',
                        color: isMonk ? '#ffffff' : '#1F2937',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        letterSpacing: '-0.005em',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {v}
                        {isMonk && (
                          <span
                            className="inline-flex items-center gap-1"
                            style={{
                              padding: '2px 7px',
                              borderRadius: 999,
                              background:
                                'linear-gradient(135deg, #1E8AFF 0%, #7FB3FF 100%)',
                              color: '#0A2280',
                              fontSize: '9.5px',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                            }}
                          >
                            <Star size={9} strokeWidth={3} fill="#0A2280" />
                            BEST
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIdx) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + rowIdx * 0.06,
                    ease: EASE,
                  }}
                  className="group"
                  style={{
                    background: rowIdx % 2 === 0 ? '#ffffff' : '#FBFAF7',
                    borderBottom:
                      rowIdx === rows.length - 1
                        ? 'none'
                        : '1px solid rgba(10,34,128,0.06)',
                    transition: 'background 180ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26,56,232,0.035)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      rowIdx % 2 === 0 ? '#ffffff' : '#FBFAF7'
                  }}
                >
                  {/* Feature column */}
                  <td
                    style={{
                      padding: '18px 20px',
                      verticalAlign: 'top',
                      minWidth: '180px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        fontWeight: 600,
                        color: '#111827',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {row.feature}
                    </div>
                    {row.sub && (
                      <div
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '10.5px',
                          fontWeight: 500,
                          color: '#9CA3AF',
                          letterSpacing: '0.02em',
                          marginTop: '3px',
                          lineHeight: 1.4,
                        }}
                      >
                        {row.sub}
                      </div>
                    )}
                  </td>

                  {/* Vendor cells */}
                  {row.cells.map((cell, colIdx) => {
                    const isMonk = colIdx === 0
                    return (
                      <td
                        key={colIdx}
                        style={{
                          padding: '18px',
                          verticalAlign: 'middle',
                          background: isMonk ? 'rgba(26,56,232,0.03)' : 'transparent',
                          borderLeft: isMonk
                            ? '1px solid rgba(26,56,232,0.12)'
                            : 'none',
                          borderRight: isMonk
                            ? '1px solid rgba(26,56,232,0.12)'
                            : 'none',
                        }}
                      >
                        <CellContent cell={cell} isMonk={isMonk} />
                      </td>
                    )
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Legend + footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Legend icon={<Check size={11} strokeWidth={2.6} />} tone="good" label="Supported" />
            <Legend icon={<Minus size={11} strokeWidth={3} />} tone="warn" label="Partial" />
            <Legend icon={<X size={11} strokeWidth={2.6} />} tone="bad" label="Not supported" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: 500,
              color: '#9CA3AF',
              letterSpacing: '0.02em',
              lineHeight: 1.55,
            }}
          >
            *Based on publicly available vendor documentation. Multi-model
            legend: V (Vector), TS (Timeseries), GIS (Geospatial), FTS
            (Full-Text), DOC (Document), SQL (Streaming SQL), BLOB (Blob), KV
            (Key-Value), G (Graph).
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Legend({
  icon,
  tone,
  label,
}: {
  icon: React.ReactNode
  tone: 'good' | 'warn' | 'bad'
  label: string
}) {
  const palette =
    tone === 'good'
      ? { bg: 'rgba(16,185,129,0.12)', br: 'rgba(16,185,129,0.25)', fg: '#059669' }
      : tone === 'warn'
        ? { bg: 'rgba(245,158,11,0.10)', br: 'rgba(245,158,11,0.25)', fg: '#B45309' }
        : { bg: 'rgba(239,68,68,0.10)', br: 'rgba(239,68,68,0.22)', fg: '#B91C1C' }
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        fontSize: '11px',
        fontWeight: 500,
        color: '#6B7280',
        letterSpacing: '0.02em',
      }}
    >
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: palette.bg,
          border: `1px solid ${palette.br}`,
          color: palette.fg,
        }}
      >
        {icon}
      </span>
      {label}
    </span>
  )
}
