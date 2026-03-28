'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const columns = [
  { name: 'MonkDB', highlight: true },
  { name: 'SingleStore', highlight: false },
  { name: 'Snowflake', highlight: false },
  { name: 'Clickhouse', highlight: false },
  { name: 'Aerospike', highlight: false },
  { name: 'SAP HANA', highlight: false },
]

const rows = [
  {
    feature: 'Deployment',
    values: [
      'Cloud, On-Prem, Edge',
      'Cloud, On-Prem',
      'Cloud only',
      'Cloud, On-Prem',
      'Cloud, On-Prem',
      'Cloud, On-Prem',
    ],
  },
  {
    feature: 'Processor',
    values: [
      'Supports ARM, x86_64',
      'Optimised for x86_64',
      'Optimised for x86_64',
      'Supports x86_64, ARM partial',
      'Supports ARM, x86_64',
      'Requires in-mem arch',
    ],
  },
  {
    feature: 'Multi-Model',
    values: [
      'V, TS, GIS, FTS, DOC, SQL, BLOB',
      'V, TS, FTS, DOC, SQL',
      'V, TS, GIS, FTS, DOC, SQL',
      'V, TS, GIS, FTS, DOC, SQL',
      'V, GIS, FTS, DOC, KV, G',
      'V, TS, GIS, FTS, DOC, SQL, BLOB',
    ],
  },
  {
    feature: 'Hybrid Search',
    values: [
      'Available',
      'Available',
      'Available',
      'Not Available',
      'Available',
      'Not Available',
    ],
  },
  {
    feature: 'HTAP',
    values: [
      'Only OLAP',
      'Supports',
      'Supports',
      'Only OLAP',
      'Supports',
      'Supports',
    ],
  },
  {
    feature: 'Licensing',
    values: [
      'Flexible EULAs',
      'Flexible EULAs',
      'Consumption Based',
      'Open Core + Enterprise',
      'Open Source + Enterprise',
      'Extremely Expensive',
    ],
  },
]

function getCellStyle(value: string, isMonkDB: boolean) {
  if (value === 'Not Available') return 'text-red-500 dark:text-red-400 font-medium'
  if (value === 'Available') return 'text-green-600 dark:text-green-400 font-medium'
  if (isMonkDB) return 'text-egyptian-blue dark:text-blue-energy font-semibold'
  return 'text-gray-700 dark:text-gray-300'
}

export default function CompetitionMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="competition"
      ref={ref}
      className="py-24 bg-white dark:bg-[#0f1623] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-egyptian-blue dark:text-blue-energy font-mono text-sm font-semibold mb-3 tracking-wider uppercase">
            Competitive Analysis
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-egyptian-blue dark:text-white">
            The Competition Matrix
          </h2>
          <p className="mt-4 text-gray-500 dark:text-powder-blue max-w-2xl mx-auto">
            See how MonkDB compares to the market&apos;s leading database solutions.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg"
        >
          <table className="w-full min-w-[800px] border-collapse">
            {/* Header */}
            <thead>
              <tr>
                <th className="bg-oxford-navy text-white text-left px-5 py-4 text-sm font-semibold rounded-tl-2xl w-40">
                  Feature
                </th>
                {columns.map((col, i) => (
                  <th
                    key={col.name}
                    className={`px-5 py-4 text-sm font-semibold text-center ${
                      col.highlight
                        ? 'bg-egyptian-blue text-white'
                        : 'bg-oxford-navy text-white'
                    } ${i === columns.length - 1 ? 'rounded-tr-2xl' : ''}`}
                  >
                    {col.name}
                    {col.highlight && (
                      <span className="ml-1 text-xs text-blue-energy">★</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={row.feature}
                  className={`border-t border-gray-100 dark:border-white/5 ${
                    rowIdx % 2 === 0
                      ? 'bg-white dark:bg-[#1a2535]'
                      : 'bg-gray-50/50 dark:bg-[#1e2c40]'
                  }`}
                >
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800 dark:text-powder-blue w-40">
                    {row.feature}
                  </td>
                  {row.values.map((value, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-5 py-4 text-sm text-center ${
                        colIdx === 0
                          ? 'bg-blue-50/80 dark:bg-egyptian-blue/10'
                          : ''
                      }`}
                    >
                      <span className={getCellStyle(value, colIdx === 0)}>
                        {value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-xs text-gray-400 dark:text-powder-blue/60 text-center leading-relaxed max-w-3xl mx-auto"
        >
          *Multi-model: Vector (V), Timeseries (TS), Geospatial (GIS), Full-Text Search (FTS),
          Document JSON (DOC), Streaming SQL (SQL), Blob (BLOB), Key-Value (KV), Graph (G)
        </motion.p>
      </div>
    </section>
  )
}
