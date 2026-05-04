/**
 * Developer Journey Map — content from Website content part II.docx, image 5.
 * 8-stage guided path: Discover → Explore → Learn → Build → Run → Scale → Automate → Optimize.
 */

export type JourneyStage = {
  number: string
  title: string
  tagline: string
  items: string[]
  outcome: string
  cta: string
  ctaHref: string
}

export const DEVELOPER_JOURNEY: JourneyStage[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'See how it works in seconds.',
    items: [
      'Platform Overview',
      'Core Systems Explainer',
      'AI Engine Demo',
      'Architecture Infographic',
      'Use Cases Snapshot',
    ],
    outcome: 'Clear understanding of why MonkDB exists.',
    cta: 'Explore Platform',
    ctaHref: '/features',
  },
  {
    number: '02',
    title: 'Explore',
    tagline: 'See how it works in domains.',
    items: [
      'Industry Solutions',
      'Workload Patterns',
      'Reference Architectures',
      'Customer Use Cases',
    ],
    outcome: 'Clarity on where MonkDB fits in your stack.',
    cta: 'Explore Solutions',
    ctaHref: '/solutions',
  },
  {
    number: '03',
    title: 'Learn',
    tagline: 'Master key concepts and capabilities.',
    items: [
      'Documentation',
      'Workload Deep Dives',
      'Architecture Guides',
      'AI in MonkDB',
      'Whitepapers',
    ],
    outcome: 'Confidence in design and architecture decisions.',
    cta: 'Read the Docs',
    ctaHref: 'https://docs.monkdb.com',
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Getting started, set up, ship.',
    items: [
      'Getting Started Guide',
      'Sandbox',
      'APIs and SDKs',
      'Query and Data Models',
      'Streaming and Ingestion',
      'GitHub Repository',
    ],
    outcome: 'Your first MonkDB application running.',
    cta: 'Start Building',
    ctaHref: '/developers',
  },
  {
    number: '05',
    title: 'Run',
    tagline: 'Deploy and operate in production.',
    items: [
      'Deployment: Edge / On-Prem / Cloud',
      'Monitoring',
      'Performance Tuning',
      'Operational Playbooks',
    ],
    outcome: 'Production deployment with confidence.',
    cta: 'Deployment Guide',
    ctaHref: 'https://docs.monkdb.com',
  },
  {
    number: '06',
    title: 'Scale',
    tagline: 'Expand across systems, domains, and geographies.',
    items: [
      'Multi-cluster topology',
      'Edge to Cloud Sync',
      'Advanced Workloads',
      'Migration Patterns',
    ],
    outcome: 'Growth without rebuild.',
    cta: 'Scale Patterns',
    ctaHref: 'https://docs.monkdb.com',
  },
  {
    number: '07',
    title: 'Automate',
    tagline: 'Operate continuously without manual ops.',
    items: [
      'Autonomous Engine',
      'Decision Engine',
      'Workflow Triggers',
      'Self-operating Pipelines',
    ],
    outcome: 'Self-operating, adaptive systems.',
    cta: 'Automation Patterns',
    ctaHref: '/solutions/autonomous-decisioning-systems',
  },
  {
    number: '08',
    title: 'Optimize',
    tagline: 'Continuously improve outcomes.',
    items: [
      'Feedback Loops',
      'AI Improvement',
      'ROI Maximization',
      'Outcome Tuning',
    ],
    outcome: 'Improving systems, lower TCO, higher impact.',
    cta: 'Customer Stories',
    ctaHref: '/resources/customer-stories',
  },
]
