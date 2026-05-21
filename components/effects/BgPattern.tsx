'use client'

import { ComponentProps } from 'react'

/**
 * BgPattern — multi-variant CSS-only background primitive.
 *
 * Adapted from 21st.dev/efferd/bg-pattern. Zero deps, no JS at runtime, no
 * canvas. Supports six visual variants (dots, grid, diagonal-stripes,
 * horizontal-lines, vertical-lines, checkerboard) and eight mask shapes
 * (fade-edges, fade-center, fade-top/bottom/left/right, fade-x, fade-y).
 *
 * Defaults are tuned for MonkDB navy palette so it can drop straight onto
 * dark or light enterprise sections.
 */

type Variant =
  | 'dots'
  | 'grid'
  | 'diagonal-stripes'
  | 'horizontal-lines'
  | 'vertical-lines'
  | 'checkerboard'

type Mask =
  | 'fade-edges'
  | 'fade-center'
  | 'fade-top'
  | 'fade-bottom'
  | 'fade-left'
  | 'fade-right'
  | 'fade-x'
  | 'fade-y'
  | 'none'

type Props = ComponentProps<'div'> & {
  variant?: Variant
  mask?: Mask
  /** Pattern cell size in px. */
  size?: number
  /** Stroke / dot colour. Defaults to a subtle navy. */
  fill?: string
}

const MASK_GRADIENT: Record<Mask, string | undefined> = {
  'fade-edges':
    'radial-gradient(ellipse at center, #000 0%, transparent 75%)',
  'fade-center':
    'radial-gradient(ellipse at center, transparent 0%, #000 75%)',
  'fade-top': 'linear-gradient(to bottom, transparent, #000)',
  'fade-bottom': 'linear-gradient(to bottom, #000, transparent)',
  'fade-left': 'linear-gradient(to right, transparent, #000)',
  'fade-right': 'linear-gradient(to right, #000, transparent)',
  'fade-x': 'linear-gradient(to right, transparent, #000, transparent)',
  'fade-y': 'linear-gradient(to bottom, transparent, #000, transparent)',
  none: undefined,
}

function bgImage(variant: Variant, fill: string, size: number) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`
  }
}

export default function BgPattern({
  variant = 'grid',
  mask = 'none',
  size = 32,
  fill = 'rgba(127,179,255,0.10)',
  className,
  style,
  ...rest
}: Props) {
  const maskValue = MASK_GRADIENT[mask]
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
      style={{
        backgroundImage: bgImage(variant, fill, size),
        backgroundSize: `${size}px ${size}px`,
        maskImage: maskValue,
        WebkitMaskImage: maskValue,
        ...style,
      }}
      {...rest}
    />
  )
}
