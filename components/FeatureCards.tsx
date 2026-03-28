'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'AI-Native by Design',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
  },
  {
    title: 'Unified & Multi-Modal',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
  },
  {
    title: 'Blazing Fast & Scalable',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
  },
  {
    title: 'Enterprise-Ready',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
  },
  {
    title: 'No More Tech Sprawl',
    description: 'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.',
  },
]

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      ref={ref}
      className="bg-white dark:bg-[#0f1623]"
      style={{ padding: '72px 12%' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '32px',
        }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Sphere icon */}
            <div style={{ width: 56, height: 56 }}>
              <img
                src="/Group.svg"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-bold text-gray-900 dark:text-white leading-snug"
              style={{ fontSize: 'clamp(16px, 1.3vw, 18px)' }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              className="text-gray-500 dark:text-gray-400 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', margin: 0 }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
