'use client'

import { motion } from 'framer-motion'

/**
 * FallingPattern — slowly falling dot-streak background layered with a
 * dot-mask overlay. Lifted from 21st.dev/efferd/falling-pattern, recolored
 * to the MonkDB navy palette so it works as a subtle texture behind
 * dark sections (capabilities grid, mission, dark CTAs).
 *
 * Render as the first child of a position: relative parent. Content sits
 * above it on a higher z-index.
 */

type Props = {
  /** Streak color. Default is light-azure tuned for MonkDB navy backgrounds. */
  color?: string
  /** Solid backdrop drawn behind the streaks. Default deep navy. */
  backgroundColor?: string
  /** Loop duration in seconds. */
  duration?: number
  /** Blur on the dot-mask overlay. */
  blurIntensity?: string
  /** Mask dot spacing multiplier. */
  density?: number
  className?: string
}

const buildBackgroundImage = (color: string) => {
  // Pairs of vertical streaks plus a small dot halfway between them.
  // Y offsets are intentionally irregular so the falling motion never
  // pulses uniformly across the canvas.
  const rowYs = [
    [235, 117.5],
    [252, 126],
    [150, 75],
    [253, 126.5],
    [204, 102],
    [134, 67],
    [179, 89.5],
    [299, 149.5],
    [215, 107.5],
    [281, 140.5],
    [158, 79],
    [210, 105],
  ]
  return rowYs
    .flatMap(([y1, y2]) => [
      `radial-gradient(4px 100px at 0px ${y1}px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px ${y1}px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px ${y2}px, ${color} 100%, transparent 150%)`,
    ])
    .join(', ')
}

const BACKGROUND_SIZE =
  '300px 235px, 300px 235px, 300px 235px, 300px 252px, 300px 252px, 300px 252px, 300px 150px, 300px 150px, 300px 150px, 300px 253px, 300px 253px, 300px 253px, 300px 204px, 300px 204px, 300px 204px, 300px 134px, 300px 134px, 300px 134px, 300px 179px, 300px 179px, 300px 179px, 300px 299px, 300px 299px, 300px 299px, 300px 215px, 300px 215px, 300px 215px, 300px 281px, 300px 281px, 300px 281px, 300px 158px, 300px 158px, 300px 158px, 300px 210px, 300px 210px'

const START_POS =
  '0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 230.5px, 100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px, 150px 31px, 153px 31px, 301.5px 120.5px, 175px 235px, 178px 235px, 326.5px 384.5px, 200px 121px, 203px 121px, 351.5px 228.5px, 225px 224px, 228px 224px, 376.5px 364.5px, 250px 26px, 253px 26px, 401.5px 105px, 275px 75px, 278px 75px, 426.5px 180px'

const END_POS =
  '0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px, 100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px, 150px 9876px, 153px 9876px, 301.5px 9965.5px, 175px 13391px, 178px 13391px, 326.5px 13540.5px, 200px 14741px, 203px 14741px, 351.5px 14848.5px, 225px 18770px, 228px 18770px, 376.5px 18910.5px, 250px 5082px, 253px 5082px, 401.5px 5161px, 275px 6375px, 278px 6375px, 426.5px 6480px'

export default function FallingPattern({
  color = 'rgba(127,179,255,0.55)',
  backgroundColor = '#070D28',
  duration = 150,
  blurIntensity = '1em',
  density = 1,
  className,
}: Props) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor,
            backgroundImage: buildBackgroundImage(color),
            backgroundSize: BACKGROUND_SIZE,
          }}
          variants={{
            initial: { backgroundPosition: START_POS },
            animate: {
              backgroundPosition: [START_POS, END_POS],
              transition: {
                duration,
                ease: 'linear',
                repeat: Infinity,
              },
            },
          }}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backdropFilter: `blur(${blurIntensity})`,
          WebkitBackdropFilter: `blur(${blurIntensity})`,
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 2px)`,
          backgroundSize: `${8 * density}px ${8 * density}px`,
        }}
      />
    </div>
  )
}
