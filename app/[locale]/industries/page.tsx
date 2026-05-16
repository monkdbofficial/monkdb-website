import type { Metadata } from 'next'
import { INDUSTRIES } from '@/content/industries'
import HubPageLayout from '@/components/HubPageLayout'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/industries'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('industries', locale)
}

export default function Page() {
  return (
    <HubPageLayout
      title="Industries"
      subtitle="Industry intelligence. Real-time execution. Tangible outcomes."
      intro={{
        eyebrow: 'Verticals',
        title: 'Built for the industries that cannot tolerate delay',
        body: 'MonkDB powers continuous intelligence and execution across nine industry verticals. Each unifies operational, sensor, and contextual data on a single live plane.',
      }}
      diagram={{
        label: 'Industry map',
        src: '/diagram-industries.png',
        alt: 'MonkDB Industries grid showing nine industry verticals with capabilities',
        width: 1024,
        height: 1536,
        caption:
          'Real-time intelligence and execution across nine industry verticals. Each row shows the operational capabilities MonkDB delivers natively for that industry.',
        tagline: 'One System. One Truth. Real-Time Intelligence. Instant Action.',
      }}
      cards={INDUSTRIES.map((s) => ({
        title: s.title,
        body: s.subtitle,
        href: `/industries/${s.slug}`,
      }))}
      cardsExploreLabel="Explore"
      ctaHeading="See MonkDB in your industry."
    />
  )
}
