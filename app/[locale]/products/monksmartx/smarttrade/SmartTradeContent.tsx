'use client'

/**
 * Monk SmartTrade — bespoke page for trading and execution systems.
 * Visual identity:
 *   - Magenta-violet accent (#A855F7) on MonkDB navy
 *   - Hero: order book ladder with bid/ask streaming
 *   - Mid-block: signal-to-execution path latency budget
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'
import { useI18n } from '@/i18n/I18nProvider'

// Deeper trading-violet. Replaces candy #A855F7 with an enterprise tone.
const ACCENT = '#7C3AED'

function TradeHero() {
  // Order book ladder
  const asks = [
    { px: 102.84, sz: 1240 },
    { px: 102.83, sz: 880 },
    { px: 102.82, sz: 1980 },
    { px: 102.81, sz: 4220 },
    { px: 102.8, sz: 6840 },
  ]
  const bids = [
    { px: 102.79, sz: 7420 },
    { px: 102.78, sz: 3940 },
    { px: 102.77, sz: 2160 },
    { px: 102.76, sz: 1090 },
    { px: 102.75, sz: 760 },
  ]
  const max = Math.max(
    ...asks.map((a) => a.sz),
    ...bids.map((b) => b.sz),
  )
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(160deg, #1A0F2E 0%, #1F1340 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}55`,
        boxShadow: `0 30px 80px ${ACCENT}33`,
      }}
    >
      <div className="absolute inset-0 grid grid-cols-[1fr_1fr]">
        {/* Asks */}
        <div className="relative p-5 sm:p-7 flex flex-col justify-end gap-1">
          <div
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#C44E4E',
              marginBottom: '8px',
            }}
          >
            Asks
          </div>
          {asks.map((row, i) => (
            <motion.div
              key={`a-${i}`}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="relative flex items-center justify-between"
              style={{
                padding: '6px 10px',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 bottom-0"
                style={{
                  width: `${(row.sz / max) * 100}%`,
                  background:
                    'linear-gradient(90deg, transparent, rgba(196,78,78,0.18))',
                }}
              />
              <span
                className="relative"
                style={{ color: '#C44E4E', fontWeight: 600 }}
              >
                {row.px.toFixed(2)}
              </span>
              <span className="relative">{row.sz.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
        {/* Bids */}
        <div className="relative p-5 sm:p-7 flex flex-col gap-1">
          <div
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#1FA975',
              marginBottom: '8px',
            }}
          >
            Bids
          </div>
          {bids.map((row, i) => (
            <motion.div
              key={`b-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="relative flex items-center justify-between"
              style={{
                padding: '6px 10px',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0"
                style={{
                  width: `${(row.sz / max) * 100}%`,
                  background:
                    'linear-gradient(90deg, rgba(31,169,117,0.18), transparent)',
                }}
              />
              <span
                className="relative"
                style={{ color: '#1FA975', fontWeight: 600 }}
              >
                {row.px.toFixed(2)}
              </span>
              <span className="relative">{row.sz.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Center spread indicator */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '6px 14px',
          borderRadius: '8px',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${ACCENT}66`,
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '11.5px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: ACCENT,
          backdropFilter: 'blur(8px)',
        }}
      >
        SPREAD 0.01
      </div>
    </div>
  )
}

function LatencyBudget() {
  // Latency stages
  const stages = [
    { name: 'Tick ingest', ms: 0.18, color: '#7FB3FF' },
    { name: 'Feature lookup', ms: 0.22, color: '#1E8AFF' },
    { name: 'Vector retrieval', ms: 0.31, color: ACCENT },
    { name: 'Decision logic', ms: 0.16, color: '#C44E4E' },
    { name: 'Order publish', ms: 0.13, color: '#1FA975' },
  ]
  const total = stages.reduce((a, b) => a + b.ms, 0)
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0E1430 0%, #07091A 100%)',
        border: '1px solid rgba(127,179,255,0.18)',
        padding: 'clamp(20px, 2.4vw, 32px)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '14px',
        }}
      >
        <span>Signal to execution · in one engine</span>
        <span style={{ color: ACCENT }}>{total.toFixed(2)} ms total</span>
      </div>
      {/* Stacked horizontal bar */}
      <div
        className="relative rounded-md overflow-hidden mb-5"
        style={{ height: 14, background: 'rgba(127,179,255,0.10)' }}
      >
        {(() => {
          let acc = 0
          return stages.map((st, i) => {
            const left = (acc / total) * 100
            const width = (st.ms / total) * 100
            acc += st.ms
            return (
              <motion.div
                key={st.name}
                initial={{ width: 0 }}
                whileInView={{ width: `${width}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
                className="absolute top-0 bottom-0"
                style={{ left: `${left}%`, background: st.color }}
              />
            )
          })
        })()}
      </div>
      {/* Stage labels */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {stages.map((st) => (
          <div key={st.name} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: '2px',
                background: st.color,
                flexShrink: 0,
                marginTop: 4,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.005em',
                }}
              >
                {st.name}
              </div>
              <div
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {st.ms.toFixed(2)} ms
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SmartTradeContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).monkSmarttrade) ?? {}) as Record<string, string>
  return (
    <SmartXLayout
      crumb={t.crumb ?? 'MonkSmartX'}
      industryLabel="Trading"
      title={t.title ?? 'Monk SmartTrade'}
      subtitle={t.subtitle ?? 'AI-native trading and execution systems.'}
      lead="Market signals, sentiment, and trading data on a continuous engine. Strategies retrain on production state. Fills happen in single-millisecond decision paths."
      heroIllustration={<TradeHero />}
      accent={ACCENT}
      stats={[
        { value: '1.0 ms', label: 'p99 signal-to-fill' },
        { value: '50K+', label: 'Decisions / sec / node' },
        { value: 'Continuous', label: 'Online learning' },
        { value: '0 hops', label: 'Federation' },
      ]}
      midBlock={{
        label: 'Latency budget',
        title: 'From market tick to order publish, in one engine',
        body: <LatencyBudget />,
      }}
      capabilities={[
        {
          iconName: 'layers',
          title: 'Multi-source signal fusion',
          body: 'Market data, news, alternative data, and sentiment in one engine.',
          chip: 'Vector + SQL',
        },
        {
          iconName: 'zap',
          title: 'Low-latency execution',
          body: 'Decision and routing logic next to the data, not over a network hop.',
          chip: '1.0 ms p99',
        },
        {
          iconName: 'shield',
          title: 'Risk-aware strategies',
          body: 'Position, exposure, and risk limits applied per order in real time.',
          chip: 'Per-order limits',
        },
        {
          iconName: 'repeat',
          title: 'Continuous learning',
          body: 'Models retrain on production state without disrupting live trading.',
          chip: 'Online · zero downtime',
        },
      ]}
      flow={[
        {
          iconName: 'chart-line',
          title: 'Tick ingest',
          body: 'Direct feeds, news, and alternative data all stream into the same engine. No broker in between.',
        },
        {
          iconName: 'layers',
          title: 'Hybrid retrieval',
          body: 'Vectors, features, and historical context joined in one query path. Sub-millisecond.',
        },
        {
          iconName: 'target',
          title: 'Decide',
          body: 'Strategy logic runs adjacent to the data, with risk limits applied per order in real time.',
        },
        {
          iconName: 'send',
          title: 'Publish',
          body: 'Orders publish from the same engine. Closed-loop logging back into training data.',
        },
      ]}
      integrations={[
        {
          group: 'Market data',
          tools: ['Bloomberg B-PIPE', 'Refinitiv', 'IEX', 'Polygon'],
        },
        {
          group: 'Execution',
          tools: ['FIX', 'OMS / EMS', 'Smart routers', 'Direct market access'],
        },
        {
          group: 'AI tooling',
          tools: ['HuggingFace', 'PyTorch', 'ONNX runtime', 'Triton'],
        },
      ]}
      proofMetrics={[
        { value: '1.0 ms', label: 'p99 signal-to-fill across the engine' },
        { value: '50K+', label: 'Decisions per second per node' },
        { value: '100%', label: 'Online learning, zero downtime' },
      ]}
      certifications={[
        'Air-gapped ready',
        'On-prem deployment',
        'Self-hosted',
        'Encrypted at rest',
      ]}
      quote={{
        text: 'When the entire decision path lives in one engine, the conversation about latency stops being about glue code and starts being about real strategy.',
        role: 'Head of Trading Systems',
        org: 'Tier-one prop desk',
      }}
      ctaHeading={t.ctaHeading ?? 'Run strategies that improve as markets move.'}
    />
  )
}
