import type { Metadata } from 'next'
import { buildPageMetadata } from '@/i18n/pageMetadata'
import MonkEdgeContent from './MonkEdgeContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monkedge'>): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('monkedge', locale)
}

export default function Page() {
  return <MonkEdgeContent />
}
