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
import { renderBrand } from './BrandAccent'
import FloatingShapes from './effects/FloatingShapes'
import BeamsBackground from './effects/BeamsBackground'
import FallingPattern from './effects/FallingPattern'
import Aurora from './effects/Aurora'
import Spotlight from './effects/Spotlight'
import GridBeam from './effects/GridBeam'
import Constellation from './effects/Constellation'

export type PageBannerVariant =
  | 'shapes'        // calm drifting pills (about / company)
  | 'beams'         // diagonal canvas beams (why-choose-us / premium)
  | 'falling'       // falling streaks (resources / developers / learn)
  | 'aurora'        // flowing colour bands (industries / solutions)
  | 'spotlight'     // single radial light sweep (features / products)
  | 'grid'          // grid + travelling beam (architecture / platform)
  | 'constellation' // node-link particle field (core-systems / distributed story)
  | 'none'          // no variant overlay

/** First path segment to default variant. */
const ROUTE_VARIANT: Record<string, PageBannerVariant> = {
  about: 'shapes',
  company: 'shapes',
  'why-choose-us': 'beams',
  architecture: 'grid',
  platform: 'grid',
  'core-systems': 'constellation',
  developers: 'falling',
  resources: 'falling',
  features: 'spotlight',
  products: 'spotlight',
  industries: 'aurora',
  solutions: 'aurora',
}

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
  features: 'Platform',
  'why-choose-us': 'Why MonkDB',
  architecture: 'Platform',
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

// Route-specific meta chips. Tech keywords stay English globally; copy chips
// (resources, about) are resolved at render time against the dictionary.
function buildMetaMap(banners: Record<string, string>): Record<string, string[]> {
  return {
    features: ['9 Workloads', '1 Engine', 'ARM + x86_64'],
    'why-choose-us': ['Air-gapped ready', 'On-prem', 'Self-hosted'],
    architecture: ['Cloud', 'On-Prem', 'Edge'],
    resources: [
      'Documentation',
      banners.metaResourcesArchitectures ?? 'Reference Architectures',
      banners.metaResourcesBenchmarks ?? 'Benchmarks',
    ],
    about: [
      banners.metaAboutFounded ?? 'Founded 2023',
      banners.metaAboutRemote ?? 'Remote-first',
      banners.metaAboutGlobal ?? 'Global',
    ],
  }
}

export default function PageBanner({
  title: titleProp,
  subtitle,
  variant,
}: {
  title?: string
  subtitle?: string
  /** Animated background variant. Auto-picked from the path when omitted. */
  variant?: PageBannerVariant
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
  const metaChips = buildMetaMap(banners)[slug] || []
  const words = title.split(' ')
  const resolvedVariant: PageBannerVariant = variant ?? ROUTE_VARIANT[slug] ?? 'shapes'

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

      {/* ── Per-route variant animation (lifted + adapted from 21st.dev).
            Enterprise rule: ONE animated visual signature per banner. The old
            photographic backdrop, isometric grid, decorative vector ring and
            noise overlay have been removed to let the variant breathe. ── */}
      {resolvedVariant === 'shapes' && <FloatingShapes className="opacity-70" />}
      {resolvedVariant === 'beams' && <BeamsBackground intensity="medium" />}
      {resolvedVariant === 'falling' && (
        <FallingPattern
          color="rgba(127,179,255,0.45)"
          backgroundColor="transparent"
          blurIntensity="0.4em"
          density={4}
          className="opacity-55"
        />
      )}
      {resolvedVariant === 'aurora' && <Aurora intensity="medium" />}
      {resolvedVariant === 'spotlight' && (
        <Spotlight className="top-[-20%] left-[-10%] h-[200%] w-[120%]" />
      )}
      {resolvedVariant === 'grid' && <GridBeam className="opacity-90" />}
      {resolvedVariant === 'constellation' && (
        <Constellation
          className="opacity-85"
          particleCount={60}
          speed={0.3}
          connectionDistance={130}
        />
      )}

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
            aria-label={banners.breadcrumbAria ?? 'Breadcrumb'}
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
              textDecoration: 'none',
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
                  {renderBrand(word)}
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
              {renderBrand(resolvedSubtitle)}
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
