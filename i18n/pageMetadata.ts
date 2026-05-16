import type { Metadata } from 'next'
import { getDictionary } from './dictionaries'
import { isLocale, locales, ogLocales, SITE_URL, type Locale } from './config'

type PageKey =
  | 'about'
  | 'features'
  | 'architecture'
  | 'resources'
  | 'whyChooseUs'
  | 'useCases'
  | 'monkedge'
  | 'monksmartx'
  | 'developers'
  | 'platformSovereign'
  | 'platformOperational'
  | 'coreSystems'
  | 'industries'
  | 'solutionsHub'
  | 'developerJourney'
  | 'learn'
  | 'companyPress'
  | 'companyCustomers'
  | 'companyPartners'
  | 'companyCareers'
  | 'companyContact'

const PATHS: Record<PageKey, string> = {
  about: '/about',
  features: '/features',
  architecture: '/architecture',
  resources: '/resources',
  whyChooseUs: '/why-choose-us',
  useCases: '/solutions/use-cases',
  monkedge: '/products/monkedge',
  monksmartx: '/products/monksmartx',
  developers: '/developers',
  platformSovereign: '/platform/sovereign',
  platformOperational: '/platform/operational-intelligence',
  coreSystems: '/core-systems',
  industries: '/industries',
  solutionsHub: '/solutions',
  developerJourney: '/developers/journey',
  learn: '/resources/learn',
  companyPress: '/company/press',
  companyCustomers: '/company/customers',
  companyPartners: '/company/partners',
  companyCareers: '/company/careers',
  companyContact: '/company/contact',
}

const ROBOTS_DIRECTIVES: NonNullable<Metadata['robots']> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

function buildAlternates(path: string, locale: string) {
  const canonical = `${SITE_URL}/${locale}${path}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  )
  languages['x-default'] = `${SITE_URL}/en${path}`
  return { canonical, languages }
}

function buildShareCards(
  title: string,
  description: string,
  canonical: string,
  ogImageAlt: string,
  locale: Locale,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
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
          alt: ogImageAlt,
        },
      ],
      locale: ogLocales[locale],
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

/**
 * For sub-pages (e.g. /solutions/use-cases/digital-twins, /products/monksmartx/smartmine),
 * we don't have a meta.<key>Title in the dictionary — we read directly from the page's own
 * dictionary namespace (its `title` and `subtitle`) and pass through the path.
 */
export async function buildSubpageMetadata(
  namespace: string,
  path: string,
  locale: string,
): Promise<Metadata> {
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  const meta = dict.meta as Record<string, string>
  const ns = ((dict as Record<string, unknown>)[namespace] ?? {}) as Record<string, string>
  const title = ns.title ? `${ns.title}. MonkDB` : meta.title
  const description = ns.subtitle ?? meta.description

  const { canonical, languages } = buildAlternates(path, locale)
  return {
    title,
    description,
    alternates: { canonical, languages },
    ...buildShareCards(title, description, canonical, meta.ogImageAlt, locale as Locale),
    robots: ROBOTS_DIRECTIVES,
  }
}

/**
 * For content-array driven [slug] pages (core-systems/[slug], industries/[slug],
 * solutions/[slug], outcomes/[slug], resources/[slug]) where title/description
 * come from a TS content file rather than a dictionary namespace.
 */
export async function buildSlugPageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string
  description: string
  path: string
  locale: string
}): Promise<Metadata> {
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  const meta = dict.meta as Record<string, string>
  const fullTitle = `${title}. MonkDB`

  const { canonical, languages } = buildAlternates(path, locale)
  return {
    title: fullTitle,
    description,
    alternates: { canonical, languages },
    ...buildShareCards(fullTitle, description, canonical, meta.ogImageAlt, locale as Locale),
    robots: ROBOTS_DIRECTIVES,
  }
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

  const { canonical, languages } = buildAlternates(path, locale)
  return {
    title,
    description,
    alternates: { canonical, languages },
    ...buildShareCards(title, description, canonical, meta.ogImageAlt, locale as Locale),
    robots: ROBOTS_DIRECTIVES,
  }
}
