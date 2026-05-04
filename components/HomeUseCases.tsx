'use client'

/**
 * HomeUseCases — docx Page 1, Use Cases Overview section.
 *
 *   Six use cases, each linking to /solutions/use-cases/<slug>.
 *
 * Enterprise upgrades:
 *   - Per-card industry Lucide icon
 *   - Per-card mono metric chip showing representative outcome
 *   - Card lifts on hover, accent rule sweeps in, arrow circle fills
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Boxes,
  Bot,
  ShieldAlert,
  Factory,
  Car,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import SectionLabel from './SectionLabel'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

type UseCaseCard = {
  title: string
  body: string
  metric: string
  href: string
  Icon: LucideIcon
}

export default function HomeUseCases() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { dict, locale } = useI18n()
  const t = (((dict as Record<string, unknown>).homeUseCases) ?? {}) as Record<
    string,
    string
  >

  const cards: UseCaseCard[] = [
    {
      title: t.card1Title ?? 'Digital Twins',
      body:
        t.card1Body ??
        'Live system models that simulate, predict, and act in real time.',
      metric: t.card1Metric ?? 'Real-time sync',
      href: '/solutions/use-cases/digital-twins',
      Icon: Boxes,
    },
    {
      title: t.card2Title ?? 'AI Agents',
      body:
        t.card2Body ??
        'Unified context plane for reasoning agents and copilots.',
      metric: t.card2Metric ?? 'Live context',
      href: '/solutions/use-cases/ai-agents',
      Icon: Bot,
    },
    {
      title: t.card3Title ?? 'Fraud Detection',
      body:
        t.card3Body ??
        'Anomalies caught and acted on as transactions clear.',
      metric: t.card3Metric ?? '<5 ms decision',
      href: '/solutions/use-cases/fraud-detection',
      Icon: ShieldAlert,
    },
    {
      title: t.card4Title ?? 'Smart Manufacturing',
      body:
        t.card4Body ??
        'Operational intelligence that predicts and corrects continuously.',
      metric: t.card4Metric ?? 'Predictive ops',
      href: '/solutions/use-cases/smart-manufacturing',
      Icon: Factory,
    },
    {
      title: t.card5Title ?? 'Smart Mobility',
      body:
        t.card5Body ??
        'Dynamic routing and predictive coordination across fleets.',
      metric: t.card5Metric ?? 'Dynamic routing',
      href: '/solutions/use-cases/smart-mobility',
      Icon: Car,
    },
    {
      title: t.card6Title ?? 'Financial Intelligence',
      body:
        t.card6Body ??
        'Low-latency analytics, trading, and risk in one plane.',
      metric: t.card6Metric ?? 'Trading-floor latency',
      href: '/solutions/use-cases/financial-intelligence',
      Icon: TrendingUp,
    },
  ]

  return (
    <section
      ref={ref}
      className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-28"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={t.label ?? 'Use Cases'} />

        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mt-6 sm:mt-10 lg:mt-14 mb-10 sm:mb-14 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
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
            {t.headline?.split(' on ')[0] ??
              'Production patterns running'}{' '}
            <span style={{ color: '#1A38E8' }}>on</span>{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.headline?.split(' on ')[1] ?? 'MonkDB'}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '560px',
            }}
          >
            {t.lead ??
              'Six places where unified execution replaces fragmented stacks. Click any card for the depth.'}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.07,
                ease: EASE,
              }}
            >
              <Link
                href={`/${locale}${c.href}`}
                className="group block relative rounded-2xl overflow-hidden home-uc-card h-full"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(20px, 2.4vw, 28px)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top accent rule on hover */}
                <span
                  aria-hidden="true"
                  className="home-uc-card-accent absolute top-0 left-0 right-0"
                  style={{
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent, #1A38E8, transparent)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 360ms ease',
                  }}
                />

                {/* Icon + index + metric chip row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="relative inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 'clamp(40px, 4vw, 48px)',
                      height: 'clamp(40px, 4vw, 48px)',
                      background:
                        'linear-gradient(135deg, rgba(26,56,232,0.10) 0%, rgba(30,138,255,0.08) 100%)',
                      border: '1px solid rgba(26,56,232,0.18)',
                      color: '#1A38E8',
                    }}
                  >
                    <c.Icon size={20} strokeWidth={1.6} />
                  </div>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.4)',
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <h3
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: 'clamp(18px, 1.8vw, 24px)',
                    fontWeight: 400,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400 flex-1"
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15.5px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>

                {/* Footer: metric chip + arrow */}
                <div className="flex items-center justify-between mt-6">
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(26,56,232,0.06)',
                      border: '1px solid rgba(26,56,232,0.16)',
                      color: '#1A38E8',
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#1A38E8',
                      }}
                    />
                    {c.metric}
                  </span>
                  <span
                    aria-hidden="true"
                    className="home-uc-arrow inline-flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(26,56,232,0.08)',
                      color: '#1A38E8',
                      transition: 'all 280ms ease',
                    }}
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.home-uc-card:hover) {
          transform: translateY(-4px);
          border-color: rgba(26, 56, 232, 0.25) !important;
          box-shadow: 0 18px 42px rgba(10, 34, 128, 0.10);
          transition:
            transform 320ms ease,
            box-shadow 320ms ease,
            border-color 320ms ease;
        }
        :global(.home-uc-card:hover .home-uc-card-accent) {
          transform: scaleX(1);
        }
        :global(.home-uc-card:hover .home-uc-arrow) {
          background: #1a38e8 !important;
          color: white !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  )
}
