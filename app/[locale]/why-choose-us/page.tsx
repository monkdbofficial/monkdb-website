import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import WhyChooseUsContent from './WhyChooseUsContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/why-choose-us'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('whyChooseUs', locale)
}

export default function WhyChooseUsPage() {
  return <WhyChooseUsContent />
}
