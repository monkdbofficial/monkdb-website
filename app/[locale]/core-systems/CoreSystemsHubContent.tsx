'use client'

import { CORE_SYSTEMS } from '@/content/coreSystems'
import HubPageLayout from '@/components/HubPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function CoreSystemsHubContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).coreSystemsHub) ?? {}) as Record<
    string,
    string
  >

  return (
    <HubPageLayout
      title={t.title ?? 'Core Systems'}
      subtitle={
        t.subtitle ?? 'The systems that power continuous intelligence and execution.'
      }
      intro={{
        eyebrow: t.introEyebrow ?? 'Architecture',
        title: t.introTitle ?? 'Six engines, one continuous architecture',
        body:
          t.introBody ??
          'MonkDB is not a collection of features. It is a set of deeply integrated systems that unify data, intelligence, and execution into a single continuous architecture. Click any system below for the depth.',
      }}
      cards={CORE_SYSTEMS.map((s) => ({
        title: s.title,
        body: s.subtitle,
        href: `/core-systems/${s.slug}`,
      }))}
      cardsExploreLabel={t.exploreCta ?? 'Explore'}
      closing={{
        eyebrow: t.closingEyebrow ?? 'Operating model',
        title: t.closingTitle ?? 'One unified system in real time',
        body:
          t.closingBody ??
          'MonkDB Core Systems form a continuous execution architecture where data, intelligence, and action operate as one unified system in real time.',
      }}
      ctaHeading={t.ctaHeading ?? 'Run on a continuous execution architecture.'}
    />
  )
}
