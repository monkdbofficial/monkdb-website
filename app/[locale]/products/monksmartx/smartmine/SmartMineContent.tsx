'use client'

/**
 * Monk SmartMine — bespoke product page for the mining industry.
 * Visual identity:
 *   - Copper/amber accent (#D97706) on the dark MonkDB navy
 *   - Hero illustration: animated underground "shaft" with sensor nodes
 *     pulsing along the rock face
 *   - Mid-block: Ventilation On Demand dashboard mockup (live air-flow gauges)
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'
import { useI18n } from '@/i18n/I18nProvider'

// Deeper copper for mining. Replaces brighter #D97706 with an enterprise tone.
const ACCENT = '#B45309'

function MineHero() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(180deg, #1A1305 0%, #2A1F0A 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}40`,
        boxShadow: '0 30px 80px rgba(180,83,9,0.18)',
      }}
    >
      {/* Surface horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.4) 22%, transparent 26%, transparent 100%)',
        }}
      />
      {/* Vertical shaft */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: '46%',
          top: '20%',
          width: '8%',
          bottom: '0',
          background:
            'linear-gradient(180deg, rgba(180,83,9,0.18) 0%, rgba(180,83,9,0.05) 100%)',
          borderLeft: '1px dashed rgba(180,83,9,0.4)',
          borderRight: '1px dashed rgba(180,83,9,0.4)',
        }}
      />
      {/* Horizontal galleries */}
      {[0.4, 0.55, 0.7, 0.85].map((y, i) => (
        <div
          key={y}
          aria-hidden="true"
          className="absolute"
          style={{
            top: `${y * 100}%`,
            left: i % 2 === 0 ? '12%' : '52%',
            right: i % 2 === 0 ? '52%' : '12%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(180,83,9,0.4), transparent)',
          }}
        />
      ))}
      {/* Sensor nodes pulsing along shaft */}
      {[
        { x: 50, y: 30 },
        { x: 18, y: 42 },
        { x: 82, y: 56 },
        { x: 26, y: 70 },
        { x: 74, y: 85 },
      ].map((s, i) => (
        <motion.div
          key={`sensor-${i}`}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: ACCENT,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 12px ${ACCENT}`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{
            duration: 2.4,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Surface label */}
      <div
        className="absolute top-4 left-5"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Surface · 0 m
      </div>
      <div
        className="absolute bottom-4 left-5"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: ACCENT,
        }}
      >
        Working face · -1,800 m
      </div>
    </div>
  )
}

function VentilationDashboard() {
  const zones = [
    { name: 'Zone A · Main Stope', flow: 78, status: 'optimal' },
    { name: 'Zone B · Decline', flow: 64, status: 'optimal' },
    { name: 'Zone C · Crusher', flow: 92, status: 'high' },
    { name: 'Zone D · Reserve', flow: 22, status: 'idle' },
  ]
  const statusColor: Record<string, string> = {
    optimal: '#1FA975',
    high: ACCENT,
    idle: 'rgba(127,179,255,0.35)',
  }
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0E1430 0%, #07091A 100%)',
        border: '1px solid rgba(127,179,255,0.18)',
        boxShadow:
          '0 24px 60px rgba(10,34,128,0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'clamp(14px, 1.6vw, 20px) clamp(18px, 2.2vw, 28px)',
          borderBottom: '1px solid rgba(127,179,255,0.10)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Ventilation On Demand · Live
        </span>
        <span
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#1FA975',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#1FA975',
              boxShadow: '0 0 6px #1FA975',
            }}
          />
          Live
        </span>
      </div>

      {/* Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {zones.map((z, i) => (
          <div
            key={z.name}
            style={{
              padding: 'clamp(18px, 2vw, 24px) clamp(20px, 2.4vw, 28px)',
              borderRight:
                i % 2 === 0
                  ? '1px solid rgba(127,179,255,0.08)'
                  : 'none',
              borderBottom:
                i < 2 ? '1px solid rgba(127,179,255,0.08)' : 'none',
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: '12px' }}
            >
              <span
                className="text-white"
                style={{
                  fontSize: 'clamp(13px, 1.05vw, 15px)',
                  fontWeight: 500,
                  letterSpacing: '0.005em',
                }}
              >
                {z.name}
              </span>
              <span
                style={{
                  fontFamily:
                    'var(--font-mono, ui-monospace, monospace)',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: statusColor[z.status],
                }}
              >
                {z.status}
              </span>
            </div>
            {/* Flow bar */}
            <div
              className="relative rounded-full"
              style={{
                height: 8,
                background: 'rgba(127,179,255,0.12)',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${z.flow}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-0 bottom-0 left-0"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}, ${statusColor[z.status]})`,
                }}
              />
            </div>
            <div
              className="flex items-center justify-between mt-2"
              style={{
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '10.5px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <span>Air flow</span>
              <span>{z.flow}% of plan</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SmartMineContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).monkSmartmine) ?? {}) as Record<string, string>
  return (
    <SmartXLayout
      crumb={t.crumb ?? 'MonkSmartX'}
      industryLabel="Mining"
      title={t.title ?? 'Monk SmartMine'}
      subtitle={t.subtitle ?? 'Real-time operational intelligence for mining ecosystems.'}
      lead="Sensor data, equipment telemetry, and environmental signals on a single live data plane. Ventilation-on-demand, predictive maintenance, and safety monitoring run as one continuous loop."
      heroIllustration={<MineHero />}
      accent={ACCENT}
      stats={[
        { value: '38%', label: 'Energy reduction' },
        { value: '-1.8 km', label: 'Working depth covered' },
        { value: '0', label: 'Safety incidents (14 mo)' },
        { value: '24/7', label: 'Continuous monitoring' },
      ]}
      midBlock={{
        label: 'Mock dashboard',
        title: 'Ventilation that follows people and equipment',
        body: <VentilationDashboard />,
      }}
      capabilities={[
        {
          iconName: 'refresh-cw',
          title: 'Ventilation-on-demand',
          body: 'Air flow that follows people and equipment, cutting energy without compromising safety.',
          chip: '38% energy saved',
        },
        {
          iconName: 'wrench',
          title: 'Predictive maintenance',
          body: 'Detect failure modes in haul trucks, conveyors, and crushers before they take a shift down.',
          chip: 'Failure-mode detection',
        },
        {
          iconName: 'shield-alert',
          title: 'Safety monitoring',
          body: 'Live gas, dust, and proximity alerts with policy-driven escalation.',
          chip: 'Live · sub-second alerts',
        },
        {
          iconName: 'gauge',
          title: 'Production optimization',
          body: 'Throughput, grade, and dilution managed continuously against the production plan.',
          chip: 'Continuous · live state',
        },
      ]}
      flow={[
        {
          iconName: 'radio',
          title: 'Sense',
          body: 'Underground gas, dust, and proximity sensors stream into the engine continuously. No staging layer.',
        },
        {
          iconName: 'brain-circuit',
          title: 'Reason',
          body: 'Live state, equipment telemetry, and the production plan reasoned over together inside MonkDB.',
        },
        {
          iconName: 'sliders',
          title: 'Decide',
          body: 'Ventilation setpoints, maintenance triggers, and safety escalations decided per zone in real time.',
        },
        {
          iconName: 'zap',
          title: 'Act',
          body: 'Decisions trigger fan adjustments, alerts, and crew dispatch directly from the engine.',
        },
      ]}
      integrations={[
        {
          group: 'OT and sensors',
          tools: ['OPC UA', 'Modbus', 'MQTT', 'IO-Link'],
        },
        {
          group: 'Operations',
          tools: ['SCADA', 'CMMS', 'GIS / mine plan', 'Fleet telematics'],
        },
        {
          group: 'Cloud and ops',
          tools: ['Kafka', 'S3 / OSS', 'Grafana', 'PagerDuty'],
        },
      ]}
      proofMetrics={[
        { value: '38%', label: 'Energy spend reduction across ventilation' },
        { value: '0', label: 'Reportable safety incidents in 14 months' },
        { value: '14 mo', label: 'Time to ROI on the SmartMine deployment' },
      ]}
      certifications={['Air-gapped ready', 'On-prem deployment', 'Self-hosted', 'Encrypted at rest']}
      quote={{
        text: 'Live air flow that follows people and equipment turned a static system into an adaptive one. The savings paid for the rollout in two quarters.',
        role: 'VP Operations',
        org: 'Top global mining major',
      }}
      ctaHeading={t.ctaHeading ?? 'Run a mine that thinks for itself.'}
    />
  )
}
