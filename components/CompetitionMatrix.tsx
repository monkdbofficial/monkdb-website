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
      style={{ padding: '72px 6%', backgroundColor: '#F5F0E8' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-bold text-center"
        style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: '#0A2280', marginBottom: '40px' }}
      >
        The Competition Matrix
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#0A2280' }}>
              {columns.map((col, i) => (
                <th
                  key={col}
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    borderRight: i < columns.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  }}
                >
                  {col}
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
                style={{ borderTop: '1px solid #f0f0f0' }}
              >
                <td style={{ padding: '18px 20px', fontSize: '0.9rem', color: '#111', fontWeight: 400, whiteSpace: 'nowrap' }}>
                  {row.feature}
                </td>
                {row.values.map((value, colIdx) => {
                  const color = cellColor(rowIdx, colIdx)
                  return (
                    <td
                      key={colIdx}
                      style={{
                        padding: '18px 20px',
                        fontSize: '0.88rem',
                        color: color ?? '#374151',
                        fontWeight: color ? 500 : 400,
                        borderLeft: '1px solid #f0f0f0',
                        verticalAlign: 'top',
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
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ marginTop: '24px', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center' }}
      >
        *Multi-model: Vector (V), Timeseries (TS), Geospatial (GIS), Full Text Search (FTS), Document JSON (DOC), Streaming SQL (SQL), Blob (BLOB), Key-Value (KV), Graph (G)
      </motion.p>
    </section>
  )
}
