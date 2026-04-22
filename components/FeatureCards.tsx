'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

const features = [
  {
    title: 'Keep Architecture Simple at Scale',
    description: 'As organizations grow, data architecture often becomes unnecessarily complex. MonkDB simplifies infrastructure by removing architectural clutter and enabling scalable, efficient systems.',
    accent: '#60a0ff',
    accentDark: '#1A38E8',
    icon: '⬡',
    gradient: 'linear-gradient(135deg, rgba(26,56,232,0.18) 0%, rgba(0,194,255,0.08) 100%)',
  },
  {
    title: 'Modern Data Strategy for an AI Agent-Driven World',
    description: 'Today\'s data ecosystems are dynamic — powered by AI agents, distributed workflows, and diverse consumers. MonkDB provides seamless ingestion, transformation, and storage.',
    accent: '#00c2ff',
    accentDark: '#0EA5E9',
    icon: '◈',
    gradient: 'linear-gradient(135deg, rgba(0,194,255,0.15) 0%, rgba(80,40,200,0.08) 100%)',
  },
  {
    title: 'Real-Time Systems Over Static Infrastructure',
    description: 'Autonomous systems and AI applications generate massive volumes of data continuously. MonkDB enables real-time processing and streaming for immediate, actionable insights.',
    accent: '#a060ff',
    accentDark: '#6366F1',
    icon: '◎',
    gradient: 'linear-gradient(135deg, rgba(160,96,255,0.18) 0%, rgba(26,56,232,0.08) 100%)',
  },
  {
    title: 'Built for AI-First Data Infrastructure',
    description: 'Modern AI systems need event-driven infrastructure that ingests, processes, and stores data at scale. MonkDB is designed for AI-first environments with built-in governance.',
    accent: '#ff6090',
    accentDark: '#0033A0',
    icon: '✦',
    gradient: 'linear-gradient(135deg, rgba(255,96,144,0.15) 0%, rgba(160,96,255,0.08) 100%)',
  },
]

function TiltCard({ feature, index, isInView }: { feature: typeof features[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        cursor: 'default',
      }}
    >
      <motion.div
        className="relative flex flex-col gap-4 p-6 rounded-2xl h-full overflow-hidden"
        whileHover={{ boxShadow: `0 0 0 1px ${feature.accent}30, 0 20px 60px ${feature.accent}20, 0 8px 24px rgba(0,0,0,0.15)` }}
        transition={{ duration: 0.2 }}
      >
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: feature.gradient,
            border: `1px solid ${feature.accent}20`,
          }}
        />

        {/* Shine layer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Top highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}40, transparent)` }}
        />

        {/* Content (lifted via translateZ for depth) */}
        <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(20px)' }}>
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 32 + index * 4, repeat: Infinity, ease: 'linear' }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
            style={{
              width: 52, height: 52,
              borderRadius: '14px',
              background: `${feature.accent}15`,
              border: `1px solid ${feature.accent}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              marginBottom: 4,
            }}
          >
            <img src="/Group.svg" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          </motion.div>

          <h3
            className="text-gray-900 dark:text-white leading-snug mt-2"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', fontWeight: 500 }}
          >
            {feature.title}
          </h3>

          <div
            className="my-3"
            style={{ height: '2px', width: 32, borderRadius: 2, background: `linear-gradient(90deg, ${feature.accent}, transparent)` }}
          />

          <p
            className="text-gray-500 dark:text-gray-400 leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.05vw, 15px)', margin: 0 }}
          >
            {feature.description}
          </p>
        </div>

        {/* Bottom accent dot */}
        <div
          className="absolute bottom-4 right-4"
          style={{
            width: 8, height: 8, borderRadius: '50%',
            background: feature.accent,
            boxShadow: `0 0 12px ${feature.accent}`,
            opacity: 0.7,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      ref={ref}
      className="bg-white dark:bg-[#060c18] section-grid py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-[#1A38E8] dark:text-[#60a0ff] font-semibold text-sm block mb-2">[Features]</span>
          <h2
            className="text-gray-900 dark:text-white"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 300, letterSpacing: '-0.01em' }}
          >
            Why teams choose{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 500 }}>MonkDB</span>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          style={{ perspective: '1200px' }}
        >
          {features.map((feature, i) => (
            <TiltCard key={feature.title} feature={feature} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
