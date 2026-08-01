/**
 * The irregular pattern printed inside a privacy envelope so the contents
 * can't be read through the paper. Tiled from one 48×48 cell of short,
 * deliberately mismatched strokes — the disorder is the point.
 */
export default function SecurityTint({ id = 'security-tint', className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`text-tint ${className}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(8)"
        >
          <g
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M0 6 L14 0" />
            <path d="M18 0 L30 10" />
            <path d="M34 2 L48 12" />
            <path d="M2 14 L16 22" />
            <path d="M20 15 L34 26" />
            <path d="M38 16 L48 26" />
            <path d="M0 28 L10 20" />
            <path d="M12 30 L26 38" />
            <path d="M30 32 L44 40" />
            <path d="M0 41 L8 34" />
            <path d="M11 44 L22 48" />
            <path d="M26 43 L38 48" />
            <path d="M42 44 L48 40" />
            <path d="M6 2 L0 12" />
            <path d="M26 4 L20 14" />
            <path d="M44 6 L38 16" />
            <path d="M15 26 L8 36" />
            <path d="M36 28 L30 38" />
            <path d="M46 30 L41 39" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
