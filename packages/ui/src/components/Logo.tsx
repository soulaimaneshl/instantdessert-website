'use client'

type LogoVariant = 'default' | 'monochrome-clair' | 'monochrome-sombre'
type LogoSize = 24 | 32 | 48

interface LogoProps {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
}

const colorMap: Record<LogoVariant, string> = {
  'default':            'text-rose',
  'monochrome-clair':   'text-white',
  'monochrome-sombre':  'text-chocolat',
}

const textSizeMap: Record<LogoSize, string> = {
  24: 'text-sm',
  32: 'text-base',
  48: 'text-2xl',
}

export function Logo({ variant = 'default', size = 32, className = '' }: LogoProps) {
  const color = colorMap[variant]
  const textSize = textSizeMap[size]

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Instant Dessert"
    >
      {/* SVG placeholder — remplacer par le vrai SVG de marque */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className={color}
      >
        <circle cx="24" cy="19" r="13" fill="currentColor" opacity="0.15" />
        <circle cx="24" cy="15" r="5" fill="currentColor" />
        <path
          d="M13 28c0 7 5 11 11 11s11-4 11-11"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="18" y1="28" x2="30" y2="28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <span className={`font-display font-semibold tracking-tight ${textSize} ${color}`}>
        Instant Dessert
      </span>
    </div>
  )
}
