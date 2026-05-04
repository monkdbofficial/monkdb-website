/**
 * Outcomes — refined wording from Website content part II.docx, lines 217–225.
 * Mapped 1:1 with the existing nav.outcome1..6 keys.
 */

export type Outcome = {
  slug: string
  title: string
  body: string
}

export const OUTCOMES: Outcome[] = [
  {
    slug: 'reduce-cost',
    title: 'Reduce Cost',
    body: 'Eliminate infrastructure sprawl and operational overhead.',
  },
  {
    slug: 'improve-efficiency',
    title: 'Improve Efficiency',
    body: 'Optimize operations with real-time intelligence.',
  },
  {
    slug: 'enhance-safety',
    title: 'Enhance Safety',
    body: 'Detect risks early and act instantly.',
  },
  {
    slug: 'enable-autonomy',
    title: 'Enable Autonomy',
    body: 'Power self-operating intelligent systems.',
  },
  {
    slug: 'trust-compliance',
    title: 'Ensure Trust and Compliance',
    body: 'Govern data and AI with confidence.',
  },
  {
    slug: 'accelerate-decision-making',
    title: 'Accelerate Decision-Making',
    body: 'Move from insight to action in real time.',
  },
]
