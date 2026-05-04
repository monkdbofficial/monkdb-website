'use client'

/**
 * Monk SmartManufacturing — bespoke page for manufacturing.
 * Visual identity:
 *   - Steel-blue accent (#0EA5E9) on MonkDB navy
 *   - Hero: production-line conveyor with stages and a moving piece
 *   - Mid-block: OEE / yield breakdown chart by line
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'

const ACCENT = '#0EA5E9'

function ManufacturingHero() {
  const stages = [
    { x: 12, name: 'INTAKE' },
    { x: 32, name: 'CUT' },
    { x: 52, name: 'WELD' },
    { x: 72, name: 'INSPECT' },
    { x: 92, name: 'PACK' },
  ]
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(160deg, #062533 0%, #0A2F44 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}55`,
        boxShadow: `0 30px 80px ${ACCENT}33`,
      }}
    >
      {/* Conveyor track */}
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="6"
          y1="40"
          x2="98"
          y2="40"
          stroke={`${ACCENT}55`}
          strokeWidth="0.8"
        />
        {/* Conveyor "rollers" */}
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
          <circle key={x} cx={x} cy="40" r="0.8" fill={`${ACCENT}88`} />
        ))}
        {/* Stage hubs */}
        {stages.map((s) => (
          <g key={s.name}>
            <circle
              cx={s.x}
              cy="40"
              r="3.4"
              fill="rgba(7,9,26,0.95)"
              stroke={ACCENT}
              strokeWidth="0.8"
            />
            <circle cx={s.x} cy="40" r="1" fill={ACCENT} />
          </g>
        ))}
        {/* Moving piece */}
        <motion.rect
          width="3.2"
          height="2.6"
          fill="#FBBF24"
          rx="0.4"
          animate={{ x: [10, 90, 10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ y: 38 }}
        />
      </svg>
      {/* Stage labels */}
      <div
        className="absolute"
        style={{ left: '0', right: '0', top: '60%', display: 'flex' }}
      >
        {stages.map((s) => (
          <div
            key={s.name}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              transform: 'translateX(-50%)',
              fontFamily:
                'var(--font-mono, ui-monospace, monospace)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {s.name}
          </div>
        ))}
      </div>
      {/* Telemetry strip on top */}
      <div
        className="absolute top-4 left-5 right-5 flex items-center justify-between"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <span>Line A · plant 03</span>
        <span style={{ color: ACCENT }}>OEE 87%</span>
      </div>
      {/* Sensor pulses at each stage */}
      {stages.map((s, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: '53%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: ACCENT,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function OEEBreakdown() {
  const lines = [
    { name: 'Line A', avail: 95, perf: 91, qual: 99, oee: 86 },
    { name: 'Line B', avail: 92, perf: 88, qual: 97, oee: 78 },
    { name: 'Line C', avail: 98, perf: 94, qual: 100, oee: 92 },
    { name: 'Line D', avail: 88, perf: 85, qual: 96, oee: 72 },
  ]
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'white',
        border: '1px solid rgba(10,34,128,0.10)',
      }}
    >
      <div
        className="grid grid-cols-[100px_1fr_1fr_1fr_140px]"
        style={{
          background: '#F8F4F0',
          padding: 'clamp(12px, 1.4vw, 16px) clamp(18px, 2.2vw, 28px)',
          borderBottom: '1px solid rgba(10,34,128,0.10)',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(10,34,128,0.5)',
        }}
      >
        <div>Line</div>
        <div>Availability</div>
        <div>Performance</div>
        <div>Quality</div>
        <div>OEE</div>
      </div>
      {lines.map((l, i) => {
        const oeeColor =
          l.oee >= 85
            ? '#34D399'
            : l.oee >= 75
              ? ACCENT
              : '#F59E0B'
        return (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-[100px_1fr_1fr_1fr_140px] items-center"
            style={{
              padding: 'clamp(14px, 1.6vw, 18px) clamp(18px, 2.2vw, 28px)',
              borderBottom:
                i < lines.length - 1
                  ? '1px solid rgba(10,34,128,0.06)'
                  : 'none',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '12.5px',
              color: '#0A2280',
            }}
          >
            <div style={{ fontWeight: 700, color: ACCENT }}>{l.name}</div>
            {[l.avail, l.perf, l.qual].map((v, ix) => (
              <div key={ix} className="flex items-center gap-2">
                <div
                  className="relative rounded-full overflow-hidden flex-1 max-w-[110px]"
                  style={{
                    height: 6,
                    background: 'rgba(10,34,128,0.10)',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + ix * 0.08 + i * 0.04,
                    }}
                    className="absolute top-0 bottom-0 left-0"
                    style={{ background: ACCENT }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(10,34,128,0.5)',
                  }}
                >
                  {v}%
                </span>
              </div>
            ))}
            <div
              style={{
                fontWeight: 700,
                color: oeeColor,
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              }}
            >
              {l.oee}%
              <span
                style={{
                  marginLeft: '6px',
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,34,128,0.4)',
                }}
              >
                {l.oee >= 85 ? 'Healthy' : l.oee >= 75 ? 'Watch' : 'Action'}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function SmartManufacturingContent() {
  return (
    <SmartXLayout
      crumb="MonkSmartX"
      industryLabel="Manufacturing"
      title="Monk SmartManufacturing"
      subtitle="Adaptive and intelligent manufacturing systems."
      lead="Machine, sensor, and operational data on one continuous engine. Predictive maintenance, process optimization, and supervisory loops that close in line, not in batch."
      heroIllustration={<ManufacturingHero />}
      accent={ACCENT}
      stats={[
        { value: '+12 pts', label: 'OEE improvement' },
        { value: '-42%', label: 'Unplanned downtime' },
        { value: 'OPC UA', label: 'Native ingest' },
        { value: 'Edge', label: 'Plant + cloud' },
      ]}
      midBlock={{
        label: 'OEE breakdown',
        title: 'Per-line view that updates as the line runs',
        body: <OEEBreakdown />,
      }}
      capabilities={[
        {
          iconName: 'wrench',
          title: 'Predictive maintenance',
          body: 'Telemetry-driven failure prediction across rotating equipment, motors, and tooling.',
          chip: '-42% downtime',
        },
        {
          iconName: 'sliders',
          title: 'Process optimization',
          body: 'Continuous parameter tuning against live yield, quality, and energy signals.',
          chip: 'Closed-loop tuning',
        },
        {
          iconName: 'gauge',
          title: 'Real-time control',
          body: 'Supervisory loops that close inside the engine, not via downstream batch jobs.',
          chip: 'In-engine · supervisory',
        },
        {
          iconName: 'plug',
          title: 'Resilient operations',
          body: 'Edge nodes keep the line running through outages and sync on reconnect.',
          chip: 'Edge · offline-first',
        },
      ]}
      flow={[
        {
          iconName: 'plug',
          title: 'OT ingest',
          body: 'PLC, sensor, vision, and machine data streamed natively, on the plant floor and in the cloud.',
        },
        {
          iconName: 'gauge',
          title: 'Live state',
          body: 'Per-line, per-cell, per-tool state continuously updated against the production plan.',
        },
        {
          iconName: 'sliders',
          title: 'Tune',
          body: 'Yield, quality, and energy tuned in supervisory loops that close inside the engine.',
        },
        {
          iconName: 'wrench',
          title: 'Maintain',
          body: 'Failure-mode signatures flag rotating equipment, motors, and tooling before they take a line down.',
        },
      ]}
      integrations={[
        {
          group: 'OT layer',
          tools: ['OPC UA', 'PLCs', 'SCADA', 'Historians'],
        },
        {
          group: 'Plant systems',
          tools: ['MES / MOM', 'ERP', 'Quality systems', 'CMMS'],
        },
        {
          group: 'Cloud and analytics',
          tools: ['Azure IoT', 'AWS IoT', 'Grafana', 'Power BI'],
        },
      ]}
      proofMetrics={[
        { value: '+12 pts', label: 'OEE improvement across pilot lines' },
        { value: '-42%', label: 'Unplanned downtime reduction' },
        { value: 'Edge', label: 'Plant + cloud, with reconnect-resilient sync' },
      ]}
      certifications={[
        'SOC 2 Type II',
        'ISO 27001',
        'ISA-95',
        'IEC 62443',
        'GDPR',
        'Air-gapped',
      ]}
      quote={{
        text: 'Lines that used to require a batch reconciliation now self-tune. The control loop is short enough that we trust it with quality decisions.',
        role: 'Plant Manager',
        org: 'Forge Steel',
      }}
      ctaHeading="Build a line that adapts in real time."
    />
  )
}
