import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OUTCOMES_DETAIL } from '@/content/outcomesDetail'
import OutcomeDetailContent from '@/components/OutcomeDetailContent'
import { locales, SITE_URL, type Locale } from '@/i18n/config'

export function generateStaticParams() {
  return OUTCOMES_DETAIL.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/outcomes/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  const item = OUTCOMES_DETAIL.find((s) => s.slug === slug)
  if (!item) return {}
  const path = `/outcomes/${slug}`
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l: Locale) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return {
    title: `${item.title}. MonkDB`,
    description: item.refined,
    alternates: { canonical, languages },
  }
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
