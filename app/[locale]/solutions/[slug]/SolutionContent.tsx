'use client'

/**
 * SolutionContent — bespoke detail page for the 10 Solutions.
 * Each solution gets a distinct theme: accent color, hero gradient,
 * hero motif. Content from `content/solutions.ts`
 * (sourced from Website content part II.docx, lines 126–226).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  Activity,
  Layers,
  LineChart,
  Zap,
  Gauge,
  Copy,
  Cpu,
  ArrowRightLeft,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTABanner from '@/components/CTABanner'
import SectionLabel from '@/components/SectionLabel'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import type { Solution } from '@/content/solutions'

const EASE = [0.165, 0.84, 0.44, 1] as const

type SlugKey =
  | 'ai-ml'
  | 'real-time-streaming'
  | 'iceberg-tables'
  | 'real-time-operational-intelligence'
  | 'autonomous-decisioning-systems'
  | 'energy-and-resource-optimization'
  | 'digital-twin-and-simulation'
  | 'edge-intelligence-and-distributed-ai'
  | 'data-and-ai-modernization'
  | 'ai-governance-and-trust'

type MotifKey =
  | 'neural'
  | 'wave'
  | 'layers'
  | 'pulseBars'
  | 'trigger'
  | 'gauge'
  | 'twin'
  | 'mesh'
  | 'migration'
  | 'shield'

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
  'ai-ml': {
    index: '01',
    accent: '#1A38E8',
    accentSoft: '#7FB3FF',
    Icon: Brain,
    heroGradient: 'linear-gradient(160deg, #050D6A 0%, #1A38E8 55%, #0f1623 100%)',
    motif: 'neural',
    centerLabel: 'AI · LIVE',
  },
  'real-time-streaming': {
    index: '02',
    accent: '#1E8AFF',
    accentSoft: '#7FB3FF',
    Icon: Activity,
    heroGradient: 'linear-gradient(160deg, #06245E 0%, #0F3D8C 55%, #0f1623 100%)',
    motif: 'wave',
    centerLabel: 'STREAM',
  },
  'iceberg-tables': {
    index: '03',
    accent: '#1E8AFF',
    accentSoft: '#7FB3FF',
    Icon: Layers,
    heroGradient: 'linear-gradient(160deg, #0C1F4A 0%, #0033A0 55%, #0f1623 100%)',
    motif: 'layers',
    centerLabel: 'LAKEHOUSE',
  },
  'real-time-operational-intelligence': {
    index: '04',
    accent: '#1A38E8',
    accentSoft: '#7FB3FF',
    Icon: LineChart,
    heroGradient: 'linear-gradient(160deg, #050D6A 0%, #1E3A8A 55%, #0f1623 100%)',
    motif: 'pulseBars',
    centerLabel: 'LIVE OPS',
  },
  'autonomous-decisioning-systems': {
    index: '05',
    accent: '#0033A0',
    accentSoft: '#7FB3FF',
    Icon: Zap,
    heroGradient: 'linear-gradient(160deg, #060E58 0%, #0033A0 55%, #0f1623 100%)',
    motif: 'trigger',
    centerLabel: 'AUTO',
  },
  'energy-and-resource-optimization': {
    index: '06',
    accent: '#0033A0',
    accentSoft: '#7FB3FF',
    Icon: Gauge,
    heroGradient: 'linear-gradient(160deg, #050D6A 0%, #0033A0 55%, #0f1623 100%)',
    motif: 'gauge',
    centerLabel: 'OPTIMIZE',
  },
  'digital-twin-and-simulation': {
    index: '07',
    accent: '#1A38E8',
    accentSoft: '#7FB3FF',
    Icon: Copy,
    heroGradient: 'linear-gradient(160deg, #050D6A 0%, #0A2280 55%, #0f1623 100%)',
    motif: 'twin',
    centerLabel: 'TWIN',
  },
  'edge-intelligence-and-distributed-ai': {
    index: '08',
    accent: '#1E8AFF',
    accentSoft: '#7FB3FF',
    Icon: Cpu,
    heroGradient: 'linear-gradient(160deg, #0C1F4A 0%, #0033A0 55%, #0f1623 100%)',
    motif: 'mesh',
    centerLabel: 'EDGE AI',
  },
  'data-and-ai-modernization': {
    index: '09',
    accent: '#1E8AFF',
    accentSoft: '#7FB3FF',
    Icon: ArrowRightLeft,
    heroGradient: 'linear-gradient(160deg, #0C1F4A 0%, #1A38E8 55%, #0f1623 100%)',
    motif: 'migration',
    centerLabel: 'MODERN',
  },
  'ai-governance-and-trust': {
    index: '10',
    accent: '#0033A0',
    accentSoft: '#7FB3FF',
    Icon: ShieldCheck,
    heroGradient: 'linear-gradient(160deg, #050D6A 0%, #0A2280 55%, #0f1623 100%)',
    motif: 'shield',
    centerLabel: 'TRUST',
  },
}

/* ── Per-solution enterprise depth: stats, how-it-works, proof ────────── */

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
  'ai-ml': {
    stats: [
      { value: '<5 ms', label: 'Inference latency on live state' },
      { value: '0', label: 'External pipelines to maintain' },
      { value: '1', label: 'Surface for SQL + vector + features' },
      { value: '∞', label: 'Models running on the same plane' },
    ],
    steps: [
      {
        tag: 'TRAIN',
        title: 'Train on continuously updated data',
        body: 'No batch windows. Models retrain on the latest state with no snapshot drift.',
      },
      {
        tag: 'SERVE',
        title: 'Serve inside the engine',
        body: 'Inference runs alongside SQL and vector retrieval. No data movement to a model server.',
      },
      {
        tag: 'OBSERVE',
        title: 'Close the feedback loop',
        body: 'Live outcomes flow back into the same store. Drift is observed, not surprised.',
      },
    ],
    proof: {
      quote:
        'We collapsed our feature store, vector DB, and serving stack into MonkDB. Models now retrain hourly on production data, not last week’s extract.',
      attribution: 'VP of ML Platform, Tier-1 Bank',
      metrics: [
        { value: '4×', label: 'Retraining frequency' },
        { value: '60%', label: 'Pipeline systems retired' },
        { value: '<5 ms', label: 'P99 inference latency' },
      ],
    },
  },
  'real-time-streaming': {
    stats: [
      { value: '<1 ms', label: 'End-to-end ingest to query' },
      { value: '1 M+', label: 'Events per second per node' },
      { value: '0', label: 'Buffering / staging layers' },
      { value: 'In-flight', label: 'Pattern detection' },
    ],
    steps: [
      {
        tag: 'INGEST',
        title: 'Continuous ingestion at line rate',
        body: 'Streams, events, logs, and transactions land directly in the query engine.',
      },
      {
        tag: 'PROCESS',
        title: 'Detect patterns in flight',
        body: 'Aggregations, anomaly checks, and joins run on the live stream and historical state.',
      },
      {
        tag: 'ACT',
        title: 'Trigger the next action',
        body: 'Decisions land in the systems that operate the business, not on a dashboard.',
      },
    ],
    proof: {
      quote:
        'Latency dropped from minutes to single-digit milliseconds. We retired Kafka + Flink + a cache layer. Operators see live state, not a delayed projection.',
      attribution: 'Head of Real-Time Platform, Logistics Co.',
      metrics: [
        { value: '8×', label: 'Faster time-to-decision' },
        { value: '3', label: 'Stack tiers collapsed' },
        { value: '<1 ms', label: 'Pipeline latency' },
      ],
    },
  },
  'iceberg-tables': {
    stats: [
      { value: 'Open', label: 'Apache Iceberg native format' },
      { value: '1', label: 'Engine for lake + lakehouse + ops' },
      { value: '0', label: 'Lock-in to a query vendor' },
      { value: 'PB+', label: 'Scale tested in production' },
    ],
    steps: [
      {
        tag: 'STORE',
        title: 'Open lakehouse, no movement',
        body: 'Data lives in your object store as Iceberg tables. MonkDB reads it natively.',
      },
      {
        tag: 'EVOLVE',
        title: 'Schema and partition evolution',
        body: 'Time-travel, version history, and zero-downtime schema changes are first-class.',
      },
      {
        tag: 'SERVE',
        title: 'Query alongside live state',
        body: 'Historical lake data joins live tables in one SQL surface. No federation hop.',
      },
    ],
    proof: {
      quote:
        'We kept our existing lake and added MonkDB on top. The same Iceberg tables now serve operational queries and analytics from one engine.',
      attribution: 'Head of Data Platform, Insurance Group',
      metrics: [
        { value: '0', label: 'Data migration required' },
        { value: '5×', label: 'Faster lake queries' },
        { value: 'PB', label: 'Production scale' },
      ],
    },
  },
  'real-time-operational-intelligence': {
    stats: [
      { value: '<2 s', label: 'Dashboard freshness' },
      { value: '24/7', label: 'Continuous KPI monitoring' },
      { value: 'Auto', label: 'Anomaly detection' },
      { value: '1', label: 'Source of operational truth' },
    ],
    steps: [
      {
        tag: 'OBSERVE',
        title: 'Live state of every operation',
        body: 'Every event from every system lands in MonkDB and updates KPIs in flight.',
      },
      {
        tag: 'DETECT',
        title: 'Spot deviations the moment they occur',
        body: 'Statistical and AI-driven detection runs continuously, not on a refresh schedule.',
      },
      {
        tag: 'RESPOND',
        title: 'Automate the response',
        body: 'Trigger workflows, alerts, and corrective actions from inside the engine.',
      },
    ],
    proof: {
      quote:
        'Operations now sees deviations in seconds, not after the morning batch. Mean time to detect dropped from 22 minutes to under 30 seconds.',
      attribution: 'VP of Operations, Industrial Group',
      metrics: [
        { value: '44×', label: 'Faster deviation detection' },
        { value: '99.99%', label: 'Dashboard uptime' },
        { value: '<2 s', label: 'KPI freshness' },
      ],
    },
  },
  'autonomous-decisioning-systems': {
    stats: [
      { value: '<5 ms', label: 'Decision-to-action loop' },
      { value: '24/7', label: 'Always-on policy' },
      { value: 'AI + Rules', label: 'Hybrid decisioning' },
      { value: 'In-engine', label: 'No external orchestrator' },
    ],
    steps: [
      {
        tag: 'SENSE',
        title: 'Continuous signal capture',
        body: 'Events, transactions, and sensor data feed the decisioning loop in real time.',
      },
      {
        tag: 'DECIDE',
        title: 'Hybrid AI + rule evaluation',
        body: 'Models and policy run in the same execution path with full lineage.',
      },
      {
        tag: 'EXECUTE',
        title: 'Action in milliseconds',
        body: 'Approve, reroute, dispatch, or remediate from inside the engine. No orchestrator hop.',
      },
    ],
    proof: {
      quote:
        'Decisions that took a workflow engine and three queues now happen inside MonkDB in single-digit milliseconds. Audit lineage is end-to-end.',
      attribution: 'CTO, Payments Platform',
      metrics: [
        { value: '20×', label: 'Faster decisions' },
        { value: '0', label: 'External orchestrators' },
        { value: '100%', label: 'Decisions with lineage' },
      ],
    },
  },
  'energy-and-resource-optimization': {
    stats: [
      { value: '20–40%', label: 'Typical energy savings' },
      { value: '<1 s', label: 'Control loop latency' },
      { value: '24/7', label: 'Continuous optimization' },
      { value: 'PLC + IT', label: 'OT/IT data unified' },
    ],
    steps: [
      {
        tag: 'METER',
        title: 'Live consumption telemetry',
        body: 'Sensors, meters, and SCADA streams feed MonkDB at line rate.',
      },
      {
        tag: 'PREDICT',
        title: 'Forecast and optimize',
        body: 'Predictive models run on live state to forecast demand and find waste.',
      },
      {
        tag: 'CONTROL',
        title: 'Close the loop',
        body: 'Setpoint adjustments and schedule changes execute from inside the engine.',
      },
    ],
    proof: {
      quote:
        'We cut energy spend 28% in the first year. The same engine ingests SCADA, runs the optimization models, and pushes setpoints back to the floor.',
      attribution: 'VP of Sustainability, Steel Manufacturer',
      metrics: [
        { value: '28%', label: 'Energy savings, year 1' },
        { value: '<1 s', label: 'Control latency' },
        { value: '12', label: 'Plants live' },
      ],
    },
  },
  'digital-twin-and-simulation': {
    stats: [
      { value: '1:1', label: 'Live mirror of physical state' },
      { value: '<1 s', label: 'State sync latency' },
      { value: '∞', label: 'What-if simulations' },
      { value: 'Same', label: 'Engine for twin and ops' },
    ],
    steps: [
      {
        tag: 'MIRROR',
        title: 'Continuous state sync',
        body: 'Physical asset telemetry updates the digital twin in flight, not on schedule.',
      },
      {
        tag: 'SIMULATE',
        title: 'Run what-ifs on live state',
        body: 'Predictive simulations execute on the current twin without snapshot exports.',
      },
      {
        tag: 'ACT',
        title: 'Apply the best outcome',
        body: 'Simulation result triggers a control action on the physical system.',
      },
    ],
    proof: {
      quote:
        'Our refinery twin now updates every second from 9,000 sensors. Simulations that took a week of batch ETL now run on live state in minutes.',
      attribution: 'Head of Digital Operations, Energy Major',
      metrics: [
        { value: '9 K', label: 'Sensors synced live' },
        { value: '1 s', label: 'State sync interval' },
        { value: '5×', label: 'Faster simulation cycles' },
      ],
    },
  },
  'edge-intelligence-and-distributed-ai': {
    stats: [
      { value: '<1 ms', label: 'Local decision latency' },
      { value: 'Offline', label: 'First-class capability' },
      { value: 'Same', label: 'Binary on every node' },
      { value: 'ARM + x86', label: 'Anywhere it runs' },
    ],
    steps: [
      {
        tag: 'CAPTURE',
        title: 'Sense and store at the edge',
        body: 'Data is captured locally with no broker or buffering layer.',
      },
      {
        tag: 'DECIDE',
        title: 'Inference and rules locally',
        body: 'AI runs at the source. Decisions happen even when the cloud is unreachable.',
      },
      {
        tag: 'SYNC',
        title: 'Reconcile with the cloud',
        body: 'On reconnect, edge state syncs to the central engine with conflict-aware merging.',
      },
    ],
    proof: {
      quote:
        'During a six-hour cloud outage, every plant kept running. Operators barely noticed because the engine never left the floor.',
      attribution: 'Plant Operations Lead, Forge Steel',
      metrics: [
        { value: '6 h', label: 'Outage rode through' },
        { value: '12 K', label: 'Edge nodes in production' },
        { value: 'Same', label: 'Binary as cloud' },
      ],
    },
  },
  'data-and-ai-modernization': {
    stats: [
      { value: '5×', label: 'Systems retired typically' },
      { value: '70%', label: 'Pipeline glue removed' },
      { value: '1 quarter', label: 'Time-to-ROI' },
      { value: '0', label: 'Vendor lock-in' },
    ],
    steps: [
      {
        tag: 'ASSESS',
        title: 'Map the legacy stack',
        body: 'Identify the 5–7 systems and ETL paths MonkDB can collapse into one engine.',
      },
      {
        tag: 'MIGRATE',
        title: 'Replace, do not retro-fit',
        body: 'Replatform onto a single binary. Open Iceberg formats keep your data portable.',
      },
      {
        tag: 'OPERATE',
        title: 'Run on one plane',
        body: 'Operational, analytical, vector, and streaming workloads share one engine and one SLA.',
      },
    ],
    proof: {
      quote:
        'We retired four systems and a CDC layer in one quarter. Latency dropped, on-call burden dropped, cost dropped. The team is shipping product, not maintaining glue.',
      attribution: 'Head of Platform Engineering, Tier-1 Bank',
      metrics: [
        { value: '4', label: 'Systems retired' },
        { value: '70%', label: 'Less glue code' },
        { value: '<1 quarter', label: 'Replatform window' },
      ],
    },
  },
  'ai-governance-and-trust': {
    stats: [
      { value: '100%', label: 'Queries with lineage' },
      { value: 'Kernel', label: 'Where policy enforces' },
      { value: 'Audit-grade', label: 'By default, not bolted on' },
      { value: 'Sovereign', label: 'Cloud, on-prem, edge' },
    ],
    steps: [
      {
        tag: 'IDENTITY',
        title: 'Authenticate every query',
        body: 'RBAC, ABAC, and short-lived tokens enforced before a single byte is read.',
      },
      {
        tag: 'POLICY',
        title: 'Govern at the kernel',
        body: 'Residency, retention, and access policy run inside the engine, not in a sidecar.',
      },
      {
        tag: 'AUDIT',
        title: 'End-to-end lineage',
        body: 'Every transformation, every model output, every action is traceable.',
      },
    ],
    proof: {
      quote:
        'Audit went from a quarterly fire drill to a continuous, queryable record. Compliance stopped being a project and started being a property of the system.',
      attribution: 'Chief Compliance Officer, Insurance Group',
      metrics: [
        { value: '100%', label: 'Lineage coverage' },
        { value: '0', label: 'Audit prep weeks' },
        { value: 'SOC 2', label: 'Type II compliant' },
      ],
    },
  },
}

/* ── Motifs ──────────────────────────────────────────────────────────── */

function MotifWrapper({
  children,
}: {
  children: React.ReactNode
}) {
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
        boxShadow: `0 0 70px ${theme.accent}66, inset 0 1px 0 rgba(255,255,255,0.18)`,
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

function NeuralMotif({ theme }: { theme: Theme }) {
  const nodes = [
    { x: 14, y: 26 },
    { x: 86, y: 26 },
    { x: 8, y: 50 },
    { x: 92, y: 50 },
    { x: 16, y: 76 },
    { x: 84, y: 76 },
  ]
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2="50"
            y2="50"
            stroke={`${theme.accentSoft}66`}
            strokeWidth="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: i * 0.1 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r="1.6"
            fill={theme.accent}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
      <CenterCore theme={theme} />
    </MotifWrapper>
  )
}

function WaveMotif({ theme }: { theme: Theme }) {
  return (
    <MotifWrapper>
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M 20 ${200 - i * 6} Q 110 ${140 - i * 8}, 200 ${200 - i * 6} T 380 ${200 - i * 6}`}
            stroke={i === 0 ? theme.accent : `${theme.accentSoft}55`}
            strokeWidth={i === 0 ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: i * 0.18, ease: EASE }}
          />
        ))}
        {[0, 0.7, 1.4].map((d, i) => (
          <motion.circle
            key={i}
            r="5"
            fill={theme.accent}
            initial={{ opacity: 0 }}
            animate={{ cx: [20, 380], cy: [200, 200], opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, delay: d, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
    </MotifWrapper>
  )
}

function LayersMotif({ theme }: { theme: Theme }) {
  /* Stacked iceberg slabs */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '14% 18%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        {[
          { w: '90%', label: 'METADATA' },
          { w: '78%', label: 'PARQUET' },
          { w: '68%', label: 'SNAPSHOT' },
          { w: '52%', label: 'MANIFEST' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            style={{
              width: s.w,
              height: 36,
              borderRadius: 8,
              background: `${theme.accent}1A`,
              border: `1px solid ${theme.accent}66`,
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 14px',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: theme.accentSoft,
            }}
          >
            <span>{s.label}</span>
            <Layers size={14} strokeWidth={1.6} style={{ color: theme.accent }} />
          </motion.div>
        ))}
      </div>
    </MotifWrapper>
  )
}

function PulseBarsMotif({ theme }: { theme: Theme }) {
  /* Live ops dashboard — bars + KPI */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          inset: '14% 14% 14% 14%',
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
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: theme.accentSoft,
            }}
          >
            {theme.centerLabel}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 10,
              color: theme.accent,
            }}
          >
            ● LIVE
          </span>
        </div>
        {[
          { label: 'INGEST', val: '92%' },
          { label: 'DECIDE', val: '78%' },
          { label: 'EXECUTE', val: '85%' },
          { label: 'LEARN', val: '64%' },
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
              style={{
                height: 5,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
              }}
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

function TriggerMotif({ theme }: { theme: Theme }) {
  /* Auto-trigger: signal → arrow → action */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 30 200 L 370 200"
          stroke={theme.accentSoft}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4 }}
        />
        {[0, 0.6, 1.2].map((d, i) => (
          <motion.circle
            key={i}
            r="6"
            fill={theme.accent}
            initial={{ opacity: 0 }}
            animate={{ cx: [30, 370], cy: [200, 200], opacity: [0, 1, 0] }}
            transition={{ duration: 2.0, delay: d, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '5%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}99`,
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          color: theme.accentSoft,
          letterSpacing: '0.14em',
          flexDirection: 'column',
        }}
      >
        <Activity size={20} strokeWidth={1.5} style={{ color: theme.accent }} />
        <span style={{ marginTop: 4 }}>SIGNAL</span>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: '5%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(0,0,0,0.4) 100%)`,
          border: `1px solid ${theme.accentSoft}`,
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          fontWeight: 600,
          color: 'white',
          letterSpacing: '0.14em',
          flexDirection: 'column',
        }}
      >
        <Zap size={20} strokeWidth={1.5} />
        <span style={{ marginTop: 4 }}>ACTION</span>
      </div>
    </MotifWrapper>
  )
}

function GaugeMotif({ theme }: { theme: Theme }) {
  /* Half-circle gauge */
  return (
    <MotifWrapper>
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full">
        <path
          d="M 30 110 A 70 70 0 0 1 170 110"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          d="M 30 110 A 70 70 0 0 1 170 110"
          stroke={theme.accent}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.78 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <motion.circle
          cx="100"
          cy="110"
          r="10"
          fill={theme.accent}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
        />
      </svg>
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, 0)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: theme.accent,
            lineHeight: 1,
          }}
        >
          78%
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: theme.accentSoft,
            marginTop: 8,
          }}
        >
          OPTIMIZED
        </div>
      </div>
    </MotifWrapper>
  )
}

function TwinMotif({ theme }: { theme: Theme }) {
  /* Two mirrored cores connected by a sync bar */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          left: '8%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 120,
          height: 120,
          borderRadius: 14,
          background: 'rgba(7,9,26,0.85)',
          border: `1px solid ${theme.accent}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <Cpu size={26} strokeWidth={1.5} style={{ color: theme.accent }} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: theme.accentSoft,
            marginTop: 6,
          }}
        >
          PHYSICAL
        </span>
      </div>
      <div
        className="absolute"
        style={{
          right: '8%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 120,
          height: 120,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${theme.accent}33 0%, rgba(0,0,0,0.4) 100%)`,
          border: `1px solid ${theme.accentSoft}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          boxShadow: `0 0 60px ${theme.accent}55`,
        }}
      >
        <Copy size={26} strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: theme.accentSoft,
            marginTop: 6,
          }}
        >
          DIGITAL TWIN
        </span>
      </div>
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="160"
          y1="200"
          x2="240"
          y2="200"
          stroke={theme.accent}
          strokeWidth="2"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0 }}
        />
        {[0, 0.6, 1.2].map((d, i) => (
          <motion.circle
            key={`p-${i}`}
            r="4"
            fill={theme.accentSoft}
            initial={{ opacity: 0 }}
            animate={{ cx: [160, 240, 160], cy: [200, 200, 200], opacity: [0, 1, 0] }}
            transition={{ duration: 2.0, delay: d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </MotifWrapper>
  )
}

function MeshMotif({ theme }: { theme: Theme }) {
  const nodes = [
    { x: 15, y: 25 },
    { x: 75, y: 18 },
    { x: 22, y: 78 },
    { x: 80, y: 78 },
  ]
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2="50"
            y2="50"
            stroke={`${theme.accentSoft}88`}
            strokeWidth="0.3"
            strokeDasharray="2 1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: i * 0.1 }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          className="absolute"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'rgba(7,9,26,0.85)',
            border: `1px solid ${theme.accent}99`,
            borderRadius: 10,
            padding: '6px 10px',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: theme.accentSoft,
          }}
        >
          EDGE
        </motion.div>
      ))}
      <CenterCore theme={theme} diameter="38%" />
    </MotifWrapper>
  )
}

function MigrationMotif({ theme }: { theme: Theme }) {
  /* Old stack → new MonkDB */
  return (
    <MotifWrapper>
      <div
        className="absolute"
        style={{
          left: '8%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 110,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {['LEGACY DB', 'WAREHOUSE', 'VECTOR', 'STREAM'].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.55, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
              opacity: 0.7,
            }}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M 150 200 L 280 200"
          stroke={theme.accent}
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={theme.accent} />
          </marker>
        </defs>
      </svg>
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: '10%',
          top: '50%',
          transform: 'translate(0, -50%)',
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.accent} 0%, rgba(0,0,0,0.4) 100%)`,
          border: `1px solid ${theme.accentSoft}`,
          flexDirection: 'column',
          color: 'white',
          boxShadow: `0 0 60px ${theme.accent}55`,
        }}
      >
        <ArrowRightLeft size={26} strokeWidth={1.5} />
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
          MONKDB
        </span>
      </div>
    </MotifWrapper>
  )
}

function ShieldMotif({ theme }: { theme: Theme }) {
  return (
    <MotifWrapper>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {[42, 36, 30].map((r, i) => (
          <motion.polygon
            key={i}
            points={Array.from({ length: 6 }, (_, j) => {
              const a = ((j * 60 - 90) * Math.PI) / 180
              return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`
            }).join(' ')}
            stroke={`${theme.accentSoft}${i === 0 ? '99' : '55'}`}
            strokeWidth={i === 0 ? '0.6' : '0.3'}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <CenterCore theme={theme} />
    </MotifWrapper>
  )
}

function HeroMotif({ theme }: { theme: Theme }) {
  switch (theme.motif) {
    case 'neural':
      return <NeuralMotif theme={theme} />
    case 'wave':
      return <WaveMotif theme={theme} />
    case 'layers':
      return <LayersMotif theme={theme} />
    case 'pulseBars':
      return <PulseBarsMotif theme={theme} />
    case 'trigger':
      return <TriggerMotif theme={theme} />
    case 'gauge':
      return <GaugeMotif theme={theme} />
    case 'twin':
      return <TwinMotif theme={theme} />
    case 'mesh':
      return <MeshMotif theme={theme} />
    case 'migration':
      return <MigrationMotif theme={theme} />
    case 'shield':
      return <ShieldMotif theme={theme} />
  }
}

/* ── Main bespoke Solution page ──────────────────────────────────────── */

export default function SolutionContent({
  item,
  related,
}: {
  item: Solution
  related: { title: string; body: string; href: string }[]
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const theme = THEMES[item.slug as SlugKey] ?? THEMES['ai-ml']
  const extras = EXTRAS[item.slug as SlugKey] ?? EXTRAS['ai-ml']

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
                Solution · {theme.index}
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
                {item.title}
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
                {item.subtitle}
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
                {item.overview}
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

      {/* ── Stats strip — by the numbers ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#07091A' }}
      >
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
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: theme.accentSoft,
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
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-start">
            <div>
              <SectionLabel text="Why this matters" />
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
                {item.headline}
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
                {item.introBody}
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
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: theme.accent,
                      marginBottom: 2,
                    }}
                  >
                    {item.introTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities — uniform dense cards ── */}
      <section className="bg-[#F8F4F0] dark:bg-[#0A1326] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <SectionLabel text="What you get" />
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
            What MonkDB makes possible for{' '}
            <span style={{ color: theme.accent, fontWeight: 400 }}>
              {item.title.toLowerCase()}
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
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
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
                      fontWeight: 400,
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

      {/* ── How it works — 3-step flow ── */}
      <section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background:
            'linear-gradient(180deg, #050D6A 0%, #07091A 60%, #050D6A 100%)',
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
          <SectionLabel text="How it works" variant="dark" />
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
            Three steps,{' '}
            <span style={{ color: theme.accentSoft, fontWeight: 400 }}>
              one continuous loop
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
                    fontWeight: 400,
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

      {/* ── Customer proof — quote + numbers ── */}
      <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
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
                <span
                  style={{ width: 32, height: 1, background: theme.accent }}
                />
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
                  Outcome in numbers
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
                        fontFamily:
                          'var(--font-mono, ui-monospace, monospace)',
                        fontSize: 'clamp(28px, 3vw, 44px)',
                        fontWeight: 500,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: theme.accentSoft,
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(12.5px, 0.95vw, 14px)',
                        fontWeight: 400,
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

      {/* ── Related Solutions ── */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-[#0f1623] py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
            <SectionLabel text="Other solutions" />
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
              More ways to put MonkDB to work,{' '}
              <span style={{ color: theme.accent, fontWeight: 400 }}>
                in your domain
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
                  className="sol-related group block rounded-2xl card-surface"
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
                      Solution
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.6}
                      className="sol-related-arrow"
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

      <CTABanner heading={item.ctaHeading} />
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        :global(.sol-related:hover) {
          border-color: ${theme.accent}55 !important;
          box-shadow: 0 18px 42px ${theme.accent}1A;
          transform: translateY(-3px);
        }
        :global(.sol-related:hover .sol-related-arrow) {
          transform: translateX(4px);
          transition: transform 280ms ease;
        }
      `}</style>
    </main>
  )
}
