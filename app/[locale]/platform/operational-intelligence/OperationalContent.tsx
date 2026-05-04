'use client'

import DetailPageLayout, {
  type CapabilityCard,
  type DetailSection,
} from '@/components/DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function OperationalContent() {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all.platformOperational) ?? {}) as Record<string, string>
  const cta = ((all.detailCommon) ?? {}) as Record<string, string>

  const capabilities: CapabilityCard[] = []
  for (let i = 1; i <= 6; i++) {
    const title = t[`cap${i}Title`]
    const body = t[`cap${i}Body`]
    if (title && body) capabilities.push({ title, body })
  }
  if (capabilities.length === 0) {
    capabilities.push(
      {
        title: 'Real-Time Data Ingestion',
        body: 'Capture streams, events, transactions, and signals as they occur, without batching or delays.',
      },
      {
        title: 'Continuous Context Building',
        body: 'AI models and logic operate on live data, maintaining an always-updated understanding of system state.',
      },
      {
        title: 'Instant Decisioning',
        body: 'Insights generated in real time, embedded as actionable intelligence inside operations.',
      },
      {
        title: 'Built-In Execution',
        body: 'Decisions trigger workflows and operational changes immediately, without external dependencies.',
      },
      {
        title: 'Closed-Loop Learning',
        body: 'Every action feeds back into the system, continuously improving intelligence and outcomes.',
      },
    )
  }

  // The "Operational Shift" From → To table is rendered as a custom ReactNode inside
  // a closing section so we keep the existing DetailPageLayout pattern.
  const shifts: { from: string; to: string }[] = []
  for (let i = 1; i <= 6; i++) {
    const f = t[`shift${i}From`]
    const to = t[`shift${i}To`]
    if (f && to) shifts.push({ from: f, to })
  }
  if (shifts.length === 0) {
    shifts.push(
      { from: 'Reports', to: 'Real-time awareness' },
      { from: 'Dashboards', to: 'Continuous intelligence' },
      { from: 'Manual actions', to: 'Automated execution' },
      { from: 'Delayed decisions', to: 'Instant response' },
    )
  }

  const shiftFromLabel = t.shiftFromLabel ?? 'From'
  const shiftToLabel = t.shiftToLabel ?? 'To'

  const shiftTable = (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(10,34,128,0.10)',
        background: 'white',
      }}
    >
      {/* Header row */}
      <div
        className="grid grid-cols-2"
        style={{
          background: '#F8F4F0',
          borderBottom: '1px solid rgba(10,34,128,0.08)',
        }}
      >
        <div
          style={{
            padding: 'clamp(12px, 1.4vw, 16px) clamp(16px, 2vw, 24px)',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(10,34,128,0.55)',
          }}
        >
          {shiftFromLabel}
        </div>
        <div
          style={{
            padding: 'clamp(12px, 1.4vw, 16px) clamp(16px, 2vw, 24px)',
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#1A38E8',
            borderLeft: '1px solid rgba(10,34,128,0.08)',
          }}
        >
          {shiftToLabel}
        </div>
      </div>
      {shifts.map((s, i) => (
        <div
          key={`${s.from}-${s.to}`}
          className="grid grid-cols-2"
          style={{
            borderBottom:
              i < shifts.length - 1
                ? '1px solid rgba(10,34,128,0.06)'
                : 'none',
          }}
        >
          <div
            style={{
              padding:
                'clamp(14px, 1.6vw, 18px) clamp(16px, 2vw, 24px)',
              color: '#6B7280',
              fontSize: 'clamp(13.5px, 1.05vw, 15px)',
              textDecoration: 'line-through',
              textDecorationColor: 'rgba(220,38,38,0.5)',
              textDecorationThickness: '1.5px',
            }}
          >
            {s.from}
          </div>
          <div
            style={{
              padding:
                'clamp(14px, 1.6vw, 18px) clamp(16px, 2vw, 24px)',
              color: '#0A2280',
              fontWeight: 500,
              fontSize: 'clamp(13.5px, 1.05vw, 15px)',
              borderLeft: '1px solid rgba(10,34,128,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#1A38E8',
              }}
            />
            {s.to}
          </div>
        </div>
      ))}
    </div>
  )

  const closingSections: DetailSection[] = [
    {
      eyebrow: t.shiftEyebrow ?? 'Operational Shift',
      title: t.shiftTitle ?? 'From the old way to the operating system of now',
      body: shiftTable,
      variant: 'parchment',
    },
    {
      eyebrow: t.outcomeEyebrow ?? 'The outcome',
      title:
        t.outcomeTitle ??
        'From reactive enterprise to self-optimizing system',
      body:
        t.outcomeBody ??
        'The AI-Native Operational Intelligence System turns enterprises from reactive organizations into continuously adaptive, self-optimizing systems.',
      variant: 'light',
    },
  ]

  return (
    <DetailPageLayout
      title={t.title ?? 'Run Your Business in Real Time'}
      subtitle={
        t.subtitle ?? 'From data to decisions to execution, continuously.'
      }
      sections={[
        {
          eyebrow: t.eyebrowIntro ?? 'Strategic Pillar',
          title:
            t.introTitle ??
            'The AI-Native Operational Intelligence System',
          body:
            t.introBody ??
            'Powered by MonkDB, it moves beyond dashboards and reports, turning data into live operational intelligence that drives immediate action.',
          variant: 'light',
        },
        {
          eyebrow: t.eyebrowProblem ?? 'The gap',
          title:
            t.problemTitle ??
            'Delayed intelligence is the default operating mode',
          body:
            t.problemBody ??
            'Most enterprises operate on delayed intelligence. Data is collected, processed, analyzed, and then acted upon, often across disconnected systems.',
          variant: 'parchment',
        },
      ]}
      capabilities={{
        eyebrow: t.capabilitiesEyebrow ?? 'The continuous loop',
        title: t.capabilitiesTitle ?? 'Five stages, one operating system',
        items: capabilities,
      }}
      closingSections={closingSections}
      ctaHeading={t.ctaHeading ?? 'Run your business in real time.'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
