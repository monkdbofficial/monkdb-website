'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'AI-Native by Design',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
    accent: '#1A38E8',
  },
  {
    title: 'Unified & Multi-Modal',
    description: 'One platform for vector, time-series, geospatial, document, and streaming data.',
    accent: '#0EA5E9',
  },
  {
    title: 'Blazing Fast & Scalable',
    description: 'Sub-millisecond queries at any scale — from edge deployments to petabyte warehouses.',
    accent: '#6366F1',
  },
  {
    title: 'Enterprise-Ready',
    description: 'SOC 2, RBAC, audit logging, and flexible EULA licensing built in from day one.',
    accent: '#0033A0',
  },
  {
    title: 'No More Tech Sprawl',
    description: 'Replace 5+ specialized databases with one unified platform. Less cost, less ops.',
    accent: '#1E8AFF',
  },
]

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid py-10 sm:py-14 lg:py-[72px]"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            whileHover={{
              y: -6,
              boxShadow: `0 0 0 1px ${feature.accent}28, 0 12px 40px ${feature.accent}18`,
              transition: { duration: 0.22 },
            }}
            className="relative flex flex-col gap-4 p-5 rounded-2xl cursor-default"
            style={{ border: '1px solid transparent', transition: 'border-color 0.2s' }}
          >

{/* Icon — slow spin */}
            <motion.div
              style={{ width: 56, height: 56 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 32 + i * 4, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
            >
              <img src="/Group.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </motion.div>

            <h3
              className="font-bold text-gray-900 dark:text-white leading-snug"
              style={{ fontSize: 'clamp(15px, 1.3vw, 18px)' }}
            >
              {feature.title}
            </h3>

            <p
              className="text-gray-500 dark:text-gray-400 leading-relaxed"
              style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', margin: 0 }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}
