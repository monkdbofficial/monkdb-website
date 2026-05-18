export const locales = ['en', 'es', 'de', 'fr', 'hi', 'ja', 'zh'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  hi: 'हिन्दी',
  ja: '日本語',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  hi: 'HI',
  ja: 'JA',
  zh: 'ZH',
}

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

// OpenGraph locale codes (BCP-47 with region) used for og:locale.
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  hi: 'hi_IN',
  ja: 'ja_JP',
  zh: 'zh_CN',
}

// Production canonical origin used for absolute URLs in metadata + sitemap.
export const SITE_URL = 'https://www.monkdb.com'

/**
 * Build a locale-aware path. The default locale renders at the root (no prefix),
 * other locales render at /<locale>/<path>.
 *   localizedHref('/about', 'en') -> '/about'
 *   localizedHref('/about', 'es') -> '/es/about'
 *   localizedHref('/',      'en') -> '/'
 *   localizedHref('/',      'es') -> '/es'
 */
export function localizedHref(path: string, locale: string): string {
  const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean === '' ? '/' : clean
  return `/${locale}${clean}`
}

// Routes that exist for every locale, used by the sitemap and language switcher.
export const localizedRoutes = [
  '',
  '/about',
  '/architecture',
  '/features',
  '/resources',
  '/why-choose-us',
  // Phase 1 — full pages from the website content deck.
  '/solutions/use-cases',
  '/solutions/use-cases/digital-twins',
  '/solutions/use-cases/ai-agents',
  '/solutions/use-cases/fraud-detection',
  '/solutions/use-cases/smart-manufacturing',
  '/solutions/use-cases/smart-mobility',
  '/solutions/use-cases/financial-intelligence',
  '/products/monkedge',
  '/products/monksmartx',
  '/products/monksmartx/smartmine',
  '/products/monksmartx/smartmobility',
  '/products/monksmartx/smartfinance',
  '/products/monksmartx/smarttrade',
  '/products/monksmartx/smartretail',
  '/products/monksmartx/smartmanufacturing',
  '/developers',
  '/platform/sovereign',
  '/platform/operational-intelligence',
  // Phase 2 — Core Systems hub + 6 detail pages
  '/core-systems',
  '/core-systems/unified-operational-engine',
  '/core-systems/real-time-processing-engine',
  '/core-systems/ai-native-execution-engine',
  '/core-systems/decision-action-engine',
  '/core-systems/edge-to-cloud-fabric',
  '/core-systems/sovereignty-trust-layer',
  // Phase 2 — Solutions hub + 10 detail pages
  '/solutions',
  '/solutions/ai-ml',
  '/solutions/real-time-streaming',
  '/solutions/iceberg-tables',
  '/solutions/real-time-operational-intelligence',
  '/solutions/autonomous-decisioning-systems',
  '/solutions/energy-and-resource-optimization',
  '/solutions/digital-twin-and-simulation',
  '/solutions/edge-intelligence-and-distributed-ai',
  '/solutions/data-and-ai-modernization',
  '/solutions/ai-governance-and-trust',
  // Phase 2 — Industries hub + 9 detail pages
  '/industries',
  '/industries/mining-and-manufacturing',
  '/industries/automobiles',
  '/industries/bfsi-and-capital-markets',
  '/industries/mining-and-metals',
  '/industries/steel-and-manufacturing',
  '/industries/data-centers',
  '/industries/energy-and-utilities',
  '/industries/infrastructure-and-smart-cities',
  '/industries/logistics-and-mobility',
  // Phase 2 — Resources / Learn hub + sub-pages (Documentation lives at docs.monkdb.com)
  '/resources/learn',
  '/resources/resources',
  '/resources/customer-stories',
  '/resources/blog',
  '/resources/events',
  // Phase 2 — Developer Journey Map
  '/developers/journey',
  // Phase 3 — Outcomes (6 detail pages)
  '/outcomes/reduce-cost',
  '/outcomes/improve-efficiency',
  '/outcomes/enhance-safety',
  '/outcomes/enable-autonomy',
  '/outcomes/trust-compliance',
  '/outcomes/accelerate-decision-making',
  // Phase 3 — Company sub-pages (5)
  '/company/press',
  '/company/partners',
  '/company/careers',
  '/company/contact',
] as const
