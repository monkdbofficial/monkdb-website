'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'

const afterItems = [
  'Unified multi-modal platform',
  'Reduced infrastructure footprint',
  'Simplified DevOps',
  'Native AI integration',
  'Consolidated licensing',
]

export default function FeatureBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="features-banner"
      className="py-10 sm:py-14 bg-white dark:bg-[#0f1623] overflow-hidden"
    >

      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* ══════════════════════════════
              CARD 1 — Pixel-perfect from Figma node 246:710.
              Background: /card1-bg.svg (exported directly from Figma — exact path + gradient).
              Shape: L-shaped stepped notch at bottom-right, 35px rounded corners.
              Path: M630 245 C...595,280 H545 C...510,315 V365 C...475,400 H35 ... Z
              Gradient: #0033AA (top) → #1E8AFF (bottom), vertical.
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0, ease: 'easeOut' }}
            className="relative"
            style={{ minHeight: 'clamp(320px, 35vw, 420px)' }}
          >
            {/* Exact Figma card shape — transparent notch area shows page background through */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/card1-bg.svg"
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            />

            {/* SVG clip-path definition — card's L-shaped path in objectBoundingBox coords.
                x coords ÷ 630, y coords ÷ 400. Aspect ratio matches card (63:40 = 1.575:1)
                so scaling is uniform and the bezier curves render correctly. */}
            <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
              <defs>
                <clipPath id="card1-shape-clip" clipPathUnits="objectBoundingBox">
                  <path d="M1 0.6125 C1 0.660825 0.974333 0.7 0.944444 0.7 H0.865079 C0.834397 0.7 0.809524 0.739175 0.809524 0.7875 V0.9125 C0.809524 0.960825 0.784651 1 0.753968 1 H0.055556 C0.024873 1 0 0.960825 0 0.9125 V0.0875 C0 0.039175 0.024873 0 0.055556 0 H0.944444 C0.974333 0 1 0.039175 1 0.0875 V0.6125 Z" />
                </clipPath>
                <filter id="card1-blue-tint" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
                  <feColorMatrix type="matrix" values="
                    0.55 0    0    0    0
                    0    0.4  0.25 0    0.12
                    0.1  0.2  0.9  0    0.22
                    0    0    0    1    0
                  "/>
                </filter>
                <filter id="card2-wave-tint" colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
                  <feColorMatrix type="matrix" values="
                    0.08 0    0    0    0.02
                    0.1  0.2  0.1  0    0.18
                    0.4  0.3  0.9  0    0.28
                    0    0    0    1    0
                  "/>
                </filter>
              </defs>
            </svg>

            {/* Holographic SVG — clipped to card shape so notch stays white */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: 'url(#card1-shape-clip)' }}
            >
              <div
                className="absolute pointer-events-none"
                style={{ left: '44%', top: '18%', width: '62%', height: '82%' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/3d-shapes-glowing-with-bright-holographic-colors 1.svg"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: '20% center',
                    filter: 'url(#card1-blue-tint) brightness(1.4) contrast(1.6) saturate(1.8)',
                  }}
                />
              </div>
            </div>

            {/* Tags — absolutely positioned top right */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex gap-1.5 sm:gap-2">
              {['Ai Solution', 'Ai Services'].map((tag) => (
                <span key={tag} className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-gray-900 text-[10px] sm:text-xs font-medium whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>

            {/* Content — vertically centered */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6">
              {/* Spacer to push content down from top */}
              <div />

              {/* Heading — centered vertically */}
              <div style={{ maxWidth: '60%' }}>
                <p className="text-white font-light leading-snug" style={{ fontSize: 'clamp(0.75rem, 2vw, 1.6rem)' }}>
                  At MonkDB, our journey is deeply personal — born from decades of experience in
                  enterprise systems, data management, and AI.
                </p>
              </div>

              {/* Explore more — bottom left */}
              <div style={{ width: 'fit-content' }}>
                <motion.a
                  href="#about"
                  whileHover={{ x: 3 }}
                  className="text-white text-xs font-light hover:text-white/90 transition-colors"
                >
                  Explore more ↗
                </motion.a>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.6)', marginTop: '4px' }} />
              </div>
            </div>

            {/* Arrow button — flush at bottom-right corner.
                The L-shaped notch (transparent) naturally shows the page background
                above and to the left of the button, creating the white gap in Image #3.
                Width ~13% so the button fills most of the notch's lower rect. */}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-0 right-0 flex items-center justify-center"
              style={{
                width: '15%',
                aspectRatio: '1 / 1',
                borderRadius: '32px',
                background: '#0D2DC0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <ArrowUpRight className="text-white w-[40%] h-[40%]" />
            </motion.button>
          </motion.div>

          {/* ══════════════════════════════
              CARD 2 — Future Together
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            whileHover={{ boxShadow: '0 0 0 1.5px rgba(30,138,255,0.5), 0 16px 48px rgba(26,56,232,0.3)', transition: { duration: 0.25 } }}
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(145deg, #1230CC 0%, #1540E0 35%, #1A50F0 65%, #2060FF 100%)',
              minHeight: 'clamp(320px, 35vw, 420px)',
            }}
          >
            {/* Wave SVG — right side decorative element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/view-futuristic-light-lamp-design 1.svg"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{ right: 0, top: 0, height: '100%', width: 'auto', filter: 'url(#card2-wave-tint) brightness(1.1)' }}
            />

            {/* White arrow button — top right */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white"
              >
                <ArrowUpRight size={18} className="text-blue-700" />
              </motion.button>
            </div>

            <div className="relative z-10 p-5 sm:p-7 flex flex-col h-full justify-between">
              {/* Spacer — matches Card 1 layout rhythm */}
              <div />

              <div style={{ maxWidth: '75%' }}>
                <h3 className="text-white font-semibold leading-tight mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)' }}>
                  Let&apos;s Build the Future of Data Infrastructure—Together
                </h3>
                <p className="text-white/65 leading-relaxed" style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>
                  At MonkDB, our journey is deeply personal — born from decades of experience in
                  enterprise systems, data management, and AI.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-6">
                <div className="flex -space-x-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/80?img=11" alt="User" width={40} height={40}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[2.5px] border-white object-cover flex-shrink-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/80?img=33" alt="User" width={40} height={40}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[2.5px] border-white object-cover flex-shrink-0" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/80 text-xs font-medium">20K+ Live Users</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════
              CARD 3 — After MonkDB
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: '#1230CC',
              minHeight: 'clamp(320px, 35vw, 420px)',
            }}
          >
            {/* Dot grid — animated drift */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
                animation: 'grid-drift 8s linear infinite',
              }} />

            <div className="relative z-10 p-5 sm:p-7 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-white font-bold mb-4 sm:mb-6" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)' }}>After MonkDB</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {afterItems.map((item, i) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.09, duration: 0.45 }}
                      className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white/80 leading-none flex-shrink-0" style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>•</span>
                        <span className="text-white font-medium" style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1rem)' }}>{item}</span>
                      </div>
                      <div className="flex gap-[5px] flex-shrink-0 ml-3">
                        {[0, 1, 2, 3].map((d) => (
                          <span key={d} className="w-[4px] h-[4px] rounded-full bg-white/30 inline-block" />
                        ))}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end mt-4 sm:mt-5">
                <motion.button whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Clock size={17} className="text-white/90" />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
