'use client'

/**
 * Aurora — slowly shifting aurora-like colour bands tuned for visible motion
 * against a deep navy backdrop.
 *
 * Originally adapted from 21st.dev/aceternity/aurora-background. Rewrote the
 * blend strategy: drops the screen blend (which made the navy-on-navy gradient
 * invisible) in favour of a higher-opacity bright-blue band that fades at the
 * edges via a mask, so industries and solutions pages get a clear ambient
 * shimmer without overpowering the title.
 */

export default function Aurora({
  className,
  intensity = 'medium',
}: {
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
}) {
  const opacity =
    intensity === 'subtle' ? 0.5 : intensity === 'strong' ? 1 : 0.75
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      <div
        style={{
          position: 'absolute',
          inset: '-40px',
          opacity,
          backgroundImage: `
            repeating-linear-gradient(105deg,
              transparent 0%, transparent 8%,
              rgba(127,179,255,0.45) 11%, rgba(127,179,255,0.45) 13%,
              transparent 16%,
              rgba(30,138,255,0.55) 19%, rgba(30,138,255,0.55) 21%,
              transparent 24%,
              rgba(26,56,232,0.45) 27%, rgba(26,56,232,0.45) 30%,
              transparent 34%)
          `,
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 50%',
          filter: 'blur(18px)',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 35%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 35%, transparent 80%)',
          willChange: 'background-position',
          animation: 'aurora-shift 14s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes aurora-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
