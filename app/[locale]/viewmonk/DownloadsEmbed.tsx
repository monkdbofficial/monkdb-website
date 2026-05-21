'use client'

import { useEffect } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

const COPY_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
const CHECK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'

/**
 * Renders the ViewMonk download page body inside the site shell.
 *
 * The R2 HTML's copy buttons use inline `onclick="copyCode(this, \`text\`)"`
 * handlers that reference a global function injected via `<script>`. Because
 * we render the body via dangerouslySetInnerHTML, the `<script>` is dropped
 * and the inline handlers have no implementation to call. We re-wire them
 * here via event delegation on the wrapper div.
 */
export default function DownloadsEmbed({
  style,
  body,
}: {
  style: string
  body: string
}) {
  const { dict } = useI18n()
  const t = (((dict as Record<string, unknown>).viewmonk) ?? {}) as Record<string, string>
  const copyLabel = t.copy ?? 'Copy'
  const copiedLabel = t.copied ?? 'Copied'
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const btn = target?.closest('.copy-btn') as HTMLButtonElement | null
      if (!btn) return
      const onclickAttr = btn.getAttribute('onclick') ?? ''
      const m = onclickAttr.match(/copyCode\(this,\s*`([\s\S]*?)`\)/)
      if (!m) return
      e.preventDefault()
      const text = m[1]
      const done = () => {
        btn.classList.add('copied')
        btn.innerHTML = `${CHECK_SVG}${copiedLabel}`
        window.setTimeout(() => {
          btn.classList.remove('copied')
          btn.innerHTML = `${COPY_SVG}${copyLabel}`
        }, 1800)
      }
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        try {
          document.execCommand('copy')
          done()
        } catch {
          /* noop */
        }
        document.body.removeChild(ta)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [copyLabel, copiedLabel])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div
        className="viewmonk-embed"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  )
}
