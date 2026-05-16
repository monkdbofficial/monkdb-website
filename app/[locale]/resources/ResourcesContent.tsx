'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Phone, Video, Download } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

type T = Record<string, string>

const EASE = [0.165, 0.84, 0.44, 1] as const

const SECTION_CONTAINER =
  'max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28'

const H2_STYLE = {
  fontSize: 'clamp(26px, 3.6vw, 56px)',
  fontWeight: 300,
  letterSpacing: '-0.01em',
  lineHeight: 1.1,
} as const

const EYEBROW_STYLE = {
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
}

const H3_CARD_STYLE = {
  fontSize: 'clamp(15px, 1.4vw, 20px)',
  fontWeight: 400,
  lineHeight: 1.3,
}

const BODY_STYLE = {
  fontSize: 'clamp(14px, 1.1vw, 16px)',
  fontWeight: 400,
  lineHeight: 1.6,
}

// ───────────────────────────────────────────────────────────────
// 1. SERVICES HERO
// ───────────────────────────────────────────────────────────────
function ServicesHero({ t, contactHref }: { t: T; contactHref: string }) {
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-20 bg-white dark:bg-[#0f1623]">
      <div className={SECTION_CONTAINER}>
        {/* Centered eyebrow + title */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            className="text-[#1A38E8] dark:text-blue-300 block mb-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            style={EYEBROW_STYLE}
          >
            {t.heroKicker ?? 'Services'}
          </motion.span>
          <motion.h1
            className="text-gray-900 dark:text-white mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              ...H2_STYLE,
              fontSize: 'clamp(32px, 5vw, 72px)',
              maxWidth: '900px',
              textDecoration: 'none',
            }}
          >
            {t.heroTitle ?? 'High quality services for you'}
          </motion.h1>
        </div>

        {/* Top row: Left headline + CTAs, Right dark image card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 lg:gap-6 items-stretch">
          {/* LEFT — headline card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col justify-between rounded-[24px] p-6 sm:p-8 lg:p-10"
            style={{
              background: '#F8F4F0',
              minHeight: 'clamp(260px, 28vw, 340px)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background:
                    'linear-gradient(135deg, #0A2280 0%, #1A38E8 55%, #1E8AFF 100%)',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(10,34,128,0.25)',
                }}
              />
              <h2
                className="text-gray-900"
                style={{
                  ...H2_STYLE,
                  fontSize: 'clamp(22px, 2.4vw, 34px)',
                }}
              >
                {t.heroLeftTitle ?? 'Revolutionizing data infrastructure with expert consultation and leadership'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2"
                style={{
                  backgroundColor: '#1A38E8',
                  color: '#ffffff',
                  borderRadius: '999px',
                  padding: '11px 22px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)',
                  textDecoration: 'none',
                }}
              >
                {t.heroContactUs ?? 'Contact us'}
                <ArrowRight size={14} strokeWidth={2.2} />
              </Link>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2"
                style={{
                  backgroundColor: 'transparent',
                  color: '#0A2280',
                  border: '1.5px solid rgba(10,34,128,0.2)',
                  borderRadius: '999px',
                  padding: '10px 22px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)',
                  textDecoration: 'none',
                }}
              >
                {t.heroRequestCall ?? 'Request a call'}
                <Phone size={13} strokeWidth={2.2} />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — dark journey card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative rounded-[24px] overflow-hidden p-6 sm:p-8 lg:p-10"
            style={{
              minHeight: 'clamp(260px, 28vw, 340px)',
              backgroundColor: '#070D28',
              backgroundImage: `
                radial-gradient(ellipse 80% 60% at 100% 0%, rgba(30,138,255,0.30) 0%, transparent 55%),
                radial-gradient(ellipse 70% 70% at 0% 100%, rgba(26,56,232,0.35) 0%, transparent 60%),
                linear-gradient(145deg, #0A1A9A 0%, #050D6A 100%)
              `,
            }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                opacity: 0.5,
              }}
            />
            <div className="relative h-full flex flex-col justify-between">
              <h3
                className="text-white"
                style={{
                  ...H2_STYLE,
                  fontSize: 'clamp(20px, 2.2vw, 30px)',
                  maxWidth: '440px',
                }}
              >
                {t.heroRightTitle ?? 'Unveiling our data journey'}
              </h3>
              <div className="flex items-end justify-between mt-6">
                <p
                  className="text-white/70"
                  style={{ ...BODY_STYLE, maxWidth: '360px' }}
                >
                  {t.heroRightBody ?? ''}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -10 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t.heroRightAria ?? 'Explore our journey'}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#0A2280',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowUpRight size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Left subtext, Right two small cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 lg:gap-6 items-start mt-5 lg:mt-6">
          {/* LEFT — subtext + copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="pt-2 pr-2 sm:pr-4"
          >
            <p
              className="text-[#1A38E8] dark:text-blue-300 mb-3"
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: '-0.005em',
              }}
            >
              {t.heroSubtextLead ?? 'If you are ready to build your data platform, let us get in touch.'}
            </p>
            <p
              className="text-gray-600 dark:text-gray-400"
              style={{ ...BODY_STYLE, maxWidth: '460px' }}
            >
              {t.heroSubtextBody ?? ''}
            </p>
          </motion.div>

          {/* RIGHT — two compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="rounded-[20px] p-5 sm:p-6"
              style={{
                backgroundColor: '#0A2280',
                color: '#ffffff',
                minHeight: '170px',
              }}
            >
              <h3 className="text-white mb-2" style={H3_CARD_STYLE}>
                {t.heroSmallCard1Title ?? 'Let us collaborate for a brighter future'}
              </h3>
              <p
                className="text-white/70"
                style={{
                  fontSize: 'clamp(12px, 0.95vw, 13.5px)',
                  lineHeight: 1.55,
                }}
              >
                {t.heroSmallCard1Body ?? ''}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="relative rounded-[20px] overflow-hidden p-5 sm:p-6"
              style={{
                minHeight: '170px',
                backgroundImage: `
                  linear-gradient(135deg, rgba(10,34,128,0.55) 0%, rgba(245,158,11,0.20) 100%),
                  radial-gradient(ellipse at top right, #F59E0B 0%, #EA580C 40%, #7C2D12 100%)
                `,
              }}
            >
              <h3 className="text-white mb-2" style={H3_CARD_STYLE}>
                {t.heroSmallCard2Title ?? 'Tailored solutions for enterprise data challenges'}
              </h3>
              <p
                className="text-white/80"
                style={{
                  fontSize: 'clamp(12px, 0.95vw, 13.5px)',
                  lineHeight: 1.55,
                }}
              >
                {t.heroSmallCard2Body ?? ''}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────
// 2. MASTER DATA, MASTER SCALE (central image + overlays)
// ───────────────────────────────────────────────────────────────
function MasterDataSection({ t }: { t: T }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
      <div className={SECTION_CONTAINER}>
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={H2_STYLE}
          >
            {t.masterTitle ?? 'Master data, master scale'}
          </motion.h2>
          <p
            className="text-gray-500 dark:text-gray-400 mt-3"
            style={BODY_STYLE}
          >
            {t.masterBody ?? ''}
          </p>

          <div className="mt-6 inline-flex rounded-full p-1 bg-[#F8F4F0] dark:bg-gray-800">
            <button
              style={{
                backgroundColor: '#1A38E8',
                color: '#fff',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '12.5px',
                fontWeight: 600,
                border: 'none',
              }}
            >
              {t.masterTabLive ?? 'Live Sessions'}
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#6B7280',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '12.5px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              {t.masterTabOnDemand ?? 'On-Demand'}
            </button>
          </div>
        </div>

        {/* Central image with floating overlays */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto rounded-[28px] overflow-hidden"
          style={{
            maxWidth: '980px',
            aspectRatio: '16 / 9',
            background:
              'linear-gradient(135deg, #E0E7FF 0%, #F0EBFF 50%, #FEF3C7 100%)',
          }}
        >
          {/* Placeholder center "person" gradient glow */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 40% 60% at 50% 55%, rgba(10,34,128,0.25) 0%, transparent 55%),
                radial-gradient(ellipse 30% 40% at 50% 40%, rgba(255,255,255,0.4) 0%, transparent 60%)
              `,
            }}
          />

          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(10,34,128,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Floating stack — top-left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="hidden sm:block absolute top-[8%] left-[4%] rounded-2xl bg-white shadow-xl p-3 sm:p-4"
            style={{
              width: 'clamp(170px, 22%, 240px)',
              boxShadow: '0 14px 40px rgba(10,20,80,0.18)',
            }}
          >
            <p
              className="text-gray-900 mb-2"
              style={{ fontSize: '11.5px', fontWeight: 600 }}
            >
              {t.masterFloatingTitle ?? 'Pre-recorded Classes'}
            </p>
            {[
              { label: t.masterClass1 ?? 'Deep Learning with MonkDB Vectors', time: '18 min' },
              { label: t.masterClass2 ?? 'Streaming SQL at 1.2M tx/s', time: '24 min' },
              { label: t.masterClass3 ?? 'Sovereign Deployment Patterns', time: '16 min' },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 py-1.5"
                style={{ fontSize: '10.5px', color: '#4B5563' }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background:
                      'linear-gradient(135deg, #1A38E8 0%, #1E8AFF 100%)',
                    flexShrink: 0,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontWeight: 500 }}>
                    {c.label}
                  </p>
                  <p className="text-gray-400" style={{ fontSize: '9.5px' }}>
                    {c.time}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Floating chat — right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="hidden sm:block absolute top-[40%] right-[3%] rounded-2xl bg-white shadow-xl p-3 sm:p-4"
            style={{
              width: 'clamp(150px, 20%, 220px)',
              boxShadow: '0 14px 40px rgba(10,20,80,0.18)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
                }}
              />
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: '11px', fontWeight: 600 }}>
                  Dana Mitchell
                </p>
                <p
                  className="text-gray-400"
                  style={{ fontSize: '9.5px' }}
                >
                  {t.masterChatRole ?? 'Solutions Lead'}
                </p>
              </div>
            </div>
            <div
              className="rounded-xl p-2"
              style={{
                background:
                  'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                fontSize: '10.5px',
                color: '#4B5563',
                lineHeight: 1.4,
              }}
            >
              {t.masterChatBody ?? ''}
            </div>
          </motion.div>

          {/* Call button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="hidden sm:flex absolute bottom-[10%] left-[14%] items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              color: '#fff',
              boxShadow: '0 10px 30px rgba(239,68,68,0.45)',
            }}
          >
            <Phone size={16} strokeWidth={2.2} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            className="hidden sm:flex absolute bottom-[10%] left-[24%] items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#1A38E8',
              color: '#fff',
              boxShadow: '0 10px 30px rgba(26,56,232,0.4)',
            }}
          >
            <Video size={16} strokeWidth={2.2} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────
// 3. OUR BLOGS
// ───────────────────────────────────────────────────────────────
function buildBlogPosts(t: T) {
  return [
    { title: t.blog1Title ?? 'How we cut query latency 68 percent with a unified engine', read: '6 min read', tag: 'Performance' },
    { title: t.blog2Title ?? 'Sovereign deployments, a practical playbook', read: '8 min read', tag: 'Architecture' },
    { title: t.blog3Title ?? 'Vector and SQL in a single plane, why it matters', read: '5 min read', tag: 'AI' },
    { title: t.blog4Title ?? 'Streaming SQL at 1.2M transactions per second', read: '7 min read', tag: 'Streaming' },
    { title: t.blog5Title ?? 'Retiring five databases in a quarter', read: '9 min read', tag: 'Case Study' },
    { title: t.blog6Title ?? 'Governance built into the data plane', read: '6 min read', tag: 'Compliance' },
    { title: t.blog7Title ?? 'Geospatial time-series at continental scale', read: '10 min read', tag: 'IoT' },
    { title: t.blog8Title ?? 'The end of fragile data pipelines', read: '5 min read', tag: 'Engineering' },
  ]
}

function BlogsSection({ t }: { t: T }) {
  const BLOG_POSTS = buildBlogPosts(t)
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
      <div className={SECTION_CONTAINER}>
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={H2_STYLE}
          >
            {t.blogsTitle ?? 'Our blogs'}
          </motion.h2>
          <p
            className="text-gray-500 dark:text-gray-400 mt-3"
            style={BODY_STYLE}
          >
            {t.blogsBody ?? ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.08,
                ease: EASE,
              }}
              whileHover={{ y: -4 }}
              className="rounded-[20px] overflow-hidden cursor-pointer"
              style={{ background: '#F8F4F0' }}
            >
              {/* Thumb */}
              <div
                className="relative w-full"
                style={{
                  aspectRatio: '4 / 3',
                  background: `
                    linear-gradient(135deg, rgba(10,34,128,0.35) 0%, rgba(245,158,11,0.15) 100%),
                    linear-gradient(180deg, #0A2280 0%, #1A38E8 100%)
                  `,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.5,
                  }}
                />
                <span
                  className="absolute top-3 left-3"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    color: '#0A2280',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  {post.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <h3 className="text-gray-900 mb-3" style={H3_CARD_STYLE}>
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className="text-gray-500"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  >
                    {post.read}
                  </span>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{
                      color: '#1A38E8',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {t.blogsReadMore ?? 'Read more'}
                    <ArrowRight size={12} strokeWidth={2.4} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────
// 4. DATA INTEGRITY IS THE HIGHEST VALUE
// ───────────────────────────────────────────────────────────────
function buildTransformCards(t: T) {
  return [
    { title: t.transform1Title ?? 'Transforming teams through unified infrastructure', body: t.transform1Body ?? '' },
    { title: t.transform2Title ?? 'Transforming ops through real-time intelligence', body: t.transform2Body ?? '' },
  ]
}

function DataIntegritySection({ t }: { t: T }) {
  const TRANSFORM_CARDS = buildTransformCards(t)
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
      <div className={SECTION_CONTAINER}>
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={H2_STYLE}
          >
            {t.integrityTitle ?? 'Data integrity is the highest value in our work'}
          </motion.h2>
          <p
            className="text-gray-500 dark:text-gray-400 mt-3 mx-auto"
            style={{ ...BODY_STYLE, maxWidth: '620px' }}
          >
            {t.integrityBody ?? ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TRANSFORM_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-5 items-stretch"
            >
              {/* Text block */}
              <div className="flex flex-col justify-center">
                <h3
                  className="text-gray-900 dark:text-white mb-3"
                  style={{
                    fontSize: 'clamp(17px, 1.6vw, 22px)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-gray-500 dark:text-gray-400 mb-4"
                  style={{
                    fontSize: 'clamp(12.5px, 1vw, 14.5px)',
                    lineHeight: 1.55,
                  }}
                >
                  {card.body}
                </p>
                <Link
                  href="#"
                  className="self-start inline-flex items-center gap-1.5"
                  style={{
                    color: '#0A2280',
                    backgroundColor: 'transparent',
                    border: '1.5px solid rgba(10,34,128,0.2)',
                    borderRadius: '999px',
                    padding: '8px 18px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {t.viewMore ?? 'View more'}
                  <ArrowRight size={12} strokeWidth={2.4} />
                </Link>
              </div>

              {/* Image block */}
              <div
                className="relative rounded-[20px] overflow-hidden"
                style={{
                  minHeight: '200px',
                  background: `
                    linear-gradient(135deg, rgba(10,34,128,0.55) 0%, rgba(30,138,255,0.15) 100%),
                    radial-gradient(circle at 30% 30%, #1E8AFF 0%, transparent 50%),
                    linear-gradient(180deg, #0A2280 0%, #050D6A 100%)
                  `,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                    opacity: 0.5,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────
// 5. WHAT MAKES MONKDB THE BEST CHOICE
// ───────────────────────────────────────────────────────────────
function WhatMakesMonkDBSection({ t }: { t: T }) {
  const ENTERPRISE_FEATURES = [
    t.feature1 ?? 'Network integration',
    t.feature2 ?? 'Deep learning solutions',
    t.feature3 ?? 'Transfer learning',
    t.feature4 ?? 'Model evaluation',
    t.feature5 ?? 'Real-time prediction',
  ]
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0f1623]">
      <div className={SECTION_CONTAINER}>
        {/* Top band: left features list + right headline/copy */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-start mb-6 lg:mb-8">
          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-[20px] p-5 sm:p-6"
            style={{ background: '#F8F4F0' }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {ENTERPRISE_FEATURES.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center justify-between"
                  style={{
                    padding: '12px 4px',
                    borderTop:
                      i === 0 ? 'none' : '1px solid rgba(10,34,128,0.08)',
                    color: '#1F2937',
                    fontSize: 'clamp(13px, 1.05vw, 15px)',
                    fontWeight: 500,
                  }}
                >
                  {f}
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    style={{ color: '#1A38E8' }}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Headline + copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <h2
              className="text-[#0A2280] dark:text-white mb-5"
              style={H2_STYLE}
            >
              {t.whatMakesTitle ?? 'What makes MonkDB the best choice for your enterprise'}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400 mb-4"
              style={BODY_STYLE}
            >
              {t.whatMakesBody1 ?? ''}
            </p>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={BODY_STYLE}
            >
              {t.whatMakesBody2 ?? ''}
            </p>
          </motion.div>
        </div>

        {/* Bottom band: left two feature cards, right robotic handshake image */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-start">
          {/* Two blue cards */}
          <div className="grid grid-cols-1 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative rounded-[20px] overflow-hidden p-5 sm:p-6"
              style={{
                minHeight: '180px',
                background:
                  'linear-gradient(135deg, #1A38E8 0%, #1E8AFF 100%)',
                color: '#ffffff',
              }}
            >
              <span
                className="block mb-2"
                style={{
                  ...EYEBROW_STYLE,
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '11px',
                }}
              >
                {t.downloadKicker ?? 'Download'}
              </span>
              <h3 className="mb-4" style={H3_CARD_STYLE}>
                {t.brochureTitle ?? 'Services brochure'}
              </h3>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Download size={12} strokeWidth={2.2} />
                {t.downloadCta ?? 'Download'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="relative rounded-[20px] overflow-hidden p-5 sm:p-6"
              style={{
                minHeight: '180px',
                background:
                  'linear-gradient(135deg, #0A2280 0%, #050D6A 100%)',
                color: '#ffffff',
              }}
            >
              <span
                className="block mb-2"
                style={{
                  ...EYEBROW_STYLE,
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '11px',
                }}
              >
                {t.consultingKicker ?? 'Consulting'}
              </span>
              <h3 className="mb-2" style={H3_CARD_STYLE}>
                {t.consultingTitle ?? 'AI strategy and consulting'}
              </h3>
              <p
                className="text-white/75 mb-4"
                style={{ fontSize: '12.5px', lineHeight: 1.5 }}
              >
                {t.consultingBody ?? ''}
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                {t.consultingCta ?? 'Get in touch'}
                <ArrowRight size={12} strokeWidth={2.2} />
              </Link>
            </motion.div>
          </div>

          {/* Handshake image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative rounded-[20px] overflow-hidden"
            style={{
              minHeight: 'clamp(300px, 30vw, 420px)',
              background: `
                radial-gradient(ellipse 70% 50% at 50% 50%, rgba(167,139,250,0.3) 0%, transparent 60%),
                linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #6B21A8 100%)
              `,
            }}
          >
            {/* Placeholder "handshake" lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 300"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              style={{ opacity: 0.35 }}
            >
              <defs>
                <linearGradient id="hs1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path
                d="M 60 180 Q 160 120 200 150 T 340 150"
                stroke="url(#hs1)"
                strokeWidth="40"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="200" cy="150" r="22" fill="rgba(255,255,255,0.3)" />
            </svg>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                opacity: 0.45,
              }}
            />

            {/* Caption overlay */}
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="text-white/85"
                style={{
                  fontSize: 'clamp(12.5px, 1vw, 14.5px)',
                  lineHeight: 1.55,
                  maxWidth: '540px',
                }}
              >
                {t.handshakeBody ?? ''}
              </p>
              <ul
                className="text-white/75 mt-3"
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.7,
                  listStyle: 'disc',
                  paddingLeft: '18px',
                }}
              >
                <li>{t.handshakeBullet1 ?? 'Control Plane (MonkDB Orchestrator)'}</li>
                <li>{t.handshakeBullet2 ?? 'Data Plane (Customer Environment)'}</li>
                <li>{t.handshakeBullet3 ?? 'Multi-Modal Data Engine'}</li>
                <li>{t.handshakeBullet4 ?? 'AI-Native Layer'}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ───────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  const { dict, locale } = useI18n()
  const contactHref = localizedHref('/company/contact', locale)
  const t = (((dict as Record<string, unknown>).resourcesPage) ?? {}) as T
  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      <ServicesHero t={t} contactHref={contactHref} />
      <MasterDataSection t={t} />
      <BlogsSection t={t} />
      <DataIntegritySection t={t} />
      <WhatMakesMonkDBSection t={t} />

      <CTABanner />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
