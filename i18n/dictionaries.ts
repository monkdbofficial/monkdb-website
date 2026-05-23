import 'server-only'
import type { Locale } from './config'
import enDict from '@/messages/en.json'

// The Dictionary shape is derived from en.json (the source of truth).
// Other locales may temporarily lag behind when new keys are added; the
// translate script (npm run translate) regenerates them from en.json.
export type Dictionary = typeof enDict

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  es: () => import('@/messages/es.json').then((m) => m.default as unknown as Dictionary),
  de: () => import('@/messages/de.json').then((m) => m.default as unknown as Dictionary),
  fr: () => import('@/messages/fr.json').then((m) => m.default as unknown as Dictionary),
  hi: () => import('@/messages/hi.json').then((m) => m.default as unknown as Dictionary),
  ja: () => import('@/messages/ja.json').then((m) => m.default as unknown as Dictionary),
  zh: () => import('@/messages/zh.json').then((m) => m.default as unknown as Dictionary),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
