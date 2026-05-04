'use client'

/**
 * HubDiagramBanner — full-width feature diagram block for hub pages.
 *
 * Each Part II hub (Core Systems, Solutions, Industries, Learn) gets the
 * official diagram from the docx as a feature element above the card grid.
 * The diagram is the visual anchor — buyers can read the entire architecture
 * at a glance before scrolling into the cards.
 */

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function HubDiagramBanner({
  label,
  src,
  alt,
  width,
  height,
  caption,
  tagline,
}: {
  label: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  tagline?: string
}) {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
      }}
    >
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(30,138,255,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(127,179,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        <SectionLabel text={label} variant="dark" />

        {caption && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-6 sm:mt-8 max-w-3xl"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.65,
              margin: '24px 0 0 0',
            }}
          >
            {caption}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          className="relative mt-10 sm:mt-12 lg:mt-14"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(127,179,255,0.18)',
              background: 'rgba(7,9,26,0.5)',
              boxShadow:
                '0 28px 70px rgba(10,34,128,0.40), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Top inner shine */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-[8%] right-[8%] z-10"
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-auto block"
              priority
            />
          </div>
        </motion.div>

        {tagline && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="text-center mt-8 sm:mt-10"
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 'clamp(11px, 0.95vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7FB3FF',
            }}
          >
            {tagline}
          </motion.p>
        )}
      </div>
    </section>
  )
}
