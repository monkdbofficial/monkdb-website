'use client'

import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { TrendingUp, Zap, Layers, ShieldCheck, type LucideIcon } from 'lucide-react'

type Metric = {
  // Numeric target (for count-up)
  target: number
  // Formatter: turn the current motion value into the displayed string
  format: (v: number) => string
  // Optional prefix printed before the animated number
  prefix?: string
  suffix: string
  label: string
  sublabel: string
  Icon: LucideIcon
}

const metrics: Metric[] = [
  {
    target: 1.2,
    format: (v) => v.toFixed(1) + 'M',
    suffix: '/sec',
    label: 'Writes sustained',
    sublabel: 'Streaming ingest, single cluster',
    Icon: TrendingUp,
  },
  {
    target: 5,
    format: (v) => Math.round(v).toString(),
    prefix: '<',
    suffix: 'ms',
    label: 'p99 query latency',
    sublabel: 'Vector + SQL in one plane',
    Icon: Zap,
  },
  {
    target: 9,
    format: (v) => Math.round(v).toString(),
    suffix: '',
    label: 'Workloads · 1 engine',
    sublabel: 'V · TS · GIS · FTS · DOC · SQL · BLOB · KV · G',
    Icon: Layers,
  },
  {
    target: 99.99,
    format: (v) => v.toFixed(2),
    suffix: '%',
    label: 'Uptime SLA',
    sublabel: 'Air-gapped deployments included',
    Icon: ShieldCheck,
  },
]

const EASE = [0.165, 0.84, 0.44, 1] as const

// ── Count-up number ────────────────────────────────────────────────
function CountUp({
  target,
  format,
  trigger,
  delay = 0,
}: {
  target: number
  format: (v: number) => string
  trigger: boolean
  delay?: number
}) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (v) => format(v))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!trigger) return
    const controls = animate(motionValue, target, {
      duration: 1.8,
      delay,
      ease: [0.22, 0.61, 0.36, 1], // enterprise-y easeOut
    })
    const unsub = display.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [trigger, target, delay, motionValue, display])

  return <span ref={ref}>{format(0)}</span>
}

export default function Metrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-[#0f1623] py-12 sm:py-16 border-y"
      style={{
        borderColor: 'rgba(10,34,128,0.08)',
      }}
    >
      {/* Subtle parchment top-wash for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,244,240,0.55) 0%, rgba(255,255,255,0) 50%)',
        }}
      />

      <div className="relative max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Tiny section chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-3 mb-8 sm:mb-10"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1A38E8',
            }}
          >
            Performance · At a glance
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
            }}
          />
          <motion.span
            className="inline-flex items-center gap-1.5"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#6B7280',
            }}
          >
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 6px rgba(16,185,129,0.6)',
                display: 'inline-block',
              }}
            />
            LIVE
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-8">
          {metrics.map((m, i) => {
            const Icon = m.Icon
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.08,
                  ease: EASE,
                }}
                whileHover={{ y: -3 }}
                className="relative flex flex-col group"
                style={{
                  paddingLeft:
                    i % 4 === 0 ? 0 : 'clamp(12px, 1.6vw, 24px)',
                  paddingRight: 'clamp(4px, 1vw, 12px)',
                  borderLeft:
                    i % 4 === 0
                      ? 'none'
                      : '1px solid rgba(10,34,128,0.08)',
                  transition: 'transform 220ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
              >
                {/* Icon + breathing accent */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background:
                        'linear-gradient(180deg, rgba(26,56,232,0.10) 0%, rgba(26,56,232,0.04) 100%)',
                      border: '1px solid rgba(26,56,232,0.18)',
                      color: '#1A38E8',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(10,20,80,0.05)',
                    }}
                  >
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#1E8AFF',
                      boxShadow: '0 0 5px rgba(30,138,255,0.7)',
                      display: 'inline-block',
                    }}
                  />
                </div>

                {/* Animated number + suffix */}
                <div className="flex items-baseline gap-1">
                  {m.prefix && (
                    <span
                      style={{
                        fontSize: 'clamp(20px, 2vw, 28px)',
                        fontWeight: 300,
                        color: '#1A38E8',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        marginRight: '2px',
                      }}
                    >
                      {m.prefix}
                    </span>
                  )}
                  <span
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontSize: 'clamp(32px, 3.4vw, 56px)',
                      fontWeight: 300,
                      letterSpacing: '-0.025em',
                      lineHeight: 1,
                      background:
                        'linear-gradient(135deg, #0A2280 0%, #1A38E8 60%, #1E8AFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <CountUp
                      target={m.target}
                      format={m.format}
                      trigger={isInView}
                      delay={0.25 + i * 0.08}
                    />
                  </span>
                  {m.suffix && (
                    <span
                      style={{
                        fontSize: 'clamp(14px, 1.3vw, 20px)',
                        fontWeight: 500,
                        color: '#1A38E8',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {m.suffix}
                    </span>
                  )}
                </div>

                {/* Primary label */}
                <div
                  className="text-gray-900 dark:text-white mt-3"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {m.label}
                </div>

                {/* Animated underline */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.08,
                    ease: EASE,
                  }}
                  className="mt-1.5"
                  style={{
                    height: '1.5px',
                    width: '28px',
                    borderRadius: '2px',
                    background:
                      'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
                    transformOrigin: 'left',
                  }}
                />

                {/* Sublabel (monospace, quiet) */}
                <div
                  className="text-gray-500 dark:text-gray-400 mt-2"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    lineHeight: 1.55,
                  }}
                >
                  {m.sublabel}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
