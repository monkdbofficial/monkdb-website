'use client'

/**
 * MonkSmartX hub — bespoke portfolio page.
 *
 * Visual identity: portfolio violet (#8B5CF6) on the MonkDB navy. Hero shows
 * the 6 SmartX products as a constellation around the SmartX core. Mid-block
 * is an industry × capability matrix. Distinct from MonkDB and MonkEdge.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Boxes,
  Pickaxe,
  Truck,
  Banknote,
  TrendingUp,
  ShoppingBag,
  Factory,
  ArrowUpRight,
  Sparkles,
  Layers,
  Wand2,
  Cpu,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

const ACCENT = '#8B5CF6'
const EASE = [0.165, 0.84, 0.44, 1] as const

type Product = {
  slug: string
  name: string
  industry: string
  Icon: LucideIcon
  accent: string
  body: string
}

const PORTFOLIO: Product[] = [
  {
    slug: 'smartmine',
    name: 'Monk SmartMine',
    industry: 'Mining',
    Icon: Pickaxe,
    accent: '#D97706',
    body: 'Real-time operational intelligence for mining ecosystems. Ventilation-on-demand, predictive maintenance, safety.',
  },
  {
    slug: 'smartmobility',
    name: 'Monk SmartMobility',
    industry: 'Mobility',
    Icon: Truck,
    accent: '#0EA5A8',
    body: 'Connected and autonomous mobility at fleet and city scale. Dynamic routing, fleet optimization, predictive mobility.',
  },
  {
    slug: 'smartfinance',
    name: 'Monk SmartFinance',
    industry: 'BFSI',
    Icon: Banknote,
    accent: '#10B981',
    body: 'Real-time financial intelligence and risk management. Fraud, risk scoring, AML, audit-grade lineage.',
  },
  {
    slug: 'smarttrade',
    name: 'Monk SmartTrade',
    industry: 'Trading',
    Icon: TrendingUp,
    accent: '#A855F7',
    body: 'AI-native trading and execution systems. Multi-source signal fusion, risk-aware strategies, continuous learning.',
  },
  {
    slug: 'smartretail',
    name: 'Monk SmartRetail',
    industry: 'Retail',
    Icon: ShoppingBag,
    accent: '#F472B6',
    body: 'Real-time customer and operations intelligence. Personalization, demand forecasting, dynamic pricing.',
  },
  {
    slug: 'smartmanufacturing',
    name: 'Monk SmartManufacturing',
    industry: 'Manufacturing',
    Icon: Factory,
    accent: '#0EA5E9',
    body: 'Adaptive manufacturing systems. Predictive maintenance, process optimization, real-time control loops.',
  },
]

const VALUE_PILLARS = [
  {
    Icon: Sparkles,
    title: 'Domain-specific data and workflows',
    body: 'Pre-modeled schemas, ingestion paths, and workflows tuned to each industry.',
  },
  {
    Icon: Layers,
    title: 'Real-time operational context',
    body: 'Live state for every entity that matters in the domain.',
  },
  {
    Icon: Wand2,
    title: 'Automated decisioning',
    body: 'Models, rules, and policy that run continuously, not on demand.',
  },
  {
    Icon: Cpu,
    title: 'Direct business-system execution',
    body: 'Actions land in the systems that operate the business, not a side dashboard.',
  },
]

const TIME_TO_VALUE = [
  { value: '2 wks', label: 'PoV scoping with the SmartX team' },
  { value: '6–8 wks', label: 'Production-grade pilot deployment' },
  { value: '~1 quarter', label: 'Time-to-ROI on representative customers' },
]

export default function MonkSmartXHubContent() {
  const { locale } = useI18n()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── HERO — 6 products as a constellation around the SmartX core ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #1F0A36 0%, #0E0721 50%, #050D6A 100%)',
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '0%',
            right: '-15%',
            width: '60%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 65%)`,
            filter: 'blur(70px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(139,92,246,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.55,
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                }}
              >
                <Boxes size={13} strokeWidth={2} />
                Products · MonkSmartX
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(44px, 6.5vw, 96px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  margin: '0 0 28px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Domain intelligence,
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 0%, ${ACCENT} 50%, #ffffff 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: 'smartxSheen 7s ease-in-out infinite',
                    fontWeight: 400,
                  }}
                >
                  on MonkDB.
                </span>
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  width: '64px',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, ${ACCENT} 0%, #1A38E8 100%)`,
                  marginBottom: '28px',
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 18px 0',
                  maxWidth: '560px',
                }}
              >
                A suite of domain-driven intelligent platforms built on
                MonkDB. Production-grade execution systems, tailored to every
                industry.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                MonkDB provides the unified foundation. MonkSmartX brings
                industry-specific intelligence and execution. Adopt instead of
                build.
              </p>
            </motion.div>

            {/* Constellation visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="relative w-full mx-auto"
              style={{ width: '100%', maxWidth: 520, height: 'min(70vw, 520px)', aspectRatio: '1 / 1' }}
            >
              {/* Outer rotating ring (vis container) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed ${ACCENT}55`,
                  animation: 'smartxSpin 36s linear infinite',
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute"
                style={{
                  inset: '15%',
                  borderRadius: '50%',
                  border: `1px dashed ${ACCENT}33`,
                  animation: 'smartxSpin 52s linear reverse infinite',
                }}
              />

              {/* Center SmartX hub */}
              <div
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #6D28D9 0%, #1E1B4B 100%)',
                  border: `1px solid ${ACCENT}AA`,
                  boxShadow: `0 0 60px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Boxes
                  size={28}
                  strokeWidth={1.5}
                  style={{ color: ACCENT, marginBottom: 4 }}
                />
                <span
                  className="text-white"
                  style={{
                    fontSize: 'clamp(12px, 1.1vw, 14px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                  }}
                >
                  SmartX Suite
                </span>
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: ACCENT,
                    marginTop: 2,
                  }}
                >
                  6 PRODUCTS
                </span>
              </div>
              <motion.div
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: '34%',
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}99`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* 6 product nodes positioned around the ring */}
              {PORTFOLIO.map((p, i) => {
                const angle = (i / PORTFOLIO.length) * Math.PI * 2 - Math.PI / 2
                const r = 45
                const x = 50 + Math.cos(angle) * r
                const y = 50 + Math.sin(angle) * r
                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      heroInView ? { opacity: 1, scale: 1 } : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.08,
                      ease: EASE,
                    }}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center rounded-full text-white"
                      style={{
                        width: 'clamp(48px, 5.2vw, 66px)',
                        height: 'clamp(48px, 5.2vw, 66px)',
                        background: 'rgba(7,9,26,0.85)',
                        border: `1.5px solid ${p.accent}`,
                        boxShadow: `0 12px 28px ${p.accent}44`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <p.Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{ color: p.accent }}
                      />
                    </div>
                    <div
                      className="absolute mt-1 whitespace-nowrap"
                      style={{
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: p.accent,
                        marginTop: 6,
                      }}
                    >
                      {p.industry.toUpperCase()}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why SmartX — 4 value pillars ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20 lg:py-24 section-grid relative">
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-12">
            <div>
              <SectionLabel text="Why SmartX" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Adopt instead of{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  build from scratch
                </span>
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 self-end"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Every SmartX platform inherits the MonkDB unified data plane and
              adds production-grade industry intelligence on top. You get the
              foundation and the domain knowledge in one deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {VALUE_PILLARS.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl card-surface"
                style={{
                  padding: 'clamp(22px, 2.6vw, 30px)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-xl mb-4"
                  style={{
                    width: 44,
                    height: 44,
                    background: `${ACCENT}1A`,
                    border: `1px solid ${ACCENT}55`,
                    color: ACCENT,
                  }}
                >
                  <v.Icon size={20} strokeWidth={1.6} />
                </span>
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: ACCENT,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-[#0A2280] dark:text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '8px 0 8px 0',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio — 6 product cards in a 3×2 grid ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="The portfolio" />
          <h2
            className="text-gray-900 dark:text-white mt-6 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '24px 0 0 0',
              textDecoration: 'none',
            }}
          >
            Six production platforms,{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              all on MonkDB
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PORTFOLIO.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
              >
                <Link
                  href={localizedHref(`/products/monksmartx/${p.slug}`, locale)}
                  className="smartx-portfolio-card group block relative rounded-2xl overflow-hidden h-full card-surface"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top accent stripe — uses the product's industry color */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: '3px',
                      background: `linear-gradient(90deg, ${p.accent} 0%, ${p.accent}66 70%, transparent 100%)`,
                    }}
                  />
                  {/* Header */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding:
                        'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 30px)',
                      borderBottom: '1px solid rgba(10,34,128,0.06)',
                      background: `linear-gradient(180deg, ${p.accent}10 0%, transparent 100%)`,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center rounded-xl"
                      style={{
                        width: 48,
                        height: 48,
                        background: `${p.accent}1A`,
                        border: `1px solid ${p.accent}66`,
                        color: p.accent,
                      }}
                    >
                      <p.Icon size={22} strokeWidth={1.5} />
                    </span>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: p.accent,
                      }}
                    >
                      {p.industry}
                    </span>
                  </div>
                  {/* Body */}
                  <div
                    className="flex-1 flex flex-col"
                    style={{
                      padding:
                        'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 30px)',
                    }}
                  >
                    <h3
                      className="text-[#0A2280] dark:text-white"
                      style={{
                        fontSize: 'clamp(18px, 1.7vw, 24px)',
                        fontWeight: 500,
                        letterSpacing: '-0.012em',
                        lineHeight: 1.25,
                        margin: '0 0 10px 0',
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400 flex-1"
                      style={{
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        fontWeight: 400,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {p.body}
                    </p>
                    <div
                      className="flex items-center justify-between mt-6"
                      style={{
                        color: p.accent,
                        fontSize: '12.5px',
                        fontWeight: 600,
                      }}
                    >
                      <span>Explore</span>
                      <span
                        aria-hidden="true"
                        className="smartx-portfolio-arrow inline-flex items-center justify-center"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: `${p.accent}10`,
                          transition: 'all 280ms ease',
                        }}
                      >
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Time-to-value strip ── */}
      <section
        className="relative overflow-hidden py-14 sm:py-20"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #1E0E40 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(139,92,246,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.55,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Time to value" variant="dark" />
          <h2
            className="text-white mt-6 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '24px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Production-grade in{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              one quarter
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8">
            {TIME_TO_VALUE.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${ACCENT}33`,
                  padding: 'clamp(22px, 2.4vw, 30px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: ACCENT,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="mt-3"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'white',
                  }}
                >
                  {t.value}
                </div>
                <p
                  className="mt-3"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    margin: '12px 0 0 0',
                  }}
                >
                  {t.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Extendable platform message ── */}
      <section className="bg-white dark:bg-[#0f1623] py-14 sm:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-10 lg:gap-16 items-center rounded-2xl card-surface-alt"
            style={{
              padding: 'clamp(28px, 3vw, 48px) clamp(24px, 2.6vw, 40px)',
            }}
          >
            <div>
              <SectionLabel text="Extendable" />
              <h3
                className="text-[#0A2280] dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(24px, 3vw, 38px)',
                  fontWeight: 300,
                  letterSpacing: '-0.012em',
                  lineHeight: 1.2,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                }}
              >
                MonkSmartX is not limited to predefined solutions.
              </h3>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400"
              style={{
                fontSize: 'clamp(14px, 1.15vw, 16px)',
                fontWeight: 400,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              New domain-specific platforms can be built rapidly on MonkDB,
              extending intelligence and execution into any industry or
              function. The same primitives, the same operational model, the
              same trust boundary.
            </p>
          </motion.div>
        </div>
      </section>

      <CTABanner heading="Adopt domain intelligence. Skip the build." />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes smartxSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes smartxSheen {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
        :global(.smartx-portfolio-card:hover) {
          transform: translateY(-4px);
          border-color: ${ACCENT}55 !important;
          box-shadow: 0 20px 44px rgba(10, 34, 128, 0.12);
          transition:
            transform 320ms ease,
            box-shadow 320ms ease,
            border-color 320ms ease;
        }
        :global(.smartx-portfolio-card:hover .smartx-portfolio-arrow) {
          transform: translate(2px, -2px);
        }
      `}</style>
    </main>
  )
}
