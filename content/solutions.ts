/**
 * Solutions content — verbatim from Website content part II.docx, lines 126–226.
 * 10 capability-level solutions that span MonkDB's continuous execution platform.
 */

import type { CoreSystem } from './coreSystems'

export type Solution = CoreSystem

export const SOLUTIONS: Solution[] = [
  {
    slug: 'ai-ml',
    title: 'AI/ML',
    subtitle: 'Build, run, and scale AI on live data.',
    headline: 'AI/ML on a unified, real-time data plane',
    overview:
      'Enable end-to-end AI systems that operate directly on real-time and historical data within a unified platform.',
    introTitle: 'From offline models to continuous intelligence',
    introBody:
      'Most AI systems depend on disconnected pipelines and static datasets, leading to outdated models and delayed decisions. MonkDB enables AI to operate directly on live data.',
    capabilities: [
      {
        title: 'Train and infer on continuously updated datasets',
        body: 'No batch windows, no stale snapshots. Models retrain and infer on the latest state.',
      },
      {
        title: 'Combine structured + unstructured + vector data seamlessly',
        body: 'Hybrid retrieval across modalities in one query.',
      },
      {
        title: 'Deploy models without external data movement',
        body: 'Inference and training happen where the data lives.',
      },
      {
        title: 'Maintain real-time context for accurate predictions',
        body: 'Live state updates flow into model context with no pipeline lag.',
      },
    ],
    ctaHeading: 'Build AI on live data, not yesterday’s snapshot.',
  },
  {
    slug: 'real-time-streaming',
    title: 'Real-Time Streaming',
    subtitle: 'Ingest, process, and act, instantly.',
    headline: 'From data flow to decision in one continuous system',
    overview:
      'Process high-velocity streams of data in real time and convert signals into immediate action.',
    introTitle: 'Unify streaming, analytics, and execution',
    introBody:
      'Streaming systems often require separate ingestion, processing, and analytics layers. MonkDB unifies them into one engine.',
    capabilities: [
      {
        title: 'Continuous ingestion of events, logs, and signals',
        body: 'Kafka, MQTT, CDC, S3, OPC UA, native, no broker required.',
      },
      {
        title: 'Instant querying and aggregation on incoming streams',
        body: 'Streaming SQL with sub-millisecond write-to-query latency.',
      },
      {
        title: 'Real-time detection of patterns and anomalies',
        body: 'Vector and rule-based detection on live event streams.',
      },
      {
        title: 'Immediate triggering of actions',
        body: 'Decisions trigger workflows directly inside the engine.',
      },
    ],
    ctaHeading: 'From signal to action, in one continuous system.',
  },
  {
    slug: 'iceberg-tables',
    title: 'Iceberg Tables',
    subtitle: 'Open, scalable, and high-performance data lake architecture.',
    headline: 'Lakehouse performance without complexity',
    overview:
      'Enable modern data lakehouse capabilities with efficient storage, versioning, and query performance.',
    introTitle: 'Bring structure to large-scale data lakes',
    introBody:
      'Iceberg tables bring structure and reliability to large-scale data lakes. MonkDB enhances this with native, real-time integration.',
    capabilities: [
      {
        title: 'Efficient handling of large analytical datasets',
        body: 'Petabyte-scale tables with high-performance scans.',
      },
      {
        title: 'Schema evolution and version control',
        body: 'Safe schema changes and time travel built into the table format.',
      },
      {
        title: 'High-performance querying across massive data volumes',
        body: 'Predicate pushdown, partition pruning, and vectorized execution.',
      },
      {
        title: 'Seamless integration with real-time data',
        body: 'Iceberg tables coexist with streaming and operational data in one engine.',
      },
    ],
    ctaHeading: 'Lakehouse performance, without the lakehouse stack.',
  },
  {
    slug: 'real-time-operational-intelligence',
    title: 'Real-Time Operational Intelligence',
    subtitle: 'Know what’s happening. Act immediately.',
    headline: 'Continuous operational awareness and control',
    overview:
      'Transform live data into continuous operational awareness and decision-making.',
    introTitle: 'From reporting to real-time control',
    introBody:
      'Traditional BI systems provide historical insights, not real-time intelligence. MonkDB makes operations continuous.',
    capabilities: [
      {
        title: 'Continuous monitoring of operations',
        body: 'Live state of every entity that matters in the business.',
      },
      {
        title: 'Live dashboards backed by real-time data',
        body: 'Dashboards that reflect the system as it is now, not 30 minutes ago.',
      },
      {
        title: 'Instant detection of deviations and inefficiencies',
        body: 'Alerts triggered the moment a threshold or pattern is hit.',
      },
      {
        title: 'Automated responses to operational events',
        body: 'Decisions trigger corrective workflows inside the engine.',
      },
    ],
    ctaHeading: 'Run operations on live state, not stale reports.',
  },
  {
    slug: 'autonomous-decisioning-systems',
    title: 'Autonomous Decisioning Systems',
    subtitle: 'Systems that decide and act, on their own.',
    headline: 'Self-operating, adaptive systems',
    overview:
      'Build intelligent systems that can continuously sense, decide, and execute without manual intervention.',
    introTitle: 'Real-time data + intelligence + execution',
    introBody:
      'Autonomous systems require real-time data, intelligence, and execution tightly coupled. MonkDB provides all three in one continuous platform.',
    capabilities: [
      {
        title: 'Event-driven decision frameworks',
        body: 'React to events as they happen, not in scheduled batches.',
      },
      {
        title: 'AI + rule-based decisioning',
        body: 'Combine deterministic policy with adaptive AI in the same path.',
      },
      {
        title: 'Instant execution of actions',
        body: 'Trigger workflows, state updates, and downstream effects directly inside the engine.',
      },
      {
        title: 'Continuous learning from outcomes',
        body: 'Outcomes feed back into the system, improving decisions over time.',
      },
    ],
    ctaHeading: 'Build systems that operate themselves.',
  },
  {
    slug: 'energy-and-resource-optimization',
    title: 'Energy and Resource Optimization',
    subtitle: 'Optimize usage. Reduce waste. Improve efficiency.',
    headline: 'Lower costs and sustainable operations',
    overview:
      'Use real-time data and AI to optimize energy consumption and resource utilization.',
    introTitle: 'Energy systems run continuously. Insights should too.',
    introBody:
      'Energy systems often operate inefficiently due to delayed insights. MonkDB enables real-time optimization across grids, plants, and assets.',
    capabilities: [
      {
        title: 'Real-time monitoring of energy usage',
        body: 'Live consumption telemetry across every asset.',
      },
      {
        title: 'Predictive optimization models',
        body: 'Forecast load, balance demand, and pre-position resources.',
      },
      {
        title: 'Dynamic control of resources',
        body: 'Trigger setpoint adjustments and load-shedding inside the engine.',
      },
      {
        title: 'Continuous efficiency improvements',
        body: 'Outcomes feed back to refine the optimization loop.',
      },
    ],
    ctaHeading: 'Lower energy spend, run greener operations.',
  },
  {
    slug: 'digital-twin-and-simulation',
    title: 'Digital Twin and Simulation',
    subtitle: 'Mirror reality. Predict outcomes. Act faster.',
    headline: 'From visibility to predictive and autonomous operations',
    overview:
      'Create real-time digital replicas of systems to simulate, predict, and optimize operations.',
    introTitle: 'Twins that act, not just reflect',
    introBody:
      'Digital twins require continuous synchronization and intelligence. MonkDB enables live state, predictive simulation, and execution from the same engine.',
    capabilities: [
      {
        title: 'Real-time data synchronization from physical systems',
        body: 'Sub-millisecond ingest from sensors and control systems.',
      },
      {
        title: 'Continuous state updates',
        body: 'Always-current digital model reflecting the physical reality.',
      },
      {
        title: 'Predictive simulation models',
        body: 'Run what-if scenarios on live state inside the engine.',
      },
      {
        title: 'Immediate execution based on simulated outcomes',
        body: 'Apply corrective actions back to the physical system instantly.',
      },
    ],
    ctaHeading: 'Twins that simulate, predict, and act in real time.',
  },
  {
    slug: 'edge-intelligence-and-distributed-ai',
    title: 'Edge Intelligence and Distributed AI',
    subtitle: 'Intelligence where data is generated.',
    headline: 'True edge-native intelligence systems',
    overview:
      'Run AI and processing at the edge while maintaining centralized coordination.',
    introTitle: 'Distributed intelligence without losing control',
    introBody:
      'Centralized AI creates latency and dependency. MonkDB enables distributed intelligence with cloud-side coordination.',
    capabilities: [
      {
        title: 'Local data processing at edge devices',
        body: 'Compute and decision happen at the source, not after a network hop.',
      },
      {
        title: 'Real-time decision-making without cloud dependency',
        body: 'Edge nodes operate autonomously, even when disconnected.',
      },
      {
        title: 'Synchronization with central systems',
        body: 'Edge state syncs back to cloud for global visibility.',
      },
      {
        title: 'Resilient operations in low-connectivity environments',
        body: 'Continue operating through outages and reconcile on reconnect.',
      },
    ],
    ctaHeading: 'Intelligence at the source, coordinated globally.',
  },
  {
    slug: 'data-and-ai-modernization',
    title: 'Data and AI Modernization',
    subtitle: 'Replace legacy stacks with one unified platform.',
    headline: 'From stitched architecture to unified execution',
    overview:
      'Modernize fragmented data and AI architectures into a single, real-time execution system.',
    introTitle: 'Lower TCO. Faster shipping. Less drag.',
    introBody:
      'Legacy architectures are complex, costly, and slow. MonkDB consolidates them into one unified execution platform.',
    capabilities: [
      {
        title: 'Consolidation of multiple systems into one',
        body: 'Replace databases, pipelines, vector DBs, and AI layers with a single engine.',
      },
      {
        title: 'Elimination of pipelines and redundant layers',
        body: 'No more brittle ETL maintenance.',
      },
      {
        title: 'Real-time processing and AI integration',
        body: 'Streaming, vectors, and SQL operate in the same plane.',
      },
      {
        title: 'Faster deployment and lower operational overhead',
        body: 'One binary. One contract. One ops surface.',
      },
    ],
    ctaHeading: 'Modernize without rebuilding from scratch.',
  },
  {
    slug: 'ai-governance-and-trust',
    title: 'AI Governance and Trust',
    subtitle: 'Control, compliance, and confidence in AI.',
    headline: 'Trusted, compliant, enterprise-ready AI',
    overview:
      'Ensure AI systems operate securely, transparently, and within defined governance frameworks.',
    introTitle: 'Governance built into the engine',
    introBody:
      'AI adoption brings challenges in trust and compliance. MonkDB addresses them at the architectural level, not as a separate audit layer.',
    capabilities: [
      {
        title: 'Fine-grained access control',
        body: 'Identity, RBAC, and ABAC across data, queries, and execution paths.',
      },
      {
        title: 'Data and model governance',
        body: 'Lineage, versioning, and policy across data assets and models.',
      },
      {
        title: 'Full auditability of decisions',
        body: 'Every decision is traceable to the data and model that produced it.',
      },
      {
        title: 'Secure and sovereign data handling',
        body: 'Data stays in your environment. Compliance by default.',
      },
    ],
    ctaHeading: 'AI that meets your governance bar.',
  },
]
