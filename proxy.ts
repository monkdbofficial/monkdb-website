import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from './i18n/config'

function getLocale(request: NextRequest): Locale {
  const accept = request.headers.get('accept-language') ?? ''
  const tags = accept
    .split(',')
    .map((t) => t.split(';')[0].trim().toLowerCase())
    .filter(Boolean)

  for (const tag of tags) {
    const primary = tag.split('-')[0]
    const match = (locales as readonly string[]).find((l) => l === primary)
    if (match) return match as Locale
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
