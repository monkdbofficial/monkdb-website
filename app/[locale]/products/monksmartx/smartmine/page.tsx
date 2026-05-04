import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmine'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmine',
    '/products/monksmartx/smartmine',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmartmine"
      related={[
        { slug: 'smartmanufacturing', namespace: 'monkSmartmanufacturing' },
        { slug: 'smartmobility', namespace: 'monkSmartmobility' },
        { slug: 'smartfinance', namespace: 'monkSmartfinance' },
      ]}
      fallback={{
        title: 'Monk SmartMine',
        subtitle:
          'Real-time operational intelligence for mining ecosystems. Sensor data, equipment telemetry, and environmental signals in one execution layer.',
        introTitle: 'Mining operations that adapt in real time',
        introBody:
          'Monk SmartMine integrates sensor data, equipment telemetry, and environmental signals to optimize mining operations. It enables ventilation-on-demand, predictive maintenance, and safety monitoring.',
        capabilitiesTitle: 'Built for the realities of underground and open-cut',
        capabilities: [
          {
            title: 'Ventilation-on-demand',
            body: 'Air flow that follows people and equipment, cutting energy without compromising safety.',
          },
          {
            title: 'Predictive maintenance',
            body: 'Detect failure modes in haul trucks, conveyors, and crushers before they take a shift down.',
          },
          {
            title: 'Safety monitoring',
            body: 'Live gas, dust, and proximity alerts with policy-driven escalation.',
          },
          {
            title: 'Production optimization',
            body: 'Throughput, grade, and dilution managed continuously against the production plan.',
          },
        ],
        ctaHeading: 'Run a mine that thinks for itself.',
      }}
    />
  )
}
