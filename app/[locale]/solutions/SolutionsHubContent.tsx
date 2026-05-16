'use client'

/**
 * Solutions hub — Part II docx, lines 126–226.
 *
 *   Header (chapter marker + heading + lead)
 *   10 solution cards (capabilities you can build with MonkDB)
 *   Outcomes section — 6 refined outcome statements (lines 217–225)
 *   Final-line callout — "From Use Cases to Outcomes..." (line 226)
 *   CTA banner + Footer
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import HubDiagramBanner from '@/components/HubDiagramBanner'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import { SOLUTIONS } from '@/content/solutions'
import { OUTCOMES } from '@/content/outcomes'

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function SolutionsHubContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { locale } = useI18n()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Solutions"
        subtitle="Capabilities you can build on a continuous, real-time platform."
      />

      {/* ── Intro ── */}
      <section
        ref={ref}
        className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24"
      >
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Solutions" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-end mt-6 sm:mt-10 lg:mt-12">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-gray-900 dark:text-white"
              style={{
                fontSize: 'clamp(28px, 4vw, 58px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                margin: 0,
                textWrap: 'balance',
                textDecoration: 'none',
              }}
            >
              From insight to action,{' '}
              <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
                in one engine
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
              className="text-gray-600 dark:text-gray-400"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '560px',
              }}
            >
              Ten capability-level solutions that turn fragmented stacks into
              one unified execution layer. Each is a production pattern proven
              across industries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Solutions architecture diagram ── */}
      <HubDiagramBanner
        label="Overview"
        src="/diagram-solutions.png"
        alt="MonkDB Solutions overview, ten use cases mapped to six outcomes"
        width={1379}
        height={920}
        caption="Real-time intelligence. Intelligent action. Measurable outcomes. Ten capability solutions mapped to six enterprise outcomes, all running on one unified platform."
        tagline="One Platform. Every Workload."
      />

      {/* ── 10 Solution cards ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: EASE,
                }}
              >
                <Link
                  href={`/${locale}/solutions/${s.slug}`}
                  className="group block relative rounded-2xl overflow-hidden h-full sol-card card-surface"
                  style={{
                    padding: 'clamp(18px, 2.2vw, 26px)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="sol-card-rail absolute left-0 top-0 bottom-0"
                    style={{
                      width: '2px',
                      background:
                        'linear-gradient(180deg, #1A38E8 0%, #1E8AFF 100%)',
                      transform: 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: 'transform 360ms ease',
                    }}
                  />
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="inline-flex items-center justify-center rounded-md flex-shrink-0"
                      style={{
                        width: 32,
                        height: 24,
                        background: 'rgba(26,56,232,0.10)',
                        border: '1px solid rgba(26,56,232,0.30)',
                        color: '#1A38E8',
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 20px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.3,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400 flex-1"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 15px)',
                      fontWeight: 400,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {s.subtitle}
                  </p>
                  <div
                    className="flex items-center justify-between mt-5"
                    style={{
                      color: '#1A38E8',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    <span>Explore</span>
                    <span
                      aria-hidden="true"
                      className="sol-card-arrow inline-flex items-center justify-center"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'rgba(26,56,232,0.08)',
                        transition: 'all 280ms ease',
                      }}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section
        id="outcomes"
        className="section-grid relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24"
      >
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Outcomes" />
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-3"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            From real-time data to{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              real-world impact
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-gray-600 dark:text-gray-400 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: '720px',
            }}
          >
            Every solution above maps to a concrete enterprise outcome. Buyers
            adopt MonkDB because each capability earns its keep on at least one
            of these.
          </motion.p>

          {/* 6 outcome rows in a 3×2 grid, each row mapping label → refined wording */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: EASE,
                }}
                className="rounded-2xl card-surface-alt"
                style={{
                  padding: 'clamp(20px, 2.4vw, 28px)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center justify-center rounded-md flex-shrink-0"
                    style={{
                      width: 32,
                      height: 24,
                      background: 'rgba(26,56,232,0.10)',
                      border: '1px solid rgba(26,56,232,0.30)',
                      color: '#1A38E8',
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-[#0A2280] dark:text-white"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 8px 0',
                  }}
                >
                  {o.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {o.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final line — docx line 226 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="text-gray-700 dark:text-white/80 mt-10 sm:mt-12 lg:mt-14"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: '780px',
              padding: 'clamp(20px, 2.4vw, 28px)',
              background:
                'linear-gradient(120deg, rgba(26,56,232,0.04) 0%, rgba(30,138,255,0.05) 100%)',
              border: '1px solid rgba(26,56,232,0.16)',
              borderRadius: '16px',
              textWrap: 'balance',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1em',
                background: '#1A38E8',
                verticalAlign: 'middle',
                marginRight: '12px',
              }}
            />
            From Use Cases to Outcomes, MonkDB turns real-time data into
            real-world impact.
          </motion.p>
        </div>
      </section>

      <CTABanner
        heading="Pick the solution that fits your workload."
        description="Talk to an engineer. We will scope a proof of value in your environment."
        buttonText="Request a demo"
      />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.sol-card:hover) {
          transform: translateY(-3px);
          border-color: rgba(26, 56, 232, 0.25) !important;
          box-shadow: 0 16px 38px rgba(10, 34, 128, 0.10);
          transition:
            transform 320ms ease,
            box-shadow 320ms ease,
            border-color 320ms ease;
        }
        :global(.sol-card:hover .sol-card-rail) {
          transform: scaleY(1);
        }
        :global(.sol-card:hover .sol-card-arrow) {
          background: #1a38e8 !important;
          color: white !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </main>
  )
}
