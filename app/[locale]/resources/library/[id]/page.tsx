import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getResource, listResources } from '@/lib/resources-db'
import ResourceDetailContent from './ResourceDetailContent'
import { isLocale, SITE_URL, localizedHref, type Locale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  try {
    const item = await getResource(id)
    if (!item) return { title: 'Resource not found. MonkDB' }
    const canonical = `${SITE_URL}${localizedHref(`/resources/library/${id}`, locale)}`
    return {
      title: `${item.title}. MonkDB`,
      description: item.summary,
      alternates: { canonical },
      openGraph: {
        title: item.title,
        description: item.summary,
        url: canonical,
        type: 'article',
      },
    }
  } catch {
    return { title: 'Resource. MonkDB' }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  if (!isLocale(locale)) notFound()

  let item = null
  let related: Awaited<ReturnType<typeof listResources>> = []
  try {
    item = await getResource(id)
    if (item) {
      const all = await listResources()
      related = all.filter((r) => r.id !== item!.id && r.kind === item!.kind).slice(0, 3)
    }
  } catch (e) {
    console.error('detail page load failed', e)
  }

  if (!item) notFound()

  return (
    <ResourceDetailContent
      item={item}
      related={related}
      locale={locale as Locale}
    />
  )
}
