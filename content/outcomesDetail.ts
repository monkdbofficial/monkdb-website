/**
 * Outcomes — extended content for the 6 outcome detail pages.
 * Each entry maps to /outcomes/[slug] and reuses the refined wording from
 * Part II docx, lines 217–225, plus deeper proof points + visual hooks.
 */

/**
 * Icon name strings only — actual Lucide components are resolved inside the
 * client component (OutcomeDetailContent). Passing function components from
 * server → client violates Next.js's serialization boundary.
 */
export type OutcomeIconName =
  | 'trending-down'
  | 'zap'
  | 'shield-check'
  | 'workflow'
  | 'file-check'
  | 'timer'

export type OutcomeDetail = {
  slug: string
  title: string
  /** Refined wording from docx — used as the hero subtitle */
  refined: string
  iconName: OutcomeIconName
  /** Headline metric shown as the large hero stat */
  metric: { value: string; suffix: string; caption: string }
  /** Story / narrative paragraph */
  story: string
  /** Three concrete proof points */
  proof: { title: string; body: string }[]
  /** How this outcome shows up across industries (4 short rows) */
  industries: { name: string; result: string }[]
  /** Solutions on the site that drive this outcome */
  driverSolutions: { title: string; href: string }[]
  /** CTA heading */
  ctaHeading: string
}

export const OUTCOMES_DETAIL: OutcomeDetail[] = [
  {
    slug: 'reduce-cost',
    title: 'Reduce Cost',
    refined: 'Eliminate infrastructure sprawl and operational overhead.',
    iconName: 'trending-down',
    metric: {
      value: '70',
      suffix: '%',
      caption: 'Median TCO reduction across MonkDB consolidations',
    },
    story:
      'Most enterprises run six or more specialized systems where one would do. Each comes with its own license, ops surface, integration cost, and people overhead. MonkDB collapses this into a single binary that handles every workload, removing the integration tax and the long tail of operational drag.',
    proof: [
      {
        title: 'Fewer systems',
        body: 'Replace operational DB + ETL + vector DB + stream processor + search + AI inference with one engine.',
      },
      {
        title: 'Fewer vendors',
        body: 'One contract, one support relationship, one upgrade path.',
      },
      {
        title: 'Fewer people-hours',
        body: 'Smaller integration surface means less on-call burden, fewer cross-team handoffs.',
      },
    ],
    industries: [
      { name: 'BFSI', result: '5+ systems collapsed to 1' },
      { name: 'Manufacturing', result: 'Eliminate ETL pipelines' },
      { name: 'Smart cities', result: 'Single ops surface across departments' },
      { name: 'Data centers', result: 'Lower license + infra spend' },
    ],
    driverSolutions: [
      {
        title: 'Data and AI Modernization',
        href: '/solutions/data-and-ai-modernization',
      },
      { title: 'Iceberg Tables', href: '/solutions/iceberg-tables' },
    ],
    ctaHeading: 'Replace your stack. Cut your run rate.',
  },
  {
    slug: 'improve-efficiency',
    title: 'Improve Efficiency',
    refined: 'Optimize operations with real-time intelligence.',
    iconName: 'zap',
    metric: {
      value: '5',
      suffix: '×',
      caption: 'Faster time-to-insight on representative workloads',
    },
    story:
      'Efficiency loss usually starts with delay. Batch windows, ETL waits, federated query stitching, all of it adds latency between something happening in the world and something being done about it. MonkDB removes the wait by ingesting, processing, and acting on data continuously, in the same engine.',
    proof: [
      {
        title: 'No batch windows',
        body: 'Streaming SQL on live data. p99 stays sub-millisecond under continuous load.',
      },
      {
        title: 'No glue code',
        body: 'Vector + SQL + time-series in one query. Less code to write, less code to maintain.',
      },
      {
        title: 'No federation tax',
        body: 'Joins are native. No round trips between specialized systems.',
      },
    ],
    industries: [
      { name: 'Logistics', result: 'Live ETA across fleets' },
      { name: 'Energy', result: 'Continuous demand-balance decisions' },
      { name: 'Trading', result: 'Sub-ms order analytics' },
      { name: 'Mining', result: 'Process optimization in line' },
    ],
    driverSolutions: [
      { title: 'Real-Time Streaming', href: '/solutions/real-time-streaming' },
      {
        title: 'Real-Time Operational Intelligence',
        href: '/solutions/real-time-operational-intelligence',
      },
    ],
    ctaHeading: 'Operate without the wait.',
  },
  {
    slug: 'enhance-safety',
    title: 'Enhance Safety',
    refined: 'Detect risks early and act instantly.',
    iconName: 'shield-check',
    metric: {
      value: '<5',
      suffix: 'ms',
      caption: 'Threat-to-action latency on streaming detection',
    },
    story:
      'Safety improves when the gap between detection and response shrinks. Whether the risk is a fraudulent transaction, an industrial anomaly, or a public-safety incident, the same pattern holds: signal continuously, score continuously, act inside the engine. MonkDB makes that loop sub-millisecond.',
    proof: [
      {
        title: 'Continuous detection',
        body: 'Vector and rule-based detection on every event, not on batched samples.',
      },
      {
        title: 'In-engine response',
        body: 'Block, hold, escalate, or trigger workflows directly from the data plane.',
      },
      {
        title: 'Audit-grade traceability',
        body: 'Every decision is reproducible from the data and policy that produced it.',
      },
    ],
    industries: [
      { name: 'BFSI', result: 'Fraud caught at the moment of decision' },
      { name: 'Mining', result: 'Live gas, dust, proximity alerts' },
      { name: 'Smart cities', result: 'Real-time public safety coordination' },
      {
        name: 'Manufacturing',
        result: 'Predictive failure before line damage',
      },
    ],
    driverSolutions: [
      {
        title: 'Autonomous Decisioning Systems',
        href: '/solutions/autonomous-decisioning-systems',
      },
      { title: 'AI Governance and Trust', href: '/solutions/ai-governance-and-trust' },
    ],
    ctaHeading: 'Detect, decide, and act in the same millisecond.',
  },
  {
    slug: 'enable-autonomy',
    title: 'Enable Autonomy',
    refined: 'Power self-operating intelligent systems.',
    iconName: 'workflow',
    metric: {
      value: '24',
      suffix: '/7',
      caption: 'Closed-loop systems that operate without manual intervention',
    },
    story:
      'Autonomy requires three layers in the same place: live data, embedded intelligence, and direct execution. Stitched stacks fail at the third step, leaving execution to external orchestrators. MonkDB closes the loop. Decisions trigger workflows, state updates, and downstream effects directly inside the engine.',
    proof: [
      {
        title: 'Sense',
        body: 'Continuous ingestion across streams, sensors, and applications.',
      },
      {
        title: 'Decide',
        body: 'Rule and AI-driven decisions on live state inside the engine.',
      },
      {
        title: 'Act',
        body: 'Trigger workflows and state changes directly, no external orchestrator hop.',
      },
    ],
    industries: [
      { name: 'Mobility', result: 'Self-routing fleets' },
      { name: 'Energy', result: 'Self-balancing grids' },
      { name: 'Manufacturing', result: 'Self-tuning production lines' },
      { name: 'Retail', result: 'Self-pricing supply chains' },
    ],
    driverSolutions: [
      {
        title: 'Autonomous Decisioning Systems',
        href: '/solutions/autonomous-decisioning-systems',
      },
      {
        title: 'Edge Intelligence and Distributed AI',
        href: '/solutions/edge-intelligence-and-distributed-ai',
      },
    ],
    ctaHeading: 'Build systems that run themselves.',
  },
  {
    slug: 'trust-compliance',
    title: 'Ensure Trust and Compliance',
    refined: 'Govern data and AI with confidence.',
    iconName: 'file-check',
    metric: {
      value: '100',
      suffix: '%',
      caption: 'Auditable lineage from data to decision',
    },
    story:
      'Trust is a design decision, not a final-step audit. MonkDB embeds identity, access, lineage, and policy into the engine itself, so every query, model run, and decision is governed before it executes. Compliance teams get traceability by default, not as an after-the-fact reconstruction.',
    proof: [
      {
        title: 'Identity-aware execution',
        body: 'Every query authenticates and authorizes before reading a single byte.',
      },
      {
        title: 'End-to-end lineage',
        body: 'Data, transformation, model, and decision tied together in an audit trail.',
      },
      {
        title: 'Sovereign by default',
        body: 'Data stays in your environment, on-prem, cloud, or air-gapped.',
      },
    ],
    industries: [
      { name: 'BFSI', result: 'Regulator-ready audit on every decision' },
      { name: 'Healthcare', result: 'PHI residency + access traceability' },
      { name: 'Public sector', result: 'Air-gapped sovereign deployment' },
      { name: 'Energy', result: 'Critical-infrastructure compliance' },
    ],
    driverSolutions: [
      { title: 'AI Governance and Trust', href: '/solutions/ai-governance-and-trust' },
      { title: 'Sovereignty and Trust Layer', href: '/core-systems/sovereignty-trust-layer' },
    ],
    ctaHeading: 'Govern AI with confidence.',
  },
  {
    slug: 'accelerate-decision-making',
    title: 'Accelerate Decision-Making',
    refined: 'Move from insight to action in real time.',
    iconName: 'timer',
    metric: {
      value: '0.8',
      suffix: 'ms',
      caption: 'p99 query latency on representative production workloads',
    },
    story:
      'Decision speed is bounded by the slowest layer in the stack. When a stack has six layers, one slow link drags everything. MonkDB collapses the layers, so the path from sensor to decision is one engine deep. Decisions land in milliseconds, every time.',
    proof: [
      {
        title: 'One-engine path',
        body: 'No federation, no pipeline glue. Every workload compiles to the same plan.',
      },
      {
        title: 'Native vector + SQL',
        body: 'Hybrid retrieval and rule logic in a single statement.',
      },
      {
        title: 'Linear scaling',
        body: 'Throughput grows with nodes. No coordinator bottleneck.',
      },
    ],
    industries: [
      { name: 'Trading', result: 'Sub-ms order decisions' },
      { name: 'Manufacturing', result: 'In-line process tuning' },
      { name: 'Logistics', result: 'Live route adjustments' },
      { name: 'Mobility', result: 'Real-time dispatch' },
    ],
    driverSolutions: [
      { title: 'Real-Time Streaming', href: '/solutions/real-time-streaming' },
      { title: 'AI/ML', href: '/solutions/ai-ml' },
    ],
    ctaHeading: 'Decide on live state, every time.',
  },
]
