import type { Metadata } from 'next'
import CustomersContent from './CustomersContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/customers'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/company/customers'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Customers. MonkDB',
    description:
      'Enterprises that run on MonkDB. From mining and finance to logistics and manufacturing, MonkDB powers continuous intelligence across industries.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <CustomersContent />
}
