'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pillItems = [
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
]

const row2Items = [
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
  { label: 'monkdb', variant: 'outlined' },
  { label: 'monkdb', variant: 'filled' },
]

function Pill({ label, variant }: { label: string; variant: string }) {
  if (variant === 'filled') {
    return (
      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-egyptian-blue text-white font-semibold text-sm font-mono whitespace-nowrap flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-blue-energy inline-block" />
        {label}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-egyptian-blue dark:border-powder-blue text-egyptian-blue dark:text-powder-blue font-semibold text-sm font-mono whitespace-nowrap flex-shrink-0 bg-transparent">
      <span className="w-2 h-2 rounded-full border border-egyptian-blue dark:border-powder-blue inline-block" />
      {label}
    </span>
  )
}

export default function LogoMarquee() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="py-16 bg-white dark:bg-[#111827] overflow-hidden border-y border-gray-100 dark:border-white/5"
    >
      <div className="mb-4 text-center">
        <span className="text-sm font-mono text-gray-400 dark:text-powder-blue/60 tracking-widest uppercase">
          Powered by Movibase Platform
        </span>
      </div>

      {/* Row 1 - left to right */}
      <div className="relative flex overflow-hidden mb-4">
        <div
          className="flex gap-4 animate-marquee"
          style={{ width: 'max-content' }}
        >
          {[...pillItems, ...pillItems].map((item, i) => (
            <Pill key={`row1-${i}`} label={item.label} variant={item.variant} />
          ))}
        </div>
      </div>

      {/* Row 2 - right to left */}
      <div className="relative flex overflow-hidden">
        <div
          className="flex gap-4 animate-marquee-reverse"
          style={{ width: 'max-content' }}
        >
          {[...row2Items, ...row2Items].map((item, i) => (
            <Pill key={`row2-${i}`} label={item.label} variant={item.variant} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
