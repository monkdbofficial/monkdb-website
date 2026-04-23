'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import MonkDBFeature from './MonkDBFeature'

const pillars = [
  {
    n: '01',
    title: 'Keep AI ecosystems grounded in continuous data context',
    body: 'Enable AI systems to operate with always-on context by connecting them to data across systems, environments, and formats. MonkDB brings together streams, databases, applications, and models into a unified and secure data layer for enterprise-scale AI.',
  },
  {
    n: '02',
    title: 'Control every action with built-in governance',
    body: 'Establish guardrails across all agent workflows with integrated identity, access control, and policy enforcement. MonkDB ensures that every agent action is authorized and compliant before it is executed.',
  },
  {
    n: '03',
    title: 'Power AI ecosystems and agents with seamless data access',
    body: 'Give AI systems and agents the ability to access both real-time and historical data through a unified query experience. MonkDB allows them to fetch exactly what they need, whether it\'s a live event or long-term data patterns.',
  },
  {
    n: '04',
    title: 'Gain full visibility into AI ecosystem behavior',
    body: 'Track every interaction and data movement with complete transparency. MonkDB provides end-to-end observability, so you can audit decisions, troubleshoot issues, and replay workflows with full historical context.',
  },
]

const EASE = [0.165, 0.84, 0.44, 1] as const

export default function ArchitecturePillars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-[#0f1623] py-12 sm:py-20 lg:py-28"
    >
      <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
        {/* Section chapter line */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-4 mb-6 sm:mb-10 lg:mb-14"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: '#1A38E8',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            05 / Architecture
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
            }}
          />
        </motion.div>

        {/* Editorial two-col intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 lg:gap-16 items-start mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              textWrap: 'balance',
            }}
          >
            An AI-native sovereign data plane,
            <br />
            from streams to governance.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="text-gray-600 dark:text-gray-300"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.65,
              maxWidth: '560px',
            }}
          >
            Four capabilities that together form the backbone of an
            AI-native data plane, designed to be operationally simple,
            governed by default, and always grounded in real-time context.
          </motion.p>
        </div>

        {/* Architecture diagram — light enterprise panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden mb-10 sm:mb-16 lg:mb-20"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(10,34,128,0.08)',
            padding: 'clamp(16px, 3vw, 48px)',
            boxShadow:
              '0 12px 36px rgba(10,20,80,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <div className="relative z-10">
            {/* Diagram label */}
            <div className="flex items-center gap-3 mb-5 sm:mb-8">
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1A38E8',
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="sm:hidden">Diagram · Architecture</span>
                <span className="hidden sm:inline">Diagram · Optimized Architecture for Seamless Data Flow</span>
              </span>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background:
                    'linear-gradient(90deg, rgba(10,34,128,0.18), transparent)',
                }}
              />
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: '#6B7280',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981',
                    boxShadow: '0 0 6px rgba(16,185,129,0.55)',
                  }}
                />
                LIVE
              </span>
            </div>

            <MonkDBFeature />
          </div>
        </motion.div>


        {/* Numbered editorial rows */}
        <ul
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
          className="border-t"
        >
          {pillars.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: EASE,
              }}
              className="group border-b"
              style={{
                borderColor:
                  'var(--arch-row-border, rgba(10,34,128,0.09))',
              }}
            >
              <a
                href="#"
                className="relative grid grid-cols-[48px_1fr] md:grid-cols-[80px_1.1fr_1fr_40px] items-start gap-x-4 sm:gap-x-6 lg:gap-x-10 py-6 sm:py-9 lg:py-12"
                style={{
                  textDecoration: 'none',
                  transition: 'padding 260ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '12px'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.paddingLeft = '0px'
                }}
              >
                {/* Hover accent line — slides in from left */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 pointer-events-none"
                  style={{
                    width: '2px',
                    background: '#1A38E8',
                    transform: 'scaleY(0)',
                    transformOrigin: 'center',
                    transition:
                      'transform 260ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  ref={(el) => {
                    if (!el) return
                    const row = el.parentElement
                    if (!row) return
                    const on = () => {
                      el.style.transform = 'scaleY(1)'
                    }
                    const off = () => {
                      el.style.transform = 'scaleY(0)'
                    }
                    row.addEventListener('mouseenter', on)
                    row.addEventListener('mouseleave', off)
                  }}
                />

                {/* Number */}
                <span
                  className="text-gray-400 dark:text-gray-500"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    paddingTop: '6px',
                  }}
                >
                  {p.n}
                </span>

                {/* Title + body wrapped together on mobile so they stack in
                    column 2 under the number. On md+ `contents` flattens the
                    wrapper so title and body each become their own grid cell. */}
                <div className="md:contents">
                  <h3
                    className="text-gray-900 dark:text-white"
                    style={{
                      fontSize: 'clamp(20px, 2.2vw, 32px)',
                      fontWeight: 300,
                      letterSpacing: '-0.015em',
                      lineHeight: 1.18,
                      textWrap: 'balance',
                    }}
                  >
                    {p.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-gray-600 dark:text-gray-300 mt-3 md:mt-0 md:pt-1.5"
                    style={{
                      fontSize: 'clamp(14px, 1.05vw, 15.5px)',
                      lineHeight: 1.65,
                    }}
                  >
                    {p.body}
                  </p>
                </div>

                {/* Arrow — far right, desktop only */}
                <span
                  aria-hidden="true"
                  className="hidden md:flex items-center justify-end text-gray-400 dark:text-gray-500"
                  style={{
                    paddingTop: '6px',
                    transition:
                      'color 220ms cubic-bezier(0.165, 0.84, 0.44, 1), transform 220ms cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  ref={(el) => {
                    if (!el) return
                    const row = el.parentElement
                    if (!row) return
                    const on = () => {
                      el.style.color = '#1A38E8'
                      el.style.transform = 'translate(4px, -4px)'
                    }
                    const off = () => {
                      el.style.color = ''
                      el.style.transform = 'translate(0, 0)'
                    }
                    row.addEventListener('mouseenter', on)
                    row.addEventListener('mouseleave', off)
                  }}
                >
                  <ArrowUpRight size={22} strokeWidth={1.6} />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
