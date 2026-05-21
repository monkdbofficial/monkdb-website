'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ArrowUpRight, TimerReset, CirclePlay, BrainCircuit, Layers, Zap, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollToTop from '@/components/ScrollToTop'
import PageBanner from '@/components/PageBanner'
import AnimatedSVGImage from '@/components/AnimatedSVGImage'
import BgPattern from '@/components/effects/BgPattern'
import { renderBrand } from '@/components/BrandAccent'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

/* ─── Particle network background (canvas) ────────────────────────────── */
function ParticleNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    interface Particle {
      loc: { x: number; y: number }
      rad: number
      sp: number
      ang: number
      r: number
      g: number
      b: number
    }

    // Cyan/blue palette only — matches image #6 palette
    const randColor = () => ({
      r: Math.round(Math.random() * 20),           // near-zero red
      g: Math.round(Math.random() * 70 + 150),     // 150–220 green → cyan
      b: Math.round(Math.random() * 35 + 220),     // 220–255 blue
    })

    const parts: Particle[] = []
    for (let i = 0; i < 40; i++) {
      const c = randColor()
      parts.push({
        loc: { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
        rad: 0,
        sp: 1.2,
        ang: Math.random() * 360,
        r: c.r, g: c.g, b: c.b,
      })
    }

    let rafId: number
    let visible = true

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(canvas)

    const draw = () => {
      rafId = requestAnimationFrame(draw)
      if (!visible) return

      const w = canvas.width
      const h = canvas.height

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(16, 64, 208, 0.35)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        ctx.fillStyle = 'rgba(255,255,255,1)'
        ctx.fillRect(p.loc.x, p.loc.y, p.rad, p.rad)

        for (let n = i + 1; n < parts.length; n++) {
          const p2 = parts[n]
          const dx = p.loc.x - p2.loc.x
          const dy = p.loc.y - p2.loc.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > 220) continue
          const d2 = Math.pow(0.5, Math.round(d / 100))
          ctx.beginPath()
          ctx.lineWidth = 1
          ctx.moveTo(p.loc.x, p.loc.y)
          ctx.lineTo(p2.loc.x, p2.loc.y)
          ctx.strokeStyle = `rgba(${Math.round(p.r * d2)}, ${Math.round(p.g * d2)}, ${Math.round(p.b * d2)}, 0.12)`
          ctx.stroke()
        }

        p.loc.x += p.sp * Math.cos((p.ang * Math.PI) / 180)
        p.loc.y += p.sp * Math.sin((p.ang * Math.PI) / 180)

        let con = false
        if (p.loc.x < 0) { con = true; p.loc.x = 0; p.ang = p.ang < 180 ? 180 - p.ang : 360 - (p.ang - 180) }
        if (p.loc.x > w) { con = true; p.loc.x = w; p.ang = p.ang < 180 ? 180 - p.ang : 180 + (360 - p.ang) }
        if (p.loc.y < 0) { con = true; p.loc.y = 0; p.ang = p.ang < 180 ? 180 - p.ang : 180 + (180 - p.ang) }
        if (p.loc.y > h) { con = true; p.loc.y = h; p.ang = p.ang > 270 ? 360 - p.ang : 180 - (p.ang - 180) }
        if (con) { const c = randColor(); p.r = c.r; p.g = c.g; p.b = c.b }
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

/* ─── Spider-net canvas animation ─────────────────────────────────────── */
function SpiderNetBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    interface Node { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = []

    const init = () => {
      nodes.length = 0
      const rect = canvas.getBoundingClientRect()
      for (let i = 0; i < 55; i++) {
        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        })
      }
    }
    init()

    let rafId: number
    const draw = () => {
      rafId = requestAnimationFrame(draw)
      if (!visible) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0) n.x = w
        if (n.x > w) n.x = 0
        if (n.y < 0) n.y = h
        if (n.y > h) n.y = 0
      }

      // Draw connecting lines — crisp, thin, elegant
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 180) continue
          const alpha = (1 - dist / 180) * 0.25
          ctx.beginPath()
          ctx.strokeStyle = `rgba(180,220,255,${alpha})`
          ctx.lineWidth = 0.6
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      // Draw nodes — small glowing dots
      for (const n of nodes) {
        // outer glow ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180,220,255,0.06)'
        ctx.fill()
        // inner bright dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(220,240,255,0.55)'
        ctx.fill()
      }
    }

    draw()
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

/* ─── Animated counter ─────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!isInView || !ref.current) return
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        if (ref.current) ref.current.textContent = Math.floor(val) + suffix
      },
    })
    return () => controls.stop()
  }, [isInView, to, suffix])

  return (
    <>
      <span ref={inViewRef} aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none' }} />
      <span ref={ref}>0{suffix}</span>
    </>
  )
}


/* ─── Main page ─────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const { dict, locale } = useI18n()
  const contactHref = localizedHref('/company/contact', locale)
  const t = (((dict as Record<string, unknown>).aboutPage) ?? {}) as Record<string, string>
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })

  const storyRef = useRef(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ══════════════════════════════════════════
          PAGE BANNER — flush with top; title clears navbar internally
      ══════════════════════════════════════════ */}
      <PageBanner />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="section-grid bg-white dark:bg-[#0f1623] pt-10 sm:pt-14 lg:pt-20 pb-10 sm:pb-16 lg:pb-20"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span
                  className="font-semibold text-egyptian-blue dark:text-blue-400"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                >
                  [{t.kicker ?? 'About Us'}]
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
              <h1
                className="text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(28px, 3.6vw, 54px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 0, textDecoration: 'none', letterSpacing: '-0.012em', textWrap: 'balance', maxWidth: 'clamp(280px, 95%, 560px)' }}
              >
                {renderBrand(t.heroTitle ?? 'What makes MonkDB the best choice for your enterprise')}
              </h1>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                style={{ fontSize: 'clamp(14px, 1.3vw, 18px)', margin: 0 }}
              >
                {t.heroBody ?? ''}
              </p>
              <motion.a
                href="#story"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center text-white font-semibold self-start"
                style={{
                  background: '#1A38E8',
                  borderRadius: '999px',
                  padding: 'clamp(12px, 1.2vw, 16px) clamp(20px, 2vw, 32px)',
                  fontSize: 'clamp(0.82rem, 1vw, 1rem)',
                  textDecoration: 'none',
                  gap: 'clamp(12px, 2vw, 28px)',
                  boxShadow: '0 8px 24px rgba(10,20,80,0.25)',
                }}
              >
                {t.heroCta ?? 'Discover'}
                <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — MANIFESTO + TRUST METRICS
          Enterprise rebuild: two-column on desktop. Pull-quote left,
          outline-stroke stat numerals right. No redundant CTAs.
      ══════════════════════════════════════════ */}
      <section className="relative py-10 sm:py-14 lg:py-20 overflow-hidden bg-[#F8F4F0] dark:bg-[#0f1623]">
        <BgPattern
          variant="grid"
          mask="fade-edges"
          size={56}
          fill="rgba(10,34,128,0.06)"
        />

        <div className="relative max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16 items-start">

            {/* ── LEFT: eyebrow + manifesto statement ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-3 mb-6 sm:mb-8"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#1A38E8',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.manifestoKicker ?? 'Why MonkDB exists'}
                </span>
                <div
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    height: '1px',
                    background:
                      'linear-gradient(90deg, rgba(10,34,128,0.28), transparent)',
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(24px, 3.2vw, 52px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.018em',
                  margin: 0,
                  textWrap: 'balance',
                  maxWidth: 'clamp(320px, 100%, 720px)',
                }}
              >
                {t.manifestoPart1 ?? 'Every other system stops at the database.'}{' '}
                <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
                  {t.manifestoAccent ?? 'MonkDB executes.'}
                </span>{' '}
                {t.manifestoPart2 ?? 'One engine. One trust boundary. Every workload your AI-native enterprise needs to run, in real time.'}
              </motion.p>
            </div>

            {/* ── RIGHT: 4 trust metrics, outline-stroke numerals ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-12 lg:gap-x-12 lg:gap-y-14"
            >
              {[
                { value: t.trustStat1Value ?? '9', label: t.trustStat1Label ?? 'Workloads, one binary' },
                { value: t.trustStat2Value ?? '<5ms', label: t.trustStat2Label ?? 'p99 vector + SQL + streaming' },
                { value: t.trustStat3Value ?? '100PB+', label: t.trustStat3Label ?? 'Cluster scale, proven' },
                { value: t.trustStat4Value ?? 'SOC 2', label: t.trustStat4Label ?? 'ISO 27001, GDPR ready' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-start"
                  style={{ borderTop: '1px solid rgba(10,34,128,0.18)', paddingTop: 'clamp(14px, 1.4vw, 20px)' }}
                >
                  <span
                    aria-label={m.value}
                    style={{
                      fontSize: 'clamp(40px, 5.5vw, 86px)',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-3px',
                      color: 'transparent',
                      WebkitTextStroke: '1px #1A38E8',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(12px, 0.95vw, 14px)',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      lineHeight: 1.45,
                      marginTop: 'clamp(10px, 1vw, 14px)',
                      maxWidth: '220px',
                    }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — STORY / MISSION
      ══════════════════════════════════════════ */}
      <section
        id="story"
        ref={storyRef}
        className="section-grid bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-8 sm:gap-12 lg:gap-20 items-center">

            {/* Left: orbital data-plane diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center order-2 lg:order-1"
            >
              <div className="relative flex items-center justify-center w-full max-w-[220px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[420px] mx-auto" style={{ aspectRatio: '1 / 1' }}>
                {/* Animated halo */}
                <motion.div
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: '12%',
                    background:
                      'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)',
                    filter: 'blur(24px)',
                  }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <svg
                  viewBox="0 0 400 400"
                  className="relative w-full h-full"
                  aria-hidden="true"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id="story-ring-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1A38E8" stopOpacity="0.65" />
                      <stop offset="60%" stopColor="#1A38E8" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1A38E8" stopOpacity="0.05" />
                    </linearGradient>
                    <radialGradient id="story-core-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1A38E8" />
                      <stop offset="70%" stopColor="#0A2280" />
                      <stop offset="100%" stopColor="#050D6A" />
                    </radialGradient>
                  </defs>

                  {/* Slow-rotating outer ring + dashed mid ring */}
                  <motion.g
                    animate={storyInView ? { rotate: 360 } : {}}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 200px' }}
                  >
                    <circle cx="200" cy="200" r="178" fill="none" stroke="url(#story-ring-grad)" strokeWidth="1.5" />
                    <circle cx="200" cy="200" r="178" fill="none" stroke="rgba(26,56,232,0.18)" strokeWidth="0.75" strokeDasharray="2 6" />
                  </motion.g>

                  {/* Counter-rotating middle ring with orbital nodes */}
                  <motion.g
                    animate={storyInView ? { rotate: -360 } : {}}
                    transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 200px' }}
                  >
                    <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(26,56,232,0.22)" strokeWidth="1" strokeDasharray="3 5" />
                    {/* 6 orbital nodes evenly placed on the middle ring — precomputed for SSR stability */}
                    {[
                      { cx: 330, cy: 200 },
                      { cx: 265, cy: 87.42 },
                      { cx: 135, cy: 87.42 },
                      { cx: 70, cy: 200 },
                      { cx: 135, cy: 312.58 },
                      { cx: 265, cy: 312.58 },
                    ].map((n, i) => (
                      <g key={i}>
                        <circle cx={n.cx} cy={n.cy} r="9" fill="rgba(255,255,255,1)" stroke="#1A38E8" strokeWidth="1.5" />
                        <circle cx={n.cx} cy={n.cy} r="3.5" fill="#1A38E8" />
                      </g>
                    ))}
                  </motion.g>

                  {/* Static inner ring */}
                  <circle cx="200" cy="200" r="84" fill="none" stroke="rgba(26,56,232,0.30)" strokeWidth="1.25" />

                  {/* Core sphere */}
                  <circle cx="200" cy="200" r="52" fill="url(#story-core-grad)" />
                  <circle cx="200" cy="200" r="52" fill="none" stroke="rgba(127,179,255,0.45)" strokeWidth="1" />

                  {/* Subtle hairline diameter ticks */}
                  <line x1="22" y1="200" x2="62" y2="200" stroke="rgba(10,34,128,0.15)" strokeWidth="1" />
                  <line x1="338" y1="200" x2="378" y2="200" stroke="rgba(10,34,128,0.15)" strokeWidth="1" />
                  <line x1="200" y1="22" x2="200" y2="62" stroke="rgba(10,34,128,0.15)" strokeWidth="1" />
                  <line x1="200" y1="338" x2="200" y2="378" stroke="rgba(10,34,128,0.15)" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>

            {/* Right: quote + MonkDB pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-8 order-1 lg:order-2"
            >
              <div className="flex flex-col gap-3">
                <span
                  className="font-semibold text-egyptian-blue dark:text-blue-400"
                  style={{ fontSize: '0.75rem', display: 'block', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  [{t.storyKicker ?? 'Our Story'}]
                </span>
                <p
                  className="text-gray-900 dark:text-white"
                  style={{ fontSize: 'clamp(18px, 2.4vw, 38px)', fontWeight: 300, lineHeight: 1.22, margin: 0, letterSpacing: '-0.01em', textWrap: 'balance' }}
                >
                  {renderBrand(t.storyTextStart ?? 'At MonkDB,')}{' '}
                  <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
                    {t.storyTextAccent ?? 'our journey is deeply personal'}
                  </span>
                  {', '}{t.storyTextEnd ?? 'born from decades of experience in enterprise systems, data management, and AI.'}
                </p>
              </div>

              {/* Value-prop pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  t.storyPill1 ?? 'AI-native',
                  t.storyPill2 ?? 'Sovereign by design',
                  t.storyPill3 ?? 'Enterprise-grade',
                ].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="inline-flex items-center gap-2"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: '1px solid rgba(26,56,232,0.22)',
                      background: 'rgba(26,56,232,0.04)',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#1A38E8',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 'clamp(12px, 0.95vw, 14px)',
                        fontWeight: 500,
                        color: '#0A2280',
                        letterSpacing: '0.005em',
                      }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SECTION 6 — SERVICES
      ══════════════════════════════════════════ */}
      <section className="section-grid py-10 sm:py-14 lg:py-20 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 lg:mb-14"
          >
            <div>
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.75rem', display: 'block', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [{t.servicesKicker ?? 'Services'}]
              </span>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 'clamp(580px, 75vw, 1040px)', textWrap: 'balance' }}
              >
                {t.servicesTitle ?? 'Special database features for your services'}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:pb-2">
              <p
                className="text-gray-500 dark:text-gray-400"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', maxWidth: '240px', margin: 0, lineHeight: 1.6 }}
              >
                {t.servicesIntro ?? 'At MonkDB, our journey is deeply personal'}
              </p>
              <motion.a
                href="#story"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-medium text-gray-900 dark:text-white flex-shrink-0 border border-gray-300 dark:border-white/20 rounded-full"
                style={{
                  padding: '10px 22px',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                {t.servicesCta ?? 'Explore more'}
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>

          {/* Bento grid — 3 cols, right col has 2 stacked rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

            {/* CARD 1 — dark navy, globe image */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative sm:col-span-1 lg:row-span-2 rounded-[20px] overflow-hidden flex flex-col"
              style={{ minHeight: 'clamp(200px, 30vw, 460px)', background: 'linear-gradient(160deg, #0A2280 0%, #1A38E8 100%)' }}
            >
              <div className="flex-1 flex items-start justify-center pointer-events-none" style={{ overflow: 'hidden' }}>
                <AnimatedSVGImage
                  src="/AdobeStock_588310019 1.svg"
                  style={{ width: '90%', height: 'auto', objectFit: 'contain', display: 'block', marginTop: '-5%' }}
                />
              </div>
              <div style={{ padding: `0 clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 32px)`, paddingRight: 'clamp(78px, 16%, 100px)' }}>
                <h3 className="text-white leading-snug" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 400, marginBottom: '8px' }}>
                  {t.card1Title ?? 'Unified Data Platform'}
                </h3>
                <p className="text-blue-200 leading-relaxed" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', margin: 0, opacity: 0.85 }}>
                  {t.card1Body ?? ''}
                </p>
              </div>
              {/* Notch mask — background div with concave top-left corner */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 pointer-events-none bg-white dark:bg-[#0f1623]"
                style={{ width: 90, height: 90, borderRadius: '22px 0 0 0' }}
              />
              {/* Button centred in the notch */}
              <motion.a
                href="/"
                aria-label={t.card1Aria ?? 'Learn more about Unified Data Platform'}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 flex items-center justify-center"
                style={{ width: 68, height: 68, margin: 11, borderRadius: '18px', background: '#111', textDecoration: 'none', zIndex: 10 }}
              >
                <ArrowUpRight size={24} color="#fff" />
              </motion.a>
            </motion.div>

            {/* CARD 2 — medium blue, title+desc top, ring decoration */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative sm:col-span-1 lg:row-span-2 rounded-[20px] overflow-hidden"
              style={{ minHeight: 'clamp(200px, 30vw, 460px)', background: 'linear-gradient(160deg, #1A38E8 0%, #0A2280 100%)' }}
            >
              <div style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
                <h3 className="text-white leading-snug" style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', fontWeight: 300, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  {t.card2Title ?? 'AI and ML Integration'}
                </h3>
                <p className="text-blue-100 leading-relaxed" style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', margin: 0, maxWidth: '80%', opacity: 0.9, lineHeight: 1.65 }}>
                  {t.card2Body ?? ''}
                </p>
              </div>
              <div className="absolute pointer-events-none" style={{ bottom: '-18%', left: '-15%', width: '65%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Intersect.svg" alt="" aria-hidden="true" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              {/* Notch mask */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 pointer-events-none bg-white dark:bg-[#0f1623]"
                style={{ width: 90, height: 90, borderRadius: '22px 0 0 0' }}
              />
              {/* Button */}
              <motion.a
                href="/"
                aria-label={t.card2Aria ?? 'Learn more about AI and ML Integration'}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 flex items-center justify-center"
                style={{ width: 68, height: 68, margin: 11, borderRadius: '18px', background: '#111', textDecoration: 'none', zIndex: 10 }}
              >
                <ArrowUpRight size={24} color="#fff" />
              </motion.a>
            </motion.div>

            {/* CARD 3 — compact navy, title + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[24px] flex flex-col justify-center overflow-hidden gap-2"
              style={{
                background: 'linear-gradient(135deg, #1A38E8 0%, #0033A0 100%)',
                minHeight: 'clamp(120px, 14vw, 200px)',
                padding: 'clamp(20px, 2.5vw, 32px)',
              }}
            >
              <h3 className="text-white leading-snug" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 400, letterSpacing: '-0.005em', margin: 0 }}>
                {t.card3Title ?? 'Neural Network Integration'}
              </h3>
              <p className="text-blue-100" style={{ fontSize: 'clamp(12px, 1vw, 14px)', margin: 0, opacity: 0.78, lineHeight: 1.55 }}>
                {t.card3Body ?? 'Embed models directly into the data plane. One runtime, zero glue.'}
              </p>
            </motion.div>

            {/* CARD 4 — blue, 2148434727 1.svg woman photo (soft-light), Intersect icon, text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.30, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[24px] overflow-hidden flex flex-col justify-between"
              style={{
                background: 'linear-gradient(160deg, #1A38E8 0%, #0A2280 100%)',
                minHeight: 'clamp(160px, 22vw, 340px)',
                padding: 'clamp(20px, 2.5vw, 32px)',
              }}
            >
              {/* Subtle radial highlight + dot grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 80% at 100% 0%, rgba(96,160,255,0.22) 0%, transparent 60%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  maskImage:
                    'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 100%)',
                  WebkitMaskImage:
                    'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 100%)',
                }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                <TimerReset size={36} color="#fff" strokeWidth={1.5} />
                <div>
                  <h3 className="text-white leading-tight" style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', fontWeight: 300, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {t.card4Title ?? 'Neural Network Consulting'}
                  </h3>
                  <p className="text-white leading-relaxed" style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', margin: 0, opacity: 0.82, lineHeight: 1.65 }}>
                    {t.card4Body ?? ''}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6B — KEY DIFFERENTIATORS COMPARISON
      ══════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 lg:py-20 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            style={{ marginBottom: 'clamp(28px, 3.5vw, 56px)' }}
          >
            <h2
              className="dark:text-white mx-auto"
              style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '10px', color: '#0A2280', maxWidth: 'clamp(580px, 75vw, 1040px)', textWrap: 'balance' }}
            >
              {renderBrand(t.whyMonkdbTitle ?? 'Why MonkDB')}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{ fontSize: 'clamp(13px, 1.2vw, 18px)', margin: 0 }}
            >
              {t.whyMonkdbBody ?? 'A unified alternative to fragmented database ecosystems.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-[16px] sm:rounded-[20px]"
            style={{
              background: 'linear-gradient(135deg, #1A38E8 0%, #0A2280 55%, #050D6A 100%)',
              padding: 'clamp(28px, 4vw, 56px) clamp(24px, 5vw, 80px)',
              border: '1px solid rgba(26,56,232,0.35)',
              boxShadow: '0 0 40px rgba(26,56,232,0.2), inset 0 0 60px rgba(10,34,128,0.08)',
            }}
          >
            {/* Spider-net animation */}
            <SpiderNetBg />
            {/* Ambient glow blob */}
            <div aria-hidden="true" className="absolute pointer-events-none" style={{
              top: '10%', left: '15%', width: '50%', height: '80%',
              background: 'radial-gradient(ellipse, rgba(80,160,255,0.18) 0%, transparent 65%)',
              filter: 'blur(40px)',
            }} />

            {/* Table */}
            <div className="relative z-10 overflow-x-auto">

              {/* Header row */}
              <div className="relative flex items-center" style={{ paddingBottom: 'clamp(14px, 2vw, 22px)' }}>
                <div className="flex-1 text-white" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)', fontWeight: 500, letterSpacing: '-0.005em' }}>
                  {t.keyDiffHeader ?? 'Key Differentiators'}
                </div>
                <div className="text-white text-center flex-shrink-0" style={{ width: 'clamp(72px, 11vw, 160px)', fontSize: 'clamp(13px, 1.4vw, 18px)', fontWeight: 500 }}>
                  MonkDB
                </div>
                <div className="text-white text-center flex-shrink-0" style={{ width: 'clamp(80px, 13vw, 180px)', fontSize: 'clamp(13px, 1.4vw, 18px)', fontWeight: 500 }}>
                  {t.legacyColHeader ?? 'Legacy Systems'}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.25)', marginBottom: '0', minWidth: '360px' }} />

              {/* Feature rows */}
              {[
                t.compFeat1 ?? 'Multi-Model Unified Engine',
                t.compFeat2 ?? 'Hybrid Search Available',
                t.compFeat3 ?? 'Cloud, On-Prem and Edge Deployment',
                t.compFeat4 ?? 'ARM and x86_64 Support',
                t.compFeat5 ?? 'HTAP Capability',
                t.compFeat6 ?? 'Flexible Licensing',
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                  className="flex items-center"
                  style={{
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    padding: 'clamp(14px, 1.8vw, 22px) 0',
                    minWidth: '360px',
                  }}
                >
                  <span className="flex-1 pr-4" style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
                    {feature}
                  </span>
                  {/* MonkDB — green outline circle + green check (matches reference) */}
                  <div className="flex justify-center flex-shrink-0" style={{ width: 'clamp(72px, 11vw, 160px)' }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <circle cx="14" cy="14" r="12" stroke="#22c55e" strokeWidth="1.8" fill="none" />
                      <path d="M9 14.5l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Legacy — white outline circle with X */}
                  <div className="flex justify-center flex-shrink-0" style={{ width: 'clamp(80px, 13vw, 180px)' }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" fill="none" />
                      <path d="M10 10l8 8M18 10l-8 8" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — FEATURES
      ══════════════════════════════════════════ */}
      <section className="section-grid py-10 sm:py-14 lg:py-20 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-10 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.75rem', display: 'block', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [{t.featuresKicker ?? 'Features'}]
              </span>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 'clamp(580px, 75vw, 1040px)', textWrap: 'balance' }}
              >
                {t.featuresTitle ?? 'The unique selling points and advantages of our service'}
              </h2>
            </motion.div>
          </div>

          {/* Feature columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                Icon: BrainCircuit,
                title: t.diff1Title ?? 'AI-Native by Design',
                description: t.diff1Desc ?? 'Built ground-up to support AI workloads, not retrofitted. Native vector embeddings live alongside relational and time-series data.',
              },
              {
                Icon: Layers,
                title: t.diff2Title ?? 'Unified and Multi-Modal',
                description: t.diff2Desc ?? 'One engine for vector, relational, document, time-series, and geospatial data. Eliminate silos and reduce operational overhead by 60 percent.',
              },
              {
                Icon: Zap,
                title: t.diff3Title ?? 'Blazing Fast and Scalable',
                description: t.diff3Desc ?? 'Sub-millisecond query latency with horizontal scale-out. Handle petabyte workloads without performance degradation.',
              },
              {
                Icon: ShieldCheck,
                title: t.diff4Title ?? 'Enterprise-Ready',
                description: t.diff4Desc ?? 'SOC 2, GDPR, HIPAA compliant from day one. Role-based access, audit logs, and encryption at rest and in transit.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-4"
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background:
                      'linear-gradient(180deg, rgba(26,56,232,0.10) 0%, rgba(26,56,232,0.03) 100%)',
                    border: '1px solid rgba(26,56,232,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1A38E8',
                    flexShrink: 0,
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(10,20,80,0.05)',
                  }}
                >
                  <feature.Icon size={22} strokeWidth={1.6} />
                </div>

                <h3
                  className="text-gray-900 dark:text-white leading-snug"
                  style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', fontWeight: 500, margin: 0 }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-gray-500 dark:text-gray-400 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', margin: 0 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <section className="section-grid py-10 sm:py-14 lg:py-20 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-20 mb-6 sm:mb-10 lg:mb-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.75rem', display: 'block', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [{t.achievementsKicker ?? 'Achievements'}]
              </span>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 'clamp(580px, 75vw, 1040px)', textWrap: 'balance' }}
              >
                {t.achievementsTitle ?? 'Numbers that speak for themselves'}
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed lg:pb-2"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', margin: 0 }}
            >
              {t.achievementsBody ?? ''}
            </motion.p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

            {/* Dark card — 270k */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[24px] overflow-hidden flex flex-col justify-between sm:col-span-2 lg:col-span-1"
              style={{
                background: 'linear-gradient(145deg, #0A2280 0%, #0f1623 100%)',
                minHeight: 'clamp(280px, 30vw, 380px)',
                padding: 'clamp(20px, 3vw, 44px)',
                border: '1px solid rgba(26,56,232,0.2)',
              }}
            >
              {/* Animated glow orb — CSS animation for compositor thread */}
              <div
                className="absolute pointer-events-none"
                style={{ bottom: '-20%', right: '-10%', width: '65%', height: '65%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,56,232,0.3) 0%, transparent 65%)', filter: 'blur(44px)', animation: 'achiev-orb-pulse 6s ease-in-out infinite' }}
              />
              {/* Dot-grid texture */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity: 0.18 }}>
                <defs>
                  <pattern id="achiev-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(120,160,255,0.7)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#achiev-dots)" />
              </svg>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: 'clamp(36px, 5.5vw, 96px)',
                      color: 'transparent',
                      WebkitTextStroke: 'clamp(1.5px, 0.16vw, 2px) #1A38E8',
                      letterSpacing: '-3px',
                    }}
                  >
                    <Counter to={270} suffix="k" />
                  </span>
                </div>
                <div style={{ height: '1px', background: 'rgba(26,56,232,0.35)', marginBottom: '18px' }} />
                <span className="text-white leading-snug block mb-3" style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', fontWeight: 400 }}>
                  {t.stat1Label1 ?? 'AI Solutions'}<br />{t.stat1Label2 ?? 'for our clients'}
                </span>
                <p className="text-gray-400 leading-relaxed mt-auto" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0, lineHeight: 1.6 }}>
                  {t.stat1Body ?? ''}
                </p>
              </div>
            </motion.div>

            {/* 97% */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="group relative flex flex-col rounded-[24px] bg-white dark:bg-white/5 overflow-hidden border border-gray-100 dark:border-white/10"
              style={{ padding: 'clamp(28px, 3vw, 44px)', minHeight: 'clamp(280px, 30vw, 380px)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,56,232,0.06) 0%, transparent 65%)' }} />
              {/* Pulsing glow behind number */}
              <div className="relative overflow-visible mb-4">
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-12px', background: 'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)', filter: 'blur(18px)', animation: 'achiev-stat-pulse 4s ease-in-out infinite' }}
                />
                <span
                  className="relative font-bold leading-none"
                  style={{
                    fontSize: 'clamp(68px, 9.5vw, 128px)',
                    color: 'transparent',
                    WebkitTextStroke: 'clamp(1.5px, 0.18vw, 2px) #1A38E8',
                    letterSpacing: '-3px',
                  }}
                >
                  <Counter to={97} suffix="%" />
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-white/10" style={{ marginBottom: '20px' }} />
              <div className="flex flex-col gap-2.5 mt-auto">
                <h3 className="text-gray-900 dark:text-white" style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', fontWeight: 400 }}>
                  {t.stat2Label ?? 'Enterprise Uptime SLA'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0, lineHeight: 1.6 }}>
                  {t.stat2Body ?? ''}
                </p>
              </div>
            </motion.div>

            {/* 2000+ */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="group relative flex flex-col rounded-[24px] bg-white dark:bg-white/5 overflow-hidden border border-gray-100 dark:border-white/10"
              style={{ padding: 'clamp(28px, 3vw, 44px)', minHeight: 'clamp(280px, 30vw, 380px)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,56,232,0.06) 0%, transparent 65%)' }} />
              {/* Pulsing glow behind number */}
              <div className="relative overflow-visible mb-4">
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-12px', background: 'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)', filter: 'blur(18px)', animation: 'achiev-stat-pulse 4.5s ease-in-out 0.6s infinite' }}
                />
                <span
                  className="relative font-bold leading-none"
                  style={{
                    fontSize: 'clamp(68px, 9.5vw, 128px)',
                    color: 'transparent',
                    WebkitTextStroke: 'clamp(1.5px, 0.18vw, 2px) #1A38E8',
                    letterSpacing: '-3px',
                  }}
                >
                  <Counter to={2000} suffix="+" />
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-white/10" style={{ marginBottom: '20px' }} />
              <div className="flex flex-col gap-2.5 mt-auto">
                <h3 className="text-gray-900 dark:text-white" style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', fontWeight: 400 }}>
                  {t.stat3Label ?? 'Enterprise Deployments'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0, lineHeight: 1.6 }}>
                  {t.stat3Body ?? ''}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
