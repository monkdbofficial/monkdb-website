'use client'

/**
 * Monk SmartRetail — bespoke page for retail and customer ops.
 * Visual identity:
 *   - Coral / pink accent (#F472B6) on MonkDB navy
 *   - Hero: shop-floor heatmap with SKU "shelves" + customer dots
 *   - Mid-block: dynamic price grid showing per-SKU price recompute
 */

import { motion } from 'framer-motion'
import SmartXLayout from '@/components/SmartXLayout'

// Deeper berry / mulberry. Replaces the candy #F472B6 hot pink with a
// muted enterprise tone that still differentiates retail.
const ACCENT = '#B14593'

function RetailHero() {
  // Procedural shelf heatmap: 6×6 grid where shade = SKU velocity
  const cells: { row: number; col: number; intensity: number }[] = []
  const seed = [0.2, 0.7, 0.4, 0.9, 0.1, 0.5, 0.8, 0.3, 0.6]
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      cells.push({
        row: r,
        col: c,
        intensity: seed[(r * 6 + c) % seed.length],
      })
    }
  }
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        aspectRatio: '4 / 3',
        background:
          'linear-gradient(160deg, #2A0F23 0%, #1B0A1A 50%, #07091A 100%)',
        border: `1px solid ${ACCENT}55`,
        boxShadow: `0 30px 80px ${ACCENT}33`,
      }}
    >
      <div
        className="absolute"
        style={{
          left: '6%',
          top: '14%',
          right: '6%',
          bottom: '14%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gap: '4px',
        }}
      >
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.015 }}
            className="rounded-sm"
            style={{
              background: `rgba(177,69,147,${0.05 + cell.intensity * 0.55})`,
              border: '1px solid rgba(177,69,147,0.20)',
            }}
          />
        ))}
      </div>
      {/* Customer dots traveling — bouncing across the heatmap */}
      {[
        { x: ['8%', '88%', '8%'], y: ['18%', '76%', '18%'], duration: 8 },
        { x: ['78%', '12%', '78%'], y: ['22%', '70%', '22%'], duration: 10 },
        { x: ['18%', '60%', '92%', '18%'], y: ['82%', '20%', '60%', '82%'], duration: 9 },
      ].map((c, i) => (
        <motion.div
          key={`cust-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#B45309',
            boxShadow: '0 0 10px rgba(180,83,9,0.7)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ left: c.x, top: c.y }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Top label */}
      <div
        className="absolute top-4 left-5"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Store · 4,210 sq ft · live
      </div>
      {/* Heat scale */}
      <div
        className="absolute bottom-4 left-5 right-5 flex items-center gap-3"
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <span>Cold</span>
        <div
          className="flex-1 rounded-full"
          style={{
            height: 4,
            background: `linear-gradient(90deg, ${ACCENT}10, ${ACCENT}A0, ${ACCENT})`,
          }}
        />
        <span style={{ color: ACCENT }}>Hot</span>
      </div>
    </div>
  )
}

function PriceGrid() {
  const skus = [
    { sku: 'SKU-1042', name: 'Cotton tee · M', oldPrice: 19.99, newPrice: 17.49, demand: 0.86 },
    { sku: 'SKU-2018', name: 'Linen shirt · L', oldPrice: 44.0, newPrice: 39.0, demand: 0.62 },
    { sku: 'SKU-3370', name: 'Hooded sweat · S', oldPrice: 59.0, newPrice: 64.0, demand: 0.94 },
    { sku: 'SKU-4519', name: 'Wool socks · 3p', oldPrice: 12.0, newPrice: 9.99, demand: 0.40 },
    { sku: 'SKU-5781', name: 'Denim · 32W', oldPrice: 79.0, newPrice: 79.0, demand: 0.55 },
    { sku: 'SKU-6602', name: 'Sneaker · 10', oldPrice: 99.0, newPrice: 109.0, demand: 0.97 },
  ]
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'white',
        border: '1px solid rgba(10,34,128,0.08)',
        boxShadow: '0 16px 40px rgba(10,20,80,0.06)',
      }}
    >
      <div className="overflow-x-auto">
      <div
        className="grid grid-cols-[140px_1fr_120px_120px_140px]"
        style={{
          minWidth: 720,
          background: '#F8F4F0',
          padding: 'clamp(12px, 1.4vw, 16px) clamp(18px, 2.2vw, 28px)',
          borderBottom: '1px solid rgba(10,34,128,0.10)',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(10,34,128,0.5)',
        }}
      >
        <div>SKU</div>
        <div>Item</div>
        <div>Was</div>
        <div>Now</div>
        <div>Demand</div>
      </div>
      {skus.map((s, i) => {
        const delta = s.newPrice - s.oldPrice
        const direction =
          delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'
        const dirColor =
          direction === 'up'
            ? '#1FA975'
            : direction === 'down'
              ? ACCENT
              : 'rgba(10,34,128,0.4)'
        return (
          <motion.div
            key={s.sku}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-[140px_1fr_120px_120px_140px] items-center"
            style={{
              minWidth: 720,
              padding:
                'clamp(12px, 1.4vw, 16px) clamp(18px, 2.2vw, 28px)',
              borderBottom:
                i < skus.length - 1
                  ? '1px solid rgba(10,34,128,0.06)'
                  : 'none',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: '12.5px',
              color: '#0A2280',
            }}
          >
            <div style={{ fontWeight: 600, color: ACCENT }}>{s.sku}</div>
            <div style={{ fontFamily: 'inherit', color: '#374151', fontWeight: 500, fontSize: '13.5px' }}>
              {s.name}
            </div>
            <div style={{ color: 'rgba(10,34,128,0.5)' }}>
              ${s.oldPrice.toFixed(2)}
            </div>
            <div
              className="inline-flex items-center gap-1.5"
              style={{ fontWeight: 700, color: dirColor }}
            >
              ${s.newPrice.toFixed(2)}
              <span aria-hidden="true">
                {direction === 'up' ? '↑' : direction === 'down' ? '↓' : '·'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="relative rounded-full overflow-hidden flex-1 max-w-[80px]"
                style={{
                  height: 6,
                  background: 'rgba(10,34,128,0.10)',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.demand * 100}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.05,
                  }}
                  className="absolute top-0 bottom-0 left-0"
                  style={{ background: ACCENT }}
                />
              </div>
              <span
                style={{
                  fontSize: '10.5px',
                  color: 'rgba(10,34,128,0.5)',
                }}
              >
                {Math.round(s.demand * 100)}%
              </span>
            </div>
          </motion.div>
        )
      })}
      </div>
    </div>
  )
}

export default function SmartRetailContent() {
  return (
    <SmartXLayout
      crumb="MonkSmartX"
      industryLabel="Retail"
      title="Monk SmartRetail"
      subtitle="Real-time customer and operations intelligence."
      lead="Behaviour, inventory, and transaction signals on one continuous engine. Personalize, forecast demand, and price dynamically across every shelf, channel, and shopper."
      heroIllustration={<RetailHero />}
      accent={ACCENT}
      stats={[
        { value: '+8.4%', label: 'Revenue lift' },
        { value: '-31%', label: 'Stockouts' },
        { value: '<1 s', label: 'Price recompute' },
        { value: '6', label: 'Channels unified' },
      ]}
      midBlock={{
        label: 'Dynamic pricing',
        title: 'Prices that follow live demand',
        body: <PriceGrid />,
      }}
      capabilities={[
        {
          iconName: 'sparkles',
          title: 'Personalization',
          body: 'Recommendations grounded in live behaviour and inventory state.',
          chip: 'Live · per shopper',
        },
        {
          iconName: 'trending-up',
          title: 'Demand forecasting',
          body: 'SKU-level forecasts that update on every transaction.',
          chip: 'SKU-level · streaming',
        },
        {
          iconName: 'tag',
          title: 'Dynamic pricing',
          body: 'Price decisions informed by demand, competition, and elasticity in real time.',
          chip: '<1 s recompute',
        },
        {
          iconName: 'shopping-bag',
          title: 'Inventory intelligence',
          body: 'Stockouts and overstocks flagged as they form, not at end-of-day reconciliation.',
          chip: '-31% stockouts',
        },
      ]}
      flow={[
        {
          iconName: 'shopping-bag',
          title: 'Capture',
          body: 'Behaviour, basket, inventory, and POS data streamed continuously across stores and channels.',
        },
        {
          iconName: 'sparkles',
          title: 'Personalize',
          body: 'Hybrid retrieval matches each shopper to inventory, content, and offers in milliseconds.',
        },
        {
          iconName: 'tag',
          title: 'Price',
          body: 'Demand, competition, and elasticity reasoned over per SKU. Prices recompute under one second.',
        },
        {
          iconName: 'truck',
          title: 'Replenish',
          body: 'Stockouts and overstocks flagged as they form. Replenishment workflows fire from the engine.',
        },
      ]}
      integrations={[
        {
          group: 'Commerce',
          tools: ['Shopify', 'Magento', 'Salesforce Commerce', 'POS systems'],
        },
        {
          group: 'Operations',
          tools: ['SAP', 'Oracle Retail', 'WMS', 'OMS'],
        },
        {
          group: 'AI and analytics',
          tools: ['Personalization engines', 'Pricing optimizers', 'Looker', 'Tableau'],
        },
      ]}
      proofMetrics={[
        { value: '+8.4%', label: 'Year-one revenue lift across channels' },
        { value: '-31%', label: 'Stockouts on top SKUs' },
        { value: '<1 s', label: 'Per-SKU price recompute on demand signal' },
      ]}
      certifications={['SOC 2 Type II', 'PCI DSS', 'ISO 27001', 'GDPR', 'CCPA']}
      quote={{
        text: 'Pricing decisions used to wait for an overnight batch. Now they ride the same data that customers see when they walk in.',
        role: 'VP Retail Technology',
        org: 'Plait Retail',
      }}
      ctaHeading="Build retail that adapts to every shopper."
    />
  )
}
