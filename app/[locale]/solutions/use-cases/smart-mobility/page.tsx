import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/smart-mobility'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseMobility',
    '/solutions/use-cases/smart-mobility',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseMobility"
      related={[
        {
          slug: 'smart-manufacturing',
          namespace: 'useCaseManufacturing',
        },
        { slug: 'digital-twins', namespace: 'useCaseDigitalTwins' },
        { slug: 'ai-agents', namespace: 'useCaseAiAgents' },
      ]}
      fallback={{
        title: 'Smart Mobility',
        subtitle:
          'Dynamic routing, predictive coordination, and instant decisions across vehicles, infrastructure, and users.',
        introTitle: 'Coordination is impossible when data lags reality',
        introBody:
          'Mobility systems depend on real-time coordination across vehicles, infrastructure, and user interactions. Delays in processing impact safety, efficiency, and user experience.',
        solutionTitle:
          'Geospatial, telemetry, and behaviour in one continuous engine',
        solutionBody:
          'MonkDB ingests and processes location, telemetry, and behavioural data in real time. Geospatial indexing, time-series analytics, and predictive models live in one engine.',
        capabilitiesTitle: 'Built for fleets, networks, and connected vehicles',
        capabilities: [
          {
            title: 'Native geospatial',
            body: 'Spatial joins and proximity queries at fleet scale without a separate GIS stack.',
          },
          {
            title: 'Live ETA prediction',
            body: 'Models that reflect traffic, weather, and demand the moment they shift.',
          },
          {
            title: 'Dynamic dispatch',
            body: 'Decisions land at the vehicle, not after a hop through a central scheduler.',
          },
          {
            title: 'Edge resilience',
            body: 'MonkEdge keeps vehicles operating through connectivity gaps, syncing on reconnect.',
          },
        ],
        ctaHeading: 'Coordinate fleets at the speed of the road.',
      }}
    />
  )
}
