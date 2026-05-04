'use client'

import DetailPageLayout, {
  type CapabilityCard,
} from '@/components/DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function SovereignContent() {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all.platformSovereign) ?? {}) as Record<string, string>
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
        title: 'Data Sovereignty is Native',
        body: 'All data remains within your infrastructure. Cloud, on-prem, or edge. No forced movement, no external dependency.',
      },
      {
        title: 'AI Runs Where Data Lives',
        body: 'Intelligence operates directly within MonkDB, ensuring security, performance, and contextual integrity.',
      },
      {
        title: 'Full Governance and Control',
        body: 'Define access, enforce policies, and maintain auditability across data and AI workflows.',
      },
      {
        title: 'Unified Architecture',
        body: 'Data storage, processing, AI, and execution operate within a single system reducing risk and complexity.',
      },
      {
        title: 'Sovereign by Design, Not Add-On',
        body: 'Sovereignty is built into the foundation of the platform, ensuring long-term control and flexibility.',
      },
    )
  }

  return (
    <DetailPageLayout
      title={t.title ?? 'Own Your Data. Control Your Intelligence.'}
      subtitle={
        t.subtitle ??
        'AI built on your data, secure, sovereign, and fully under your control.'
      }
      sections={[
        {
          eyebrow: t.eyebrowIntro ?? 'Strategic Pillar',
          title: t.introTitle ?? 'The AI-Native Sovereign Platform',
          body:
            t.introBody ??
            'The AI-Native Sovereign Platform ensures your data, intelligence, and AI operations remain fully within your control.',
          variant: 'light',
        },
        {
          eyebrow: t.eyebrowProblem ?? 'The challenge',
          title:
            t.problemTitle ?? 'AI today depends on stacks you do not control',
          body:
            t.problemBody ??
            "In today's AI landscape, most systems rely on external platforms, fragmented architectures, and third-party dependencies. This leads to risks around data exposure, compliance, and loss of control.",
          variant: 'parchment',
        },
      ]}
      capabilities={{
        eyebrow: t.capabilitiesEyebrow ?? 'Inside the platform',
        title:
          t.capabilitiesTitle ?? 'Five primitives, one sovereign foundation',
        items: capabilities,
      }}
      closingSections={[
        {
          eyebrow: t.outcomeEyebrow ?? 'The outcome',
          title:
            t.outcomeTitle ??
            'Build and scale AI without compromising control',
          body:
            t.outcomeBody ??
            'Enterprises adopt the AI-Native Sovereign Platform to confidently develop and operate AI on their own terms.',
          variant: 'parchment',
        },
      ]}
      ctaHeading={t.ctaHeading ?? 'Own your data. Control your intelligence.'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
