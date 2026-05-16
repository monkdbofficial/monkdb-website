import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LEARN_SECTIONS } from '@/content/learn'
import ResourceContent from './ResourceContent'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'

export function generateStaticParams() {
  return LEARN_SECTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/resources/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = LEARN_SECTIONS.find((s) => s.slug === slug)
  if (!item) return {}
  return buildSlugPageMetadata({
    title: item.title,
    description: item.subtitle,
    path: `/resources/${slug}`,
    locale,
  })
}

export default async function Page({
  params,
}: PageProps<'/[locale]/resources/[slug]'>) {
  const { locale, slug } = await params
  const item = LEARN_SECTIONS.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = LEARN_SECTIONS.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      body: s.subtitle,
      href: `/${locale}/resources/${s.slug}`,
    }))
  return <ResourceContent item={item} related={related} />
}
