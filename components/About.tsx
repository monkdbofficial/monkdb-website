'use client'

import { motion, useInView, animate } from 'framer-motion'
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
      className="section-grid py-10 sm:py-14 lg:py-16"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f6ff 50%, #ffffff 100%)' }}
    >
      {/* Subtle color orbs for light mode */}
      <div className="absolute pointer-events-none dark:hidden" style={{
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,56,232,0.05) 0%, transparent 65%)',
        filter: 'blur(80px)', top: '-10%', right: '10%',
      }} />
      <div className="absolute pointer-events-none dark:hidden" style={{
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,60,220,0.04) 0%, transparent 65%)',
        filter: 'blur(60px)', bottom: '-10%', left: '5%',
      }} />

      <div className="relative max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-10 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span
              className="font-semibold text-egyptian-blue"
              style={{ fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}
            >
              [About]
            </span>

            <h2
              className="leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 4vw, 62px)', marginBottom: '32px', fontWeight: 300, letterSpacing: '-0.015em' }}
            >
              <span className="text-gray-900 dark:text-white">Your complete </span>
              <span className="gradient-text-animate" style={{ fontWeight: 500 }}>data sovereignty</span>
              <span className="text-gray-900 dark:text-white">, engineered for the AI-native era</span>
            </h2>

            {/* Animated counter */}
            <div className="flex flex-row items-center flex-wrap gap-4" style={{ rowGap: '8px' }}>
              <div className="relative overflow-visible" style={{ flexShrink: 0 }}>
                {/* Halo glow */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '-12px',
                    background: 'radial-gradient(circle, rgba(96,160,255,0.15) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span
                  className="relative font-bold"
                  style={{
                    fontSize: 'clamp(42px, 5.5vw, 80px)',
                    lineHeight: 1,
                    letterSpacing: '-2px',
                    background: 'linear-gradient(135deg, #1A38E8, #60a0ff, #00c2ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <Counter to={270} />
                </span>
              </div>
              <span
                className="text-gray-700 dark:text-white font-medium leading-snug"
                style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', flexShrink: 0 }}
              >
                AI-Native Solutions<br />Delivered to Clients
              </span>
            </div>

            {/* Divider */}
            <div style={{
              height: 1, marginTop: 28,
              background: 'linear-gradient(90deg, rgba(26,56,232,0.3), rgba(96,160,255,0.15), transparent)',
              maxWidth: 320,
            }} />
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
            >
              The existing data infrastructure is excessively cumbersome, sluggish, and complex,
              making it unsuitable for constructing an AI-native sovereign Data Plane. MonkDB is prepared.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
            >
              MonkDB unifies streams, databases, applications, and models into a single secure data layer,
              with built-in governance, identity, and policy enforcement. Every agent action is authorized
              and compliant before it is executed.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-2 mt-1"
            >
              {['Governed Access', 'Real-Time Streaming', 'Full Traceability', 'Agent-Ready'].map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: '999px',
                    border: '1px solid rgba(26,56,232,0.18)',
                    background: 'rgba(26,56,232,0.05)',
                    color: '#1A38E8',
                    fontSize: '0.75rem', fontWeight: 500,
                  }}
                >
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: i % 2 === 0 ? '#1A38E8' : '#60a0ff',
                    display: 'inline-block',
                  }} />
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <motion.a
                href="#features"
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 8px 24px rgba(26,56,232,0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 font-medium self-start"
                style={{
                  background: 'linear-gradient(135deg, #1A38E8, #60a0ff)',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '11px 24px',
                  fontSize: '0.84rem',
                  textDecoration: 'none',
                  marginTop: '4px',
                  boxShadow: '0 4px 16px rgba(26,56,232,0.25)',
                }}
              >
                Explore Features
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
