'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '@/app/theme'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'
import LanguageSwitcher from './LanguageSwitcher'

// ───────────────────────────── Nav data (from MonkDB Website Content.pdf) ──
// `noLocale` opts a link out of the locale prefix — used for routes that are
// served via next.config rewrites (e.g. /downloads, proxied from Cloudflare R2)
// and exist outside the [locale] tree.
type NavLeaf = { label: string; href: string; noLocale?: boolean }
type NavGroup = { title: string; items: NavLeaf[] }

type NavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'dropdown'; id: string; label: string; items: NavLeaf[] }
  | { kind: 'mega'; id: string; label: string; groups: NavGroup[] }

function buildNavigation(
  t: (key: string) => string,
  tExt: (key: string) => string,
  tNavExtra: (key: string) => string,
): NavItem[] {
  return [
    { kind: 'link', label: t('home'), href: '/' },

    // Products — MonkDB platform + strategic pillars + MonkEdge + MonkSmartX suite.
    {
      kind: 'mega',
      id: 'products',
      label: tExt('products'),
      groups: [
        {
          title: tExt('products'),
          items: [
            { label: tExt('productMonkDB'), href: '/features' },
            { label: tExt('productMonkEdge'), href: '/products/monkedge' },
            { label: tExt('productMonkSmartX'), href: '/products/monksmartx' },
            // ViewMonk Workbench — the free downloadable visual interface.
            // Lives under Products so it stays grouped with the rest of the
            // product offerings rather than crowding the top-level nav.
            { label: tExt('productViewMonk'), href: '/viewmonk' },
          ],
        },
        {
          title: tExt('platformGroup'),
          items: [
            {
              label: tExt('platformSovereign'),
              href: '/platform/sovereign',
            },
            {
              label: tExt('platformOperational'),
              href: '/platform/operational-intelligence',
            },
          ],
        },
        {
          title: tExt('productMonkSmartX'),
          items: [
            { label: tExt('smartmine'), href: '/products/monksmartx/smartmine' },
            {
              label: tExt('smartmobility'),
              href: '/products/monksmartx/smartmobility',
            },
            {
              label: tExt('smartfinance'),
              href: '/products/monksmartx/smartfinance',
            },
            {
              label: tExt('smarttrade'),
              href: '/products/monksmartx/smarttrade',
            },
            {
              label: tExt('smartretail'),
              href: '/products/monksmartx/smartretail',
            },
            {
              label: tExt('smartmanufacturing'),
              href: '/products/monksmartx/smartmanufacturing',
            },
          ],
        },
      ],
    },

    // Core Systems — 6 deeply integrated engines from Part II docx.
    {
      kind: 'dropdown',
      id: 'core-systems',
      label: t('coreSystems'),
      items: [
        { label: t('core1'), href: '/core-systems/unified-operational-engine' },
        { label: t('core2'), href: '/core-systems/real-time-processing-engine' },
        { label: t('core3'), href: '/core-systems/ai-native-execution-engine' },
        { label: t('core4'), href: '/core-systems/decision-action-engine' },
        { label: t('core5'), href: '/core-systems/edge-to-cloud-fabric' },
        { label: t('core6'), href: '/core-systems/sovereignty-trust-layer' },
      ],
    },

    // Solutions — Part II 10 capability-level solutions + use cases + outcomes.
    {
      kind: 'mega',
      id: 'solutions',
      label: t('solutions'),
      groups: [
        {
          title: t('useCases'),
          items: [
            { label: t('useCase1'), href: '/solutions/ai-ml' },
            { label: t('useCase2'), href: '/solutions/real-time-streaming' },
            { label: t('useCase3'), href: '/solutions/iceberg-tables' },
            {
              label: t('useCase4'),
              href: '/solutions/real-time-operational-intelligence',
            },
            {
              label: t('useCase5'),
              href: '/solutions/autonomous-decisioning-systems',
            },
            {
              label: t('useCase6'),
              href: '/solutions/energy-and-resource-optimization',
            },
            {
              label: t('useCase7'),
              href: '/solutions/digital-twin-and-simulation',
            },
            {
              label: t('useCase8'),
              href: '/solutions/edge-intelligence-and-distributed-ai',
            },
            {
              label: t('useCase9'),
              href: '/solutions/data-and-ai-modernization',
            },
            {
              label: t('useCase10'),
              href: '/solutions/ai-governance-and-trust',
            },
          ],
        },
        {
          title: t('outcomes'),
          items: [
            { label: t('outcome1'), href: '/outcomes/reduce-cost' },
            { label: t('outcome2'), href: '/outcomes/improve-efficiency' },
            { label: t('outcome3'), href: '/outcomes/enhance-safety' },
            { label: t('outcome4'), href: '/outcomes/enable-autonomy' },
            { label: t('outcome5'), href: '/outcomes/trust-compliance' },
            {
              label: t('outcome6'),
              href: '/outcomes/accelerate-decision-making',
            },
          ],
        },
      ],
    },

    // Industries — 9 industry verticals from Part II docx.
    {
      kind: 'dropdown',
      id: 'industries',
      label: t('industries'),
      items: [
        { label: t('industry1'), href: '/industries/mining-and-manufacturing' },
        { label: t('industry2'), href: '/industries/automobiles' },
        { label: t('industry3'), href: '/industries/bfsi-and-capital-markets' },
        { label: t('industry4'), href: '/industries/mining-and-metals' },
        { label: t('industry5'), href: '/industries/steel-and-manufacturing' },
        { label: t('industry6'), href: '/industries/data-centers' },
        { label: t('industry7'), href: '/industries/energy-and-utilities' },
        {
          label: t('industry8'),
          href: '/industries/infrastructure-and-smart-cities',
        },
        { label: t('industry9'), href: '/industries/logistics-and-mobility' },
      ],
    },

    { kind: 'link', label: tExt('developers'), href: '/developers' },

    // Learn — Hub + Resources + Documentation + Customer Stories + Blog + Events + Journey.
    {
      kind: 'dropdown',
      id: 'learn',
      label: t('learn'),
      items: [
        { label: tNavExtra('learnHub'), href: '/resources/learn' },
        { label: t('learn1'), href: '/resources/resources' },
        { label: t('learn2'), href: 'https://docs.monkdb.com' },
        { label: t('learn3'), href: '/resources/customer-stories' },
        { label: t('learn4'), href: '/resources/blog' },
        { label: t('learn5'), href: '/resources/events' },
        { label: tNavExtra('developerJourney'), href: '/developers/journey' },
      ],
    },

    {
      kind: 'dropdown',
      id: 'company',
      label: t('company'),
      items: [
        { label: t('companyAbout'), href: '/about' },
        { label: t('companyPress'), href: '/company/press' },
        { label: t('companyPartners'), href: '/company/partners' },
        { label: t('companyCareers'), href: '/company/careers' },
        { label: t('companyContact'), href: '/company/contact' },
      ],
    },
  ]
}

function withLocale(href: string, locale: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  return localizedHref(href, locale)
}

// Resolve a nav leaf's href, honoring the `noLocale` opt-out for routes
// proxied outside the [locale] tree (e.g. /downloads).
function leafHref(child: NavLeaf, locale: string) {
  if (child.noLocale) return child.href
  return withLocale(child.href, locale)
}

const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const
const SANAS_EASE_CSS = 'cubic-bezier(0.165, 0.84, 0.44, 1)'

// ───────────────────────────── Component ───────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [onHero, setOnHero] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [headerHovered, setHeaderHovered] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [panelLeft, setPanelLeft] = useState<number>(0)

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { locale, dict } = useI18n()
  const tNav = (key: string) =>
    (dict.nav as Record<string, string>)[key] ?? key
  const tNavExt = (key: string) => {
    const ext = (dict as Record<string, unknown>).navExt as
      | Record<string, string>
      | undefined
    return ext?.[key] ?? key
  }
  const tNavExtra = (key: string) => {
    const extra = (dict as Record<string, unknown>).navExtra as
      | Record<string, string>
      | undefined
    return extra?.[key] ?? (key === 'learnHub' ? 'Learn Hub' : key === 'developerJourney' ? 'Developer Journey' : key)
  }
  const navigation = buildNavigation(tNav, tNavExt, tNavExtra)
  const homePath = localizedHref('/', locale)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const handleScroll = () => {
      const y = window.scrollY
      setOnHero(pathname === homePath && y < window.innerHeight * 0.85)
      setScrolled(y > 240)
      // Close any open dropdown on scroll — it would drift otherwise
      setOpenMenu(null)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, homePath])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openDropdown = (id: string, triggerEl: HTMLElement) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    const rect = triggerEl.getBoundingClientRect()
    const center = rect.left + rect.width / 2

    // Clamp so the panel never overflows the viewport.
    const item = navigation.find(
      (n) => (n.kind === 'dropdown' || n.kind === 'mega') && n.id === id,
    )
    const isMega = item?.kind === 'mega'
    const approxHalfWidth = isMega ? 430 : 190 // conservative half-widths
    const margin = 16
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
    const minCenter = margin + approxHalfWidth
    const maxCenter = vw - margin - approxHalfWidth
    const clamped = Math.max(minCenter, Math.min(maxCenter, center))

    setPanelLeft(clamped)
    setOpenMenu(id)
  }

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180)
  }

  const keepOpen = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const isActive = (href: string) => {
    const target = withLocale(href, locale)
    if (href === '/') return pathname === homePath
    return pathname === target || pathname?.startsWith(target.split('#')[0])
  }

  // Same active check, but uses leafHref so noLocale leaves match correctly.
  const leafActive = (leaf: NavLeaf) => {
    const target = leafHref(leaf, locale)
    return (
      pathname === target ||
      (pathname?.startsWith(target.split('#')[0]) ?? false)
    )
  }

  const itemActive = (item: NavItem) => {
    if (item.kind === 'link') return isActive(item.href)
    if (item.kind === 'dropdown')
      return item.items.some((c) => leafActive(c))
    return item.groups.some((g) => g.items.some((c) => leafActive(c)))
  }

  // Colors
  const linkColor = onHero
    ? 'rgba(255,255,255,0.78)'
    : theme === 'dark'
      ? 'rgba(255,255,255,0.7)'
      : '#4B5563'
  const linkHoverColor = onHero
    ? '#ffffff'
    : theme === 'dark'
      ? '#ffffff'
      : '#1A38E8'
  const activeColor = onHero ? '#ffffff' : '#1A38E8'

  const pillBg = onHero
    ? 'rgba(10,20,90,0.55)'
    : theme === 'dark'
      ? 'rgba(15,22,35,0.88)'
      : 'rgba(255,255,255,0.92)'

  const pillBorder = onHero
    ? 'hsla(0, 0%, 100%, 0.12)'
    : theme === 'dark'
      ? 'hsla(0, 0%, 100%, 0.08)'
      : 'rgba(10,20,60,0.08)'

  // Panel visuals — share pill tokens so the dropdown matches the pill exactly
  const panelText =
    onHero || theme === 'dark' ? 'rgba(255,255,255,0.82)' : '#1F2937'
  const panelTextHover =
    onHero || theme === 'dark' ? '#ffffff' : '#1A38E8'
  const panelTitle =
    onHero || theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280'
  const panelDivider =
    onHero || theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(10,20,60,0.08)'

  const collapsed = scrolled && !headerHovered

  const currentMenu = openMenu
    ? navigation.find(
        (i) => (i.kind === 'dropdown' || i.kind === 'mega') && i.id === openMenu,
      )
    : null

  return (
    <>
      {/* ── FLOATING PILL HEADER ── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: SANAS_EASE }}
        className="fixed z-50 pointer-events-none flex justify-center w-full"
        style={{
          top: `calc(var(--banner-h, 0px) + ${scrolled ? '16px' : '22px'})`,
          transition: `top 600ms ${SANAS_EASE_CSS}`,
          padding: '0 12px',
        }}
      >
        <div
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
          className="pointer-events-auto flex items-center relative overflow-hidden"
          style={{
            backgroundColor: pillBg,
            border: `1px solid ${pillBorder}`,
            borderRadius: '999px',
            height: 'clamp(52px, 7vw, 62px)',
            paddingLeft: 'clamp(14px, 2vw, 24px)',
            paddingRight: 'clamp(8px, 1vw, 10px)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: scrolled
              ? '0 12px 40px rgba(10, 20, 80, 0.22), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(10, 20, 80, 0.08)',
            transition: `background-color 400ms ${SANAS_EASE_CSS}, box-shadow 400ms ${SANAS_EASE_CSS}, border-color 400ms ${SANAS_EASE_CSS}`,
          }}
        >
          {/* Logo */}
          <Link href={homePath} className="flex-shrink-0 flex items-center z-10 relative">
            <Image
              src="/logo.png"
              alt={((dict as Record<string, unknown>).footerExtra as Record<string, string> | undefined)?.logoAlt ?? 'MonkDB'}
              width={130}
              height={36}
              className="h-6 sm:h-7 w-auto object-contain"
              style={{
                filter: onHero ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 500ms linear',
              }}
              priority
            />
          </Link>

          {/* Collapsible nav area */}
          <div
            className="hidden md:flex items-center overflow-hidden"
            style={{
              width: collapsed ? '0px' : 'auto',
              maxWidth: collapsed ? '0px' : '1000px',
              opacity: collapsed ? 0 : 1,
              transition: `width 750ms ${SANAS_EASE_CSS}, max-width 750ms ${SANAS_EASE_CSS}, opacity 500ms linear`,
            }}
          >
            <nav className="flex items-center gap-5 lg:gap-6 px-6 lg:px-8 whitespace-nowrap">
              {navigation.map((item, i) => {
                const active = itemActive(item)
                const hasChildren = item.kind !== 'link'

                const triggerContent = (
                  <span
                    className="relative inline-flex items-center gap-1 text-[13px] lg:text-[13.5px] group"
                    style={{
                      color: active ? activeColor : linkColor,
                      fontWeight: active ? 600 : 500,
                      letterSpacing: '0.01em',
                      transition: 'color 150ms linear',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = linkHoverColor
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = active
                        ? activeColor
                        : linkColor
                    }}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        size={11}
                        strokeWidth={2.2}
                        style={{
                          opacity: 0.6,
                          transform:
                            openMenu === (item as { id: string }).id
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          transition: `transform 200ms ${SANAS_EASE_CSS}`,
                        }}
                      />
                    )}
                    {/* Active dot indicator */}
                    <span
                      className="absolute left-1/2 pointer-events-none"
                      style={{
                        bottom: '-10px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: active ? activeColor : 'transparent',
                        transform: `translate(-50%, -50%) scale(${active ? 1 : 0})`,
                        transition: `transform 200ms ${SANAS_EASE_CSS}`,
                      }}
                    />
                  </span>
                )

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.06,
                      ease: SANAS_EASE,
                    }}
                    className="relative"
                    onMouseEnter={(e) => {
                      if (item.kind !== 'link') {
                        openDropdown(
                          (item as { id: string }).id,
                          e.currentTarget as HTMLElement,
                        )
                      }
                    }}
                    onMouseLeave={() => item.kind !== 'link' && scheduleClose()}
                  >
                    {item.kind === 'link' ? (
                      <Link
                        href={withLocale(item.href, locale)}
                        className="relative inline-block"
                        style={{ textDecoration: 'none' }}
                      >
                        {triggerContent}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="cursor-default bg-transparent border-0 p-0"
                        aria-expanded={openMenu === item.id}
                        aria-haspopup="true"
                      >
                        {triggerContent}
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </nav>
          </div>

          {/* Right-side controls */}
          <div
            className="flex items-center gap-2 z-10 relative"
            style={{ marginLeft: 'clamp(20px, 5vw, 48px)' }}
          >
            <div className="hidden md:inline-flex">
              <LanguageSwitcher
                iconColor={linkColor}
                panelBg={pillBg}
                panelBorder={pillBorder}
                panelText={panelText}
                panelTextHover={panelTextHover}
                variant="full"
              />
            </div>

            {/* Dark mode toggle disabled — site is forced to light mode.
                Re-enable by uncommenting and restoring the toggle in app/theme.tsx.
            {mounted && (
              <button
                aria-label={tNav('toggleTheme')}
                onClick={toggleTheme}
                className="hidden md:inline-flex p-2 rounded-full"
                style={{ color: linkColor, transition: 'color 150ms linear' }}
              >
                {theme === 'dark' ? (
                  <Sun size={16} strokeWidth={1.9} />
                ) : (
                  <Moon size={16} strokeWidth={1.9} />
                )}
              </button>
            )}
            */}

            <motion.a
              href={localizedHref('/company/contact', locale)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: SANAS_EASE }}
              className="hidden sm:inline-flex items-center"
              style={{
                backgroundColor: onHero ? '#EDE8D8' : '#1A38E8',
                color: onHero ? '#0A2280' : '#ffffff',
                borderRadius: '999px',
                padding: '9px 20px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: onHero
                  ? '0 4px 14px rgba(0,0,0,0.18)'
                  : '0 4px 14px rgba(26,56,232,0.28)',
                transition: `background-color 350ms ${SANAS_EASE_CSS}, color 350ms ${SANAS_EASE_CSS}`,
              }}
            >
              {tNav('bookDemo')}
            </motion.a>

            <button
              aria-label={tNav('toggleMenu')}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
              style={{ color: linkColor }}
            >
              <div
                className="relative w-5 h-[2px]"
                style={{
                  backgroundColor: mobileOpen ? 'transparent' : 'currentColor',
                  transition: 'background-color 200ms linear',
                }}
              >
                <span
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundColor: 'currentColor',
                    transform: mobileOpen
                      ? 'translateY(0) rotate(45deg)'
                      : 'translateY(-7px) rotate(0deg)',
                    transition: `transform 300ms ${SANAS_EASE_CSS}`,
                  }}
                />
                <span
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundColor: 'currentColor',
                    transform: mobileOpen
                      ? 'translateY(0) rotate(-45deg)'
                      : 'translateY(7px) rotate(0deg)',
                    transition: `transform 300ms ${SANAS_EASE_CSS}`,
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── DROPDOWN / MEGA PANEL (desktop) — anchored to trigger ── */}
      <AnimatePresence mode="wait">
        {currentMenu && (currentMenu.kind === 'dropdown' || currentMenu.kind === 'mega') && (
          <div
            key={`wrap-${currentMenu.id}`}
            className="fixed z-40 hidden md:block"
            style={{
              top: `calc(var(--banner-h, 0px) + ${scrolled ? '96px' : '108px'})`,
              left: 0,
              // Outer wrapper handles positioning — framer-motion's transform
              // on the inner element would otherwise wipe out translateX(-50%).
              transform: `translateX(${panelLeft}px) translateX(-50%)`,
              pointerEvents: 'none',
            }}
          >
          <motion.div
            key={currentMenu.id}
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32, ease: SANAS_EASE }}
            onMouseEnter={keepOpen}
            onMouseLeave={scheduleClose}
            style={{
              transformOrigin: 'top center',
              backgroundColor: pillBg,
              border: `1px solid ${pillBorder}`,
              borderRadius: '24px',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow:
                '0 24px 60px rgba(10, 20, 80, 0.28), 0 8px 24px rgba(10, 20, 80, 0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
              padding: currentMenu.kind === 'mega' ? '24px 28px' : '18px 20px',
              minWidth:
                currentMenu.kind === 'mega' ? 'min(720px, 92vw)' : '280px',
              maxWidth:
                currentMenu.kind === 'mega'
                  ? 'min(860px, 92vw)'
                  : 'min(360px, 92vw)',
              pointerEvents: 'auto',
              position: 'relative',
            }}
          >
            {/* Top inner shine — mirrors pill */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              }}
            />

            {/* Caret — top-center points up to the pill */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-7px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                backgroundColor: pillBg,
                borderTop: `1px solid ${pillBorder}`,
                borderLeft: `1px solid ${pillBorder}`,
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }}
            />

            {currentMenu.kind === 'dropdown' ? (
              <ul
                className="flex flex-col"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {currentMenu.items.map((child, idx) => {
                  const active = leafActive(child)
                  return (
                    <motion.li
                      key={child.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + idx * 0.035,
                        ease: SANAS_EASE,
                      }}
                    >
                      <Link
                        href={leafHref(child, locale)}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-xl"
                        style={{
                          padding: '10px 14px',
                          color: active ? panelTextHover : panelText,
                          fontSize: '13.5px',
                          fontWeight: active ? 600 : 500,
                          letterSpacing: '0.005em',
                          textDecoration: 'none',
                          transition: `color 180ms ${SANAS_EASE_CSS}, background 180ms ${SANAS_EASE_CSS}, padding-left 180ms ${SANAS_EASE_CSS}`,
                        }}
                        onMouseEnter={(e) => {
                          const t = e.currentTarget as HTMLAnchorElement
                          t.style.color = panelTextHover
                          t.style.background =
                            onHero || theme === 'dark'
                              ? 'rgba(255,255,255,0.07)'
                              : 'rgba(26,56,232,0.06)'
                          t.style.paddingLeft = '18px'
                        }}
                        onMouseLeave={(e) => {
                          const t = e.currentTarget as HTMLAnchorElement
                          t.style.color = active ? panelTextHover : panelText
                          t.style.background = 'transparent'
                          t.style.paddingLeft = '14px'
                        }}
                      >
                        {child.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            ) : (
              <div
                className="grid gap-6 sm:gap-8"
                style={{
                  gridTemplateColumns: `repeat(${currentMenu.groups.length}, minmax(0, 1fr))`,
                }}
              >
                {currentMenu.groups.map((group, gi) => (
                  <div
                    key={group.title}
                    style={{
                      borderLeft:
                        gi === 0 ? 'none' : `1px solid ${panelDivider}`,
                      paddingLeft: gi === 0 ? 0 : '24px',
                    }}
                  >
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.04 + gi * 0.06,
                        ease: SANAS_EASE,
                      }}
                      style={{
                        color: panelTitle,
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '0 14px',
                        marginBottom: '8px',
                      }}
                    >
                      {group.title}
                    </motion.p>
                    <ul
                      className="flex flex-col"
                      style={{ listStyle: 'none', padding: 0, margin: 0 }}
                    >
                      {group.items.map((child, idx) => {
                        const active = leafActive(child)
                        return (
                          <motion.li
                            key={child.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: 0.08 + gi * 0.05 + idx * 0.025,
                              ease: SANAS_EASE,
                            }}
                          >
                            <Link
                              href={leafHref(child, locale)}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-xl"
                              style={{
                                padding: '9px 14px',
                                color: active ? panelTextHover : panelText,
                                fontSize: '13px',
                                fontWeight: active ? 600 : 500,
                                letterSpacing: '0.005em',
                                textDecoration: 'none',
                                transition: `color 180ms ${SANAS_EASE_CSS}, background 180ms ${SANAS_EASE_CSS}, padding-left 180ms ${SANAS_EASE_CSS}`,
                              }}
                              onMouseEnter={(e) => {
                                const t = e.currentTarget as HTMLAnchorElement
                                t.style.color = panelTextHover
                                t.style.background =
                                  onHero || theme === 'dark'
                                    ? 'rgba(255,255,255,0.07)'
                                    : 'rgba(26,56,232,0.06)'
                                t.style.paddingLeft = '18px'
                              }}
                              onMouseLeave={(e) => {
                                const t = e.currentTarget as HTMLAnchorElement
                                t.style.color = active
                                  ? panelTextHover
                                  : panelText
                                t.style.background = 'transparent'
                                t.style.paddingLeft = '14px'
                              }}
                            >
                              {child.label}
                            </Link>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[54] md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: SANAS_EASE }}
            className="fixed left-3 right-3 sm:left-4 sm:right-4 z-[55] md:hidden rounded-[24px] sm:rounded-[28px] overflow-hidden"
            style={{
              top: `calc(var(--banner-h, 0px) + ${scrolled ? '82px' : '94px'})`,
              maxHeight: 'calc(100vh - var(--banner-h, 0px) - 110px)',
              overflowY: 'auto',
              backgroundColor: onHero
                ? 'rgba(10,20,90,0.92)'
                : theme === 'dark'
                  ? 'rgba(13,21,38,0.96)'
                  : 'rgba(255,255,255,0.96)',
              border: `1px solid ${pillBorder}`,
              backdropFilter: 'blur(22px) saturate(180%)',
              WebkitBackdropFilter: 'blur(22px) saturate(180%)',
              boxShadow: '0 20px 50px rgba(10, 20, 80, 0.24)',
            }}
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navigation.map((item, i) => {
                const textColor =
                  onHero || theme === 'dark' ? 'rgba(255,255,255,0.88)' : '#374151'

                if (item.kind === 'link') {
                  const active = isActive(item.href)
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + i * 0.04,
                        ease: SANAS_EASE,
                      }}
                    >
                      <Link
                        href={withLocale(item.href, locale)}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-[16px] rounded-2xl"
                        style={{
                          color: textColor,
                          fontWeight: active ? 600 : 500,
                          background: active
                            ? onHero
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(26,56,232,0.08)'
                            : 'transparent',
                          textDecoration: 'none',
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                }

                const expanded = mobileExpanded === item.id
                const children =
                  item.kind === 'dropdown'
                    ? [{ title: '', items: item.items }]
                    : item.groups

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + i * 0.04,
                      ease: SANAS_EASE,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : item.id)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-[16px] rounded-2xl"
                      style={{
                        color: textColor,
                        fontWeight: 500,
                        background: 'transparent',
                        border: 'none',
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.8}
                        style={{
                          transform: expanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: `transform 220ms ${SANAS_EASE_CSS}`,
                        }}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: SANAS_EASE }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            className="flex flex-col gap-0 pl-4 pr-2 pb-2"
                            style={{ borderLeft: `1px solid ${pillBorder}`, marginLeft: '18px' }}
                          >
                            {children.map((group, gi) => (
                              <div key={group.title || `g-${gi}`}>
                                {group.title && (
                                  <p
                                    style={{
                                      color:
                                        onHero || theme === 'dark'
                                          ? 'rgba(255,255,255,0.45)'
                                          : '#9CA3AF',
                                      fontSize: '10.5px',
                                      fontWeight: 600,
                                      letterSpacing: '0.08em',
                                      textTransform: 'uppercase',
                                      padding: '10px 12px 4px',
                                    }}
                                  >
                                    {group.title}
                                  </p>
                                )}
                                {group.items.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={leafHref(child, locale)}
                                    onClick={() => {
                                      setMobileOpen(false)
                                      setMobileExpanded(null)
                                    }}
                                    className="block px-4 py-2 text-[14px] rounded-xl"
                                    style={{
                                      color:
                                        onHero || theme === 'dark'
                                          ? 'rgba(255,255,255,0.72)'
                                          : '#4B5563',
                                      fontWeight: 500,
                                      textDecoration: 'none',
                                    }}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              <motion.a
                href={localizedHref('/company/contact', locale)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35, ease: SANAS_EASE }}
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center"
                style={{
                  backgroundColor: onHero ? '#EDE8D8' : '#1A38E8',
                  color: onHero ? '#0A2280' : '#ffffff',
                  borderRadius: '999px',
                  padding: '12px 20px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                {tNav('bookDemo')}
              </motion.a>

              <div
                className="flex items-center justify-center mt-2 border-t pt-3"
                style={{ borderColor: pillBorder }}
              >
                <LanguageSwitcher
                  iconColor={
                    onHero || theme === 'dark'
                      ? 'rgba(255,255,255,0.78)'
                      : '#4B5563'
                  }
                  panelBg={pillBg}
                  panelBorder={pillBorder}
                  panelText={panelText}
                  panelTextHover={panelTextHover}
                  variant="full"
                />
              </div>

              {/* Dark mode toggle disabled — site is forced to light mode.
                  Re-enable by uncommenting and restoring the toggle in app/theme.tsx.
              {mounted && (
                <button
                  onClick={() => {
                    toggleTheme()
                    setMobileOpen(false)
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-medium mt-1"
                  style={{
                    color:
                      onHero || theme === 'dark'
                        ? 'rgba(255,255,255,0.78)'
                        : '#4B5563',
                  }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === 'dark' ? tNav('lightMode') : tNav('darkMode')}
                </button>
              )}
              */}
            </nav>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
