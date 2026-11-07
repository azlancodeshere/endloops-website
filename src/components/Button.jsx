import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-300 ' +
  'ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  /* Solid brand green — AA contrast against white text (5.4:1). */
  primary:
    'bg-brand-deep text-white px-6 py-3 text-[0.95rem] hover:bg-brand-ink ' +
    'hover:-translate-y-px shadow-[0_1px_2px_rgba(24,32,48,0.16)] ' +
    'hover:shadow-[0_10px_24px_-10px_rgba(0,97,58,0.65)]',

  secondary:
    'bg-white text-ink px-6 py-3 text-[0.95rem] border border-line-strong ' +
    'hover:border-ink/40 hover:bg-mist hover:-translate-y-px',

  onDark:
    'bg-white text-ink px-6 py-3 text-[0.95rem] hover:bg-white/90 hover:-translate-y-px ' +
    'shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)]',

  outlineOnDark:
    'text-white px-6 py-3 text-[0.95rem] border border-white/30 ' +
    'hover:border-white/70 hover:bg-white/5',

  quiet: 'text-ink px-0 py-1 text-[0.95rem] hover:text-brand-deep',
}

function Arrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      <path
        d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * One button for three destinations: `to` (internal route), `href` (external),
 * or a plain submit/reset button. Keeps markup consistent across the site.
 */
export default function Button({
  variant = 'primary',
  to,
  href,
  arrow = false,
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

export { Arrow }
