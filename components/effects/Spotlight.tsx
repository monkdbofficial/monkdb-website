'use client'

/**
 * Spotlight — a single soft animated radial light sweep.
 *
 * Adapted from 21st.dev/aceternity/spotlight. Suited to product / feature
 * heroes where the page wants to feel singular and focused. Renders an
 * elliptical white-fill ellipse with a heavy gaussian blur that slowly
 * fades in then drifts left to right.
 */

export default function Spotlight({
  className,
  fill = 'rgba(127,179,255,0.35)',
}: {
  className?: string
  fill?: string
}) {
  return (
    <svg
      aria-hidden
      className={`absolute pointer-events-none ${className ?? 'top-0 left-0 h-[140%] w-[120%] lg:w-[80%]'}`}
      style={{ opacity: 0, animation: 'spotlight-fade-drift 9s ease forwards' }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#monkdb-spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
        />
      </g>
      <defs>
        <filter
          id="monkdb-spotlight-blur"
          x="0.86"
          y="0.84"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
          <feGaussianBlur stdDeviation="151" result="blur" />
        </filter>
      </defs>
      <style>
        {`
          @keyframes spotlight-fade-drift {
            0%   { opacity: 0; transform: translate(-8%, -6%); }
            60%  { opacity: 1; transform: translate(0, 0); }
            100% { opacity: 1; transform: translate(4%, 2%); }
          }
        `}
      </style>
    </svg>
  )
}
