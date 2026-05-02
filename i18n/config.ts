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

// Routes that exist for every locale, used by the sitemap and language switcher.
export const localizedRoutes = [
  '',
  '/about',
  '/architecture',
  '/features',
  '/resources',
  '/why-choose-us',
] as const
