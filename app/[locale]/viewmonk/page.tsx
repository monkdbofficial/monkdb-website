import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DownloadsEmbed from './DownloadsEmbed'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

// The ViewMonk download page HTML lives on Cloudflare R2 so that release
// builds can replace it without touching this codebase. We fetch the body
// (and inline styles) server-side and render them inside the site shell so
// the Navbar and Footer wrap the page cleanly.
const R2_URL =
  'https://pub-cc3901daba764b61bc2141554b3d1652.r2.dev/downloads/index.html'

// Re-fetch every 5 minutes. The R2 file changes only on a release tag push
// or a manual workflow run, so an aggressive cache is fine.
export const revalidate = 300

type Embed = { style: string; body: string }

/**
 * Strip CSS rules that bleed into the site shell. The R2 download page is
 * designed as a standalone document, so it includes rules like
 *   body { font-family: ... }
 *   footer { background: #060c18 }
 *   *, *::before, *::after { margin: 0; padding: 0 }
 * When injected inside the site, those selectors collide with the real
 * site body, footer, and every element, dragging the Navbar/Footer into
 * the ViewMonk page's dark theme. The class-based rules
 * (.dl-card, .hero, .section, etc.) only target elements inside the
 * embedded body, so they stay.
 */
function stripGlobalSelectors(css: string): string {
  return (
    css
      // Universal reset
      .replace(/\*\s*,\s*\*::before\s*,\s*\*::after\s*\{[^}]*\}/g, '')
      // Bare element selectors that collide with the site shell
      .replace(/(^|\s|\})body\s*\{[^}]*\}/g, '$1')
      .replace(/(^|\s|\})html\s*\{[^}]*\}/g, '$1')
      .replace(/(^|\s|\})footer\s*\{[^}]*\}/g, '$1')
      .replace(/(^|\s|\})nav\s*\{[^}]*\}/g, '$1')
      .replace(/(^|\s|\})section\s*\{[^}]*\}/g, '$1')
      .replace(/(^|\s|\})a\s*\{[^}]*\}/g, '$1')
      // Global selection styling
      .replace(/::selection\s*\{[^}]*\}/g, '')
  )
}

async function fetchEmbed(loadFailedMsg: string): Promise<Embed> {
  const res = await fetch(R2_URL, { next: { revalidate } })
  if (!res.ok) {
    return { style: '', body: `<p>${loadFailedMsg}</p>` }
  }
  const html = await res.text()
  const rawStyle = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
  const style = stripGlobalSelectors(rawStyle)
  const rawBody = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? ''
  // Strip <script> blocks — copy buttons get re-wired client-side because
  // dangerouslySetInnerHTML does not execute injected scripts.
  const body = rawBody.replace(/<script[\s\S]*?<\/script>/g, '')
  return { style, body }
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/viewmonk'>): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = ((dict as Record<string, unknown>).viewmonk ?? {}) as Record<string, string>
  return {
    title: t.metaTitle ?? 'ViewMonk Workbench: Download',
    description:
      t.metaDescription ??
      'Download ViewMonk Workbench. The enterprise grade visual interface for AI native distributed databases.',
  }
}

export default async function DownloadsPage({
  params,
}: PageProps<'/[locale]/viewmonk'>) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const t = ((dict as Record<string, unknown>).viewmonk ?? {}) as Record<string, string>
  const { style, body } = await fetchEmbed(
    t.loadFailed ?? 'Failed to load download page.',
  )
  return (
    <main className="min-h-screen">
      <Navbar />
      <DownloadsEmbed style={style} body={body} />
      <Footer />
    </main>
  )
}
