'use client'

/**
 * SmartXLayout — flexible scaffolding for the 6 MonkSmartX sub-product pages.
 * Each page passes its own bespoke hero, color accent, stats strip, and mid-block,
 * so the rendered pages look genuinely distinct, not templated.
 *
 * Sections (all optional except hero + ctaHeading):
 *   1. Custom hero (split layout): copy column + bespoke illustration ReactNode
 *   2. Vertical-specific stats strip (4 numbers tuned to the industry)
 *   3. Optional architecture / dashboard mockup ReactNode
 *   4. 4-card capability grid (industry-specific bullets)
 *   5. Customer quote panel
 *   6. CTA banner + footer
 */

import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BrainCircuit,
  ChartLine,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Eye,
  FileCheck,
  Filter,
  GaugeCircle,
  HeartPulse,
  Layers,
  LineChart,
  Lock,
  Map as MapIcon,
  PieChart,
  Plug,
  Radio,
  RefreshCw,
  Repeat,
  Route,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShoppingBag,
  Sliders,
  Sparkles,
  Tag,
  Target,
  ThermometerSun,
  Timer,
  TrendingUp,
  Truck,
  Wand2,
  Wifi,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import CTABanner from './CTABanner'
import SectionLabel from './SectionLabel'
import ScrollToTop from './ScrollToTop'
import ScrollProgressBar from './ScrollProgressBar'

const EASE = [0.165, 0.84, 0.44, 1] as const

const ICON_MAP: Record<string, LucideIcon> = {
  activity: Activity,
  'alert-triangle': AlertTriangle,
  'badge-check': BadgeCheck,
  'brain-circuit': BrainCircuit,
  'chart-line': ChartLine,
  'check-circle': CheckCircle2,
  cloud: Cloud,
  cpu: Cpu,
  database: Database,
  eye: Eye,
  'file-check': FileCheck,
  filter: Filter,
  gauge: GaugeCircle,
  'heart-pulse': HeartPulse,
  layers: Layers,
  'line-chart': LineChart,
  lock: Lock,
  map: MapIcon,
  'pie-chart': PieChart,
  plug: Plug,
  radio: Radio,
  'refresh-cw': RefreshCw,
  repeat: Repeat,
  route: Route,
  search: Search,
  shield: Shield,
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  'shopping-bag': ShoppingBag,
  sliders: Sliders,
  sparkles: Sparkles,
  tag: Tag,
  target: Target,
  'thermometer-sun': ThermometerSun,
  timer: Timer,
  'trending-up': TrendingUp,
  truck: Truck,
  'wand-2': Wand2,
  wifi: Wifi,
  workflow: Workflow,
  wrench: Wrench,
  zap: Zap,
}

export type SmartXStat = { value: string; label: string }
/**
 * Capability cards now carry an industry-specific icon and a concrete spec
 * chip in addition to the title + body. The icon lookup happens by string key
 * here so server → client serialization stays clean.
 */
export type SmartXCapability = {
  /** Lucide icon key from ICON_MAP — e.g. "shield-check", "wand-2" */
  iconName: string
  title: string
  body: string
  /** Concrete spec / vendor-tech keyword shown as a footer chip */
  chip: string
}

export type SmartXFlowStep = {
  iconName: string
  title: string
  body: string
}

export type SmartXProofMetric = {
  value: string
  label: string
}

export type SmartXIntegration = {
  /** Group label, e.g. "Streaming", "Storage", "Analytics" */
  group: string
  tools: string[]
}

export type SmartXLayoutProps = {
  /** Brand crumb shown above the hero title */
  crumb: string
  /** Page title */
  title: string
  /** Crisp-line / subtitle */
  subtitle: string
  /** Lead paragraph rendered next to the hero illustration */
  lead: string
  /** Bespoke hero illustration (right column) — pass any ReactNode */
  heroIllustration: ReactNode
  /** Hex accent that drives the per-industry chrome (e.g., copper for Mining) */
  accent: string
  /** Optional accent label shown above the hero title */
  industryLabel: string
  /** 4-stat strip on dark background under the hero */
  stats: SmartXStat[]
  /** Optional bespoke mid-block (dashboard, terminal, comparison table) */
  midBlock?: { label: string; title: string; body: ReactNode }
  /** 4 capability cards rendered in a grid */
  capabilities: SmartXCapability[]
  /** Optional 4-step "How it works in production" flow */
  flow?: SmartXFlowStep[]
  /** Optional ecosystem integrations grouped by category */
  integrations?: SmartXIntegration[]
  /** Optional metrics rendered adjacent to the customer quote */
  proofMetrics?: SmartXProofMetric[]
  /** Optional compliance / trust badges shown before the CTA */
  certifications?: string[]
  /** Customer quote */
  quote: { text: string; role: string; org: string }
  /** Primary CTA heading */
  ctaHeading: string
}

export default function SmartXLayout(props: SmartXLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const accentSoft = `${props.accent}1A` // ~10% opacity hex
  const accentBg = `${props.accent}14`

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero — split layout, copy left, bespoke illustration right ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
          paddingTop: 'clamp(120px, 14vw, 180px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
      >
        {/* dot grid backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(127,179,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        {/* accent halo */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '20%',
            right: '-20%',
            width: '60%',
            height: '60%',
            background: `radial-gradient(circle, ${props.accent}55 0%, transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* crumb */}
              <span
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7FB3FF',
                  marginBottom: '20px',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: props.accent,
                    boxShadow: `0 0 8px ${props.accent}`,
                  }}
                />
                {props.crumb}
              </span>
              {/* industry tag */}
              <div
                className="inline-flex items-center mb-5"
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: accentSoft,
                  border: `1px solid ${props.accent}40`,
                  color: props.accent,
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {props.industryLabel}
              </div>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(40px, 6vw, 88px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.04,
                  margin: '0 0 18px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {props.title}
              </h1>
              {/* accent rule */}
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  width: '64px',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, ${props.accent} 0%, #1E8AFF 100%)`,
                  marginBottom: '24px',
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  margin: '0 0 18px 0',
                  textWrap: 'balance',
                  letterSpacing: '-0.005em',
                }}
              >
                {props.subtitle}
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
                {props.lead}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="relative"
            >
              {props.heroIllustration}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats strip (dark band, accent-coloured numbers) ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#07091A',
          borderTop: `1px solid ${props.accent}30`,
          borderBottom: '1px solid rgba(127,179,255,0.10)',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {props.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: props.accent,
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
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

      {/* ── Optional production flow — 4-step "How it works" ── */}
      {props.flow && props.flow.length > 0 && (
        <section
          className="relative overflow-hidden py-12 sm:py-20 lg:py-24"
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
              opacity: 0.5,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: '-10%',
              right: '-10%',
              width: '50%',
              height: '60%',
              background: `radial-gradient(circle, ${props.accent}33 0%, transparent 65%)`,
              filter: 'blur(60px)',
            }}
          />

          <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="How it works" variant="dark" />
            <h2
              className="text-white mt-6 sm:mt-10 lg:mt-12 mb-12 sm:mb-16"
              style={{
                fontSize: 'clamp(28px, 4vw, 56px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                margin: '40px 0 0 0',
                textWrap: 'balance',
                textDecoration: 'none',
              }}
            >
              The production loop, end to end
            </h2>

            {/* Desktop horizontal flow */}
            <div className="relative hidden md:grid md:grid-cols-4 gap-3 lg:gap-4">
              {/* connecting line */}
              <div
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  top: 'clamp(28px, 3.6vw, 44px)',
                  left: '12%',
                  right: '12%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent 0%, ${props.accent}66 15%, ${props.accent}AA 50%, ${props.accent}66 85%, transparent 100%)`,
                }}
              />
              {props.flow.map((step, i) => {
                const Icon = ICON_MAP[step.iconName] ?? CheckCircle2
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + i * 0.1,
                      ease: EASE,
                    }}
                    className="relative flex flex-col"
                  >
                    {/* Node circle */}
                    <div
                      className="relative inline-flex items-center justify-center rounded-full text-white mb-5"
                      style={{
                        width: 'clamp(56px, 6.5vw, 80px)',
                        height: 'clamp(56px, 6.5vw, 80px)',
                        background:
                          i === 0
                            ? `linear-gradient(135deg, ${props.accent} 0%, ${props.accent}CC 100%)`
                            : 'rgba(255,255,255,0.04)',
                        border:
                          i === 0
                            ? `1px solid ${props.accent}99`
                            : '1px solid rgba(127,179,255,0.20)',
                        backdropFilter: 'blur(8px)',
                        boxShadow:
                          i === 0
                            ? `0 14px 36px ${props.accent}55`
                            : '0 8px 22px rgba(0,0,0,0.25)',
                      }}
                    >
                      <Icon size={22} strokeWidth={1.6} />
                      {/* Step counter chip */}
                      <span
                        className="absolute -top-2 -right-2 inline-flex items-center justify-center"
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(7,9,26,0.95)',
                          border: `1px solid ${props.accent}88`,
                          color: props.accent,
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
                        fontSize: 'clamp(15px, 1.3vw, 19px)',
                        fontWeight: 500,
                        lineHeight: 1.25,
                        letterSpacing: '-0.005em',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: '260px',
                      }}
                    >
                      {step.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile vertical flow */}
            <div className="md:hidden flex flex-col gap-3">
              {props.flow.map((step, i) => {
                const Icon = ICON_MAP[step.iconName] ?? CheckCircle2
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.08,
                      ease: EASE,
                    }}
                    className="flex items-start gap-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(127,179,255,0.14)',
                      padding: '16px',
                    }}
                  >
                    <div
                      className="flex-shrink-0 inline-flex items-center justify-center rounded-full text-white"
                      style={{
                        width: 50,
                        height: 50,
                        background:
                          i === 0
                            ? `linear-gradient(135deg, ${props.accent} 0%, ${props.accent}CC 100%)`
                            : 'rgba(255,255,255,0.06)',
                        border:
                          i === 0
                            ? `1px solid ${props.accent}99`
                            : '1px solid rgba(127,179,255,0.20)',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3
                        className="text-white"
                        style={{
                          fontSize: '15px',
                          fontWeight: 500,
                          lineHeight: 1.25,
                          margin: 0,
                        }}
                      >
                        <span
                          style={{
                            color: props.accent,
                            marginRight: '8px',
                            fontFamily:
                              'var(--font-mono, ui-monospace, monospace)',
                            fontSize: '11.5px',
                          }}
                        >
                          0{i + 1}
                        </span>
                        {step.title}
                      </h3>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: 1.55,
                          margin: '4px 0 0 0',
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Optional bespoke mid-block (passed by the page) ── */}
      {props.midBlock && (
        <section className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text={props.midBlock.label} />
            <h2
              className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-8 sm:mb-10"
              style={{
                fontSize: 'clamp(26px, 3.6vw, 48px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '40px 0 0 0',
                textWrap: 'balance',
                textDecoration: 'none',
              }}
            >
              {props.midBlock.title}
            </h2>
            <div className="mt-8">{props.midBlock.body}</div>
          </div>
        </section>
      )}

      {/* ── Capabilities — enterprise-grade structured cards ── */}
      <section
        className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24 relative overflow-hidden"
      >
        {/* Subtle accent glow in the corner */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '60%',
            background: `radial-gradient(circle, ${props.accent}15 0%, transparent 60%)`,
            filter: 'blur(40px)',
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-10 sm:mb-14">
            <div>
              <SectionLabel text="Capabilities" />
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
                What you get{' '}
                <span style={{ color: props.accent, fontWeight: 400 }}>
                  on day one
                </span>
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 self-end"
              style={{
                fontSize: 'clamp(14px, 1.15vw, 17px)',
                fontWeight: 400,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Production-grade primitives, wired into a continuous engine. No
              glue code, no second-system integration, no batch wait.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {props.capabilities.map((c, i) => {
              const Icon =
                ICON_MAP[c.iconName] ?? ICON_MAP['check-circle']
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: EASE,
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  className="smartx-cap relative rounded-2xl flex flex-col overflow-hidden"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                  }}
                >
                  {/* Hover top accent rail */}
                  <span
                    aria-hidden="true"
                    className="smartx-cap-rail absolute top-0 left-0 right-0"
                    style={{
                      height: '2px',
                      background: `linear-gradient(90deg, ${props.accent} 0%, ${props.accent}55 60%, transparent 100%)`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 380ms ease',
                    }}
                  />

                  {/* Header — icon + index */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding:
                        'clamp(18px, 2vw, 24px) clamp(22px, 2.4vw, 28px)',
                      borderBottom: '1px solid rgba(10,34,128,0.08)',
                      background: `linear-gradient(180deg, ${accentBg} 0%, transparent 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-flex items-center justify-center rounded-xl flex-shrink-0"
                        style={{
                          width: 'clamp(40px, 4vw, 48px)',
                          height: 'clamp(40px, 4vw, 48px)',
                          background: `${props.accent}1A`,
                          border: `1px solid ${props.accent}55`,
                          color: props.accent,
                        }}
                      >
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      <span
                        style={{
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.16em',
                          color: 'rgba(10,34,128,0.45)',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')} / 0
                        {props.capabilities.length}
                      </span>
                    </div>
                  </div>

                  {/* Body — title + description */}
                  <div
                    className="flex-1"
                    style={{
                      padding:
                        'clamp(20px, 2.2vw, 26px) clamp(22px, 2.4vw, 28px)',
                    }}
                  >
                    <h3
                      className="text-[#0A2280] dark:text-white"
                      style={{
                        fontSize: 'clamp(17px, 1.5vw, 22px)',
                        fontWeight: 500,
                        letterSpacing: '-0.012em',
                        lineHeight: 1.25,
                        margin: '0 0 10px 0',
                      }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400"
                      style={{
                        fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {c.body}
                    </p>
                  </div>

                  {/* Footer — concrete spec chip */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding:
                        'clamp(14px, 1.6vw, 18px) clamp(22px, 2.4vw, 28px)',
                      borderTop: '1px dashed rgba(10,34,128,0.10)',
                      background: '#FAFBFD',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        borderRadius: '5px',
                        background: 'white',
                        border: `1px solid ${props.accent}40`,
                        color: props.accent,
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: props.accent,
                        }}
                      />
                      {c.chip}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(10,34,128,0.4)',
                      }}
                    >
                      Native
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        :global(.smartx-cap:hover) {
          border-color: rgba(26, 56, 232, 0.25) !important;
          box-shadow: 0 18px 42px rgba(10, 34, 128, 0.08);
          transition:
            transform 360ms ease,
            box-shadow 360ms ease,
            border-color 360ms ease;
        }
        :global(.smartx-cap:hover .smartx-cap-rail) {
          transform: scaleX(1);
        }
      `}</style>

      {/* ── Optional ecosystem integrations strip ── */}
      {props.integrations && props.integrations.length > 0 && (
        <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-6 sm:gap-10 lg:gap-16 items-start">
              <div>
                <SectionLabel text="Ecosystem" />
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
                  Plugs into the tools{' '}
                  <span
                    style={{ color: props.accent, fontWeight: 400 }}
                  >
                    you already run
                  </span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 sm:gap-5">
                {props.integrations.map((g, gi) => (
                  <motion.div
                    key={g.group}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.45,
                      delay: gi * 0.06,
                      ease: EASE,
                    }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
                  >
                    <div
                      className="flex-shrink-0"
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: props.accent,
                        minWidth: '110px',
                      }}
                    >
                      {g.group}
                    </div>
                    <ul
                      className="flex flex-wrap gap-2"
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {g.tools.map((tool) => (
                        <li
                          key={tool}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '7px 14px',
                            borderRadius: '8px',
                            background: 'white',
                            border: '1px solid rgba(10,34,128,0.10)',
                            color: '#0A2280',
                            fontFamily:
                              'var(--font-mono, ui-monospace, monospace)',
                            fontSize: '12px',
                            fontWeight: 500,
                            letterSpacing: '0.005em',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Customer proof — quote + metrics box ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-28">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="In production" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-12 lg:gap-16 items-start mt-6 sm:mt-10 lg:mt-12">
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
                  color: `${props.accent}30`,
                  fontFamily: 'serif',
                }}
              >
                “
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
                {props.quote.text}
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
                    background: props.accent,
                  }}
                />
                {props.quote.role}, {props.quote.org}
              </figcaption>
            </motion.figure>

            {props.proofMetrics && props.proofMetrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    'linear-gradient(160deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
                  border: `1px solid ${props.accent}55`,
                  boxShadow: `0 20px 50px ${props.accent}22`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-[10%] right-[10%]"
                  style={{
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                />
                <div
                  style={{
                    padding:
                      'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 32px)',
                    borderBottom: `1px solid ${props.accent}33`,
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
                      color: props.accent,
                    }}
                  >
                    Year-one impact
                  </span>
                </div>
                <ul
                  className="grid grid-cols-1"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {props.proofMetrics.map((m, i) => (
                    <li
                      key={m.label}
                      className="grid grid-cols-[140px_1fr] items-baseline"
                      style={{
                        padding:
                          'clamp(18px, 2.2vw, 26px) clamp(22px, 2.6vw, 32px)',
                        borderBottom:
                          i < props.proofMetrics!.length - 1
                            ? `1px solid ${props.accent}22`
                            : 'none',
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
                          color: props.accent,
                        }}
                      >
                        {m.value}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                          fontWeight: 400,
                          lineHeight: 1.45,
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {m.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Optional compliance / trust strip ── */}
      {props.certifications && props.certifications.length > 0 && (
        <section
          className="relative overflow-hidden py-10 sm:py-14"
          style={{
            background: '#F8F4F0',
            borderTop: '1px solid rgba(10,34,128,0.10)',
            borderBottom: '1px solid rgba(10,34,128,0.10)',
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
                    background: `${props.accent}1A`,
                    border: `1px solid ${props.accent}55`,
                    color: props.accent,
                  }}
                >
                  <ShieldCheck size={16} strokeWidth={1.6} />
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
                      color: props.accent,
                    }}
                  >
                    Trust
                  </div>
                  <div
                    className="text-[#0A2280]"
                    style={{
                      fontSize: 'clamp(15px, 1.3vw, 18px)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    Built for regulated, sovereign deployments
                  </div>
                </div>
              </div>
              <ul
                className="flex flex-wrap gap-2"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {props.certifications.map((cert) => (
                  <li
                    key={cert}
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <CheckCircle2
                      size={12}
                      strokeWidth={2.2}
                      style={{ color: props.accent }}
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <CTABanner heading={props.ctaHeading} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
