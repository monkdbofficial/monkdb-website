import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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

export const metadata: Metadata = {
  title: 'MonkDB - The AI-Native Unified Database',
  description:
    'MonkDB is your AI-native solution for seamless data integration and actionable insights. Vector, Time-Series, Geospatial, Document, Blob, Full-Text Search, Streaming SQL.',
  keywords:
    'MonkDB, AI database, vector database, time-series, geospatial, unified database, enterprise database',
  openGraph: {
    title: 'MonkDB - The AI-Native Unified Database',
    description:
      'MonkDB is your AI-native solution for seamless data integration and actionable insights.',
    url: 'https://www.monkdb.com',
    siteName: 'MonkDB',
    images: [
      {
        url: 'https://www.monkdb.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MonkDB - The AI-Native Unified Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MonkDB - The AI-Native Unified Database',
    description:
      'MonkDB is your AI-native solution for seamless data integration and actionable insights.',
    images: ['https://www.monkdb.com/og-image.png'],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-sans antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
