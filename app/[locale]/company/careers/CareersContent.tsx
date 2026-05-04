'use client'

/**
 * Careers — open roles list grouped by team + culture grid + perks strip + hiring process.
 * Distinct visual: structured job-board layout with team accordion sections.
 */

import { motion } from 'framer-motion'
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
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const EASE = [0.165, 0.84, 0.44, 1] as const

const TEAMS = [
  {
    name: 'Engineering',
    Icon: Code2,
    roles: [
      { title: 'Staff Engineer, Storage', location: 'Remote (Global)', type: 'Full-time' },
      { title: 'Distributed Systems Engineer', location: 'Hyderabad', type: 'Full-time' },
      { title: 'Vector / AI Search Engineer', location: 'Remote (US)', type: 'Full-time' },
      { title: 'Site Reliability Engineer', location: 'Remote (EU)', type: 'Full-time' },
    ],
  },
  {
    name: 'Product and Design',
    Icon: Sparkles,
    roles: [
      { title: 'Senior Product Manager, Platform', location: 'Hyderabad / Remote', type: 'Full-time' },
      { title: 'Senior Product Designer', location: 'Remote (Global)', type: 'Full-time' },
      { title: 'Developer Advocate', location: 'Remote (Global)', type: 'Full-time' },
    ],
  },
  {
    name: 'Go-to-market',
    Icon: Megaphone,
    roles: [
      { title: 'Account Executive, Enterprise', location: 'New York', type: 'Full-time' },
      { title: 'Solutions Architect, BFSI', location: 'London', type: 'Full-time' },
      { title: 'Customer Success Manager', location: 'Remote (APAC)', type: 'Full-time' },
    ],
  },
  {
    name: 'Operations',
    Icon: Users,
    roles: [
      { title: 'Head of Talent', location: 'Hyderabad', type: 'Full-time' },
      { title: 'Finance Manager', location: 'Hyderabad', type: 'Full-time' },
    ],
  },
]

const VALUES = [
  {
    name: 'Sovereignty by design',
    body: 'We build for control. Every decision, from architecture to staffing, defaults to giving people and customers more agency, not less.',
  },
  {
    name: 'Continuous over batch',
    body: 'We work in real time. Decisions land fast, feedback loops close fast, and we keep the operating cadence high.',
  },
  {
    name: 'Production over demos',
    body: 'We optimize for what works at 3am in production, not what looks good in a deck. Real shipped software is the unit of progress.',
  },
  {
    name: 'Distributed by default',
    body: 'We are remote-first, async-aware, and bias toward written, durable communication so the best ideas surface anywhere.',
  },
]

const PERKS = [
  { Icon: Globe2, label: 'Remote-first across global timezones' },
  { Icon: HeartPulse, label: 'Premium health insurance for you and family' },
  { Icon: GraduationCap, label: 'Annual learning and conference budget' },
  { Icon: Plane, label: 'Quarterly team offsites' },
  { Icon: Coins, label: 'Meaningful equity from day one' },
  { Icon: LaptopMinimal, label: 'Top-tier hardware and software stipend' },
]

const PROCESS = [
  { step: '01', title: 'Apply', body: 'Send a CV and a short note about why MonkDB.' },
  { step: '02', title: 'Intro chat', body: '30 minutes with our talent team to align on context.' },
  { step: '03', title: 'Craft loop', body: 'Two role-specific conversations focused on real work.' },
  { step: '04', title: 'Team meet', body: 'Spend time with future teammates and leaders.' },
  { step: '05', title: 'Offer', body: 'Aligned compensation, role, and start date.' },
]

export default function CareersContent() {
  const totalRoles = TEAMS.reduce((acc, t) => acc + t.roles.length, 0)

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Careers"
        subtitle="Build the AI-Native Operational Intelligence System with us."
      />

      {/* Open roles strip */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 sm:mb-12">
            <div>
              <SectionLabel text="Open roles" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '20px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {totalRoles} roles open across{' '}
                <span
                  className="gradient-text-animate"
                  style={{ fontWeight: 400 }}
                >
                  every team
                </span>
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
              Why MonkDB
              <ArrowUpRight size={14} />
            </a>
          </div>

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
                    {team.roles.length} OPEN
                  </span>
                </div>
                <ul
                  className="flex flex-col gap-2"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {team.roles.map((r) => (
                    <li
                      key={r.title}
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
                        href="mailto:careers@monkdb.com"
                        className="inline-flex items-center gap-2"
                        style={{
                          color: '#1A38E8',
                          fontWeight: 600,
                          fontSize: '12.5px',
                          textDecoration: 'none',
                        }}
                      >
                        Apply
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
          <SectionLabel text="How we work" />
          <h2
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 48px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '40px 0 0 0',
              textDecoration: 'none',
            }}
          >
            Four working principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px)',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: '#1A38E8',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '14px 0 10px 0',
                  }}
                >
                  {v.name}
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
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

      {/* Perks strip */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Perks" />
          <h2
            className="text-gray-900 dark:text-white mt-6 sm:mt-8 lg:mt-10 mb-8"
            style={{
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '32px 0 0 0',
              textDecoration: 'none',
            }}
          >
            What we offer
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
          <SectionLabel text="Hiring process" variant="dark" />
          <h2
            className="text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 44px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '40px 0 0 0',
              textDecoration: 'none',
            }}
          >
            What to expect
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

      <CTABanner heading="Build the next operating system for the enterprise." />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
