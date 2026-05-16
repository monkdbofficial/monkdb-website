import type { Metadata } from 'next'
import ContactContent from './ContactContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/contact'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('companyContact', locale)
}

export default function Page() {
  return <ContactContent />
}
