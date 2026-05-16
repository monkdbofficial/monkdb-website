import type { Metadata } from 'next'
import CareersContent from './CareersContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/careers'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('companyCareers', locale)
}

export default function Page() {
  return <CareersContent />
}
