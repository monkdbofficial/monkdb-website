import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartFinanceContent from './SmartFinanceContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartfinance'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartfinance',
    '/products/monksmartx/smartfinance',
    locale,
  )
}

export default function Page() {
  return <SmartFinanceContent />
}
