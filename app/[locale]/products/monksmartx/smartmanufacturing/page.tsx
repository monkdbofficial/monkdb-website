import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartManufacturingContent from './SmartManufacturingContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmanufacturing'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmanufacturing',
    '/products/monksmartx/smartmanufacturing',
    locale,
  )
}

export default function Page() {
  return <SmartManufacturingContent />
}
