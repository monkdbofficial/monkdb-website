import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import UseCasesHubContent from './UseCasesHubContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('useCases', locale)
}

export default function UseCasesHubPage() {
  return <UseCasesHubContent />
}
