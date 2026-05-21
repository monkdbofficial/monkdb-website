import type { Metadata } from 'next'
import CoreSystemsHubContent from './CoreSystemsHubContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/core-systems'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('coreSystems', locale)
}

export default function Page() {
  return <CoreSystemsHubContent />
}
