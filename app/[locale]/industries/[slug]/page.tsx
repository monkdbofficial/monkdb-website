import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { INDUSTRIES } from '@/content/industries'
import IndustryContent from './IndustryContent'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'

export function generateStaticParams() {
  return INDUSTRIES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/industries/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = INDUSTRIES.find((s) => s.slug === slug)
  if (!item) return {}
  return buildSlugPageMetadata({
    title: item.title,
    description: item.subtitle,
    path: `/industries/${slug}`,
    locale,
  })
}

export default async function Page({
  params,
}: PageProps<'/[locale]/industries/[slug]'>) {
  const { locale, slug } = await params
  const item = INDUSTRIES.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = INDUSTRIES.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      body: s.subtitle,
      href: `/${locale}/industries/${s.slug}`,
    }))
  return <IndustryContent item={item} related={related} />
}
