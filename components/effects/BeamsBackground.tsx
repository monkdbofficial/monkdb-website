'use client'

import { useEffect, useRef } from 'react'

/**
 * BeamsBackground — slowly rising, blurred diagonal beams rendered on canvas.
 *
 * Lifted from 21st.dev/kokonutd/beams-background. Hue range is locked to
 * MonkDB navy / azure (210 to 230) instead of the original cyan-violet sweep.
 *
 * Drop inside a position: relative parent. Component covers inset-0 and
 * is purely visual.
 */

type Beam = {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 40 + Math.random() * 70,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.28 + Math.random() * 0.22,
    hue: 210 + Math.random() * 20,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function BeamsBackground({
  intensity = 'medium',
  className,
}: {
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const rafRef = useRef<number>(0)

  const opacityMap = { subtle: 0.55, medium: 0.8, strong: 1 } as const

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement
    const sized = () => {
      const dpr = window.devicePixelRatio || 1
      const w = parent?.clientWidth ?? window.innerWidth
      const h = parent?.clientHeight ?? window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const total = 24
      beamsRef.current = Array.from({ length: total }, () =>
        createBeam(canvas.width, canvas.height),
      )
    }

    sized()
    window.addEventListener('resize', sized)

    let mounted = true
    const resetBeam = (beam: Beam, i: number, total: number) => {
      const column = i % 3
      const spacing = (parent?.clientWidth ?? window.innerWidth) / 3
      beam.y = (parent?.clientHeight ?? window.innerHeight) + 100
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4
      beam.hue = 210 + (i * 20) / total
      beam.opacity = 0.2 + Math.random() * 0.1
    }

    const draw = (beam: Beam) => {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)
      const pulsing =
        beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]
      const g = ctx.createLinearGradient(0, 0, 0, beam.length)
      g.addColorStop(0, `hsla(${beam.hue}, 90%, 60%, 0)`)
      g.addColorStop(0.1, `hsla(${beam.hue}, 90%, 60%, ${pulsing * 0.5})`)
      g.addColorStop(0.4, `hsla(${beam.hue}, 90%, 60%, ${pulsing})`)
      g.addColorStop(0.6, `hsla(${beam.hue}, 90%, 60%, ${pulsing})`)
      g.addColorStop(0.9, `hsla(${beam.hue}, 90%, 60%, ${pulsing * 0.5})`)
      g.addColorStop(1, `hsla(${beam.hue}, 90%, 60%, 0)`)
      ctx.fillStyle = g
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    const tick = () => {
      if (!mounted) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.filter = 'blur(35px)'
      const total = beamsRef.current.length
      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed
        if (beam.y + beam.length < -100) resetBeam(beam, i, total)
        draw(beam)
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      mounted = false
      window.removeEventListener('resize', sized)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [intensity])

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ filter: 'blur(12px)' }}
      />
    </div>
  )
}
