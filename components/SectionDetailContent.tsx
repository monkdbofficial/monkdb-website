'use client'

/**
 * SectionDetailContent — renders a CoreSystem-shaped content object via the
 * existing DetailPageLayout. Used by /core-systems/[slug], /solutions/[slug],
 * /industries/[slug], and /resources/[slug] dynamic routes.
 */

import DetailPageLayout from './DetailPageLayout'
import type { CoreSystem } from '@/content/coreSystems'

type Props = {
  item: CoreSystem
  /** Optional related items to cross-link at the bottom. */
  related?: { title: string; body: string; href: string }[]
  relatedTitle?: string
}

export default function SectionDetailContent({
  item,
  related,
  relatedTitle,
}: Props) {
  return (
    <DetailPageLayout
      title={item.title}
      subtitle={item.subtitle}
      sections={[
        {
          eyebrow: 'Overview',
          title: item.headline,
          body: item.overview,
          variant: 'light',
        },
        {
          eyebrow: 'Why this matters',
          title: item.introTitle,
          body: item.introBody,
          variant: 'parchment',
        },
      ]}
      capabilities={{
        eyebrow: 'Inside',
        title: 'What you get',
        items: item.capabilities,
      }}
      related={
        related && related.length > 0
          ? {
              eyebrow: 'Related',
              title: relatedTitle ?? 'Related',
              items: related,
              exploreCta: 'Explore',
            }
          : undefined
      }
      ctaHeading={item.ctaHeading}
    />
  )
}
