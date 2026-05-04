/**
 * Industries content — verbatim from Website content part II.docx, lines 227–310.
 * 9 industry verticals with crisp positioning + Explore More bullets.
 */

import type { CoreSystem } from './coreSystems'

export type Industry = CoreSystem

export const INDUSTRIES: Industry[] = [
  {
    slug: 'mining-and-manufacturing',
    title: 'Mining and Manufacturing',
    subtitle: 'Real-time control for complex, asset-heavy operations.',
    headline: 'From reactive to predictive and autonomous operations',
    overview:
      'Unify operational, sensor, and environmental data to drive intelligent, real-time decision-making across mining and manufacturing ecosystems.',
    introTitle: 'Continuous streams demand a continuous engine',
    introBody:
      'Mining and manufacturing environments generate continuous streams of data from equipment, sensors, and operations. MonkDB makes that data actionable in the same instant it lands.',
    capabilities: [
      {
        title: 'Real-time monitoring of equipment and conditions',
        body: 'Live telemetry from every asset, sensor, and control system.',
      },
      {
        title: 'Ventilation-on-demand and safety optimization',
        body: 'Air flow that follows people and equipment, with policy-driven safety alerts.',
      },
      {
        title: 'Predictive maintenance and failure prevention',
        body: 'Failure modes flagged before they take a shift down.',
      },
      {
        title: 'Continuous process optimization',
        body: 'Throughput, grade, and yield managed against the production plan.',
      },
    ],
    ctaHeading: 'Run operations that adapt in real time.',
  },
  {
    slug: 'automobiles',
    title: 'Automobiles',
    subtitle: 'Connected, intelligent, and adaptive mobility systems.',
    headline: 'Smarter, safer, more responsive mobility',
    overview:
      'Enable real-time intelligence across vehicles, fleets, and mobility ecosystems.',
    introTitle: 'Telemetry meets behaviour and environment',
    introBody:
      'Automotive systems require seamless integration of telemetry, user behaviour, and environmental data. MonkDB unifies them on one continuous plane.',
    capabilities: [
      {
        title: 'Connected vehicle intelligence',
        body: 'Per-vehicle telemetry, OTA state, and policy in one engine.',
      },
      {
        title: 'Fleet optimization and dynamic routing',
        body: 'Routes recomputed on the latest traffic, weather, and demand.',
      },
      {
        title: 'Real-time diagnostics and predictive maintenance',
        body: 'Catch failures before they reach the road.',
      },
      {
        title: 'Integration with smart city infrastructure',
        body: 'Vehicles share state with mobility networks for citywide coordination.',
      },
    ],
    ctaHeading: 'Coordinate fleets at the speed of the road.',
  },
  {
    slug: 'bfsi-and-capital-markets',
    title: 'BFSI and Capital Markets',
    subtitle: 'Low-latency intelligence for high-stakes decisions.',
    headline: 'Faster, smarter, more secure financial operations',
    overview:
      'Process financial data in real time to enable risk management, fraud detection, and intelligent trading.',
    introTitle: 'Speed, accuracy, and compliance, in one engine',
    introBody:
      'Financial systems demand speed, accuracy, and compliance. MonkDB delivers all three on a continuous data plane.',
    capabilities: [
      {
        title: 'Real-time fraud detection and prevention',
        body: 'Score every transaction against models and rules in line.',
      },
      {
        title: 'Risk scoring and compliance monitoring',
        body: 'Customer, counterparty, and portfolio risk recomputed continuously.',
      },
      {
        title: 'Market data processing and trading optimization',
        body: 'Sub-millisecond execution, audit-grade lineage.',
      },
      {
        title: 'Unified view across transactional and behavioural data',
        body: 'No silos between OLTP, behaviour, and market data.',
      },
    ],
    ctaHeading: 'Decide before the transaction settles.',
  },
  {
    slug: 'mining-and-metals',
    title: 'Mining and Metals',
    subtitle: 'Optimize extraction, processing, and safety in real time.',
    headline: 'Higher yield, lower cost, safer operations',
    overview:
      'Drive efficiency and safety across mining and metals value chains with continuous intelligence.',
    introTitle: 'From extraction to processing, on one engine',
    introBody:
      'From extraction to processing, operations depend on real-time coordination. MonkDB unifies the value chain.',
    capabilities: [
      {
        title: 'Ore quality tracking and process optimization',
        body: 'Live grade and dilution metrics tied to production plan.',
      },
      {
        title: 'Equipment health monitoring',
        body: 'Predictive maintenance across haul trucks, conveyors, crushers.',
      },
      {
        title: 'Environmental and safety compliance',
        body: 'Continuous gas, dust, and proximity monitoring with policy escalation.',
      },
      {
        title: 'Energy and resource optimization',
        body: 'Match power and water to live demand across the operation.',
      },
    ],
    ctaHeading: 'Run a mine that thinks for itself.',
  },
  {
    slug: 'steel-and-manufacturing',
    title: 'Steel and Manufacturing',
    subtitle: 'Precision, efficiency, and continuous optimization.',
    headline: 'Consistent quality and operational excellence',
    overview:
      'Enable real-time control and optimization of production processes.',
    introTitle: 'Precise control across multiple stages',
    introBody:
      'Steel and manufacturing operations require precise control across multiple stages. MonkDB closes supervisory loops inside the engine.',
    capabilities: [
      {
        title: 'Real-time process monitoring and control',
        body: 'Live state of every cell, line, and supervisory loop.',
      },
      {
        title: 'Quality tracking and defect detection',
        body: 'Vector and rule detection on telemetry catches defects in line.',
      },
      {
        title: 'Predictive maintenance of heavy machinery',
        body: 'Failure-mode signatures across rotating equipment, motors, tooling.',
      },
      {
        title: 'Energy optimization across production lines',
        body: 'Continuous parameter tuning against live yield and energy.',
      },
    ],
    ctaHeading: 'Build a line that adapts in real time.',
  },
  {
    slug: 'data-centers',
    title: 'Data Centers',
    subtitle: 'Optimize performance, cost, and energy at scale.',
    headline: 'High availability with optimized cost and efficiency',
    overview:
      'Manage infrastructure, workloads, and energy usage in real time.',
    introTitle: 'Massive operational data, one continuous engine',
    introBody:
      'Data centers generate massive operational data across systems. MonkDB makes that data actionable in real time.',
    capabilities: [
      {
        title: 'Real-time monitoring of infrastructure and workloads',
        body: 'Live telemetry from racks, networks, and workloads.',
      },
      {
        title: 'Dynamic resource allocation',
        body: 'Workload placement that follows demand and price.',
      },
      {
        title: 'Energy and cooling optimization',
        body: 'Setpoint and airflow tuning matched to live thermal state.',
      },
      {
        title: 'Predictive failure detection',
        body: 'Hardware and network anomalies flagged before they take services down.',
      },
    ],
    ctaHeading: 'Run a data center that tunes itself.',
  },
  {
    slug: 'energy-and-utilities',
    title: 'Energy and Utilities',
    subtitle: 'Intelligent, resilient, and efficient energy systems.',
    headline: 'Efficient, sustainable, resilient energy operations',
    overview:
      'Enable real-time monitoring and optimization of energy generation, distribution, and consumption.',
    introTitle: 'Continuous balancing of supply and demand',
    introBody:
      'Energy systems require continuous balancing of supply and demand. MonkDB makes the grid programmable.',
    capabilities: [
      {
        title: 'Smart grid optimization',
        body: 'Live monitoring and dynamic control across the grid.',
      },
      {
        title: 'Real-time demand forecasting',
        body: 'Forecasts that update continuously, not in scheduled batches.',
      },
      {
        title: 'Renewable energy integration',
        body: 'Match intermittent generation to demand in real time.',
      },
      {
        title: 'Fault detection and outage management',
        body: 'Outages localized and rerouted before customers feel them.',
      },
    ],
    ctaHeading: 'Run an adaptive, resilient grid.',
  },
  {
    slug: 'infrastructure-and-smart-cities',
    title: 'Infrastructure and Smart Cities',
    subtitle: 'Connected systems for smarter urban environments.',
    headline: 'Responsive, efficient, sustainable urban ecosystems',
    overview:
      'Integrate data across city infrastructure to enable real-time intelligence and decision-making.',
    introTitle: 'Citywide coordination, on one platform',
    introBody:
      'Smart cities rely on coordination across multiple systems. MonkDB unifies them into one operating plane.',
    capabilities: [
      {
        title: 'Traffic and mobility optimization',
        body: 'Live signal and routing decisions based on real city state.',
      },
      {
        title: 'Public safety monitoring',
        body: 'Coordinated response across cameras, sensors, and dispatch.',
      },
      {
        title: 'Infrastructure health tracking',
        body: 'Continuous monitoring of bridges, utilities, and assets.',
      },
      {
        title: 'Integrated city-wide intelligence',
        body: 'A single operating picture across every department.',
      },
    ],
    ctaHeading: 'Run a city on live state.',
  },
  {
    slug: 'logistics-and-mobility',
    title: 'Logistics and Mobility',
    subtitle: 'Real-time visibility and intelligent movement of goods and people.',
    headline: 'Faster, more efficient, adaptive supply chains',
    overview:
      'Optimize logistics networks with continuous tracking and intelligent decision-making.',
    introTitle: 'Coordination across fleets, routes, and supply chains',
    introBody:
      'Logistics systems require coordination across fleets, routes, and supply chains. MonkDB powers that coordination in real time.',
    capabilities: [
      {
        title: 'Real-time tracking and visibility',
        body: 'Live position, ETA, and condition of every shipment.',
      },
      {
        title: 'Route optimization and dynamic scheduling',
        body: 'Routing decisions that follow live demand and conditions.',
      },
      {
        title: 'Demand forecasting and inventory intelligence',
        body: 'SKU-level forecasts that update with every transaction.',
      },
      {
        title: 'Autonomous logistics operations',
        body: 'Closed-loop systems that reroute, reschedule, and replenish on their own.',
      },
    ],
    ctaHeading: 'Move goods at the speed of demand.',
  },
]
