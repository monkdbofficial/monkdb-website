import type { Metadata } from 'next'
import { buildSubpageMetadata } from '@/i18n/pageMetadata'
import MonkSmartXProductContent from '@/components/MonkSmartXProductContent'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/products/monksmartx/smartfinance'>): Promise<Metadata> {
  const { locale } = await params
  return buildSubpageMetadata(
    'monkSmartfinance',
    '/products/monksmartx/smartfinance',
    locale,
  )
}

export default function Page() {
  return (
    <MonkSmartXProductContent
      namespace="monkSmartfinance"
      related={[
        { slug: 'smarttrade', namespace: 'monkSmarttrade' },
        { slug: 'smartretail', namespace: 'monkSmartretail' },
        { slug: 'smartmobility', namespace: 'monkSmartmobility' },
      ]}
      fallback={{
        title: 'Monk SmartFinance',
        subtitle:
          'Real-time financial intelligence and risk management. Transactional, behavioural, and market data unified for instant decisioning.',
        introTitle: 'Financial operations on a continuous data plane',
        introBody:
          'Monk SmartFinance unifies transactional, behavioural, and market data to enable fraud detection, risk scoring, and compliance monitoring.',
        capabilitiesTitle: 'Built for banks, insurers, and capital markets',
        capabilities: [
          {
            title: 'Fraud detection',
            body: 'Score every transaction against models and rules in line.',
          },
          {
            title: 'Real-time risk scoring',
            body: 'Customer, counterparty, and portfolio risk recomputed continuously.',
          },
          {
            title: 'Compliance monitoring',
            body: 'AML, KYC, and policy violations flagged as they happen.',
          },
          {
            title: 'Audit-grade lineage',
            body: 'Every decision is traceable to the data and model version that produced it.',
          },
        ],
        ctaHeading: 'Decide before the transaction settles.',
      }}
    />
  )
}
