'use client'

import { INDUSTRIES } from '@/content/industries'
import HubPageLayout from '@/components/HubPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function IndustriesHubContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).industriesHub) ?? {}) as Record<
    string,
    string
  >

  return (
    <HubPageLayout
      title={t.title ?? 'Industries'}
      subtitle={
        t.subtitle ??
        'Industry intelligence. Real-time execution. Tangible outcomes.'
      }
      intro={{
        eyebrow: t.introEyebrow ?? 'Verticals',
        title:
          t.introTitle ?? 'Built for the industries that cannot tolerate delay',
        body:
          t.introBody ??
          'MonkDB powers continuous intelligence and execution across nine industry verticals. Each unifies operational, sensor, and contextual data on a single live plane.',
      }}
      cards={INDUSTRIES.map((s) => ({
        title: s.title,
        body: s.subtitle,
        href: `/industries/${s.slug}`,
      }))}
      cardsExploreLabel={t.exploreCta ?? 'Explore'}
      ctaHeading={t.ctaHeading ?? 'See MonkDB in your industry.'}
    />
  )
}
