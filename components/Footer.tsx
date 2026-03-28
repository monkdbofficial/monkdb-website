'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Facebook, Twitter, Youtube, Linkedin, Instagram, ArrowRight } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
]

const menuLinks = ['Home', 'About Us', 'Product', 'Careers']
const supportLinks = ['Company', 'Press Media', 'Go Blog', 'Contact Us', 'Case Study']
const socialTextLinks = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube']

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer id="footer" className="bg-[#0f1623] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Column 1 - Company */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="MonkDB"
                width={130}
                height={36}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="text-xs text-gray-400 mb-4 leading-relaxed">
              <div className="font-semibold text-white mb-1">Movibase Platform PVT. LTD</div>
              <address className="not-italic text-gray-400 text-xs leading-relaxed">
                Branch Roliya Himachal, 78 Wing 12,
                <br />
                Habsiguda Park, Madhavpur,
                <br />
                Hyderabad 500082, Telangana, India
              </address>
            </div>
            <div className="text-xs text-gray-400 space-y-1 mb-5">
              <div>
                <a href="mailto:support@monkdb.com" className="hover:text-white transition-colors">
                  support@monkdb.com
                </a>
              </div>
              <div>
                <a href="https://www.monkdb.com" className="hover:text-white transition-colors">
                  www.monkdb.com
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-egyptian-blue transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Menu */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Menu</h4>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Stay Connected */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Stay Connected</h4>
            <ul className="space-y-2.5">
              {socialTextLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Stay Updated */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Stay Updated</h4>
            <form onSubmit={handleSubscribe} className="mb-5">
              <div className="flex rounded-xl overflow-hidden border border-white/20">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none min-w-0"
                  required
                />
                <button
                  type="submit"
                  className="bg-egyptian-blue px-3 py-2.5 flex items-center justify-center hover:bg-blue-energy transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-xs leading-relaxed">
              MonkDB is an AI-native Unified Database designed to transform data management,
              empowering organizations to harness artificial intelligence from diverse data types.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Movibase Platform PVT. LTD. All rights reserved.
          </p>
          <div className="flex gap-5 text-gray-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
