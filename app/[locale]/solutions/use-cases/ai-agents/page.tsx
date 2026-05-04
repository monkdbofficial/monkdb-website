import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/ai-agents'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseAiAgents',
    '/solutions/use-cases/ai-agents',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseAiAgents"
      related={[
        { slug: 'digital-twins', namespace: 'useCaseDigitalTwins' },
        { slug: 'fraud-detection', namespace: 'useCaseFraud' },
        {
          slug: 'financial-intelligence',
          namespace: 'useCaseFinance',
        },
      ]}
      fallback={{
        title: 'AI Agents and Copilots',
        subtitle:
          'A unified context plane where structured, unstructured, and vector data live together for reasoning and action.',
        introTitle: 'Fragmented context produces hallucinating agents',
        introBody:
          'AI agents need real-time context to reason and act accurately. In fragmented stacks, context is incomplete, stale, or scattered across vector stores, application databases, and event streams.',
        solutionTitle:
          'One plane for vectors, time-series, documents, and live state',
        solutionBody:
          'MonkDB provides a single context layer where structured, unstructured, and vector data coexist on live system state. Agents retrieve, reason, and act on the same continuously updated truth.',
        capabilitiesTitle: 'Production-grade agentic foundations',
        capabilities: [
          {
            title: 'Hybrid retrieval',
            body: 'Vector similarity, keyword search, and SQL filters in a single statement.',
          },
          {
            title: 'Live memory',
            body: 'Per-agent state and shared session memory backed by the same engine.',
          },
          {
            title: 'Tool execution',
            body: 'Agent actions land in the same plane that holds the context, with full audit trail.',
          },
          {
            title: 'Sovereign by default',
            body: 'Embeddings, prompts, and memory never leave your environment.',
          },
        ],
        ctaHeading: 'Give your agents the live context they need.',
      }}
    />
  )
}
