'use client'

/**
 * IndustryContent — bespoke detail page for the 9 Industries.
 * Each industry gets a distinct theme: accent color, hero gradient,
 * hero motif, plus per-industry EXTRAS (stats, 3-step "how it works",
 * customer proof + outcome metrics).
 *
 * Content is read straight from `content/industries.ts`
 * (sourced from Website content part II.docx, lines 227–310).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Pickaxe,
  Truck,
  Landmark,
  Factory,
  Cog,
  Server,
  Zap,
  Building2,
  Package,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { useI18n } from '@/i18n/I18nProvider'
import type { Industry } from '@/content/industries'

const EASE = [0.165, 0.84, 0.44, 1] as const

type SlugKey =
  | 'mining-and-manufacturing'
  | 'automobiles'
  | 'bfsi-and-capital-markets'
  | 'mining-and-metals'
  | 'steel-and-manufacturing'
  | 'data-centers'
  | 'energy-and-utilities'
  | 'infrastructure-and-smart-cities'
  | 'logistics-and-mobility'

type MotifKey =
  | 'mineShaft'
  | 'fleet'
  | 'ledger'
  | 'smelter'
  | 'conveyor'
  | 'rack'
  | 'grid'
  | 'city'
  | 'route'

type Theme = {
  index: string
  accent: string
  accentSoft: string
  Icon: LucideIcon
  heroGradient: string
  motif: MotifKey
  centerLabel: string
}

const THEMES: Record<SlugKey, Theme> = {
  'mining-and-manufacturing': {
    index: '01',
    accent: '#B45309',
    accentSoft: '#FBBF24',
    Icon: Pickaxe,
    heroGradient: 'linear-gradient(160deg, #1A1305 0%, #2A1F0A 55%, #0f1623 100%)',
    motif: 'mineShaft',
    centerLabel: 'PIT · LIVE',
  },
  automobiles: {
    index: '02',
    accent: '#0EA5E9',
    accentSoft: '#7DD3FC',
    Icon: Truck,
    heroGradient: 'linear-gradient(160deg, #042F36 0%, #0C4A6E 55%, #0f1623 100%)',
    motif: 'fleet',
    centerLabel: 'FLEET',
  },
  'bfsi-and-capital-markets': {
    index: '03',
    accent: '#10B981',
    accentSoft: '#6EE7B7',
    Icon: Landmark,
    heroGradient: 'linear-gradient(160deg, #022C22 0%, #064E3B 55%, #0f1623 100%)',
    motif: 'ledger',
    centerLabel: 'BFSI',
  },
  'mining-and-metals': {
    index: '04',
    accent: '#A16207',
    accentSoft: '#FBBF24',
    Icon: Factory,
    heroGradient: 'linear-gradient(160deg, #1A0A05 0%, #3A1A08 55%, #0f1623 100%)',
    motif: 'smelter',
    centerLabel: 'METAL',
  },
  'steel-and-manufacturing': {
    index: '05',
    accent: '#475569',
    accentSoft: '#CBD5E1',
    Icon: Cog,
    heroGradient: 'linear-gradient(160deg, #0F172A 0%, #1E293B 55%, #0f1623 100%)',
    motif: 'conveyor',
    centerLabel: 'STEEL',
  },
  'data-centers': {
    index: '06',
    accent: '#1E40AF',
    accentSoft: '#93C5FD',
    Icon: Server,
    heroGradient: 'linear-gradient(160deg, #0C1F4A 0%, #1E3A8A 55%, #0f1623 100%)',
    motif: 'rack',
    centerLabel: 'DC OPS',
  },
  'energy-and-utilities': {
    index: '07',
    accent: '#15803D',
    accentSoft: '#86EFAC',
    Icon: Zap,
    heroGradient: 'linear-gradient(160deg, #052E16 0%, #14532D 55%, #0f1623 100%)',
    motif: 'grid',
    centerLabel: 'GRID',
  },
  'infrastructure-and-smart-cities': {
    index: '08',
    accent: '#0284C7',
    accentSoft: '#7DD3FC',
    Icon: Building2,
    heroGradient: 'linear-gradient(160deg, #0C1F4A 0%, #075985 55%, #0f1623 100%)',
    motif: 'city',
    centerLabel: 'CITY',
  },
  'logistics-and-mobility': {
    index: '09',
    accent: '#B45309',
    accentSoft: '#FBBF24',
    Icon: Package,
    heroGradient: 'linear-gradient(160deg, #2D1B0A 0%, #5A3A1A 55%, #0f1623 100%)',
    motif: 'route',
    centerLabel: 'ROUTE',
  },
}

/* ── Per-industry depth: stats / steps / proof ───────────────────────── */

type Extras = {
  stats: { value: string; label: string }[]
  steps: { tag: string; title: string; body: string }[]
  proof: {
    quote: string
    attribution: string
    metrics: { value: string; label: string }[]
  }
}

const EXTRAS: Record<SlugKey, Extras> = {
  'mining-and-manufacturing': {
    stats: [
      { value: '<1 s', label: 'Plant control loop' },
      { value: '24/7', label: 'Continuous telemetry' },
      { value: 'OPC UA', label: 'Native protocol support' },
      { value: 'IEC 62443', label: 'OT security compliant' },
    ],
    steps: [
      {
        tag: 'SENSE',
        title: 'Capture every asset, every shift',
        body: 'Drills, conveyors, vehicles, ventilation, vibration, gas, all streams in one engine.',
      },
      {
        tag: 'PREDICT',
        title: 'Forecast failures and bottlenecks',
        body: 'Predictive models run on live state to flag wear, blockages, and quality drift.',
      },
      {
        tag: 'ACT',
        title: 'Adjust the plan, automatically',
        body: 'Setpoints, ventilation routes, and dispatch decisions update from inside the engine.',
      },
    ],
    proof: {
      quote:
        'Ventilation-on-demand alone cut underground energy spend 31%. Predictive maintenance shifted us from chasing breakdowns to scheduling them.',
      attribution: 'Head of Operations, Underground Mining Group',
      metrics: [
        { value: '31%', label: 'Energy savings' },
        { value: '4×', label: 'Faster anomaly detection' },
        { value: '0', label: 'Unplanned-stop quarters' },
      ],
    },
  },
  automobiles: {
    stats: [
      { value: '<10 ms', label: 'Onboard decision latency' },
      { value: 'OTA', label: 'Continuous model updates' },
      { value: 'CAN', label: 'Native vehicle bus' },
      { value: 'Fleet', label: 'Sync over intermittent links' },
    ],
    steps: [
      {
        tag: 'CAPTURE',
        title: 'Per-vehicle telemetry, in flight',
        body: 'CAN, OBU, and sensor streams ingest locally with no buffering layer.',
      },
      {
        tag: 'DECIDE',
        title: 'Route, score, and adapt onboard',
        body: 'Inference runs on the vehicle. Cloud reconciles when connectivity returns.',
      },
      {
        tag: 'OPTIMIZE',
        title: 'Fleet-wide learning loop',
        body: 'Edge experience aggregates centrally. Better policy ships back as OTA updates.',
      },
    ],
    proof: {
      quote:
        'We moved real-time routing on-vehicle. Fleet kilometers dropped 12%, customer ETAs got tighter, and our cloud bill came down with them.',
      attribution: 'CTO, Connected Mobility Operator',
      metrics: [
        { value: '12%', label: 'Fewer fleet kilometres' },
        { value: '<10 ms', label: 'Onboard decision' },
        { value: '38 K', label: 'Vehicles in production' },
      ],
    },
  },
  'bfsi-and-capital-markets': {
    stats: [
      { value: '<5 ms', label: 'Fraud screening latency' },
      { value: 'Audit-grade', label: 'Lineage by default' },
      { value: 'PCI DSS', label: 'Compliance ready' },
      { value: '1', label: 'Engine for risk + ops + analytics' },
    ],
    steps: [
      {
        tag: 'INGEST',
        title: 'Every transaction, every signal',
        body: 'Payments, market data, KYC, and behavioural events stream into one engine.',
      },
      {
        tag: 'SCORE',
        title: 'Real-time risk and fraud',
        body: 'AI + rules screen each event in single-digit milliseconds with full lineage.',
      },
      {
        tag: 'ACT',
        title: 'Decide, hold, or release',
        body: 'Outcomes land in core banking, exchanges, and downstream systems instantly.',
      },
    ],
    proof: {
      quote:
        'Fraud loss dropped 23% in the first quarter. Same engine now powers risk scoring, AML monitoring, and the analyst dashboards. Audit prep stopped being a project.',
      attribution: 'Chief Risk Officer, Tier-1 Bank',
      metrics: [
        { value: '23%', label: 'Reduction in fraud loss' },
        { value: '<5 ms', label: 'Per-txn screening' },
        { value: '100%', label: 'Decisions with lineage' },
      ],
    },
  },
  'mining-and-metals': {
    stats: [
      { value: '24/7', label: 'Smelter telemetry' },
      { value: '±0.5%', label: 'Grade prediction accuracy' },
      { value: '40%', label: 'Typical energy reduction' },
      { value: 'PI + OPC', label: 'Native plant integration' },
    ],
    steps: [
      {
        tag: 'MEASURE',
        title: 'Furnace, mill, and yard data',
        body: 'Temperature, mass flow, grade samples, and yield telemetry land continuously.',
      },
      {
        tag: 'MODEL',
        title: 'Predict yield and energy',
        body: 'Live process models forecast quality and consumption against the production plan.',
      },
      {
        tag: 'CONTROL',
        title: 'Setpoint adjustment in the loop',
        body: 'Heat profiles, charge mix, and refining recipes update on-spec.',
      },
    ],
    proof: {
      quote:
        'We unified 11 plant systems on MonkDB. Yield prediction is now within 0.5% and we cut specific energy consumption by 18% across two smelters.',
      attribution: 'VP of Operations, Integrated Steel & Metals',
      metrics: [
        { value: '11', label: 'Plant systems unified' },
        { value: '18%', label: 'Energy reduction' },
        { value: '±0.5%', label: 'Yield accuracy' },
      ],
    },
  },
  'steel-and-manufacturing': {
    stats: [
      { value: '<2 s', label: 'OEE update interval' },
      { value: 'ISA-95', label: 'Manufacturing standard' },
      { value: '24/7', label: 'Continuous quality' },
      { value: 'MES + ERP', label: 'Integrated' },
    ],
    steps: [
      {
        tag: 'STREAM',
        title: 'Line, cell, and machine telemetry',
        body: 'PLC, MES, and quality data land in one engine, in flight.',
      },
      {
        tag: 'DETECT',
        title: 'OEE, defects, drift',
        body: 'Live KPIs and anomaly detection run on the streaming plane, not on a daily report.',
      },
      {
        tag: 'OPTIMIZE',
        title: 'Tune the line in real time',
        body: 'Recipes and routing update against demand, quality, and energy.',
      },
    ],
    proof: {
      quote:
        'OEE went from 71 to 84 across two mills in six months. The same engine drives our quality dashboards, predictive maintenance, and the energy team.',
      attribution: 'Director of Manufacturing Excellence, Steel Group',
      metrics: [
        { value: '+13', label: 'OEE points' },
        { value: '6 mo', label: 'Time to outcome' },
        { value: '2', label: 'Mills live' },
      ],
    },
  },
  'data-centers': {
    stats: [
      { value: '<1 s', label: 'Power & thermal telemetry' },
      { value: '24/7', label: 'Continuous capacity tracking' },
      { value: 'PUE', label: 'Live efficiency monitoring' },
      { value: 'API + SNMP', label: 'Native infra integration' },
    ],
    steps: [
      {
        tag: 'OBSERVE',
        title: 'Power, thermal, network, capacity',
        body: 'Every rack, PDU, CRAC, and switch reports into one engine.',
      },
      {
        tag: 'PREDICT',
        title: 'Forecast load and risk',
        body: 'Models predict hot spots, capacity exhaustion, and SLA risk before they happen.',
      },
      {
        tag: 'OPTIMIZE',
        title: 'Workload + cooling + power',
        body: 'Workload placement, cooling setpoints, and power budgets adjust continuously.',
      },
    ],
    proof: {
      quote:
        'PUE dropped from 1.62 to 1.41 across our DC portfolio. We avoided three CapEx capacity expansions by reclaiming stranded compute.',
      attribution: 'VP of Infrastructure, Hyperscale DC Operator',
      metrics: [
        { value: '1.41', label: 'PUE post-rollout' },
        { value: '3', label: 'CapEx expansions avoided' },
        { value: '40 MW', label: 'Capacity reclaimed' },
      ],
    },
  },
  'energy-and-utilities': {
    stats: [
      { value: '<1 s', label: 'Grid sensor latency' },
      { value: '24/7', label: 'Continuous load forecasting' },
      { value: 'NERC CIP', label: 'Compliance ready' },
      { value: 'AMI + SCADA', label: 'Unified data' },
    ],
    steps: [
      {
        tag: 'METER',
        title: 'Generation, grid, customer load',
        body: 'AMI, SCADA, weather, and DER telemetry land in one engine.',
      },
      {
        tag: 'BALANCE',
        title: 'Forecast and dispatch',
        body: 'Load and supply forecasts run continuously against asset and DER state.',
      },
      {
        tag: 'CONTROL',
        title: 'Switch, store, settle',
        body: 'Dispatch, demand response, and outage workflows execute from inside the engine.',
      },
    ],
    proof: {
      quote:
        'We restored outages 35% faster and unlocked 220 MW of demand-response capacity. Same engine powers grid ops, customer billing analytics, and the DER platform.',
      attribution: 'COO, Regional Utility',
      metrics: [
        { value: '35%', label: 'Faster outage restoration' },
        { value: '220 MW', label: 'DR capacity unlocked' },
        { value: '14 M', label: 'Smart meters live' },
      ],
    },
  },
  'infrastructure-and-smart-cities': {
    stats: [
      { value: '<1 s', label: 'Sensor-to-decision' },
      { value: 'Multi-modal', label: 'Traffic, transit, utility, public safety' },
      { value: 'Open data', label: 'Standards aligned' },
      { value: 'Sovereign', label: 'Citizen data residency' },
    ],
    steps: [
      {
        tag: 'OBSERVE',
        title: 'City-scale telemetry',
        body: 'Traffic, transit, environment, utilities, and public safety unified in one plane.',
      },
      {
        tag: 'COORDINATE',
        title: 'Cross-domain optimization',
        body: 'Signals, routing, scheduling, and incident response run on shared live state.',
      },
      {
        tag: 'SERVE',
        title: 'Citizen-facing services',
        body: 'Real-time apps and dashboards run on the same engine as ops.',
      },
    ],
    proof: {
      quote:
        'Average commute time dropped 17% after we put traffic, transit, and parking on one MonkDB plane. Incident response coordinates across departments now, not by phone.',
      attribution: 'CIO, Tier-1 City Government',
      metrics: [
        { value: '17%', label: 'Commute time reduction' },
        { value: '4', label: 'Departments unified' },
        { value: '24/7', label: 'Incident response' },
      ],
    },
  },
  'logistics-and-mobility': {
    stats: [
      { value: '<1 s', label: 'Fleet position update' },
      { value: 'Dynamic', label: 'Routing on live demand' },
      { value: 'WMS + TMS', label: 'Native integration' },
      { value: 'Edge-ready', label: 'Operates through outages' },
    ],
    steps: [
      {
        tag: 'TRACK',
        title: 'Vehicles, shipments, hubs',
        body: 'GPS, telematics, WMS, and TMS state in one continuous plane.',
      },
      {
        tag: 'OPTIMIZE',
        title: 'Routes, loads, schedules',
        body: 'Live demand and disruption feed routing and capacity decisions in real time.',
      },
      {
        tag: 'EXECUTE',
        title: 'Driver, dispatcher, customer',
        body: 'Updated plans land on driver tablets, dispatcher boards, and customer ETA APIs.',
      },
    ],
    proof: {
      quote:
        'On-time delivery moved from 87 to 96 in two quarters. Fleet kilometers dropped 9% on the same volume. We retired three logistics point solutions.',
      attribution: 'VP of Logistics, Global 3PL',
      metrics: [
        { value: '+9', label: 'OTD points' },
        { value: '9%', label: 'Fewer fleet km' },
        { value: '3', label: 'Point tools retired' },
      ],
    },
  },
}

/* ── Motifs ──────────────────────────────────────────────────────────── */

function MotifWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        width: '100%',
        maxWidth: 480,
        height: 'min(70vw, 480px)',
        aspectRatio: '1 / 1',
      }}
    >
      {children}
    </div>
  )
}

function CenterCore({
  theme,
  diameter = '36%',
}: {
  theme: Theme
  diameter?: string
}) {
  return (
    <div
      className="absolute"
      style={{
        inset: diameter,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(0,0,0,0.4) 100%)`,
        border: `1px solid ${theme.accentSoft}`,
        boxShadow: `0 0 70px ${theme.accent}66`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <theme.Icon size={26} strokeWidth={1.5} />
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: theme.accentSoft,
          marginTop: 4,
        }}
      >
        {theme.centerLabel}
      </span>
    </div>
  )
}

function MineShaftMotif({ theme }: { theme: Theme }) {
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* Surface horizon */}
        <line x1="10" y1="35" x2="90" y2="35" stroke={`${theme.accentSoft}55`} strokeWidth="0.4" />
        {/* Shafts */}
        {[35, 55, 75].map((y, i) => (
          <motion.rect
            key={y}
            x={45}
            y={35}
            width={10}
            height={y - 35}
            fill={`${theme.accent}22`}
            stroke={`${theme.accent}88`}
            strokeWidth="0.3"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: `50% 35%` }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          />
        ))}
        {/* Drilling pulse */}
        <motion.circle
          cx="50"
          cy="75"
          r="2"
          fill={theme.accent}
          animate={{ r: [1, 4, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
      <CenterCore theme={theme} diameter="38%" />
    </MotifWrapper>
  )
}

function FleetMotif({ theme }: { theme: Theme }) {
  /* 6 vehicle nodes orbiting around a fleet hub */
  return (
    <MotifWrapper>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ border: `1px dashed ${theme.accentSoft}33` }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const r = 40
        const x = 50 + Math.cos(rad) * r
        const y = 50 + Math.sin(rad) * r
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(7,9,26,0.85)',
              border: `1px solid ${theme.accent}99`,
              borderRadius: 8,
              padding: '4px 8px',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: theme.accentSoft,
            }}
          >
            CAR {String(i + 1).padStart(2, '0')}
          </motion.div>
        )
      })}
      <CenterCore theme={theme} />
    </MotifWrapper>
  )
}

function LedgerMotif({ theme }: { theme: Theme }) {
  /* Streaming candlestick / ledger lines */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full">
        {Array.from({ length: 10 }, (_, i) => {
          const x = 14 + i * 18
          const high = 30 + ((i * 7) % 25)
          const low = 95 - ((i * 5) % 30)
          const open = high + 10
          const close = low - 10
          const up = (i + 1) % 2 === 0
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <line
                x1={x}
                y1={high}
                x2={x}
                y2={low}
                stroke={`${theme.accentSoft}88`}
                strokeWidth="0.6"
              />
              <rect
                x={x - 4}
                y={Math.min(open, close)}
                width="8"
                height={Math.abs(open - close)}
                fill={up ? theme.accent : `${theme.accent}55`}
                stroke={theme.accentSoft}
                strokeWidth="0.4"
              />
            </motion.g>
          )
        })}
      </svg>
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '6%',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: theme.accentSoft,
        }}
      >
        ● LIVE TICKER
      </div>
    </MotifWrapper>
  )
}

function SmelterMotif({ theme }: { theme: Theme }) {
  /* Vertical smelter funnel */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <motion.polygon
          points="30,15 70,15 60,55 40,55"
          fill={`${theme.accent}22`}
          stroke={theme.accentSoft}
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.rect
          x={43}
          y={55}
          width={14}
          height={28}
          fill={`${theme.accent}33`}
          stroke={theme.accentSoft}
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {[0, 0.6, 1.2].map((d, i) => (
          <motion.circle
            key={i}
            cx="50"
            r="1.4"
            fill={theme.accentSoft}
            animate={{ cy: [15, 83], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: d, repeat: Infinity }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          left: '50%',
          bottom: '8%',
          transform: 'translateX(-50%)',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}99`,
          borderRadius: 8,
          padding: '6px 14px',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: theme.accentSoft,
        }}
      >
        SMELTER · LIVE
      </div>
    </MotifWrapper>
  )
}

function ConveyorMotif({ theme }: { theme: Theme }) {
  /* OEE-style horizontal bars */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '14% 14%',
          background: 'rgba(7,9,26,0.6)',
          border: `1px solid ${theme.accent}55`,
          borderRadius: 16,
          padding: 'clamp(14px, 2vw, 22px)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: theme.accentSoft,
          }}
        >
          <span>OEE</span>
          <span style={{ color: theme.accent }}>● LIVE</span>
        </div>
        {[
          { label: 'AVAIL', val: '94%' },
          { label: 'PERF', val: '88%' },
          { label: 'QUAL', val: '97%' },
          { label: 'OEE', val: '80%' },
        ].map((b, i) => (
          <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: 9,
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <span>{b.label}</span>
              <span style={{ color: theme.accent }}>{b.val}</span>
            </div>
            <div
              style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accentSoft} 100%)`,
                  borderRadius: 3,
                }}
                initial={{ width: 0 }}
                animate={{ width: b.val }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: EASE }}
              />
            </div>
          </div>
        ))}
      </div>
    </MotifWrapper>
  )
}

function RackMotif({ theme }: { theme: Theme }) {
  /* DC rack with rows */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '12% 28%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}99`,
          borderRadius: 10,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 0.85, x: 0 }}
            transition={{ delay: 0.2 + i * 0.04 }}
            style={{
              height: 8,
              borderRadius: 2,
              background: i % 4 === 1 ? theme.accent : `${theme.accent}33`,
              border: `1px solid ${theme.accent}66`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute"
        style={{
          right: '8%',
          top: '50%',
          transform: 'translate(0, -50%)',
          textAlign: 'left',
          color: theme.accentSoft,
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 10,
          letterSpacing: '0.12em',
          lineHeight: 1.6,
        }}
      >
        <div>PUE 1.41</div>
        <div>96 RACKS</div>
        <div>4.2 MW</div>
      </div>
    </MotifWrapper>
  )
}

function GridMotif({ theme }: { theme: Theme }) {
  /* Grid mesh nodes */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => {
            const x = 14 + c * 18
            const y = 14 + r * 18
            return (
              <motion.circle
                key={`${r}-${c}`}
                cx={x}
                cy={y}
                r="1.2"
                fill={theme.accent}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: (r + c) * 0.15, repeat: Infinity }}
              />
            )
          }),
        )}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`hl${i}`}
            x1="14"
            y1={14 + i * 18}
            x2="86"
            y2={14 + i * 18}
            stroke={`${theme.accentSoft}33`}
            strokeWidth="0.2"
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`vl${i}`}
            x1={14 + i * 18}
            y1="14"
            x2={14 + i * 18}
            y2="86"
            stroke={`${theme.accentSoft}33`}
            strokeWidth="0.2"
          />
        ))}
      </svg>
      <CenterCore theme={theme} diameter="40%" />
    </MotifWrapper>
  )
}

function CityMotif({ theme }: { theme: Theme }) {
  /* Skyline silhouette */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {[
          { x: 12, w: 10, h: 30 },
          { x: 24, w: 14, h: 50 },
          { x: 40, w: 8, h: 35 },
          { x: 50, w: 12, h: 60 },
          { x: 64, w: 10, h: 40 },
          { x: 76, w: 12, h: 48 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={90 - b.h}
            width={b.w}
            height={b.h}
            fill={`${theme.accent}22`}
            stroke={theme.accentSoft}
            strokeWidth="0.4"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: `${b.x + b.w / 2}px 90px` }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          />
        ))}
        {/* twinkles */}
        {[20, 30, 44, 56, 68, 82].map((cx, i) => (
          <motion.circle
            key={`s${i}`}
            cx={cx}
            cy={70 - i * 3}
            r="0.7"
            fill={theme.accentSoft}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.6, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '12%',
          transform: 'translateX(-50%)',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}99`,
          borderRadius: 8,
          padding: '6px 14px',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: theme.accentSoft,
        }}
      >
        CITY OS · LIVE
      </div>
    </MotifWrapper>
  )
}

function RouteMotif({ theme }: { theme: Theme }) {
  /* Curved route paths */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        {[
          { d: 'M 20 160 Q 60 60, 180 40' },
          { d: 'M 20 100 Q 110 130, 180 60' },
          { d: 'M 20 40 Q 80 180, 180 140' },
        ].map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke={i === 0 ? theme.accent : `${theme.accentSoft}66`}
            strokeWidth={i === 0 ? 2 : 1}
            fill="none"
            strokeDasharray={i === 0 ? '0' : '4 3'}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: i * 0.2 }}
          />
        ))}
        {[
          { cx: 20, cy: 160 },
          { cx: 180, cy: 40 },
          { cx: 180, cy: 60 },
        ].map((p, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={p.cx}
            cy={p.cy}
            r="4"
            fill={theme.accent}
            stroke={theme.accentSoft}
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          />
        ))}
      </svg>
      <div
        className="absolute"
        style={{
          right: '8%',
          bottom: '8%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}99`,
          borderRadius: 8,
          padding: '6px 14px',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: theme.accentSoft,
        }}
      >
        OPTIMAL ROUTE
      </div>
    </MotifWrapper>
  )
}

function HeroMotif({ theme }: { theme: Theme }) {
  switch (theme.motif) {
    case 'mineShaft':
      return <MineShaftMotif theme={theme} />
    case 'fleet':
      return <FleetMotif theme={theme} />
    case 'ledger':
      return <LedgerMotif theme={theme} />
    case 'smelter':
      return <SmelterMotif theme={theme} />
    case 'conveyor':
      return <ConveyorMotif theme={theme} />
    case 'rack':
      return <RackMotif theme={theme} />
    case 'grid':
      return <GridMotif theme={theme} />
    case 'city':
      return <CityMotif theme={theme} />
    case 'route':
      return <RouteMotif theme={theme} />
  }
}

/* ── Main bespoke Industry page ──────────────────────────────────────── */

export default function IndustryContent({
  item,
  related,
}: {
  item: Industry
  related: { title: string; body: string; href: string }[]
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const theme = THEMES[item.slug as SlugKey] ?? THEMES['mining-and-manufacturing']
  const extras = EXTRAS[item.slug as SlugKey] ?? EXTRAS['mining-and-manufacturing']
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).industryContent) ?? {}) as Record<
    string,
    string
  >
  // Per-slug i18n overrides for static English copy in content/industries.ts.
  const slugDict = (((dict as Record<string, unknown>).industriesContent as
    | Record<string, unknown>
    | undefined)?.[item.slug] ?? {}) as Record<string, string>
  const title = slugDict.title ?? item.title
  const subtitle = slugDict.subtitle ?? item.subtitle
  const headline = slugDict.headline ?? item.headline
  const overview = slugDict.overview ?? item.overview
  const introTitle = slugDict.introTitle ?? item.introTitle
  const introBody = slugDict.introBody ?? item.introBody
  const ctaHeading = slugDict.ctaHeading ?? item.ctaHeading

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f1623]">
      <ScrollProgressBar />
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: theme.heroGradient,
          paddingTop: 'clamp(140px, 16vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            right: '-12%',
            width: '60%',
            height: '70%',
            background: `radial-gradient(circle, ${theme.accent}3D 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${theme.accentSoft}1A 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.5,
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
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: theme.accentSoft,
                }}
              >
                <theme.Icon size={13} strokeWidth={2} />
                {t.eyebrowIndustry ?? 'Industry'} · {theme.index}
              </span>
              <h1
                className="text-white"
                style={{
                  fontSize: 'clamp(36px, 5.6vw, 84px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  margin: '0 0 24px 0',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {title}
              </h1>
              <div
                aria-hidden="true"
                style={{
                  height: 2,
                  width: 64,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${theme.accentSoft} 0%, ${theme.accent} 100%)`,
                  marginBottom: 28,
                }}
              />
              <p
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 'clamp(17px, 1.5vw, 22px)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  margin: '0 0 16px 0',
                  maxWidth: 560,
                }}
              >
                {subtitle}
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 'clamp(14px, 1.15vw, 16px)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 540,
                }}
              >
                {overview}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <HeroMotif theme={theme} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="relative overflow-hidden" style={{ background: '#07091A' }}>
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {extras.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 'clamp(28px, 4vw, 56px)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'transparent',
                    WebkitTextStroke: `1px ${theme.accentSoft}`,
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why this matters ── */}
      <section className="bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel text={t.whyThisMatters ?? 'Why this matters'} />
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  margin: '24px 0 0 0',
                  maxWidth: 'clamp(420px, 90%, 720px)',
                  textWrap: 'balance',
                  textDecoration: 'none',
                }}
              >
                {headline}
              </h2>
            </div>
            <div className="lg:pt-8">
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  lineHeight: 1.7,
                  margin: 0,
                  marginBottom: 24,
                }}
              >
                {introBody}
              </p>
              <div
                className="inline-flex items-center gap-3 rounded-xl"
                style={{
                  padding: 'clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 22px)',
                  background: `${theme.accent}10`,
                  border: `1px solid ${theme.accent}33`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${theme.accent}1A`,
                    border: `1px solid ${theme.accent}55`,
                    color: theme.accent,
                  }}
                >
                  <theme.Icon size={18} strokeWidth={1.6} />
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: theme.accent,
                  }}
                >
                  {introTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.whatYouGet ?? 'What you get'} />
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: '20px',
              marginBottom: 'clamp(28px, 3.5vw, 48px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.whatMonkDBUnlocksFor ?? 'What MonkDB unlocks for'}{' '}
            <span style={{ color: theme.accent, fontWeight: 400 }}>
              {title.toLowerCase()}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {item.capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="rounded-2xl overflow-hidden card-surface"
              >
                <div
                  className="flex items-center justify-between"
                  style={{ padding: 'clamp(18px, 1.8vw, 22px) clamp(20px, 2vw, 24px) 0' }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: `${theme.accent}1A`,
                      border: `1px solid ${theme.accent}55`,
                      color: theme.accent,
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      color: 'rgba(10,34,128,0.45)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / 0{item.capabilities.length}
                  </span>
                </div>
                <div
                  style={{
                    padding:
                      'clamp(14px, 1.4vw, 18px) clamp(20px, 2vw, 24px) clamp(18px, 1.8vw, 22px)',
                  }}
                >
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        className="relative overflow-hidden py-10 sm:py-14 lg:py-20"
        style={{
          background: 'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${theme.accentSoft}15 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text={t.howItWorks ?? 'How it works'} variant="dark" />
          <h2
            className="text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginTop: '20px',
              marginBottom: 'clamp(28px, 3.5vw, 48px)',
              maxWidth: 'clamp(580px, 75vw, 1040px)',
              textWrap: 'balance',
              textDecoration: 'none',
            }}
          >
            {t.threeStepsPart1 ?? 'Three steps,'}{' '}
            <span style={{ color: theme.accentSoft, fontWeight: 400 }}>
              {t.threeStepsAccent ?? 'one continuous loop'}
            </span>
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div
              aria-hidden="true"
              className="absolute pointer-events-none hidden md:block"
              style={{
                top: 'clamp(28px, 3.6vw, 44px)',
                left: '12%',
                right: '12%',
                height: 1,
                background: `linear-gradient(90deg, transparent 0%, ${theme.accentSoft}55 15%, ${theme.accent} 50%, ${theme.accentSoft}55 85%, transparent 100%)`,
              }}
            />
            {extras.steps.map((step, i) => (
              <motion.div
                key={step.tag}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE }}
                className="relative flex flex-col rounded-2xl"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${theme.accent}33`,
                  padding: 'clamp(22px, 2.4vw, 28px)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="relative inline-flex mb-5">
                  <div
                    className="inline-flex items-center justify-center rounded-full text-white"
                    style={{
                      width: 'clamp(48px, 5vw, 64px)',
                      height: 'clamp(48px, 5vw, 64px)',
                      background:
                        i === 0
                          ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}CC 100%)`
                          : 'linear-gradient(135deg, #1A38E8 0%, #0A2280 100%)',
                      border: `1px solid ${theme.accent}99`,
                      boxShadow: `0 12px 28px ${theme.accent}33`,
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {step.tag}
                  </div>
                  <span
                    className="absolute -top-2 -right-2 inline-flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(7,9,26,0.95)',
                      border: `1px solid ${theme.accent}99`,
                      color: theme.accent,
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3
                  className="text-white"
                  style={{
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.25,
                    margin: '0 0 10px 0',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 'clamp(13px, 1vw, 14.5px)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer proof ── */}
      <section className="bg-white dark:bg-[#0f1623] py-10 sm:py-14 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 lg:gap-16 items-start">
            <motion.figure
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -8,
                  left: -12,
                  fontSize: 'clamp(80px, 10vw, 130px)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: `${theme.accent}30`,
                  fontFamily: 'serif',
                }}
              >
                &ldquo;
              </span>
              <blockquote
                className="text-[#0A2280] dark:text-white"
                style={{
                  fontSize: 'clamp(22px, 2.6vw, 38px)',
                  fontWeight: 300,
                  lineHeight: 1.35,
                  letterSpacing: '-0.012em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                {extras.proof.quote}
              </blockquote>
              <figcaption
                className="mt-8 flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'rgba(10,34,128,0.65)',
                }}
              >
                <span style={{ width: 32, height: 1, background: theme.accent }} />
                {extras.proof.attribution}
              </figcaption>
            </motion.figure>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
                border: `1px solid ${theme.accent}55`,
                boxShadow: `0 20px 50px ${theme.accent}22`,
              }}
            >
              <div
                style={{
                  padding: 'clamp(20px, 2.4vw, 28px) clamp(22px, 2.6vw, 32px)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: theme.accentSoft,
                  }}
                >
                  {t.outcomeInNumbers ?? 'Outcome in numbers'}
                </span>
              </div>
              <ul
                className="grid grid-cols-1"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {extras.proof.metrics.map((m, i) => (
                  <li
                    key={m.label}
                    className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] items-baseline"
                    style={{
                      padding:
                        'clamp(18px, 2.2vw, 26px) clamp(22px, 2.6vw, 32px)',
                      borderTop:
                        i === 0
                          ? `1px solid ${theme.accent}33`
                          : `1px solid ${theme.accent}22`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 'clamp(28px, 3vw, 44px)',
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        color: 'transparent',
                        WebkitTextStroke: `1px ${theme.accentSoft}`,
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                        lineHeight: 1.45,
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {m.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Other industries ── */}
      {related.length > 0 && (
        <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-10 sm:py-14 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text={t.otherIndustries ?? 'Other industries'} />
            <h2
              className="text-gray-900 dark:text-white"
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginTop: '20px',
                marginBottom: 'clamp(28px, 3.5vw, 48px)',
                maxWidth: 'clamp(580px, 75vw, 1040px)',
                textWrap: 'balance',
                textDecoration: 'none',
              }}
            >
              {t.otherVerticalsHeadlinePart1 ?? 'Other verticals,'}{' '}
              <span style={{ color: theme.accent, fontWeight: 400 }}>
                {t.otherVerticalsHeadlineAccent ?? 'same engine'}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {related.map((r, i) => (
                <motion.a
                  key={r.title}
                  href={r.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="ind-related group block rounded-2xl card-surface"
                  style={{
                    padding: 'clamp(20px, 2.2vw, 26px)',
                    textDecoration: 'none',
                    transition:
                      'border-color 350ms ease, box-shadow 350ms ease, transform 350ms ease',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-2"
                      style={{
                        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: theme.accent,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: theme.accent,
                        }}
                      />
                      {t.industryTag ?? 'Industry'}
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.6}
                      className="ind-related-arrow"
                      style={{ color: theme.accent }}
                    />
                  </div>
                  <h3
                    className="text-[#0A2280] dark:text-white"
                    style={{
                      fontSize: 'clamp(17px, 1.5vw, 22px)',
                      fontWeight: 500,
                      letterSpacing: '-0.005em',
                      lineHeight: 1.25,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 14.5px)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {r.body}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner heading={ctaHeading} />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.ind-related:hover) {
          border-color: ${theme.accent}55 !important;
          box-shadow: 0 18px 42px ${theme.accent}1A;
          transform: translateY(-3px);
        }
        :global(.ind-related:hover .ind-related-arrow) {
          transform: translateX(4px);
          transition: transform 280ms ease;
        }
      `}</style>
    </main>
  )
}
