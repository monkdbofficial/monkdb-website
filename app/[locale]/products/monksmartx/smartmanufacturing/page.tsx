import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartmanufacturing'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartmanufacturing',
    '/products/monksmartx/smartmanufacturing',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmartmanufacturing"
      related={[
        { slug: 'smartmine', namespace: 'monkSmartmine' },
        { slug: 'smartmobility', namespace: 'monkSmartmobility' },
        { slug: 'smartretail', namespace: 'monkSmartretail' },
      ]}
      fallback={{
        title: 'Monk SmartManufacturing',
        subtitle:
          'Adaptive and intelligent manufacturing systems. Machine, sensor, and operational data unified for predictive, real-time control.',
        introTitle: 'Adaptive production lines, end to end',
        introBody:
          'Monk SmartManufacturing connects machines, sensors, and operational systems to enable predictive maintenance, process optimization, and real-time control.',
        capabilitiesTitle: 'From cell to enterprise MES',
        capabilities: [
          {
            title: 'Predictive maintenance',
            body: 'Telemetry-driven failure prediction across rotating equipment, motors, and tooling.',
          },
          {
            title: 'Process optimization',
            body: 'Continuous parameter tuning against live yield, quality, and energy signals.',
          },
          {
            title: 'Real-time control',
            body: 'Supervisory loops that close inside the engine, not via downstream batch jobs.',
          },
          {
            title: 'Resilient operations',
            body: 'Edge nodes keep the line running through outages and sync on reconnect.',
          },
        ],
        ctaHeading: 'Build a line that adapts in real time.',
      }}
    />
  )
}
