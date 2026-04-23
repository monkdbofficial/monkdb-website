@AGENTS.md

# MonkDB Design System — Claude Rules

Follow these rules on EVERY file, EVERY page, EVERY component. No exceptions.

---

## Typography System

Enterprise-grade. Light weight headings. Never `font-bold` on headings.

| Element | fontSize (clamp) | fontWeight | letterSpacing | Notes |
|---|---|---|---|---|
| H1 Hero | `clamp(36px, 6vw, 88px)` | `300` | `-0.02em` | Page hero only |
| H2 Section | `clamp(22px, 3vw, 52px)` | `300` | `-0.01em` | All section titles |
| H3 Card title | `clamp(15px, 1.4vw, 20px)` | `400` | — | Inside cards/features |
| Pull quote | `clamp(20px, 2.8vw, 44px)` | `300` | `-0.01em` | Large paragraph statements |
| Body text | `clamp(14px, 1.2vw, 17px)` | `400` | — | Regular paragraphs |
| Small label | `0.75rem` | `500` | `0.06em + uppercase` | `[SECTION]` tags |
| Button text | `clamp(0.82rem, 1.1vw, 0.9rem)` | `600` | — | CTA buttons |
| Stat numbers (outline) | `clamp(40px, 5.5vw, 96px)` | `700` | `-3px` | Use `WebkitTextStroke`, transparent fill |

**Rules:**
- NEVER use `font-bold` or `fontWeight: 700` on h1, h2, h3 headings
- ALWAYS add `textDecoration: 'none'` to h1 elements
- ALWAYS use `lineHeight: 1.1–1.25` on large headings
- `font-bold` is only allowed on stat outline numbers (transparent + stroke) and buttons
- Brand name "MonkDB" accent: use `gradient-text-animate` class, `fontWeight: 400`

---

## Color System

```
Primary blue:      #1A38E8
Deep navy:         #0A2280
Egyptian blue:     #0033A0
Light blue:        #1E8AFF
Background light:  #ffffff
Background alt:    #F8F4F0 (parchment)
Background dark:   #0f1623
Text dark:         text-gray-900
Text muted:        text-gray-500 / text-gray-600
Text on dark:      text-white / text-blue-200
```

---

## Spacing & Layout

- **Max container width:** `max-w-[1920px] mx-auto`
- **Horizontal padding:** `px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28`
- **Section vertical padding:** `py-10 sm:py-14 lg:py-20`
- **Card border-radius:** `rounded-[20px]` or `rounded-[24px]`

---

## Responsiveness Rules — MANDATORY

1. **Never use bare `grid-cols-2` or `grid-cols-3`** — always add `sm:` or `md:` breakpoints
   - ✅ `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
   - ❌ `grid-cols-2`

2. **Flex rows must wrap on mobile:**
   - ✅ `flex flex-wrap gap-3`
   - ❌ `flex gap-3` (no wrap)

3. **All font sizes must use `clamp()`** — no fixed px for headings
   - ✅ `fontSize: 'clamp(22px, 3vw, 48px)'`
   - ❌ `fontSize: '48px'`

4. **Banner/section min heights:**
   - `clamp(160px, 28vw, 380px)` for hero banners
   - Never use a min value above 200px on sections

5. **Absolute-positioned overlays with `clamp` widths:**
   - Minimum must be ≤ 45% of the smallest expected container width
   - Use `clamp(140px, 28%, 440px)` NOT `clamp(220px, 30%, 440px)`

6. **All pages must support:** 320px (small mobile) → 768px (tablet) → 1280px (laptop) → 1920px (desktop)

7. **Images:** always use `w-full h-auto` or `objectFit: 'contain'/'cover'` — never fixed pixel dimensions without responsive fallback

---

## Component Patterns

### Section Header Pattern
```tsx
<span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
  [Section Label]
</span>
<h2 style={{ fontSize: 'clamp(22px, 3vw, 52px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
  Section Heading Here
</h2>
```

### Card H3 Pattern
```tsx
<h3 style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 400, lineHeight: 1.3 }}>
  Card Title
</h3>
```

### CTA Button Pattern
```tsx
style={{ borderRadius: '999px', padding: '11px 24px', fontWeight: 600, fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', textDecoration: 'none' }}
```

### Grid Layout Pattern
```tsx
// 2-col with responsive
className="grid grid-cols-1 lg:grid-cols-[48%_1fr] gap-6 sm:gap-10 lg:gap-20 items-center"

// Bento / feature cards
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"

// 4-col feature list
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12"
```

---

## Files & Structure

- Home page: `app/page.tsx` — imports components only
- About page: `app/about/page.tsx` — all sections inline
- Components: `components/Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `FeatureCards.tsx`, `Mission.tsx`, `ROI.tsx`, `About.tsx`, `PageBanner.tsx`
- Global CSS: `app/globals.css`
- Key CSS classes: `.section-grid` (dot bg), `.gradient-text-animate` (animated brand gradient)

---

## DO NOT

- Do NOT use `font-bold` on any heading (h1, h2, h3)
- Do NOT use fixed pixel widths without responsive fallback
- Do NOT use bare `grid-cols-N` without mobile breakpoint
- Do NOT add `text-decoration: underline` to headings
- Do NOT use `fontWeight: 700` on any heading text (only on stat stroke numbers and buttons)
- Do NOT use `whitespace-nowrap` on text that may overflow on mobile

---

## Copywriting rules

**Never use em dashes (`—`) in any user-facing string.** Reviewers have flagged em dashes as a tell that copy is AI-generated. This rule applies to every heading, subtitle, body paragraph, card description, table cell, tooltip, button label, and alt text in `components/**` and `app/**/page.tsx`.

Context-appropriate replacements:
| Original use of `—` | Replace with |
|---|---|
| Clause continuation: *"fast data — everywhere it lives"* | Comma: *"fast data, everywhere it lives"* |
| Contrasting statement: *"built once — run anywhere"* | Period + new sentence: *"Built once. Runs anywhere."* |
| Label–value pair: *"Simple — single binary"* | Colon: *"Simple: single binary"* |
| Compound word with no spaces: *"Data—Together"* | Comma with space: *"Data, Together"* |
| Dramatic pause in a headline | `<br />` with the two parts treated as separate lines |

**Em dashes are allowed only inside JSX/JS code comments** (e.g., `{/* section — note */}`, `// step — details`). Reviewers see user copy, not code.

When writing new copy:
- Use short sentences. Two short sentences beat one long one with an em dash.
- Prefer concrete nouns and verbs over abstract phrases stitched together with em dashes.
- If you catch yourself typing ` — `, stop and restructure.
