'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

const wordReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

const CHIPS = [
  'Vector',
  'Time-Series',
  'Geospatial',
  'Full-Text Search',
  'Document / JSON',
  'Streaming SQL',
  'Blob Storage',
  'Graph',
  'Multi-Modal AI',
]

// Pre-defined particles — no Math.random to avoid hydration issues
const PARTICLES = [
  { left: '5%',  delay: 0,   dur: 14, size: 3   },
  { left: '13%', delay: 2.8, dur: 11, size: 2.5 },
  { left: '24%', delay: 0.6, dur: 16, size: 4   },
  { left: '38%', delay: 3.2, dur: 13, size: 2   },
  { left: '50%', delay: 1.4, dur: 15, size: 3   },
  { left: '62%', delay: 4.1, dur: 12, size: 2.5 },
  { left: '74%', delay: 0.9, dur: 14, size: 3   },
  { left: '86%', delay: 2.2, dur: 11, size: 2   },
  { left: '30%', delay: 5.0, dur: 13, size: 2.5 },
  { left: '79%', delay: 3.7, dur: 16, size: 3   },
  { left: '45%', delay: 6.2, dur: 12, size: 2   },
  { left: '92%', delay: 1.8, dur: 15, size: 4   },
]

export default function Hero() {
  const { dict, locale } = useI18n()
  const t = dict.hero as Record<string, string>
  const contactHref = localizedHref('/company/contact', locale)
  const titleWordsLine1 = t.titleLine1.split(/\s+/).filter(Boolean)
  const titleWordsLine2 = t.titleLine2.split(/\s+/).filter(Boolean)

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: '100vh' }}
    >
      {/* ── LIGHT BEAM — subtle, single ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '38%',
          width: '1px', height: '140%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.08) 55%, transparent 100%)',
          transform: 'rotate(-18deg)',
          filter: 'blur(8px)',
          animation: 'orb-c 22s ease-in-out infinite',
        }}
      />

      {/* ── BLUE BASE GRADIENT ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#1A38E8',
          backgroundImage: `
            radial-gradient(ellipse 65% 60% at 100% 0%,   #050D6A 0%, #0A1A9A 30%, transparent 62%),
            radial-gradient(ellipse 45% 55% at 100% 100%, #071480 0%, transparent 55%),
            radial-gradient(ellipse 55% 50% at 0%   70%,  #1E44F5 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 50%  0%,   #1230CC 0%, transparent 50%)
          `,
        }}
      />

      {/* ── ANIMATED GRADIENT ORBS ── */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 'clamp(360px, 55vw, 700px)', height: 'clamp(360px, 55vw, 700px)',
          background: 'radial-gradient(circle, rgba(60,120,255,0.42) 0%, transparent 60%)',
          filter: 'blur(80px)',
          top: '-30%', left: '-18%',
          animation: 'orb-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 'clamp(300px, 45vw, 550px)', height: 'clamp(300px, 45vw, 550px)',
          background: 'radial-gradient(circle, rgba(80,40,200,0.35) 0%, transparent 60%)',
          filter: 'blur(70px)',
          bottom: '-25%', right: '-12%',
          animation: 'orb-b 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full hidden sm:block"
        style={{
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(100,160,255,0.32) 0%, transparent 65%)',
          filter: 'blur(50px)',
          top: '15%', right: '22%',
          animation: 'orb-c 14s ease-in-out infinite',
        }}
      />

      {/* ── MASK GROUP SVG (Sree's pattern) — animated float ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ backgroundColor: '#1A38E8' }}
      >
        <motion.img
          src="/Mask group.svg"
          alt=""
          initial={{ scale: 1.05 }}
          animate={{
            y: [0, -18, 0],
            scale: [1.05, 1.08, 1.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            objectPosition: 'center',
            mixBlendMode: 'luminosity',
            opacity: 0.55,
          }}
        />
      </div>

      {/* ── BLUE COLOR OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#1535CC', mixBlendMode: 'color', opacity: 0.72 }}
      />

      {/* ── ANIMATED DOT GRID OVERLAY (hero version — white dots) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          animation: 'grid-drift 10s linear infinite',
        }}
      />

      {/* ── RISING PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: '-8px',
              width: p.size,
              height: p.size,
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 8px rgba(255,255,255,0.7), 0 0 16px rgba(180,200,255,0.4)',
              animation: `particle-rise ${p.dur}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative z-10 w-full max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-[120px] sm:pt-[140px] lg:pt-[150px] pb-8 sm:pb-12 lg:pb-14"
      >
        <div style={{ maxWidth: '750px' }}>

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="mb-4 sm:mb-5">
            <span
              className="inline-flex items-center gap-2 text-white/90"
              style={{
                fontSize: 'clamp(0.7rem, 0.95vw, 0.82rem)',
                fontWeight: 500,
                padding: '5px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px rgba(52,211,153,0.6)' }} />
              {t.badge}
            </span>
          </motion.div>

          {/* H1 */}
          <h1
            className="text-white mb-4 sm:mb-7"
            style={{ fontSize: 'clamp(34px, 6vw, 88px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', textDecoration: 'none' }}
          >
            <span className="block overflow-hidden">
              {titleWordsLine1.map((w, i) => (
                <motion.span
                  key={`l1-${i}-${w}`}
                  custom={i}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {titleWordsLine2.map((w, i) => (
                <motion.span
                  key={`l2-${i}-${w}`}
                  custom={i + titleWordsLine1.length}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle (line beneath the H1) */}
          <motion.p
            {...fadeUp(0.72)}
            className="text-white/75 leading-relaxed mb-6 sm:mb-8 w-full"
            style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', maxWidth: '620px' }}
          >
            {t.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(0.86)} className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
            <motion.a
              href={contactHref}
              whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                backgroundColor: '#ffffff',
                color: '#0A2280',
                borderRadius: '999px',
                padding: '12px 26px',
                fontWeight: 600,
                fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)',
                letterSpacing: '-0.005em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.08)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {t.ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
            <motion.a
              href="#features-banner"
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.14)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '11px 24px',
                fontWeight: 500,
                fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)',
                letterSpacing: '-0.005em',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.24)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {t.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Capability chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.06, duration: 0.4 }}
                whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.16)', borderColor: 'rgba(255,255,255,0.42)' }}
                className="inline-flex items-center gap-1.5 text-white/90 transition-colors cursor-default"
                style={{
                  fontSize: 'clamp(0.7rem, 0.85vw, 0.78rem)',
                  fontWeight: 500,
                  padding: '5px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.28)',
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7FB3FF', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 6px rgba(127,179,255,0.7)' }} />
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── DISCOVER MONKDB CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="absolute hidden xl:flex items-center gap-5 bg-white rounded-2xl p-4 shadow-2xl"
        style={{ bottom: '8%', right: '40px', maxWidth: '380px' }}
      >
        <div className="flex-shrink-0 w-[130px] h-[100px] rounded-xl overflow-hidden relative" style={{ background: '#060818' }}>
          <img
            src="/3d-shapes-glowing-with-bright-holographic-colors 1.svg"
            alt={t.visualAlt ?? 'MonkDB visual'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <button className="text-white/90 hover:text-white transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
            </button>
            <motion.button
              className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center backdrop-blur-sm border border-white/40 text-white"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="10" height="12" viewBox="0 0 9 11" fill="currentColor"><path d="M1 1l7 4.5-7 4.5V1z" /></svg>
            </motion.button>
            <button className="text-white/90 hover:text-white transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-8.14 5.02 2.14L8 14.14V9.86z" /></svg>
            </button>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0033A0] text-base mb-1.5 leading-tight" style={{ fontWeight: 500 }}>{t.discoverTitle}</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {t.discoverDescription}
          </p>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5">
          <motion.div
            className="w-[3px] h-[8px] rounded-full bg-white/60"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-white/30 text-[10px] tracking-widest uppercase">{t.scroll}</span>
      </motion.div>
    </section>
  )
}
