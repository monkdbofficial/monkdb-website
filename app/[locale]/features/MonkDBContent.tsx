'use client'

/**
 * MonkDB — bespoke product page for the AI-Native Unified Database.
 * Visual identity: primary brand blue (#1A38E8), atomic/nucleus convergence,
 * "9 workloads, 1 engine" central metaphor, before/after stack replacement.
 *
 * Distinct from:
 *   - MonkEdge (cyan-teal edge-to-cloud topology)
 *   - MonkSmartX hub (violet constellation of products)
 *   - Sovereign / Operational pillars (manifesto-style)
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Database,
  Activity,
  Search,
  FileJson,
  GitBranch,
  Map,
  KeyRound,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Shield,
  Workflow,
  Network,
  CheckCircle2,
  Boxes,
  Brain,
  Lock,
  ArrowRight,
  Minus,
  X as XIcon,
  Server,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const ACCENT = '#1A38E8'
const ACCENT_DEEP = '#0A2280'
const EASE = [0.165, 0.84, 0.44, 1] as const

const STATS = [
  { value: '9', label: 'Workloads unified' },
  { value: '1', label: 'Binary, zero ops' },
  { value: '<5 ms', label: 'Query latency P99' },
  { value: 'ARM + x86', label: 'Anywhere it runs' },
]

const WORKLOADS = [
  {
    Icon: Database,
    code: 'OLTP',
    title: 'Relational',
    body: 'ACID transactions, joins, and SQL across the unified plane.',
  },
  {
    Icon: Activity,
    code: 'TS',
    title: 'Time-series',
    body: 'High-cardinality metrics and event streams at line rate.',
  },
  {
    Icon: Sparkles,
    code: 'VEC',
    title: 'Vector',
    body: 'Embeddings, hybrid retrieval, and ANN search in the engine.',
  },
  {
    Icon: Search,
    code: 'FTS',
    title: 'Full-text search',
    body: 'Text indexes alongside structured and vector data, no extra system.',
  },
  {
    Icon: FileJson,
    code: 'DOC',
    title: 'Document',
    body: 'Native JSON ingestion, projection, and querying without schema drift.',
  },
  {
    Icon: GitBranch,
    code: 'GRAPH',
    title: 'Graph',
    body: 'Relationship traversal across entities, no separate graph engine.',
  },
  {
    Icon: Map,
    code: 'GEO',
    title: 'Geospatial',
    body: 'Spatial indexes and predicates for location-aware workloads.',
  },
  {
    Icon: KeyRound,
    code: 'KV',
    title: 'Key-value',
    body: 'Low-latency point reads and writes for state and cache patterns.',
  },
  {
    Icon: Workflow,
    code: 'STREAM',
    title: 'Streaming',
    body: 'In-flight processing alongside historical context, single query surface.',
  },
]

const CAPABILITIES = [
  {
    Icon: Layers,
    title: 'One unified data plane',
    body: 'Relational, time-series, vector, search, document, graph, geospatial, KV, and streaming converge into one query surface and one storage layer.',
    chip: 'One engine · one query',
  },
  {
    Icon: Brain,
    title: 'AI-native execution',
    body: 'Vector search, hybrid retrieval, and live inference run inside the engine. No sidecar systems, no embedding drift, no glue services.',
    chip: 'Vector + SQL · in-place',
  },
  {
    Icon: Cpu,
    title: 'Single binary, zero ops',
    body: 'A C++ engine that runs the same on a laptop, a hyperscaler region, an air-gapped data center, or an industrial gateway. No cluster choreography.',
    chip: 'Same binary everywhere',
  },
  {
    Icon: Lock,
    title: 'Sovereignty by construction',
    body: 'Identity, policy, lineage, and residency are wired into every query before it executes. Audit-grade by default, not by audit project.',
    chip: 'Governed at the kernel',
  },
  {
    Icon: Zap,
    title: 'Real-time over batch',
    body: 'Streams, change data, and events processed in flight and served alongside historical context in millisecond budgets, not minutes.',
    chip: 'Sub-5 ms decisioning',
  },
]

const STACK_BEFORE = [
  { label: 'Operational database', spec: 'Postgres / MySQL' },
  { label: 'Data warehouse', spec: 'Snowflake / BigQuery' },
  { label: 'Time-series store', spec: 'InfluxDB / Timescale' },
  { label: 'Vector database', spec: 'Pinecone / Weaviate' },
  { label: 'Search engine', spec: 'Elastic / OpenSearch' },
  { label: 'Stream processor', spec: 'Kafka + Flink' },
  { label: 'Glue layer', spec: 'ETL · CDC · pipelines' },
]

const TRUST = [
  'SOC 2 Type II',
  'ISO 27001',
  'GDPR',
  'HIPAA',
  'PCI DSS',
  'Air-gapped',
  'ARM + x86',
  'On-prem · Cloud · Edge',
]

export default function MonkDBContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── HERO — 9 workloads orbit one engine core ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #050D6A 0%, #0A2280 55%, #0f1623 100%)',
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            right: '-12%',
            width: '60%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}3D 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(127,179,255,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7FB3FF',
                }}
              >
                <Database size={13} strokeWidth={2} />
                Products · MonkDB
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(44px, 6.5vw, 96px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  margin: '0 0 28px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Nine workloads.
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 0%, #7FB3FF 50%, #ffffff 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: 'monkdbSheen 7s ease-in-out infinite',
                    fontWeight: 400,
                  }}
                >
                  One engine.
                </span>
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  width: '64px',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, #7FB3FF 0%, ${ACCENT} 100%)`,
                  marginBottom: '28px',
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 18px 0',
                  maxWidth: '560px',
                }}
              >
                The AI-Native Unified Database. A single binary that replaces
                your relational, analytical, time-series, vector, search, and
                streaming systems.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                MonkDB unifies the data plane that AI systems and operational
                workloads need. Identity, policy, and lineage run inside the
                engine. Vector and SQL share the same query surface. The same
                binary deploys from cloud to edge.
              </p>
            </motion.div>

            {/* 9 workloads orbiting a central engine core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="relative"
              style={{ width: '100%', height: 'min(70vw, 480px)', aspectRatio: '1 / 1', maxWidth: 480, margin: '0 auto' }}
            >
              {/* Outer dashed ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed rgba(127,179,255,0.30)`,
                  animation: 'monkdbSpin 36s linear infinite',
                }}
              />
              {/* Inner solid ring */}
              <div
                className="absolute"
                style={{
                  inset: '14%',
                  borderRadius: '50%',
                  border: `1px dashed rgba(127,179,255,0.45)`,
                  animation: 'monkdbSpin 52s linear reverse infinite',
                }}
              />
              {/* Innermost pulse */}
              <motion.div
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  border: `2px solid #7FB3FF99`,
                }}
                animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Center engine core */}
              <div
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                  border: `1px solid #7FB3FF`,
                  boxShadow: `0 0 80px ${ACCENT}66, inset 0 1px 0 rgba(255,255,255,0.20)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Server
                  size={26}
                  strokeWidth={1.5}
                  style={{ color: 'white', marginBottom: 4 }}
                />
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: '#7FB3FF',
                  }}
                >
                  MONKDB
                </span>
                <span
                  style={{
                    fontSize: '8.5px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: 2,
                  }}
                >
                  ENGINE
                </span>
              </div>

              {/* 9 workload nodes around the ring */}
              {WORKLOADS.map((w, i) => {
                const angle = -90 + (i * 360) / 9
                const rad = (angle * Math.PI) / 180
                const r = 45
                const x = 50 + Math.cos(rad) * r
                const y = 50 + Math.sin(rad) * r
                return (
                  <motion.div
                    key={w.code}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      heroInView ? { opacity: 1, scale: 1 } : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.06,
                      ease: EASE,
                    }}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center rounded-full text-white"
                      style={{
                        width: 'clamp(40px, 4.6vw, 56px)',
                        height: 'clamp(40px, 4.6vw, 56px)',
                        background: 'rgba(7,9,26,0.85)',
                        border: `1px solid rgba(127,179,255,0.55)`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <w.Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div
                      className="absolute mt-1 whitespace-nowrap"
                      style={{
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: '#7FB3FF',
                        marginTop: 6,
                      }}
                    >
                      {w.code}
                    </div>
                  </motion.div>
                )
              })}

              {/* Pulses traveling from workloads to engine */}
              {[0, 0.4, 0.8, 1.2, 1.6, 2.0].map((d, i) => (
                <motion.span
                  key={`pulse-${i}`}
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#7FB3FF',
                    boxShadow: `0 0 10px #7FB3FF`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    x: [Math.cos((i * Math.PI * 2) / 6) * 110, 0],
                    y: [Math.sin((i * Math.PI * 2) / 6) * 110, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: d,
                    repeat: Infinity,
                    ease: 'easeIn',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#07091A',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 'clamp(32px, 4.5vw, 64px)',
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: '#7FB3FF',
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 workloads grid ── */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-12">
            <div>
              <SectionLabel text="The nine workloads" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Every data shape your AI stack needs,{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  served from one engine
                </span>
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 self-end"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Nine workloads, one query surface, one storage layer. No sidecar
              systems, no embedding drift, no pipeline glue between data shapes
              that your applications actually use together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WORKLOADS.map((w, i) => (
              <motion.div
                key={w.code}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="monkdb-cap relative rounded-2xl overflow-hidden"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.4vw, 28px)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="monkdb-cap-rail absolute top-0 left-0 right-0"
                  style={{
                    height: '2px',
                    background: `linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT}55 60%, transparent 100%)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 380ms ease',
                  }}
                />
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${ACCENT}10`,
                      border: `1px solid ${ACCENT}33`,
                      color: ACCENT,
                    }}
                  >
                    <w.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.55)',
                    }}
                  >
                    {w.code}
                  </span>
                </div>
                <h3
                  className="text-[#0A2280] dark:text-white"
                  style={{
                    fontSize: 'clamp(16px, 1.4vw, 20px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 8px 0',
                  }}
                >
                  {w.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {w.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Replace the stack — before / after comparison ── */}
      <section
        className="relative overflow-hidden py-14 sm:py-20 lg:py-24"
        style={{
          background: '#F8F4F0',
          borderTop: '1px solid rgba(10,34,128,0.10)',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Replace the stack" />
          <h2
            className="text-gray-900 mt-6 mb-12 sm:mb-16"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '24px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Seven systems and a glue layer,{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              collapsed into one binary.
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-center">
            {/* BEFORE — fragmented stack */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl"
              style={{
                background: 'white',
                border: '1px solid rgba(10,34,128,0.10)',
                padding: 'clamp(20px, 2.4vw, 28px)',
              }}
            >
              <div
                className="flex items-center gap-2 mb-5 pb-4"
                style={{ borderBottom: '1px solid rgba(10,34,128,0.08)' }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-md"
                  style={{
                    width: 22,
                    height: 22,
                    background: 'rgba(220,53,69,0.10)',
                    color: '#B91C1C',
                  }}
                >
                  <XIcon size={14} strokeWidth={2.4} />
                </span>
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,34,128,0.55)',
                  }}
                >
                  Before MonkDB
                </span>
              </div>
              <ul
                className="space-y-2.5"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {STACK_BEFORE.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#FAFBFD',
                      border: '1px solid rgba(10,34,128,0.06)',
                    }}
                  >
                    <span
                      className="text-[#0A2280]"
                      style={{
                        fontSize: 'clamp(13px, 1.05vw, 15px)',
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10.5px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        color: 'rgba(10,34,128,0.50)',
                      }}
                    >
                      {s.spec}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px dashed rgba(10,34,128,0.10)' }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(10,34,128,0.55)',
                  }}
                >
                  7 systems · multiple SLAs · pipeline glue
                </span>
              </div>
            </motion.div>

            {/* Arrow / convergence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="hidden lg:flex items-center justify-center"
            >
              <div
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                  boxShadow: `0 14px 30px ${ACCENT}33`,
                  color: 'white',
                }}
              >
                <ArrowRight size={22} strokeWidth={1.8} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="lg:hidden flex items-center justify-center py-2"
            >
              <div
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                  color: 'white',
                }}
              >
                <ArrowRight size={20} strokeWidth={1.8} className="rotate-90" />
              </div>
            </motion.div>

            {/* AFTER — single binary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="rounded-2xl relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, #050D6A 0%, #0A2280 60%, #07091A 100%)',
                border: `1px solid ${ACCENT}55`,
                padding: 'clamp(20px, 2.4vw, 28px)',
                boxShadow: `0 20px 50px ${ACCENT}22`,
              }}
            >
              <div
                className="flex items-center gap-2 mb-5 pb-4"
                style={{ borderBottom: `1px solid ${ACCENT}33` }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-md"
                  style={{
                    width: 22,
                    height: 22,
                    background: `${ACCENT}33`,
                    color: '#7FB3FF',
                  }}
                >
                  <CheckCircle2 size={14} strokeWidth={2.4} />
                </span>
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#7FB3FF',
                  }}
                >
                  With MonkDB
                </span>
              </div>
              <div
                className="rounded-xl mb-4 flex items-center gap-4"
                style={{
                  padding: 'clamp(20px, 2.4vw, 28px)',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${ACCENT}44`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    background:
                      'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                    border: `1px solid ${ACCENT}99`,
                    color: 'white',
                  }}
                >
                  <Server size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <div
                    className="text-white"
                    style={{
                      fontSize: 'clamp(17px, 1.5vw, 22px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.2,
                    }}
                  >
                    MonkDB
                  </div>
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: '#7FB3FF',
                      marginTop: 2,
                    }}
                  >
                    SINGLE BINARY · UNIFIED ENGINE
                  </div>
                </div>
              </div>
              <ul
                className="space-y-2"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {[
                  'All nine workloads, one query surface',
                  'Identity, policy, lineage at the kernel',
                  'Vector and SQL share execution',
                  'No pipeline glue, no embedding drift',
                  'Same binary: cloud, on-prem, edge',
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2"
                    style={{
                      fontSize: 'clamp(13px, 1.05vw, 15px)',
                      color: 'rgba(255,255,255,0.78)',
                      lineHeight: 1.5,
                    }}
                  >
                    <Minus
                      size={14}
                      strokeWidth={2.4}
                      style={{
                        color: '#7FB3FF',
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 pt-4 flex items-center justify-between"
                style={{ borderTop: `1px dashed ${ACCENT}33` }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#7FB3FF',
                  }}
                >
                  1 system · 1 SLA · 0 glue
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core capabilities — bento ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-12">
            <div>
              <SectionLabel text="Core capabilities" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Built for the AI-agent era,{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  governed at the kernel.
                </span>
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 self-end"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '520px',
              }}
            >
              The capabilities below are not optional add-ons. They are
              properties of the engine: simple to operate, AI-native by
              construction, sovereign by default, real-time over batch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="monkdb-cap relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="monkdb-cap-rail absolute top-0 left-0 right-0"
                  style={{
                    height: '2px',
                    background: `linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT}55 60%, transparent 100%)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 380ms ease',
                  }}
                />
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: 'clamp(18px, 1.8vw, 22px) clamp(20px, 2vw, 24px) 0',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${ACCENT}1A`,
                      border: `1px solid ${ACCENT}55`,
                      color: ACCENT,
                    }}
                  >
                    <c.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.45)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / 0{CAPABILITIES.length}
                  </span>
                </div>
                <div
                  className="flex-1"
                  style={{
                    padding: 'clamp(14px, 1.4vw, 18px) clamp(20px, 2vw, 24px) clamp(14px, 1.4vw, 18px)',
                  }}
                >
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
                <div
                  style={{
                    padding: 'clamp(12px, 1.4vw, 16px) clamp(20px, 2vw, 24px)',
                    borderTop: '1px dashed rgba(10,34,128,0.10)',
                    background: '#FAFBFD',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: ACCENT,
                  }}
                >
                  {c.chip}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture layered diagram strip ── */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
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
            opacity: 0.55,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Architecture" variant="dark" />
          <h2
            className="text-white mt-6 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '24px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Five layers,{' '}
            <span style={{ color: '#7FB3FF', fontWeight: 400 }}>
              one binary.
            </span>
          </h2>

          <div className="space-y-3">
            {[
              {
                Icon: Brain,
                tag: 'L5',
                title: 'AI execution surface',
                body: 'Vector search, hybrid retrieval, model serving, and agent state. All share the engine and policy plane.',
              },
              {
                Icon: Lock,
                tag: 'L4',
                title: 'Governance kernel',
                body: 'Identity, policy, lineage, and residency enforced before any query runs. Audit-grade by default.',
              },
              {
                Icon: Boxes,
                tag: 'L3',
                title: 'Unified query plane',
                body: 'One SQL surface across relational, vector, time-series, search, document, graph, geo, KV, and streams.',
              },
              {
                Icon: Network,
                tag: 'L2',
                title: 'Real-time + historical fabric',
                body: 'In-flight stream processing alongside historical context. No batch-first compromise.',
              },
              {
                Icon: Cpu,
                tag: 'L1',
                title: 'Single-binary C++ engine',
                body: 'High-performance core. ARM and x86. Cloud, on-prem, edge. Same binary, same semantics.',
              },
            ].map((layer, i) => (
              <motion.div
                key={layer.tag}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl grid grid-cols-[auto_auto_1fr] sm:grid-cols-[auto_72px_1fr_auto] items-center gap-4 sm:gap-6"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${ACCENT}33`,
                  padding: 'clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 26px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-xl text-white"
                  style={{
                    width: 44,
                    height: 44,
                    background:
                      'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                    border: `1px solid ${ACCENT}99`,
                    flexShrink: 0,
                  }}
                >
                  <layer.Icon size={20} strokeWidth={1.6} />
                </span>
                <span
                  className="hidden sm:inline-block"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 'clamp(20px, 2vw, 30px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#7FB3FF',
                    lineHeight: 1,
                  }}
                >
                  {layer.tag}
                </span>
                <div>
                  <h3
                    className="text-white"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.3,
                      margin: '0 0 4px 0',
                    }}
                  >
                    {layer.title}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {layer.body}
                  </p>
                </div>
                <span
                  className="hidden sm:inline-block text-right sm:col-start-4"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(127,179,255,0.55)',
                  }}
                >
                  Layer {layer.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer proof ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-28">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 lg:gap-16 items-start">
            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-12px',
                  fontSize: 'clamp(80px, 10vw, 130px)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: `${ACCENT}30`,
                  fontFamily: 'serif',
                }}
              >
                &ldquo;
              </span>
              <blockquote
                className="text-[#0A2280] dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 38px)',
                  fontWeight: 300,
                  lineHeight: 1.35,
                  letterSpacing: '-0.012em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                We retired four systems and a CDC layer in one quarter. The
                same engine now serves our analytics, vector search, and
                operational queries. Latency dropped, on-call burden dropped,
                cost dropped.
              </blockquote>
              <figcaption
                className="mt-8 flex items-center gap-3"
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'rgba(10,34,128,0.65)',
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 1,
                    background: ACCENT,
                  }}
                />
                Head of Platform Engineering, Tier-1 Bank
              </figcaption>
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
                border: `1px solid ${ACCENT}55`,
                boxShadow: `0 20px 50px ${ACCENT}22`,
              }}
            >
              <div
                style={{
                  padding:
                    'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 32px)',
                  borderBottom: `1px solid ${ACCENT}33`,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#7FB3FF',
                  }}
                >
                  MonkDB in numbers
                </span>
              </div>
              <ul
                className="grid grid-cols-1"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {[
                  {
                    v: '5×',
                    l: 'Systems retired in a single migration window',
                  },
                  { v: '70%', l: 'Reduction in pipeline glue and ETL' },
                  { v: '<5 ms', l: 'P99 query latency at production scale' },
                ].map((m, i) => (
                  <li
                    key={m.l}
                    className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] items-baseline"
                    style={{
                      padding:
                        'clamp(18px, 2.2vw, 26px) clamp(22px, 2.6vw, 32px)',
                      borderBottom:
                        i < 2 ? `1px solid ${ACCENT}22` : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 'clamp(28px, 3vw, 44px)',
                        fontWeight: 500,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: '#7FB3FF',
                      }}
                    >
                      {m.v}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                        fontWeight: 400,
                        lineHeight: 1.45,
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {m.l}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section
        className="relative overflow-hidden py-10 sm:py-14"
        style={{
          background: '#F8F4F0',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  background: `${ACCENT}1A`,
                  border: `1px solid ${ACCENT}55`,
                  color: ACCENT,
                }}
              >
                <Shield size={16} strokeWidth={1.6} />
              </span>
              <div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: ACCENT,
                  }}
                >
                  Production ready
                </div>
                <div
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  Compliant, sovereign, and deployable everywhere
                </div>
              </div>
            </div>
            <ul
              className="flex flex-wrap gap-2"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {TRUST.map((c) => (
                <li
                  key={c}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.12)',
                    color: ACCENT_DEEP,
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}
                >
                  <CheckCircle2
                    size={12}
                    strokeWidth={2.2}
                    style={{ color: ACCENT }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABanner heading="One engine. Every workload. Yours to run." />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes monkdbSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes monkdbSheen {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
        :global(.monkdb-cap:hover) {
          border-color: ${ACCENT}55 !important;
          box-shadow: 0 18px 42px ${ACCENT}1A;
          transition:
            transform 360ms ease,
            box-shadow 360ms ease,
            border-color 360ms ease;
        }
        :global(.monkdb-cap:hover .monkdb-cap-rail) {
          transform: scaleX(1);
        }
      `}</style>
    </main>
  )
}
