'use client'

import { useEffect, useRef } from 'react'

/**
 * Constellation — canvas particle field where nearby nodes draw connecting
 * lines. Adapted from 21st.dev/spydiecy/ai-swarm-visualization with the
 * settings UI / rule switcher stripped out and the colour palette swapped
 * from purple to MonkDB navy.
 *
 * Visual story: nodes in a distributed cluster forming live connections.
 * Drop into a position: relative parent. Pure background, pointer-events: none.
 */

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function Constellation({
  className,
  particleCount = 70,
  speed = 0.35,
  connectionDistance = 140,
  particleColor = '#7FB3FF',
  linkColor = 'rgba(127,179,255,0.25)',
}: {
  className?: string
  particleCount?: number
  speed?: number
  connectionDistance?: number
  particleColor?: string
  linkColor?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    if (!parent) return

    const sized = () => {
      const dpr = window.devicePixelRatio || 1
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        radius: Math.random() * 1.6 + 0.8,
        opacity: Math.random() * 0.4 + 0.45,
      }))
    }

    sized()
    seed()

    const ro = new ResizeObserver(() => {
      sized()
      // Re-seed if the canvas grew significantly so density stays even.
      seed()
    })
    ro.observe(parent)

    let alive = true
    const tick = () => {
      if (!alive) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      ctx.clearRect(0, 0, w, h)

      const ps = particlesRef.current

      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx = -p.vx
        if (p.y < 0 || p.y > h) p.vy = -p.vy
        // Tiny random nudge so the motion never feels mechanical.
        if (Math.random() > 0.97) {
          p.vx += (Math.random() - 0.5) * 0.08
          p.vy += (Math.random() - 0.5) * 0.08
        }
        // Cap velocity.
        const v2 = p.vx * p.vx + p.vy * p.vy
        const max = speed * 2
        if (v2 > max * max) {
          const k = max / Math.sqrt(v2)
          p.vx *= k
          p.vy *= k
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
      ctx.globalAlpha = 1

      ctx.strokeStyle = linkColor
      ctx.lineWidth = 0.5
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i]
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connectionDistance) {
            ctx.globalAlpha = 1 - d / connectionDistance
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      alive = false
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particleCount, speed, connectionDistance, particleColor, linkColor])

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
