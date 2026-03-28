'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

const beforeItems = [
  'Multiple specialized databases',
  'Complex data pipelines',
  'Higher licensing costs',
  'Increased DevOps overhead',
  'Fragmented AI integration',
]

const afterItems = [
  'Unified multi-modal platform',
  'Reduced infrastructure footprint',
  'Simplified DevOps',
  'Native AI integration',
  'Consolidated licensing',
]

export default function ROI() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="roi"
      ref={ref}
      className="py-24 bg-white dark:bg-[#111827] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:pr-8"
          >
            <span className="inline-block text-egyptian-blue dark:text-blue-energy font-mono text-sm font-semibold mb-4 tracking-wider uppercase">
              Business Impact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-egyptian-blue dark:text-white leading-tight">
              Return on Investment with MonkDB
            </h2>
            <p className="mt-6 text-gray-600 dark:text-powder-blue leading-relaxed">
              Consolidating your data infrastructure onto MonkDB delivers measurable ROI from day
              one — fewer vendors, simpler architecture, faster AI delivery.
            </p>

            {/* Arrow visual */}
            <div className="hidden lg:flex items-center gap-3 mt-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-egyptian-blue/40" />
              <div className="w-8 h-8 rounded-full bg-egyptian-blue flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Middle card: Before (Key Differentiators / Pain Points) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-parchment dark:bg-[#1a2535] border border-gray-200 dark:border-white/10 rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <X size={16} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Differentiators</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-powder-blue mb-5">Without MonkDB, enterprises face:</p>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                    <X size={11} className="text-red-500" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
              <div className="text-xs text-gray-400 dark:text-powder-blue/60">
                Average enterprises maintain 5-12 separate database systems for these workloads.
              </div>
            </div>
          </motion.div>

          {/* Right card: After MonkDB */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-oxford-navy rounded-2xl p-7 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold">After MonkDB</h3>
            </div>
            <p className="text-sm text-powder-blue mb-5">MonkDB transforms your data stack:</p>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={11} className="text-green-400" />
                  </div>
                  <span className="text-sm text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-xs text-powder-blue/80">
                Customers report up to 60% reduction in data infrastructure costs after migrating
                to MonkDB.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
