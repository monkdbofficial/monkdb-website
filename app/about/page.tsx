'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ArrowUpRight, TimerReset } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollToTop from '@/components/ScrollToTop'
import PageBanner from '@/components/PageBanner'
import AnimatedSVGImage from '@/components/AnimatedSVGImage'

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
      <PageBanner title="About Us" />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="section-grid bg-white dark:bg-[#0f1623] pt-[100px] sm:pt-[110px] lg:pt-[130px] pb-14 sm:pb-20 lg:pb-24"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[48%_1fr] gap-10 lg:gap-20 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.8rem', display: 'block', marginBottom: '14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [About Us]
              </span>
              <h1
                className="text-gray-900 dark:text-white leading-[1.08]"
                style={{ fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 700, marginBottom: 0 }}
              >
                What Makes MonkDB
                <br />
                The Best Choice For
                <br />
                Your Enterprise
              </h1>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-7"
            >
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', margin: 0 }}
              >
                At Movibase, our journey is deeply personal — born from decades of experience
                in enterprise systems, data management, and AI. We&apos;ve seen firsthand how
                fragmented data infrastructure holds back innovation.
              </p>
              <motion.a
                href="#story"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-between text-white font-semibold self-start"
                style={{
                  background: '#1A38E8',
                  borderRadius: '14px',
                  padding: '16px 32px',
                  fontSize: 'clamp(0.88rem, 1vw, 1rem)',
                  textDecoration: 'none',
                  minWidth: '200px',
                  gap: '32px',
                  boxShadow: '0 8px 24px rgba(26,56,232,0.25)',
                }}
              >
                Discover
                <ArrowUpRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — BANNER (sky blue card + animated wave)
      ══════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 lg:py-14 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="relative">

              {/* ── Main blue card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden"
                style={{ minHeight: 'clamp(360px, 46vw, 580px)', borderRadius: 'clamp(16px, 1.6vw, 28px)', background: 'linear-gradient(180deg, #1A8FFF 0%, #2196FF 40%, #3AACFF 100%)' }}
              >
                {/* Background wave image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/AdobeStock_6193331721.svg"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 70%',
                    mixBlendMode: 'screen',
                    opacity: 0.95,
                    filter: 'saturate(1.4) brightness(1.05)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Content layer — top texts + Disco at bottom */}
                <div className="absolute inset-0 flex flex-col justify-between" style={{ zIndex: 2 }}>
                  {/* Top two-column text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ padding: 'clamp(24px, 3.5vw, 52px)' }}>
                    <p
                      className="leading-snug"
                      style={{ fontSize: 'clamp(14px, 1.5vw, 22px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)' }}
                    >
                      Let&apos;s Build the Future of<br />
                      Data Infrastructure—Together
                    </p>
                    <p
                      className="leading-snug"
                      style={{ fontSize: 'clamp(14px, 1.5vw, 22px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)' }}
                    >
                      Too Many Options<br />
                      Too Little Trust!
                    </p>
                  </div>

                  {/* Disco — inside card, anchored to bottom */}
                  <div style={{ paddingLeft: 'clamp(24px, 3.5vw, 52px)', lineHeight: 1 }}>
                    <span
                      className="font-bold select-none block"
                      style={{ fontSize: 'clamp(90px, 18vw, 240px)', lineHeight: 0.88, letterSpacing: '-2px', color: '#ffffff' }}
                    >
                      Disco
                    </span>
                  </div>
                </div>

                {/* ── Request Demo button ── */}
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="absolute flex items-center justify-center gap-3 sm:gap-4"
                  style={{
                    bottom: 0,
                    right: 0,
                    padding: 'clamp(14px, 2.5vw, 38px) clamp(16px, 3vw, 48px)',
                    textDecoration: 'none',
                    zIndex: 10,
                    borderRadius: 'clamp(12px, 1.4vw, 22px) clamp(12px, 1.4vw, 22px) clamp(8px,1vw,16px) clamp(12px, 1.4vw, 22px)',
                    background: '#ffffff',
                  }}
                >
                  <div style={{ width: 'clamp(32px, 3.5vw, 54px)', height: 'clamp(32px, 3.5vw, 54px)', borderRadius: '50%', border: '1.5px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '46%', height: '46%', marginLeft: '2px' }}>
                      <polygon fill="#6b7280" points="9,7 18,12 9,17" />
                    </svg>
                  </div>
                  <span className="text-gray-700" style={{ fontSize: 'clamp(13px, 1.4vw, 20px)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    Request Demo
                  </span>
                </motion.a>

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
        className="section-grid bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-12 lg:gap-20 items-center">

            {/* Left: spinning ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center order-2 lg:order-1"
            >
              <div className="relative flex items-center justify-center w-full max-w-[180px] sm:max-w-[260px] lg:max-w-[400px] mx-auto">
                <motion.img
                  src="/Vector.svg"
                  alt=""
                  aria-hidden="true"
                  animate={storyInView ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-auto"
                  style={{ willChange: 'transform' }}
                />
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
                  style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  [Our Story]
                </span>
                <p
                  className="text-gray-900 dark:text-white leading-tight"
                  style={{ fontSize: 'clamp(22px, 2.8vw, 48px)', fontWeight: 700, margin: 0 }}
                >
                  At Movibase,{' '}
                  <span className="text-[#1A38E8] dark:text-blue-400">
                    our journey is deeply personal
                  </span>
                  {' '}— born from decades of experience in enterprise systems, data management, and AI.
                </p>
              </div>

              {/* MonkDB tag pills */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {['monkdb', 'monkdb', 'monkdb'].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-center rounded-xl border-2 border-[#1A38E8] dark:border-blue-400 px-6 py-3 sm:px-8 sm:py-4"
                  >
                    <img src="/logo.png" alt="MonkDB" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
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
      <section className="section-grid py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-14"
          >
            <div>
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.8rem', display: 'block', marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [Services]
              </span>
              <h2
                className="text-gray-900 dark:text-white leading-tight"
                style={{ fontSize: 'clamp(24px, 2.8vw, 44px)', fontWeight: 700, maxWidth: '480px' }}
              >
                Special database features
                <br />
                for your services
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:pb-2">
              <p
                className="text-gray-500 dark:text-gray-400"
                style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', maxWidth: '240px', margin: 0, lineHeight: 1.6 }}
              >
                At MonkDB, our journey is deeply personal
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
                Explore more
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>

          {/* Shared L-notch clip-path (same shape as FeatureBanner card1-bg.svg)
              objectBoundingBox coords: raw path ÷ (630 wide, 400 tall) */}
          <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', overflow: 'hidden' }}>
            <defs>
              <clipPath id="svc-notch-clip" clipPathUnits="objectBoundingBox">
                <path d="M1 0.6125 C1 0.660825 0.974333 0.7 0.944444 0.7 H0.865079 C0.834397 0.7 0.809524 0.739175 0.809524 0.7875 V0.9125 C0.809524 0.960825 0.784651 1 0.753968 1 H0.055556 C0.024873 1 0 0.960825 0 0.9125 V0.0875 C0 0.039175 0.024873 0 0.055556 0 H0.944444 C0.974333 0 1 0.039175 1 0.0875 V0.6125 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Bento grid — 3 cols, right col has 2 stacked rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

            {/* CARD 1 — dark navy, AdobeStock globe, notch + black button */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative sm:col-span-1 lg:row-span-2"
              style={{ minHeight: 'clamp(300px, 38vw, 480px)' }}
            >
              <div
                className="absolute inset-0 flex flex-col overflow-hidden"
                style={{
                  clipPath: 'url(#svc-notch-clip)',
                  background: '#1535CC',
                  padding: `0 clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 32px)`,
                }}
              >
                <div className="flex-1 flex items-start justify-center pointer-events-none" style={{ overflow: 'hidden' }}>
                  <AnimatedSVGImage
                    src="/AdobeStock_588310019 1.svg"
                    style={{ width: '90%', height: 'auto', objectFit: 'contain', display: 'block', marginTop: '-5%' }}
                  />
                </div>
                <div style={{ paddingRight: 'clamp(52px, 8%, 80px)' }}>
                  <h3 className="text-white font-bold leading-snug" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', marginBottom: '8px' }}>
                    Unified Data Platform
                  </h3>
                  <p className="text-blue-200 leading-relaxed" style={{ fontSize: 'clamp(11px, 1vw, 14px)', margin: 0 }}>
                    Custom design and deployment of multi-model database architectures tailored to your specific business needs.
                  </p>
                </div>
              </div>
              <motion.a
                href="/"
                aria-label="Learn more about Unified Data Platform"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 flex items-center justify-center"
                style={{ width: 'clamp(52px, 14%, 72px)', aspectRatio: '1/1', borderRadius: '20px', background: '#111', textDecoration: 'none', zIndex: 10 }}
              >
                <ArrowUpRight size={20} color="#fff" />
              </motion.a>
            </motion.div>

            {/* CARD 2 — medium blue, title+desc top, large ring lower, notch + black button */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative sm:col-span-1 lg:row-span-2"
              style={{ minHeight: 'clamp(300px, 38vw, 480px)' }}
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: 'url(#svc-notch-clip)',
                  background: 'linear-gradient(160deg, #1A72D8 0%, #3A9AF0 100%)',
                  padding: 'clamp(20px, 2.5vw, 32px)',
                }}
              >
                <h3 className="text-white font-bold leading-snug" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', marginBottom: '8px' }}>
                  AI &amp; ML Integration
                </h3>
                <p className="text-blue-100 leading-relaxed" style={{ fontSize: 'clamp(11px, 1vw, 14px)', margin: 0, maxWidth: '85%' }}>
                  Fine-tuning vector search and embedding pipelines using advanced algorithms to achieve maximum performance and accuracy.
                </p>
                {/* Intersect SVG — static, fills lower half of card */}
                <div
                  className="absolute pointer-events-none"
                  style={{ bottom: '-18%', left: '-15%', width: '65%' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Intersect.svg"
                    alt=""
                    aria-hidden="true"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
              <motion.a
                href="/"
                aria-label="Learn more about AI & ML Integration"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-0 right-0 flex items-center justify-center"
                style={{ width: 'clamp(52px, 14%, 72px)', aspectRatio: '1/1', borderRadius: '20px', background: '#111', textDecoration: 'none', zIndex: 10 }}
              >
                <ArrowUpRight size={20} color="#fff" />
              </motion.a>
            </motion.div>

            {/* CARD 3 — light steel-blue, bold title only */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[24px] flex flex-col justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1A72D8 0%, #3A9AF0 100%)',
                minHeight: 'clamp(120px, 13vw, 170px)',
                padding: 'clamp(20px, 2.5vw, 32px)',
              }}
            >
              <h3 className="text-white font-bold leading-snug" style={{ fontSize: 'clamp(16px, 1.6vw, 24px)' }}>
                Neural Network<br />Integration
              </h3>
            </motion.div>

            {/* CARD 4 — blue, 2148434727 1.svg woman photo (soft-light), Intersect icon, text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.30, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-[24px] overflow-hidden flex flex-col justify-between"
              style={{
                background: 'linear-gradient(160deg, #1A38E8 0%, #1E60F0 100%)',
                minHeight: 'clamp(220px, 28vw, 360px)',
                padding: 'clamp(20px, 2.5vw, 32px)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/2148434727 1.svg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ objectFit: 'cover', mixBlendMode: 'soft-light' }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                <TimerReset size={44} color="#fff" strokeWidth={1.5} />
                <div>
                  <h3 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', marginBottom: '10px' }}>
                    Neural Network<br />Consulting
                  </h3>
                  <p className="text-white leading-relaxed" style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', margin: 0, opacity: 0.85 }}>
                    Expert guidance and strategic advice on integrating neural networks into your existing systems
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
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2
              className="dark:text-white font-bold"
              style={{ fontSize: 'clamp(24px, 2.8vw, 44px)', marginBottom: '12px', color: '#0A2280' }}
            >
              Why MonkDB
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{ fontSize: 'clamp(14px, 1.2vw, 18px)', margin: 0 }}
            >
              A unified alternative to fragmented database ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-[20px] sm:rounded-[24px]"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, #3060F0 0%, #1A40E8 40%, #1535CC 100%)',
              padding: 'clamp(20px, 3.5vw, 48px)',
            }}
          >
            {/* Canvas — particle network, extremely subtle */}
            <ParticleNetworkBg />

            {/* Table */}
            <div className="relative z-10 overflow-x-auto -mx-1 px-1">

              {/* Header row */}
              <div className="flex items-center mb-2" style={{ paddingBottom: '10px', minWidth: '320px' }}>
                <div className="flex-1 text-white font-bold" style={{ fontSize: 'clamp(14px, 1.4vw, 18px)' }}>
                  Key Differentiators
                </div>
                <div className="text-white font-bold text-center" style={{ width: 'clamp(80px, 10vw, 140px)', fontSize: 'clamp(12px, 1.2vw, 17px)' }}>
                  MonkDB
                </div>
                <div className="text-white font-bold text-center" style={{ width: 'clamp(90px, 12vw, 160px)', fontSize: 'clamp(12px, 1.2vw, 17px)' }}>
                  Legacy Systems
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.3)', marginBottom: '2px', minWidth: '320px' }} />

              {/* Feature rows */}
              {[
                'Multi-Model Unified Engine',
                'Hybrid Search Available',
                'Cloud, On-Prem & Edge Deployment',
                'ARM + x86_64 Support',
                'HTAP Capability',
                'Flexible Licensing',
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                  className="flex items-center"
                  style={{
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    padding: 'clamp(10px, 1.3vw, 17px) 0',
                    minWidth: '320px',
                  }}
                >
                  <span className="flex-1 text-white/80 pr-4" style={{ fontSize: 'clamp(12px, 1vw, 15px)' }}>
                    {feature}
                  </span>
                  {/* MonkDB — green check */}
                  <div className="flex justify-center flex-shrink-0" style={{ width: 'clamp(80px, 10vw, 140px)' }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <circle cx="14" cy="14" r="12" stroke="#22c55e" strokeWidth="1.5" fill="none" />
                      <path d="M9 14.5l3.5 3.5 6-7" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Legacy — X */}
                  <div className="flex justify-center flex-shrink-0" style={{ width: 'clamp(90px, 12vw, 160px)' }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
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
      <section className="section-grid py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.8rem', display: 'block', marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [Features]
              </span>
              <h2
                className="text-gray-900 dark:text-white leading-[1.1]"
                style={{ fontSize: 'clamp(24px, 2.8vw, 44px)', fontWeight: 700, maxWidth: '520px' }}
              >
                The unique selling points &amp; advantages of our service
              </h2>
            </motion.div>
          </div>

          {/* Feature columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: 'AI-Native by Design',
                description: 'Built ground-up to support AI workloads — not retrofitted. Native vector embeddings live alongside relational and time-series data.',
              },
              {
                title: 'Unified & Multi-Modal',
                description: 'One engine for vector, relational, document, time-series, and geospatial data. Eliminate silos and reduce operational overhead by 60%.',
              },
              {
                title: 'Blazing Fast & Scalable',
                description: 'Sub-millisecond query latency with horizontal scale-out. Handle petabyte workloads without performance degradation.',
              },
              {
                title: 'Enterprise-Ready',
                description: 'SOC 2, GDPR, HIPAA compliant from day one. Role-based access, audit logs, and encryption at rest and in transit.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-4 pt-6 border-t border-gray-200 dark:border-white/10"
              >
                {/* Icon */}
                <img
                  src="/Group.svg"
                  alt=""
                  aria-hidden="true"
                  style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}
                />

                <h3
                  className="text-gray-900 dark:text-white font-bold leading-snug"
                  style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', margin: 0 }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-gray-500 dark:text-gray-400 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1.0vw, 15px)', margin: 0 }}
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
      <section className="section-grid py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">

          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-10 lg:mb-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                className="font-semibold text-egyptian-blue dark:text-blue-400"
                style={{ fontSize: '0.8rem', display: 'block', marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                [Achievements]
              </span>
              <h2
                className="text-gray-900 dark:text-white leading-[1.1]"
                style={{ fontSize: 'clamp(24px, 2.8vw, 44px)', fontWeight: 700 }}
              >
                Numbers that speak for themselves
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
              At MonkDB, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We&apos;ve seen firsthand how fragmented infrastructure holds back innovation.
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
                background: 'linear-gradient(145deg, #0d1117 0%, #0a1628 100%)',
                minHeight: 'clamp(280px, 30vw, 380px)',
                padding: 'clamp(28px, 3vw, 44px)',
                border: '1px solid rgba(26,56,232,0.2)',
              }}
            >
              {/* Animated glow orb */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ bottom: '-20%', right: '-10%', width: '65%', height: '65%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,56,232,0.3) 0%, transparent 65%)', filter: 'blur(44px)' }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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
                      fontSize: 'clamp(68px, 9.5vw, 128px)',
                      color: 'transparent',
                      WebkitTextStroke: 'clamp(1.5px, 0.18vw, 2px) #1A38E8',
                      letterSpacing: '-3px',
                    }}
                  >
                    <Counter to={270} suffix="k" />
                  </span>
                </div>
                <div style={{ height: '1px', background: 'rgba(26,56,232,0.35)', marginBottom: '18px' }} />
                <span className="text-white font-bold leading-snug block mb-4" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)' }}>
                  AI Solutions<br />for our clients
                </span>
                <p className="text-gray-400 leading-relaxed mt-auto" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0 }}>
                  At MonkDB, our journey is deeply personal — born from decades of experience in enterprise systems.
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
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-12px', background: 'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)', filter: 'blur(18px)' }}
                  animate={{ scale: [1, 1.14, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
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
                <h3 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: 'clamp(15px, 1.25vw, 18px)' }}>
                  Enterprise Uptime SLA
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0 }}>
                  Guaranteed 99.97% availability with automatic failover and zero-downtime deployments across all regions.
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
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-12px', background: 'radial-gradient(circle, rgba(26,56,232,0.10) 0%, transparent 70%)', filter: 'blur(18px)' }}
                  animate={{ scale: [1, 1.14, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
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
                <h3 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: 'clamp(15px, 1.25vw, 18px)' }}>
                  Enterprise Deployments
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(12px, 0.95vw, 14px)', margin: 0 }}>
                  Trusted by 2,000+ enterprise teams across finance, healthcare, logistics, and government sectors globally.
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
