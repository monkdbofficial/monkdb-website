'use client'

/**
 * CoreSystemContent — bespoke detail page for the 6 Core Systems.
 * Each system gets a distinct visual identity: accent color, hero motif,
 * and mid-block. Content is read from `content/coreSystems.ts` (sourced
 * from Website content part II.docx).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Database,
  Activity,
  Brain,
  Zap,
  Network,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import type { CoreSystem } from '@/content/coreSystems'

const EASE = [0.165, 0.84, 0.44, 1] as const

type ThemeKey =
  | 'unified-operational-engine'
  | 'real-time-processing-engine'
  | 'ai-native-execution-engine'
  | 'decision-action-engine'
  | 'edge-to-cloud-fabric'
  | 'sovereignty-trust-layer'

type Theme = {
  index: string
  accent: string
  accentSoft: string
  Icon: LucideIcon
  heroGradient: string
  heroNumber: string
  motif: 'convergence' | 'wave' | 'neural' | 'loop' | 'mesh' | 'vault'
}

const THEMES: Record<ThemeKey, Theme> = {
  'unified-operational-engine': {
    index: '01',
    accent: '#1A38E8',
    accentSoft: '#7FB3FF',
    Icon: Database,
    heroGradient:
      'linear-gradient(160deg, #050D6A 0%, #0A2280 55%, #0f1623 100%)',
    heroNumber: 'I',
    motif: 'convergence',
  },
  'real-time-processing-engine': {
    index: '02',
    accent: '#0EA5E9',
    accentSoft: '#7DD3FC',
    Icon: Activity,
    heroGradient:
      'linear-gradient(160deg, #042F36 0%, #0C4A6E 55%, #0f1623 100%)',
    heroNumber: 'II',
    motif: 'wave',
  },
  'ai-native-execution-engine': {
    index: '03',
    accent: '#8B5CF6',
    accentSoft: '#C4B5FD',
    Icon: Brain,
    heroGradient:
      'linear-gradient(160deg, #2A1065 0%, #4C1D95 55%, #0f1623 100%)',
    heroNumber: 'III',
    motif: 'neural',
  },
  'decision-action-engine': {
    index: '04',
    accent: '#F97316',
    accentSoft: '#FDBA74',
    Icon: Zap,
    heroGradient:
      'linear-gradient(160deg, #431407 0%, #7C2D12 55%, #0f1623 100%)',
    heroNumber: 'IV',
    motif: 'loop',
  },
  'edge-to-cloud-fabric': {
    index: '05',
    accent: '#14B8A6',
    accentSoft: '#5EEAD4',
    Icon: Network,
    heroGradient:
      'linear-gradient(160deg, #042F2E 0%, #115E59 55%, #0f1623 100%)',
    heroNumber: 'V',
    motif: 'mesh',
  },
  'sovereignty-trust-layer': {
    index: '06',
    accent: '#D4A574',
    accentSoft: '#F2E5D0',
    Icon: ShieldCheck,
    heroGradient:
      'linear-gradient(160deg, #2D1B0A 0%, #5A3A1A 55%, #1A0F08 100%)',
    heroNumber: 'VI',
    motif: 'vault',
  },
}

/* ── Per-motif hero visualization ─────────────────────────────────────── */

function HeroMotif({ theme }: { theme: Theme }) {
  const { motif, accent, accentSoft } = theme
  if (motif === 'convergence')
    return <ConvergenceMotif accent={accent} soft={accentSoft} />
  if (motif === 'wave') return <WaveMotif accent={accent} soft={accentSoft} />
  if (motif === 'neural')
    return <NeuralMotif accent={accent} soft={accentSoft} />
  if (motif === 'loop') return <LoopMotif accent={accent} soft={accentSoft} />
  if (motif === 'mesh') return <MeshMotif accent={accent} soft={accentSoft} />
  return <VaultMotif accent={accent} soft={accentSoft} />
}

function ConvergenceMotif({ accent, soft }: { accent: string; soft: string }) {
  /* 5 stream lines collapsing into a single core node */
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px dashed ${soft}33`,
          animation: 'csSpin 38s linear infinite',
        }}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = -90 + i * 30 - 60
        return (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: 220,
              height: 1,
              background: `linear-gradient(90deg, ${soft}55 0%, ${accent} 70%, transparent 100%)`,
              transform: `translate(-100%, -50%) rotate(${angle}deg)`,
              transformOrigin: 'right center',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0.4], scaleX: [0, 1, 1] }}
            transition={{
              duration: 3.2,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )
      })}
      <div
        className="absolute"
        style={{
          inset: '36%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent} 0%, #0A2280 100%)`,
          border: `1px solid ${soft}`,
          boxShadow: `0 0 80px ${accent}66, inset 0 1px 0 rgba(255,255,255,0.18)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Database size={26} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: soft,
            marginTop: 4,
          }}
        >
          ONE
        </span>
      </div>
    </div>
  )
}

function WaveMotif({ accent, soft }: { accent: string; soft: string }) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M 20 ${200 - i * 6} Q 110 ${140 - i * 8}, 200 ${200 - i * 6} T 380 ${200 - i * 6}`}
            stroke={i === 0 ? accent : `${soft}55`}
            strokeWidth={i === 0 ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: i * 0.18, ease: EASE }}
          />
        ))}
        {[0, 0.7, 1.4, 2.1].map((d, i) => (
          <motion.circle
            key={i}
            r="5"
            fill={accent}
            initial={{ opacity: 0 }}
            animate={{
              cx: [20, 380],
              cy: [200, 200],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.4, delay: d, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '6%',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: soft,
        }}
      >
        STREAM · CONTINUOUS
      </div>
    </div>
  )
}

function NeuralMotif({ accent, soft }: { accent: string; soft: string }) {
  /* Neural mesh: nodes connected to a central engine */
  const nodes = [
    { x: 18, y: 30 },
    { x: 82, y: 28 },
    { x: 16, y: 70 },
    { x: 84, y: 72 },
    { x: 14, y: 50 },
    { x: 86, y: 50 },
  ]
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2="50"
            y2="50"
            stroke={`${soft}66`}
            strokeWidth="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: i * 0.1 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r="1.6"
            fill={accent}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2.4,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          inset: '36%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent} 0%, #2A1065 100%)`,
          border: `1px solid ${soft}`,
          boxShadow: `0 0 70px ${accent}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Brain size={26} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: soft,
            marginTop: 4,
          }}
        >
          AI · IN-ENGINE
        </span>
      </div>
    </div>
  )
}

function LoopMotif({ accent, soft }: { accent: string; soft: string }) {
  /* Closed loop: SENSE → DECIDE → ACT */
  const stages = [
    { angle: -90, label: 'SENSE' },
    { angle: 30, label: 'DECIDE' },
    { angle: 150, label: 'ACT' },
  ]
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          inset: '12%',
          borderRadius: '50%',
          border: `1px dashed ${soft}55`,
          animation: 'csSpin 30s linear infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          inset: '22%',
          borderRadius: '50%',
          border: `1px solid ${accent}66`,
        }}
      />
      {stages.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180
        const r = 38
        const x = 50 + Math.cos(rad) * r
        const y = 50 + Math.sin(rad) * r
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: accent,
              background: 'rgba(7,9,26,0.85)',
              border: `1px solid ${accent}99`,
              borderRadius: 8,
              padding: '6px 12px',
              backdropFilter: 'blur(8px)',
            }}
          >
            {s.label}
          </motion.div>
        )
      })}
      <div
        className="absolute"
        style={{
          inset: '36%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent} 0%, #7C2D12 100%)`,
          border: `1px solid ${soft}`,
          boxShadow: `0 0 70px ${accent}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Zap size={26} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: soft,
            marginTop: 4,
          }}
        >
          LOOP · CLOSED
        </span>
      </div>
    </div>
  )
}

function MeshMotif({ accent, soft }: { accent: string; soft: string }) {
  /* Distributed mesh — edge nodes connected to cloud */
  const nodes = [
    { x: 15, y: 25, label: 'EDGE' },
    { x: 75, y: 18, label: 'EDGE' },
    { x: 22, y: 78, label: 'EDGE' },
    { x: 80, y: 78, label: 'EDGE' },
  ]
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2="50"
            y2="50"
            stroke={`${soft}88`}
            strokeWidth="0.3"
            strokeDasharray="2 1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: i * 0.1 }}
          />
        ))}
        {/* connect edges to each other */}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length]
          return (
            <motion.line
              key={`x-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke={`${soft}33`}
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.5 + i * 0.1 }}
            />
          )
        })}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          className="absolute"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'rgba(7,9,26,0.85)',
            border: `1px solid ${accent}99`,
            borderRadius: 10,
            padding: '6px 10px',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: soft,
            backdropFilter: 'blur(8px)',
          }}
        >
          {n.label}
        </motion.div>
      ))}
      <div
        className="absolute"
        style={{
          inset: '38%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent} 0%, #115E59 100%)`,
          border: `1px solid ${soft}`,
          boxShadow: `0 0 60px ${accent}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Network size={24} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: soft,
            marginTop: 4,
          }}
        >
          CLOUD
        </span>
      </div>
    </div>
  )
}

function VaultMotif({ accent, soft }: { accent: string; soft: string }) {
  /* Hexagonal vault with shield */
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {[42, 36, 30].map((r, i) => (
          <motion.polygon
            key={i}
            points={Array.from({ length: 6 }, (_, j) => {
              const a = ((j * 60 - 90) * Math.PI) / 180
              return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`
            }).join(' ')}
            stroke={`${soft}${i === 0 ? '99' : '55'}`}
            strokeWidth={i === 0 ? '0.6' : '0.3'}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          inset: '36%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent} 0%, #5A3A1A 100%)`,
          border: `1px solid ${soft}`,
          boxShadow: `0 0 70px ${accent}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <ShieldCheck size={26} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: soft,
            marginTop: 4,
          }}
        >
          TRUST · SEALED
        </span>
      </div>
    </div>
  )
}

/* ── Main bespoke Core System page ───────────────────────────────────── */

export default function CoreSystemContent({
  item,
  related,
}: {
  item: CoreSystem
  related: { title: string; body: string; href: string }[]
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const theme = THEMES[item.slug as ThemeKey] ?? THEMES['unified-operational-engine']

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: theme.heroGradient,
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
            background: `radial-gradient(circle, ${theme.accent}3D 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${theme.accentSoft}1A 1px, transparent 1px)`,
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
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: theme.accentSoft,
                }}
              >
                <theme.Icon size={13} strokeWidth={2} />
                Core System · {theme.index}
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(36px, 5.6vw, 84px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  margin: '0 0 24px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {item.title}
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: 2,
                  width: 64,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${theme.accentSoft} 0%, ${theme.accent} 100%)`,
                  marginBottom: 28,
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 16px 0',
                  maxWidth: 560,
                }}
              >
                {item.subtitle}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 540,
                }}
              >
                {item.overview}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <HeroMotif theme={theme} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why this matters (light) ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel text="Why this matters" />
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
                {item.headline}
              </h2>
            </div>
            <div className="lg:pt-8">
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  lineHeight: 1.7,
                  margin: 0,
                  marginBottom: 24,
                }}
              >
                {item.introBody}
              </p>
              <div
                className="inline-flex items-center gap-3 rounded-xl"
                style={{
                  padding: 'clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 22px)',
                  background: `${theme.accent}10`,
                  border: `1px solid ${theme.accent}33`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${theme.accent}1A`,
                    border: `1px solid ${theme.accent}55`,
                    color: theme.accent,
                  }}
                >
                  <theme.Icon size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: theme.accent,
                      marginBottom: 2,
                    }}
                  >
                    {item.introTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities (parchment, dense uniform cards) ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="What you get" />
          <h2
            className="text-gray-900 dark:text-white mt-6 mb-10 sm:mb-12"
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
            Inside the{' '}
            <span style={{ color: theme.accent, fontWeight: 400 }}>
              {item.title.toLowerCase()}
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {item.capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                }}
              >
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
                      background: `${theme.accent}1A`,
                      border: `1px solid ${theme.accent}55`,
                      color: theme.accent,
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.45)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / 0{item.capabilities.length}
                  </span>
                </div>
                <div
                  style={{
                    padding:
                      'clamp(14px, 1.4vw, 18px) clamp(20px, 2vw, 24px) clamp(18px, 1.8vw, 22px)',
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Core Systems (related) ── */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="Other core systems" />
            <h2
              className="text-gray-900 dark:text-white mt-6 mb-10 sm:mb-12"
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '24px 0 0 0',
                textDecoration: 'none',
              }}
            >
              Five more systems,{' '}
              <span style={{ color: theme.accent, fontWeight: 400 }}>
                one continuous architecture
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {related.map((r, i) => (
                <motion.a
                  key={r.title}
                  href={r.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="cs-related group block rounded-2xl"
                  style={{
                    background: 'white',
                    border: '1px solid rgba(10,34,128,0.10)',
                    padding: 'clamp(20px, 2.2vw, 26px)',
                    textDecoration: 'none',
                    transition:
                      'border-color 350ms ease, box-shadow 350ms ease, transform 350ms ease',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-2"
                      style={{
                        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: theme.accent,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: theme.accent,
                        }}
                      />
                      Core System
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.6}
                      className="cs-related-arrow"
                      style={{ color: theme.accent }}
                    />
                  </div>
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(17px, 1.5vw, 22px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {r.body}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner heading={item.ctaHeading} />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes csSpin {
          to {
            transform: rotate(360deg);
          }
        }
        :global(.cs-related:hover) {
          border-color: ${theme.accent}55 !important;
          box-shadow: 0 18px 42px ${theme.accent}1A;
          transform: translateY(-3px);
        }
        :global(.cs-related:hover .cs-related-arrow) {
          transform: translateX(4px);
          transition: transform 280ms ease;
        }
      `}</style>
    </main>
  )
}
