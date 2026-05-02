'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

function PulseDot({ color, delay }: { color: string; delay: number }) {
  return (
    <span style={{ position: 'relative', flexShrink: 0, width: 8, height: 8, marginTop: 5 }}>
      <motion.span
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: color, opacity: 0.35,
        }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
      />
      <span style={{ position: 'absolute', inset: '1px', borderRadius: '50%', background: color }} />
    </span>
  )
}

export default function ROI() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).roi) ?? {}) as Record<string, string>
  const beforeItems = [t.before1, t.before2, t.before3, t.before4, t.before5]
  const afterItems = [t.after1, t.after2, t.after3, t.after4, t.after5]
  const stats = [
    { value: '70%', label: t.stat1Label },
    { value: '5×', label: t.stat2Label },
    { value: '1', label: t.stat3Label },
  ]

  return (
    <section
      id="roi"
      ref={ref}
      className="bg-white dark:bg-[#0f1623] section-grid py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 lg:gap-12 items-center">

        {/* Left: title + stats */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="leading-tight"
            style={{ fontSize: 'clamp(26px, 3.5vw, 52px)', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '32px' }}
          >
            <span className="text-egyptian-blue dark:text-white">{t.titlePart1}</span>
            <br className="hidden lg:block" />
            <span className="text-egyptian-blue dark:text-white">{t.titlePart2}</span>
            <span className="gradient-text-animate">MonkDB</span>
          </motion.h2>

          {/* Stat pills — always 3 in a row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: 'clamp(10px, 1.2vw, 14px) clamp(8px, 1.5vw, 24px)', borderRadius: '14px',
                  border: '1.5px solid rgba(26,56,232,0.15)',
                  background: 'linear-gradient(135deg, rgba(26,56,232,0.04) 0%, rgba(30,138,255,0.07) 100%)',
                  boxShadow: '0 2px 12px rgba(26,56,232,0.06)',
                  cursor: 'default',
                  minWidth: 0,
                }}
              >
                <span
                  style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 600, color: '#1A38E8', lineHeight: 1.1, letterSpacing: '-0.5px' }}
                >
                  {s.value}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-center" style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', marginTop: '4px', lineHeight: 1.3 }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: two cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-0">

          {/* Before card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl lg:rounded-r-none"
            style={{ background: '#EDE8D8', padding: 'clamp(18px, 2.5vw, 32px) clamp(16px, 2vw, 28px)' }}
          >
            <h3 className="text-egyptian-blue" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t.differentiatorsTitle}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {beforeItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: '#374151' }}
                >
                  <PulseDot color="#F59E0B" delay={i * 0.4} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl lg:rounded-l-none"
            style={{ background: '#0A2280', padding: 'clamp(18px, 2.5vw, 32px) clamp(16px, 2vw, 28px)', position: 'relative', zIndex: 1, overflow: 'hidden' }}
          >
            {/* Subtle radial glow */}
            <div style={{
              position: 'absolute', top: '-40%', right: '-30%',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(30,138,255,0.25) 0%, transparent 65%)',
              filter: 'blur(30px)', pointerEvents: 'none',
            }} />
            <h3 className="text-white" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t.afterTitle}
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              {afterItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.07, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: 'rgba(255,255,255,0.88)' }}
                >
                  <PulseDot color="#34D399" delay={i * 0.4 + 0.2} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  )
}
