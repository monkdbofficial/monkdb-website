'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, X, Minus, Star, ChevronDown } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

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

function buildRows(t: Record<string, string>): Row[] {
  return [
    {
      feature: t.rowDeployment,
      sub: t.rowDeploymentSub,
      cells: [
        { kind: 'text', label: t.labelCloudOnPremEdge, tone: 'good' },
        { kind: 'text', label: t.labelCloudOnPrem, tone: 'neutral' },
        { kind: 'text', label: t.labelCloudOnly, tone: 'bad' },
        { kind: 'text', label: t.labelCloudOnPrem, tone: 'neutral' },
        { kind: 'text', label: t.labelCloudOnPrem, tone: 'neutral' },
        { kind: 'text', label: t.labelCloudOnPrem, tone: 'neutral' },
      ],
    },
    {
      feature: t.rowProcessor,
      sub: t.rowProcessorSub,
      cells: [
        { kind: 'text', label: 'ARM, x86_64', tone: 'good' },
        { kind: 'text', label: t.labelX86Only, tone: 'bad' },
        { kind: 'text', label: t.labelX86Only, tone: 'bad' },
        { kind: 'partial', label: t.labelArmPartial },
        { kind: 'text', label: 'ARM, x86_64', tone: 'good' },
        { kind: 'text', label: t.labelInMemArch, tone: 'bad' },
      ],
    },
    {
      feature: t.rowMultiModel,
      sub: 'V, TS, GIS, FTS, DOC, SQL, BLOB, KV, G',
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
      feature: t.rowHybridSearch,
      sub: t.rowHybridSearchSub,
      cells: [{ kind: 'yes' }, { kind: 'yes' }, { kind: 'yes' }, { kind: 'no' }, { kind: 'yes' }, { kind: 'no' }],
    },
    {
      feature: t.rowHtap,
      sub: t.rowHtapSub,
      cells: [{ kind: 'yes' }, { kind: 'yes' }, { kind: 'yes' }, { kind: 'no' }, { kind: 'yes' }, { kind: 'yes' }],
    },
    {
      feature: t.rowAiNative,
      sub: t.rowAiNativeSub,
      cells: [
        { kind: 'yes' },
        { kind: 'partial', label: t.labelAddOn },
        { kind: 'partial', label: t.labelAddOn },
        { kind: 'no' },
        { kind: 'partial', label: t.labelAddOn },
        { kind: 'no' },
      ],
    },
    {
      feature: t.rowSovereignty,
      sub: t.rowSovereigntySub,
      cells: [
        { kind: 'yes' },
        { kind: 'partial', label: t.labelOnPremOnly },
        { kind: 'no' },
        { kind: 'yes' },
        { kind: 'yes' },
        { kind: 'yes' },
      ],
    },
    {
      feature: t.rowLicensing,
      sub: t.rowLicensingSub,
      cells: [
        { kind: 'text', label: t.labelFlexibleEulas, tone: 'good' },
        { kind: 'text', label: t.labelFlexibleEulas, tone: 'good' },
        { kind: 'text', label: t.labelConsumptionBased, tone: 'neutral' },
        { kind: 'text', label: t.labelOpenCore, tone: 'good' },
        { kind: 'text', label: t.labelOpenSource, tone: 'good' },
        { kind: 'text', label: t.labelExpensive, tone: 'bad' },
      ],
    },
  ]
}

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
          whiteSpace: 'nowrap',
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
        whiteSpace: 'nowrap',
      }}
    >
      {cell.label}
    </span>
  )
}

// ── Mobile feature card (expandable competitor comparison) ──────────
function MobileFeatureCard({ row, t }: { row: Row; t: Record<string, string> }) {
  const [expanded, setExpanded] = useState(false)
  const monkCell = row.cells[0]
  const competitors = vendors.slice(1).map((name, i) => ({
    name,
    cell: row.cells[i + 1],
  }))
  const losses = competitors.filter(
    (c) =>
      c.cell.kind === 'no' ||
      c.cell.kind === 'partial' ||
      (c.cell.kind === 'text' && c.cell.tone === 'bad'),
  ).length

  return (
    <div
      className="relative rounded-2xl p-5"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(10,34,128,0.08)',
        boxShadow:
          '0 1px 2px rgba(10,20,80,0.03), 0 8px 24px rgba(10,20,80,0.04)',
      }}
    >
      {/* Feature name + sub */}
      <div className="mb-3">
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
          }}
        >
          {row.feature}
        </h3>
        {row.sub && (
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: 500,
              color: '#9CA3AF',
              letterSpacing: '0.02em',
              marginTop: '4px',
              lineHeight: 1.5,
            }}
          >
            {row.sub}
          </p>
        )}
      </div>

      {/* MonkDB value (BEST) */}
      <div
        className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
        style={{
          background:
            'linear-gradient(135deg, rgba(26,56,232,0.05) 0%, rgba(30,138,255,0.03) 100%)',
          border: '1px solid rgba(26,56,232,0.15)',
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
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
              flexShrink: 0,
            }}
          >
            <Star size={9} strokeWidth={3} fill="#0A2280" />
            MonkDB
          </span>
        </div>
        <div className="flex-shrink-0">
          <CellContent cell={monkCell} isMonk={true} />
        </div>
      </div>

      {/* Compare toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 w-full flex items-center justify-between rounded-xl px-4 py-2.5"
        style={{
          background: 'rgba(10,34,128,0.03)',
          border: '1px solid rgba(10,34,128,0.08)',
          color: '#1F2937',
          cursor: 'pointer',
        }}
        aria-expanded={expanded}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#4B5563',
          }}
        >
          {expanded ? t.hideComparison : `${t.compareVendors} (${competitors.length})`}
        </span>
        <span className="flex items-center gap-2">
          {losses > 0 && !expanded && (
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                fontWeight: 500,
                color: '#B45309',
                letterSpacing: '0.02em',
              }}
            >
              {losses}/{competitors.length} {t.fallShort}
            </span>
          )}
          <ChevronDown
            size={14}
            strokeWidth={2}
            style={{
              color: '#6B7280',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 220ms cubic-bezier(0.165, 0.84, 0.44, 1)',
            }}
          />
        </span>
      </button>

      {/* Expanded competitor rows */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="competitors"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            style={{ overflow: 'hidden' }}
          >
            <ul
              className="mt-3 flex flex-col"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                borderTop: '1px solid rgba(10,34,128,0.06)',
              }}
            >
              {competitors.map(({ name, cell }) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-3 py-2.5"
                  style={{
                    borderBottom: '1px solid rgba(10,34,128,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: '#374151',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {name}
                  </span>
                  <div className="flex-shrink-0">
                    <CellContent cell={cell} isMonk={false} />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CompetitionMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).competitionMatrix) ?? {}) as Record<string, string>
  const rows = buildRows(t)

  return (
    <section
      id="competition"
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

        {/* Editorial two-col intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-start mb-8 sm:mb-12 lg:mb-16">
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
            {t.titleLine1}
            <br />
            {t.titleLine2}
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

        {/* ── Mobile: vertical card stack (below md) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="md:hidden flex flex-col gap-3"
        >
          {rows.map((row) => (
            <MobileFeatureCard key={row.feature} row={row} t={t} />
          ))}
        </motion.div>

        {/* ── Tablet/Desktop: comparison table ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="hidden md:block relative overflow-x-auto scrollbar-hide rounded-[20px]"
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
              minWidth: '1000px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: 'clamp(12px, 1.8vw, 16px) clamp(14px, 2vw, 20px)',
                    textAlign: 'left',
                    background: '#F8F4F0',
                    borderBottom: '1px solid rgba(10,34,128,0.08)',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    minWidth: '150px',
                  }}
                >
                  {t.capability}
                </th>
                {vendors.map((v, idx) => {
                  const isMonk = idx === 0
                  return (
                    <th
                      key={v}
                      style={{
                        padding: 'clamp(12px, 1.8vw, 16px) clamp(12px, 1.8vw, 18px)',
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
                            {t.bestBadge}
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
                      padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2vw, 20px)',
                      verticalAlign: 'top',
                      minWidth: '150px',
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
                          padding: 'clamp(12px, 2vw, 18px)',
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
            <Legend icon={<Check size={11} strokeWidth={2.6} />} tone="good" label={t.legendSupported} />
            <Legend icon={<Minus size={11} strokeWidth={3} />} tone="warn" label={t.legendPartial} />
            <Legend icon={<X size={11} strokeWidth={2.6} />} tone="bad" label={t.legendNotSupported} />
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
            *{t.footnote}
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
