'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).about) ?? {}) as Record<string, string>
  const tags = [t.tag1, t.tag2, t.tag3, t.tag4]

  return (
    <section
      id="about"
      ref={ref}
      className="section-grid py-10 sm:py-14 lg:py-16"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f6ff 50%, #ffffff 100%)' }}
    >
      {/* Subtle color orbs for light mode */}
      <div className="absolute pointer-events-none dark:hidden hidden sm:block" style={{
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,56,232,0.05) 0%, transparent 65%)',
        filter: 'blur(80px)', top: '-10%', right: '10%',
      }} />
      <div className="absolute pointer-events-none dark:hidden hidden sm:block" style={{
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
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1A38E8',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background:
                    'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
                }}
              />
            </div>

            <h2
              className="leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 4vw, 62px)', marginBottom: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, letterSpacing: '-0.015em', textWrap: 'balance', maxWidth: 'clamp(280px, 90%, 520px)' }}
            >
              <span className="text-gray-900 dark:text-white">{t.titlePart1}</span>
              <span className="gradient-text-animate" style={{ fontWeight: 500 }}>{t.titleAccent}</span>
              <span className="text-gray-900 dark:text-white">{t.titlePart2}</span>
            </h2>

            {/* Divider */}
            <div style={{
              height: 1, marginTop: 8,
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
              {t.para1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
            >
              {t.para2}
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-2 mt-1"
            >
              {tags.map((tag, i) => (
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
                {t.cta}
                <ArrowUpRight size={15} />
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
