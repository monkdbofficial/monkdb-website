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
      className="bg-white dark:bg-[#0f1623] section-grid px-5 sm:px-[6%] lg:px-[12%] py-10 sm:py-14 lg:py-[72px]"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px', cursor: 'default' }}
          >
            {/* Icon with hover scale */}
            <motion.div
              style={{ width: 56, height: 56 }}
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            >
              <img
                src="/Group.svg"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>

            <h3
              className="font-bold text-gray-900 dark:text-white leading-snug"
              style={{ fontSize: 'clamp(15px, 1.3vw, 18px)' }}
            >
              {feature.title}
            </h3>

            <p
              className="text-gray-500 dark:text-gray-400 leading-relaxed"
              style={{ fontSize: 'clamp(13px, 1.1vw, 16px)', margin: 0 }}
            >
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
