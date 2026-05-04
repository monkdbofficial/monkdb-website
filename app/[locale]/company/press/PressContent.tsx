'use client'

/**
 * Press — chronological news feed + media kit + media inquiries.
 * Distinct from other company pages: vertical timeline-style article list.
 */

import { motion } from 'framer-motion'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const EASE = [0.165, 0.84, 0.44, 1] as const

const ARTICLES = [
  {
    date: '2026-04-22',
    label: 'Product',
    title:
      'MonkDB launches AI-Native Operational Intelligence System for the Fortune 500',
    excerpt:
      'A unified, sovereign data plane that consolidates six categories of databases, pipelines, vector stores, and AI inference layers into a single binary.',
  },
  {
    date: '2026-03-14',
    label: 'Customer',
    title: 'Top 10 global bank cuts fraud detection latency to under 5 ms with MonkDB',
    excerpt:
      'Replacing five specialized systems with one engine, the bank now scores every transaction against vector and rule-based models in line.',
  },
  {
    date: '2026-02-08',
    label: 'Partnership',
    title:
      'MonkDB partners with leading hyperscalers to deliver air-gapped sovereign deployments',
    excerpt:
      'Joint reference architectures for cloud, on-prem, and edge environments now available across major regulated industries.',
  },
  {
    date: '2026-01-21',
    label: 'Engineering',
    title:
      'MonkDB ships native vector search alongside time-series and SQL in one query plane',
    excerpt:
      'Hybrid retrieval, ANN, BM25, and SQL filters compile into a single execution plan. No federation required.',
  },
  {
    date: '2025-11-09',
    label: 'Industry',
    title:
      'Mining major adopts MonkDB SmartMine for ventilation-on-demand and predictive maintenance',
    excerpt:
      'A continuous data plane across underground sensors and surface operations now drives autonomous decisions for safety and yield.',
  },
  {
    date: '2025-09-30',
    label: 'Research',
    title: 'MonkDB whitepaper: Sovereignty as a foundational architecture layer',
    excerpt:
      'How embedding identity, lineage, and policy at the engine layer eliminates the audit-bolt-on tax for AI workloads.',
  },
]

const PRESS_ASSETS = [
  { label: 'Logo pack (PNG, SVG)', size: '4.2 MB' },
  { label: 'Brand guidelines', size: '1.8 MB PDF' },
  { label: 'Product screenshots', size: '12 MB' },
  { label: 'Executive headshots', size: '8.4 MB' },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PressContent() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title="Press"
        subtitle="Latest news, releases, and media resources from MonkDB."
      />

      {/* Article feed — vertical timeline */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Newsroom" />
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
            What we have been{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              shipping and saying
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-16">
            {/* Left: timeline */}
            <ol
              className="relative flex flex-col gap-8 sm:gap-10"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {/* Vertical rule */}
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0"
                style={{
                  left: '6px',
                  width: '1px',
                  background:
                    'linear-gradient(180deg, rgba(26,56,232,0.5), rgba(26,56,232,0.05))',
                }}
              />
              {ARTICLES.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="relative pl-8 sm:pl-10"
                >
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{
                      left: '0',
                      top: '6px',
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: 'white',
                      border: '2px solid #1A38E8',
                      boxShadow: '0 0 0 4px rgba(26,56,232,0.10)',
                    }}
                  />
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <time
                      dateTime={a.date}
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'rgba(10,34,128,0.55)',
                      }}
                    >
                      {formatDate(a.date)}
                    </time>
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#1A38E8',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(26,56,232,0.06)',
                        border: '1px solid rgba(26,56,232,0.16)',
                      }}
                    >
                      {a.label}
                    </span>
                  </div>
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(18px, 1.7vw, 24px)',
                      fontWeight: 500,
                      letterSpacing: '-0.012em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(14px, 1.1vw, 16px)',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: '720px',
                    }}
                  >
                    {a.excerpt}
                  </p>
                </motion.li>
              ))}
            </ol>

            {/* Right: media kit + inquiries sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-5">
              <div
                className="rounded-2xl"
                style={{
                  background: '#F8F4F0',
                  border: '1px solid rgba(10,34,128,0.10)',
                  padding: 'clamp(22px, 2.4vw, 28px)',
                }}
              >
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
                  Media Kit
                </span>
                <h3
                  className="text-[#0A2280]"
                  style={{
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '12px 0 16px 0',
                  }}
                >
                  Brand assets and resources
                </h3>
                <ul
                  className="flex flex-col gap-3"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  {PRESS_ASSETS.map((asset) => (
                    <li
                      key={asset.label}
                      className="flex items-center justify-between gap-3"
                      style={{
                        padding: '10px 14px',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid rgba(10,34,128,0.08)',
                        fontSize: 'clamp(13px, 1vw, 14.5px)',
                        color: '#374151',
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{asset.label}</span>
                      <span className="flex items-center gap-2">
                        <span
                          style={{
                            fontFamily:
                              'var(--font-mono, ui-monospace, monospace)',
                            fontSize: '10.5px',
                            fontWeight: 500,
                            color: 'rgba(10,34,128,0.5)',
                          }}
                        >
                          {asset.size}
                        </span>
                        <Download size={14} style={{ color: '#1A38E8' }} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl text-white relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, #1A38E8 0%, #0A2280 60%, #050D6A 100%)',
                  padding: 'clamp(22px, 2.4vw, 28px)',
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
                  Media inquiries
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(18px, 1.6vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '12px 0 12px 0',
                  }}
                >
                  Reach our communications team
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13.5px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: '0 0 14px 0',
                  }}
                >
                  Press inquiries, briefings, and analyst meetings.
                </p>
                <a
                  href="mailto:press@monkdb.com"
                  className="inline-flex items-center gap-2"
                  style={{
                    background: 'white',
                    color: '#0A2280',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '10px 16px',
                    borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={14} />
                  press@monkdb.com
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner heading="Stay close to MonkDB news." />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
