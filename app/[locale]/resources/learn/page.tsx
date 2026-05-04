import type { Metadata } from 'next'
import LearnHubContent from './LearnHubContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/resources/learn'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/resources/learn'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Learn. MonkDB',
    description:
      'Everything you need to understand, evaluate, and build with MonkDB. Resources, documentation, customer use cases, blog, and events.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <LearnHubContent />
}
