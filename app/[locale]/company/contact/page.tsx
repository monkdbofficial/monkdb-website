import type { Metadata } from 'next'
import ContactContent from './ContactContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/contact'>): Promise<Metadata> {
  const { locale } = await params
  const path = '/company/contact'
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: 'Contact. MonkDB',
    description:
      'Get in touch with MonkDB. Sales, support, partnerships, and press. Talk to an engineer about your workload.',
    alternates: { canonical, languages },
  }
}

export default function Page() {
  return <ContactContent />
}
