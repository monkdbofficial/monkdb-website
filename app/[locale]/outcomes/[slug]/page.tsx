import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OUTCOMES_DETAIL } from '@/content/outcomesDetail'
import OutcomeDetailContent from '@/components/OutcomeDetailContent'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'

export function generateStaticParams() {
  return OUTCOMES_DETAIL.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/outcomes/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = OUTCOMES_DETAIL.find((s) => s.slug === slug)
  if (!item) return {}
  return buildSlugPageMetadata({
    title: item.title,
    description: item.refined,
    path: `/outcomes/${slug}`,
    locale,
  })
}

export default async function Page({
  params,
}: PageProps<'/[locale]/outcomes/[slug]'>) {
  const { slug } = await params
  const item = OUTCOMES_DETAIL.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = OUTCOMES_DETAIL.filter((o) => o.slug !== slug)
    .slice(0, 3)
    .map((o) => ({
      title: o.title,
      refined: o.refined,
      href: `/outcomes/${o.slug}`,
    }))
  return <OutcomeDetailContent item={item} related={related} />
}
