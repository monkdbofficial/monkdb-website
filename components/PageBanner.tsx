'use client'

/**
 * PageBanner — enterprise inner-page header.
 *
 * Pattern modeled on Snowflake / Databricks / Confluent inner pages:
 *   breadcrumb (small, uppercase, muted)
 *   title      (large display, fontWeight 300, white)
 *   accent rule (thin brand gradient)
 *   subtitle   (one sentence, white/70)
 *   meta chips (route-specific trust signals — optional)
 *
 * No rotating 3D objects, no perspective floors, no orbiting particles,
 * no multi-color route accents. One brand palette, one entry animation.
 */

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { locales } from '@/i18n/config'

const EASE = [0.165, 0.84, 0.44, 1] as const

// Slug to dictionary key prefix. Slug comes from the URL after the locale.
const SLUG_KEY: Record<string, string> = {
  features: 'features',
  'why-choose-us': 'whyChooseUs',
  architecture: 'architecture',
  resources: 'resources',
  about: 'about',
}

// English fallbacks used when a locale's JSON has not been regenerated yet.
const FALLBACK_TITLE: Record<string, string> = {
  features: 'Features',
  'why-choose-us': 'Why Choose Us',
  architecture: 'Architecture',
  resources: 'Resources',
  about: 'About Us',
}
const FALLBACK_CRUMB: Record<string, string> = {
  features: 'Core Systems',
  'why-choose-us': 'Solutions',
  architecture: 'Industries',
  resources: 'Learn',
  about: 'Company',
}
const FALLBACK_SUBTITLE: Record<string, string> = {
  features: 'A unified data plane. Nine workloads. One engine.',
  'why-choose-us':
    'Purpose-built for enterprises that cannot compromise on sovereignty.',
  architecture: 'Distributed by design. Deployed where your data lives.',
  resources:
    'Documentation, reference architectures, and engineering deep-dives.',
  about:
    'Building the AI-native data infrastructure for regulated enterprises.',
}

// Route-specific meta chips. Tech keywords stay English globally.
const META_MAP: Record<string, string[]> = {
  features: ['9 Workloads', '1 Engine', 'ARM + x86_64'],
  'why-choose-us': ['SOC 2 Type II', 'ISO 27001', 'GDPR'],
  architecture: ['Cloud', 'On-Prem', 'Edge'],
  resources: ['Documentation', 'Reference Architectures', 'Benchmarks'],
  about: ['Founded 2023', 'Remote-first', 'Global'],
}

export default function PageBanner({
  title: titleProp,
  subtitle,
}: {
  title?: string
  subtitle?: string
}) {
  const pathname = usePathname()
  const { dict } = useI18n()
  const banners = ((dict as Record<string, unknown>).pageBanners ?? {}) as Record<string, string>

  // Strip the locale segment so /en/about → "about".
  const segments = (pathname ?? '').split('/').filter(Boolean)
  if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
    segments.shift()
  }
  const slug = segments[0] ?? ''
  const keyBase = SLUG_KEY[slug]

  const title =
    titleProp ??
    (keyBase ? banners[`${keyBase}Title`] : undefined) ??
    FALLBACK_TITLE[slug] ??
    ''
  const crumbLabel =
    (keyBase ? banners[`${keyBase}Crumb`] : undefined) ??
    FALLBACK_CRUMB[slug] ??
    title
  const resolvedSubtitle =
    subtitle ??
    (keyBase ? banners[`${keyBase}Subtitle`] : undefined) ??
    FALLBACK_SUBTITLE[slug] ??
    ''
  const metaChips = META_MAP[slug] || []
  const words = title.split(' ')

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'clamp(260px, 28vw, 380px)',
        backgroundColor: '#0A2280',
      }}
    >
      {/* ── Depth: base gradient + two slowly drifting radial highlights ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A2280 0%, #050D6A 100%)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        animate={{ x: [-6, 6, -6], y: [-4, 4, -4] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 70% at 100% 0%, rgba(26,56,232,0.55) 0%, transparent 60%)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        animate={{ x: [4, -4, 4], y: [3, -3, 3] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 40% 60% at 0% 20%, rgba(5,13,106,0.55) 0%, transparent 55%)',
        }}
      />

      {/* ── L1 · Photographic backdrop (Mask group, luminosity-blended) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ mixBlendMode: 'luminosity', opacity: 0.55 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Mask group.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── L2 · Isometric data-plane grid receding into horizon ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden"
        style={{ height: '70%', perspective: '600px' }}
      >
        <div
          className="pb-grid"
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'rotateX(58deg) translateZ(-40px)',
            transformOrigin: 'bottom center',
            backgroundImage: `
              linear-gradient(rgba(127,179,255,0.22) 1px, transparent 1px),
              linear-gradient(90deg, rgba(127,179,255,0.16) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 85%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 85%)',
            animation: 'banner-grid-pan 6s linear infinite',
          }}
        />
      </div>

      {/* ── L3 · Continuous SVG parallax waves — 6 layers, never pause ── */}
      <svg
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: '58%', width: '100%' }}
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="pb-wave-path"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          <use href="#pb-wave-path" x="48" y="0" fill="rgba(127,179,255,0.10)" />
          <use href="#pb-wave-path" x="48" y="3" fill="rgba(127,179,255,0.13)" />
          <use href="#pb-wave-path" x="48" y="5" fill="rgba(30,138,255,0.16)" />
          <use href="#pb-wave-path" x="48" y="7" fill="rgba(26,56,232,0.20)" />
          <use href="#pb-wave-path" x="48" y="9" fill="rgba(26,56,232,0.26)" />
          <use href="#pb-wave-path" x="48" y="11" fill="rgba(10,34,128,0.34)" />
        </g>
      </svg>

      {/* ── L4 · Right-side floating halo + decorative shape ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none hidden md:block"
        style={{
          right: 'clamp(-60px, 2vw, 40px)',
          top: '50%',
          width: 'clamp(280px, 28vw, 460px)',
          height: 'clamp(280px, 28vw, 460px)',
          transform: 'translateY(-50%)',
        }}
      >
        {/* Soft halo glow */}
        <div
          className="pb-halo absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(30,138,255,0.30) 0%, rgba(26,56,232,0.18) 45%, transparent 70%)',
            filter: 'blur(28px)',
            animation: 'banner-halo-breathe 7s ease-in-out infinite',
          }}
        />
        {/* Floating shape (uses the Vector asset as a thin-stroked orbital ring) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Vector.svg"
          alt=""
          className="pb-shape absolute inset-0 w-full h-full"
          style={{
            objectFit: 'contain',
            opacity: 0.35,
            filter:
              'drop-shadow(0 0 18px rgba(30,138,255,0.55)) drop-shadow(0 0 40px rgba(26,56,232,0.35))',
            animation: 'banner-float-shape 22s linear infinite',
          }}
        />
      </div>

      {/* ── L5 · Subtle noise/grain overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.18,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '160px 160px',
        }}
      />

      {/* ── Hairline top rule — high-end editorial touch ── */}
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <div className="py-20 sm:py-24 lg:py-28">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 mb-7 sm:mb-9"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            <Link
              href="/"
              className="banner-crumb-link"
              style={{
                fontSize: '11.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.5)',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 200ms ease',
              }}
            >
              {banners.home ?? 'Home'}
            </Link>
            <svg
              aria-hidden="true"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              {crumbLabel}
            </span>
          </motion.nav>

          {/* Title — single color, word-by-word mask reveal */}
          <h1
            className="text-white"
            style={{
              fontSize: 'clamp(36px, 6vw, 84px)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              textWrap: 'balance',
              maxWidth: 'min(960px, 62%)',
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
                style={{ marginRight: '0.24em', paddingBottom: '0.06em' }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.85,
                    delay: 0.18 + i * 0.08,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Accent rule — 48×2, gradient fill + traveling shine sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.25 + words.length * 0.08,
              ease: EASE,
            }}
            className="relative overflow-hidden"
            style={{
              height: '2px',
              width: '56px',
              marginTop: '24px',
              borderRadius: '2px',
              background:
                'linear-gradient(90deg, #1A38E8 0%, #1E8AFF 100%)',
              transformOrigin: 'left',
            }}
          >
            <motion.span
              aria-hidden="true"
              animate={{ x: ['-120%', '240%'] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: 'easeInOut',
                delay: 1.2 + words.length * 0.08,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Subtitle */}
          {resolvedSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35 + words.length * 0.08,
                ease: EASE,
              }}
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.72)',
                marginTop: '18px',
                lineHeight: 1.55,
                maxWidth: '620px',
                letterSpacing: '0.005em',
              }}
            >
              {resolvedSubtitle}
            </motion.p>
          )}

          {/* Meta chips — trust signals, staggered entrance */}
          {metaChips.length > 0 && (
            <ul
              className="flex flex-wrap gap-2 mt-7 sm:mt-8"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {metaChips.map((chip, i) => (
                <motion.li
                  key={chip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.55 + words.length * 0.08 + i * 0.08,
                    ease: EASE,
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 2.4,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#1E8AFF',
                      boxShadow: '0 0 6px rgba(30,138,255,0.9)',
                      display: 'inline-block',
                    }}
                  />
                  {chip}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Bottom hairline — closes the block cleanly ── */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
        }}
      />
    </section>
  )
}
