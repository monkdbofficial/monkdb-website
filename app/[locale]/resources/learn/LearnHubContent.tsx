'use client'

/**
 * Learn hub — Website content part II.docx, lines 311–411 + image 4.
 *
 *   Banner (Learn. Build. Execute.)
 *   Reference diagram from the docx
 *   5 sub-section cards
 *   LEARNING PATH 5-step strip (Start Here → Build → Deploy → Scale → Optimize)
 *   FINAL LINE
 *   CTA + Footer
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Compass, Hammer, Rocket, TrendingUp, Settings } from 'lucide-react'
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
import { LEARN_SECTIONS } from '@/content/learn'

const EASE = [0.165, 0.84, 0.44, 1] as const

const LEARNING_PATH = [
  { step: '01', title: 'Start Here', body: 'Intro to MonkDB and core concepts.', Icon: Compass },
  { step: '02', title: 'Build', body: 'Build your first MonkDB application.', Icon: Hammer },
  { step: '03', title: 'Deploy', body: 'Take it to production with confidence.', Icon: Rocket },
  { step: '04', title: 'Scale', body: 'Grow workloads across edge to cloud.', Icon: TrendingUp },
  { step: '05', title: 'Optimize', body: 'Continuously improve outcomes.', Icon: Settings },
]

export default function LearnHubContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { locale } = useI18n()

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Learn. Build. Execute."
        subtitle="Everything you need to understand, evaluate, and build with MonkDB. Across concepts, code, and real-world use."
      />

      {/* Reference diagram from docx image 4 */}
      <HubDiagramBanner
        label="Learn"
        src="/diagram-learn.png"
        alt="MonkDB Learn overview, five resources sections plus the developer learning path"
        width={1379}
        height={920}
        caption="Five practical entry points across resources, documentation, customer stories, blog, and events. Plus a guided five-step learning path."
        tagline="One System. One Truth. Real-Time Intelligence. Instant Action."
      />

      {/* 5 sub-section cards */}
      <section
        ref={ref}
        className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-20 lg:py-24"
      >
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Sections" />
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12 lg:mb-14"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '40px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Five entry points,{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              one continuous platform
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Documentation as a special external card (since docs lives at docs.monkdb.com) */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0, ease: EASE }}
            >
              <Link
                href="https://docs.monkdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="learn-card group block relative rounded-2xl overflow-hidden h-full"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(20px, 2.4vw, 28px)',
                  textDecoration: 'none',
                  minHeight: 'clamp(180px, 17vw, 220px)',
                  display: 'flex',
                  flexDirection: 'column',
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
                    marginBottom: '14px',
                  }}
                >
                  02
                </span>
                <h3
                  className="text-gray-900 dark:text-white"
                  style={{
                    fontSize: 'clamp(16px, 1.5vw, 20px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.3,
                    margin: '0 0 10px 0',
                  }}
                >
                  Documentation
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
                  Build faster with complete technical guidance. Getting started, APIs, SDKs, deployment, and architecture patterns.
                </p>
                <div
                  className="flex items-center gap-2 mt-5"
                  style={{
                    color: '#1A38E8',
                    fontSize: '12.5px',
                    fontWeight: 600,
                  }}
                >
                  Read the docs
                </div>
              </Link>
            </motion.div>

            {LEARN_SECTIONS.map((s, i) => {
              // Numbering: Documentation is 02, so the rest get 01, 03, 04, 05
              const numbers = ['01', '03', '04', '05']
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: (i + 1) * 0.06,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={`/${locale}/resources/${s.slug}`}
                    className="learn-card group block relative rounded-2xl overflow-hidden h-full"
                    style={{
                      background: 'white',
                      border: '1px solid rgba(10,34,128,0.10)',
                      padding: 'clamp(20px, 2.4vw, 28px)',
                      textDecoration: 'none',
                      minHeight: 'clamp(180px, 17vw, 220px)',
                      display: 'flex',
                      flexDirection: 'column',
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
                        marginBottom: '14px',
                      }}
                    >
                      {numbers[i] ?? `0${i + 1}`}
                    </span>
                    <h3
                      className="text-gray-900 dark:text-white"
                      style={{
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        fontWeight: 500,
                        letterSpacing: '-0.005em',
                        lineHeight: 1.3,
                        margin: '0 0 10px 0',
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
                      {s.subtitle} {s.overview}
                    </p>
                    <div
                      className="flex items-center gap-2 mt-5"
                      style={{
                        color: '#1A38E8',
                        fontSize: '12.5px',
                        fontWeight: 600,
                      }}
                    >
                      Explore
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Path 5-step strip */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background: 'linear-gradient(180deg, #050D6A 0%, #07091A 100%)',
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
          <SectionLabel text="Learning Path" variant="dark" />
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-white mt-6 sm:mt-10 lg:mt-12 mb-10 sm:mb-12"
            style={{
              fontSize: 'clamp(26px, 3.6vw, 48px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '40px 0 0 0',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Start here. Build. Scale.
          </motion.h2>

          <div
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2"
            style={{ marginTop: '40px' }}
          >
            {/* Background line connecting steps (desktop only) */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none hidden lg:block"
              style={{
                top: '36px',
                left: '10%',
                right: '10%',
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(127,179,255,0.4) 15%, rgba(30,138,255,0.6) 50%, rgba(127,179,255,0.4) 85%, transparent 100%)',
              }}
            />
            {LEARNING_PATH.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: EASE,
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div
                  className="relative inline-flex items-center justify-center rounded-full text-white"
                  style={{
                    width: 'clamp(56px, 5vw, 72px)',
                    height: 'clamp(56px, 5vw, 72px)',
                    background:
                      i === 0
                        ? 'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)'
                        : 'rgba(255,255,255,0.04)',
                    border:
                      i === 0
                        ? '1px solid rgba(255,255,255,0.25)'
                        : '1px solid rgba(127,179,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    boxShadow:
                      i === 0
                        ? '0 14px 36px rgba(26,56,232,0.45)'
                        : '0 6px 18px rgba(0,0,0,0.2)',
                    zIndex: 2,
                  }}
                >
                  <step.Icon size={22} strokeWidth={1.6} />
                </div>
                <span
                  className="mt-4"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: '#7FB3FF',
                  }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-white mt-2"
                  style={{
                    fontSize: 'clamp(15px, 1.2vw, 18px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '8px 0 6px 0',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 'clamp(12px, 0.9vw, 13.5px)',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: '180px',
                  }}
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>

          <p
            className="text-center mt-10 sm:mt-14"
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 'clamp(11px, 0.95vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(127,179,255,0.7)',
            }}
          >
            From understanding to execution
          </p>
        </div>
      </section>

      {/* FINAL LINE callout */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-gray-700 dark:text-white/80"
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
            From understanding to execution, everything you need to build with
            MonkDB starts here.
          </motion.p>
        </div>
      </section>

      <CTABanner
        heading="Start your MonkDB journey."
        description="Pick an entry point. Or jump straight to the developer journey map."
        buttonText="Request a demo"
      />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.learn-card:hover) {
          transform: translateY(-3px);
          border-color: rgba(26, 56, 232, 0.25) !important;
          box-shadow: 0 16px 38px rgba(10, 34, 128, 0.10);
          transition:
            transform 320ms ease,
            box-shadow 320ms ease,
            border-color 320ms ease;
        }
      `}</style>
    </main>
  )
}
