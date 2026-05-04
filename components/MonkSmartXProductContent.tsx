'use client'

/**
 * Shared content component for /products/monksmartx/<slug> sub-product pages.
 * Same pattern as UseCaseDetailContent: namespace + related list + fallbacks.
 */

import DetailPageLayout, {
  type DetailSection,
  type CapabilityCard,
  type RelatedItem,
} from './DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

type Props = {
  namespace: string
  related: { slug: string; namespace: string }[]
  fallback: {
    title: string
    subtitle: string
    introTitle: string
    introBody: string
    capabilitiesTitle: string
    capabilities: { title: string; body: string }[]
    ctaHeading: string
  }
}

export default function MonkSmartXProductContent({
  namespace,
  related,
  fallback,
}: Props) {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all[namespace]) ?? {}) as Record<string, string>
  const cta = ((all.detailCommon) ?? {}) as Record<string, string>

  const sections: DetailSection[] = [
    {
      eyebrow: t.eyebrowIntro ?? 'Overview',
      title: t.introTitle ?? fallback.introTitle,
      body: t.introBody ?? fallback.introBody,
      variant: 'light',
    },
  ]

  const capabilities: CapabilityCard[] = []
  for (let i = 1; i <= 6; i++) {
    const title = t[`cap${i}Title`]
    const body = t[`cap${i}Body`]
    if (title && body) capabilities.push({ title, body })
  }
  if (capabilities.length === 0) {
    fallback.capabilities.forEach((c) => capabilities.push(c))
  }

  const relatedItems: RelatedItem[] = related.map(
    ({ slug, namespace: ns }) => {
      const r = ((all[ns]) ?? {}) as Record<string, string>
      return {
        title: r.title ?? slug,
        body: r.subtitle ?? '',
        href: `/products/monksmartx/${slug}`,
      }
    },
  )

  return (
    <DetailPageLayout
      title={t.title ?? fallback.title}
      subtitle={t.subtitle ?? fallback.subtitle}
      sections={sections}
      capabilities={{
        eyebrow: t.capabilitiesEyebrow ?? 'Capabilities',
        title: t.capabilitiesTitle ?? fallback.capabilitiesTitle,
        items: capabilities,
      }}
      related={
        relatedItems.length > 0
          ? {
              eyebrow: cta.relatedTitle ?? 'Portfolio',
              title: 'Other MonkSmartX platforms',
              items: relatedItems,
              exploreCta: cta.exploreMore ?? 'Explore',
            }
          : undefined
      }
      ctaHeading={t.ctaHeading ?? fallback.ctaHeading}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
