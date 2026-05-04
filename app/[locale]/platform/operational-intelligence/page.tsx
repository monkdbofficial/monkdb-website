import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import OperationalContent from './OperationalContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/platform/operational-intelligence'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('platformOperational', locale)
}

export default function Page() {
  return <OperationalContent />
}
