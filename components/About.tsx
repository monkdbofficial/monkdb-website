'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-white dark:bg-[#0f1623] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block text-egyptian-blue font-mono text-sm font-semibold mb-4 border border-egyptian-blue/30 rounded px-2 py-0.5 bg-egyptian-blue/5">
              [About]
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              What Makes MonkDB The Best Choice For Your Enterprise
            </h2>

            {/* Big stat */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-7xl font-bold text-egyptian-blue leading-none">270k</span>
              <span className="text-gray-600 dark:text-powder-blue text-lg font-medium leading-tight max-w-[140px]">
                AI Solution for our clients
              </span>
            </div>

            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-egyptian-blue text-white font-semibold text-sm hover:bg-egyptian-blue/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore more
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-oxford-navy/50 border border-gray-100 dark:border-white/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                A Journey Born From Experience
              </h3>
              <p className="text-gray-600 dark:text-powder-blue leading-relaxed">
                At Movibase, our journey is deeply personal — born from decades of experience in
                enterprise systems, data management, and AI. We&apos;ve seen first-hand how
                organizations struggle with fragmented data infrastructure: teams maintaining dozens
                of specialized databases, pipelines breaking under the weight of complexity, and AI
                initiatives stalling because the data layer simply isn&apos;t ready.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-oxford-navy/50 border border-gray-100 dark:border-white/10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                The MonkDB Vision
              </h3>
              <p className="text-gray-600 dark:text-powder-blue leading-relaxed">
                MonkDB was built as an answer to this challenge — a unified AI-native database
                platform that consolidates vector, time-series, geospatial, document, blob,
                full-text search, and streaming SQL capabilities under one roof. No more tech
                sprawl. No more siloed data. Just a single, powerful, enterprise-grade database
                designed to power the AI era.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Years Experience', value: '10+' },
                { label: 'Data Modalities', value: '7+' },
                { label: 'Deployments', value: '500+' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-egyptian-blue/5 dark:bg-white/5 border border-egyptian-blue/10 dark:border-white/10"
                >
                  <div className="text-2xl font-bold text-egyptian-blue dark:text-blue-energy">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-powder-blue mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
