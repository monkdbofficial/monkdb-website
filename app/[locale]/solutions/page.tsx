import type { Metadata } from 'next'
import SolutionsHubContent from './SolutionsHubContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/solutions'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Solutions. MonkDB',
    description:
      'Ten capability-level solutions that span the MonkDB execution platform. From AI/ML to AI governance. Plus the six outcomes they deliver.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <SolutionsHubContent />
}
