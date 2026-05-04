import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXHubContent from './MonkSmartXHubContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('monksmartx', locale)
}

export default function Page() {
  return <MonkSmartXHubContent />
}
