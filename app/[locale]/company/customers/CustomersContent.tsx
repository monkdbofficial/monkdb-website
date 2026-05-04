'use client'

/**
 * Customers — logo wall + featured stories grid + outcome stats.
 * Distinct from press: structural focus is on logos and outcomes, not articles.
 */

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const EASE = [0.165, 0.84, 0.44, 1] as const

// Synthetic enterprise customer "logos" — text-based plates so we don't ship
// fake brand marks. Each plate is a stylized wordmark grouped by industry.
const CUSTOMER_PLATES = [
  { name: 'Aurora Bank', industry: 'BFSI' },
  { name: 'Helios Energy', industry: 'Energy' },
  { name: 'Vertex Mining', industry: 'Mining' },
  { name: 'Drift Mobility', industry: 'Mobility' },
  { name: 'Forge Steel', industry: 'Manufacturing' },
  { name: 'CoreCity', industry: 'Smart Cities' },
  { name: 'Shoal Logistics', industry: 'Logistics' },
  { name: 'Nimbus Telecom', industry: 'Telco' },
  { name: 'Sentinel Insurance', industry: 'BFSI' },
  { name: 'Plait Retail', industry: 'Retail' },
  { name: 'Atlas Capital', industry: 'BFSI' },
  { name: 'Heron Health', industry: 'Healthcare' },
]

const FEATURED = [
  {
    customer: 'Aurora Bank',
    industry: 'BFSI',
    headline: 'From batch fraud detection to real-time decisioning at sub-5ms',
    outcome: '$120M loss prevention in year one',
    quote:
      'MonkDB collapsed our fraud stack from five systems to one. The engineering surface shrank, and decisions land before settlement.',
    role: 'CTO',
  },
  {
    customer: 'Vertex Mining',
    industry: 'Mining',
    headline: 'Ventilation-on-demand cuts energy spend by 38%',
    outcome: '38% energy reduction, 0 safety incidents in 14 months',
    quote:
      'Live air flow that follows people and equipment turned a static system into an adaptive one. The savings paid for the rollout in two quarters.',
    role: 'VP Operations',
  },
  {
    customer: 'Drift Mobility',
    industry: 'Mobility',
    headline: 'Citywide fleet rerouting on continuous live state',
    outcome: '22% utilization gain, 19% lower fuel consumption',
    quote:
      'Once routing decisions started happening at the vehicle, not after a hop through a central scheduler, everything got faster and lighter.',
    role: 'Head of Platform',
  },
]

export default function CustomersContent() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Customers"
        subtitle="Enterprises that run on the AI-Native Operational Intelligence System."
      />

      {/* Outcome stats strip */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
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
          <SectionLabel text="At a glance" variant="dark" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-10 lg:mt-12">
            {[
              { v: '40+', l: 'Enterprise customers' },
              { v: '10+', l: 'Industries' },
              { v: '6', l: 'Continents' },
              { v: '24/7', l: 'Production deployments' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div
                  className="gradient-text-animate"
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 80px)',
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                  }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(127,179,255,0.85)',
                  }}
                >
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo wall */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Customers" />
          <h2
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '40px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Trusted by enterprises that{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              cannot tolerate delay
            </span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {CUSTOMER_PLATES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                className="relative flex flex-col items-center justify-center text-center rounded-2xl"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px) clamp(16px, 1.8vw, 24px)',
                  minHeight: 'clamp(110px, 11vw, 140px)',
                }}
              >
                <div
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 20px)',
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.2,
                  }}
                >
                  {c.name}
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,34,128,0.5)',
                  }}
                >
                  {c.industry}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Featured stories" />
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
            Production wins worth reading
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURED.map((f, i) => (
              <motion.article
                key={f.customer}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl flex flex-col"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.6vw, 32px)',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#1A38E8',
                    }}
                  >
                    {f.industry}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(15px, 1.3vw, 18px)',
                      fontWeight: 600,
                      color: '#0A2280',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {f.customer}
                  </span>
                </div>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.012em',
                    lineHeight: 1.25,
                    margin: '0 0 12px 0',
                  }}
                >
                  {f.headline}
                </h3>
                <p
                  className="text-gray-600 italic"
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: '0 0 16px 0',
                  }}
                >
                  &ldquo;{f.quote}&rdquo;
                </p>
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,34,128,0.55)',
                    marginBottom: '20px',
                  }}
                >
                  {f.role}, {f.customer}
                </div>
                <div
                  className="mt-auto pt-5"
                  style={{ borderTop: '1px dashed rgba(10,34,128,0.12)' }}
                >
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(10,34,128,0.5)',
                      marginBottom: '6px',
                    }}
                  >
                    Outcome
                  </div>
                  <div
                    className="text-[#1A38E8]"
                    style={{
                      fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {f.outcome}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Talk to a team that runs on MonkDB." />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
