'use client'

/**
 * AI-Native Operational Intelligence System — strategic pillar page.
 *
 * Visual identity: kinetic, real-time, loop-driven. Electric blue accent
 * (#1E8AFF). Continuous five-stage loop visualization. From → To shift table.
 * Live performance proof.
 *
 * Distinct from:
 *   - Sovereign pillar (which is conservative, vault-driven)
 *   - SmartX product pages (which are industry-specific)
 *   - Generic DetailPageLayout
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Activity,
  BrainCircuit,
  Sliders,
  Send,
  Repeat,
  ArrowRight,
  Timer,
  TrendingUp,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const ACCENT = '#1E8AFF'
const EASE = [0.165, 0.84, 0.44, 1] as const

const STAGES = [
  {
    Icon: Activity,
    title: 'Real-Time Data Ingestion',
    body: 'Capture streams, events, transactions, and signals as they occur. No batching. No staging.',
  },
  {
    Icon: BrainCircuit,
    title: 'Continuous Context Building',
    body: 'AI models and logic operate on live data, maintaining an always-updated understanding of system state.',
  },
  {
    Icon: Sliders,
    title: 'Instant Decisioning',
    body: 'Insights generated in real time. Actionable intelligence embedded inside operations, not in a report.',
  },
  {
    Icon: Send,
    title: 'Built-In Execution',
    body: 'Decisions trigger workflows and operational changes immediately, without external dependencies.',
  },
  {
    Icon: Repeat,
    title: 'Closed-Loop Learning',
    body: 'Every action feeds back into the system, continuously improving intelligence and outcomes.',
  },
]

const SHIFTS = [
  { from: 'Reports', to: 'Real-time awareness' },
  { from: 'Dashboards', to: 'Continuous intelligence' },
  { from: 'Manual actions', to: 'Automated execution' },
  { from: 'Delayed decisions', to: 'Instant response' },
  { from: 'Reactive operations', to: 'Self-optimizing systems' },
]

const PERF_LANES = [
  { label: 'Ingest', latency: '<1 ms', share: 18 },
  { label: 'Context build', latency: '<2 ms', share: 22 },
  { label: 'Decision', latency: '<2 ms', share: 26 },
  { label: 'Execute', latency: '<1 ms', share: 18 },
  { label: 'Learn', latency: 'Continuous', share: 16 },
]

export default function OperationalContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const loopRef = useRef<HTMLDivElement>(null)
  const loopInView = useInView(loopRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero — kinetic, with continuous loop visualization ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #050D6A 0%, #07091A 50%, #050D6A 100%)',
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '0%',
            left: '20%',
            right: '20%',
            height: '70%',
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ACCENT}26 0%, transparent 70%)`,
            filter: 'blur(70px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(127,179,255,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.55,
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
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
                <Activity size={13} strokeWidth={2} />
                Strategic Pillar · II
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
                Run Your Business
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 0%, ${ACCENT} 50%, #ffffff 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: 'opSheen 6s ease-in-out infinite',
                    fontWeight: 400,
                  }}
                >
                  in Real Time.
                </span>
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  width: '64px',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, ${ACCENT} 0%, #1A38E8 100%)`,
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
                From data, to decisions, to execution. Continuously.
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
                The AI-Native Operational Intelligence System turns enterprises
                from reactive organizations into continuously adaptive,
                self-optimizing systems.
              </p>
            </motion.div>

            {/* Continuous loop visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="relative w-full mx-auto"
              style={{ width: '100%', maxWidth: 480, height: 'min(70vw, 480px)', aspectRatio: '1 / 1' }}
            >
              {/* Outer rotating ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed ${ACCENT}55`,
                  animation: 'opSpin 24s linear infinite',
                }}
              />
              {/* Inner solid ring */}
              <div
                className="absolute"
                style={{
                  inset: '12%',
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}55`,
                  background:
                    'radial-gradient(circle, rgba(7,9,26,0.6) 0%, rgba(7,9,26,0.0) 70%)',
                  boxShadow: `0 0 60px ${ACCENT}33, inset 0 0 40px ${ACCENT}22`,
                }}
              />
              {/* Five stage nodes positioned around the ring */}
              {STAGES.map((s, i) => {
                const angle = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2
                const r = 44 // % of container
                const x = 50 + Math.cos(angle) * r
                const y = 50 + Math.sin(angle) * r
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.55,
                      delay: 0.4 + i * 0.08,
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
                      className="inline-flex items-center justify-center text-white rounded-full"
                      style={{
                        width: 'clamp(46px, 5vw, 64px)',
                        height: 'clamp(46px, 5vw, 64px)',
                        background:
                          'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                        border: `1px solid ${ACCENT}99`,
                        boxShadow: `0 12px 32px ${ACCENT}44`,
                      }}
                    >
                      <s.Icon size={22} strokeWidth={1.6} />
                    </div>
                  </motion.div>
                )
              })}
              {/* Center label */}
              <div
                className="absolute"
                style={{
                  inset: '36%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                  border: `1px solid ${ACCENT}AA`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: `0 0 60px ${ACCENT}44, inset 0 1px 0 rgba(255,255,255,0.18)`,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: ACCENT,
                  }}
                >
                  Continuous
                </span>
                <span
                  className="text-white"
                  style={{
                    fontSize: 'clamp(13px, 1.2vw, 16px)',
                    fontWeight: 500,
                    marginTop: '4px',
                  }}
                >
                  Loop
                </span>
              </div>
              {/* Pulse ring */}
              <motion.div
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: '36%',
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}99`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── From → To shift table ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24 section-grid relative">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Operational shift" />
          <h2
            className="text-gray-900 dark:text-white mt-6 mb-10 sm:mb-12"
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
            From the old way{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              to the operating system of now
            </span>
          </h2>
          <div
            className="rounded-2xl overflow-hidden card-surface"
          >
            <div
              className="grid grid-cols-[1fr_auto_1fr]"
              style={{
                background: '#F8F4F0',
                borderBottom: '1px solid rgba(10,34,128,0.10)',
              }}
            >
              <div
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 18px) clamp(20px, 2.4vw, 28px)',
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,34,128,0.55)',
                }}
              >
                From
              </div>
              <div
                aria-hidden="true"
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 18px) clamp(8px, 1.2vw, 14px)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  style={{ color: ACCENT }}
                />
              </div>
              <div
                style={{
                  padding:
                    'clamp(14px, 1.6vw, 18px) clamp(20px, 2.4vw, 28px)',
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                }}
              >
                To
              </div>
            </div>
            {SHIFTS.map((s, i) => (
              <motion.div
                key={s.from}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="grid grid-cols-[1fr_auto_1fr] items-center"
                style={{
                  borderBottom:
                    i < SHIFTS.length - 1
                      ? '1px solid rgba(10,34,128,0.06)'
                      : 'none',
                }}
              >
                <div
                  className="text-gray-500"
                  style={{
                    padding:
                      'clamp(16px, 1.8vw, 22px) clamp(20px, 2.4vw, 28px)',
                    fontSize: 'clamp(15px, 1.2vw, 17px)',
                    fontWeight: 400,
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(220,38,38,0.5)',
                    textDecorationThickness: '1.5px',
                  }}
                >
                  {s.from}
                </div>
                <div
                  className="flex items-center"
                  style={{
                    padding: '0 clamp(8px, 1.2vw, 14px)',
                  }}
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    style={{ color: ACCENT, opacity: 0.6 }}
                  />
                </div>
                <div
                  className="flex items-center gap-3 text-[#0A2280] dark:text-white"
                  style={{
                    padding:
                      'clamp(16px, 1.8vw, 22px) clamp(20px, 2.4vw, 28px)',
                    fontSize: 'clamp(15px, 1.2vw, 17px)',
                    fontWeight: 500,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: ACCENT,
                      flexShrink: 0,
                    }}
                  />
                  {s.to}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five stages of the loop — detailed cards ── */}
      <section
        ref={loopRef}
        className="relative overflow-hidden py-14 sm:py-20 lg:py-28"
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
              'radial-gradient(circle, rgba(127,179,255,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="The continuous loop" variant="dark" />
          <h2
            className="text-white mt-6 mb-12 sm:mb-14"
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
            Five stages,{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              one operating system
            </span>
          </h2>

          {/* Horizontal stages with arrows */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none hidden lg:block"
              style={{
                top: 'clamp(28px, 3.6vw, 42px)',
                left: '8%',
                right: '8%',
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${ACCENT}66 12%, ${ACCENT}AA 50%, ${ACCENT}66 88%, transparent 100%)`,
              }}
            />
            {/* Traveling pulse */}
            <span
              aria-hidden="true"
              className="absolute hidden lg:block op-pulse"
              style={{
                top: 'clamp(26px, 3.4vw, 40px)',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: ACCENT,
                boxShadow: `0 0 16px ${ACCENT}`,
              }}
            />

            {STAGES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={loopInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.1,
                  ease: EASE,
                }}
                className="relative flex flex-col rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${ACCENT}33`,
                  padding: 'clamp(20px, 2.2vw, 26px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="relative inline-flex mb-5">
                  <div
                    className="inline-flex items-center justify-center rounded-full text-white"
                    style={{
                      width: 'clamp(48px, 5vw, 64px)',
                      height: 'clamp(48px, 5vw, 64px)',
                      background:
                        'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                      border: `1px solid ${ACCENT}99`,
                      boxShadow: `0 12px 28px ${ACCENT}33`,
                    }}
                  >
                    <s.Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 inline-flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(7,9,26,0.95)',
                      border: `1px solid ${ACCENT}88`,
                      color: ACCENT,
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    letterSpacing: '-0.005em',
                    margin: '0 0 8px 0',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.62)',
                    fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Performance proof — latency budget per stage ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-6 sm:gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel text="Performance" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(26px, 3.4vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Sense to act,{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  in milliseconds
                </span>
              </h2>
              <p
                className="text-gray-600 dark:text-gray-400 mt-5"
                style={{
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  lineHeight: 1.7,
                  maxWidth: '420px',
                  margin: '20px 0 0 0',
                }}
              >
                The full operating loop runs in single-millisecond budgets.
                Each stage is observable, controllable, and tunable inside the
                engine.
              </p>
              <div className="flex items-center gap-6 mt-8">
                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: ACCENT,
                  }}
                >
                  <Timer size={14} strokeWidth={2} /> p99 ~6 ms full loop
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#0A2280',
                  }}
                >
                  <TrendingUp size={14} strokeWidth={2} /> Linear scaling
                </div>
              </div>
            </div>
            <ul
              className="flex flex-col gap-3"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {PERF_LANES.map((lane, i) => (
                <motion.li
                  key={lane.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: EASE,
                  }}
                  className="grid grid-cols-[110px_1fr_100px] items-center gap-4 rounded-xl card-surface"
                  style={{
                    padding: 'clamp(14px, 1.6vw, 20px) clamp(18px, 2vw, 24px)',
                  }}
                >
                  <span
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {lane.label}
                  </span>
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{
                      height: 8,
                      background: 'rgba(10,34,128,0.08)',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lane.share * 4}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.9,
                        delay: 0.3 + i * 0.07,
                        ease: 'easeOut',
                      }}
                      className="absolute top-0 bottom-0 left-0"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT} 0%, #1A38E8 100%)`,
                      }}
                    />
                  </div>
                  <span
                    className="text-right"
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#0A2280',
                    }}
                  >
                    {lane.latency}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Closing manifesto + outcomes ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: 'clamp(72px, 9vw, 120px)',
                  fontWeight: 700,
                  lineHeight: 0.7,
                  color: `${ACCENT}30`,
                  fontFamily: 'serif',
                  display: 'inline-block',
                  marginBottom: '16px',
                }}
              >
                ⟳
              </span>
              <p
                className="text-[#0A2280] dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 40px)',
                  fontWeight: 300,
                  lineHeight: 1.32,
                  letterSpacing: '-0.012em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                From reactive enterprise to{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  continuously adaptive, self-optimizing system
                </span>
                .
              </p>
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {[
                {
                  tag: 'SENSE',
                  body: 'Streams, events, and signals captured the moment they happen.',
                },
                {
                  tag: 'DECIDE',
                  body: 'Live context and policy resolved inside the engine, not in a side service.',
                },
                {
                  tag: 'ACT',
                  body: 'Workflows, state changes, and downstream systems triggered in milliseconds.',
                },
              ].map((stage, i) => (
                <li
                  key={stage.tag}
                  className="rounded-xl flex items-center gap-4"
                  style={{
                    background: '#FAFBFD',
                    border: '1px solid rgba(10,34,128,0.08)',
                    padding: 'clamp(14px, 1.6vw, 20px) clamp(16px, 1.8vw, 22px)',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: `${ACCENT}1A`,
                      border: `1px solid ${ACCENT}33`,
                      color: ACCENT,
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        color: ACCENT,
                        marginBottom: 2,
                      }}
                    >
                      {stage.tag}
                    </div>
                    <div
                      className="text-gray-700"
                      style={{
                        fontSize: 'clamp(12.5px, 1vw, 14px)',
                        lineHeight: 1.5,
                      }}
                    >
                      {stage.body}
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <CTABanner heading="Run your business in real time." />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes opSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes opSheen {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
        @keyframes opPulseTravel {
          0%,
          5% {
            left: 8%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          95%,
          100% {
            left: calc(92% - 8px);
            opacity: 0;
          }
        }
        :global(.op-pulse) {
          animation: opPulseTravel 4.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
