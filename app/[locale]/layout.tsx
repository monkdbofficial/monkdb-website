import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Providers } from '../providers'
import { I18nProvider } from '@/i18n/I18nProvider'
import { getDictionary } from '@/i18n/dictionaries'
import Analytics, { GTMNoScript } from '@/components/Analytics'
import StructuredData from '@/components/StructuredData'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import {
  isLocale,
  locales,
  localizedHref,
  ogLocales,
  SITE_URL,
  type Locale,
} from '@/i18n/config'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  const meta = dict.meta as {
    title: string
    description: string
    keywords: string
    ogImageAlt: string
  }

  const canonical = `${SITE_URL}${localizedHref('/', locale)}`
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}${localizedHref('/', l)}`]),
  )
  languages['x-default'] = `${SITE_URL}${localizedHref('/', 'en')}`

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'MonkDB',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
      locale: ogLocales[locale as Locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)

  // Server-side platform detection. Read the User-Agent header so the
  // [data-platform] attribute is present in the SSR HTML — no FOUC, no
  // hydration race, no dependency on navigator.userAgentData. The
  // Windows-scoped CSS in app/globals.css uses this to shrink the page
  // physically so 1920×1080 @ 125% DPI laptops render at Mac density.
  const ua = (await headers()).get('user-agent') ?? ''
  const platform = /Windows/i.test(ua) ? 'windows' : undefined

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-platform={platform}
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className="font-sans antialiased min-h-screen"
        style={{ paddingTop: 'var(--banner-h, 0px)' }}
        suppressHydrationWarning
      >
        <StructuredData />
        <GTMNoScript />
        <Providers>
          <I18nProvider locale={locale as Locale} dict={dict}>
            <AnnouncementBanner />
            {children}
          </I18nProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
