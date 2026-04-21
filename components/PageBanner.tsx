'use client'

/**
 * PageBanner — enterprise page header.
 * Split layout: left = breadcrumb + title + subtitle, right = animated 3D asset.
 * Brand-aligned blue gradient background. Minimal, tasteful motion.
 *
 * Usage:  <PageBanner title="About Us" subtitle="..." />
 */

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const

// Human-readable labels for breadcrumb
const LABEL_MAP: Record<string, string> = {
  features: 'Core Systems',
  'why-choose-us': 'Solutions',
  architecture: 'Industries',
  resources: 'Learn',
  about: 'Company',
}

// Short contextual subtitle per route
const SUBTITLE_MAP: Record<string, string> = {
  features: 'A unified data plane. Eight workloads. One engine.',
  'why-choose-us': 'Purpose-built for enterprises that cannot compromise on sovereignty.',
  architecture: 'Distributed by design. Deployed where your data lives.',
  resources: 'Documentation, reference architectures, and engineering deep-dives.',
  about: 'Building the AI-native data infrastructure for regulated enterprises.',
}

export default function PageBanner({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  const pathname = usePathname()
  const slug = pathname?.replace(/^\//, '') || ''
  const crumbLabel = LABEL_MAP[slug] || title
  const resolvedSubtitle = subtitle || SUBTITLE_MAP[slug] || ''

  const words = title.split(' ')

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'clamp(280px, 38vw, 460px)',
        backgroundColor: '#0A1676',
      }}
    >
      {/* ── BRAND GRADIENT BASE (matches Hero palette) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#1A38E8',
          backgroundImage: `
            radial-gradient(ellipse 80% 70% at 100% 0%, #050D6A 0%, #0A1A9A 35%, transparent 65%),
            radial-gradient(ellipse 60% 70% at 0% 100%, #0E26B8 0%, transparent 55%),
            linear-gradient(180deg, #0A1676 0%, #1230CC 100%)
          `,
        }}
      />

      {/* ── Soft spotlight from bottom-right (single, calm) ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.4, ease: SANAS_EASE }}
        style={{
          width: '70%',
          height: '140%',
          background: 'radial-gradient(ellipse, rgba(60,120,255,0.28) 0%, transparent 65%)',
          filter: 'blur(80px)',
          bottom: '-70%',
          right: '-10%',
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Dot grid, barely-there ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.55,
        }}
      />

      {/* ── CONTENT GRID ── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 h-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8 py-14 sm:py-20 lg:py-24"
          style={{ minHeight: 'inherit' }}
        >
          {/* LEFT — breadcrumb + title + subtitle */}
          <div className="max-w-[880px]">
            {/* Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-5 sm:mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: SANAS_EASE }}
            >
              <Link
                href="/"
                className="text-white/60 hover:text-white/90"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  transition: 'color 200ms ease',
                  textDecoration: 'none',
                }}
              >
                Home
              </Link>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-white"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}
              >
                {crumbLabel}
              </span>
            </motion.nav>

            {/* Title — mask reveal per word */}
            <h1
              className="text-white"
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: 'clamp(36px, 6.2vw, 88px)',
                fontWeight: 300,
                letterSpacing: '-0.025em',
                lineHeight: 1.04,
                textWrap: 'balance',
              }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-baseline"
                  style={{ marginRight: '0.25em', paddingBottom: '0.08em' }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1,
                      delay: 0.25 + i * 0.1,
                      ease: SANAS_EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {resolvedSubtitle && (
              <motion.p
                className="text-white/70 mt-5 sm:mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.25 + words.length * 0.1 + 0.1,
                  ease: SANAS_EASE,
                }}
                style={{
                  fontSize: 'clamp(15px, 1.25vw, 18px)',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  maxWidth: '620px',
                  letterSpacing: '0.005em',
                }}
              >
                {resolvedSubtitle}
              </motion.p>
            )}
          </div>

          {/* RIGHT — decorative 3D asset (desktop only, never blocks content) */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: SANAS_EASE }}
            style={{ width: 'clamp(220px, 22vw, 340px)', height: 'clamp(220px, 22vw, 340px)' }}
          >
            <motion.img
              src="/3d-shapes-glowing-with-bright-holographic-colors 1.svg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.35))' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom hairline divider (single, precise) ── */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: SANAS_EASE }}
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
          transformOrigin: 'center',
        }}
      />
    </section>
  )
}
