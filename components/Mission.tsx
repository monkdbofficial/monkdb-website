'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="bg-white dark:bg-[#0f1623] overflow-hidden"
      style={{ padding: '72px 12%' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '42% 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: organic concentric ovals ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg
            viewBox="0 0 560 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', maxWidth: '460px', height: 'auto' }}
          >
            {/* Outer — perfect circle */}
            <motion.circle
              cx="278" cy="302"
              r="252"
              stroke="#1A38E8"
              strokeWidth="1.5"
              fill="none"
              pathLength="1"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0 }}
              animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] as const }}
            />
            {/* Inner — organic rotated blob */}
            <motion.path
              d="M 228 158
                 C 278 128, 398 172, 424 278
                 C 450 384, 392 468, 298 472
                 C 204 476, 132 402, 142 304
                 C 152 210, 178 188, 228 158 Z"
              stroke="#1A38E8"
              strokeWidth="1.5"
              fill="none"
              pathLength="1"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0 }}
              animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
            />
          </svg>
        </motion.div>

        {/* ── RIGHT: quote text ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <p
            className="text-gray-900 dark:text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 400 }}
          >
            At Movibase,{' '}
            <span style={{ color: '#1A38E8' }}>
              our journey is deeply personal
            </span>
            {' '}— born from decades of experience in enterprise systems, data management, and AI.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
