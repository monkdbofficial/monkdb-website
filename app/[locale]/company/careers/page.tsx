import type { Metadata } from 'next'
import CareersContent from './CareersContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/careers'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/company/careers'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Careers. MonkDB',
    description:
      'Build the AI-Native Operational Intelligence System with us. Open roles across engineering, product, design, and go-to-market.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <CareersContent />
}
