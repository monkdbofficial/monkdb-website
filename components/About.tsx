'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-white dark:bg-[#0f1623]"
      style={{ padding: '72px 12%' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '42% 1fr',
          gap: '24px',
          alignItems: 'center',
        }}
        className="grid-cols-1 lg:grid"
      >

        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <span
            className="font-semibold text-egyptian-blue"
            style={{ fontSize: '1.1rem', display: 'block', marginBottom: '8px' }}
          >
            [About]
          </span>

          <h2
            className="text-gray-900 dark:text-white leading-[1.12]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)', marginBottom: '28px', fontWeight: 400 }}
          >
            What Makes MonkDB<br />
            The Best Choice For<br />
            Your Enterprise
          </h2>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', gap: '20px' }}>
            <span
              className="font-bold"
              style={{
                fontSize: 'clamp(64px, 7vw, 96px)',
                lineHeight: 1,
                letterSpacing: '-3px',
                color: 'transparent',
                WebkitTextStroke: '3px #1A38E8',
                flexShrink: 0,
              }}
            >
              270k
            </span>
            <span
              className="text-gray-900 dark:text-white font-medium leading-snug"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', flexShrink: 0 }}
            >
              Ai Solution<br />for our clients
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <p
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.35vw, 19px)', margin: 0 }}
          >
            At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data
            management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
          </p>

          <p
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(16px, 1.35vw, 19px)', margin: 0 }}
          >
            At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data
            management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
            MonkDB is our answer: a unified, AI-native database platform built to simplify, consolidate, and empower. At
            Movibase, our journey is deeply personal — born from decades of experience in enterprise systems.
          </p>

          <motion.a
            href="#features"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-medium self-start"
            style={{
              border: '1.5px solid #d1d5db',
              borderRadius: '999px',
              padding: '10px 22px',
              fontSize: '0.88rem',
              textDecoration: 'none',
              marginTop: '4px',
            }}
          >
            Explore more
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
