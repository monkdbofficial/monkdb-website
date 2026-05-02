import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import AboutContent from './AboutContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('about', locale)
}

export default function AboutPage() {
  return <AboutContent />
}
