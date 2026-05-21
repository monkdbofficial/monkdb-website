'use client'

/**
 * Monk SmartFinance — bespoke page for BFSI / capital markets.
 * Visual identity:
 *   - Emerald-gold accent (#10B981) on MonkDB navy
 *   - Hero: candlestick + risk score line chart over a market backdrop
 *   - Mid-block: real-time fraud-detection scoring stream
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'

// Deeper finance-emerald. Replaces the candy #10B981.
const ACCENT = '#0E8F66'

function FinanceHero() {
  // Procedurally render a candlestick chart + a moving risk-score line
  const candles = [
    { x: 8, h: 30, body: 18, dir: 'up' },
    { x: 16, h: 38, body: 22, dir: 'down' },
    { x: 24, h: 42, body: 28, dir: 'up' },
    { x: 32, h: 50, body: 34, dir: 'up' },
    { x: 40, h: 44, body: 26, dir: 'down' },
    { x: 48, h: 56, body: 38, dir: 'up' },
    { x: 56, h: 62, body: 42, dir: 'up' },
    { x: 64, h: 60, body: 36, dir: 'down' },
    { x: 72, h: 70, body: 48, dir: 'up' },
    { x: 80, h: 76, body: 54, dir: 'up' },
    { x: 88, h: 72, body: 46, dir: 'down' },
  ]
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(160deg, #03251A 0%, #052E22 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}40`,
        boxShadow: `0 30px 80px ${ACCENT}22`,
      }}
    >
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* faint grid */}
        {[15, 30, 45, 60].map((y) => (
          <line
            key={y}
            x1="2"
            y1={y}
            x2="98"
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.3"
            strokeDasharray="0.6 1.2"
          />
        ))}
        {/* candlesticks */}
        {candles.map((c, i) => {
          const fill = c.dir === 'up' ? ACCENT : '#C44E4E'
          const yTop = 70 - c.h
          const yBodyTop = 70 - c.body
          return (
            <g key={i}>
              <line
                x1={c.x}
                y1={yTop}
                x2={c.x}
                y2={70 - c.h * 0.3}
                stroke={fill}
                strokeWidth="0.5"
              />
              <motion.rect
                initial={{ scaleY: 0, transformOrigin: 'bottom' }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                x={c.x - 1.4}
                y={yBodyTop}
                width={2.8}
                height={c.body * 0.45}
                fill={fill}
                style={{ transformOrigin: `${c.x}px 70px` }}
              />
            </g>
          )
        })}
        {/* Risk-score line */}
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
          d="M2 50 L12 48 L24 38 L36 42 L48 30 L60 22 L72 28 L84 20 L96 14"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Endpoint */}
        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 1.8 }}
          cx="96"
          cy="14"
          r="1.4"
          fill={ACCENT}
        />
      </svg>
      {/* Top labels */}
      <div
        className="absolute top-4 left-5"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Live · 09:32 GMT · risk + price
      </div>
      <div
        className="absolute bottom-4 left-5 right-5 flex items-center justify-between"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <span>09:00</span>
        <span>09:15</span>
        <span>09:30</span>
        <span>NOW</span>
      </div>
    </div>
  )
}

function FraudStream() {
  const events = [
    { ts: '09:32:14.022', amt: '$12,840.50', score: 0.04, action: 'allow' },
    { ts: '09:32:14.105', amt: '$2,400.00', score: 0.12, action: 'allow' },
    { ts: '09:32:14.187', amt: '$98,500.00', score: 0.91, action: 'block' },
    { ts: '09:32:14.249', amt: '$540.00', score: 0.06, action: 'allow' },
    { ts: '09:32:14.318', amt: '$32,100.00', score: 0.62, action: 'review' },
    { ts: '09:32:14.402', amt: '$1,890.00', score: 0.18, action: 'allow' },
    { ts: '09:32:14.487', amt: '$240,000.00', score: 0.97, action: 'block' },
    { ts: '09:32:14.555', amt: '$75.40', score: 0.02, action: 'allow' },
  ]
  const actionColor: Record<string, string> = {
    allow: '#1FA975',
    review: '#FBBF24',
    block: '#C44E4E',
  }
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0E1430 0%, #07091A 100%)',
        border: '1px solid rgba(127,179,255,0.18)',
        boxShadow: '0 24px 60px rgba(10,34,128,0.28)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'clamp(12px, 1.4vw, 16px) clamp(18px, 2.2vw, 28px)',
          borderBottom: '1px solid rgba(127,179,255,0.12)',
          background: 'rgba(255,255,255,0.02)',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <span>Fraud detection · stream</span>
        <span style={{ color: '#1FA975' }}>p99 4.2 ms</span>
      </div>
      {events.map((e, i) => (
        <motion.div
          key={e.ts}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.32, delay: i * 0.05 }}
          className="grid grid-cols-[160px_1fr_140px_100px] items-center"
          style={{
            padding: 'clamp(11px, 1.3vw, 14px) clamp(18px, 2.2vw, 28px)',
            borderBottom:
              i < events.length - 1
                ? '1px solid rgba(127,179,255,0.06)'
                : 'none',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{e.ts}</span>
          <span style={{ color: 'white', fontWeight: 600 }}>{e.amt}</span>
          <div className="flex items-center gap-2">
            <div
              className="relative rounded-full overflow-hidden flex-1 max-w-[90px]"
              style={{
                height: 5,
                background: 'rgba(127,179,255,0.12)',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${e.score * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                className="absolute top-0 bottom-0 left-0"
                style={{ background: actionColor[e.action] }}
              />
            </div>
            <span
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10.5px' }}
            >
              {e.score.toFixed(2)}
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: actionColor[e.action],
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: actionColor[e.action],
              }}
            />
            {e.action}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default function SmartFinanceContent() {
  return (
    <SmartXLayout
      crumb="MonkSmartX"
      industryLabel="BFSI · Capital Markets"
      title="Monk SmartFinance"
      subtitle="Real-time financial intelligence and risk management."
      lead="Transactional, behavioural, and market data unified on one engine. Score every event in line, govern every decision, and act before the transaction settles."
      heroIllustration={<FinanceHero />}
      accent={ACCENT}
      stats={[
        { value: '4.2 ms', label: 'p99 fraud score' },
        { value: '$120M+', label: 'Loss prevention / yr' },
        { value: '99.99%', label: 'Audit traceability' },
        { value: '0', label: 'Pipeline glue code' },
      ]}
      midBlock={{
        label: 'Streaming detection',
        title: 'Score every transaction in line',
        body: <FraudStream />,
      }}
      capabilities={[
        {
          iconName: 'shield-alert',
          title: 'Fraud detection',
          body: 'Score every transaction against models and rules in line.',
          chip: 'p99 4.2 ms',
        },
        {
          iconName: 'sliders',
          title: 'Real-time risk scoring',
          body: 'Customer, counterparty, and portfolio risk recomputed continuously.',
          chip: 'Continuous · per fill',
        },
        {
          iconName: 'shield-check',
          title: 'Compliance monitoring',
          body: 'AML, KYC, and policy violations flagged as they happen.',
          chip: 'AML · KYC · policy',
        },
        {
          iconName: 'file-check',
          title: 'Audit-grade lineage',
          body: 'Every decision is traceable to the data and model version that produced it.',
          chip: '99.99% auditable',
        },
      ]}
      flow={[
        {
          iconName: 'radio',
          title: 'Capture',
          body: 'Card, ACH, wire, and behavioural events streamed in line. Order and market data on the same plane.',
        },
        {
          iconName: 'layers',
          title: 'Score',
          body: 'Hybrid retrieval against vectors, rules, and historical state. Every event scored as it lands.',
        },
        {
          iconName: 'shield-alert',
          title: 'Decide',
          body: 'Allow, hold, escalate, or block decided in line, before the transaction or order settles.',
        },
        {
          iconName: 'file-check',
          title: 'Audit',
          body: 'Every decision is reproducible end-to-end. Lineage tied to the data and model that produced it.',
        },
      ]}
      integrations={[
        {
          group: 'Core systems',
          tools: ['Core banking', 'Card switches', 'ACH / RTP', 'Custody / OMS'],
        },
        {
          group: 'Risk and AML',
          tools: ['Sanctions feeds', 'KYC providers', 'Bureau scores', 'Watchlists'],
        },
        {
          group: 'Cloud and observability',
          tools: ['Kafka', 'Snowflake', 'Splunk', 'Grafana'],
        },
      ]}
      proofMetrics={[
        { value: '$120M+', label: 'Year-one fraud loss prevention' },
        { value: '4.2 ms', label: 'p99 score-to-decision latency' },
        { value: '99.99%', label: 'Audit traceability across decisions' },
      ]}
      certifications={[
        'SOC 2 Type II',
        'PCI DSS',
        'ISO 27001',
        'ISO 27701',
        'GDPR',
        'FFIEC',
      ]}
      quote={{
        text: 'MonkDB collapsed our fraud stack from five systems to one. The engineering surface shrank, and decisions land before settlement.',
        role: 'Chief Technology Officer',
        org: 'Top-10 global bank',
      }}
      ctaHeading="Decide before the transaction settles."
    />
  )
}
