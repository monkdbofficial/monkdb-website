import type { Metadata } from 'next'
import SolutionsHubContent from './SolutionsHubContent'
import { buildPageMetadata } from '@/i18n/pageMetadata'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('solutionsHub', locale)
}

export default function Page() {
  return <SolutionsHubContent />
}
