'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const trustMarks = [
  'Air-Gapped Ready',
  'SOC 2 Type II',
  'ISO 27001',
  'GDPR',
  'HIPAA',
]

export default function Sovereignty() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const EASE = [0.165, 0.84, 0.44, 1] as const

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
      style={{
        background:
          'radial-gradient(ellipse 80% 80% at 50% 0%, #0A2280 0%, #050D6A 55%, #04082e 100%)',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.45,
        }}
      />

      {/* Soft right halo */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none"
        animate={{ x: [-8, 8, -8], y: [-4, 4, -4] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          right: '-8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,138,255,0.24) 0%, rgba(26,56,232,0.14) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Pulsing decorative orbs (ref: banner-overly.svg #ball-1/2/4) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        animate={{ scale: [1, 0.85, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          top: '18%',
          left: '8%',
          width: 140,
          height: 140,
          background:
            'radial-gradient(circle, rgba(127,179,255,0.35) 0%, rgba(30,138,255,0.18) 45%, transparent 75%)',
          filter: 'blur(30px)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        animate={{ scale: [1, 0.75, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{
          top: '60%',
          left: '22%',
          width: 90,
          height: 90,
          background:
            'radial-gradient(circle, rgba(160,96,255,0.32) 0%, rgba(100,60,220,0.14) 45%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        animate={{ scale: [1, 0.9, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{
          top: '30%',
          right: '30%',
          width: 220,
          height: 220,
          background:
            'radial-gradient(circle, rgba(26,56,232,0.28) 0%, rgba(10,34,128,0.14) 45%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Continuous SVG parallax waves (bottom) — same system as PageBanner ── */}
      <svg
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: '55%', width: '100%' }}
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="sov-wave-path"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          <use href="#sov-wave-path" x="48" y="0" fill="rgba(127,179,255,0.06)" />
          <use href="#sov-wave-path" x="48" y="3" fill="rgba(127,179,255,0.08)" />
          <use href="#sov-wave-path" x="48" y="5" fill="rgba(30,138,255,0.10)" />
          <use href="#sov-wave-path" x="48" y="7" fill="rgba(26,56,232,0.14)" />
          <use href="#sov-wave-path" x="48" y="9" fill="rgba(26,56,232,0.20)" />
          <use href="#sov-wave-path" x="48" y="11" fill="rgba(10,34,128,0.28)" />
        </g>
      </svg>

      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Top row: chapter + eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            03 / SOVEREIGNTY
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.14), transparent)',
            }}
          />
        </motion.div>

        {/* Two-col: headline / body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-white"
            style={{
              fontSize: 'clamp(30px, 4.2vw, 64px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.06,
              textWrap: 'balance',
              maxWidth: '880px',
            }}
          >
            Your complete data sovereignty.
            <br />
            Secure and intact for an AI-first world.
          </motion.h2>

          {/* Supporting column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.65,
                maxWidth: '560px',
              }}
            >
              The existing data infrastructure is excessively cumbersome,
              sluggish, and complex, which makes it unsuitable for constructing
              an AI-native sovereign data plane.
            </p>

            <p
              className="mt-4 text-white"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 500,
                letterSpacing: '-0.005em',
                maxWidth: '560px',
              }}
            >
              MonkDB is prepared.
            </p>
          </motion.div>
        </div>

        {/* Trust marks row */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-14 sm:mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t"
          style={{
            borderColor: 'rgba(255,255,255,0.10)',
            listStyle: 'none',
            padding: '2rem 0 0 0',
            margin: '56px 0 0 0',
          }}
        >
          {trustMarks.map((mark, i) => (
            <motion.li
              key={mark}
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.06,
                ease: EASE,
              }}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.62)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#1E8AFF',
                  boxShadow: '0 0 6px rgba(30,138,255,0.8)',
                  marginRight: '10px',
                  verticalAlign: 'middle',
                }}
              />
              {mark}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
        }}
      />
    </section>
  )
}
