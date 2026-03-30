'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const beforeItems = [
  'Multiple specialized databases',
  'Complex data pipelines',
  'Higher licensing costs',
  'Increased DevOps overhead',
  'Fragmented AI integration',
]

const afterItems = [
  'Unified multi-modal platform',
  'Reduced infrastructure footprint',
  'Simplified DevOps',
  'Native AI integration',
  'Consolidated licensing',
]

export default function ROI() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="roi"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid px-5 sm:px-[6%] lg:px-[12%] py-10 sm:py-14 lg:py-[72px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 lg:gap-12 items-center">

        {/* Left: title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-bold text-egyptian-blue dark:text-white leading-tight"
          style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
        >
          Return on Investment<br className="hidden lg:block" /> with MonkDB
        </motion.h2>

        {/* Right: two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">

          {/* Before card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl sm:rounded-r-none"
            style={{ background: '#EDE8D8', padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px)' }}
          >
            <h3 className="font-bold text-egyptian-blue" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              Key Differentiators
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {beforeItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: '#374151' }}
                >
                  <span style={{ color: '#374151', marginTop: '2px', flexShrink: 0 }}>·</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl sm:rounded-l-none"
            style={{ background: '#0A2280', padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px)', position: 'relative', zIndex: 1 }}
          >
            <h3 className="font-bold text-white" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              After MonkDB
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {afterItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.07, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: 'rgba(255,255,255,0.88)' }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.6)', marginTop: '2px', flexShrink: 0 }}>·</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
