import type { MetadataRoute } from 'next'
import { locales, localizedHref, localizedRoutes, SITE_URL } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) =>
    localizedRoutes.map((route) => {
      const languages: Record<string, string> = Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}${localizedHref(route, l)}`]),
      )
      languages['x-default'] = `${SITE_URL}${localizedHref(route, 'en')}`
      return {
        url: `${SITE_URL}${localizedHref(route, locale)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
        alternates: { languages },
      }
    }),
  )
}
