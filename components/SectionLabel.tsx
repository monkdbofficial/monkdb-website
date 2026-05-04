'use client'

/**
 * SectionLabel — the chapter-marker pattern used across MonkDB sections.
 *
 *   <font-mono small uppercase> + flex-1 hairline gradient
 *
 * Matches About, Mission, Sovereignty, ArchitecturePillars, AIReady,
 * FeatureCards, CompetitionMatrix.
 *
 *   variant="light" — for sections on white/parchment backgrounds (default)
 *   variant="dark"  — for sections on deep navy backgrounds
 */

import { motion } from 'framer-motion'

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function SectionLabel({
  text,
  variant = 'light',
  delay = 0,
}: {
  text: string
  variant?: 'light' | 'dark'
  delay?: number
}) {
  const color = variant === 'dark' ? '#7FB3FF' : '#1A38E8'
  const lineFrom =
    variant === 'dark' ? 'rgba(127,179,255,0.32)' : 'rgba(10,34,128,0.18)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="flex items-center gap-4"
    >
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
      <div
        aria-hidden="true"
        style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(90deg, ${lineFrom}, transparent)`,
        }}
      />
    </motion.div>
  )
}
