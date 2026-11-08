import { useState } from 'react'

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
