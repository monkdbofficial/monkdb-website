import type { Metadata } from 'next'
import LearnHubContent from './LearnHubContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/resources/learn'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('learn', locale)
}

export default function Page() {
  return <LearnHubContent />
}
