'use client'

/**
 * Shared content component for /solutions/use-cases/<slug> pages.
 * Reads its dict namespace, builds DetailPageLayout props, renders.
 *
 * Each sub-page passes its own namespace key (e.g. "useCaseDigitalTwins")
 * and a list of related use-case slugs to cross-link.
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
    solutionTitle: string
    solutionBody: string
    capabilitiesTitle: string
    capabilities: { title: string; body: string }[]
    ctaHeading: string
  }
}

export default function UseCaseDetailContent({
  namespace,
  related,
  fallback,
}: Props) {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all[namespace]) ?? {}) as Record<string, string>
  const cta = ((all.detailCommon) ?? {}) as Record<string, string>

  // Build narrative sections (intro + solution).
  const sections: DetailSection[] = [
    {
      eyebrow: t.eyebrowIntro ?? 'The challenge',
      title: t.introTitle ?? fallback.introTitle,
      body: t.introBody ?? fallback.introBody,
      variant: 'light',
    },
    {
      eyebrow: t.eyebrowSolution ?? 'How MonkDB delivers',
      title: t.solutionTitle ?? fallback.solutionTitle,
      body: t.solutionBody ?? fallback.solutionBody,
      variant: 'parchment',
    },
  ]

  // Build capability cards (up to 6 — read keys cap1..cap6 if present).
  const capabilities: CapabilityCard[] = []
  for (let i = 1; i <= 6; i++) {
    const title = t[`cap${i}Title`]
    const body = t[`cap${i}Body`]
    if (title && body) {
      capabilities.push({ title, body })
    }
  }
  // Apply fallbacks if dict didn't supply them yet.
  if (capabilities.length === 0) {
    fallback.capabilities.forEach((c) => capabilities.push(c))
  }

  // Build related cross-links.
  const relatedItems: RelatedItem[] = related.map(
    ({ slug, namespace: ns }) => {
      const r = ((all[ns]) ?? {}) as Record<string, string>
      return {
        title: r.title ?? slug,
        body: r.subtitle ?? '',
        href: `/solutions/use-cases/${slug}`,
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
              eyebrow: cta.relatedTitle ?? 'Related',
              title: 'Other use cases on MonkDB',
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
