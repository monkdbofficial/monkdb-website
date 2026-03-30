'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const menuLinks = ['Home', 'About Us', 'Product', 'Architecture', 'Careers']
const supportLinks = ['Company', 'Press Media', 'Our Blog', 'Contact Us', 'Case Study']
const socialTextLinks = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Youtube']

const socialIcons = [
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer id="footer" ref={ref} className="bg-white dark:bg-[#0f1623] section-grid" style={{ borderTop: '1px solid #e5e7eb' }}>
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-10 sm:pt-14 lg:pt-[56px] pb-8 sm:pb-10 lg:pb-[32px]">

        {/* Main grid — responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr] gap-x-8 gap-y-10 lg:gap-x-10 lg:gap-y-0 mb-10 lg:mb-12">

          {/* Col 1 — Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="font-bold text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>
              Movibase Platform PVT. LTD
            </div>
            <address className="not-italic" style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '12px' }}>
              <span style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Wework Raheja Mindspace Building 9, Floor 13 Mindspace IT Park, Madhapur Hyderabad 500081, Telangana India</span>
              </span>
            </address>
            <div style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:support@monkdb.com" className="hover:text-gray-900 transition-colors">support@monkdb.com</a>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                <a href="#" className="hover:text-gray-900 transition-colors">www.monkdb.com</a>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {socialIcons.map(({ label, path }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: 32, height: 32, borderRadius: 8, background: '#1A38E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-bold text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Menu</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
              {menuLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" style={{ fontSize: '0.88rem' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="font-bold text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Support</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" style={{ fontSize: '0.88rem' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Stay Connected */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="font-bold text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Stay Connected</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
              {socialTextLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" style={{ fontSize: '0.88rem' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 5 — Stay Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="font-bold text-gray-900 dark:text-white" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Stay Updated</div>
            <form onSubmit={handleSubscribe} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', outline: 'none', border: 'none', minWidth: 0 }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ background: '#1A38E8', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                >
                  <Send size={14} color="white" />
                </motion.button>
              </div>
            </form>
            <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>
              <strong style={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #0033A0 0%, #1A38E8 50%, #1E8AFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>MonkDB</strong> is an AI-Native Unified Database designed to transform data management, empowering organizations to harness unified intelligence from diverse data types.
            </p>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0"
          style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}
        >
          <p className="text-gray-400" style={{ fontSize: '0.78rem' }}>
            &copy; {new Date().getFullYear()} Movibase Platform PVT. LTD. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-gray-700 transition-colors" style={{ fontSize: '0.78rem' }}>
                {link}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
