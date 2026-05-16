import type { Metadata } from 'next'
import PressContent from './PressContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/company/press'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('companyPress', locale)
}

export default function Page() {
  return <PressContent />
}
