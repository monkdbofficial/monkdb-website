'use client'

/**
 * Partners — partner-program tier strip + 4-track partner types + benefits + CTA.
 * Distinct visual: tier ladder + 4-track grid (different from logo wall on customers).
 */

import { motion } from 'framer-motion'
import {
  Cloud,
  Plug,
  Briefcase,
  Code2,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function PartnersContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).partners) ?? {}) as Record<string, string>

  const TRACKS = [
    { Icon: Cloud, name: t.track1Name ?? 'Cloud Partners', body: t.track1Body ?? 'Hyperscalers and regional cloud platforms. Reference architectures across cloud, on-prem, and air-gapped deployments.', examples: [t.track1Ex1 ?? 'Hyperscalers', t.track1Ex2 ?? 'Regional clouds', t.track1Ex3 ?? 'Sovereign cloud providers'] },
    { Icon: Plug, name: t.track2Name ?? 'Technology Partners', body: t.track2Body ?? 'Tools, platforms, and frameworks that integrate natively with MonkDB. From streaming to AI to observability.', examples: [t.track2Ex1 ?? 'Kafka, Pulsar', t.track2Ex2 ?? 'Spark, dbt, Airflow', t.track2Ex3 ?? 'LangChain, LlamaIndex'] },
    { Icon: Briefcase, name: t.track3Name ?? 'System Integrators', body: t.track3Body ?? 'Global and boutique consultancies that deliver MonkDB at scale across industries.', examples: [t.track3Ex1 ?? 'Tier 1 SIs', t.track3Ex2 ?? 'Industry specialists', t.track3Ex3 ?? 'Public-sector firms'] },
    { Icon: Code2, name: t.track4Name ?? 'ISV and OEM', body: t.track4Body ?? 'Software vendors embedding MonkDB inside their products as the data and AI execution plane.', examples: [t.track4Ex1 ?? 'Vertical SaaS', t.track4Ex2 ?? 'Industrial OEMs', t.track4Ex3 ?? 'OT platforms'] },
  ]

  const TIERS = [
    { label: t.tier1Label ?? 'Registered', badge: '01', perks: [t.tier1Perk1 ?? 'Self-serve docs', t.tier1Perk2 ?? 'Community access', t.tier1Perk3 ?? 'Quarterly newsletters'] },
    { label: t.tier2Label ?? 'Select', badge: '02', perks: [t.tier2Perk1 ?? 'Joint solution briefs', t.tier2Perk2 ?? 'Tech enablement', t.tier2Perk3 ?? 'Co-marketing slots'], accent: true },
    { label: t.tier3Label ?? 'Premier', badge: '03', perks: [t.tier3Perk1 ?? 'Co-sell motions', t.tier3Perk2 ?? 'Named technical AM', t.tier3Perk3 ?? 'Joint customer success programs'], accent: true },
    { label: t.tier4Label ?? 'Strategic', badge: '04', perks: [t.tier4Perk1 ?? 'Joint product roadmap', t.tier4Perk2 ?? 'Executive sponsorship', t.tier4Perk3 ?? 'Long-term GTM commitments'] },
  ]

  const BENEFITS = [
    t.benefit1 ?? 'Production-grade enablement and certifications',
    t.benefit2 ?? 'Joint reference architectures across industries',
    t.benefit3 ?? 'Sandbox environments and co-developed PoVs',
    t.benefit4 ?? 'Co-marketing, conferences, and analyst briefings',
    t.benefit5 ?? 'Direct line to MonkDB engineering and product',
    t.benefit6 ?? 'Revenue share and co-sell programs',
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Partners'}
        subtitle={t.subtitle ?? 'Build, deliver, and scale the AI-Native Operational Intelligence System with us.'}
      />

      {/* 4 partner tracks */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.tracksLabel ?? 'Tracks'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginTop: 'clamp(24px, 3vw, 48px)',
              marginBottom: 'clamp(28px, 3.5vw, 56px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.tracksTitlePart1 ?? 'Four ways to'}{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.tracksTitlePart2 ?? 'partner with MonkDB'}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TRACKS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl flex flex-col"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px)',
                }}
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl mb-5"
                  style={{
                    width: 'clamp(40px, 4vw, 48px)',
                    height: 'clamp(40px, 4vw, 48px)',
                    background:
                      'linear-gradient(135deg, rgba(26,56,232,0.10) 0%, rgba(30,138,255,0.06) 100%)',
                    border: '1px solid rgba(26,56,232,0.18)',
                    color: '#1A38E8',
                  }}
                >
                  <t.Icon size={20} strokeWidth={1.6} />
                </div>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 21px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                  }}
                >
                  {t.name}
                </h3>
                <p
                  className="text-gray-600 flex-1"
                  style={{
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: '0 0 16px 0',
                  }}
                >
                  {t.body}
                </p>
                <ul
                  className="flex flex-wrap gap-1.5"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {t.examples.map((x) => (
                    <li
                      key={x}
                      style={{
                        display: 'inline-block',
                        padding: '3px 8px',
                        borderRadius: '5px',
                        background: 'white',
                        border: '1px solid rgba(10,34,128,0.10)',
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10.5px',
                        fontWeight: 500,
                        color: 'rgba(10,34,128,0.7)',
                      }}
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier ladder */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.tiersLabel ?? 'Program tiers'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 48px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: 'clamp(24px, 3vw, 48px)',
              marginBottom: 'clamp(28px, 3.5vw, 48px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.tiersTitle ?? 'From registered to strategic'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="relative rounded-2xl"
                style={{
                  background: tier.accent
                    ? 'linear-gradient(160deg, #1A38E8 0%, #0A2280 65%, #050D6A 100%)'
                    : 'white',
                  color: tier.accent ? 'white' : '#0A2280',
                  border: tier.accent
                    ? '1px solid rgba(127,179,255,0.30)'
                    : '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px)',
                  boxShadow: tier.accent
                    ? '0 18px 44px rgba(10,34,128,0.28)'
                    : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: tier.accent ? '#7FB3FF' : '#1A38E8',
                    }}
                  >
                    {t.tierLabel ?? 'Tier'} {tier.badge}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    fontWeight: 500,
                    letterSpacing: '-0.012em',
                    lineHeight: 1.2,
                    margin: '0 0 16px 0',
                  }}
                >
                  {tier.label}
                </h3>
                <ul
                  className="flex flex-col gap-2"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {tier.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2"
                      style={{
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        fontWeight: 400,
                        lineHeight: 1.55,
                        color: tier.accent
                          ? 'rgba(255,255,255,0.78)'
                          : 'rgba(31,41,55,0.85)',
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        strokeWidth={1.8}
                        style={{
                          color: tier.accent ? '#7FB3FF' : '#1A38E8',
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + apply CTA */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 sm:gap-12 lg:gap-16 items-start">
            <div>
              <SectionLabel text={t.benefitsLabel ?? 'Benefits'} />
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(24px, 3.2vw, 40px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginTop: 'clamp(20px, 2.4vw, 40px)',
                  marginBottom: 'clamp(28px, 3.5vw, 40px)',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {t.benefitsTitle ?? 'What you get as a partner'}
              </h2>
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                style={{ listStyle: 'none', padding: 0, margin: '32px 0 0 0' }}
              >
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3"
                    style={{
                      padding: '14px 16px',
                      background: '#F8F4F0',
                      borderRadius: '10px',
                      border: '1px solid rgba(10,34,128,0.08)',
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      fontWeight: 500,
                      color: '#374151',
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.8}
                      style={{
                        color: '#1A38E8',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <aside
              className="rounded-2xl text-white relative overflow-hidden lg:sticky lg:top-32"
              style={{
                background:
                  'linear-gradient(135deg, #1A38E8 0%, #0A2280 60%, #050D6A 100%)',
                padding: 'clamp(28px, 3vw, 40px)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-[10%] right-[10%]"
                style={{
                  height: '1px',
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
              <span
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7FB3FF',
                }}
              >
                {t.applyLabel ?? 'Apply'}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(22px, 2vw, 30px)',
                  fontWeight: 400,
                  letterSpacing: '-0.012em',
                  lineHeight: 1.2,
                  margin: '14px 0 14px 0',
                }}
              >
                {t.applyTitle ?? 'Join the MonkDB Partner Program'}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: '0 0 24px 0',
                }}
              >
                {t.applyBody ?? 'Submit a partner inquiry. Our team will be in touch within two business days.'}
              </p>
              <a
                href="mailto:partners@monkdb.com"
                className="inline-flex items-center gap-2"
                style={{
                  background: 'white',
                  color: '#0A2280',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                {t.applyCta ?? 'Become a partner'}
                <ArrowUpRight size={14} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner heading={t.ctaHeading ?? 'Build with us. Sell with us. Win with us.'} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
