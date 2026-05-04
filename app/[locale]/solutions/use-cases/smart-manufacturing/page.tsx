import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/smart-manufacturing'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseManufacturing',
    '/solutions/use-cases/smart-manufacturing',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseManufacturing"
      related={[
        { slug: 'digital-twins', namespace: 'useCaseDigitalTwins' },
        { slug: 'smart-mobility', namespace: 'useCaseMobility' },
        { slug: 'ai-agents', namespace: 'useCaseAiAgents' },
      ]}
      fallback={{
        title: 'Smart Manufacturing',
        subtitle:
          'Operational intelligence that predicts failures, corrects drift, and optimizes throughput continuously.',
        introTitle: 'Pipelines cannot keep up with the line',
        introBody:
          'Manufacturing systems generate continuous streams from machines, sensors, and control systems. Fragmented pipelines lose context between layers.',
        solutionTitle:
          'Live machine state with embedded prediction and control',
        solutionBody:
          'MonkDB unifies machine, sensor, and process data in one engine. Detect inefficiencies, predict failures, and trigger corrective actions instantly.',
        capabilitiesTitle: 'From sensor to corrective action in milliseconds',
        capabilities: [
          {
            title: 'OPC UA and MQTT ingest',
            body: 'Native protocols for industrial telemetry with no intermediate broker required.',
          },
          {
            title: 'Predictive maintenance',
            body: 'Vector and time-series correlation flags failure modes before they take a line down.',
          },
          {
            title: 'Process optimization',
            body: 'Continuous parameter tuning based on live yield and quality signals.',
          },
          {
            title: 'Edge to data center',
            body: 'Same engine on the plant floor and in central historians, with zero data loss in transit.',
          },
        ],
        ctaHeading: 'Run an adaptive line, not a reactive one.',
      }}
    />
  )
}
