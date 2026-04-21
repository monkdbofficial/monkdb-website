'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Core Systems', href: '/features' },
  { label: 'Solutions', href: '/why-choose-us' },
  { label: 'Industries', href: '/architecture' },
  { label: 'Learn', href: '/resources' },
  { label: 'Company', href: '/about' },
]

// Sanas.ai exact easing curve, extracted from their CSS bundle
const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const
const SANAS_EASE_CSS = 'cubic-bezier(0.165, 0.84, 0.44, 1)'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [onHero, setOnHero] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [headerHovered, setHeaderHovered] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const y = window.scrollY
      setOnHero(pathname === '/' && y < window.innerHeight * 0.85)
      setScrolled(y > 48)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href
  }

  // Colors — over hero (dark blue bg) vs. light content areas
  const linkColor = onHero
    ? 'rgba(255,255,255,0.78)'
    : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#4B5563')
  const linkHoverColor = onHero
    ? '#ffffff'
    : (theme === 'dark' ? '#ffffff' : '#1A38E8')
  const activeColor = onHero ? '#ffffff' : '#1A38E8'

  const pillBg = onHero
    ? 'rgba(10,20,90,0.55)'
    : (theme === 'dark' ? 'rgba(15,22,35,0.72)' : 'rgba(255,255,255,0.75)')

  const pillBorder = onHero
    ? 'hsla(0, 0%, 100%, 0.12)'
    : (theme === 'dark' ? 'hsla(0, 0%, 100%, 0.08)' : 'rgba(10,20,60,0.08)')

  // Key sanas behavior: when scrolled AND not hovered, the nav area collapses
  const collapsed = scrolled && !headerHovered

  return (
    <>
      {/* ── FLOATING PILL HEADER (sanas-exact) ── */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: SANAS_EASE }}
        className="fixed z-50 pointer-events-none flex justify-center w-full"
        style={{
          top: scrolled ? '20px' : '32px',
          transition: `top 600ms ${SANAS_EASE_CSS}`,
          padding: '0 16px',
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
            height: '62px',
            paddingLeft: '24px',
            paddingRight: '10px',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: scrolled
              ? '0 12px 40px rgba(10, 20, 80, 0.22), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(10, 20, 80, 0.08)',
            transition: `background-color 400ms ${SANAS_EASE_CSS}, box-shadow 400ms ${SANAS_EASE_CSS}, border-color 400ms ${SANAS_EASE_CSS}`,
          }}
        >
          {/* Logo — always visible */}
          <Link href="/" className="flex-shrink-0 flex items-center z-10 relative">
            <Image
              src="/logo.png"
              alt="MonkDB"
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

          {/* Collapsible nav area — shrinks to 0 width on scroll (sanas exact) */}
          <div
            className="hidden md:flex items-center overflow-hidden"
            style={{
              width: collapsed ? '0px' : 'auto',
              maxWidth: collapsed ? '0px' : '900px',
              opacity: collapsed ? 0 : 1,
              transition: `width 750ms ${SANAS_EASE_CSS}, max-width 750ms ${SANAS_EASE_CSS}, opacity 500ms linear`,
            }}
          >
            <nav className="flex items-center gap-6 lg:gap-7 px-6 lg:px-8 whitespace-nowrap">
              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: SANAS_EASE }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      className="relative inline-block text-[13px] lg:text-[13.5px] group"
                      style={{
                        color: active ? activeColor : linkColor,
                        fontWeight: active ? 600 : 500,
                        letterSpacing: '0.01em',
                        transition: 'color 150ms linear',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = active ? activeColor : linkColor
                      }}
                    >
                      {link.label}

                      {/* Sanas-exact: DOT indicator below on hover/active */}
                      <span
                        className="absolute left-1/2 pointer-events-none"
                        style={{
                          bottom: '-10px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: active ? activeColor : linkHoverColor,
                          transform: `translate(-50%, -50%) scale(${active ? 1 : 0})`,
                          transition: `transform 200ms ${SANAS_EASE_CSS}`,
                        }}
                      />
                      {!active && (
                        <span
                          className="absolute left-1/2 pointer-events-none opacity-0 group-hover:opacity-100"
                          style={{
                            bottom: '-10px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: linkHoverColor,
                            transform: 'translate(-50%, -50%) scale(0)',
                            transition: `transform 200ms ${SANAS_EASE_CSS}, opacity 150ms linear`,
                          }}
                          ref={(el) => {
                            if (!el) return
                            const parent = el.parentElement
                            if (!parent) return
                            const onEnter = () => { el.style.transform = 'translate(-50%, -50%) scale(1)' }
                            const onLeave = () => { el.style.transform = 'translate(-50%, -50%) scale(0)' }
                            parent.addEventListener('mouseenter', onEnter)
                            parent.addEventListener('mouseleave', onLeave)
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>

          {/* Right side — always visible */}
          <div className="flex items-center gap-2 ml-auto z-10 relative">
            {mounted && (
              <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="hidden md:inline-flex p-2 rounded-full"
                style={{ color: linkColor, transition: 'color 150ms linear' }}
              >
                {theme === 'dark' ? <Sun size={16} strokeWidth={1.9} /> : <Moon size={16} strokeWidth={1.9} />}
              </button>
            )}

            {/* CTA pill (desktop) */}
            <motion.a
              href="#demo"
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
              Book Demo
            </motion.a>

            {/* Sanas-exact hamburger (mobile): middle fades out, top/bottom rotate ±45° */}
            <button
              aria-label="Toggle menu"
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

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: SANAS_EASE }}
            className="fixed left-4 right-4 z-40 md:hidden rounded-[28px] overflow-hidden"
            style={{
              top: scrolled ? '94px' : '106px',
              backgroundColor: onHero
                ? 'rgba(10,20,90,0.88)'
                : (theme === 'dark' ? 'rgba(13,21,38,0.94)' : 'rgba(255,255,255,0.94)'),
              border: `1px solid ${pillBorder}`,
              backdropFilter: 'blur(22px) saturate(180%)',
              WebkitBackdropFilter: 'blur(22px) saturate(180%)',
              boxShadow: '0 20px 50px rgba(10, 20, 80, 0.24)',
            }}
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: SANAS_EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-[16px] rounded-2xl"
                      style={{
                        color: onHero || theme === 'dark' ? 'rgba(255,255,255,0.88)' : '#374151',
                        fontWeight: active ? 600 : 500,
                        background: active
                          ? (onHero ? 'rgba(255,255,255,0.1)' : 'rgba(26,56,232,0.08)')
                          : 'transparent',
                        transition: `background 200ms ${SANAS_EASE_CSS}`,
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.a
                href="#demo"
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
                Book Demo
              </motion.a>

              {mounted && (
                <button
                  onClick={() => { toggleTheme(); setMobileOpen(false) }}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-medium mt-2 border-t pt-3"
                  style={{
                    color: onHero || theme === 'dark' ? 'rgba(255,255,255,0.78)' : '#4B5563',
                    borderColor: pillBorder,
                  }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
