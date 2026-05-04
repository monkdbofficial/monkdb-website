import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SOLUTIONS } from '@/content/solutions'
import SectionDetailContent from '@/components/SectionDetailContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = SOLUTIONS.find((s) => s.slug === slug)
  if (!item) return {}
  const path = `/solutions/${slug}`
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: `${item.title}. MonkDB`,
    description: item.subtitle,
    alternates: { canonical, languages },
  }
}

export default async function Page({
  params,
}: PageProps<'/[locale]/solutions/[slug]'>) {
  const { slug } = await params
  const item = SOLUTIONS.find((s) => s.slug === slug)
  if (!item) notFound()
  const related = SOLUTIONS.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      body: s.subtitle,
      href: `/solutions/${s.slug}`,
    }))
  return (
    <SectionDetailContent
      item={item}
      related={related}
      relatedTitle="Other Solutions"
    />
  )
}
