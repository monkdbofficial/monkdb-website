import type { Metadata } from 'next'
import IndustriesHubContent from './IndustriesHubContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/industries'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('industries', locale)
}

export default function Page() {
  return <IndustriesHubContent />
}
