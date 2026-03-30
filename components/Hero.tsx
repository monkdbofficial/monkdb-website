'use client'

import { motion } from 'framer-motion'

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
  'Vector DB', 'Time-Series', 'Geospatial', 'Full-Text Search', 'Streaming SQL', 'Blob Storage', 'Multi-Modal AI',
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
  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: '100vh' }}
    >
      {/* ── LIGHT BEAM ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '30%',
          width: '2px', height: '140%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.06) 80%, transparent 100%)',
          transform: 'rotate(-20deg)',
          filter: 'blur(6px)',
          animation: 'orb-c 16s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '55%',
          width: '1px', height: '120%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.14) 55%, transparent 100%)',
          transform: 'rotate(15deg)',
          filter: 'blur(4px)',
          animation: 'orb-a 20s ease-in-out infinite',
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
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(60,120,255,0.42) 0%, transparent 60%)',
          filter: 'blur(80px)',
          top: '-30%', left: '-18%',
          animation: 'orb-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 550, height: 550,
          background: 'radial-gradient(circle, rgba(80,40,200,0.35) 0%, transparent 60%)',
          filter: 'blur(70px)',
          bottom: '-25%', right: '-12%',
          animation: 'orb-b 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
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
            opacity: 0.92,
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
        className="relative z-10 w-full px-5 sm:px-[6%] lg:px-[12%]"
        style={{ paddingTop: '100px', paddingBottom: '80px' }}
      >
        <div style={{ maxWidth: '750px' }}>

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="mb-5">
            <span className="text-white/85 font-medium" style={{ fontSize: '1.05rem' }}>
              AI-Native Unified Database
            </span>
          </motion.div>

          {/* H1 */}
          <h1
            className="font-bold text-white leading-[1.06] mb-7"
            style={{ fontSize: 'clamp(36px, 6.5vw, 88px)' }}
          >
            <span className="block overflow-hidden">
              {['The', 'AI-Native'].map((w, i) => (
                <motion.span
                  key={w}
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
              {['Unified', 'Database'].map((w, i) => (
                <motion.span
                  key={w}
                  custom={i + 2}
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

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.72)}
            className="text-white/75 leading-relaxed mb-10"
            style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', maxWidth: '540px' }}
          >
            Vector. Time-Series. Geospatial. Document. Blob.{' '}
            Full-Text Search. Streaming SQL.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(1.0)} className="flex flex-wrap gap-4">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: '#EDE8D8', color: '#0A2280', borderRadius: '999px', padding: '14px 36px', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', textDecoration: 'none' }}
            >
              Request Demo
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0A2280', borderRadius: '999px', padding: '14px 36px', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', textDecoration: 'none' }}
            >
              Explore Product
            </motion.a>
          </motion.div>

          {/* Capability chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors cursor-default"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '5px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.02em',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1E8AFF', display: 'inline-block', flexShrink: 0 }} />
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
        className="absolute hidden lg:flex items-center gap-5 bg-white rounded-2xl p-4 shadow-2xl"
        style={{ bottom: '8%', right: '6%', maxWidth: '420px' }}
      >
        <div className="flex-shrink-0 w-[130px] h-[100px] rounded-xl overflow-hidden relative" style={{ background: '#060818' }}>
          <img
            src="/3d-shapes-glowing-with-bright-holographic-colors 1.svg"
            alt="MonkDB visual"
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
          <p className="text-[#0033A0] font-bold text-base mb-1.5 leading-tight">Discover MonkDB</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            MonkDB is your AI-native solution for seamless data integration and actionable insights.
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
        <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
