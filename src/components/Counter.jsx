import { useEffect, useState } from 'react'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function Counter({ value, duration = 1400 }) {
  const numeric = parseInt(value, 10)
  const suffix = isNaN(numeric) ? '' : value.replace(String(numeric), '')

  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const reduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setCount(numeric)
      return
    }

    const el = document.getElementById(`counter-${value}`)
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [numeric, reduced, value])

  useEffect(() => {
    if (!triggered) return
    if (numeric === 0) { setCount(0); return }

    const start = performance.now()
    let raf
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutExpo(progress) * numeric))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered, numeric, duration])

  return (
    <span id={`counter-${value}`}>
      {count}
      {suffix}
    </span>
  )
}
