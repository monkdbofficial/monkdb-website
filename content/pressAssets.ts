/**
 * Media-kit asset shape. Used by the press page (public read) + admin panel (CRUD).
 * Persisted in MongoDB; see /lib/press-assets-db.ts. The downloadable file lives
 * in Cloudflare R2 and is referenced here by URL only.
 */

export type PressAssetItem = {
  id: string
  label: string
  size?: string // human-readable, e.g. "4.2 MB"
  url?: string // Cloudflare R2 file URL
}
