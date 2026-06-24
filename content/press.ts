/**
 * Press release shape. Used by the press page (public read) + admin panel (CRUD).
 * Persisted in MongoDB; see /lib/press-db.ts. Images live in Cloudflare R2 and
 * are referenced here by URL only.
 */

export type PressCategory =
  | 'product'
  | 'customer'
  | 'partnership'
  | 'engineering'
  | 'industry'
  | 'research'

export const PRESS_CATEGORY_LABELS: Record<PressCategory, string> = {
  product: 'Product',
  customer: 'Customer',
  partnership: 'Partnership',
  engineering: 'Engineering',
  industry: 'Industry',
  research: 'Research',
}

export type PressItem = {
  id: string
  category: PressCategory
  title: string
  excerpt: string
  date: string // ISO date, e.g. "2026-04-22"
  imageUrl?: string // Cloudflare R2 URL
  linkUrl?: string // optional external article link
}
