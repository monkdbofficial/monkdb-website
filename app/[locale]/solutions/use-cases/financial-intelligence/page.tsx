import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import UseCaseDetailContent from '@/components/UseCaseDetailContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/solutions/use-cases/financial-intelligence'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'useCaseFinance',
    '/solutions/use-cases/financial-intelligence',
    locale,
  )
}

export default function Page() {
  return (
    <UseCaseDetailContent
      namespace="useCaseFinance"
      related={[
        { slug: 'fraud-detection', namespace: 'useCaseFraud' },
        { slug: 'ai-agents', namespace: 'useCaseAiAgents' },
        { slug: 'smart-mobility', namespace: 'useCaseMobility' },
      ]}
      fallback={{
        title: 'Financial Intelligence',
        subtitle:
          'Low-latency analytics, trading, and risk decisions on a unified real-time plus historical plane.',
        introTitle: 'Latency in the data layer becomes alpha lost',
        introBody:
          'Financial systems require low-latency processing of large volumes of transactional and market data. Traditional architectures introduce delays at every layer.',
        solutionTitle:
          'Real-time and historical data in one query plane',
        solutionBody:
          'MonkDB unifies real-time and historical data, enabling continuous analysis and execution in the same engine. Risk, trading, and operational intelligence run with minimal latency.',
        capabilitiesTitle:
          'Trading-floor performance, audit-grade governance',
        capabilities: [
          {
            title: 'Sub-millisecond order analytics',
            body: 'Execution quality, slippage, and fill metrics in line with the order itself.',
          },
          {
            title: 'Live risk',
            body: 'VaR, exposure, and limits recomputed on every fill without a stale window.',
          },
          {
            title: 'Backtest on production data',
            body: 'Same engine for live trading and historical replay, no data export step.',
          },
          {
            title: 'Regulator-ready audit',
            body: 'Full trace of every decision, query, and policy evaluation.',
          },
        ],
        ctaHeading:
          'Decide on live state, not on yesterday or last quarter.',
      }}
    />
  )
}
