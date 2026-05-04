import type { Metadata } from 'next'
import PressContent from './PressContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/press'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/company/press'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Press. MonkDB',
    description:
      'News, press releases, and media resources for MonkDB. Latest updates from the AI-Native Operational Intelligence System.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <PressContent />
}
