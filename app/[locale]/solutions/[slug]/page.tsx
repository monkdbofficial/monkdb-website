import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SOLUTIONS } from '@/content/solutions'
import SolutionContent from './SolutionContent'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = SOLUTIONS.find((s) => s.slug === slug)
  if (!item) return {}
  return buildSlugPageMetadata({
    title: item.title,
    description: item.subtitle,
    path: `/solutions/${slug}`,
    locale,
  })
}

export default async function Page({
  params,
}: PageProps<'/[locale]/solutions/[slug]'>) {
  const { locale, slug } = await params
  const item = SOLUTIONS.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = SOLUTIONS.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      body: s.subtitle,
      href: `/${locale}/solutions/${s.slug}`,
    }))
  return <SolutionContent item={item} related={related} />
}
