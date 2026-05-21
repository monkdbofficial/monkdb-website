'use client'

/**
 * Monk SmartMobility — bespoke page for the mobility / fleet industry.
 * Visual identity:
 *   - Teal accent (#0EA5A8) on the MonkDB navy
 *   - Hero: animated city grid with vehicle dots traveling along routes
 *   - Mid-block: live dispatch board showing vehicle ETAs streaming in
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'

// Deeper enterprise teal. Replaces the brighter #0EA5A8 for mobility.
const ACCENT = '#0E8FA8'

function MobilityHero() {
  // Render a city grid with 4 traveling dots along curved paths
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(160deg, #032525 0%, #062F30 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}55`,
        boxShadow: `0 30px 80px ${ACCENT}33`,
      }}
    >
      {/* Grid lines */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="mobility-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0 H40 M0 0 V40"
              stroke={`${ACCENT}33`}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#mobility-grid)" />
        {/* 4 main routes (curved paths) */}
        <path
          d="M40 60 Q200 80 360 220"
          stroke={ACCENT}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity="0.85"
          strokeLinecap="round"
        />
        <path
          d="M30 200 Q160 100 380 60"
          stroke={ACCENT}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />
        <path
          d="M40 250 Q220 250 380 130"
          stroke={ACCENT}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M60 30 Q140 200 360 280"
          stroke={ACCENT}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>

      {/* Dot markers at depots / hubs */}
      {[
        { x: 10, y: 20, label: 'HUB-A' },
        { x: 90, y: 20, label: 'HUB-B' },
        { x: 90, y: 80, label: 'HUB-C' },
        { x: 8, y: 60, label: 'DEPOT' },
      ].map((h) => (
        <div
          key={h.label}
          className="absolute"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: `2px solid ${ACCENT}`,
              background: 'rgba(7,9,26,0.8)',
            }}
          />
          <div
            className="mt-1 whitespace-nowrap"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.5)',
              padding: '2px 5px',
            }}
          >
            {h.label}
          </div>
        </div>
      ))}

      {/* Traveling vehicles — emoji-free, just shaped dots */}
      {[
        { duration: 4.2, delay: 0 },
        { duration: 5.1, delay: 1.4 },
        { duration: 3.6, delay: 0.8 },
      ].map((v, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: 10,
            height: 10,
            borderRadius: '2px',
            background: '#B45309',
            boxShadow: '0 0 10px rgba(180,83,9,0.7)',
          }}
          animate={{
            x: [-180, -90, 0, 90, 180, -180],
            y: [-100, -40, 30, 80, -50, -100],
          }}
          transition={{
            duration: v.duration,
            delay: v.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Top-right live count */}
      <div
        className="absolute top-4 right-5"
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          background: 'rgba(7,9,26,0.7)',
          border: `1px solid ${ACCENT}55`,
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: ACCENT,
          backdropFilter: 'blur(6px)',
        }}
      >
        1,248 vehicles · LIVE
      </div>
    </div>
  )
}

function DispatchBoard() {
  const rows = [
    { id: 'TRK-2841', route: 'A → C', eta: '07:32', status: 'on-time' },
    { id: 'TRK-1209', route: 'B → A', eta: '07:48', status: 'on-time' },
    { id: 'VAN-0412', route: 'A → D', eta: '07:51', status: 'rerouting' },
    { id: 'TRK-3308', route: 'C → B', eta: '08:04', status: 'on-time' },
    { id: 'TRK-9920', route: 'D → A', eta: '08:18', status: 'delayed' },
  ]
  const statusColor: Record<string, string> = {
    'on-time': '#1FA975',
    rerouting: ACCENT,
    delayed: '#F59E0B',
  }
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0E1430 0%, #07091A 100%)',
        border: '1px solid rgba(127,179,255,0.18)',
      }}
    >
      <div className="overflow-x-auto">
      <div
        className="grid grid-cols-[120px_1fr_120px_120px]"
        style={{
          minWidth: 560,
          background: 'rgba(255,255,255,0.02)',
          padding: 'clamp(12px, 1.4vw, 16px) clamp(18px, 2.2vw, 28px)',
          borderBottom: '1px solid rgba(127,179,255,0.12)',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <div>Vehicle</div>
        <div>Route</div>
        <div>ETA</div>
        <div>Status</div>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="grid grid-cols-[120px_1fr_120px_120px] items-center"
          style={{
            minWidth: 560,
            padding: 'clamp(14px, 1.6vw, 18px) clamp(18px, 2.2vw, 28px)',
            borderBottom:
              i < rows.length - 1
                ? '1px solid rgba(127,179,255,0.06)'
                : 'none',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '12.5px',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <div style={{ color: ACCENT, fontWeight: 600 }}>{r.id}</div>
          <div>{r.route}</div>
          <div>{r.eta}</div>
          <div
            className="inline-flex items-center gap-1.5"
            style={{
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: statusColor[r.status],
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: statusColor[r.status],
              }}
            />
            {r.status}
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  )
}

export default function SmartMobilityContent() {
  return (
    <SmartXLayout
      crumb="MonkSmartX"
      industryLabel="Mobility"
      title="Monk SmartMobility"
      subtitle="Intelligent systems for connected and autonomous mobility."
      lead="Real-time location, traffic, and behavioural data unified on one continuous engine. Dynamic routing, fleet optimization, and predictive mobility for smart cities, logistics, and connected vehicles."
      heroIllustration={<MobilityHero />}
      accent={ACCENT}
      stats={[
        { value: '22%', label: 'Utilization gain' },
        { value: '-19%', label: 'Fuel consumption' },
        { value: '<200 ms', label: 'Reroute decision' },
        { value: '1,200+', label: 'Concurrent vehicles' },
      ]}
      midBlock={{
        label: 'Live dispatch',
        title: 'A board that updates as the road updates',
        body: <DispatchBoard />,
      }}
      capabilities={[
        {
          iconName: 'route',
          title: 'Dynamic routing',
          body: 'Routes recomputed on the latest traffic, weather, and demand state.',
          chip: '<200 ms recompute',
        },
        {
          iconName: 'truck',
          title: 'Fleet optimization',
          body: 'Utilization, dwell, and energy modeled per asset, in real time.',
          chip: 'Per-asset live model',
        },
        {
          iconName: 'trending-up',
          title: 'Predictive mobility',
          body: 'Demand and congestion forecasts that feed back into operations.',
          chip: 'Closed-loop forecasting',
        },
        {
          iconName: 'wifi',
          title: 'Connected vehicle data plane',
          body: 'Per-vehicle telemetry, OTA state, and policy in one engine.',
          chip: '1,200+ vehicles · live',
        },
      ]}
      flow={[
        {
          iconName: 'radio',
          title: 'Telemetry in',
          body: 'Per-vehicle GPS, CAN bus, OBU, and rider state streamed continuously across fleets and geographies.',
        },
        {
          iconName: 'map',
          title: 'Live state',
          body: 'Vehicles, road network, weather, and demand reasoned over together in one continuous view.',
        },
        {
          iconName: 'route',
          title: 'Decide',
          body: 'Routes recomputed per vehicle and per dispatcher under sub-200ms latency budgets.',
        },
        {
          iconName: 'send',
          title: 'Dispatch',
          body: 'Decisions land at the vehicle. Updated ETAs and re-routes ride the same data pipeline.',
        },
      ]}
      integrations={[
        {
          group: 'Vehicle and edge',
          tools: ['CAN bus', 'OBU', 'OTA platforms', 'V2X'],
        },
        {
          group: 'Data sources',
          tools: ['HERE / TomTom', 'Weather APIs', 'Traffic feeds', 'Mobility OS'],
        },
        {
          group: 'Cloud',
          tools: ['Kafka', 'AWS IoT', 'Grafana', 'Mapbox'],
        },
      ]}
      proofMetrics={[
        { value: '22%', label: 'Fleet utilization gain across deployments' },
        { value: '-19%', label: 'Fuel and energy cost reduction' },
        { value: '<200 ms', label: 'Time to recompute routes on live state' },
      ]}
      certifications={['SOC 2 Type II', 'ISO 27001', 'ISO 21434', 'GDPR', 'TISAX']}
      quote={{
        text: 'Once routing decisions started happening at the vehicle, not after a hop through a central scheduler, everything got faster and lighter.',
        role: 'Head of Platform',
        org: 'Drift Mobility',
      }}
      ctaHeading="Coordinate networks at the speed of movement."
    />
  )
}
