import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import SmartRetailContent from './SmartRetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartretail'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartretail',
    '/products/monksmartx/smartretail',
    locale,
  )
}

export default function Page() {
  return <SmartRetailContent />
}
