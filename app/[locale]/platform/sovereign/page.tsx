import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import SovereignContent from './SovereignContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/platform/sovereign'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('platformSovereign', locale)
}

export default function Page() {
  return <SovereignContent />
}
