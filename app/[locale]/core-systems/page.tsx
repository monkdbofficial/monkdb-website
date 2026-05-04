import type { Metadata } from 'next'
import { CORE_SYSTEMS } from '@/content/coreSystems'
import HubPageLayout from '@/components/HubPageLayout'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/core-systems'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/core-systems'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Core Systems. MonkDB',
    description:
      'The systems that power continuous intelligence and execution. Six deeply integrated engines that unify data, intelligence, and action into a single architecture.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return (
    <HubPageLayout
      title="Core Systems"
      subtitle="The systems that power continuous intelligence and execution."
      intro={{
        eyebrow: 'Architecture',
        title: 'Six engines, one continuous architecture',
        body: 'MonkDB is not a collection of features. It is a set of deeply integrated systems that unify data, intelligence, and execution into a single continuous architecture. Click any system below for the depth.',
      }}
      diagram={{
        label: 'Architecture',
        src: '/diagram-core-systems.png',
        alt: 'MonkDB Core Systems Architecture diagram',
        width: 1379,
        height: 920,
        caption:
          'Six engines, one continuous platform. Data In flows through the Core Systems into the Unified Core Platform and the Edge-to-Cloud Deployment Fabric, ending in real-time outcomes and actions.',
        tagline:
          'One System. One Truth. Real-Time Intelligence. Instant Action.',
      }}
      cards={CORE_SYSTEMS.map((s) => ({
        title: s.title,
        body: s.subtitle,
        href: `/core-systems/${s.slug}`,
      }))}
      cardsExploreLabel="Explore"
      closing={{
        eyebrow: 'Operating model',
        title: 'One unified system in real time',
        body: 'MonkDB Core Systems form a continuous execution architecture where data, intelligence, and action operate as one unified system in real time.',
      }}
      ctaHeading="Run on a continuous execution architecture."
    />
  )
}
