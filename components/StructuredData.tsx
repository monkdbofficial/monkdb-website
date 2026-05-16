import { SITE_URL } from '@/i18n/config'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MonkDB',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'The AI-Native Unified Database. Vector, time-series, geospatial, document, blob, full-text search, and streaming SQL on a single execution platform.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@monkdb.com',
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@monkdb.com',
      availableLanguage: ['English'],
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MonkDB',
  url: SITE_URL,
  inLanguage: ['en', 'es', 'de', 'fr', 'hi', 'ja', 'zh'],
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
