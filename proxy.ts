import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from './i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the path already starts with a locale, render as-is.
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return

  // Otherwise, rewrite (NOT redirect) to /<defaultLocale><path>. The URL bar
  // stays clean; the [locale] segment renders the default-locale content.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // `downloads` and `releases` are proxied to Cloudflare R2 via next.config
  // rewrites and must NOT be rewritten to a locale-prefixed path here.
  matcher: ['/((?!_next|api|admin|downloads|releases|.*\\..*).*)'],
}
