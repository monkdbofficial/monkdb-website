import type { MetadataRoute } from 'next'
import { locales, localizedRoutes, SITE_URL } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) =>
    localizedRoutes.map((route) => {
      const languages: Record<string, string> = Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}${route}`]),
      )
      languages['x-default'] = `${SITE_URL}/en${route}`
      return {
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
        alternates: { languages },
      }
    }),
  )
}
