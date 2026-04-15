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
      className="bg-white dark:bg-[#0f1623] section-grid py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
      <div
        className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-10 lg:gap-16 items-center"
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <span
            className="font-semibold text-egyptian-blue"
            style={{ fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}
          >
            [About]
          </span>

          <h2
            className="leading-[1.12]"
            style={{ fontSize: 'clamp(28px, 4vw, 62px)', marginBottom: '28px', fontWeight: 300, letterSpacing: '-0.01em', textDecoration: 'none' }}
          >
            <span className="text-gray-900 dark:text-white">Your complete </span>
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>data sovereignty</span>
            <span className="text-gray-900 dark:text-white">; secure and intact for an AI-first world</span>
          </h2>

          {/* 270k — animated counter */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '16px', rowGap: '8px' }}>
            <div className="relative overflow-visible" style={{ flexShrink: 0 }}>
              {/* Halo glow behind number */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '-8px',
                  background: 'radial-gradient(circle, rgba(26,56,232,0.12) 0%, transparent 70%)',
                  filter: 'blur(14px)',
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span
                className="relative font-bold"
                style={{
                  fontSize: 'clamp(40px, 5vw, 76px)',
                  lineHeight: 1,
                  letterSpacing: '-1.5px',
                  color: 'transparent',
                  WebkitTextStroke: 'clamp(2px, 0.25vw, 3px) #1A38E8',
                }}
              >
                <Counter to={270} />
              </span>
            </div>
            <span
              className="text-gray-900 dark:text-white font-medium leading-snug"
              style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', flexShrink: 0 }}
            >
              AI-Native Solutions<br />Delivered to Clients
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
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
          >
            The existing data infrastructure is excessively cumbersome, sluggish, and complex,
            making it unsuitable for constructing an AI-native sovereign Data Plane. MonkDB is prepared.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
          >
            MonkDB unifies streams, databases, applications, and models into a single secure data layer —
            with built-in governance, identity, and policy enforcement. Every agent action is authorized
            and compliant before it is executed, giving you full visibility, traceability, and control
            across your AI ecosystem.
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
                fontSize: '0.82rem',
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
      </div>
    </section>
  )
}
