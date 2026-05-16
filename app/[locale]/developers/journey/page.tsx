import type { Metadata } from 'next'
import JourneyContent from './JourneyContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/developers/journey'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('developerJourney', locale)
}

export default function Page() {
  return <JourneyContent />
}
