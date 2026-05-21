'use client'

/**
 * CoreDifferentiation — docx Page 1, Core Differentiation section.
 *
 *   Headline: "Most Platforms Stop at Insight. MonkDB Executes."
 *   Three cards: Unified by Design, AI-Native Core, Execution Built-In.
 *
 * Enterprise upgrades:
 *   - SectionLabel chapter marker (variant="dark")
 *   - Two-line headline, second line in animated brand sheen
 *   - 3D tilt cards (mouse-follow rotate) matching FeatureCards
 *   - Per-card micro-visualization at the top: workload collapse, neural pulse, action arrow
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Per-card micro-visualizations                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

/** Card 1 — Nine workloads collapse into one engine */
function VizCollapse({ active }: { active: boolean }) {
  // 3 rows × 3 cols of small chips that animate inward to the center
  const chips = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      chips.push({ r, c, idx: r * 3 + c })
    }
  }
  return (
    <svg viewBox="0 0 200 88" width="100%" height="88" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cd-collapse-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7FB3FF" />
          <stop offset="100%" stopColor="#1A38E8" />
        </linearGradient>
      </defs>
      {/* Source grid (left) */}
      {chips.map((ch) => {
        const x = 6 + ch.c * 12
        const y = 24 + ch.r * 14
        return (
          <motion.rect
            key={ch.idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              active
                ? { opacity: [0, 1, 1, 0.3], scale: [0, 1, 1, 0.6] }
                : {}
            }
            transition={{
              duration: 3.6,
              delay: 0.2 + ch.idx * 0.05,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: EASE,
            }}
            x={x}
            y={y}
            width={9}
            height={9}
            rx={2}
            fill="rgba(127,179,255,0.45)"
            stroke="rgba(127,179,255,0.35)"
            strokeWidth="0.6"
          />
        )
      })}
      {/* Connector lines */}
      <motion.path
        d="M48 44 L96 44"
        stroke="rgba(127,179,255,0.5)"
        strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      {/* Hub (right) */}
      <motion.circle
        cx={130}
        cy={44}
        r={20}
        initial={{ scale: 0 }}
        animate={active ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
        fill="url(#cd-collapse-grad)"
        opacity="0.95"
      />
      <motion.circle
        cx={130}
        cy={44}
        r={20}
        animate={active ? { scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] } : {}}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay: 1,
          ease: 'easeOut',
        }}
        fill="none"
        stroke="#7FB3FF"
        strokeWidth="1.4"
      />
      <text
        x={130}
        y={48}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="10.5"
        fontWeight="600"
        fill="white"
        letterSpacing="0.04em"
      >
        ONE
      </text>
      {/* Caption */}
      <text
        x={28}
        y={76}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="8"
        fontWeight="600"
        fill="rgba(127,179,255,0.55)"
        letterSpacing="0.1em"
      >
        9 WORKLOADS
      </text>
      <text
        x={170}
        y={76}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="8"
        fontWeight="600"
        fill="rgba(127,179,255,0.55)"
        letterSpacing="0.1em"
      >
        1 ENGINE
      </text>
    </svg>
  )
}

/** Card 2 — Neural pulse network */
function VizNeural({ active }: { active: boolean }) {
  const nodes = [
    { x: 28, y: 24 },
    { x: 28, y: 58 },
    { x: 80, y: 16 },
    { x: 80, y: 44 },
    { x: 80, y: 72 },
    { x: 132, y: 24 },
    { x: 132, y: 58 },
    { x: 174, y: 44 },
  ]
  const edges = [
    [0, 2], [0, 3], [1, 3], [1, 4],
    [2, 5], [3, 5], [3, 6], [4, 6],
    [5, 7], [6, 7],
  ]
  return (
    <svg viewBox="0 0 200 88" width="100%" height="88" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cd-neural-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7FB3FF" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#1E8AFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7FB3FF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#cd-neural-grad)"
          strokeWidth="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.3 + i * 0.06,
            ease: EASE,
          }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="3.6"
            fill="#1A38E8"
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.2 + i * 0.05,
              ease: EASE,
            }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="3.6"
            fill="none"
            stroke="#7FB3FF"
            strokeWidth="0.9"
            animate={active ? { r: [3.6, 8, 3.6], opacity: [0.6, 0, 0.6] } : {}}
            transition={{
              duration: 2.6,
              delay: 0.6 + (i % 4) * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </g>
      ))}
      {/* Pulse traveling through */}
      <motion.circle
        r="3"
        fill="#34D399"
        initial={{ opacity: 0 }}
        animate={
          active
            ? {
                opacity: [0, 1, 1, 0],
                cx: [28, 80, 132, 174],
                cy: [40, 44, 40, 44],
              }
            : {}
        }
        transition={{
          duration: 2.4,
          delay: 1.2,
          repeat: Infinity,
          repeatDelay: 1.2,
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

/** Card 3 — Decision to action arrow */
function VizAction({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 88" width="100%" height="88" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cd-action-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7FB3FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1A38E8" />
        </linearGradient>
      </defs>
      {/* Decide block */}
      <motion.rect
        initial={{ opacity: 0, x: -8 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        x={6}
        y={28}
        width={56}
        height={32}
        rx={6}
        fill="rgba(127,179,255,0.12)"
        stroke="rgba(127,179,255,0.45)"
        strokeWidth="1"
      />
      <text
        x={34}
        y={48}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="9.5"
        fontWeight="600"
        fill="rgba(127,179,255,0.9)"
        letterSpacing="0.06em"
      >
        DECIDE
      </text>
      {/* Arrow */}
      <motion.path
        d="M68 44 L130 44"
        stroke="url(#cd-action-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
      />
      <motion.path
        d="M124 38 L132 44 L124 50"
        stroke="#1A38E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
      {/* Pulse traveling */}
      <motion.circle
        r="3"
        fill="#1A38E8"
        initial={{ cx: 68, opacity: 0 }}
        animate={active ? { cx: [68, 128], opacity: [0, 1, 0] } : {}}
        cy={44}
        transition={{
          duration: 1.2,
          delay: 1.6,
          repeat: Infinity,
          repeatDelay: 1.6,
          ease: 'easeInOut',
        }}
      />
      {/* Act block */}
      <motion.rect
        initial={{ opacity: 0, x: 8 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        x={138}
        y={28}
        width={56}
        height={32}
        rx={6}
        fill="url(#cd-action-grad)"
      />
      <text
        x={166}
        y={48}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="9.5"
        fontWeight="600"
        fill="white"
        letterSpacing="0.06em"
      >
        ACT
      </text>
      {/* Caption */}
      <text
        x={100}
        y={76}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="8"
        fontWeight="600"
        fill="rgba(127,179,255,0.55)"
        letterSpacing="0.1em"
      >
        IN-ENGINE LOOP
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  3D tilt card                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

type CardData = {
  tag: string
  title: string
  body: string
  Viz: React.ComponentType<{ active: boolean }>
}

function TiltCard({
  card,
  index,
  active,
}: {
  card: CardData
  index: number
  active: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.25 } }}
      className="cd-card relative rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: 'clamp(22px, 2.4vw, 32px)',
        backdropFilter: 'blur(8px)',
        minHeight: 'clamp(340px, 30vw, 380px)',
      }}
    >
      {/* Top accent rule */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(127,179,255,0.55), transparent)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative' }}>
          {/* Mono index + tag */}
          <div className="flex items-center justify-between mb-4">
            <span
              style={{
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: '#7FB3FF',
              }}
            >
              0{index + 1}
            </span>
            <span
              style={{
                fontFamily:
                  'var(--font-mono, ui-monospace, monospace)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {card.tag}
            </span>
          </div>

          {/* Micro-viz */}
          <div
            className="relative rounded-xl mb-5"
            style={{
              padding: '12px 14px',
              background: 'rgba(127,179,255,0.04)',
              border: '1px solid rgba(127,179,255,0.10)',
            }}
          >
            <card.Viz active={active} />
          </div>

          <h3
            className="text-white"
            style={{
              fontSize: 'clamp(18px, 1.7vw, 22px)',
              fontWeight: 400,
              letterSpacing: '-0.005em',
              lineHeight: 1.25,
              margin: '0 0 10px 0',
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(13.5px, 1.05vw, 15px)',
              fontWeight: 400,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {card.body}
          </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Section                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function CoreDifferentiation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homeCoreDiff) ?? {}) as Record<
    string,
    string
  >

  const cards: CardData[] = [
    {
      tag: t.card1Tag ?? 'Unified by Design',
      title: t.card1Title ?? 'All data types in one system',
      body:
        t.card1Body ??
        'Vector, time-series, geospatial, document, blob, full-text, streaming SQL, key-value, graph. One engine. One query language.',
      Viz: VizCollapse,
    },
    {
      tag: t.card2Tag ?? 'AI-Native Core',
      title: t.card2Title ?? 'Intelligence built into the engine',
      body:
        t.card2Body ??
        'Embeddings, vector search, hybrid retrieval, and live context, native to the data plane.',
      Viz: VizNeural,
    },
    {
      tag: t.card3Tag ?? 'Execution Built-In',
      title: t.card3Title ?? 'Instant action, not insight reports',
      body:
        t.card3Body ??
        'Decisions trigger workflows, state updates, and downstream actions directly inside the engine.',
      Viz: VizAction,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
      }}
    >
      {/* Soft top halo */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '20%',
          right: '20%',
          height: '60%',
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,138,255,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Difference'} variant="dark" />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
          style={{
            fontSize: 'clamp(28px, 4vw, 64px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            margin: 'clamp(28px, 3.5vw, 56px) 0 0 0',
            maxWidth: 'clamp(580px, 90%, 1040px)',
            textWrap: 'balance',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.55)', display: 'block' }}>
            {t.headlineLine1 ?? 'Most platforms stop at insight.'}
          </span>
          <span
            style={{
              backgroundImage:
                'linear-gradient(90deg, #ffffff 0%, #7FB3FF 40%, #1E8AFF 70%, #ffffff 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              animation: 'coreDiffSheen 7s ease-in-out infinite',
              display: 'block',
            }}
          >
            {t.headlineLine2 ?? 'MonkDB executes.'}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          style={{
            color: 'rgba(255,255,255,0.62)',
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.7,
            marginTop: '24px',
            maxWidth: '720px',
          }}
        >
          {t.lead ??
            'Traditional systems separate data, AI, and execution. MonkDB unifies them into a single system.'}
        </motion.p>

        {/* 3 tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14 lg:mt-20">
          {cards.map((c, i) => (
            <TiltCard key={c.tag} card={c} index={i} active={inView} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes coreDiffSheen {
          0% {
            background-position: 200% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
      `}</style>
    </section>
  )
}
