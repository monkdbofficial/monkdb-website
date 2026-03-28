'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Pre-computed to avoid SSR/client floating-point mismatch
const CIRCLE_DOTS = [0, 60, 120, 180, 240, 300].map((angle) => {
  const rad = (angle * Math.PI) / 180
  return {
    angle,
    cx: parseFloat((150 + 140 * Math.cos(rad)).toFixed(4)),
    cy: parseFloat((150 + 140 * Math.sin(rad)).toFixed(4)),
  }
})

export default function Mission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="py-24 bg-white dark:bg-[#0f1623] px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: decorative SVG circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer circle - animated */}
                <motion.circle
                  cx="150"
                  cy="150"
                  r="140"
                  stroke="#0033A0"
                  strokeWidth="1.5"
                  strokeDasharray="880"
                  initial={{ strokeDashoffset: 880, opacity: 0 }}
                  animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                {/* Middle circle */}
                <motion.circle
                  cx="150"
                  cy="150"
                  r="100"
                  stroke="#1E8AFF"
                  strokeWidth="1"
                  strokeDasharray="628"
                  initial={{ strokeDashoffset: 628, opacity: 0 }}
                  animate={isInView ? { strokeDashoffset: 0, opacity: 0.6 } : {}}
                  transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
                />
                {/* Inner circle */}
                <motion.circle
                  cx="150"
                  cy="150"
                  r="55"
                  stroke="#B1C9E8"
                  strokeWidth="1"
                  strokeDasharray="345"
                  initial={{ strokeDashoffset: 345, opacity: 0 }}
                  animate={isInView ? { strokeDashoffset: 0, opacity: 0.5 } : {}}
                  transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
                />
                {/* Center dot */}
                <motion.circle
                  cx="150"
                  cy="150"
                  r="8"
                  fill="#0033A0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                />
                {/* Cross lines */}
                <motion.line
                  x1="10"
                  y1="150"
                  x2="290"
                  y2="150"
                  stroke="#0033A0"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.4 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 }}
                />
                <motion.line
                  x1="150"
                  y1="10"
                  x2="150"
                  y2="290"
                  stroke="#0033A0"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.4 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 }}
                />
                {/* Dots on outer circle */}
                {CIRCLE_DOTS.map(({ angle, cx, cy }, i) => (
                  <motion.circle
                    key={angle}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#0033A0"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1.8 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-egyptian-blue font-bold text-xs tracking-widest uppercase">
                  MonkDB
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: quote text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <p className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-gray-900 dark:text-white">
              &ldquo;At Movibase,{' '}
              <span className="font-bold italic text-egyptian-blue dark:text-blue-energy">
                our journey is deeply personal
              </span>{' '}
              — born from decades of experience in enterprise systems, data management, and
              AI.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-0.5 bg-egyptian-blue" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  Movibase Platform PVT. LTD
                </div>
                <div className="text-gray-500 dark:text-powder-blue text-sm">
                  Creators of MonkDB
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
