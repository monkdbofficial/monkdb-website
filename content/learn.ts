/**
 * Learn content — verbatim from Website content part II.docx, lines 311–411.
 * 5 sub-sections under Learn / Resources.
 *
 * Note: "Documentation" is excluded from sub-pages because docs typically live
 * on a separate domain (docs.monkdb.com). The navbar links there directly.
 */

import type { CoreSystem } from './coreSystems'

export type LearnSection = CoreSystem

export const LEARN_SECTIONS: LearnSection[] = [
  {
    slug: 'resources',
    title: 'Resources',
    subtitle: 'Explore MonkDB in action.',
    headline: 'Demos, walkthroughs, and reference architectures',
    overview:
      'Access demos, videos, and real-world walkthroughs to understand how MonkDB works across use cases and industries.',
    introTitle: 'Your experience layer',
    introBody:
      'Resources are designed to help you quickly understand how MonkDB operates in real-world scenarios. From product demos to deep technical walkthroughs, this section gives you a practical view of how data, AI, and execution come together in a single system.',
    capabilities: [
      {
        title: 'Product demo videos',
        body: 'Short and deep-dive walkthroughs of MonkDB capabilities.',
      },
      {
        title: 'Use case walkthroughs',
        body: 'SmartMine, SmartTrade, and the rest of the MonkSmartX portfolio in action.',
      },
      {
        title: 'Architecture explainers',
        body: 'Visual diagrams and recorded explainers of MonkDB internals.',
      },
      {
        title: 'Solution decks',
        body: 'Downloadable PDFs to share with your team and stakeholders.',
      },
      {
        title: 'Webinars and recorded sessions',
        body: 'Past sessions covering platform deep-dives and customer stories.',
      },
    ],
    ctaHeading: 'See MonkDB in action.',
  },
  {
    slug: 'customer-stories',
    title: 'Customer Use Cases',
    subtitle: 'See how enterprises run on MonkDB.',
    headline: 'Real-world implementations and measurable outcomes',
    overview:
      'Real-world implementations showcasing how organizations use MonkDB to solve complex problems and drive measurable outcomes.',
    introTitle: 'The credibility engine',
    introBody:
      'Customer use cases highlight how MonkDB enables real-time intelligence and execution across industries. From operational optimization to autonomous systems, these examples demonstrate measurable impact and scalable outcomes.',
    capabilities: [
      {
        title: 'Industry-wise case studies',
        body: 'Detailed write-ups across mining, finance, mobility, manufacturing, and more.',
      },
      {
        title: 'Before vs After comparisons',
        body: 'Architecture and operational diagrams of the transition to MonkDB.',
      },
      {
        title: 'Measurable metrics',
        body: 'Cost reduction, latency improvement, throughput gains, downtime cut.',
      },
      {
        title: 'Architecture used',
        body: 'How the customer wired MonkDB into their existing stack.',
      },
      {
        title: 'Problem to Solution to Outcome',
        body: 'Each story laid out in a structured, scannable format.',
      },
      {
        title: 'Customer testimonials',
        body: 'Video and quoted testimonials from operators on the ground.',
      },
    ],
    ctaHeading: 'See how enterprises run on MonkDB.',
  },
  {
    slug: 'blog',
    title: 'Blog',
    subtitle: 'Ideas, insights, and deep thinking.',
    headline: 'Thought leadership on real-time data, AI, and execution',
    overview:
      'Thought leadership, technical insights, and industry perspectives on real-time data, AI, and execution systems.',
    introTitle: 'Beyond product updates',
    introBody:
      'The MonkDB blog goes beyond product updates, offering deep insights into how modern systems are evolving from data processing to real-time execution. It is a space for ideas, innovation, and industry-defining perspectives.',
    capabilities: [
      {
        title: 'Whitepapers',
        body: 'Long-form pieces on AI, data sovereignty, and execution systems.',
      },
      {
        title: 'Technical blogs',
        body: 'Architecture, performance, and use-case engineering deep-dives.',
      },
      {
        title: 'LinkedIn article integrations',
        body: 'Selected articles cross-posted with the wider engineering community.',
      },
      {
        title: 'Research insights',
        body: 'MonkDB POV on emerging patterns, not generic industry takes.',
      },
      {
        title: 'Monk POV posts',
        body: 'Strong opinion pieces from the team on where systems are headed.',
      },
    ],
    ctaHeading: 'Read where MonkDB is heading.',
  },
  {
    slug: 'events',
    title: 'Events',
    subtitle: 'Engage. Learn. Experience MonkDB live.',
    headline: 'Live sessions, webinars, and industry events',
    overview:
      'Join live sessions, webinars, and industry events to explore MonkDB and engage with experts.',
    introTitle: 'Engagement in person and online',
    introBody:
      'Events bring MonkDB to life through live demos, expert discussions, and hands-on sessions. Whether virtual or in-person, they provide opportunities to explore use cases, ask questions, and engage with the MonkDB ecosystem.',
    capabilities: [
      {
        title: 'Upcoming webinars',
        body: 'Live deep-dives on architecture, use cases, and customer stories.',
      },
      {
        title: 'Conference participation',
        body: 'MonkDB on stage at the major data, AI, and infrastructure conferences.',
      },
      {
        title: 'Workshops and training sessions',
        body: 'Hands-on workshops for developers, architects, and operators.',
      },
      {
        title: 'Recorded event sessions',
        body: 'Catch up on every past session in the on-demand library.',
      },
      {
        title: 'Partner and ecosystem events',
        body: 'Joint sessions with partners across cloud, data, and AI ecosystems.',
      },
    ],
    ctaHeading: 'Engage with MonkDB live.',
  },
]
