'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Layers, Zap, Building2, CircleCheck } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Native by Design',
    description:
      'Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data types live side-by-side, enabling seamless AI pipelines without data movement.',
    color: '#0033A0',
  },
  {
    icon: Layers,
    title: 'Unified & Multi-Modal',
    description:
      'One database for all your data types: Vector, Time-Series, Geospatial, Documents, Blobs, Full-Text Search, and Streaming SQL. Eliminate the need for multiple specialized systems.',
    color: '#1E8AFF',
  },
  {
    icon: Zap,
    title: 'Blazing Fast & Scalable',
    description:
      'Engineered for performance at scale. Hybrid search, HTAP workloads, and sub-millisecond query response across billions of records, on-prem or in the cloud.',
    color: '#0033A0',
  },
  {
    icon: Building2,
    title: 'Enterprise-Ready',
    description:
      'Flexible EULAs, on-prem, cloud, and edge deployment options. Supports ARM and x86_64 architectures. Enterprise-grade security, compliance, and support included.',
    color: '#1E8AFF',
  },
  {
    icon: CircleCheck,
    title: 'No More Tech Sprawl',
    description:
      'Replace your entire stack of specialized databases with a single platform. Reduce licensing costs, DevOps overhead, and integration complexity dramatically.',
    color: '#0033A0',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut' as const,
    },
  }),
}

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 bg-white dark:bg-[#111827] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-egyptian-blue dark:text-blue-energy font-mono text-sm font-semibold mb-3 tracking-wider uppercase">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Why Engineers Choose MonkDB
          </h2>
          <p className="mt-4 text-gray-500 dark:text-powder-blue max-w-2xl mx-auto text-lg">
            Every feature designed to eliminate complexity and accelerate AI-driven applications.
          </p>
        </motion.div>

        {/* Cards - horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-x-visible lg:pb-0">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex-shrink-0 w-72 lg:w-auto bg-white dark:bg-oxford-navy/60 dark:border-white/10 border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-powder-blue leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
