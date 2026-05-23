/**
 * Job listings shape. Used by the careers page (public read) + admin panel (CRUD).
 * Persisted in MongoDB; see /lib/jobs-db.ts.
 */

export type JobTeam =
  | 'engineering'
  | 'product'
  | 'gtm'
  | 'operations'

export const JOB_TEAM_LABELS: Record<JobTeam, string> = {
  engineering: 'Engineering',
  product: 'Product and Design',
  gtm: 'Go-to-market',
  operations: 'Operations',
}

export type JobItem = {
  id: string
  team: JobTeam
  title: string
  location: string
  type: string // e.g. "Full-time", "Contract"
  applyUrl?: string // optional override; falls back to mailto:careers@monkdb.com
}
