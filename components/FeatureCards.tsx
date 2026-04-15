'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'Keep Architecture Simple at Scale',
    description: 'As organizations grow, data architecture often becomes unnecessarily complex — slowing innovation and increasing costs. MonkDB simplifies data infrastructure by removing architectural clutter and enabling scalable, efficient systems that grow with your business.',
    accent: '#1A38E8',
  },
  {
    title: 'Modern Data Strategy for an AI Agent-Driven World',
    description: 'Today’s data ecosystems are dynamic — powered by AI agents, distributed workflows, and diverse consumers. MonkDB provides seamless ingestion, transformation, and storage, making real-time, reliable data instantly accessible across your entire stack.',
    accent: '#0EA5E9',
  },
  {
    title: 'Real-Time Systems Over Static Infrastructure',
    description: 'Autonomous systems and AI applications generate massive volumes of data continuously. MonkDB enables real-time data processing and streaming, helping you move from raw data to actionable insights — and revenue — faster than ever.',
    accent: '#6366F1',
  },
  {
    title: 'Built for AI-First Data Infrastructure',
    description: 'Modern AI systems need event-driven infrastructure that ingests, processes, and stores data at scale. MonkDB is designed for AI-first environments, with built-in governance, observability, and traceability for reliable, compliant pipelines.',
    accent: '#0033A0',
  },
]

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
              className="text-gray-900 dark:text-white leading-snug"
              style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', fontWeight: 400 }}
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
