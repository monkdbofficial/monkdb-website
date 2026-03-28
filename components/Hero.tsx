'use client'

import { motion } from 'framer-motion'

/* ── Animation helpers ── */
const word = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, delay: 0.3 + i * 0.12, ease: 'easeOut' as const },
  }),
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: 'easeOut' as const },
})

/* ── Floating data nodes ── */
const nodes = [
  { x: '72%', y: '18%', label: 'Vector', size: 44, delay: 0.8 },
  { x: '82%', y: '45%', label: 'SQL', size: 38, delay: 1.1 },
  { x: '65%', y: '68%', label: 'TS', size: 34, delay: 1.4 },
  { x: '88%', y: '70%', label: 'GIS', size: 36, delay: 1.7 },
  { x: '58%', y: '35%', label: 'DOC', size: 32, delay: 2.0 },
]

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* ── BASE GRADIENT ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#1535E5',
          backgroundImage: `
            radial-gradient(ellipse 70% 70% at 100% 0%,  #00085A 0%, #000E80 28%, transparent 62%),
            radial-gradient(ellipse 55% 50% at 15% 55%,  #2248FF 0%, transparent 58%),
            radial-gradient(ellipse 40% 40% at 50% 100%, #0D28C8 0%, transparent 55%)
          `,
        }}
      />

      {/* ── ANIMATED DARK TOP-RIGHT VIGNETTE (slow pulse) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 65% 65% at 100% 0%, rgba(0,4,50,0.75) 0%, transparent 60%)',
        }}
        animate={{ opacity: [1, 0.75, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── FINE FABRIC / WEAVE TEXTURE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,   transparent 0px, transparent 3px, rgba(255,255,255,0.026) 3px, rgba(255,255,255,0.026) 4px),
            repeating-linear-gradient(90deg,  transparent 0px, transparent 3px, rgba(255,255,255,0.026) 3px, rgba(255,255,255,0.026) 4px)
          `,
        }}
      />

      {/* ── FLOWING SILK WAVES (SVG, animated drift) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Wave 1 — main wide glow */}
        <motion.path
          d="M-100 720 C200 520 520 210 920 105 C1110 55 1310 85 1600 22"
          stroke="rgba(180,210,255,0.42)" strokeWidth="90" strokeLinecap="round"
          style={{ filter: 'blur(30px)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: 'easeInOut' as const, delay: 0.2 }}
        />
        {/* Wave 1 — sharp bright core */}
        <motion.path
          d="M-100 720 C200 520 520 210 920 105 C1110 55 1310 85 1600 22"
          stroke="rgba(230,242,255,0.32)" strokeWidth="16" strokeLinecap="round"
          style={{ filter: 'blur(4px)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: 'easeInOut' as const, delay: 0.45 }}
        />

        {/* Wave 2 — secondary */}
        <motion.path
          d="M-100 870 C310 660 620 380 1020 262 C1210 202 1390 228 1600 165"
          stroke="rgba(155,195,255,0.28)" strokeWidth="65" strokeLinecap="round"
          style={{ filter: 'blur(25px)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.1, ease: 'easeInOut' as const, delay: 0.55 }}
        />
        <motion.path
          d="M-100 870 C310 660 620 380 1020 262 C1210 202 1390 228 1600 165"
          stroke="rgba(200,225,255,0.18)" strokeWidth="10" strokeLinecap="round"
          style={{ filter: 'blur(3px)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.1, ease: 'easeInOut' as const, delay: 0.75 }}
        />

        {/* Wave 3 — faint third wave */}
        <motion.path
          d="M200 970 C500 790 760 558 1110 428 C1290 365 1430 395 1600 348"
          stroke="rgba(135,175,255,0.16)" strokeWidth="48" strokeLinecap="round"
          style={{ filter: 'blur(20px)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.4, ease: 'easeInOut' as const, delay: 0.85 }}
        />
      </svg>

      {/* ── FLOATING DATA NODES (enterprise tech aesthetic) ── */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute hidden lg:flex items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm text-white/70 font-mono font-semibold"
          style={{
            left: node.x, top: node.y,
            width: node.size, height: node.size,
            fontSize: node.size * 0.28,
            background: 'rgba(255,255,255,0.07)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.75, 0.55],
            scale: [0.5, 1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: node.delay },
            scale:   { duration: 0.8, delay: node.delay },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: node.delay + 0.8 },
          }}
        >
          {node.label}
          {/* outer ring pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/15"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: node.delay + 1 }}
          />
        </motion.div>
      ))}

      {/* ── AMBIENT GLOW ORBS ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden lg:block"
        style={{
          width: 500, height: 500, top: '-8%', right: '8%',
          background: 'radial-gradient(circle, rgba(80,130,255,0.28) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── PARTICLES ── */}
      {[
        { size: 2.5, top: '24%', left: '19%', delay: 0 },
        { size: 3.5, top: '58%', left: '44%', delay: 1.6 },
        { size: 2,   top: '38%', left: '70%', delay: 3.2 },
        { size: 3,   top: '76%', left: '56%', delay: 2.1 },
        { size: 4,   top: '44%', left: '84%', delay: 0.9 },
        { size: 2,   top: '70%', left: '11%', delay: 4.2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-40 pb-24 lg:pt-52 lg:pb-36">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2.5 mb-6">
            <motion.span
              className="w-2 h-2 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/75 text-sm font-medium tracking-widest uppercase">
              AI-Native Unified Database
            </span>
          </motion.div>

          {/* H1 — word by word animation */}
          <h1
            className="font-bold text-white leading-[1.06] mb-8"
            style={{ fontSize: 'clamp(50px, 6.2vw, 84px)' }}
          >
            {/* Line 1 */}
            <span className="block overflow-hidden">
              {['The', 'AI-Native'].map((w, i) => (
                <motion.span
                  key={w}
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden">
              {['Unified', 'Database'].map((w, i) => (
                <motion.span
                  key={w}
                  custom={i + 2}
                  variants={word}
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
            className="text-white/70 text-base sm:text-[1.1rem] leading-relaxed mb-10 max-w-lg"
          >
            Vector. Time-Series. Geospatial. Document. Blob.{' '}
            Full-Text Search. Streaming SQL.
          </motion.p>

          {/* Stats row */}
          <motion.div {...fadeUp(0.88)} className="flex items-center gap-8 mb-10">
            {[
              { value: '270k+', label: 'Enterprises' },
              { value: '7+',    label: 'Data Models' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-white font-bold text-xl">{s.value}</span>
                <span className="text-white/50 text-xs tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(1.0)} className="flex flex-wrap gap-4">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#F8F4F0] text-[#0033A0] font-bold text-sm shadow-xl hover:bg-white transition-colors duration-200"
            >
              Request Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="#0033A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white/10 border border-white/30 text-white font-bold text-sm backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-200"
            >
              Explore Product
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── DISCOVER MONKDB CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' as const }}
        className="absolute bottom-10 right-8 lg:right-14 hidden lg:flex items-start gap-4 bg-white rounded-2xl p-5 shadow-2xl max-w-[360px]"
      >
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-[92px] h-[72px] rounded-xl overflow-hidden relative bg-[#0a0a2e]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 opacity-80 blur-[3px] absolute" />
            <motion.div
              className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                <path d="M1 1l8 5-8 5V1z"/>
              </svg>
            </motion.div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0033A0] font-bold text-sm mb-1.5">Discover MonkDB</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            MonkDB is your AI-native solution for seamless data integration and actionable insights.
          </p>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5"
        >
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
