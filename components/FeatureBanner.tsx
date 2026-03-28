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
      className="py-10 bg-white dark:bg-[#0f1623]"
    >

      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
            style={{ aspectRatio: '63 / 40' }}
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

            {/* Content — constrained to not overlap the notch area */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
              {/* Tags — top right */}
              <div className="flex justify-end gap-2">
                {['Ai Solution', 'Ai Services'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white text-gray-900 text-xs font-medium whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Heading — left 60% */}
              <div style={{ maxWidth: '60%' }}>
                <p className="text-white font-light leading-snug" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}>
                  At MonkDB, our journey is deeply personal — born from decades of experience in
                  enterprise systems, data management, and AI.
                </p>
              </div>

              {/* Explore more — bottom left, underline matches text width */}
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
              <ArrowUpRight size={34} className="text-white" />
            </motion.button>
          </motion.div>

          {/* ══════════════════════════════
              CARD 2 — Future Together
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col"
            style={{
              background: 'linear-gradient(148deg, #1248d8 0%, #1a58ef 30%, #2274ff 55%, #4494ff 80%, #60aaff 100%)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 72% 58%, rgba(200,230,255,0.38) 0%, rgba(130,190,255,0.18) 40%, transparent 68%)',
              }} />

            <svg className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 420 340" preserveAspectRatio="xMidYMid slice" fill="none">
              <path d="M -20 310 C 80 240 180 150 300 95 C 360 68 415 75 465 50"
                stroke="rgba(220,240,255,0.55)" strokeWidth="1.5" strokeLinecap="round"
                style={{ filter: 'blur(0.8px)' }} />
              <path d="M -20 310 C 80 240 180 150 300 95 C 360 68 415 75 465 50"
                stroke="rgba(180,220,255,0.22)" strokeWidth="32" strokeLinecap="round"
                style={{ filter: 'blur(20px)' }} />
              <path d="M -20 370 C 90 298 195 200 320 150 C 378 125 428 133 478 108"
                stroke="rgba(200,232,255,0.40)" strokeWidth="1.2" strokeLinecap="round"
                style={{ filter: 'blur(0.6px)' }} />
              <path d="M -20 370 C 90 298 195 200 320 150 C 378 125 428 133 478 108"
                stroke="rgba(160,210,255,0.16)" strokeWidth="24" strokeLinecap="round"
                style={{ filter: 'blur(14px)' }} />
              <path d="M 110 395 C 205 322 292 240 402 202 C 445 186 468 192 498 177"
                stroke="rgba(210,238,255,0.28)" strokeWidth="0.8" strokeLinecap="round"
                style={{ filter: 'blur(0.5px)' }} />
            </svg>

            <div className="absolute top-5 right-5 z-10">
              <motion.button whileHover={{ scale: 1.1 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.30)', backdropFilter: 'blur(6px)' }}>
                <ArrowUpRight size={15} className="text-white" />
              </motion.button>
            </div>

            <div className="relative z-10 p-7 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-white font-bold text-[1.3rem] leading-snug mb-3 max-w-[270px]">
                  Let&apos;s Build the Future of Data Infrastructure—Together
                </h3>
                <p className="text-white/65 text-sm leading-relaxed max-w-[280px]">
                  At MonkDB, our journey is deeply personal — born from decades of experience in
                  enterprise systems, data management, and AI.
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2.5">
                  {[
                    { bg: '#3a6fd8', skin: '#d4956a', hair: '#2c1a10' },
                    { bg: '#5588e0', skin: '#e8b89a', hair: '#4a3020' },
                  ].map((av, i) => (
                    <div key={i}
                      className="w-10 h-10 rounded-full border-[2.5px] border-white overflow-hidden flex-shrink-0"
                      style={{ background: av.bg }}>
                      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                        <ellipse cx="20" cy="15" rx="8" ry="8.5" fill={av.skin} />
                        <path d="M12 13 C12 5 28 5 28 13 C28 10 24 8 20 8 C16 8 12 10 12 13 Z" fill={av.hair} />
                        <rect x="12" y="11" width="2" height="5" rx="1" fill={av.hair} />
                        <rect x="26" y="11" width="2" height="5" rx="1" fill={av.hair} />
                        <ellipse cx="16.5" cy="15" rx="1.3" ry="1.4" fill="#2c1a10" />
                        <ellipse cx="23.5" cy="15" rx="1.3" ry="1.4" fill="#2c1a10" />
                        <ellipse cx="16" cy="14.5" rx="0.5" ry="0.5" fill="rgba(255,255,255,0.6)" />
                        <ellipse cx="23" cy="14.5" rx="0.5" ry="0.5" fill="rgba(255,255,255,0.6)" />
                        <path d="M17 21.5 Q20 23.5 23 21.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeLinecap="round" fill="none" />
                        <rect x="18" y="23" width="4" height="4" rx="1" fill={av.skin} />
                        <ellipse cx="20" cy="36" rx="14" ry="8" fill={av.bg} />
                        <path d="M16 27 L20 30 L24 27" fill={i === 0 ? '#1a40b0' : '#1a4db8'} />
                      </svg>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3.5 h-3.5 fill-yellow-300" viewBox="0 0 24 24">
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
            className="relative rounded-3xl overflow-hidden min-h-[360px] flex flex-col"
            style={{ background: '#0033A0' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 110% 50%, rgba(30,138,255,0.25) 0%, transparent 50%)' }} />

            <div className="relative z-10 p-7 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-5">After MonkDB</h3>
                <ul className="space-y-3.5">
                  {afterItems.map((item, i) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.09, duration: 0.45 }}
                      className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </div>
                      <div className="flex gap-[4px] flex-shrink-0 ml-3">
                        {[0, 1, 2, 3].map((d) => (
                          <span key={d} className="w-[3.5px] h-[3.5px] rounded-full bg-white/25 inline-block" />
                        ))}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end mt-5">
                <motion.button whileHover={{ scale: 1.1, rotate: 12 }}
                  className="w-11 h-11 rounded-full border border-white/25 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Clock size={17} className="text-white/75" />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
