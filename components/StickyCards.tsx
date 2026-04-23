'use client'

/**
 * StickyCards — sanas-style scroll-stacking cards.
 *
 * Each card is `position: sticky`. As you scroll, cards stack on top of each other
 * with slight scale-down and blur on the ones behind. The card at the front is
 * always crisp. This is the signature CardsHorizontal pattern from sanas.ai,
 * replicated with their exact CSS values.
 *
 * CSS source: .CardsHorizontal_card {
 *   position: sticky; top: calc(var(--header-height) + var(--margins));
 *   transition: transform .2s linear, filter .25s linear;
 *   transform-origin: top;
 * }
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const

export interface StickyCard {
  eyebrow: string
  title: string
  description: string
  image: string
  bg: string
}

const FALLBACK_CARDS: StickyCard[] = [
  {
    eyebrow: 'Healthcare',
    title: 'How a Top-10 Hospital Network Unified Patient Data Across 14 Facilities',
    description:
      'Replaced five siloed databases with a single MonkDB deployment, cutting query latency by 68 % and reducing compliance audit prep from weeks to hours.',
    image: '/AdobeStock_480053037 1.svg',
    bg: 'linear-gradient(145deg, #0C1B8A 0%, #1A38E8 100%)',
  },
  {
    eyebrow: 'Financial Services',
    title: 'Real-Time Fraud Detection at 1.2 M Transactions per Second',
    description:
      'A multinational bank moved its fraud pipeline to MonkDB\'s streaming SQL engine, achieving sub-5 ms decision latency with full auditability.',
    image: '/3d-geometric-abstract-twist-background 1.svg',
    bg: 'linear-gradient(145deg, #071480 0%, #0E26B8 100%)',
  },
  {
    eyebrow: 'Manufacturing',
    title: 'Sovereign IoT Data Plane for 40,000 Connected Sensors',
    description:
      'An automotive OEM deployed MonkDB on-prem across three continents, ingesting time-series telemetry with geospatial indexing, zero cloud dependency.',
    image: '/view-futuristic-light-lamp-design 1.svg',
    bg: 'linear-gradient(145deg, #0A1A9A 0%, #1535CC 100%)',
  },
  {
    eyebrow: 'Government',
    title: 'National-Scale Document Intelligence for 120 M Records',
    description:
      'A federal agency migrated from legacy Oracle to MonkDB, gaining full-text search, vector embeddings, and blob storage in a single air-gapped cluster.',
    image: '/AdobeStock_588310019 1.svg',
    bg: 'linear-gradient(145deg, #050D6A 0%, #1230CC 100%)',
  },
]

function Card({
  card,
  index,
  total,
}: {
  card: StickyCard
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Track how much this card has scrolled past its sticky point
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Cards behind shrink and blur slightly (sanas: transform .2s linear, filter .25s linear)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index < total - 1 ? [1, 0.96, 0.92] : [1, 1, 1]
  )
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    index < total - 1 ? ['blur(0px)', 'blur(2px)', 'blur(4px)'] : ['blur(0px)', 'blur(0px)', 'blur(0px)']
  )

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: `calc(100px + ${index * 20}px)`,
        paddingTop: index > 0 ? `${index * 12}px` : undefined,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          filter,
          transformOrigin: 'top center',
        }}
        className="rounded-[24px] sm:rounded-[32px] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: SANAS_EASE }}
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-0"
          style={{
            background: card.bg,
            minHeight: 'clamp(340px, 42vw, 520px)',
          }}
        >
          {/* Left — text content */}
          <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: SANAS_EASE }}
              className="inline-flex items-center gap-2 mb-5"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#1E8AFF',
                }}
              />
              {card.eyebrow}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: SANAS_EASE }}
              className="text-white mb-4 sm:mb-5"
              style={{
                fontSize: 'clamp(22px, 3.2vw, 44px)',
                fontWeight: 300,
                lineHeight: 1.14,
                letterSpacing: '-0.01em',
                maxWidth: '520px',
              }}
            >
              {card.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: SANAS_EASE }}
              className="text-white/65 mb-6 sm:mb-8"
              style={{
                fontSize: 'clamp(14px, 1.2vw, 17px)',
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: '480px',
              }}
            >
              {card.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: SANAS_EASE }}
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-white"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.4)',
                  paddingBottom: '4px',
                  transition: 'border-color 200ms ease',
                }}
              >
                Read case study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block overflow-hidden">
            {/* Gradient overlay blending image into bg */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to right, ${card.bg.includes('linear-gradient')
                  ? card.bg.match(/#[0-9A-Fa-f]{6}/g)?.[1] || '#1A38E8'
                  : card.bg
                } 0%, transparent 40%)`,
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.5,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function StickyCards({ cards }: { cards?: StickyCard[] }) {
  const items = cards || FALLBACK_CARDS

  return (
    <section className="relative py-10 sm:py-14 lg:py-20">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Section header */}
        <motion.div
          className="mb-10 sm:mb-14 lg:mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: SANAS_EASE }}
        >
          <span
            className="inline-flex items-center gap-2 text-egyptian-blue dark:text-blue-400 mb-4"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A38E8' }} />
            Case Studies
          </span>
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 62px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
            }}
          >
            Trusted by enterprises that cannot
            compromise
          </h2>
        </motion.div>

        {/* Sticky stack */}
        <div className="flex flex-col gap-6 sm:gap-8 pb-20">
          {items.map((card, i) => (
            <Card key={i} card={card} index={i} total={items.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
