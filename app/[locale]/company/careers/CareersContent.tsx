'use client'

/**
 * Careers — open roles list grouped by team + culture grid + perks strip + hiring process.
 * Distinct visual: structured job-board layout with team accordion sections.
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  Code2,
  Sparkles,
  Users,
  Megaphone,
  Globe2,
  HeartPulse,
  GraduationCap,
  Plane,
  Coins,
  LaptopMinimal,
  Inbox,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import type { JobItem, JobTeam } from '@/content/jobs'

const EASE = [0.165, 0.84, 0.44, 1] as const

const TEAM_ICONS: Record<JobTeam, LucideIcon> = {
  engineering: Code2,
  product: Sparkles,
  gtm: Megaphone,
  operations: Users,
}

const TEAM_ORDER: JobTeam[] = ['engineering', 'product', 'gtm', 'operations']

export default function CareersContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).careers) ?? {}) as Record<string, string>

  const [jobs, setJobs] = useState<JobItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/jobs', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { items?: JobItem[] }) => {
        if (!cancelled) setJobs(data.items ?? [])
      })
      .catch(() => {
        if (!cancelled) setJobs([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const teamLabel = (team: JobTeam): string => {
    if (team === 'engineering') return t.teamEngineering ?? 'Engineering'
    if (team === 'product') return t.teamProduct ?? 'Product and Design'
    if (team === 'gtm') return t.teamGtm ?? 'Go-to-market'
    return t.teamOps ?? 'Operations'
  }

  const TEAMS = (() => {
    if (!jobs || jobs.length === 0) return []
    const grouped: Record<JobTeam, JobItem[]> = {
      engineering: [],
      product: [],
      gtm: [],
      operations: [],
    }
    for (const j of jobs) {
      const team = (TEAM_ORDER.includes(j.team) ? j.team : 'operations') as JobTeam
      grouped[team].push(j)
    }
    return TEAM_ORDER
      .filter((team) => grouped[team].length > 0)
      .map((team) => ({
        name: teamLabel(team),
        Icon: TEAM_ICONS[team],
        roles: grouped[team],
      }))
  })()

  const VALUES = [
    { name: t.value1Title ?? 'Sovereignty by design', body: t.value1Body ?? 'We build for control. Every decision, from architecture to staffing, defaults to giving people and customers more agency, not less.' },
    { name: t.value2Title ?? 'Continuous over batch', body: t.value2Body ?? 'We work in real time. Decisions land fast, feedback loops close fast, and we keep the operating cadence high.' },
    { name: t.value3Title ?? 'Production over demos', body: t.value3Body ?? 'We optimize for what works at 3am in production, not what looks good in a deck. Real shipped software is the unit of progress.' },
    { name: t.value4Title ?? 'Distributed by default', body: t.value4Body ?? 'We are remote-first, async-aware, and bias toward written, durable communication so the best ideas surface anywhere.' },
  ]

  const PERKS = [
    { Icon: Globe2, label: t.perk1 ?? 'Remote-first across global timezones' },
    { Icon: HeartPulse, label: t.perk2 ?? 'Premium health insurance for you and family' },
    { Icon: GraduationCap, label: t.perk3 ?? 'Annual learning and conference budget' },
    { Icon: Plane, label: t.perk4 ?? 'Quarterly team offsites' },
    { Icon: Coins, label: t.perk5 ?? 'Meaningful equity from day one' },
    { Icon: LaptopMinimal, label: t.perk6 ?? 'Top-tier hardware and software stipend' },
  ]

  const PROCESS = [
    { step: '01', title: t.process1Title ?? 'Apply', body: t.process1Body ?? 'Send a CV and a short note about why MonkDB.' },
    { step: '02', title: t.process2Title ?? 'Intro chat', body: t.process2Body ?? '30 minutes with our talent team to align on context.' },
    { step: '03', title: t.process3Title ?? 'Craft loop', body: t.process3Body ?? 'Two role-specific conversations focused on real work.' },
    { step: '04', title: t.process4Title ?? 'Team meet', body: t.process4Body ?? 'Spend time with future teammates and leaders.' },
    { step: '05', title: t.process5Title ?? 'Offer', body: t.process5Body ?? 'Aligned compensation, role, and start date.' },
  ]

  const totalRoles = TEAMS.reduce((acc, team) => acc + team.roles.length, 0)
  const loaded = jobs !== null
  const hasRoles = loaded && totalRoles > 0

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Careers'}
        subtitle={t.subtitle ?? 'Build the AI-Native Operational Intelligence System with us.'}
      />

      {/* Open roles strip */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-12">
            <div>
              <SectionLabel text={t.openRolesLabel ?? 'Open roles'} />
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  marginTop: 'clamp(20px, 2.4vw, 32px)',
                  marginBottom: 0,
                  maxWidth: 'clamp(580px, 75vw, 1040px)',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {hasRoles ? (
                  <>
                    {totalRoles} {t.rolesTitlePart1 ?? 'roles open across'}{' '}
                    <span
                      className="gradient-text-animate"
                      style={{ fontWeight: 400 }}
                    >
                      {t.rolesTitlePart2 ?? 'every team'}
                    </span>
                  </>
                ) : (
                  <>
                    {t.noOpeningsTitlePart1 ?? 'No openings'}{' '}
                    <span
                      className="gradient-text-animate"
                      style={{ fontWeight: 400 }}
                    >
                      {t.noOpeningsTitlePart2 ?? 'as of now'}
                    </span>
                  </>
                )}
              </h2>
            </div>
            <a
              href="#values"
              className="inline-flex items-center gap-2"
              style={{
                color: '#1A38E8',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                padding: '10px 18px',
                borderRadius: '999px',
                background: 'rgba(26,56,232,0.06)',
                border: '1px solid rgba(26,56,232,0.18)',
              }}
            >
              {t.whyMonkdb ?? 'Why MonkDB'}
              <ArrowUpRight size={14} />
            </a>
          </div>

          {!hasRoles && loaded && (
            <div
              className="rounded-2xl flex flex-col items-start gap-4"
              style={{
                background: '#F8F4F0',
                border: '1px solid rgba(10,34,128,0.10)',
                padding: 'clamp(28px, 3.4vw, 48px)',
              }}
            >
              <span
                className="inline-flex items-center justify-center rounded-xl"
                style={{
                  width: 44,
                  height: 44,
                  background: 'rgba(26,56,232,0.10)',
                  color: '#1A38E8',
                  border: '1px solid rgba(26,56,232,0.20)',
                }}
              >
                <Inbox size={20} strokeWidth={1.6} />
              </span>
              <p
                className="text-gray-700 dark:text-gray-300"
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  margin: 0,
                  maxWidth: 560,
                  lineHeight: 1.55,
                }}
              >
                {t.noOpeningsBody ??
                  'We are not actively hiring at the moment. If you would still love to work on MonkDB, send your CV to careers@monkdb.com and we will reach out the next time a relevant role opens.'}
              </p>
              <a
                href="mailto:careers@monkdb.com"
                className="inline-flex items-center gap-2"
                style={{
                  background: '#1A38E8',
                  color: '#ffffff',
                  borderRadius: '999px',
                  padding: '11px 22px',
                  fontWeight: 600,
                  fontSize: '13px',
                  textDecoration: 'none',
                  letterSpacing: '-0.005em',
                  boxShadow: '0 8px 22px rgba(10,20,80,0.18)',
                }}
              >
                {t.noOpeningsCta ?? 'careers@monkdb.com'}
                <ArrowUpRight size={14} />
              </a>
            </div>
          )}

          <div className="flex flex-col gap-10 sm:gap-14">
            {TEAMS.map((team, ti) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: ti * 0.06, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center justify-center rounded-lg"
                    style={{
                      width: 36,
                      height: 36,
                      background: 'rgba(26,56,232,0.08)',
                      color: '#1A38E8',
                      border: '1px solid rgba(26,56,232,0.16)',
                    }}
                  >
                    <team.Icon size={16} strokeWidth={1.6} />
                  </span>
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(18px, 1.6vw, 24px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      margin: 0,
                    }}
                  >
                    {team.name}
                  </h3>
                  <span
                    className="ml-2"
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'rgba(10,34,128,0.5)',
                    }}
                  >
                    {team.roles.length} {t.openCount ?? 'OPEN'}
                  </span>
                </div>
                <ul
                  className="flex flex-col gap-2"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {team.roles.map((r) => (
                    <li
                      key={r.id || r.title}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] items-center gap-3 sm:gap-6 rounded-xl"
                      style={{
                        background: 'white',
                        border: '1px solid rgba(10,34,128,0.10)',
                        padding: 'clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)',
                      }}
                    >
                      <span
                        className="text-gray-900 dark:text-white"
                        style={{
                          fontSize: 'clamp(14px, 1.1vw, 16px)',
                          fontWeight: 500,
                        }}
                      >
                        {r.title}
                      </span>
                      <span
                        className="hidden sm:flex items-center gap-1.5"
                        style={{
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          color: 'rgba(10,34,128,0.55)',
                        }}
                      >
                        <MapPin size={12} />
                        {r.location}
                      </span>
                      <span
                        className="hidden sm:inline-flex items-center gap-1.5"
                        style={{
                          fontFamily:
                            'var(--font-mono, ui-monospace, monospace)',
                          fontSize: '11px',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          color: 'rgba(10,34,128,0.55)',
                        }}
                      >
                        <Briefcase size={12} />
                        {r.type}
                      </span>
                      <a
                        href={r.applyUrl || 'mailto:careers@monkdb.com'}
                        target={r.applyUrl ? '_blank' : undefined}
                        rel={r.applyUrl ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2"
                        style={{
                          color: '#1A38E8',
                          fontWeight: 600,
                          fontSize: '12.5px',
                          textDecoration: 'none',
                        }}
                      >
                        {t.apply ?? 'Apply'}
                        <ArrowUpRight size={13} />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-20 lg:py-24"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.valuesLabel ?? 'How we work'} />
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
            {t.valuesTitle ?? 'Four working principles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl flex items-start gap-4"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(20px, 2.2vw, 26px)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: 'rgba(26,56,232,0.10)',
                    border: '1px solid rgba(26,56,232,0.30)',
                    color: '#1A38E8',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="text-[#0A2280]"
                    style={{
                      fontSize: 'clamp(17px, 1.5vw, 22px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 6px 0',
                    }}
                  >
                    {v.name}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.perksLabel ?? 'Perks'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: 'clamp(20px, 2.4vw, 40px)',
              marginBottom: 'clamp(28px, 3.5vw, 40px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.perksTitle ?? 'What we offer'}
          </h2>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            style={{ listStyle: 'none', padding: 0, margin: '24px 0 0 0' }}
          >
            {PERKS.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-3 rounded-xl"
                style={{
                  padding: '14px 18px',
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.08)',
                  fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                <p.Icon
                  size={18}
                  strokeWidth={1.6}
                  style={{ color: '#1A38E8', flexShrink: 0 }}
                />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hiring process */}
      <section
        className="relative overflow-hidden py-12 sm:py-20 lg:py-24"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(127,179,255,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.processLabel ?? 'Hiring process'} variant="dark" />
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 44px)',
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
            {t.processTitle ?? 'What to expect'}
          </h2>
          <ol
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {PROCESS.map((p, i) => (
              <li
                key={p.step}
                className="rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(127,179,255,0.18)',
                  padding: 'clamp(18px, 2vw, 24px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: '#7FB3FF',
                  }}
                >
                  {p.step}
                </span>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '10px 0 8px 0',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.62)',
                    fontSize: 'clamp(12.5px, 0.95vw, 13.5px)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABanner heading={t.ctaHeading ?? 'Build the next operating system for the enterprise.'} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
