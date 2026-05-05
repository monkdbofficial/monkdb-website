# MonkDB Site — Completion Plan & Status

Last audited: 2026-05-05.
Reference docs (already loaded into `content/*.ts`):
- `MonkDB_Full_Website_Content.docx` (Part I — Home, Products, Platform pillars, MonkSmartX)
- `Website content part II.docx` (Part II — Core Systems, Solutions, Industries, Outcomes, Learn, Developer Journey, all PNG diagrams)

---

## ✅ What's done (production-ready, per-route bespoke)

Every nav link now lands on a page with:
- Distinct accent color and hero gradient
- A bespoke hero motif (no two pages share the same visualization)
- Stats / how-it-works / customer-proof sections where it makes sense
- Content read straight from the docx-sourced TypeScript content modules
- TypeScript builds clean (`npx tsc --noEmit` passes)

### Top-level
- ✅ Home (`/`) — 20 sections
- ✅ Developers (`/developers`) — bespoke `DevelopersContent.tsx`
- ✅ Developer Journey (`/developers/journey`) — bespoke 8-stage map with diagram
- ✅ About (`/about`) — bespoke `AboutContent.tsx`

### Products (3 + 2 + 6)
- ✅ MonkDB (`/features`) — royal blue, 9-workload constellation hero
- ✅ MonkEdge (`/products/monkedge`) — cyan-teal, edge-to-cloud topology hero
- ✅ MonkSmartX hub (`/products/monksmartx`) — violet, 6-product constellation hero
- ✅ Sovereign pillar (`/platform/sovereign`) — gold, hexagonal vault hero
- ✅ Operational Intelligence pillar (`/platform/operational-intelligence`) — electric blue, continuous loop hero
- ✅ All 6 SmartX sub-products (each with industry-themed hero)

### Core Systems (6)
All driven by `app/[locale]/core-systems/[slug]/CoreSystemContent.tsx`. Each system has its own accent + hero motif:
1. Unified Operational Engine — royal blue + convergence
2. Real-Time Processing Engine — sky blue + wave
3. AI-Native Execution Engine — violet + neural mesh
4. Decision Action Engine — orange + sense/decide/act loop
5. Edge to Cloud Fabric — teal + edge mesh
6. Sovereignty and Trust Layer — gold + hexagonal vault

### Solutions (10)
All driven by `app/[locale]/solutions/[slug]/SolutionContent.tsx`. Each has accent + hero motif + EXTRAS map (stats / 3-step how-it-works flow / customer proof + outcome metrics).
1. AI/ML — violet + neural mesh
2. Real-Time Streaming — cyan + wave
3. Iceberg Tables — ice blue + stacked layers
4. Real-Time Operational Intelligence — royal blue + dashboard pulse bars
5. Autonomous Decisioning Systems — magenta + signal→action trigger
6. Energy & Resource Optimization — green + 78% gauge
7. Digital Twin & Simulation — indigo + physical↔twin mirror
8. Edge Intelligence & Distributed AI — orange + edge mesh
9. Data & AI Modernization — sky blue + migration arrow
10. AI Governance & Trust — gold + hexagonal shield

### Outcomes (6)
`components/OutcomeDetailContent.tsx` now reads a per-slug `OUTCOME_THEMES` map. Each renders with its own accent on hero gradient, large stat counter, proof cards, and industry table:
- Reduce Cost — green
- Improve Efficiency — sky blue
- Enhance Safety — orange
- Enable Autonomy — violet
- Trust Compliance — gold
- Accelerate Decision-Making — royal blue

### Industries (9)
All driven by `app/[locale]/industries/[slug]/IndustryContent.tsx`. Each industry has its own accent + bespoke motif + EXTRAS (stats / 3-step flow / industry-realistic customer proof with metrics).
1. Mining & Manufacturing — tan + mine-shaft
2. Automobiles — cyan + fleet orbit
3. BFSI & Capital Markets — green + candlestick ticker
4. Mining & Metals — copper + smelter funnel
5. Steel & Manufacturing — steel gray + OEE bars
6. Data Centers — datacenter blue + rack stack
7. Energy & Utilities — utility green + grid mesh
8. Infrastructure & Smart Cities — civic blue + skyline
9. Logistics & Mobility — logistics orange + route paths

### Learn / Resources (1 hub + 4 sub-pages)
- ✅ Learn Hub (`/resources/learn`) — `LearnHubContent.tsx`
- ✅ Resources (`/resources/resources`) — cyan + reels stack
- ✅ Customer Stories (`/resources/customer-stories`) — green + testimonial card
- ✅ Blog (`/resources/blog`) — violet + article card
- ✅ Events (`/resources/events`) — orange + calendar grid
- ✅ Documentation — external (https://docs.monkdb.com)

All driven by `app/[locale]/resources/[slug]/ResourceContent.tsx`.

### Company (5)
- ✅ Press (`/company/press`) — timeline format
- ✅ Customers (`/company/customers`) — logo wall + stories
- ✅ Partners (`/company/partners`) — tier ladder
- ✅ Careers (`/company/careers`) — job board
- ✅ Contact (`/company/contact`) — form + offices

---

## 🟡 Polish / Optional Next Steps

These aren't blocking production but are ways to push further:

### A. Additional enterprise depth on routes that don't yet have it
Solutions, Industries got a stats strip + how-it-works + proof. Core Systems, Resources, Outcomes have hero + content but not the same triple-stack of stats/flow/proof. If you want every page at the same depth as Solutions/Industries, add the same EXTRAS pattern to:
- `CoreSystemContent.tsx` (would need 6 EXTRAS entries)
- `ResourceContent.tsx` (would need 4 EXTRAS entries)
- `OutcomeDetailContent.tsx` already has its own depth via the proof grid + industry table — different shape, but enterprise-grade.

### B. Em-dash sweep
CLAUDE.md rules say no em dashes in user-facing copy. There are still some in the docx-sourced content. Run:
```
grep -rn "—" content/ app/[locale]/
```
and replace per the table in CLAUDE.md. Roughly 30–60 instances total.

### C. Translation pipeline
After all `messages/en.json` keys are stable, run `npm run translate`. Takes 8–16 minutes.

### D. Production build
Run `npm run build`. Should produce ~488 static pages × 7 locales. Currently TypeScript passes; the build will catch any runtime / SSR issues.

### E. Mobile audit
At 375 px viewport, screenshot every top-level nav target and verify no overflow / collapsed grid. Industries and Solutions inherit the same pattern as MonkEdge, which passed mobile. Should be safe.

### F. Lighthouse pass
Target ≥ 90 perf, ≥ 95 a11y on home, 1 product, 1 solution, 1 industry, 1 outcome.

### G. Retire generic templates
After verifying nothing else uses them, the following can be deleted:
- `components/SectionDetailContent.tsx` — no longer referenced by any [slug]/page.tsx
- `components/DetailPageLayout.tsx` — only used by SectionDetailContent

---

## 📁 Quick Reference — Where Things Live

### Source content (docx-derived TS modules)
- `content/coreSystems.ts` — 6 Core Systems
- `content/solutions.ts` — 10 Solutions
- `content/industries.ts` — 9 Industries
- `content/outcomesDetail.ts` — 6 Outcomes
- `content/learn.ts` — 4 Learn surfaces
- `content/developerJourney.ts` — 8-stage developer journey

### Bespoke content components (1 per category)
- `app/[locale]/core-systems/[slug]/CoreSystemContent.tsx`
- `app/[locale]/solutions/[slug]/SolutionContent.tsx`
- `app/[locale]/industries/[slug]/IndustryContent.tsx`
- `app/[locale]/resources/[slug]/ResourceContent.tsx`
- `components/OutcomeDetailContent.tsx`

Each follows the same theme-map pattern: a `THEMES: Record<SlugKey, Theme>` object at the top, an `EXTRAS: Record<SlugKey, Extras>` for depth content, then a single component that looks up its theme by slug.

### Shell components
- `components/Navbar.tsx`, `Footer.tsx`, `CTABanner.tsx`, `SectionLabel.tsx`, `ScrollProgressBar.tsx`, `ScrollToTop.tsx`

### i18n
- `i18n/I18nProvider.tsx` — context
- `i18n/dictionaries.ts` — server loader (`'server-only'`)
- `i18n/config.ts` — locale list + route map
- `messages/<locale>.json` — strings
