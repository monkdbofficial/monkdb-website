import type { Metadata } from 'next'
import JourneyContent from './JourneyContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/developers/journey'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/developers/journey'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Developer Journey Map. MonkDB',
    description:
      'A guided path to understand, build, and run intelligent systems on MonkDB. 8 stages from Discover through Optimize.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <JourneyContent />
}
