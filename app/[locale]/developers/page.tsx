import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import DevelopersContent from './DevelopersContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/developers'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('developers', locale)
}

export default function Page() {
  return <DevelopersContent />
}
