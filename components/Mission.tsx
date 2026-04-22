'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="bg-white dark:bg-[#0f1623] overflow-hidden section-grid py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
      <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 lg:gap-10 items-center">

        {/* ── LEFT: Vector.svg + pulsing sonar rings ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center w-full max-w-[220px] sm:max-w-[300px] lg:max-w-[420px] mx-auto">

            {/* Vector.svg — slow spin */}
            <motion.img
              src="/Vector.svg"
              alt=""
              animate={isInView ? { rotate: [0, 360] } : {}}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="relative w-full h-auto"
            />
          </div>
        </motion.div>

        {/* ── RIGHT: chapter marker + quote text ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          {/* Chapter marker — matches Sovereignty / Architecture / Engine pattern */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#1A38E8',
              }}
            >
              06 / MISSION
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background:
                  'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
              }}
            />
          </div>

          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(22px, 3vw, 46px)',
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              textWrap: 'balance',
            }}
          >
            AI transformed every aspect of enterprise data.{' '}
            <span style={{ color: '#1A38E8' }}>
              Therefore, we constructed the platform they operate on.
            </span>
          </h2>

          <div
            aria-hidden="true"
            style={{
              height: '2px',
              width: '48px',
              marginTop: '24px',
              borderRadius: '2px',
              background:
                'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
            }}
          />

          <p
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', marginTop: '20px', maxWidth: '560px' }}
          >
            The AI Native Sovereign Data Platform represents MonkDB&apos;s answer to the era of AI and agency.
            It features a regulated access layer that integrates data systems to facilitate secure,
            contextual, and real-time AI.
          </p>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
