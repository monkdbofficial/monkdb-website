'use client'

/**
 * AI-Native Sovereign Platform — strategic pillar page.
 *
 * Visual identity: trust-and-control. Conservative palette (deep navy +
 * graphite + gold accent #D4A574). Manifesto-style typography. Vault and
 * trust-boundary visualizations. Compliance prominent.
 *
 * Distinct from:
 *   - SmartX product pages (which are colorful, industry-specific)
 *   - Operational Intelligence pillar (which is kinetic, loop-driven)
 *   - Generic DetailPageLayout (which feels templated)
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  Layers,
  Globe2,
  CheckCircle2,
  Server,
  Cloud,
  Cpu,
  KeyRound,
  Fingerprint,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'

const ACCENT = '#D4A574' // gold / parchment for sovereignty
const EASE = [0.165, 0.84, 0.44, 1] as const

const PILLARS = [
  {
    Icon: Database,
    title: 'Data Sovereignty is Native',
    body: 'All data remains within your infrastructure. Cloud, on-prem, or edge. No forced movement, no external dependency, no compromise.',
  },
  {
    Icon: Cpu,
    title: 'AI Runs Where Data Lives',
    body: 'Intelligence operates directly within MonkDB, ensuring security, performance, and contextual integrity at every layer.',
  },
  {
    Icon: Eye,
    title: 'Full Governance and Control',
    body: 'Define access, enforce policies, and maintain auditability across data and AI workflows. Compliance is the default, not a layer.',
  },
  {
    Icon: Layers,
    title: 'Unified Architecture',
    body: 'Eliminate fragmented stacks. Storage, processing, AI, and execution operate within one trusted system.',
  },
  {
    Icon: Lock,
    title: 'Sovereign by Design',
    body: 'Sovereignty is built into the foundation. Not layered. Not bolted on. Not optional.',
  },
]

const TRUST_FRAMEWORK = [
  {
    Icon: KeyRound,
    title: 'Identity-aware execution',
    body: 'Every query authenticates and authorizes before reading a single byte. RBAC, ABAC, and short-lived tokens at the engine layer.',
  },
  {
    Icon: Fingerprint,
    title: 'End-to-end lineage',
    body: 'Data, transformation, model, and decision tied together in a continuous audit trail. Reproducibility by construction.',
  },
  {
    Icon: Server,
    title: 'Air-gapped deployment',
    body: 'Deployable in fully isolated environments. No required outbound connectivity. No telemetry leakage.',
  },
]

const DEPLOYMENT_TARGETS = [
  {
    Icon: Cloud,
    code: '01',
    label: 'Public cloud',
    body: 'Fully managed across hyperscalers and sovereign cloud regions, with the same engine and policy plane.',
    spec: 'AWS · Azure · GCP · sovereign clouds',
  },
  {
    Icon: Server,
    code: '02',
    label: 'On-premises',
    body: 'Air-gapped, classified, and regulated environments. Bare metal, private cloud, or virtualized estate.',
    spec: 'Bare metal · private cloud · VMware',
  },
  {
    Icon: Cpu,
    code: '03',
    label: 'Edge',
    body: 'Same binary on plant floors, vehicles, field assets, and embedded systems with offline-first execution.',
    spec: 'Plant floor · vehicle · field · embedded',
  },
  {
    Icon: Globe2,
    code: '04',
    label: 'Sovereign region',
    body: 'In-country deployments under data residency law. Custody, audit trail, and key control stay local.',
    spec: 'In-country · regulated · classified',
  },
]

const CERTS = [
  'SOC 2 Type II',
  'ISO 27001',
  'ISO 27701',
  'PCI DSS',
  'HIPAA',
  'GDPR',
  'CCPA',
  'FedRAMP-ready',
  'IEC 62443',
  'Air-gapped',
]

export default function SovereignContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero — manifesto style on deep navy + parchment accent ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        {/* Subtle gold halo */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '10%',
            right: '-15%',
            width: '60%',
            height: '60%',
            background: `radial-gradient(circle, ${ACCENT}25 0%, transparent 65%)`,
            filter: 'blur(70px)',
          }}
        />
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(212,165,116,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.6,
          }}
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: ACCENT,
                }}
              >
                <ShieldCheck size={13} strokeWidth={2} />
                Strategic Pillar · I
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(44px, 6.5vw, 96px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  margin: '0 0 28px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Own Your Data.
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, #ffffff 0%, ${ACCENT} 50%, #ffffff 100%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    animation: 'sovereignSheen 8s ease-in-out infinite',
                    fontWeight: 400,
                  }}
                >
                  Control Your Intelligence.
                </span>
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  width: '64px',
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, ${ACCENT} 0%, #1E8AFF 100%)`,
                  marginBottom: '28px',
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 18px 0',
                  maxWidth: '560px',
                }}
              >
                AI built on your data. Secure, sovereign, and fully under your
                control.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: '520px',
                }}
              >
                The AI-Native Sovereign Platform ensures your data,
                intelligence, and AI operations remain fully within your
                control. No external dependency. No opaque architecture.
              </p>
            </motion.div>

            {/* Vault visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="relative"
              style={{ width: '100%', height: 'min(70vw, 480px)', aspectRatio: '1 / 1', maxWidth: 480, margin: '0 auto' }}
            >
              {/* Outer trust boundary */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed ${ACCENT}55`,
                  animation: 'sovereignSpin 60s linear infinite',
                }}
              />
              <div
                className="absolute"
                style={{
                  inset: '8%',
                  borderRadius: '50%',
                  border: `1px dashed ${ACCENT}33`,
                  animation: 'sovereignSpin 80s linear reverse infinite',
                }}
              />
              {/* Center vault — concentric rings + lock */}
              <div
                className="absolute"
                style={{
                  inset: '20%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(212,165,116,0.18) 0%, rgba(212,165,116,0.06) 100%)',
                  border: `1px solid ${ACCENT}66`,
                  backdropFilter: 'blur(8px)',
                }}
              />
              <div
                className="absolute"
                style={{
                  inset: '32%',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #050D6A 0%, #0A2280 100%)',
                  border: `1px solid ${ACCENT}AA`,
                  boxShadow: `0 0 60px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ACCENT,
                }}
              >
                <Lock size={42} strokeWidth={1.5} />
              </div>
              {/* Pulse ring */}
              <motion.div
                aria-hidden="true"
                className="absolute"
                style={{
                  inset: '32%',
                  borderRadius: '50%',
                  border: `2px solid ${ACCENT}66`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              {/* Compass-point labels */}
              {[
                { angle: 0, label: 'CLOUD' },
                { angle: 90, label: 'EDGE' },
                { angle: 180, label: 'ON-PREM' },
                { angle: 270, label: 'AIR-GAP' },
              ].map((p) => {
                const rad = (p.angle * Math.PI) / 180
                const r = 47
                const x = 50 + Math.cos(rad) * r
                const y = 50 + Math.sin(rad) * r
                return (
                  <div
                    key={p.label}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: ACCENT,
                      padding: '4px 10px',
                      background: 'rgba(7,9,26,0.85)',
                      border: `1px solid ${ACCENT}55`,
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {p.label}
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Five sovereignty pillars — manifesto cards on white ── */}
      <section className="section-grid bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-10 lg:gap-16 items-end mb-8 sm:mb-10">
            <div>
              <SectionLabel text="The five promises" />
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '20px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Sovereignty,{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  by foundation
                </span>
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 self-end"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Most platforms add governance after the fact, behind APIs and
              external auditors. MonkDB makes it the foundation, so every
              query, every model, and every decision inherits it by default.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl flex flex-col card-surface"
                style={{
                  padding: 'clamp(20px, 2.4vw, 28px)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${ACCENT}1A`,
                      border: `1px solid ${ACCENT}55`,
                      color: ACCENT,
                    }}
                  >
                    <p.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: ACCENT,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-[#0A2280] dark:text-white"
                  style={{
                    fontSize: 'clamp(15px, 1.3vw, 18px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 8px 0',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400"
                  style={{
                    fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where data stays — deployment targets ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Where data stays" />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '20px 0 clamp(28px, 3.2vw, 44px) 0',
              maxWidth: 'clamp(560px, 78%, 1080px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            One binary across every trust boundary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DEPLOYMENT_TARGETS.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                className="rounded-2xl relative overflow-hidden flex flex-col card-surface"
              >
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: 'clamp(18px, 1.8vw, 22px) clamp(20px, 2vw, 24px) 0',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${ACCENT}1A`,
                      border: `1px solid ${ACCENT}55`,
                      color: ACCENT,
                    }}
                  >
                    <t.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.45)',
                    }}
                  >
                    {t.code}
                  </span>
                </div>
                <div
                  className="flex-1"
                  style={{
                    padding:
                      'clamp(14px, 1.4vw, 18px) clamp(20px, 2vw, 24px) clamp(14px, 1.4vw, 18px)',
                  }}
                >
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      margin: '0 0 8px 0',
                      lineHeight: 1.25,
                    }}
                  >
                    {t.label}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t.body}
                  </p>
                </div>
                <div
                  style={{
                    padding:
                      'clamp(12px, 1.4vw, 16px) clamp(20px, 2vw, 24px)',
                    borderTop: '1px dashed rgba(10,34,128,0.10)',
                    background: '#FAFBFD',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: ACCENT,
                  }}
                >
                  {t.spec}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust framework — built into the engine ── */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(212,165,116,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="Trust framework" variant="dark" />
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '20px 0 clamp(32px, 3.4vw, 56px) 0',
              maxWidth: 'clamp(560px, 78%, 1080px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            Built into the engine,{' '}
            <span style={{ color: ACCENT, fontWeight: 400 }}>
              not the audit log
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {TRUST_FRAMEWORK.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${ACCENT}33`,
                  padding: 'clamp(24px, 2.6vw, 32px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-xl mb-5"
                  style={{
                    width: 48,
                    height: 48,
                    background: `${ACCENT}25`,
                    border: `1px solid ${ACCENT}66`,
                    color: ACCENT,
                  }}
                >
                  <t.Icon size={22} strokeWidth={1.5} />
                </span>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 12px 0',
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {t.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance + certifications wall ── */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-6 sm:gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel text="Certifications" />
              <h2
                className="text-gray-900 dark:text-white mt-6"
                style={{
                  fontSize: 'clamp(26px, 3.4vw, 44px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  margin: '24px 0 0 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                Audit-grade by{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  default
                </span>
              </h2>
              <p
                className="text-gray-600 dark:text-gray-400 mt-5"
                style={{
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  lineHeight: 1.7,
                  maxWidth: '420px',
                  margin: '20px 0 0 0',
                }}
              >
                Certifications and attestations recognized by regulators,
                customers, and procurement teams across regulated industries.
              </p>
            </div>
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {CERTS.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: EASE,
                  }}
                  className="flex items-center gap-2"
                  style={{
                    padding: '14px 16px',
                    background: '#F8F4F0',
                    border: `1px solid ${ACCENT}40`,
                    borderRadius: '10px',
                    fontFamily:
                      'var(--font-mono, ui-monospace, monospace)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#0A2280',
                  }}
                >
                  <CheckCircle2
                    size={14}
                    strokeWidth={2.2}
                    style={{ color: ACCENT, flexShrink: 0 }}
                  />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Closing manifesto + sovereignty pillars ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: 'clamp(72px, 9vw, 120px)',
                  fontWeight: 700,
                  lineHeight: 0.7,
                  color: `${ACCENT}30`,
                  fontFamily: 'serif',
                  display: 'inline-block',
                  marginBottom: '16px',
                }}
              >
                §
              </span>
              <p
                className="text-[#0A2280] dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 40px)',
                  fontWeight: 300,
                  lineHeight: 1.32,
                  letterSpacing: '-0.012em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                The result is a system where enterprises confidently build and
                scale AI{' '}
                <span style={{ color: ACCENT, fontWeight: 400 }}>
                  without compromising on control, security, or independence
                </span>
                .
              </p>
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {[
                {
                  tag: 'CONTROL',
                  body: 'Identity, policy, and key custody stay inside the trust boundary.',
                },
                {
                  tag: 'SECURITY',
                  body: 'Audit-grade lineage and residency enforced at the engine, not bolted on.',
                },
                {
                  tag: 'INDEPENDENCE',
                  body: 'Same binary across cloud, on-prem, edge, and air-gapped sovereign regions.',
                },
              ].map((stage, i) => (
                <li
                  key={stage.tag}
                  className="rounded-xl flex items-center gap-4 card-surface"
                  style={{
                    padding: 'clamp(14px, 1.6vw, 20px) clamp(16px, 1.8vw, 22px)',
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      background: `${ACCENT}1A`,
                      border: `1px solid ${ACCENT}33`,
                      color: ACCENT,
                      fontFamily:
                        'var(--font-mono, ui-monospace, monospace)',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.16em',
                        color: ACCENT,
                        marginBottom: 2,
                      }}
                    >
                      {stage.tag}
                    </div>
                    <div
                      className="text-gray-700 dark:text-gray-400"
                      style={{
                        fontSize: 'clamp(12.5px, 1vw, 14px)',
                        lineHeight: 1.5,
                      }}
                    >
                      {stage.body}
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <CTABanner heading="Own your data. Control your intelligence." />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        @keyframes sovereignSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sovereignSheen {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
        }
      `}</style>
    </main>
  )
}
