import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartTradeContent from './SmartTradeContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smarttrade'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmarttrade',
    '/products/monksmartx/smarttrade',
    locale,
  )
}

export default function Page() {
  return <SmartTradeContent />
}
