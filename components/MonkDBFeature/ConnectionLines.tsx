'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ConnectionLinesProps {
  currentMode: string
  animationComplete: boolean
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  currentMode,
  animationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!animationComplete) return

    const canvas = canvasRef.current
    if (!canvas) return

    const parentElement = canvas.parentElement
    if (!parentElement) return

    const resize = () => {
      canvas.width = parentElement.offsetWidth
      canvas.height = parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      window.removeEventListener('resize', resize)
      return
    }

    let animationFrame: number
    let dashOffset = 0

    // Light panel — subdued navy strokes
    const lineColor =
      currentMode === 'dark'
        ? 'rgba(147, 197, 253, 0.55)'
        : 'rgba(26, 56, 232, 0.40)'

    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) => {
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1.25
      ctx.setLineDash([4, 4])
      ctx.lineDashOffset = -dashOffset
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Small endpoint dot
      ctx.beginPath()
      ctx.fillStyle = 'rgba(26, 56, 232, 0.85)'
      ctx.arc(endX, endY, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      dashOffset = (dashOffset + 0.5) % 8
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const parentRect = parentElement.getBoundingClientRect()

      const pgWire = parentElement.querySelector('.connector-item')
      const database = parentElement.querySelector('.database-item')
      const inputItems = parentElement.querySelectorAll('.input-item')
      const outputItems = parentElement.querySelectorAll('.output-item')

      if (inputItems.length && pgWire && database && outputItems.length) {
        const pgRect = pgWire.getBoundingClientRect()
        const dbRect = database.getBoundingClientRect()

        const pgLeft = pgRect.left - parentRect.left
        const pgRight = pgRect.right - parentRect.left
        const pgMidY = pgRect.top + pgRect.height / 2 - parentRect.top

        const dbLeft = dbRect.left - parentRect.left
        const dbRight = dbRect.right - parentRect.left
        const dbMidY = dbRect.top + dbRect.height / 2 - parentRect.top

        // PG Wire → Database
        drawLine(pgRight, pgMidY, dbLeft, dbMidY)

        // Inputs → PG Wire
        inputItems.forEach((input) => {
          const r = input.getBoundingClientRect()
          drawLine(
            r.right - parentRect.left,
            r.top + r.height / 2 - parentRect.top,
            pgLeft,
            pgMidY,
          )
        })

        // Database → Outputs
        outputItems.forEach((output) => {
          const r = output.getBoundingClientRect()
          drawLine(
            dbRight,
            dbMidY,
            r.left - parentRect.left,
            r.top + r.height / 2 - parentRect.top,
          )
        })
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [animationComplete, currentMode])

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: animationComplete ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
  )
}

export default ConnectionLines
