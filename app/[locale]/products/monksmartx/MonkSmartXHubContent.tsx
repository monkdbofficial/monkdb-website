'use client'

import HubPageLayout from '@/components/HubPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function MonkSmartXHubContent() {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).monksmartxHub) ?? {}) as Record<
    string,
    string
  >
  const cta = (((dict as Record<string, unknown>).detailCommon) ?? {}) as Record<
    string,
    string
  >

  return (
    <HubPageLayout
      title={t.title ?? 'MonkSmartX'}
      subtitle={
        t.subtitle ??
        'A suite of domain-driven intelligent platforms built on MonkDB. Production-ready execution systems, tailored to every industry.'
      }
      intro={{
        eyebrow: t.eyebrowIntro ?? 'Overview',
        title: t.introTitle ?? 'Intelligence, tailored to every industry',
        body:
          t.introBody ??
          'While MonkDB provides the unified foundation, MonkSmartX brings industry-specific intelligence and execution. Each MonkSmartX platform understands domain data, builds real-time operational context, automates decisions, and executes inside the systems your business already runs.',
      }}
      cards={[
        {
          title: t.platform1Title ?? 'Monk SmartMine',
          body:
            t.platform1Body ??
            'Real-time operational intelligence for mining ecosystems.',
          href: '/products/monksmartx/smartmine',
        },
        {
          title: t.platform2Title ?? 'Monk SmartMobility',
          body:
            t.platform2Body ??
            'Intelligent systems for connected and autonomous mobility.',
          href: '/products/monksmartx/smartmobility',
        },
        {
          title: t.platform3Title ?? 'Monk SmartFinance',
          body:
            t.platform3Body ??
            'Real-time financial intelligence and risk management.',
          href: '/products/monksmartx/smartfinance',
        },
        {
          title: t.platform4Title ?? 'Monk SmartTrade',
          body: t.platform4Body ?? 'AI-native trading and execution systems.',
          href: '/products/monksmartx/smarttrade',
        },
        {
          title: t.platform5Title ?? 'Monk SmartRetail',
          body:
            t.platform5Body ??
            'Real-time customer and operations intelligence.',
          href: '/products/monksmartx/smartretail',
        },
        {
          title: t.platform6Title ?? 'Monk SmartManufacturing',
          body:
            t.platform6Body ??
            'Adaptive and intelligent manufacturing systems.',
          href: '/products/monksmartx/smartmanufacturing',
        },
      ]}
      cardsExploreLabel={t.exploreCta ?? 'Explore'}
      closing={{
        eyebrow: t.extendableEyebrow ?? 'Extendable',
        title: t.extendableTitle ?? 'Beyond the predefined set',
        body:
          t.extendableBody ??
          'MonkSmartX is not limited to predefined solutions. New domain-specific platforms can be built rapidly on MonkDB, extending intelligence and execution into any industry or function.',
      }}
      ctaHeading={t.ctaHeading ?? 'Adopt domain intelligence. Skip the build.'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
