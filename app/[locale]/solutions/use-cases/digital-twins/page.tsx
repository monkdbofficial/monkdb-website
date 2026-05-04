import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/digital-twins'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseDigitalTwins',
    '/solutions/use-cases/digital-twins',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseDigitalTwins"
      related={[
        { slug: 'ai-agents', namespace: 'useCaseAiAgents' },
        { slug: 'smart-manufacturing', namespace: 'useCaseManufacturing' },
        { slug: 'smart-mobility', namespace: 'useCaseMobility' },
      ]}
      fallback={{
        title: 'Digital Twins',
        subtitle:
          'Real-time system modeling, simulation, and autonomous operation in one continuous loop.',
        introTitle: 'Synchronization breaks when data moves through pipelines',
        introBody:
          'Digital twins require continuous synchronization between physical systems and their digital representations. Traditional architectures struggle because data is processed in batches, moved across systems, and reconciled after the fact.',
        solutionTitle:
          'Live ingestion, native intelligence, embedded execution',
        solutionBody:
          'MonkDB ingests sensor and system data in real time, continuously updating the digital model. Twins do not just reflect current state. They simulate, predict, and trigger corrective actions.',
        capabilitiesTitle: 'Built for live, predictive twins',
        capabilities: [
          {
            title: 'Sub-millisecond ingest',
            body: 'Capture telemetry at the source with no batching, no buffering, no pipeline glue.',
          },
          {
            title: 'Continuous state model',
            body: 'Always-current view of every entity, with vector and time-series in one engine.',
          },
          {
            title: 'In-engine simulation',
            body: 'Run what-if scenarios on live state without exporting to a separate analytics system.',
          },
          {
            title: 'Closed-loop execution',
            body: 'Trigger actions and parameter adjustments directly from the twin model.',
          },
        ],
        ctaHeading: 'Build twins that act, not just reflect.',
      }}
    />
  )
}
