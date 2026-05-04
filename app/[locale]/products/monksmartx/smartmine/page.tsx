import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartMineContent from './SmartMineContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmine'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmine',
    '/products/monksmartx/smartmine',
    locale,
  )
}

export default function Page() {
  return <SmartMineContent />
}
