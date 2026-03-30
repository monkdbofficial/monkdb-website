'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const columns = ['Feature', 'MonkDB', 'SingleStore', 'Snowflake', 'Clickhouse', 'Aerospike', 'SAP HANA']

const rows = [
  {
    feature: 'Feature',
    values: ['Cloud, On-Prem, Edge', 'Cloud, On-Prem', 'Cloud only', 'Cloud, On-Prem', 'Cloud, On-Prem', 'Cloud, On-Prem'],
  },
  {
    feature: 'Processor',
    values: ['Supports ARM, x86_64', 'Optimised for x86_64', 'Optimised for x86_64', 'Supports x86_64, ARM partial', 'Supports ARM, x86_64', 'Requires in-mem arch'],
    green: [0, 3, 4],
  },
  {
    feature: 'Multi-Model',
    values: ['V, TS, GIS, FTS, DOC, SQL, BLOB', 'V, TS, FTS, DOC, SQL', 'V, TS, GIS, FTS, DOC, SQL', 'V, TS, GIS, FTS, DOC, SQL', 'V, GIS, FTS, DOC, KV, G', 'V, TS, GIS, FTS, DOC, SQL, BLOB'],
  },
  {
    feature: 'Hybrid Search',
    values: ['Available', 'Available', 'Available', 'Not Available', 'Available', 'Not Available'],
    green: [0, 1, 2, 4],
    red: [3, 5],
  },
  {
    feature: 'HTAP',
    values: ['Only OLAP', 'Supports', 'Supports', 'Only OLAP', 'Supports', 'Supports'],
    green: [1, 2, 4, 5],
  },
  {
    feature: 'Licensing',
    values: ['Flexible EULAs', 'Flexible EULAs', 'Consumption Based', 'Open Core + Enterprise', 'Open Source + Enterprise', 'Extremely Expensive'],
    green: [0, 1, 3, 4],
    red: [5],
  },
]

function cellColor(rowIdx: number, colIdx: number) {
  const row = rows[rowIdx]
  if (row.red?.includes(colIdx)) return '#ef4444'
  if (row.green?.includes(colIdx)) return '#16a34a'
  return undefined
}

export default function CompetitionMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="competition"
      ref={ref}
      className="px-5 sm:px-[6%] lg:px-[12%] py-10 sm:py-14 lg:py-[72px]"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-bold text-center mb-8 sm:mb-10 lg:mb-12"
        style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
      >
        <span className="gradient-text-animate">The Competition Matrix</span>
      </motion.h2>

      {/* Full-bleed scroll wrapper — extends edge-to-edge on every screen size */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="-mx-5 sm:-mx-[6%] lg:-mx-[12%] overflow-x-auto pb-1"
      >
        <div className="px-5 sm:px-[6%] lg:px-[12%]">
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              minWidth: '700px',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0A2280' }}>
                  {columns.map((col, colIdx) => (
                    <th
                      key={col}
                      style={{
                        padding: '14px 18px',
                        textAlign: 'left',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        whiteSpace: 'nowrap',
                        background: colIdx === 1 ? 'rgba(30,138,255,0.3)' : undefined,
                      }}
                    >
                      {colIdx === 1 ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {col}
                          <span style={{
                            fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px',
                            borderRadius: '999px', background: '#1E8AFF', color: '#fff',
                            letterSpacing: '0.03em',
                          }}>★ Best</span>
                        </span>
                      ) : col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIdx) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + rowIdx * 0.07, ease: 'easeOut' }}
                    style={{ background: rowIdx % 2 === 0 ? '#ffffff' : '#f9fafb' }}
                  >
                    <td style={{ padding: '14px 18px', fontSize: '0.82rem', color: '#111', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {row.feature}
                    </td>
                    {row.values.map((value, colIdx) => {
                      const color = cellColor(rowIdx, colIdx)
                      return (
                        <td
                          key={colIdx}
                          style={{
                            padding: '14px 18px',
                            fontSize: '0.78rem',
                            color: color ?? (colIdx === 0 ? '#1A38E8' : '#374151'),
                            fontWeight: color ? 600 : (colIdx === 0 ? 600 : 400),
                            verticalAlign: 'top',
                            lineHeight: 1.5,
                            background: colIdx === 0 ? 'rgba(26,56,232,0.04)' : undefined,
                          }}
                        >
                          {value}
                        </td>
                      )
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 text-center"
        style={{ fontSize: '0.8rem', color: '#9ca3af' }}
      >
        *Multi-model: Vector (V), Timeseries (TS), Geospatial (GIS), Full Text Search (FTS), Document JSON (DOC), Streaming SQL (SQL), Blob (BLOB), Key-Value (KV), Graph (G)
      </motion.p>
    </section>
  )
}
