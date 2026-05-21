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
import { renderBrand } from '@/components/BrandAccent'
import { useI18n } from '@/i18n/I18nProvider'

const EASE = [0.165, 0.84, 0.44, 1] as const

function formatDate(iso: string, locale: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PressContent() {
  const { dict, locale } = useI18n()
  const t = (((dict as Record<string, unknown>).press) ?? {}) as Record<string, string>

  const ARTICLES = [
    { date: '2026-04-22', label: t.labelProduct ?? 'Product', title: t.article1Title ?? 'MonkDB launches AI-Native Operational Intelligence System for the Fortune 500', excerpt: t.article1Excerpt ?? 'A unified, sovereign data plane that consolidates six categories of databases, pipelines, vector stores, and AI inference layers into a single binary.' },
    { date: '2026-03-14', label: t.labelCustomer ?? 'Customer', title: t.article2Title ?? 'Top 10 global bank cuts fraud detection latency to under 5 ms with MonkDB', excerpt: t.article2Excerpt ?? 'Replacing five specialized systems with one engine, the bank now scores every transaction against vector and rule-based models in line.' },
    { date: '2026-02-08', label: t.labelPartnership ?? 'Partnership', title: t.article3Title ?? 'MonkDB partners with leading hyperscalers to deliver air-gapped sovereign deployments', excerpt: t.article3Excerpt ?? 'Joint reference architectures for cloud, on-prem, and edge environments now available across major regulated industries.' },
    { date: '2026-01-21', label: t.labelEngineering ?? 'Engineering', title: t.article4Title ?? 'MonkDB ships native vector search alongside time-series and SQL in one query plane', excerpt: t.article4Excerpt ?? 'Hybrid retrieval, ANN, BM25, and SQL filters compile into a single execution plan. No federation required.' },
    { date: '2025-11-09', label: t.labelIndustry ?? 'Industry', title: t.article5Title ?? 'Mining major adopts MonkDB SmartMine for ventilation-on-demand and predictive maintenance', excerpt: t.article5Excerpt ?? 'A continuous data plane across underground sensors and surface operations now drives autonomous decisions for safety and yield.' },
    { date: '2025-09-30', label: t.labelResearch ?? 'Research', title: t.article6Title ?? 'MonkDB whitepaper: Sovereignty as a foundational architecture layer', excerpt: t.article6Excerpt ?? 'How embedding identity, lineage, and policy at the engine layer eliminates the audit-bolt-on tax for AI workloads.' },
  ]

  const PRESS_ASSETS = [
    { label: t.asset1Label ?? 'Logo pack (PNG, SVG)', size: t.asset1Size ?? '4.2 MB' },
    { label: t.asset2Label ?? 'Brand guidelines', size: t.asset2Size ?? '1.8 MB PDF' },
    { label: t.asset3Label ?? 'Product screenshots', size: t.asset3Size ?? '12 MB' },
    { label: t.asset4Label ?? 'Executive headshots', size: t.asset4Size ?? '8.4 MB' },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />
      <PageBanner
        title={t.title ?? 'Press'}
        subtitle={t.subtitle ?? 'Latest news, releases, and media resources from MonkDB.'}
      />

      {/* Article feed — vertical timeline */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.newsroomLabel ?? 'Newsroom'} />
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
            {t.newsroomTitlePart1 ?? 'What we have been'}{' '}
            <span className="gradient-text-animate" style={{ fontWeight: 400 }}>
              {t.newsroomTitlePart2 ?? 'shipping and saying'}
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
                      {formatDate(a.date, locale === 'en' ? 'en-US' : locale)}
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
                    {renderBrand(a.title)}
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
                  {t.mediaKitLabel ?? 'Media Kit'}
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
                  {t.mediaKitTitle ?? 'Brand assets and resources'}
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
                  {t.inquiriesLabel ?? 'Media inquiries'}
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
                  {t.inquiriesTitle ?? 'Reach our communications team'}
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
                  {t.inquiriesBody ?? 'Press inquiries, briefings, and analyst meetings.'}
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

      <CTABanner heading={t.ctaHeading ?? 'Stay close to MonkDB news.'} />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
