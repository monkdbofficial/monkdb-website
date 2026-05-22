'use client'

/**
 * HomePerformance — docx Page 1, Performance section.
 *
 *   Three stats: Sub-millisecond latency, High concurrency, Scalable architecture.
 *
 * Enterprise upgrades:
 *   - Animated counters that count up on scroll-in (matches About.Counter)
 *   - Per-stat micro-visualization: latency bars, scaling line, node stack
 *   - Halo glow behind each numeral, mono caption, hairline dividers
 */

import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Animated counter                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

function Counter({
  to,
  suffix,
  prefix = '',
  decimals = 0,
  delay = 0,
}: {
  to: number
  suffix: string
  prefix?: string
  decimals?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const sentinelRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(sentinelRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, to, {
      duration: 2.0,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        if (!ref.current) return
        const formatted =
          decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString()
        ref.current.textContent = `${prefix}${formatted}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, prefix, decimals, delay])

  const initial = `${prefix}${decimals > 0 ? (0).toFixed(decimals) : '0'}${suffix}`
  return (
    <>
      <span ref={sentinelRef} style={{ position: 'absolute', pointerEvents: 'none' }} />
      <span ref={ref}>{initial}</span>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Micro-visualizations                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

/** Latency bars — three vertical bars representing p50, p90, p99 */
function LatencyBars({ active }: { active: boolean }) {
  // viewBox 240×140 with explicit room reserved for the axis labels at the bottom.
  const bars = [
    { label: 'p50', height: 38 },
    { label: 'p90', height: 72 },
    { label: 'p99', height: 110 },
  ]
  return (
    <svg
      viewBox="0 0 240 160"
      width="100%"
      style={{ display: 'block', height: 'clamp(120px, 14vw, 150px)' }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="perf-bar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A38E8" />
          <stop offset="100%" stopColor="#7FB3FF" />
        </linearGradient>
      </defs>
      {/* Baseline */}
      <line
        x1="20"
        y1="130"
        x2="220"
        y2="130"
        stroke="rgba(10,34,128,0.14)"
        strokeWidth="1"
      />
      {bars.map((b, i) => {
        const w = 36
        const x = 36 + i * 60
        const baseY = 130
        const targetY = baseY - b.height
        return (
          <g key={b.label}>
            <motion.rect
              initial={{ y: baseY, height: 0 }}
              animate={active ? { y: targetY, height: b.height } : {}}
              transition={{
                duration: 0.9,
                delay: 0.4 + i * 0.15,
                ease: EASE,
              }}
              x={x}
              width={w}
              rx={3}
              fill="url(#perf-bar-grad)"
            />
            <text
              x={x + w / 2}
              y={150}
              textAnchor="middle"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fontSize="13"
              fontWeight="600"
              fill="rgba(10,34,128,0.55)"
              letterSpacing="0.08em"
            >
              {b.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Linear scaling — line chart with diagonal trajectory */
function ScalingLine({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 240 160"
      width="100%"
      style={{ display: 'block', height: 'clamp(120px, 14vw, 150px)' }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="perf-line-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7FB3FF" />
          <stop offset="100%" stopColor="#1A38E8" />
        </linearGradient>
      </defs>
      {/* Baseline */}
      <line
        x1="20"
        y1="130"
        x2="220"
        y2="130"
        stroke="rgba(10,34,128,0.14)"
        strokeWidth="1"
      />
      {/* Y axis */}
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="130"
        stroke="rgba(10,34,128,0.14)"
        strokeWidth="1"
      />
      {/* Faint grid lines */}
      {[40, 70, 100].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2="220"
          y2={y}
          stroke="rgba(10,34,128,0.06)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      ))}
      {/* Linear trajectory */}
      <motion.path
        d="M20 124 L70 100 L120 76 L170 50 L220 24"
        fill="none"
        stroke="url(#perf-line-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
      />
      {/* Endpoint dot with halo */}
      <motion.circle
        cx="220"
        cy="24"
        r="6"
        fill="rgba(26,56,232,0.18)"
        initial={{ scale: 0 }}
        animate={active ? { scale: [0, 1.6, 1] } : {}}
        transition={{ duration: 0.8, delay: 1.7, ease: EASE }}
      />
      <motion.circle
        cx="220"
        cy="24"
        r="4"
        fill="#1A38E8"
        initial={{ scale: 0 }}
        animate={active ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.8, ease: EASE }}
      />
      {/* Node labels along x-axis */}
      {[
        { x: 20, l: '1×' },
        { x: 120, l: '5×' },
        { x: 220, l: '10×' },
      ].map((p) => (
        <text
          key={p.l}
          x={p.x}
          y={150}
          textAnchor="middle"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
          fontSize="13"
          fontWeight="600"
          fill="rgba(10,34,128,0.55)"
          letterSpacing="0.08em"
        >
          {p.l}
        </text>
      ))}
    </svg>
  )
}

/** Cluster nodes — stacked node grid that fills in */
function ClusterStack({ active }: { active: boolean }) {
  // 4×3 grid of nodes
  const nodes = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      nodes.push({ r, c, idx: r * 4 + c })
    }
  }
  return (
    <svg
      viewBox="0 0 240 160"
      width="100%"
      style={{ display: 'block', height: 'clamp(120px, 14vw, 150px)' }}
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Baseline */}
      <line
        x1="20"
        y1="130"
        x2="220"
        y2="130"
        stroke="rgba(10,34,128,0.14)"
        strokeWidth="1"
      />
      {nodes.map((n) => {
        const cellW = 28
        const cellH = 30
        const w = 24
        const h = 24
        const startX = (240 - 4 * cellW) / 2 + (cellW - w) / 2
        const startY = 22
        const x = startX + n.c * cellW
        const y = startY + n.r * cellH
        return (
          <motion.rect
            key={n.idx}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={4}
            fill={
              n.idx % 3 === 0
                ? '#1A38E8'
                : n.idx % 3 === 1
                  ? '#7FB3FF'
                  : '#0A2280'
            }
            opacity={0.9}
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.4 + n.idx * 0.045,
              ease: EASE,
            }}
            style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
          />
        )
      })}
      <text
        x={120}
        y={150}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="13"
        fontWeight="600"
        fill="rgba(10,34,128,0.55)"
        letterSpacing="0.08em"
      >
        MULTI-NODE CLUSTERS
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Section                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function HomePerformance() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homePerformance) ?? {}) as Record<
    string,
    string
  >

  const stats = [
    {
      counter: <Counter to={0.8} suffix=" ms" decimals={1} delay={0.3} />,
      label: t.stat1Label ?? 'Sub-millisecond latency',
      body:
        t.stat1Body ?? 'p99 across vector, SQL, and streaming workloads.',
      caption: t.stat1Caption ?? 'p50 / p90 / p99',
      Viz: LatencyBars,
    },
    {
      counter: <Counter to={10} suffix="×" delay={0.5} />,
      label: t.stat2Label ?? 'Linear concurrency',
      body:
        t.stat2Body ??
        'Add nodes, get linear throughput. No coordinator bottleneck.',
      caption: t.stat2Caption ?? 'Throughput scaling',
      Viz: ScalingLine,
    },
    {
      counter: <Counter to={100} suffix=" PB+" delay={0.7} />,
      label: t.stat3Label ?? 'Scalable architecture',
      body:
        t.stat3Body ?? 'Petabyte clusters. Cloud, on-prem, edge, air-gapped.',
      caption: t.stat3Caption ?? 'Cluster scale',
      Viz: ClusterStack,
    },
  ]

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Performance'} />

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mt-6 sm:mt-10 lg:mt-14 mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
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
            {t.headline ??
              "Built for the workloads that don't tolerate delay"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '520px',
            }}
          >
            {t.lead ??
              'Engineered in C++. Vectorized execution. Distributed by default. Production-tuned across the workloads that matter most.'}
          </motion.p>
        </div>

        {/* 3 stats with micro-viz */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: '1px solid rgba(10,34,128,0.12)' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.12,
                ease: EASE,
              }}
              className="perf-cell relative"
              style={{
                padding: 'clamp(28px, 3.4vw, 56px) clamp(20px, 2.4vw, 32px)',
                borderBottom: '1px solid rgba(10,34,128,0.12)',
                borderLeft:
                  i > 0 ? '1px solid rgba(10,34,128,0.12)' : undefined,
              }}
            >
              {/* Counter with halo */}
              <div className="relative inline-block">
                <motion.div
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '-22px',
                    background:
                      'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.14, 1],
                    opacity: [0.45, 0.85, 0.45],
                  }}
                  transition={{
                    duration: 3.8,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span
                  className="relative"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 88px)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-3px',
                    display: 'inline-block',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px #0A2280',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {s.counter}
                </span>
              </div>

              {/* Mono uppercase label */}
              <div
                className="mt-7 sm:mt-8"
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#1A38E8',
                }}
              >
                {s.label}
              </div>

              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  margin: '12px 0 22px 0',
                  maxWidth: '320px',
                }}
              >
                {s.body}
              </p>

              {/* Micro-viz */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(10,34,128,0.08)',
                }}
              >
                <s.Viz active={inView} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
