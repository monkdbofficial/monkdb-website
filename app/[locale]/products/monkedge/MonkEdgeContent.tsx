'use client'

import DetailPageLayout, {
  type CapabilityCard,
} from '@/components/DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function MonkEdgeContent() {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all.monkedge) ?? {}) as Record<string, string>
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
        title: 'Local data ingestion and processing',
        body: 'Capture and process sensor, device, and event data in real time at the source.',
      },
      {
        title: 'Stateful AI at the edge',
        body: 'Maintain continuous context locally, enabling intelligent decisions without dependency on centralized systems.',
      },
      {
        title: 'Autonomous execution',
        body: 'Trigger actions instantly, whether adjusting machine parameters, rerouting vehicles, or responding to anomalies.',
      },
      {
        title: 'Offline-first capability',
        body: 'Continue operating in low-connectivity or disconnected environments. Sync with central systems when available.',
      },
      {
        title: 'Seamless cloud-edge synchronization',
        body: 'Maintain consistency between edge nodes and central MonkDB deployments for unified visibility and control.',
      },
    )
  }

  return (
    <DetailPageLayout
      title={t.title ?? 'MonkEdge'}
      subtitle={
        t.subtitle ??
        'Real-time intelligence and execution at the edge. Sense, decide, and act locally without round trips to the cloud.'
      }
      sections={[
        {
          eyebrow: t.eyebrowIntro ?? 'The shift',
          title: t.introTitle ?? 'Where decisions happen at the source',
          body:
            t.introBody ??
            'MonkEdge extends MonkDB beyond centralized systems, bringing data processing, AI, and execution directly to where data is generated.',
          variant: 'light',
        },
        {
          eyebrow: t.eyebrowProblem ?? 'The problem',
          title:
            t.problemTitle ?? 'Centralized systems cannot meet edge realities',
          body:
            t.problemBody ??
            'Modern systems generate massive volumes of data at the edge. Sending all of it to centralized systems introduces latency, bandwidth constraints, and delayed decision-making.',
          variant: 'parchment',
        },
      ]}
      capabilities={{
        eyebrow: t.capabilitiesEyebrow ?? 'Capabilities',
        title: t.capabilitiesTitle ?? 'MonkDB execution, on every node',
        items: capabilities,
      }}
      closingSections={[
        {
          eyebrow: t.outcomeEyebrow ?? 'The outcome',
          title:
            t.outcomeTitle ??
            'Edge environments become active, intelligent systems',
          body:
            t.outcomeBody ??
            'MonkEdge transforms passive data generators into autonomous, real-time decision systems. Capabilities once reserved for the cloud now operate at the place where they matter most.',
          variant: 'parchment',
        },
      ]}
      ctaHeading={t.ctaHeading ?? 'Run intelligence where the data is born.'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
