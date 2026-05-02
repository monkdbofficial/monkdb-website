import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import ResourcesContent from './ResourcesContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/resources'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('resources', locale)
}

export default function ResourcesPage() {
  return <ResourcesContent />
}
