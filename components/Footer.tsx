'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

function buildFooterLinks(t: Record<string, string>, aboutHref: string, locale: string) {
  // Brand and product names stay English globally.
  return {
    products: [
      { label: 'dbend Cloud', href: '#' },
      { label: 'dbend Enterprise', href: '#' },
      { label: 'dbend Community', href: '#' },
      { label: t.productRegister ?? 'Register', href: '#' },
      { label: t.productPricing ?? 'Pricing', href: '#' },
      { label: t.productComparisons ?? 'Comparisons', href: '#' },
      { label: t.productSecurity ?? 'Security', href: '#' },
    ],
    solutions: [
      { label: t.solutionUseCases ?? 'Use Cases', href: '#' },
      { label: t.solutionGame ?? 'Solutions for Game Industry', href: '#' },
      { label: t.solutionCrypto ?? 'Solutions for Crypto Industry', href: '#' },
      { label: t.solutionEcommerce ?? 'Solutions for E-commerce Industry', href: '#' },
      { label: t.solutionBanking ?? 'Solutions for Banking Industry', href: '#' },
    ],
    resources: [
      { label: t.resourceDocs ?? 'Documentation', href: '#' },
      { label: t.resourceBlogs ?? 'Blogs', href: '#' },
      { label: t.resourceVideos ?? 'Videos', href: '#' },
      { label: t.resourceDownloads ?? 'Downloads', href: '#' },
      { label: 'MCP', href: '#' },
    ],
    community: [
      { label: 'GitHub', href: 'https://github.com/monkdbofficial' },
      { label: t.communityContributing ?? 'Contributing', href: 'https://github.com/monkdbofficial' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/monkdb' },
      { label: 'YouTube', href: 'https://www.youtube.com/@monkdbofficial' },
      { label: 'X', href: 'https://x.com/monkdbofficial' },
    ],
    partners: [
      { label: 'Greptime', href: '#' },
      { label: 'AutoMQ', href: '#' },
    ],
    companyLinks: [
      { label: t.companyAbout ?? 'About Us', href: aboutHref },
      { label: t.companyContact ?? 'Contact Us', href: localizedHref('/company/contact', locale) },
      { label: t.companyCareers ?? 'Careers', href: localizedHref('/company/careers', locale) },
      { label: t.companyBrand ?? 'Brand', href: '#' },
    ],
  }
}

const SOCIAL_BG = '#1A38E8'

const socialIcons = [
  {
    label: 'GitHub',
    href: 'https://github.com/monkdbofficial',
    bg: SOCIAL_BG,
    path: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.29.1-2.69 0 0 .84-.28 2.75 1.05.8-.23 1.65-.34 2.5-.34s1.7.11 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49C19.13 20.57 22 16.75 22 12.25 22 6.58 17.52 2 12 2z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/monkdb',
    bg: SOCIAL_BG,
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@monkdbofficial',
    bg: SOCIAL_BG,
    path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
  {
    label: 'X',
    href: 'https://x.com/monkdbofficial',
    bg: SOCIAL_BG,
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-900 dark:text-white" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px', letterSpacing: '0.005em' }}>
      {children}
    </div>
  )
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
      {links.map((link) => {
        const external = /^https?:\/\//i.test(link.href)
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              style={{ fontSize: '0.85rem', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { dict, locale } = useI18n()
  const t = (((dict as Record<string, unknown>).footer) ?? {}) as Record<string, string>
  const tExtra = (((dict as Record<string, unknown>).footerExtra) ?? {}) as Record<string, string>
  const aboutHref = localizedHref('/about', locale)
  const links = buildFooterLinks(t, aboutHref, locale)
  const { products, solutions, resources, community, partners, companyLinks } = links

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer
      id="footer"
      ref={ref}
      className="bg-white dark:bg-[#0f1623]"
      style={{ borderTop: '1px solid #e5e7eb' }}
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-10 sm:pt-14 lg:pt-16 pb-8">

        {/* Main grid — 6 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_0.9fr_1fr_0.85fr_1.5fr] gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-0 mb-8 sm:mb-10 lg:mb-12">

          {/* Col 1 — Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="col-span-2 sm:col-span-3 lg:col-span-1"
          >
            <div className="text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
              MonkDB
            </div>
            <address className="not-italic" style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '12px' }}>
              <span style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '3px', color: '#9ca3af' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{t.addressLine1 ?? 'Wework Raheja Mindspace Building 9, Floor 13'}<br />{t.addressLine2 ?? 'Mindspace IT Park, Madhapur'}<br />{t.addressLine3 ?? 'Hyderabad 500081, Telangana'}<br />{t.addressLine4 ?? 'India'}</span>
              </span>
            </address>
            <div style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:support@monkdb.com" className="hover:text-gray-900 transition-colors" style={{ textDecoration: 'none' }}>support@monkdb.com</a>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                <a href="#" className="hover:text-gray-900 transition-colors" style={{ textDecoration: 'none' }}>{tExtra.websiteLabel ?? 'www.monkdb.com'}</a>
              </span>
            </div>
            {/* Social icons — rounded squares */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {socialIcons.map(({ label, href, bg, path }) => {
                const external = /^https?:\/\//i.test(href)
                const useFilledX = label === 'X' || label === 'GitHub'
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: 36, height: 36, borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={useFilledX ? 'white' : 'none'} stroke={useFilledX ? 'none' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path} />
                    </svg>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Col 2 — Products + Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col gap-8"
          >
            <div>
              <FooterHeading>{t.products}</FooterHeading>
              <FooterLinks links={products} />
            </div>
            <div>
              <FooterHeading>{t.solutions}</FooterHeading>
              <FooterLinks links={solutions} />
            </div>
          </motion.div>

          {/* Col 3 — Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <FooterHeading>{t.resources}</FooterHeading>
            <FooterLinks links={resources} />
          </motion.div>

          {/* Col 4 — Community + Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <FooterHeading>{t.community}</FooterHeading>
              <FooterLinks links={community} />
            </div>
            <div>
              <FooterHeading>{t.partners}</FooterHeading>
              <FooterLinks links={partners} />
            </div>
          </motion.div>

          {/* Col 5 — Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <FooterHeading>{t.company}</FooterHeading>
            <FooterLinks links={companyLinks} />
          </motion.div>

          {/* Col 6 — Stay Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="col-span-2 sm:col-span-3 lg:col-span-1"
          >
            <FooterHeading>{t.stayUpdated}</FooterHeading>

            {/* Email form */}
            <form onSubmit={handleSubscribe} style={{ marginBottom: '14px' }}>
              <div className="flex items-center rounded-[10px] p-1 gap-1 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 focus-within:border-blue-500/40 dark:focus-within:border-blue-500/40 transition-colors">
                <Mail size={13} className="ml-2 shrink-0 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white/85 placeholder-gray-400 dark:placeholder-gray-500 min-w-0"
                  style={{ padding: '7px 8px', fontSize: '0.8rem' }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="shrink-0 bg-[#1A38E8] text-white font-semibold rounded-[7px] cursor-pointer border-none"
                  style={{ padding: '7px 13px', fontSize: '0.75rem', letterSpacing: '0.02em' }}
                >
                  {t.subscribe}
                </motion.button>
              </div>
            </form>

            {/* Description */}
            <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '18px' }}>
              <strong className="text-gray-900 dark:text-white" style={{ fontWeight: 600 }}>MonkDB</strong> {t.description}
            </p>

            {/* GitHub + AWS Partner badges — single row (Slack + Discord commented out until workspaces are live) */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
              {/*
              <a
                href="#"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', background: '#F5F0E8' }}
                className="hover:shadow-sm transition-shadow"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.527 2.527 0 01-2.521 2.521 2.527 2.527 0 01-2.522-2.521V2.522A2.528 2.528 0 0115.167 0a2.528 2.528 0 012.521 2.522v6.312zm-2.521 10.122a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.167 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zm0-1.268a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.522h6.313A2.528 2.528 0 0124 15.167a2.528 2.528 0 01-2.522 2.521h-6.313z" fill="#E01E5A"/>
                </svg>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>slack</span>
              </a>
              <a
                href="#"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', background: '#F5F0E8' }}
                className="hover:shadow-sm transition-shadow"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5865F2">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
                </svg>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#5865F2' }}>Discord</span>
              </a>
              */}
              <a
                href="https://github.com/monkdbofficial"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', background: '#F5F0E8' }}
                className="hover:shadow-sm transition-shadow"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a">
                  <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.29.1-2.69 0 0 .84-.28 2.75 1.05.8-.23 1.65-.34 2.5-.34s1.7.11 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49C19.13 20.57 22 16.75 22 12.25 22 6.58 17.52 2 12 2z"/>
                </svg>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>GitHub</span>
              </a>

              {/* AWS Partner badge */}
              <a
                href="https://aws.amazon.com/marketplace/pp/prodview-lcatixmedlbxw"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', textDecoration: 'none' }}
                aria-label={tExtra.awsBadgeAlt ?? 'AWS Partner Marketplace Seller'}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/aws-partner-marketplace-seller 1.svg"
                  alt={tExtra.awsBadgeAlt ?? 'AWS Partner Marketplace Seller'}
                  className="h-14 sm:h-16 lg:h-[72px] w-auto object-contain"
                />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}
        >
          <p className="text-gray-400 dark:text-gray-500" style={{ fontSize: '0.78rem' }}>
            &copy; {new Date().getFullYear()} MonkDB. {t.copyright}
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {[t.privacyPolicy, t.termsOfService, t.cookiePolicy].map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" style={{ fontSize: '0.78rem', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
