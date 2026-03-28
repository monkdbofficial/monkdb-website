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
      className="bg-white dark:bg-[#0f1623]"
      style={{ padding: '72px 6%' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: '48px', alignItems: 'center' }}>

        {/* Left: title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-bold text-egyptian-blue dark:text-white leading-tight"
          style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
        >
          Return on<br />Investment with<br />MonkDB
        </motion.h2>

        {/* Right: two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>

          {/* Before card — cream */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: '#EDE8D8',
              borderRadius: '16px 0 0 16px',
              padding: '32px 28px',
            }}
          >
            <h3 className="font-bold text-egyptian-blue" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              Key Differentiators
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {beforeItems.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#374151' }}>
                  <span style={{ color: '#374151', marginTop: '2px', flexShrink: 0 }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After card — navy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: '#0A2280',
              borderRadius: '16px',
              padding: '32px 28px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <h3 className="font-bold text-white" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              After MonkDB
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {afterItems.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.88)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', marginTop: '2px', flexShrink: 0 }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
