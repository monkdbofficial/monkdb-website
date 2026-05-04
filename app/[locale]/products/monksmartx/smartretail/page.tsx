import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartretail'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartretail',
    '/products/monksmartx/smartretail',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmartretail"
      related={[
        { slug: 'smartfinance', namespace: 'monkSmartfinance' },
        { slug: 'smartmanufacturing', namespace: 'monkSmartmanufacturing' },
        { slug: 'smartmobility', namespace: 'monkSmartmobility' },
      ]}
      fallback={{
        title: 'Monk SmartRetail',
        subtitle:
          'Real-time customer and operations intelligence. Behaviour, inventory, and transaction signals unified for personalized, dynamic retail.',
        introTitle: 'Retail that responds to every customer and every shelf',
        introBody:
          'Monk SmartRetail integrates customer behaviour, inventory data, and transaction signals to enable personalized experiences, demand forecasting, and dynamic pricing.',
        capabilitiesTitle: 'From storefront to supply chain',
        capabilities: [
          {
            title: 'Personalization',
            body: 'Recommendations grounded in live behaviour and inventory state.',
          },
          {
            title: 'Demand forecasting',
            body: 'SKU-level forecasts that update on every transaction.',
          },
          {
            title: 'Dynamic pricing',
            body: 'Price decisions informed by demand, competition, and elasticity in real time.',
          },
          {
            title: 'Inventory intelligence',
            body: 'Stockouts and overstocks flagged as they form, not at end-of-day reconciliation.',
          },
        ],
        ctaHeading: 'Build retail that adapts to every shopper.',
      }}
    />
  )
}
