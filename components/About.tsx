'use client'

import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || !ref.current) return
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        if (ref.current) ref.current.textContent = Math.floor(val) + 'k'
      },
    })
    return () => controls.stop()
  }, [isInView, to])

  return (
    <>
      <span ref={inViewRef} style={{ position: 'absolute', pointerEvents: 'none' }} />
      <span ref={ref}>0k</span>
    </>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid px-5 sm:px-[6%] lg:px-[12%] py-10 sm:py-14 lg:py-[72px]"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-8 lg:gap-6 items-center"
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
            style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', marginBottom: '28px', fontWeight: 400 }}
          >
            What Makes MonkDB<br />
            The Best Choice For<br />
            Your Enterprise
          </h2>

          {/* 270k — animated counter */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', gap: '20px' }}>
            <span
              className="font-bold"
              style={{
                fontSize: 'clamp(52px, 7vw, 96px)',
                lineHeight: 1,
                letterSpacing: '-3px',
                color: 'transparent',
                WebkitTextStroke: '3px #1A38E8',
                flexShrink: 0,
              }}
            >
              <Counter to={270} />
            </span>
            <span
              className="text-gray-900 dark:text-white font-medium leading-snug"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', flexShrink: 0 }}
            >
              Ai Solution<br />for our clients
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.35vw, 19px)', margin: 0 }}
          >
            At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data
            management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.35vw, 19px)', margin: 0 }}
          >
            At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data
            management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
            MonkDB is our answer: a unified, AI-native database platform built to simplify, consolidate, and empower. At
            Movibase, our journey is deeply personal — born from decades of experience in enterprise systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
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

      </div>
    </section>
  )
}
