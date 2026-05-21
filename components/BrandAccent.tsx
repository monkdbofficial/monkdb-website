import React from 'react'

export function renderBrand(text: string): React.ReactNode {
  if (typeof text !== 'string' || !text.includes('MonkDB')) return text
  const parts = text.split(/(MonkDB)/g)
  return parts.map((part, i) =>
    part === 'MonkDB'
      ? <span key={i} className="gradient-text-animate" style={{ fontWeight: 400 }}>MonkDB</span>
      : <React.Fragment key={i}>{part}</React.Fragment>
  )
}
