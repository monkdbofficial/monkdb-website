'use client'

/**
 * Why MonkDB — docx Page 3.
 *
 *   Four themes, each with a short body and a deeper "Explore More" paragraph:
 *     01  No Pipelines
 *     02  Real-Time by Design
 *     03  AI Inside the Engine
 *     04  Execution Built-In
 *
 * Built with DetailPageLayout. Each theme is a DetailSection whose body is a
 * rich ReactNode containing the deep content + tech-keyword tags.
 */

import DetailPageLayout, {
  type DetailSection,
} from '@/components/DetailPageLayout'
import { useI18n } from '@/i18n/I18nProvider'

export default function WhyChooseUsPage() {
  const { dict } = useI18n()
  const all = dict as Record<string, unknown>
  const t = ((all.whyMonkDB) ?? {}) as Record<string, string>
  const cta = ((all.detailCommon) ?? {}) as Record<string, string>

  type Theme = {
    eyebrow: string
    title: string
    body: string
    detail: string
    tags: string[]
  }

  const tagsFor = (n: number): string[] =>
    [t[`theme${n}Tag1`], t[`theme${n}Tag2`], t[`theme${n}Tag3`]].filter(
      Boolean,
    ) as string[]

  const themes: Theme[] = [
    {
      eyebrow: t.theme1Eyebrow ?? '01 / Pipelines',
      title: t.theme1Title ?? 'No Pipelines',
      body:
        t.theme1Body ??
        'Eliminate ETL complexity. Process and act on data in-place without pipelines, reducing latency and overhead.',
      detail:
        t.theme1Detail ??
        'Traditional architectures depend on ETL pipelines to move data between systems. MonkDB eliminates pipelines by enabling ingestion, processing, and querying within the same system.',
      tags: tagsFor(1).length
        ? tagsFor(1)
        : ['No ETL', 'In-place compute', 'One engine'],
    },
    {
      eyebrow: t.theme2Eyebrow ?? '02 / Real-Time',
      title: t.theme2Title ?? 'Real-Time by Design',
      body:
        t.theme2Body ??
        'Ingestion and execution happen simultaneously. Every signal updates state instantly.',
      detail:
        t.theme2Detail ??
        'MonkDB is built as a continuous system where ingestion, processing, and execution happen simultaneously. Every incoming signal updates system state instantly.',
      tags: tagsFor(2).length
        ? tagsFor(2)
        : ['Continuous', 'Sub-ms write', 'Live state'],
    },
    {
      eyebrow: t.theme3Eyebrow ?? '03 / Intelligence',
      title: t.theme3Title ?? 'AI Inside the Engine',
      body:
        t.theme3Body ??
        'Embed AI directly into the data layer. Continuous learning and decisioning, not bolt-on inference.',
      detail:
        t.theme3Detail ??
        'MonkDB embeds AI capabilities directly within the core engine. Vector search, hybrid queries, and contextual intelligence operate natively on live data.',
      tags: tagsFor(3).length
        ? tagsFor(3)
        : ['Vector', 'Hybrid retrieval', 'Live context'],
    },
    {
      eyebrow: t.theme4Eyebrow ?? '04 / Execution',
      title: t.theme4Title ?? 'Execution Built-In',
      body:
        t.theme4Body ??
        'Decisions trigger actions inside the system. The loop closes here, not in an external workflow.',
      detail:
        t.theme4Detail ??
        'MonkDB closes the gap between knowing and acting. Decisions execute instantly inside the engine, without leaving the platform.',
      tags: tagsFor(4).length
        ? tagsFor(4)
        : ['Triggers', 'Workflows', 'Closed loop'],
    },
  ]

  // Render each theme's body as: short paragraph + detail paragraph + chip row
  const themeSections: DetailSection[] = themes.map((th, i) => ({
    eyebrow: th.eyebrow,
    title: th.title,
    body: (
      <div className="flex flex-col gap-4">
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.7,
            margin: 0,
            color: '#0A2280',
          }}
        >
          {th.body}
        </p>
        <p
          className="text-gray-600 dark:text-gray-400"
          style={{
            fontSize: 'clamp(13.5px, 1.05vw, 15.5px)',
            fontWeight: 400,
            lineHeight: 1.7,
            margin: 0,
            paddingTop: '14px',
            borderTop: '1px dashed rgba(10,34,128,0.12)',
          }}
        >
          {th.detail}
        </p>
        <ul
          className="flex flex-wrap gap-1.5 mt-1"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {th.tags.map((tag) => (
            <li
              key={tag}
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(26,56,232,0.06)',
                border: '1px solid rgba(26,56,232,0.16)',
                color: '#1A38E8',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    ),
    variant: i % 2 === 0 ? 'light' : 'parchment',
  }))

  return (
    <DetailPageLayout
      title={t.title ?? 'Why MonkDB'}
      subtitle={
        t.subtitle ??
        'Four shifts that turn fragmented data infrastructure into one continuous operating plane.'
      }
      sections={[
        {
          eyebrow: t.eyebrowIntro ?? 'Overview',
          title:
            t.introTitle ??
            'Most platforms stop at insight. MonkDB executes.',
          body:
            t.introBody ??
            'Traditional architectures separate data, AI, and execution into distinct layers connected by pipelines. The result is delay, fragility, and operational drag.',
          variant: 'light',
        },
        ...themeSections,
      ]}
      ctaHeading={t.ctaHeading ?? 'Run on a system that closes the loop.'}
      ctaDescription={cta.ctaDescription}
      ctaButton={cta.ctaButton}
    />
  )
}
