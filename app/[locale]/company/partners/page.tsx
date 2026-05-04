import type { Metadata } from 'next'
import PartnersContent from './PartnersContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/partners'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/company/partners'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Partners. MonkDB',
    description:
      'MonkDB Partner Program. Cloud, technology, system integrator, and ISV partners delivering AI-Native Operational Intelligence to enterprises worldwide.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <PartnersContent />
}
