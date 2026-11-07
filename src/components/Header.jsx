import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import { NAV, SITE } from '../config/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Always start a new page with the menu closed.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc closes the panel and the page behind it stops scrolling.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled
          ? 'shadow-[0_1px_0_rgba(24,32,48,0.08),0_12px_28px_-24px_rgba(24,32,48,0.45)]'
          : ''
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name} — home`}
        >
          {/* The supplied logo: white background, so it sits on a white header. */}
          <Logo className="h-7 w-auto md:h-8" eager />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-[0.94rem] transition-colors duration-200 ${
                      isActive
                        ? 'text-ink'
                        : 'text-ink-soft hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapped rather than given `hidden`, because Button's own base
              class is `inline-flex` and would win the cascade over it. */}
          <span className="hidden sm:block">
            <Button to={SITE.demoHref} variant="primary" arrow>
              Request a demo
            </Button>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-mist lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-line last:border-0">
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 text-lg transition-colors ${
                      isActive ? 'text-brand-deep' : 'text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`text-ink-mute ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      >
                        →
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button
            to={SITE.demoHref}
            variant="primary"
            className="mt-5 w-full"
            arrow
          >
            Request a demo
          </Button>
        </nav>
      </div>
    </header>
  )
}
