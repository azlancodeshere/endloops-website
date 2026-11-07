import { useEffect, useRef, useState } from 'react'

const motionReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Fade-and-rise on first scroll into view.
 *
 * The `reveal` class is only applied once we know IntersectionObserver exists
 * and motion is allowed — so if either is missing the content simply renders
 * in its final state rather than being stranded at opacity 0.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (motionReduced() || typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    setArmed(true)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const classes = [className, armed && 'reveal', visible && 'is-visible']
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
