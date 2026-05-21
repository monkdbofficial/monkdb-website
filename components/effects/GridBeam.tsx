'use client'

import { motion } from 'framer-motion'

/**
 * GridBeam — full-coverage navy grid with a single coloured beam travelling
 * across it. Adapted from 21st.dev/thanh/background-grid-beam, extended so
 * the grid covers the whole layer (the original was inline-text-sized).
 *
 * The beam uses an animated linearGradient with two MonkDB navy stops so it
 * reads as a brand-coloured scan rather than the original cyan-violet.
 *
 * Drop into a position: relative parent. Inset-0, pointer-events: none.
 */

export default function GridBeam({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      {/* Static brand-blue grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127,179,255,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,179,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 80%)',
        }}
      />

      {/* Travelling beam */}
      <svg
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 600"
      >
        <path
          d="M 100 60 H 280 M 280 60 V 220 M 280 220 H 540 M 540 220 V 380 M 540 380 H 820 M 820 380 V 220 M 820 220 H 1100 M 1100 220 V 80 M 1100 80 H 1380"
          stroke="url(#monkdb-grid-beam-gradient)"
          strokeWidth={2}
          fill="none"
        />
        <defs>
          <motion.linearGradient
            id="monkdb-grid-beam-gradient"
            variants={{
              initial: { x1: '0%', x2: '5%', y1: '50%', y2: '50%' },
              animate: { x1: '95%', x2: '100%', y1: '50%', y2: '50%' },
            }}
            initial="initial"
            animate="animate"
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1.4,
            }}
          >
            <stop stopColor="#1E8AFF" stopOpacity="0" />
            <stop stopColor="#1E8AFF" />
            <stop offset="0.5" stopColor="#7FB3FF" />
            <stop offset="1" stopColor="#1A38E8" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}
