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

const stats = [
  { value: '70%', label: 'Cost reduction' },
  { value: '5×', label: 'Faster queries' },
  { value: '1', label: 'Unified platform' },
]

function PulseDot({ color, delay }: { color: string; delay: number }) {
  return (
    <span style={{ position: 'relative', flexShrink: 0, width: 8, height: 8, marginTop: 5 }}>
      <motion.span
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: color, opacity: 0.35,
        }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
      />
      <span style={{ position: 'absolute', inset: '1px', borderRadius: '50%', background: color }} />
    </span>
  )
}

export default function ROI() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="roi"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid py-10 sm:py-14 lg:py-[72px]"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 lg:gap-12 items-center">

        {/* Left: title + stats */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-bold leading-tight"
            style={{ fontSize: 'clamp(22px, 2.2vw, 36px)', marginBottom: '32px' }}
          >
            <span className="text-egyptian-blue dark:text-white">Return on Investment</span>
            <br className="hidden lg:block" />
            <span className="text-egyptian-blue dark:text-white"> with </span>
            <span className="gradient-text-animate">MonkDB</span>
          </motion.h2>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '14px 24px', borderRadius: '14px',
                  border: '1.5px solid rgba(26,56,232,0.15)',
                  background: 'linear-gradient(135deg, rgba(26,56,232,0.04) 0%, rgba(30,138,255,0.07) 100%)',
                  boxShadow: '0 2px 12px rgba(26,56,232,0.06)',
                  cursor: 'default',
                }}
              >
                <span
                  className="font-bold"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#1A38E8', lineHeight: 1.1, letterSpacing: '-1px' }}
                >
                  {s.value}
                </span>
                <span className="text-gray-500 dark:text-gray-400" style={{ fontSize: '0.75rem', marginTop: '4px', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

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
                  <PulseDot color="#F59E0B" delay={i * 0.4} />
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
            style={{ background: '#0A2280', padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px)', position: 'relative', zIndex: 1, overflow: 'hidden' }}
          >
            {/* Subtle radial glow */}
            <div style={{
              position: 'absolute', top: '-40%', right: '-30%',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(30,138,255,0.25) 0%, transparent 65%)',
              filter: 'blur(30px)', pointerEvents: 'none',
            }} />
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
                  <PulseDot color="#34D399" delay={i * 0.4 + 0.2} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  )
}
