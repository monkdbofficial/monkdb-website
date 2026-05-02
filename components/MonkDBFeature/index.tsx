'use client'

/**
 * MonkDBFeature — light-theme enterprise architecture diagram.
 * Inputs → PG Wire/SDK → MonkDB multi-model engine → outputs.
 * Uses actual /logo.png wordmark, clean white boxes, subtle accents.
 */

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useTheme } from '@/app/theme'
import {
  Brain,
  Zap,
  Clock,
  FileJson,
  MapPin,
  Search,
  Package,
  Smartphone,
  Cpu,
  Activity,
  TrendingUp,
  Bot,
  Sparkles,
  CircuitBoard,
  KeyRound,
  Share2,
  MemoryStick,
  type LucideIcon,
} from 'lucide-react'
import ConnectionLines from './ConnectionLines'

type Tile = { name: string; Icon: LucideIcon; tint: string }

const featuresData: Tile[] = [
  { name: 'Vector',           Icon: Brain,       tint: '#7C3AED' },
  { name: 'Streaming SQL',    Icon: Zap,         tint: '#CA8A04' },
  { name: 'Timeseries',       Icon: Clock,       tint: '#1A38E8' },
  { name: 'Document/JSON',    Icon: FileJson,    tint: '#059669' },
  { name: 'Geospatial',       Icon: MapPin,      tint: '#DC2626' },
  { name: 'Full Text Search', Icon: Search,      tint: '#4F46E5' },
  { name: 'Key-Value',        Icon: KeyRound,    tint: '#0891B2' },
  { name: 'Graph',            Icon: Share2,      tint: '#BE185D' },
  { name: 'In-Memory',        Icon: MemoryStick, tint: '#475569' },
  { name: 'Blob Store',       Icon: Package,     tint: '#EA580C' },
]

const inputSources: Tile[] = [
  { name: 'Apps',       Icon: Smartphone, tint: '#1A38E8' },
  { name: 'IoT & Edge', Icon: Cpu,        tint: '#059669' },
  { name: 'Streams',    Icon: Activity,   tint: '#7C3AED' },
]

const outputDestinations: Tile[] = [
  { name: 'Analytics', Icon: TrendingUp, tint: '#047857' },
  { name: 'Search',    Icon: Search,     tint: '#4F46E5' },
  { name: 'AI Apps',   Icon: Bot,        tint: '#DB2777' },
  { name: '& more',    Icon: Sparkles,   tint: '#CA8A04' },
]

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.08,
    },
  },
}

// ── Hex → rgba helper (keep tint intensity consistent) ──────────────
function rgba(hex: string, a: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

// ── Mobile fan connectors: SVG lines between stacked blocks ──────────
// `topX` / `bottomX` are percentages (0–100) of the container width.
function MobileConnector({
  topX,
  bottomX,
}: {
  topX: number[]
  bottomX: number[]
}) {
  // Every top point connects to every bottom point (typical fan pattern
  // is n→1 or 1→n).
  const lines: { x1: number; x2: number }[] = []
  topX.forEach((t) => {
    bottomX.forEach((b) => {
      lines.push({ x1: t, x2: b })
    })
  })

  return (
    <motion.svg
      aria-hidden="true"
      className="w-full"
      height="36"
      preserveAspectRatio="none"
      viewBox="0 0 100 36"
      style={{ display: 'block', marginTop: '6px', marginBottom: '6px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={0}
          x2={l.x2}
          y2={36}
          stroke="rgba(26,56,232,0.45)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* Endpoint dots */}
      {bottomX.map((b) => (
        <circle
          key={`b-${b}`}
          cx={b}
          cy={36}
          r="1.4"
          fill="#1A38E8"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  )
}

// ── Clean enterprise-style card with tinted icon badge ───────────────
function Card({
  Icon,
  name,
  tint,
  size = 'md',
  className = '',
}: {
  Icon: LucideIcon
  name: string
  tint: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const pad = size === 'sm' ? 'py-3 px-3' : 'py-4 px-3.5'
  const badgeSize = size === 'sm' ? 28 : 34
  const iconSize = size === 'sm' ? 15 : 18
  const fontSize = size === 'sm' ? '11.5px' : '12.5px'
  const radius = size === 'sm' ? 8 : 10

  return (
    <div
      className={`relative rounded-xl ${pad} text-center group ${className}`}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(10,34,128,0.08)',
        boxShadow:
          '0 1px 2px rgba(10,20,80,0.04), 0 4px 12px rgba(10,20,80,0.04)',
        transition: 'all 220ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      }}
    >
      <div className="flex flex-col items-center gap-2.5">
        {/* Tinted icon badge */}
        <span
          className="flex items-center justify-center"
          style={{
            width: badgeSize,
            height: badgeSize,
            borderRadius: radius,
            background: `linear-gradient(180deg, ${rgba(tint, 0.14)} 0%, ${rgba(tint, 0.07)} 100%)`,
            border: `1px solid ${rgba(tint, 0.22)}`,
            color: tint,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px ${rgba(tint, 0.14)}`,
          }}
        >
          <Icon size={iconSize} strokeWidth={2} />
        </span>
        <h4
          style={{
            fontSize,
            fontWeight: 600,
            color: '#1F2937',
            letterSpacing: '-0.005em',
            lineHeight: 1.25,
          }}
        >
          {name}
        </h4>
      </div>
    </div>
  )
}

export default function MonkDBFeature() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          controls.start('visible')
          setTimeout(() => setAnimationComplete(true), 500)
        }
      },
      { threshold: 0.1 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative"
    >
      <div className="flow-diagram relative min-h-[420px]">
        <ConnectionLines
          currentMode={theme === 'dark' ? 'dark' : 'light'}
          animationComplete={animationComplete}
        />

        {/* ── Desktop ─────────────────────────────────────────── */}
        <div className="hidden md:flex md:min-h-[420px] md:items-center md:justify-between md:gap-3 lg:gap-5">
          {/* Inputs */}
          <div className="flex w-[20%] flex-col space-y-3">
            {inputSources.map((source, i) => (
              <motion.div
                key={source.name}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className={`input-item transition-all duration-300 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-20 opacity-0'
                }`}
                style={{ transitionDelay: `${150 * i}ms` }}
              >
                <Card
                  Icon={source.Icon}
                  name={source.name}
                  tint={source.tint}
                  size="md"
                />
              </motion.div>
            ))}
          </div>

          {/* PG Wire */}
          <motion.div
            variants={itemVariants}
            className={`relative flex w-[13%] items-center justify-center transition-all duration-300 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <Card
              Icon={CircuitBoard}
              name="PG Wire/SDK"
              tint="#1A38E8"
              size="md"
              className="connector-item"
            />
          </motion.div>

          {/* MonkDB */}
          <motion.div
            variants={itemVariants}
            className={`relative w-[37%] transition-all duration-300 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <div
              className="database-item relative rounded-2xl p-5 lg:p-6"
              style={{
                background: '#F8F4F0',
                border: '1px solid rgba(10,34,128,0.10)',
                boxShadow:
                  '0 2px 4px rgba(10,20,80,0.04), 0 12px 36px rgba(10,20,80,0.06)',
              }}
            >
              {/* Brand logo (actual /logo.png wordmark) */}
              <div className="flex items-center justify-center mb-5">
                <Image
                  src="/logo.png"
                  alt="MonkDB"
                  width={160}
                  height={44}
                  priority
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Workload grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {featuresData.map((feature) => (
                  <motion.div
                    key={feature.name}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      Icon={feature.Icon}
                      name={feature.name}
                      tint={feature.tint}
                      size="sm"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Outputs */}
          <div className="flex w-[20%] flex-col space-y-3">
            {outputDestinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className={`output-item transition-all duration-300 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-20 opacity-0'
                }`}
                style={{ transitionDelay: `${150 * i}ms` }}
              >
                <Card
                  Icon={dest.Icon}
                  name={dest.name}
                  tint={dest.tint}
                  size="md"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile stack ─────────────────────────────────────── */}
        <div className="flex flex-col md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {inputSources.map((source, i) => (
              <motion.div
                key={source.name}
                variants={itemVariants}
                style={{ transitionDelay: `${150 * i}ms` }}
              >
                <Card
                  Icon={source.Icon}
                  name={source.name}
                  tint={source.tint}
                  size="sm"
                />
              </motion.div>
            ))}
          </div>

          {/* Connector: 3 inputs (col centers at 16.67/50/83.33%) → PG Wire (50%) */}
          <MobileConnector topX={[16.67, 50, 83.33]} bottomX={[50]} />

          <motion.div variants={itemVariants} className="mx-auto w-1/2">
            <Card
              Icon={CircuitBoard}
              name="PG Wire"
              tint="#1A38E8"
              size="sm"
            />
          </motion.div>

          {/* Connector: PG Wire (50%) → MonkDB panel (full width center) */}
          <MobileConnector topX={[50]} bottomX={[50]} />

          <motion.div variants={itemVariants} className="mx-auto w-full">
            <div
              className="relative rounded-2xl p-3 sm:p-4"
              style={{
                background: '#F8F4F0',
                border: '1px solid rgba(10,34,128,0.10)',
                boxShadow:
                  '0 2px 4px rgba(10,20,80,0.04), 0 8px 24px rgba(10,20,80,0.05)',
              }}
            >
              <div className="flex items-center justify-center mb-3">
                <Image
                  src="/logo.png"
                  alt="MonkDB"
                  width={120}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {featuresData.map((feature) => (
                  <div key={feature.name}>
                    <Card
                      Icon={feature.Icon}
                      name={feature.name}
                      tint={feature.tint}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connector: MonkDB (50%) → 2 output columns (25/75%) */}
          <MobileConnector topX={[50]} bottomX={[25, 75]} />

          <div className="grid grid-cols-2 gap-2">
            {outputDestinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={itemVariants}
                style={{ transitionDelay: `${150 * i}ms` }}
              >
                <Card
                  Icon={dest.Icon}
                  name={dest.name}
                  tint={dest.tint}
                  size="sm"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
