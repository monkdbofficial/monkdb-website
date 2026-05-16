import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CORE_SYSTEMS } from '@/content/coreSystems'
import CoreSystemContent from './CoreSystemContent'
import { buildSlugPageMetadata } from '@/i18n/pageMetadata'
import { localizedHref } from '@/i18n/config'

export function generateStaticParams() {
  return CORE_SYSTEMS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/core-systems/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = CORE_SYSTEMS.find((s) => s.slug === slug)
  if (!item) return {}
  return buildSlugPageMetadata({
    title: item.title,
    description: item.subtitle,
    path: `/core-systems/${slug}`,
    locale,
  })
}

export default async function Page({
  params,
}: PageProps<'/[locale]/core-systems/[slug]'>) {
  const { locale, slug } = await params
  const item = CORE_SYSTEMS.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = CORE_SYSTEMS.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      body: s.subtitle,
      href: localizedHref(`/core-systems/${s.slug}`, locale),
    }))
  return <CoreSystemContent item={item} related={related} />
}
