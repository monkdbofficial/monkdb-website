'use client'

/**
 * PageBanner — reusable full-width page-header banner.
 * Canvas-based isometric wave grid (replaces 1600 DOM elements).
 *
 * Usage:  <PageBanner title="About Us" />
 */

import { useEffect, useRef } from 'react'

/* ─── Grid config (matches original visual exactly) ─────────────── */
const BOX   = 48    // tile size in grid space
const BOX_H = 20    // wall height per scale unit
const COLS  = 40
const ROWS  = 40
const DUR   = 3.6   // wave cycle (seconds)
const DELAY = 0.09  // per-diagonal phase delay (seconds)

/* ─── Palette ───────────────────────────────────────────────────── */
const TOP_C  = '#4D9EFF'
const FACE_C = '#1A40F0'
const SIDE_C = '#0820C8'
const BG_C   = '#0318AA'

/* ─── Isometric projection constants ────────────────────────────── */
// Replicates CSS: rotateX(58deg) rotateZ(45deg)
const C45 = Math.cos(Math.PI / 4)
const S45 = Math.sin(Math.PI / 4)
const C58 = Math.cos(58 * Math.PI / 180)
const S58 = Math.sin(58 * Math.PI / 180)

const GCX = (COLS * BOX) / 2   // grid center X
const GCY = (ROWS * BOX) / 2   // grid center Y

/* Pre-compute static screen-X and base screen-Y for every grid corner.
   scrX never changes; scrY0 is the y-component at gz=0.
   At elevation gz: scrY = scrY0[i] - gz * S58  */
const CORNER_COUNT = (COLS + 1) * (ROWS + 1)
const scrX  = new Float32Array(CORNER_COUNT)
const scrY0 = new Float32Array(CORNER_COUNT)

for (let r = 0; r <= ROWS; r++) {
  for (let c = 0; c <= COLS; c++) {
    const cx = c * BOX - GCX
    const cy = r * BOX - GCY
    const rx = cx * C45 - cy * S45
    const ry = cx * S45 + cy * C45
    const i  = r * (COLS + 1) + c
    scrX[i]  = rx
    scrY0[i] = ry * C58
  }
}

function corner(c: number, r: number, gz: number): [number, number] {
  const i = r * (COLS + 1) + c
  return [scrX[i], scrY0[i] - gz * S58]
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function PageBanner({ title }: { title: string }) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0

    function resize() {
      if (!canvas || !wrap || !ctx) return
      const dpr = window.devicePixelRatio || 1
      W = wrap.offsetWidth
      H = wrap.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let visible = true
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting },
      { threshold: 0 },
    )
    io.observe(wrap)

    let startTime = -1

    /* Draw a filled polygon */
    function poly(pts: [number, number][], color: string) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
      ctx.closePath()
      ctx.fill()
    }

    function loop(ts: number) {
      rafRef.current = requestAnimationFrame(loop)
      if (!visible) return

      if (startTime < 0) startTime = ts
      const t = (ts - startTime) / 1000   // seconds

      /* Background */
      ctx.fillStyle = BG_C
      ctx.fillRect(0, 0, W, H)

      /* Canvas origin = banner center (matches CSS top:50% left:50%) */
      const ox = W / 2
      const oy = H / 2

      /* Painter's algorithm: draw diagonals back→front (low diag first) */
      for (let diag = 0; diag < COLS + ROWS - 1; diag++) {
        const c0 = Math.max(0, diag - (ROWS - 1))
        const c1 = Math.min(diag, COLS - 1)

        for (let col = c0; col <= c1; col++) {
          const row = diag - col

          /* Wave height — matches CSS ease-in-out approximated by sine */
          const scale = 8 + (diag % 4)
          const phase = 2 * Math.PI * (t / DUR - (diag * DELAY) / DUR)
          const gz    = scale * BOX_H * (0.5 + 0.5 * Math.sin(phase))

          /* Four corners of this tile's top face (elevated at gz) */
          const [tlx, tly]  = corner(col,     row,     gz)
          const [trx, try_] = corner(col + 1, row,     gz)
          const [brx, bry]  = corner(col + 1, row + 1, gz)
          const [blx, bly]  = corner(col,     row + 1, gz)

          /* Base corners (gz = 0) — only TR, BR, BL needed for walls */
          const [tr0x, tr0y] = corner(col + 1, row,     0)
          const [br0x, br0y] = corner(col + 1, row + 1, 0)
          const [bl0x, bl0y] = corner(col,     row + 1, 0)

          /* Offset to screen coordinates */
          const S = (x: number, y: number): [number, number] => [ox + x, oy + y]

          if (gz > 0.5) {
            /* South wall (world +Y face) — appears on LEFT in screen — SIDE color */
            poly([
              S(blx, bly), S(brx, bry),
              S(br0x, br0y), S(bl0x, bl0y),
            ], SIDE_C)

            /* East wall (world +X face) — appears on RIGHT in screen — FACE color */
            poly([
              S(trx, try_), S(brx, bry),
              S(br0x, br0y), S(tr0x, tr0y),
            ], FACE_C)
          }

          /* Top face — always on top */
          poly([
            S(tlx, tly), S(trx, try_),
            S(brx, bry), S(blx, bly),
          ], TOP_C)
        }
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(300px, 30vw, 380px)',
        overflow: 'hidden',
        background: BG_C,
      }}
    >
      {/* Canvas grid — single GPU texture, replaces 1600 DOM elements */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(calc(-50% + clamp(32px, 3vw, 46px)))',
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'var(--font-sans, sans-serif)',
          fontSize: 'clamp(32px, 4.5vw, 72px)',
          fontWeight: 300,
          letterSpacing: '0.01em',
          textShadow: '0 2px 32px rgba(0,0,0,0.45)',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1.1,
        }}
      >
        / {title} /
      </div>
    </div>
  )
}
