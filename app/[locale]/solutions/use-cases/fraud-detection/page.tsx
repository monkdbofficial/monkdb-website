import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/fraud-detection'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseFraud',
    '/solutions/use-cases/fraud-detection',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseFraud"
      related={[
        {
          slug: 'financial-intelligence',
          namespace: 'useCaseFinance',
        },
        { slug: 'ai-agents', namespace: 'useCaseAiAgents' },
        { slug: 'digital-twins', namespace: 'useCaseDigitalTwins' },
      ]}
      fallback={{
        title: 'Fraud Detection',
        subtitle:
          'Anomalies caught and acted on as transactions clear, not after the loss is booked.',
        introTitle: 'Batch detection lets fraud run before alarms fire',
        introBody:
          'Fraud detection depends on identifying anomalies across high-velocity data streams. Traditional systems rely on batch analysis or delayed processing.',
        solutionTitle:
          'Streaming, vectors, and rules in one execution loop',
        solutionBody:
          'MonkDB processes transactions, behavioural signals, and historical patterns simultaneously. Block, hold, or escalate decisions land before the transaction settles.',
        capabilitiesTitle: 'Stop fraud at the moment of decision',
        capabilities: [
          {
            title: 'Per-transaction p99 under 5 ms',
            body: 'Score every event against models and rules without leaving the data plane.',
          },
          {
            title: 'Behavioural vectors',
            body: 'Detect novel attack patterns by comparing live behaviour to learned baselines.',
          },
          {
            title: 'Federated investigation',
            body: 'Replay any transaction against full historical context for auditors and analysts.',
          },
          {
            title: 'Continuous learning',
            body: 'Outcomes feed back into models to harden detection without retraining downtime.',
          },
        ],
        ctaHeading: 'Detect, decide, and act in the same millisecond.',
      }}
    />
  )
}
