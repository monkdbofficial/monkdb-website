'use client'

import HubPageLayout from '@/components/HubPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function UseCasesHubContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).useCasesHub) ?? {}) as Record<
    string,
    string
  >
  const cta = (((dict as Record<string, unknown>).detailCommon) ?? {}) as Record<
    string,
    string
  >

  return (
    <HubPageLayout
      title={t.title ?? 'Use Cases'}
      subtitle={
        t.subtitle ??
        'Six production patterns where MonkDB replaces fragmented stacks with one continuous system from data to decision to action.'
      }
      intro={{
        eyebrow: t.eyebrowIntro ?? 'Overview',
        title: t.introTitle ?? 'From data systems to execution systems',
        body:
          t.introBody ??
          'Most enterprises stop at insight. MonkDB closes the gap between knowing and acting by unifying ingestion, intelligence, and execution in one engine.',
      }}
      cards={[
        {
          title: t.card1Title ?? 'Digital Twins',
          body:
            t.card1Body ??
            'Real-time system modeling, simulation, and autonomous operations.',
          href: '/solutions/use-cases/digital-twins',
        },
        {
          title: t.card2Title ?? 'AI Agents and Copilots',
          body:
            t.card2Body ?? 'Live, contextual data plane for reasoning and action.',
          href: '/solutions/use-cases/ai-agents',
        },
        {
          title: t.card3Title ?? 'Fraud Detection',
          body:
            t.card3Body ?? 'Anomalies caught and acted on as transactions clear.',
          href: '/solutions/use-cases/fraud-detection',
        },
        {
          title: t.card4Title ?? 'Smart Manufacturing',
          body:
            t.card4Body ??
            'Operational intelligence that predicts and corrects in real time.',
          href: '/solutions/use-cases/smart-manufacturing',
        },
        {
          title: t.card5Title ?? 'Smart Mobility',
          body:
            t.card5Body ??
            'Dynamic routing and predictive coordination across networks.',
          href: '/solutions/use-cases/smart-mobility',
        },
        {
          title: t.card6Title ?? 'Financial Intelligence',
          body:
            t.card6Body ??
            'Low-latency analytics, trading, and risk in a single plane.',
          href: '/solutions/use-cases/financial-intelligence',
        },
      ]}
      cardsExploreLabel={t.exploreCta ?? 'Explore'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
