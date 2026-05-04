import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smarttrade'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmarttrade',
    '/products/monksmartx/smarttrade',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmarttrade"
      related={[
        { slug: 'smartfinance', namespace: 'monkSmartfinance' },
        { slug: 'smartretail', namespace: 'monkSmartretail' },
        { slug: 'smartmobility', namespace: 'monkSmartmobility' },
      ]}
      fallback={{
        title: 'Monk SmartTrade',
        subtitle:
          'AI-native trading and execution systems. Market signals, sentiment, and trading data processed in real time for low-latency decisioning.',
        introTitle: 'Continuous-learning systems for modern markets',
        introBody:
          'Monk SmartTrade processes market signals, sentiment, and trading data in real time to optimize execution strategies. It enables low-latency decisioning, risk-aware trading, and continuous-learning systems.',
        capabilitiesTitle: 'From signal to fill in one plane',
        capabilities: [
          {
            title: 'Multi-source signal fusion',
            body: 'Market data, news, alternative data, and sentiment in one engine.',
          },
          {
            title: 'Low-latency execution',
            body: 'Decision and routing logic next to the data, not over a network hop.',
          },
          {
            title: 'Risk-aware strategies',
            body: 'Position, exposure, and risk limits applied per order in real time.',
          },
          {
            title: 'Continuous learning',
            body: 'Models retrain on production state without disrupting live trading.',
          },
        ],
        ctaHeading: 'Run strategies that improve as markets move.',
      }}
    />
  )
}
