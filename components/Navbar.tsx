'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Resources', href: '/resources' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [onHero, setOnHero] = useState(true)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      // Only show hero style on the home page when near the top
      setOnHero(pathname === '/' && window.scrollY < window.innerHeight * 0.85)
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

  const activeColor = onHero ? '#ffffff' : '#1A38E8'
  const activeBg = onHero ? 'rgba(255,255,255,0.15)' : 'rgba(26,56,232,0.08)'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-[60px] transition-all duration-300"
        style={{
          backgroundColor: onHero ? 'transparent' : (theme === 'dark' ? '#0d1526' : '#ffffff'),
          boxShadow: onHero ? 'none' : '0 1px 12px rgba(0,0,0,0.08)',
          borderBottom: onHero ? 'none' : '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 flex items-center h-full bg-white px-4 sm:px-5 transition-all duration-300"
          style={{ borderBottomRightRadius: '1.5rem' }}
        >
          <Image
            src="/logo.png"
            alt="MonkDB"
            width={130}
            height={36}
            className="h-7 sm:h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => {
            const active = isActive(link.href)
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  className="relative text-[13px] lg:text-[14px] font-medium transition-all duration-200 whitespace-nowrap group px-2 lg:px-3 py-1 inline-block"
                  style={{
                    color: active
                      ? activeColor
                      : onHero
                        ? 'rgba(255,255,255,0.72)'
                        : (theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#6B7280'),
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  <span
                    className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      background: activeColor,
                      opacity: active ? 1 : 0,
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'center',
                    }}
                  />
                  {/* Hover underline (only when not active) */}
                  {!active && (
                    <span
                      className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] w-0 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"
                      style={{ background: onHero ? 'rgba(255,255,255,0.5)' : '#1A38E8' }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Right icons */}
        <motion.div
          className="flex items-center gap-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            aria-label="Search"
            className="transition-colors"
            style={{ color: onHero ? 'rgba(255,255,255,0.8)' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6B7280') }}
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {mounted && (
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="hidden md:block transition-colors"
              style={{ color: onHero ? 'rgba(255,255,255,0.8)' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6B7280') }}
            >
              {theme === 'dark' ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
            </button>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="transition-colors"
            style={{ color: onHero ? 'rgba(255,255,255,0.8)' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6B7280') }}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect width="22" height="2.5" rx="1.25" fill="currentColor" />
                <rect y="6.75" width="22" height="2.5" rx="1.25" fill="currentColor" />
                <rect y="13.5" width="22" height="2.5" rx="1.25" fill="currentColor" />
              </svg>
            )}
          </button>
        </motion.div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[60px] left-0 right-0 z-40 backdrop-blur-md border-t border-white/10"
          style={{ backgroundColor: onHero ? 'rgba(0,51,160,0.95)' : (theme === 'dark' ? 'rgba(13,21,38,0.97)' : 'rgba(255,255,255,0.97)') }}
        >
          <nav className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const active = isActive(link.href)
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-[15px] rounded-lg transition-colors"
                    style={{
                      color: onHero || theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#374151',
                      fontWeight: active ? 600 : 400,
                      background: active
                        ? (onHero ? 'rgba(255,255,255,0.12)' : 'rgba(26,56,232,0.08)')
                        : 'transparent',
                      borderLeft: active ? '2px solid #1A38E8' : '2px solid transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
            {mounted && (
              <button
                onClick={() => { toggleTheme(); setMobileOpen(false) }}
                className="flex items-center gap-2 px-4 py-2.5 text-[15px] font-medium rounded-lg transition-colors mt-1 border-t border-white/10 pt-3"
                style={{ color: onHero || theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#374151' }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            )}
          </nav>
        </motion.div>
      )}
    </>
  )
}
