import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmobility'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmobility',
    '/products/monksmartx/smartmobility',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmartmobility"
      related={[
        { slug: 'smartmanufacturing', namespace: 'monkSmartmanufacturing' },
        { slug: 'smartretail', namespace: 'monkSmartretail' },
        { slug: 'smartfinance', namespace: 'monkSmartfinance' },
      ]}
      fallback={{
        title: 'Monk SmartMobility',
        subtitle:
          'Intelligent systems for connected and autonomous mobility, from smart cities to logistics networks to vehicle ecosystems.',
        introTitle:
          'Mobility that coordinates, predicts, and routes in real time',
        introBody:
          'Monk SmartMobility processes real-time location, traffic, and behavioural data to enable dynamic routing, fleet optimization, and predictive mobility systems.',
        capabilitiesTitle: 'From single fleet to citywide network',
        capabilities: [
          {
            title: 'Dynamic routing',
            body: 'Routes recomputed on the latest traffic, weather, and demand state.',
          },
          {
            title: 'Fleet optimization',
            body: 'Utilization, dwell, and energy modeled per asset, in real time.',
          },
          {
            title: 'Predictive mobility',
            body: 'Demand and congestion forecasts that feed back into operations.',
          },
          {
            title: 'Connected vehicle data plane',
            body: 'Per-vehicle telemetry, OTA state, and policy in one engine.',
          },
        ],
        ctaHeading: 'Coordinate networks at the speed of movement.',
      }}
    />
  )
}
