'use client'

/**
 * CTABanner — sanas-style "Sound good?" CTA section.
 * Centered heading + primary button. Simple, clean, professional.
 *
 * Sanas CSS reference: .Cta_main { display: flex; flex-direction: column;
 *   justify-content: center; text-align: center; }
 */

import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { localizedHref } from '@/i18n/config'

const SANAS_EASE = [0.165, 0.84, 0.44, 1] as const

export default function CTABanner({
  heading,
  description,
  buttonText,
  buttonHref,
}: {
  heading?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}) {
  const { dict, locale } = useI18n()
  const t = (((dict as Record<string, unknown>).cta) ?? {}) as Record<string, string>
  const resolvedHeading = heading ?? t.heading ?? 'Ready to get started?'
  const resolvedDescription = description ?? t.description ?? ''
  const resolvedButton = buttonText ?? t.button ?? 'Book a Demo'
  const resolvedHref = buttonHref ?? localizedHref('/company/contact', locale)
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#050D6A',
          backgroundImage: `
            radial-gradient(ellipse 100% 80% at 50% 110%, rgba(26,56,232,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 0%, rgba(30,138,255,0.15) 0%, transparent 50%),
            linear-gradient(180deg, #070D28 0%, #050D6A 100%)
          `,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 flex flex-col items-center text-center">
        <motion.h2
          className="text-white mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: SANAS_EASE }}
          style={{
            fontSize: 'clamp(28px, 4.5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: '800px',
            textWrap: 'balance',
          }}
        >
          {resolvedHeading}
        </motion.h2>

        <motion.p
          className="text-white/60 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: SANAS_EASE }}
          style={{
            fontSize: 'clamp(15px, 1.25vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '560px',
          }}
        >
          {resolvedDescription}
        </motion.p>

        <motion.a
          href={resolvedHref}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: SANAS_EASE }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center"
          style={{
            backgroundColor: '#EDE8D8',
            color: '#0A2280',
            borderRadius: '999px',
            padding: '14px 36px',
            fontWeight: 600,
            fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
            textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
            transition: 'box-shadow 300ms ease',
          }}
        >
          {resolvedButton}
        </motion.a>
      </div>
    </section>
  )
}
