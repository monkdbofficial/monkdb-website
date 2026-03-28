'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Why Choose Us', href: '#roi' },
  { label: 'Architecture', href: '#competition' },
  { label: 'Resources', href: '#footer' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  // onHero = navbar is still over the blue hero section
  const [onHero, setOnHero] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      // Switch style once user scrolls past ~90% of the viewport height
      setOnHero(window.scrollY < window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center h-[68px] transition-all duration-300"
        style={{
          backgroundColor: onHero ? 'transparent' : (theme === 'dark' ? '#0d1526' : '#ffffff'),
          boxShadow: onHero ? 'none' : '0 1px 12px rgba(0,0,0,0.08)',
          borderBottom: onHero ? 'none' : '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {/* White logo box — always white, top-left, rounded only bottom-right */}
        <a
          href="#"
          className="flex-shrink-0 flex items-center h-full bg-white px-7 transition-all duration-300"
          style={{ borderBottomRightRadius: '1.5rem' }}
        >
          <Image
            src="/logo.png"
            alt="MonkDB"
            width={130}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </a>

        {/* Nav links — centered */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[17px] font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                color: onHero
                  ? 'rgba(255,255,255,0.92)'
                  : (theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#374151'),
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4 px-6">
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

          {/* Hamburger */}
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
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="fixed top-[68px] left-0 right-0 z-40 backdrop-blur-md border-t border-white/10"
          style={{ backgroundColor: onHero ? 'rgba(0,51,160,0.95)' : (theme === 'dark' ? 'rgba(13,21,38,0.97)' : 'rgba(255,255,255,0.97)') }}
        >
          <nav className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-[15px] font-medium rounded-lg transition-colors"
                style={{ color: onHero || theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#374151' }}
              >
                {link.label}
              </a>
            ))}
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
        </div>
      )}
    </>
  )
}
