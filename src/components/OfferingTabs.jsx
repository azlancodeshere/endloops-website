import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SOLUTIONS, TOOLS } from '../config/content'
import Reveal from './Reveal'

const TABS = [
  {
    key: 'solutions',
    label: 'End-to-end solutions',
    heading: 'Hand over the whole workflow.',
    body: 'An end-to-end solution runs a complete process from the first document to the final report. You receive the output and a short list of exceptions — not a set of tasks to work through yourself.',
    items: SOLUTIONS,
    to: '/solutions',
    cta: 'Explore all solutions',
    tone: 'brand',
  },
  {
    key: 'tools',
    label: 'Standalone tools',
    heading: 'Keep your workflow. Remove one bottleneck.',
    body: 'A standalone tool solves a single, specific job and drops straight into the process you already run. Start with the task that costs the most hours and add the rest when you are ready.',
    items: TOOLS,
    to: '/tools',
    cta: 'Explore all tools',
    tone: 'purple',
  },
]

export default function OfferingTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const tab = TABS[active]

  const onKeyDown = (event) => {
    const { key } = event
    let next = null
    if (key === 'ArrowRight' || key === 'ArrowDown') next = (active + 1) % TABS.length
    else if (key === 'ArrowLeft' || key === 'ArrowUp')
      next = (active - 1 + TABS.length) % TABS.length
    else if (key === 'Home') next = 0
    else if (key === 'End') next = TABS.length - 1

    if (next !== null) {
      event.preventDefault()
      setActive(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <div>
      <Reveal>
        <div
          role="tablist"
          aria-label="Product types"
          onKeyDown={onKeyDown}
          className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-mist p-1.5"
        >
          {TABS.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.key}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-[0.94rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active
                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(24,32,48,0.12)]'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div
        role="tabpanel"
        id={`panel-${tab.key}`}
        aria-labelledby={`tab-${tab.key}`}
        tabIndex={0}
        className="mt-10 outline-none"
      >
        <Reveal key={tab.key} className="max-w-3xl">
          <h3 className="display text-title text-ink">{tab.heading}</h3>
          <p className="mt-4 text-lead text-ink-soft">{tab.body}</p>
        </Reveal>

        <Reveal key={`${tab.key}-grid`} delay={80}>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {tab.items.map((item, i) => (
              <li key={item.id}>
                <Link
                  to={`${tab.to}#${item.id}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-mist"
                >
                  <span
                    className={`eyebrow ${
                      tab.tone === 'brand' ? 'text-brand-deep' : 'text-purple'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-4 text-[1.05rem] font-medium leading-snug text-ink">
                    {item.name}
                  </h4>
                  <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
                    {item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink-mute transition-colors group-hover:text-brand-deep">
                    Detail
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}

            {tab.items.length % 2 === 1 && (
              <li>
                <Link
                  to={tab.to}
                  className="group flex h-full flex-col justify-between bg-white p-6 transition-colors duration-300 hover:bg-mist"
                >
                  <div>
                    <span className="brand-rule block w-10" aria-hidden="true" />
                    <p className="mt-5 text-[1.05rem] font-medium leading-snug text-ink">
                      {tab.items.length} in the range
                    </p>
                    <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-soft">
                      See what each one does, what it needs from you, and where the sign-off happens.
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-brand-deep">
                    {tab.cta}
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={140} className="mt-8">
          <Link
            to={tab.to}
            className="draw-underline inline-flex items-center gap-2 text-[0.95rem] font-medium text-brand-deep"
          >
            {tab.cta}
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
