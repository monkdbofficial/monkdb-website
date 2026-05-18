/**
 * Resource Library catalog. Rendered on /resources/resources.
 *
 * To add an entry: append an object to RESOURCE_LIBRARY with a stable `id`,
 * the right `kind`, and a real `url`. External URLs open in a new tab;
 * relative paths (e.g. /assets/whitepaper.pdf) link in-app.
 *
 * Titles and descriptions stay English across all locales (same treatment
 * as product and industry names).
 */

export type ResourceKind = 'whitepaper' | 'github' | 'demo' | 'video'

export type ResourceItem = {
  id: string
  kind: ResourceKind
  title: string
  summary: string
  url: string
  meta?: string
  body?: string
}

export const RESOURCE_LIBRARY: ResourceItem[] = [
  // ── White papers ──────────────────────────────────────────────────────────
  {
    id: 'wp-ai-native-execution',
    kind: 'whitepaper',
    title: 'The AI-Native Execution Engine',
    summary:
      'How a unified data plane replaces the Lambda stack: vector, time-series, geospatial, and streaming SQL in one engine.',
    url: '/whitepapers/ai-native-execution.pdf',
    meta: 'PDF · 18 pages',
  },
  {
    id: 'wp-sovereign-data',
    kind: 'whitepaper',
    title: 'Sovereign Data, Sovereign AI',
    summary:
      'A blueprint for running AI workloads inside regulated environments without giving up cloud-grade ergonomics.',
    url: '/whitepapers/sovereign-data.pdf',
    meta: 'PDF · 22 pages',
  },
  {
    id: 'wp-edge-to-cloud',
    kind: 'whitepaper',
    title: 'Edge to Cloud Continuum',
    summary:
      'Patterns for running the same query on a substation, a vehicle, and a cloud cluster with consistent semantics.',
    url: '/whitepapers/edge-to-cloud.pdf',
    meta: 'PDF · 14 pages',
  },

  // ── GitHub repositories ───────────────────────────────────────────────────
  {
    id: 'gh-monkdb-core',
    kind: 'github',
    title: 'monkdb / monkdb',
    summary:
      'Core engine. Operational data plane, real-time execution, vector and time-series storage.',
    url: 'https://github.com/monkdb/monkdb',
    meta: 'Repo · primary',
  },
  {
    id: 'gh-monkdb-cli',
    kind: 'github',
    title: 'monkdb / cli',
    summary:
      'Command-line interface for MonkDB. Connect, query, manage clusters, and stream changes.',
    url: 'https://github.com/monkdb/cli',
    meta: 'Repo · TypeScript',
  },
  {
    id: 'gh-monkdb-examples',
    kind: 'github',
    title: 'monkdb / examples',
    summary:
      'Runnable reference projects: SmartMine ingest, SmartTrade risk, SmartRetail personalization.',
    url: 'https://github.com/monkdb/examples',
    meta: 'Repo · samples',
  },

  // ── Live demos ────────────────────────────────────────────────────────────
  {
    id: 'demo-smartmine',
    kind: 'demo',
    title: 'SmartMine Live Demo',
    summary:
      'Browse a working SmartMine dashboard with live signals from a simulated underground operation.',
    url: 'https://demo.monkdb.com/smartmine',
    meta: 'Open in browser',
  },
  {
    id: 'demo-smarttrade',
    kind: 'demo',
    title: 'SmartTrade Risk Console',
    summary:
      'Continuous risk recompute across a synthetic portfolio. Sub-second updates on a single MonkDB cluster.',
    url: 'https://demo.monkdb.com/smarttrade',
    meta: 'Open in browser',
  },
  {
    id: 'demo-playground',
    kind: 'demo',
    title: 'MonkDB SQL Playground',
    summary:
      'A sandboxed SQL console pointed at a public demo dataset. Run vector, time-series, and full-text queries.',
    url: 'https://demo.monkdb.com/playground',
    meta: 'Open in browser',
  },

  // ── Videos / YouTube ──────────────────────────────────────────────────────
  {
    id: 'video-architecture-tour',
    kind: 'video',
    title: 'MonkDB Architecture Tour',
    summary:
      'A 12-minute walkthrough of the unified execution plane, from ingest to inference.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    meta: 'YouTube · 12 min',
  },
  {
    id: 'video-vector-deep-dive',
    kind: 'video',
    title: 'Vector Search Deep Dive',
    summary:
      'How vector indexes, ANN, and SQL co-exist in a single query plan. Recorded session.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    meta: 'YouTube · 24 min',
  },
  {
    id: 'video-smartx-overview',
    kind: 'video',
    title: 'MonkSmartX Product Overview',
    summary:
      'Six vertical applications built on the same core. Mining, trade, mobility, retail, manufacturing, and more.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    meta: 'YouTube · 8 min',
  },
]

export const RESOURCE_KIND_LABELS: Record<ResourceKind, string> = {
  whitepaper: 'White papers',
  github: 'GitHub',
  demo: 'Demos',
  video: 'Videos',
}
