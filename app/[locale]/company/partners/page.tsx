import type { Metadata } from 'next'
import PartnersContent from './PartnersContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/partners'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('companyPartners', locale)
}

export default function Page() {
  return <PartnersContent />
}
