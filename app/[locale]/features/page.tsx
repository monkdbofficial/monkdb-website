import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import MonkDBContent from './MonkDBContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/features'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('features', locale)
}

export default function FeaturesPage() {
  return <MonkDBContent />
}
