'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

/* ─── Feature rows inside the dark card ─────────────────────────────────── */
// layout 'bg-full'   → SVG is the full card background, text overlaid left
// layout 'img-text'  → left 48% = image fills edge-to-edge, right 52% = text
// layout 'bg-right'  → solid colour background, SVG on right side only, text left
const FEATURES = [
  {
    // Row 1: Royal blue base + wave SVG as subtle overlay
    title: 'Neural Network Development',
    description: 'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/AdobeStock_480053037 1.svg',
    bg: '#1238C8',
    layout: 'bg-full' as const,
    darkText: false,
  },
  {
    // Row 2: cobalt blue bg, 3D twist — color overlay shifts to blue-periwinkle
    title: 'Neural Network Development',
    description: 'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/3d-geometric-abstract-twist-background 1.svg',
    bg: 'linear-gradient(120deg, #1228CC 0%, #1A38E8 100%)',
    layout: 'img-text' as const,
    darkText: false,
    imageWidth: '48%',
    imageOverlay: '#3355EE',   // mix-blend-mode:color tints SVG to blue-periwinkle
  },
  {
    // Row 3: 16416 SVG as full background (sky-blue left, royal-blue waves right)
    title: 'Neural Network',
    description: 'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/16416 1.svg',
    bg: '#A8DCFF',
    layout: 'bg-full' as const,
    darkText: true,
  },
  {
    // Row 4: bg-full sky-blue, SVG sepia→hue-rotate→saturate = blue ribbon, multiply removes white bg
    title: 'Neural Network',
    description: 'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/15909 1.svg',
    bg: '#C4ECFF',
    layout: 'bg-full' as const,
    darkText: true,
    textRight: true,
    imgFilter: 'sepia(1) hue-rotate(200deg) saturate(4) brightness(1.05)',
  },
]

/* ─── Team members ───────────────────────────────────────────────────────── */
const TEAM = [
  { name: 'Krishna Challa', role: 'CEO MonkDB' },
  { name: 'Arjun Reddy', role: 'CTO MonkDB' },
  { name: 'Priya Sharma', role: 'VP Engineering' },
  { name: 'Rahul Verma', role: 'Head of AI' },
  { name: 'Sneha Patel', role: 'Head of Product' },
]

/* ─── LinkedIn icon ──────────────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" fill="white" />
    </svg>
  )
}

/* ─── Team card ──────────────────────────────────────────────────────────── */
function TeamCard({ member, delay }: { member: typeof TEAM[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid #e8e8e8', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
    >
      {/* Photo via background-image — fully controlled dimensions */}
      <div style={{
        position: 'relative',
        height: '260px',
        backgroundImage: 'url("/Mask group (1).svg")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundColor: '#f0ece6',
      }}>
        <div style={{ position: 'absolute', bottom: 10, left: 10, width: 36, height: 36, background: '#111', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          <LinkedInIcon />
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '2px' }}>/ {member.role} /</p>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A38E8', margin: 0 }}>{member.name}</p>
      </div>
    </motion.div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WhyChooseUsPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
  const introRef = useRef(null)
  const introInView = useInView(introRef, { once: true, margin: '-60px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Why Choose Us" />

      {/* ══════════════════════════════════════════
          SECTION 1 — INTRO
      ══════════════════════════════════════════ */}
      <section ref={introRef} className="section-grid bg-white dark:bg-[#0f1623] pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-10">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 60px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1A38E8', marginBottom: '18px', textDecoration: 'none' }}>
              Let&apos;s Build the Future of<br />Data Infrastructure — Together
            </h2>
            <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
              At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — WHAT MAKES MONKDB (dark card + 4 rows)
      ══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0f1623] pb-10 sm:pb-14 lg:pb-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-[28px] overflow-hidden"
            style={{ background: '#07091A', padding: 'clamp(28px, 4vw, 52px) clamp(24px, 3.5vw, 48px)' }}
          >
            {/* Header row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-8 sm:mb-10 lg:mb-12">
              <div>
                <h2 className="text-white" style={{ fontSize: 'clamp(22px, 3.2vw, 52px)', fontWeight: 300, lineHeight: 1.12, letterSpacing: '-0.01em', margin: 0 }}>
                  What Makes MonkDB The Best Choice For Your Enterprise
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:pt-2">
                <p className="text-white/65" style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', lineHeight: 1.75, margin: 0 }}>
                  At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
                </p>
                <motion.a
                  href="#features"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 self-start text-white"
                  style={{ background: '#1A38E8', borderRadius: '10px', padding: '12px 24px', fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px rgba(26,56,232,0.35)' }}
                >
                  Discover
                  <ArrowUpRight size={16} />
                </motion.a>
              </div>
            </div>

            {/* 4 Feature rows */}
            <div id="features" className="flex flex-col gap-3">
              {FEATURES.map((feat, i) => {
                const titleColor  = feat.darkText ? '#0A1E6E' : '#ffffff'
                const descColor   = feat.darkText ? 'rgba(10,30,110,0.72)' : 'rgba(255,255,255,0.72)'
                const ROW_H       = 'clamp(170px, 21vw, 260px)'

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative rounded-[20px] overflow-hidden"
                    style={{ background: feat.bg, minHeight: ROW_H }}
                  >
                    {feat.layout === 'bg-full' ? (
                      /* ── bg-full: SVG fills entire card, text overlaid left or right ── */
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={feat.image} alt="" aria-hidden="true"
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          style={{
                            objectFit: 'cover',
                            objectPosition: ('textRight' in feat && feat.textRight) ? 'left center' : 'center',
                            ...('imgFilter' in feat && feat.imgFilter
                              ? {
                                  // sepia gives grey a hue; hue-rotate(200°) shifts it to blue;
                                  // saturate boosts vibrancy; multiply blend removes white SVG bg
                                  filter: feat.imgFilter as string,
                                  mixBlendMode: 'multiply' as const,
                                }
                              : feat.darkText
                                ? {}
                                : { opacity: 0.55, mixBlendMode: 'screen' as const }
                            ),
                          }}
                        />
                        {/* Gradient overlay for light rows without imgFilter */}
                        {feat.darkText && !('imgFilter' in feat && feat.imgFilter) && (
                          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
                            background: 'textRight' in feat && feat.textRight
                              ? `linear-gradient(to left,  ${feat.bg} 0%, ${feat.bg} 38%, transparent 62%)`
                              : `linear-gradient(to right, ${feat.bg} 0%, ${feat.bg} 38%, transparent 62%)`,
                            zIndex: 1,
                          }} />
                        )}
                        {/* Text — left or right depending on textRight flag */}
                        <div className="relative flex flex-col justify-center"
                          style={{
                            padding: 'clamp(28px, 3.5vw, 52px)',
                            maxWidth: '48%',
                            minHeight: ROW_H,
                            zIndex: 2,
                            ...('textRight' in feat && feat.textRight ? { marginLeft: 'auto' } : {}),
                          }}>
                          <h3 style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px', color: titleColor }}>
                            {feat.title}
                          </h3>
                          <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.75, margin: 0, color: descColor }}>
                            {feat.description}
                          </p>
                        </div>
                      </>

                    ) : feat.layout === 'bg-right' ? (
                      /* ── bg-right: overflow-hidden wrapper anchors image to right edge,
                         clipping the lavender-left portion and showing only blue waves ── */
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute top-0 right-0 h-full overflow-hidden pointer-events-none"
                          style={{ width: '60%' }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={feat.image} alt=""
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              height: '100%',
                              width: 'auto',   /* natural aspect ratio — left overflow is clipped */
                            }}
                          />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center"
                          style={{ padding: 'clamp(28px, 3.5vw, 52px)', maxWidth: '50%', minHeight: ROW_H }}>
                          <h3 style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px', color: titleColor }}>
                            {feat.title}
                          </h3>
                          <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.75, margin: 0, color: descColor }}>
                            {feat.description}
                          </p>
                        </div>
                      </>

                    ) : (
                      /* ── img-text: image fills left (width per row), text fills right ── */
                      <div className="flex h-full" style={{ minHeight: ROW_H }}>
                        <div className="hidden sm:block flex-shrink-0 overflow-hidden"
                          style={{
                            width: ('imageWidth' in feat ? feat.imageWidth : '48%'),
                            position: 'relative',
                            // Give column an explicit bg so multiply-blended img matches the text column
                            ...('imgBlend' in feat && feat.imgBlend ? { backgroundColor: feat.bg as string } : {}),
                          }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={feat.image} alt="" aria-hidden="true"
                            style={{
                              position: 'absolute', inset: 0, width: '100%', height: '100%',
                              objectFit: 'cover', objectPosition: 'center',
                              ...('imgBlend' in feat && feat.imgBlend
                                ? { mixBlendMode: feat.imgBlend as React.CSSProperties['mixBlendMode'] }
                                : {}),
                            }}
                          />
                          {/* Color overlay — mix-blend-mode:color preserves luminance (3D shape), forces hue to blue */}
                          {'imageOverlay' in feat && feat.imageOverlay && (
                            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: feat.imageOverlay as string, mixBlendMode: 'color', opacity: 0.95 }} />
                          )}
                        </div>
                        <div className="flex flex-col justify-center flex-1"
                          style={{ padding: 'clamp(28px, 3.5vw, 52px)' }}>
                          <h3 style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px', color: titleColor }}>
                            {feat.title}
                          </h3>
                          <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.75, margin: 0, color: descColor }}>
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — TEAM
      ══════════════════════════════════════════ */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Left — text, fixed width */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full lg:w-[260px] flex-shrink-0"
            >
              <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1A38E8', display: 'block', marginBottom: '10px' }}>
                [Team]
              </span>
              <h2 className="text-gray-900 dark:text-white" style={{ fontSize: 'clamp(20px, 2vw, 34px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                The Neural Network experts: uniting talent for intelligent solutions
              </h2>
              <span style={{
                fontSize: 'clamp(32px, 3.5vw, 60px)',
                fontWeight: 700,
                letterSpacing: '-3px',
                lineHeight: 1,
                WebkitTextStroke: '2px #1A38E8',
                color: 'transparent',
                display: 'block',
                marginBottom: '6px',
              }}>
                +500
              </span>
              <p className="text-gray-500" style={{ fontSize: '0.78rem', marginBottom: '18px' }}>
                Ai Solution for our clients
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300"
                style={{ border: '1px solid #d1d5db', borderRadius: '999px', padding: '8px 18px', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none' }}
              >
                Explore more
                <ArrowUpRight size={12} />
              </motion.a>
            </motion.div>

            {/* Right — staggered 2-col card grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 items-start">
              {/* Col A — cards at normal position */}
              <div className="flex flex-col gap-3">
                <TeamCard member={TEAM[0]} delay={0.08} />
                <TeamCard member={TEAM[2]} delay={0.2} />
              </div>
              {/* Col B — offset down for stagger */}
              <div className="flex flex-col gap-3 mt-8">
                <TeamCard member={TEAM[1]} delay={0.14} />
                <TeamCard member={TEAM[3]} delay={0.26} />
              </div>
              {/* Col C — visible on sm+ */}
              <div className="hidden sm:flex flex-col gap-3 mt-4">
                <TeamCard member={TEAM[4]} delay={0.32} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — QUOTE PARAGRAPH
      ══════════════════════════════════════════ */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-8 sm:py-10">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-gray-500 dark:text-gray-400 text-center"
            style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.8 }}
          >
            At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management,
            and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — GET IN TOUCH
      ══════════════════════════════════════════ */}
      <section id="contact" className="bg-black py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="rounded-[24px] border border-white/10 p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">

              {/* Left — heading + contact info */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em', color: '#ffffff', display: 'block', marginBottom: '14px' }}>
                  [Get In Touch]
                </span>
                <h2 className="text-white" style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                  Choose The Unique MonkDB Platform And Head Into The World Of Data Infrastructure With Confidence And Ease.
                </h2>
                <p className="text-white/50" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.75, marginBottom: '32px' }}>
                  Choose The Unique MonkDB Platform And Head Into The World Of Data Infrastructure And Save. It&apos;s Simple.
                </p>

                {/* Contact details */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div>
                    <p className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '8px' }}>
                      Call Center
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center rounded-full bg-white/10 flex-shrink-0" style={{ width: 32, height: 32 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.04 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                        </svg>
                      </span>
                      <a href="tel:+359893054546" className="text-white hover:text-blue-300 transition-colors" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                        +359 893 054 546
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '8px' }}>
                      Email
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center rounded-full bg-white/10 flex-shrink-0" style={{ width: 32, height: 32 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <a href="mailto:support@monkdb.com" className="text-white hover:text-blue-300 transition-colors" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                        Support@MonkDb.Com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right — form */}
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {/* Row 1: First + Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                  />
                </div>
                {/* Row 2: Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors"
                  style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                />
                {/* Row 3: Contact No + Zip/Postal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Contact No"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Zip/Postal"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                  />
                </div>
                {/* Row 4: Message */}
                <textarea
                  placeholder="Message"
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-colors resize-none"
                  style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }}
                />
                {/* Submit */}
                <div className="flex justify-start">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ background: '#1A38E8', color: '#fff', borderRadius: '999px', padding: '14px 48px', fontSize: '0.9rem', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(26,56,232,0.35)' }}
                  >
                    Submit
                  </motion.button>
                </div>
              </motion.form>

            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
