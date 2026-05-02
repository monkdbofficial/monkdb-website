import type { Metadata } from 'next'
import { getDictionary } from './dictionaries'
import { isLocale, locales, ogLocales, SITE_URL, type Locale } from './config'

type PageKey =
  | 'about'
  | 'features'
  | 'architecture'
  | 'resources'
  | 'whyChooseUs'

const PATHS: Record<PageKey, string> = {
  about: '/about',
  features: '/features',
  architecture: '/architecture',
  resources: '/resources',
  whyChooseUs: '/why-choose-us',
}

export async function buildPageMetadata(
  page: PageKey,
  locale: string,
): Promise<Metadata> {
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  const meta = dict.meta as Record<string, string>
  const path = PATHS[page]
  const title = meta[`${page}Title`] ?? meta.title
  const description = meta[`${page}Description`] ?? meta.description

  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'MonkDB',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
      locale: ogLocales[locale as Locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  }
}
