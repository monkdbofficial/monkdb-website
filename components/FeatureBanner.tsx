'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

export default function FeatureBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).featureBanner) ?? {}) as Record<string, string>
  const card1Tags = [t.card1Tag1, t.card1Tag2]
  const afterItems = [t.card3Item1, t.card3Item2, t.card3Item3, t.card3Item4]

  return (
    <section
      ref={ref}
      id="features-banner"
      className="py-6 sm:py-10 lg:py-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f3ff 100%)' }}
    >

      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
          style={{ gridAutoRows: 'clamp(260px, 32vw, 460px)', perspective: '1200px' }}
        >

          {/* SVG filter defs reused by Card 1 holographic image and Card 2 wave image */}
          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
            <defs>
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

          {/* ══════════════════════════════
              CARD 1 — AI Solution / AI Services.
              Responsive plain card (no SVG-baked notch). Layout:
              - Brand-blue gradient bg
              - Holographic image fades in on the right (full height)
              - Tags top-right, body text bottom-left, CTA bottom-left
              - Arrow button bottom-right INSIDE the card (no cutout)
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0, ease: 'easeOut' }}
            whileHover={{
              y: -3,
              boxShadow:
                '0 0 0 1.5px rgba(127,179,255,0.5), 0 22px 60px rgba(10,34,128,0.36)',
              transition: { duration: 0.25 },
            }}
            className="relative overflow-hidden min-w-0 rounded-3xl"
            style={{
              background:
                'linear-gradient(165deg, #0033AA 0%, #1538D8 55%, #1E8AFF 100%)',
            }}
          >
            {/* Holographic image — right side, fades into the gradient */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none inset-y-0 right-0"
              style={{
                width: '60%',
                maskImage:
                  'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, #000 60%)',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 25%, #000 60%)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/3d-shapes-glowing-with-bright-holographic-colors 1.svg"
                alt=""
                className="w-full h-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'left center',
                  filter:
                    'url(#card1-blue-tint) brightness(1.4) contrast(1.6) saturate(1.8)',
                }}
              />
            </div>

            {/* Top inner shine */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-[10%] right-[10%]"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />

            {/* Tags — top right */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex flex-wrap justify-end gap-1.5">
              {card1Tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white text-gray-900 text-[10px] sm:text-xs font-medium whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7">
              <div />

              {/* Text — kept on the left half so it never collides with the arrow */}
              <div className="max-w-[78%] sm:max-w-[68%] lg:max-w-[60%]">
                <p
                  className="text-white font-light leading-snug"
                  style={{ fontSize: 'clamp(0.78rem, 1.2vw, 1rem)' }}
                >
                  {t.card1Body}
                </p>
              </div>

              {/* Explore more — bottom left, kept clear of the bottom-right arrow */}
              <div className="flex items-end justify-between gap-3">
                <div style={{ width: 'fit-content' }}>
                  <motion.a
                    href="#about"
                    whileHover={{ x: 3 }}
                    className="text-white text-xs font-light hover:text-white/90 transition-colors"
                  >
                    {t.card1Cta} ↗
                  </motion.a>
                  <div
                    style={{
                      height: '1px',
                      background: 'rgba(255,255,255,0.6)',
                      marginTop: '4px',
                    }}
                  />
                </div>

                {/* Arrow button — inline at bottom-right, sized in fixed px so it
                    looks consistent at every viewport (no aspect-ratio cutout) */}
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={t.card1Cta ?? 'Explore more'}
                  className="flex-shrink-0 inline-flex items-center justify-center"
                  style={{
                    width: 'clamp(40px, 4.4vw, 56px)',
                    height: 'clamp(40px, 4.4vw, 56px)',
                    borderRadius: '14px',
                    background: '#0D2DC0',
                    boxShadow:
                      '0 8px 22px rgba(13,45,192,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                >
                  <ArrowUpRight strokeWidth={2.2} size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════
              CARD 2 — Future Together
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            whileHover={{ y: -3, boxShadow: '0 0 0 1.5px rgba(96,160,255,0.5), 0 20px 60px rgba(80,60,220,0.4)', transition: { duration: 0.25 } }}
            className="relative rounded-3xl overflow-hidden flex flex-col min-w-0"
            style={{
              background: 'linear-gradient(145deg, #0e1fa0 0%, #1530cc 30%, #1e44f0 60%, #2855ff 100%)',
            }}
          >
            {/* Wave SVG — right side decorative element */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/view-futuristic-light-lamp-design 1.svg"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{ right: 0, top: 0, height: '100%', width: 'auto', maxWidth: '70%', objectFit: 'cover', filter: 'url(#card2-wave-tint) brightness(1.1)' }}
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

              <div style={{ maxWidth: '80%' }}>
                <h3 className="text-white leading-tight mb-3 sm:mb-4" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 400 }}>
                  {t.card2Title}
                </h3>
                <p className="text-white/65 leading-relaxed" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
                  {t.card2Body}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-6">
                <div className="flex -space-x-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/80?img=11" alt={t.userAvatarAlt ?? 'User'} width={40} height={40}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[2.5px] border-white object-cover flex-shrink-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://i.pravatar.cc/80?img=33" alt={t.userAvatarAlt ?? 'User'} width={40} height={40}
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
                  <span className="text-white/80 text-xs font-medium">{t.card2Stat}</span>
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
            whileHover={{ y: -3, boxShadow: '0 0 0 1.5px rgba(160,96,255,0.4), 0 20px 60px rgba(100,40,200,0.35)', transition: { duration: 0.25 } }}
            className="relative rounded-3xl overflow-hidden flex flex-col min-w-0 md:col-span-2 xl:col-span-1"
            style={{
              background: 'linear-gradient(145deg, #0e1880 0%, #1230cc 40%, #1a2ae0 70%, #2040ff 100%)',
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
                <h3 className="text-white mb-4 sm:mb-6" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', fontWeight: 400 }}>{t.card3Title}</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {afterItems.map((item, i) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.09, duration: 0.45 }}
                      className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white/80 leading-none flex-shrink-0" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>•</span>
                        <span className="text-white font-medium" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>{item}</span>
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
