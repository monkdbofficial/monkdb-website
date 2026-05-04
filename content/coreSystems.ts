/**
 * Core Systems content — verbatim from Website content part II.docx, lines 1–125.
 * 6 deeply integrated systems that form MonkDB's continuous execution architecture.
 */

export type CoreSystem = {
  slug: string
  title: string
  /** Menu Line — the punchy positioning line under the title */
  subtitle: string
  /** Headline used on the page hero (alt to title) */
  headline: string
  /** Overview paragraph */
  overview: string
  /** Explore More intro paragraph (the framing) */
  introTitle: string
  introBody: string
  /** Explore More bullet items (each becomes a capability card) */
  capabilities: { title: string; body: string }[]
  ctaHeading: string
}

export const CORE_SYSTEMS: CoreSystem[] = [
  {
    slug: 'unified-operational-engine',
    title: 'Unified Operational Engine',
    subtitle: 'One system. All data. One operational truth.',
    headline: 'The Foundation of Unified, Real-Time Operations',
    overview:
      'The Unified Operational Engine consolidates all data types, workloads, and operational states into a single system, eliminating fragmentation across the enterprise.',
    introTitle: 'Why this matters',
    introBody:
      'Enterprises today operate across fragmented systems, OLAP stores, vector databases, streaming engines, document stores, each maintaining its own version of reality. This leads to inconsistencies, duplication, and delayed coordination. The Unified Operational Engine creates a single operational fabric where every workload runs against the same source of truth.',
    capabilities: [
      {
        title: 'Multi-Model Data Convergence',
        body: 'Structured, semi-structured, unstructured, time-series, geospatial, and vector data coexist in a single engine, eliminating the need for multiple specialized systems.',
      },
      {
        title: 'Single Source of Operational Truth',
        body: 'All data is ingested, stored, and queried within the same system, ensuring consistent, real-time state across applications and workflows.',
      },
      {
        title: 'In-Place Processing',
        body: 'Data is processed where it resides. No duplication. No movement. No synchronization lag.',
      },
      {
        title: 'Cross-Domain Correlation',
        body: 'Combine transactional signals, behavioural data, and contextual intelligence in real time, enabling richer and more accurate decision-making.',
      },
      {
        title: 'Operational Simplicity',
        body: 'Replace fragmented architectures with a unified system, reducing infrastructure complexity, integration overhead, and operational risk.',
      },
    ],
    ctaHeading: 'Run on one system. One operational truth.',
  },
  {
    slug: 'real-time-processing-engine',
    title: 'Real-Time Processing Engine',
    subtitle: 'Continuous processing. No batches. No waiting.',
    headline: 'A System That Never Stops Processing',
    overview:
      'The Real-Time Processing Engine enables continuous ingestion, transformation, and querying of data, ensuring that every signal is processed the moment it arrives.',
    introTitle: 'Streaming-first by design',
    introBody:
      'Traditional systems rely on batch cycles or micro-batch approximations of real-time, introducing delays and inconsistencies. MonkDB is designed as a true streaming-first system where ingestion and execution happen at the same instant.',
    capabilities: [
      {
        title: 'Continuous Data Ingestion',
        body: 'Streams, events, logs, transactions, and sensor data are ingested continuously, without buffering or staging layers.',
      },
      {
        title: 'Instant Processing and Querying',
        body: 'Every incoming data point is immediately available for querying, aggregation, and analysis. No waiting for pipeline completion.',
      },
      {
        title: 'Always-Live State Management',
        body: 'System state is continuously updated with every event, ensuring that all queries reflect the most current reality.',
      },
      {
        title: 'Unified Streaming + Analytical Processing',
        body: 'Eliminates the need for separate streaming and analytical systems. Both operate within a single engine.',
      },
      {
        title: 'Low-Latency Execution at Scale',
        body: 'Designed for high throughput and concurrency, enabling real-time decision-making even under heavy workloads.',
      },
    ],
    ctaHeading: 'Process every signal the moment it lands.',
  },
  {
    slug: 'ai-native-execution-engine',
    title: 'AI-Native Execution Engine',
    subtitle: 'AI inside the system. Not outside.',
    headline: 'Intelligence Embedded Into the Core of Data',
    overview:
      'The AI-Native Execution Engine integrates intelligence directly into the data layer, allowing systems to continuously learn, reason, and act on live data.',
    introTitle: 'AI lives where data lives',
    introBody:
      'In most architectures, AI is an external layer that depends on data pipelines and periodic updates. This results in stale models and disconnected intelligence. MonkDB redefines this by embedding AI natively within the data plane.',
    capabilities: [
      {
        title: 'Native Vector and Hybrid Query Engine',
        body: 'Perform semantic search, similarity matching, and contextual reasoning alongside traditional SQL queries within the same execution path.',
      },
      {
        title: 'Live Contextual Intelligence',
        body: 'AI operates on continuously updated data, ensuring that decisions are always based on current system state.',
      },
      {
        title: 'Stateful Intelligence',
        body: 'Maintain context over time. Systems understand sequences, patterns, and evolving conditions.',
      },
      {
        title: 'In-Place Inference and Decisioning',
        body: 'Run AI logic directly within the system, without exporting data to external services.',
      },
      {
        title: 'Unified Data and AI Layer',
        body: 'Eliminate the gap between data storage and intelligence. The result is a tightly coupled, high-performance system.',
      },
    ],
    ctaHeading: 'Embed intelligence at the data layer.',
  },
  {
    slug: 'decision-action-engine',
    title: 'Decision Action Engine',
    subtitle: 'Decide and execute, without delay.',
    headline: 'From Insight to Action, Instantly',
    overview:
      'The Decision Action Engine transforms intelligence into immediate execution, enabling systems to act the moment a condition is met.',
    introTitle: 'Close the gap between knowing and acting',
    introBody:
      'Most enterprise systems generate insights but rely on external workflows, manual processes, or delayed integrations to act. This creates a critical gap between decision and execution. The Decision Action Engine closes this gap inside the engine.',
    capabilities: [
      {
        title: 'Event-Driven Decisioning',
        body: 'Trigger decisions based on real-time events, thresholds, or patterns detected in data streams.',
      },
      {
        title: 'Rule-Based and AI-Driven Actions',
        body: 'Combine deterministic logic with AI-driven insights to drive precise and adaptive execution.',
      },
      {
        title: 'Instant State Transitions',
        body: 'Update system states immediately, ensuring downstream processes operate on the latest outcomes.',
      },
      {
        title: 'Embedded Execution Logic',
        body: 'Execute actions directly within the platform, without relying on external orchestration tools.',
      },
      {
        title: 'Autonomous Operations',
        body: 'Enable systems to operate with minimal human intervention. Continuously sense, decide, and act.',
      },
    ],
    ctaHeading: 'Close the loop. Act the moment it matters.',
  },
  {
    slug: 'edge-to-cloud-fabric',
    title: 'Edge to Cloud Execution Fabric',
    subtitle: 'Distributed intelligence. Unified control.',
    headline: 'One Execution Layer Across Every Environment',
    overview:
      'The Edge-to-Cloud Execution Fabric connects distributed systems into a single, synchronized execution environment, spanning edge devices, on-prem systems, and cloud platforms.',
    introTitle: 'Distributed by design, unified by control',
    introBody:
      'Modern enterprises operate across highly distributed environments, but intelligence and execution are often centralized, creating latency and dependency. This fabric enables truly distributed systems with central coordination.',
    capabilities: [
      {
        title: 'Edge Intelligence and Execution',
        body: 'Process and act on data locally at the source, reducing latency and bandwidth usage.',
      },
      {
        title: 'Cloud Coordination and Aggregation',
        body: 'Central systems maintain global visibility, coordination, and optimization across all nodes.',
      },
      {
        title: 'Seamless Synchronization',
        body: 'Maintain consistency between edge and cloud environments, ensuring unified system state.',
      },
      {
        title: 'Resilience and Offline Capability',
        body: 'Continue operations even in disconnected environments, syncing when connectivity is restored.',
      },
      {
        title: 'Scalable Distributed Architecture',
        body: 'Expand across geographies and environments without compromising performance or control.',
      },
    ],
    ctaHeading: 'One fabric. Edge, on-prem, and cloud.',
  },
  {
    slug: 'sovereignty-trust-layer',
    title: 'Sovereignty and Trust Layer',
    subtitle: 'Built for control, compliance, and confidence.',
    headline: 'Trust and Control at the Core of Intelligence',
    overview:
      'The Sovereignty and Trust Layer ensures that data, intelligence, and execution remain secure, governed, and fully under enterprise control.',
    introTitle: 'Sovereignty as a foundational layer',
    introBody:
      'As organizations adopt AI-driven systems, concerns around data security, compliance, and control become critical. MonkDB addresses these at the architectural level, not as add-ons.',
    capabilities: [
      {
        title: 'Data Sovereignty by Design',
        body: 'Keep data within your chosen environment, cloud, on-prem, or edge, without forced movement or external dependency.',
      },
      {
        title: 'Granular Access Control',
        body: 'Implement fine-grained role-based access across data, queries, and execution layers.',
      },
      {
        title: 'Secure Execution Environment',
        body: 'Ensure that all processing and decisioning occurs within controlled and trusted boundaries.',
      },
      {
        title: 'Auditability and Traceability',
        body: 'Track data access, transformations, and decisions, ensuring full transparency and compliance.',
      },
      {
        title: 'Regulatory Alignment',
        body: 'Support enterprise and regulatory requirements for data governance, privacy, and security.',
      },
    ],
    ctaHeading: 'Sovereignty built in, not bolted on.',
  },
]
