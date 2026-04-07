'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, animate as animateValue, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import PageBanner from '@/components/PageBanner'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────────── */
const ease = [0.25, 0.46, 0.45, 0.94] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
})

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────────────────────────────────────────── */
function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animateValue(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target])
  return count
}

/* ─────────────────────────────────────────────────────────────────────────────
   WORD-BY-WORD ANIMATED TEXT
───────────────────────────────────────────────────────────────────────────── */
function AnimatedWords({
  text,
  className,
  style,
  delayStart = 0,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  delayStart?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} style={{ ...style, display: 'block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: delayStart + i * 0.04, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE ROWS DATA
───────────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Neural Network Development',
    description:
      'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/AdobeStock_480053037 1.svg',
    bg: '#1238C8',
    layout: 'bg-full' as const,
    darkText: false,
    textRight: false,
  },
  {
    title: 'Neural Network Development',
    description:
      'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/3d-geometric-abstract-twist-background 1.svg',
    bg: 'linear-gradient(120deg, #1228CC 0%, #1A38E8 100%)',
    layout: 'img-text' as const,
    darkText: false,
    textRight: false,
    imageWidth: '48%',
    imageOverlay: '#3355EE',
  },
  {
    title: 'Neural Network',
    description:
      'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/16416 1.svg',
    bg: '#A8DCFF',
    layout: 'bg-full' as const,
    darkText: true,
    textRight: false,
  },
  {
    title: 'Neural Network',
    description:
      'Custom design and development of neural network architectures tailored to your specific business needs.',
    image: '/15909 1.svg',
    bg: '#C4ECFF',
    layout: 'bg-full' as const,
    darkText: true,
    textRight: true,
    imgFilter: 'sepia(1) hue-rotate(200deg) saturate(4) brightness(1.05)',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   TEAM MEMBERS DATA
───────────────────────────────────────────────────────────────────────────── */
const TEAM = [
  { name: 'Krishna Challa', role: 'CEO MonkDB' },
  { name: 'Arjun Reddy', role: 'CTO MonkDB' },
  { name: 'Priya Sharma', role: 'VP Engineering' },
  { name: 'Rahul Verma', role: 'Head of AI' },
  { name: 'Sneha Patel', role: 'Head of Product' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   LINKEDIN ICON
───────────────────────────────────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" fill="white" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TEAM CARD COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function TeamCard({ member, delay }: { member: (typeof TEAM)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.25 } }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid #e8e8e8',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        cursor: 'pointer',
      }}
    >
      {/* Photo */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(160px, 22vw, 280px)',
          backgroundImage: 'url("/Mask group (1).svg")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundColor: '#f0ece6',
          overflow: 'hidden',
        }}
      >
        {/* LinkedIn badge */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            width: 36,
            height: 36,
            background: '#111',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <LinkedInIcon />
        </motion.div>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.05em', marginBottom: '2px', margin: 0 }}>
          / {member.role} /
        </p>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A38E8', margin: 0 }}>
          {member.name}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE ROW COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function FeatureRow({ feat, index }: { feat: (typeof FEATURES)[0]; index: number }) {
  const titleColor = feat.darkText ? '#0A1E6E' : '#ffffff'
  const descColor  = feat.darkText ? 'rgba(10,30,110,0.72)' : 'rgba(255,255,255,0.72)'
  const ROW_H      = 'clamp(180px, 22vw, 280px)'

  // Alternate slide direction: even rows from left, odd from right
  const xFrom = index % 2 === 0 ? -50 : 50

  const textBlock = (
    <motion.div
      className="relative flex flex-col justify-center w-full lg:max-w-[48%]"
      style={{ padding: 'clamp(20px, 3.5vw, 52px)', minHeight: ROW_H, zIndex: 2 }}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.h3 variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 400, lineHeight: 1.3, marginBottom: '10px', color: titleColor }}>
        {feat.title}
      </motion.h3>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1.75, margin: 0, color: descColor }}>
        {feat.description}
      </motion.p>
    </motion.div>
  )

  if (feat.layout === 'bg-full') {
    const hasImgFilter = 'imgFilter' in feat && feat.imgFilter
    const isTextRight  = 'textRight' in feat && feat.textRight

    return (
      <motion.div
        initial={{ opacity: 0, x: xFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        className="relative rounded-[20px] overflow-hidden"
        style={{ background: feat.bg, minHeight: ROW_H }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={feat.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            objectFit: 'cover',
            objectPosition: isTextRight ? 'left center' : 'center',
            ...(hasImgFilter
              ? { filter: feat.imgFilter as string, mixBlendMode: 'multiply' as const }
              : feat.darkText
              ? {}
              : { opacity: 0.55, mixBlendMode: 'screen' as const }),
          }}
        />

        {feat.darkText && !hasImgFilter && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isTextRight
                ? `linear-gradient(to left, ${feat.bg} 0%, ${feat.bg} 38%, transparent 62%)`
                : `linear-gradient(to right, ${feat.bg} 0%, ${feat.bg} 38%, transparent 62%)`,
              zIndex: 1,
            }}
          />
        )}

        <div className={isTextRight ? 'flex justify-end' : ''}>{textBlock}</div>
      </motion.div>
    )
  }

  if (feat.layout === 'img-text') {
    return (
      <motion.div
        initial={{ opacity: 0, x: xFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
        className="relative rounded-[20px] overflow-hidden flex"
        style={{ background: feat.bg, minHeight: ROW_H }}
      >
        {/* Left: image column — hidden on mobile */}
        <div
          className="hidden lg:block flex-shrink-0 overflow-hidden"
          style={{ width: 'imageWidth' in feat ? (feat.imageWidth as string) : '48%', position: 'relative' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={feat.image}
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {'imageOverlay' in feat && feat.imageOverlay && (
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, background: feat.imageOverlay as string, mixBlendMode: 'color', opacity: 0.95 }}
            />
          )}
        </div>

        {/* Right: text column */}
        <motion.div
          className="flex flex-col justify-center flex-1 w-full"
          style={{ padding: 'clamp(20px, 3.5vw, 52px)', minHeight: ROW_H }}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          <motion.h3 variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 400, lineHeight: 1.3, marginBottom: '10px', color: titleColor }}>
            {feat.title}
          </motion.h3>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1.75, margin: 0, color: descColor }}>
            {feat.description}
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  return null
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function WhyChooseUsPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', zip: '', message: '' })

  const introRef    = useRef(null)
  const introInView = useInView(introRef, { once: true, margin: '-60px' })

  const statRef    = useRef(null)
  const statInView = useInView(statRef, { once: true, margin: '-40px' })
  const count      = useCounter(500, statInView)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm({ firstName: '', lastName: '', email: '', phone: '', zip: '', message: '' })
  }

  /* Input fields for staggered reveal */
  const formFields = [
    { type: 'grid', fields: [
      { type: 'text', placeholder: 'First Name', key: 'firstName' },
      { type: 'text', placeholder: 'Last Name',  key: 'lastName'  },
    ]},
    { type: 'single', placeholder: 'Email Address', inputType: 'email', key: 'email' },
    { type: 'grid', fields: [
      { type: 'tel',  placeholder: 'Contact No',  key: 'phone' },
      { type: 'text', placeholder: 'Zip/Postal',  key: 'zip'   },
    ]},
    { type: 'textarea', placeholder: 'Message', key: 'message' },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner title="Why Choose Us" />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — INTRO
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={introRef} className="section-grid bg-white dark:bg-[#0f1623] pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-10">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 text-center">
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            animate={introInView ? 'show' : 'hidden'}
          >
            {/* Heading — line 1 */}
            <motion.div variants={fadeUp}>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3vw, 52px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: '#1A38E8',
                  marginBottom: '18px',
                  textDecoration: 'none',
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={introInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'block' }}
                >
                  Let&apos;s Build the Future of
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={introInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'block' }}
                >
                  Data Infrastructure — Together
                </motion.span>
              </h2>
            </motion.div>

            {/* Body text */}
            <motion.div
              variants={fadeUp}
              className="w-full flex justify-center"
            >
              <p
                className="text-gray-500 dark:text-gray-400"
                style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, maxWidth: '600px', lineHeight: 1.75, margin: '0 auto' }}
              >
                At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — WHAT MAKES MONKDB
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#0f1623] pb-10 sm:pb-14 lg:pb-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-[28px] overflow-hidden"
            style={{ background: '#07091A', padding: 'clamp(28px, 4vw, 52px) clamp(20px, 3.5vw, 48px)' }}
          >
            {/* Section header */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start mb-8 sm:mb-10 lg:mb-12"
              variants={stagger(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-white" style={{ fontSize: 'clamp(22px, 3vw, 52px)', fontWeight: 300, lineHeight: 1.12, letterSpacing: '-0.01em', margin: 0 }}>
                  What Makes MonkDB The Best Choice For Your Enterprise
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-5 lg:pt-2">
                <p className="text-white/65" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1.75, margin: 0 }}>
                  At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We&apos;ve seen firsthand how fragmented data infrastructure holds back innovation.
                </p>
                <motion.a
                  href="#features"
                  whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(26,56,232,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 self-start text-white"
                  style={{ background: '#1A38E8', borderRadius: '10px', padding: '12px 24px', fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px rgba(26,56,232,0.35)' }}
                >
                  Discover
                  <motion.span whileHover={{ x: 3, y: -3 }} style={{ display: 'inline-flex' }}>
                    <ArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 4 Feature rows */}
            <div id="features" className="flex flex-col gap-3">
              {FEATURES.map((feat, i) => (
                <FeatureRow key={i} feat={feat} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — TEAM
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Left — text block with staggered children */}
            <motion.div
              variants={stagger(0.13)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="w-full lg:w-[260px] flex-shrink-0"
            >
              <motion.span variants={fadeUp} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1A38E8', display: 'block', marginBottom: '10px' }}>
                [Team]
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-gray-900 dark:text-white"
                style={{ fontSize: 'clamp(22px, 3vw, 52px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '16px' }}
              >
                The Neural Network experts: uniting talent for intelligent solutions
              </motion.h2>

              {/* Animated counter */}
              <motion.div variants={fadeUp} ref={statRef}>
                <span
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 96px)',
                    fontWeight: 700,
                    letterSpacing: '-3px',
                    lineHeight: 1,
                    WebkitTextStroke: '2px #1A38E8',
                    color: 'transparent',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  +{count}
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-gray-500" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, marginBottom: '18px' }}>
                Ai Solution for our clients
              </motion.p>

              <motion.div variants={fadeUp}>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -2, borderColor: '#1A38E8', color: '#1A38E8' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  style={{ border: '1px solid #d1d5db', borderRadius: '999px', padding: '8px 18px', fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', fontWeight: 500, textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                >
                  Explore more
                  <ArrowUpRight size={12} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right — cards grid */}
            <div className="flex-1 min-w-0">
              {/* Mobile / tablet */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
                {TEAM.map((member, i) => (
                  <TeamCard key={member.name} member={member} delay={i * 0.07} />
                ))}
              </div>
              {/* Desktop — staggered 3-col */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-3 items-start">
                <div className="flex flex-col gap-3">
                  <TeamCard member={TEAM[0]} delay={0.08} />
                  <TeamCard member={TEAM[2]} delay={0.2} />
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  <TeamCard member={TEAM[1]} delay={0.14} />
                  <TeamCard member={TEAM[3]} delay={0.26} />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <TeamCard member={TEAM[4]} delay={0.32} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — QUOTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-8 sm:py-10">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 flex justify-center">
          <AnimatedWords
            text="At Movibase, our journey is deeply personal — born from decades of experience in enterprise systems, data management, and AI. We've seen firsthand how fragmented data infrastructure holds back innovation."
            className="text-gray-500 dark:text-gray-400 text-center"
            style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 400, maxWidth: '720px', lineHeight: 1.8 }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — CONTACT FORM
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-black py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-[24px] border border-white/10 p-6 sm:p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">

              {/* Left — heading + contact info */}
              <motion.div
                variants={stagger(0.13)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <motion.span variants={fadeUp} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ffffff', display: 'block', marginBottom: '14px' }}>
                  [Get In Touch]
                </motion.span>

                <motion.h2 variants={fadeUp} className="text-white" style={{ fontSize: 'clamp(22px, 3vw, 48px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                  Choose The Unique MonkDB Platform And Head Into The World Of Data Infrastructure With Confidence And Ease.
                </motion.h2>

                <motion.p variants={fadeUp} className="text-white/50" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1.75, marginBottom: '32px' }}>
                  Choose The Unique MonkDB Platform And Head Into The World Of Data Infrastructure And Save. It&apos;s Simple.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8">
                  {/* Phone */}
                  <div>
                    <p className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '8px' }}>Call Center</p>
                    <div className="flex items-center gap-2">
                      <motion.span
                        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
                        className="flex items-center justify-center rounded-full bg-white/10 flex-shrink-0"
                        style={{ width: 32, height: 32 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.04 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                        </svg>
                      </motion.span>
                      <a href="tel:+359893054546" className="text-white hover:text-blue-300 transition-colors" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                        +359 893 054 546
                      </a>
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <p className="text-white/70" style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '8px' }}>Email</p>
                    <div className="flex items-center gap-2">
                      <motion.span
                        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
                        className="flex items-center justify-center rounded-full bg-white/10 flex-shrink-0"
                        style={{ width: 32, height: 32 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </motion.span>
                      <a href="mailto:support@monkdb.com" className="text-white hover:text-blue-300 transition-colors" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                        support@monkdb.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right — form with staggered fields */}
              <motion.form
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {/* Row 1 */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                  <input type="text" placeholder="Last Name" value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                </motion.div>

                {/* Row 2 */}
                <motion.div variants={fadeUp}>
                  <input type="email" placeholder="Email Address" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                </motion.div>

                {/* Row 3 */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Contact No" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                  <input type="text" placeholder="Zip/Postal" value={form.zip}
                    onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                </motion.div>

                {/* Row 4 */}
                <motion.div variants={fadeUp}>
                  <textarea placeholder="Message" rows={5} value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="bg-white text-gray-800 placeholder-gray-400 outline-none transition-all resize-none w-full hover:border-blue-400 focus:border-blue-500"
                    style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '14px 18px', fontSize: '0.875rem' }} />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp} className="flex justify-start">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, y: -2, boxShadow: '0 14px 36px rgba(26,56,232,0.55)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                    style={{ background: '#1A38E8', color: '#fff', borderRadius: '999px', padding: '14px 48px', fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(26,56,232,0.35)' }}
                  >
                    Submit
                  </motion.button>
                </motion.div>
              </motion.form>

            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
