import { useState } from 'react'

/**
 * The supplied Endloops logo, used exactly as provided — no recolouring,
 * redrawing or stretching. It is a 439x127 JPEG on a pure-white background,
 * so it must only ever be placed on a white surface.
 *
 * If the file is missing we fall back to a plain wordmark rather than showing
 * a broken image.
 */
export default function Logo({
  className = 'h-8 w-auto',
  eager = false,
  alt = 'Endloops',
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`font-semibold tracking-[-0.03em] text-ink ${className}`}
        aria-label="Endloops"
      >
        Endloops
      </span>
    )
  }

  return (
    <img
      src="/logo.jpg"
      alt={alt}
      width={439}
      height={127}
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
