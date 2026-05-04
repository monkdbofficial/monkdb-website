'use client'

import DetailPageLayout, {
  type CapabilityCard,
} from '@/components/DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function DevelopersContent() {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all.developers) ?? {}) as Record<string, string>
  const cta = ((all.detailCommon) ?? {}) as Record<string, string>

  const capabilities: CapabilityCard[] = []
  for (let i = 1; i <= 6; i++) {
    const title = t[`cap${i}Title`]
    const body = t[`cap${i}Body`]
    if (title && body) capabilities.push({ title, body })
  }
  if (capabilities.length === 0) {
    capabilities.push(
      {
        title: 'SQL-first',
        body: 'Standard SQL across every workload. Vectors, time-series, geospatial, documents, and blobs in one dialect.',
      },
      {
        title: 'First-class SDKs',
        body: 'Idiomatic clients for Python, TypeScript, Go, Java, and Rust with full async support.',
      },
      {
        title: 'REST and gRPC',
        body: 'Stable, versioned APIs with OpenAPI and protobuf definitions you can generate against.',
      },
      {
        title: 'Streaming SQL',
        body: 'Continuous queries, windows, and joins on event streams without a separate stream processor.',
      },
      {
        title: 'Vector and hybrid search',
        body: 'ANN, exact, and hybrid retrieval with metadata filters in one statement.',
      },
      {
        title: 'Local development',
        body: 'Single-binary local runtime that mirrors production semantics. Docker images for CI.',
      },
    )
  }

  // Build integrations list (any of integration1..integration12 that exist)
  const integrationLabels: string[] = []
  for (let i = 1; i <= 12; i++) {
    const label = t[`integration${i}`]
    if (label) integrationLabels.push(label)
  }
  if (integrationLabels.length === 0) {
    integrationLabels.push(
      'Apache Kafka',
      'Apache Iceberg',
      'dbt',
      'Airflow',
      'Spark',
      'Grafana',
      'LangChain',
      'LlamaIndex',
      'OpenAI',
      'Anthropic',
      'Hugging Face',
      'Kubernetes',
    )
  }

  const integrationsBody = (
    <div className="flex flex-col gap-4">
      <p
        style={{
          fontSize: 'clamp(15px, 1.2vw, 18px)',
          fontWeight: 400,
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {t.ecosystemBody ??
          'MonkDB integrates seamlessly with existing tools and workflows. Connect applications, analytics, and AI frameworks without disrupting current systems.'}
      </p>
      <ul
        className="flex flex-wrap gap-2 sm:gap-2.5 mt-2"
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {integrationLabels.map((label) => (
          <li
            key={label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '7px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(10,20,60,0.12)',
              background: 'white',
              color: '#1F2937',
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.005em',
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <DetailPageLayout
      title={t.title ?? 'Built for Builders'}
      subtitle={
        t.subtitle ??
        'SQL-first APIs and SDKs. No new paradigms, no pipeline glue. Ship real-time and AI-powered systems in days, not quarters.'
      }
      sections={[
        {
          eyebrow: t.eyebrowIntro ?? 'The shift',
          title: t.introTitle ?? 'One platform replaces five',
          body:
            t.introBody ??
            'Modern development teams are constrained by fragmented data stacks. MonkDB simplifies development with familiar SQL, APIs, and SDKs.',
          variant: 'light',
        },
        {
          eyebrow: t.eyebrowFocus ?? 'Why developers choose MonkDB',
          title:
            t.focusTitle ??
            'Spend time on functionality, not architecture',
          body:
            t.focusBody ??
            'By eliminating data movement and reducing system dependencies, MonkDB lets developers focus on building features rather than maintaining glue.',
          variant: 'parchment',
        },
      ]}
      capabilities={{
        eyebrow: t.capabilitiesEyebrow ?? 'Capabilities',
        title:
          t.capabilitiesTitle ?? 'Production-grade primitives, day one',
        items: capabilities,
      }}
      closingSections={[
        {
          eyebrow: t.ecosystemEyebrow ?? 'Ecosystem',
          title:
            t.ecosystemTitle ?? 'Works with the tools you already run',
          body: integrationsBody,
          variant: 'parchment',
        },
      ]}
      ctaHeading={
        t.ctaHeading ?? 'Stop managing pipelines. Start building features.'
      }
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
