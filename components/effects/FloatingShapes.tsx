'use client'

import { motion } from 'framer-motion'

/**
 * FloatingShapes — drop-in background layer of slowly drifting rounded-pill shapes.
 *
 * Lifted from 21st.dev/kokonutd/shape-landing-hero and recolored to the
 * MonkDB navy palette so it can sit behind dark hero sections without
 * fighting the existing radial gradients.
 *
 * The component is content-less. Render it as a sibling inside a
 * position: relative parent and put your H1/CTA in a higher z-index layer.
 */

const EASE = [0.23, 0.86, 0.39, 0.96] as const

type Shape = {
  delay: number
  width: number
  height: number
  rotate: number
  /** Inline gradient (left side opaque navy, fading right to transparent) */
  gradient: string
  /** Tailwind position classes */
  position: string
}

const SHAPES: Shape[] = [
  {
    delay: 0.3,
    width: 600,
    height: 140,
    rotate: 12,
    gradient: 'linear-gradient(to right, rgba(26,56,232,0.20), transparent)',
    position: 'left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]',
  },
  {
    delay: 0.5,
    width: 500,
    height: 120,
    rotate: -15,
    gradient: 'linear-gradient(to right, rgba(30,138,255,0.18), transparent)',
    position: 'right-[-5%] md:right-[0%] top-[70%] md:top-[75%]',
  },
  {
    delay: 0.4,
    width: 300,
    height: 80,
    rotate: -8,
    gradient: 'linear-gradient(to right, rgba(0,51,160,0.22), transparent)',
    position: 'left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]',
  },
  {
    delay: 0.6,
    width: 200,
    height: 60,
    rotate: 20,
    gradient: 'linear-gradient(to right, rgba(10,34,128,0.24), transparent)',
    position: 'right-[15%] md:right-[20%] top-[10%] md:top-[15%]',
  },
  {
    delay: 0.7,
    width: 150,
    height: 40,
    rotate: -25,
    gradient: 'linear-gradient(to right, rgba(127,179,255,0.18), transparent)',
    position: 'left-[20%] md:left-[25%] top-[5%] md:top-[10%]',
  },
]

function ElegantShape({ shape }: { shape: Shape }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: shape.rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: shape.rotate }}
      transition={{
        duration: 2.4,
        delay: shape.delay,
        ease: EASE,
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${shape.position}`}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: shape.width, height: shape.height }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: shape.gradient,
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FloatingShapes({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      {SHAPES.map((s, i) => (
        <ElegantShape key={i} shape={s} />
      ))}
    </div>
  )
}
