'use client'

/**
 * PageBanner — reusable full-width page-header banner.
 *
 * Usage:  <PageBanner title="About Us" />
 */

interface PageBannerProps {
  title: string
}

/* ─── Grid ─────────────────────────────────────────────────────── */
const BOX   = 48    // px — top-face width & depth
const BOX_H = 20    // px — wall height per scale unit
const COLS  = 40
const ROWS  = 40

/* ─── Palette ───────────────────────────────────────────────────── */
const TOP  = '#4D9EFF'
const FACE = '#1A40F0'
const SIDE = '#0820C8'
const BG   = '#0318AA'

/* ─── Animation ─────────────────────────────────────────────────── */
const DUR      = 3.6
const DELAY_MS = -90

export default function PageBanner({ title }: PageBannerProps) {
  const canvasW = COLS * BOX
  const canvasH = ROWS * BOX

  return (
    <>
      <style>{`
        @keyframes pb-wave {
          0%, 100% { transform: translateZ(0px); }
          50%       { transform: translateZ(calc(var(--s, 8) * ${BOX_H}px)); }
        }
        .pb-box {
          position: relative;
          width:  ${BOX}px;
          height: ${BOX}px;
          background-color: ${TOP};
          border-radius: 5px 5px 0 0;
          transform-style: preserve-3d;
          animation: pb-wave ${DUR}s
                     calc(var(--d, 0) * ${DELAY_MS}ms)
                     infinite
                     ease-in-out;
        }
        /* front wall */
        .pb-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: calc(var(--s, 8) * ${BOX_H}px);
          background-color: ${SIDE};
          transform-origin: 100% 100%;
          transform: rotateX(90deg)
                     translateZ(calc(var(--s, 8) * ${BOX_H}px - ${BOX}px));
        }
        /* right wall */
        .pb-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width:  calc(var(--s, 8) * ${BOX_H}px);
          height: 100%;
          background-color: ${FACE};
          transform-origin: 100% 100%;
          transform: rotateY(-90deg)
                     translateZ(calc(var(--s, 8) * ${BOX_H}px - ${BOX}px));
        }
      `}</style>

      {/* ── Banner shell ────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(300px, 30vw, 380px)',
          overflow: 'hidden',
          background: BG,
        }}
      >
        {/* ── 3-D wave grid ─────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <div
              style={{
                position: 'absolute',
                top:  `${-canvasH / 2}px`,
                left: `${-canvasW / 2}px`,
                transform: 'rotateX(58deg) rotateZ(45deg)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                fontSize: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {Array.from({ length: COLS }, (_, col) => (
                <div
                  key={col}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {Array.from({ length: ROWS }, (_, row) => {
                    const diag  = col + row
                    const scale = 8 + (diag % 4)
                    return (
                      <div
                        key={row}
                        className="pb-box"
                        style={{
                          '--s': scale,
                          '--d': diag,
                        } as React.CSSProperties}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Title ─────────────────────────────────────────────── */}
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
    </>
  )
}
