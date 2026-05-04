import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartMobilityContent from './SmartMobilityContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmobility'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmobility',
    '/products/monksmartx/smartmobility',
    locale,
  )
}

export default function Page() {
  return <SmartMobilityContent />
}
