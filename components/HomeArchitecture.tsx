'use client'

/**
 * HomeArchitecture — docx Page 1, Architecture section.
 *
 *   Diagram: Data Sources → MonkDB → Intelligence → Execution → Applications
 *
 * Pattern parity with the rest of the site:
 *   - SectionLabel chapter marker (variant="dark")
 *   - Centered editorial intro
 *   - 5 nodes in horizontal flow with hub enlarged. Animated traveling pulse.
 *   - Mobile stacks vertically with vertical connectors.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Plug,
  Boxes,
  BrainCircuit,
  Zap,
  AppWindow,
  type LucideIcon,
} from 'lucide-react'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

type Step = {
  label: string
  body: string
  specs: string[]
  Icon: LucideIcon
  hub?: boolean
}

export default function HomeArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).homeArchitecture) ?? {}) as Record<
    string,
    string
  >

  const splitSpecs = (raw: string | undefined, fallback: string) =>
    (raw ?? fallback)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

  const steps: Step[] = [
    {
      label: t.step1Label ?? 'Data Sources',
      body: t.step1Body ?? 'Streams, databases, applications, sensors.',
      specs: splitSpecs(t.step1Specs, 'Kafka, S3, Postgres, OPC UA'),
      Icon: Plug,
    },
    {
      label: t.step2Label ?? 'MonkDB',
      body: t.step2Body ?? 'Unified ingestion, storage, and query.',
      specs: splitSpecs(t.step2Specs, 'Multi-model, Vector, SQL'),
      Icon: Boxes,
      hub: true,
    },
    {
      label: t.step3Label ?? 'Intelligence',
      body: t.step3Body ?? 'Vector search, hybrid retrieval, live context.',
      specs: splitSpecs(t.step3Specs, 'Embeddings, ANN, Hybrid'),
      Icon: BrainCircuit,
    },
    {
      label: t.step4Label ?? 'Execution',
      body: t.step4Body ?? 'Decisions, triggers, workflows in-engine.',
      specs: splitSpecs(t.step4Specs, 'Triggers, Workflows, Webhooks'),
      Icon: Zap,
    },
    {
      label: t.step5Label ?? 'Applications',
      body:
        t.step5Body ?? 'Apps, agents, dashboards, downstream systems.',
      specs: splitSpecs(t.step5Specs, 'Apps, Agents, BI'),
      Icon: AppWindow,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-10 sm:py-14 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #050D6A 0%, #07091A 50%, #050D6A 100%)',
      }}
    >
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(30,138,255,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Flow'} variant="dark" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="max-w-3xl mt-6 sm:mt-10 lg:mt-14 mb-12 sm:mb-16 lg:mb-20"
        >
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: 0,
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.headline?.split(', ')[0] ?? 'Data Sources to Action'}
            <span style={{ color: '#7FB3FF' }}>,</span>
            <br />
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.headline?.split(', ')[1] ?? 'in one engine'}
            </span>
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.62)',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              marginTop: '20px',
              maxWidth: '640px',
            }}
          >
            {t.lead ??
              'MonkDB integrates ingestion, storage, compute, and execution into one distributed system.'}
          </p>
        </motion.div>

        {/* Desktop flow */}
        <div className="hidden md:grid md:grid-cols-5 gap-2 lg:gap-4 relative">
          {/* Background line */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              top: 'clamp(28px, 4vw, 44px)',
              left: '10%',
              right: '10%',
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(127,179,255,0.0) 0%, rgba(127,179,255,0.4) 15%, rgba(30,138,255,0.6) 50%, rgba(127,179,255,0.4) 85%, rgba(127,179,255,0.0) 100%)',
            }}
          />
          {/* Traveling pulse */}
          <span
            aria-hidden="true"
            className="absolute arch-pulse"
            style={{
              top: 'clamp(26px, 3.8vw, 42px)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#1E8AFF',
              boxShadow: '0 0 16px rgba(30,138,255,1)',
            }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.12,
                ease: EASE,
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Node */}
              <div
                className="relative"
                style={{
                  width: 'clamp(56px, 6.5vw, 88px)',
                  height: 'clamp(56px, 6.5vw, 88px)',
                }}
              >
                {s.hub && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-[-15%] rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(30,138,255,0.5) 0%, rgba(30,138,255,0.15) 50%, transparent 75%)',
                      filter: 'blur(10px)',
                      animation: 'archHubGlow 3.6s ease-in-out infinite',
                    }}
                  />
                )}
                <div
                  className="relative w-full h-full flex items-center justify-center text-white rounded-full"
                  style={{
                    background: s.hub
                      ? 'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)'
                      : 'rgba(255,255,255,0.04)',
                    border: s.hub
                      ? '1px solid rgba(255,255,255,0.25)'
                      : '1px solid rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: s.hub
                      ? '0 14px 36px rgba(26,56,232,0.5), inset 0 1px 0 rgba(255,255,255,0.22)'
                      : '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  <s.Icon size={22} strokeWidth={1.5} />
                </div>
              </div>
              <h3
                className="text-white"
                style={{
                  fontSize: 'clamp(13.5px, 1.1vw, 16px)',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: '-0.005em',
                  marginTop: '20px',
                  marginBottom: '8px',
                }}
              >
                {s.label}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 'clamp(12px, 0.9vw, 13.5px)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: '180px',
                }}
              >
                {s.body}
              </p>
              {/* Spec chips */}
              <ul
                className="flex flex-wrap justify-center gap-1.5"
                style={{ listStyle: 'none', padding: 0, margin: '14px 0 0 0', maxWidth: '200px' }}
              >
                {s.specs.map((spec, j) => (
                  <motion.li
                    key={spec}
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.5 + i * 0.12 + j * 0.06,
                      ease: EASE,
                    }}
                    style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(127,179,255,0.16)',
                      color: 'rgba(127,179,255,0.85)',
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {spec}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="md:hidden flex flex-col gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.2 + i * 0.1,
                ease: EASE,
              }}
              className="flex items-center gap-4 rounded-2xl"
              style={{
                background: s.hub
                  ? 'linear-gradient(135deg, rgba(26,56,232,0.18) 0%, rgba(10,34,128,0.18) 100%)'
                  : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.10)',
                padding: '14px',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center text-white rounded-full"
                style={{
                  width: 50,
                  height: 50,
                  background: s.hub
                    ? 'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)'
                    : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: s.hub
                    ? '0 6px 18px rgba(26,56,232,0.4)'
                    : 'none',
                }}
              >
                <s.Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 20px)',
                    fontWeight: 400,
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    margin: '4px 0 0 0',
                  }}
                >
                  {s.body}
                </p>
                <ul
                  className="flex flex-wrap gap-1.5"
                  style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}
                >
                  {s.specs.map((spec) => (
                    <li
                      key={spec}
                      style={{
                        display: 'inline-block',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(127,179,255,0.14)',
                        color: 'rgba(127,179,255,0.8)',
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '9.5px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes archHubGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
        @keyframes archPulseTravel {
          0%,
          5% {
            left: 10%;
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
            left: calc(90% - 6px);
            opacity: 0;
          }
        }
        :global(.arch-pulse) {
          animation: archPulseTravel 4.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
