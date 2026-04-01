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

        {/* ── RIGHT: quote text ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <p
            className="text-gray-900 dark:text-white leading-tight"
            style={{ fontSize: 'clamp(20px, 2.5vw, 40px)', fontWeight: 400 }}
          >
            At Movibase,{' '}
            <span style={{ color: '#1A38E8' }}>
              our journey is deeply personal
            </span>
            {' '}— born from decades of experience in enterprise systems, data management, and AI.
          </p>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
