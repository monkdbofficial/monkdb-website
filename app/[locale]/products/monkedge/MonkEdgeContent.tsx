'use client'

/**
 * MonkEdge — bespoke product page for edge / distributed deployments.
 * Visual identity: kinetic cyan-teal (#06B6D4), edge-to-cloud topology
 * visualization, deployment scenario cards, offline-first proof.
 *
 * Distinct from:
 *   - MonkDB (the platform — full multi-modal data plane)
 *   - MonkSmartX hub (the portfolio of domain products)
 *   - Sovereign / Operational pillars (manifesto-style)
 *   - SmartX sub-products (industry-vertical specific)
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Activity,
  Cpu,
  Cloud,
  Wifi,
  WifiOff,
  Truck,
  Factory,
  Stethoscope,
  ShoppingBag,
  Train,
  Plug,
  Radio,
  RefreshCw,
  Brain,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

// Deeper teal-cyan accent. Tones down the candy cyan (#06B6D4)
// to an enterprise-grade shade that reads on dark + parchment surfaces.
const ACCENT = '#0E8FA8'
const EASE = [0.165, 0.84, 0.44, 1] as const

const STATS = [
  { value: '<1 ms', label: 'Local decision latency' },
  { value: 'Offline', label: 'First-class capability' },
  { value: '∞', label: 'Edge nodes per deployment' },
  { value: 'Same binary', label: 'Edge as cloud' },
]

const CAPABILITIES = [
  {
    Icon: Radio,
    title: 'Local data ingestion and processing',
    body: 'Capture and process sensor, device, and event data in real time at the source. No broker, no buffering layer.',
    chip: 'Native protocols',
  },
  {
    Icon: Brain,
    title: 'Stateful AI at the edge',
    body: 'Maintain continuous context locally. Vector search, hybrid retrieval, and live inference run without cloud dependency.',
    chip: 'Vector + SQL · in-place',
  },
  {
    Icon: Zap,
    title: 'Autonomous execution',
    body: 'Trigger actions instantly: adjust machine parameters, reroute vehicles, respond to anomalies, directly from the edge.',
    chip: 'In-engine triggers',
  },
  {
    Icon: WifiOff,
    title: 'Offline-first capability',
    body: 'Continue operating in low-connectivity or fully disconnected environments. Reconcile with central systems on reconnect.',
    chip: 'Resilient · network-tolerant',
  },
  {
    Icon: RefreshCw,
    title: 'Seamless cloud-edge synchronization',
    body: 'Maintain consistency between edge nodes and central deployments with conflict-aware reconciliation.',
    chip: 'Bi-directional sync',
  },
]

const SCENARIOS = [
  {
    Icon: Factory,
    label: 'Plant floor',
    body: 'Sub-millisecond control loops on production lines. PLCs, vision, and quality stay live during cloud outages.',
    spec: 'OPC UA · Modbus · IEC 62443',
  },
  {
    Icon: Truck,
    label: 'Connected vehicles',
    body: 'Per-vehicle context and route decisions made onboard. Fleet sync continues over intermittent links.',
    spec: 'CAN · OBU · OTA',
  },
  {
    Icon: ShoppingBag,
    label: 'Retail and venues',
    body: 'Floor-level personalization and inventory intelligence. Continues operating through internet outages.',
    spec: 'POS · WMS · in-store sensors',
  },
  {
    Icon: Train,
    label: 'Transit and logistics',
    body: 'Schedule, routing, and condition monitoring at the depot, vehicle, and waypoint, on the same data plane.',
    spec: 'GPS · CAN · telematics',
  },
  {
    Icon: Stethoscope,
    label: 'Healthcare and field',
    body: 'Clinical and field telemetry processed at the source under HIPAA and regional data residency.',
    spec: 'FHIR · DICOM · HIPAA',
  },
  {
    Icon: Cpu,
    label: 'Embedded systems',
    body: 'Same binary on small footprints. Keep AI and decisioning local where data is generated.',
    spec: 'ARM · x86 · low-power',
  },
]

export default function MonkEdgeContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── HERO — edge-to-cloud topology ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #050D6A 0%, #07091A 60%, #0A2280 100%)',
          paddingTop: 'clamp(120px, 14vw, 200px)',
          paddingBottom: 'clamp(64px, 8vw, 120px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '0%',
            right: '-15%',
            width: '60%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 65%)`,
            filter: 'blur(70px)',
          }}
        />
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
                  color: ACCENT,
                }}
              >
                <Cpu size={13} strokeWidth={2} />
                Products · MonkEdge
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
                Where decisions
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 0%, ${ACCENT} 50%, #ffffff 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: 'edgeSheen 7s ease-in-out infinite',
                    fontWeight: 400,
                  }}
                >
                  happen at the source.
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
                Real-time intelligence and execution, at the edge. Sense,
                decide, act locally, without round trips to the cloud.
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
                MonkEdge extends the MonkDB engine beyond centralized systems.
                Ingestion, AI, and execution operate locally even in
                disconnected environments, then synchronize with central
                deployments on reconnect.
              </p>
            </motion.div>

            {/* Edge-to-cloud topology visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="relative w-full mx-auto"
              style={{ width: '100%', maxWidth: 480, height: 'min(70vw, 480px)', aspectRatio: '1 / 1' }}
            >
              {/* Outer rotating ring (vis container) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed ${ACCENT}44`,
                  animation: 'edgeSpin 32s linear infinite',
                }}
              />
              {/* Inner solid ring */}
              <div
                className="absolute"
                style={{
                  inset: '14%',
                  borderRadius: '50%',
                  border: `1px dashed ${ACCENT}66`,
                  animation: 'edgeSpin 48s linear reverse infinite',
                }}
              />

              {/* Center cloud hub */}
              <div
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                  border: `1px solid ${ACCENT}`,
                  boxShadow: `0 0 60px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Cloud
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
                    color: ACCENT,
                  }}
                >
                  CLOUD
                </span>
              </div>
              <motion.div
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}99`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Edge nodes — 6 around the ring */}
              {[
                { angle: -90, label: 'PLANT', Icon: Factory },
                { angle: -30, label: 'VEHICLE', Icon: Truck },
                { angle: 30, label: 'STORE', Icon: ShoppingBag },
                { angle: 90, label: 'FIELD', Icon: Stethoscope },
                { angle: 150, label: 'TRANSIT', Icon: Train },
                { angle: 210, label: 'IOT', Icon: Cpu },
              ].map((node, i) => {
                const rad = (node.angle * Math.PI) / 180
                const r = 45
                const x = 50 + Math.cos(rad) * r
                const y = 50 + Math.sin(rad) * r
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      heroInView ? { opacity: 1, scale: 1 } : {}
                    }
                    transition={{
                      duration: 0.5,
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
                      className="inline-flex items-center justify-center rounded-full text-white"
                      style={{
                        width: 'clamp(46px, 5vw, 62px)',
                        height: 'clamp(46px, 5vw, 62px)',
                        background: 'rgba(7,9,26,0.85)',
                        border: `1px solid ${ACCENT}88`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <node.Icon size={20} strokeWidth={1.5} />
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
                        color: ACCENT,
                        marginTop: 6,
                      }}
                    >
                      {node.label}
                    </div>
                  </motion.div>
                )
              })}

              {/* Pulses traveling from edge to cloud */}
              {[0, 0.6, 1.2, 1.8].map((d, i) => (
                <motion.span
                  key={`pulse-${i}`}
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ACCENT,
                    boxShadow: `0 0 10px ${ACCENT}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    x: [Math.cos(i * 1.0472) * 110, 0],
                    y: [Math.sin(i * 1.0472) * 110, 0],
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
                    color: ACCENT,
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

      {/* ── 5 capabilities — bento layout ── */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}13 0%, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-12">
            <div>
              <SectionLabel text="Capabilities" />
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 clamp(28px, 3.5vw, 48px) 0',
                  maxWidth: 'clamp(580px, 75vw, 1040px)',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                MonkDB execution,{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  on every node
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
              Same binary, same semantics. Whether the deployment is a
              hyperscaler region, an industrial gateway, or a single embedded
              chip, MonkEdge runs the full execution loop locally.
            </p>
          </div>

          {/* Uniform 3-col card grid — dense, balanced, no bento weirdness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="monkedge-cap card-surface relative rounded-2xl overflow-hidden flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="monkedge-cap-rail absolute top-0 left-0 right-0"
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
                      color: 'var(--text-muted, rgba(10,34,128,0.45))',
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
                  className="dark:bg-[#0A1326]/65"
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

      {/* ── Deployment scenarios — 6-card grid with industry icons ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Where MonkEdge runs" />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(26px, 3.4vw, 46px)',
              fontWeight: 300,
              letterSpacing: '-0.015em',
              lineHeight: 1.12,
              margin: '20px 0 clamp(28px, 3.5vw, 48px) 0',
              maxWidth: 'clamp(420px, 65%, 820px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Six deployment realities,{' '}
            <span style={{ color: ACCENT, fontWeight: 400, display: 'block' }}>
              one execution layer
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SCENARIOS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl card-surface"
                style={{
                  padding: 'clamp(22px, 2.6vw, 30px)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-xl mb-5"
                  style={{
                    width: 44,
                    height: 44,
                    background: `${ACCENT}1A`,
                    border: `1px solid ${ACCENT}55`,
                    color: ACCENT,
                  }}
                >
                  <s.Icon size={20} strokeWidth={1.6} />
                </span>
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
                  {s.label}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: '0 0 16px 0',
                  }}
                >
                  {s.body}
                </p>
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: ACCENT,
                    paddingTop: '12px',
                    borderTop: '1px dashed rgba(10,34,128,0.10)',
                  }}
                >
                  {s.spec}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Edge-to-cloud sync diagram strip ── */}
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
          <SectionLabel text="Sync model" variant="dark" />
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '24px 0 clamp(28px, 3.5vw, 48px) 0',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Edge runs first.{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              Cloud reconciles.
            </span>
          </h2>

          {/* Three-stage flow */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none hidden md:block"
              style={{
                top: 'clamp(28px, 3.6vw, 44px)',
                left: '12%',
                right: '12%',
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${ACCENT}66 15%, ${ACCENT}AA 50%, ${ACCENT}66 85%, transparent 100%)`,
              }}
            />
            {[
              {
                Icon: Activity,
                title: 'Local capture and act',
                body: 'Sensors, events, and decisions happen on the edge node, in single-millisecond budgets.',
              },
              {
                Icon: Wifi,
                title: 'Eventual reconciliation',
                body: 'Edge state syncs to the central engine when connectivity is available, with conflict-aware merging.',
              },
              {
                Icon: Cloud,
                title: 'Global visibility',
                body: 'Central deployments see every edge node’s state. Policy and model updates fan back out.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE }}
                className="relative flex flex-col rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${ACCENT}33`,
                  padding: 'clamp(22px, 2.4vw, 28px)',
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
                        i === 0
                          ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT}CC 100%)`
                          : 'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                      border: `1px solid ${ACCENT}99`,
                      boxShadow: `0 12px 28px ${ACCENT}33`,
                    }}
                  >
                    <step.Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 inline-flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(7,9,26,0.95)',
                      border: `1px solid ${ACCENT}99`,
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
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
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
                "
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
                The plant kept running through a six-hour outage on the cloud
                side. Operators barely noticed because the engine never left
                the floor.
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
                Plant Operations Lead, Forge Steel
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
                    color: ACCENT,
                  }}
                >
                  Edge in numbers
                </span>
              </div>
              <ul
                className="grid grid-cols-1"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {[
                  { v: '6 h', l: 'Outage rode through with no production loss' },
                  { v: '12 K', l: 'Edge nodes in production across customers' },
                  { v: 'Same', l: 'Binary on every deployment target' },
                ].map((m, i) => (
                  <li
                    key={m.l}
                    className="grid grid-cols-[140px_1fr] items-baseline"
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
                        color: ACCENT,
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
                <Plug size={16} strokeWidth={1.6} />
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
                  Edge ready
                </div>
                <div
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  Battle-tested across regulated and remote environments
                </div>
              </div>
            </div>
            <ul
              className="flex flex-wrap gap-2"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {[
                'SOC 2 Type II',
                'ISO 27001',
                'IEC 62443',
                'ISA-95',
                'Air-gapped',
                'ARM + x86',
                'OPC UA',
                'Linux + RTOS',
              ].map((c) => (
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
                    color: '#0A2280',
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

      <CTABanner heading="Run intelligence where the data is born." />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes edgeSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes edgeSheen {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
        :global(.monkedge-cap:hover) {
          border-color: ${ACCENT}55 !important;
          box-shadow: 0 18px 42px ${ACCENT}1A;
          transition:
            transform 360ms ease,
            box-shadow 360ms ease,
            border-color 360ms ease;
        }
        :global(.monkedge-cap:hover .monkedge-cap-rail) {
          transform: scaleX(1);
        }
      `}</style>
    </main>
  )
}
