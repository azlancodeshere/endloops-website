import { useEffect, useState } from 'react'

const STEPS = [
  { n: '01', label: 'Read documents', meta: 'Invoices, purchase orders, statements', result: '48 / 48 read' },
  { n: '02', label: 'Compare and match', meta: 'Against the ledger and PO register', result: '45 matched · 3 differ' },
  { n: '03', label: 'Check against rules', meta: '12 agreed controls applied', result: '3 flagged' },
  { n: '04', label: 'Prepare drafts', meta: 'Schedule and exception list', result: 'Ready to review' },
]

const ROWS = [
  { id: 'INV-4471', amt: '12,400.00' },
  { id: 'INV-4472', amt: '8,150.00' },
  { id: 'INV-4480', amt: '24,900.00' },
  { id: 'PO-2210', amt: '5,600.00' },
  { id: 'INV-4491', amt: '—' },
  { id: 'INV-4495', amt: '3,275.00' },
]

const ROW_STATUS = [
  ['read', 'read', 'read', 'read', 'read', 'read'],
  ['ok', 'ok', 'diff', 'ok', 'missing', 'ok'],
  ['ok', 'ok', 'flag', 'ok', 'flag', 'ok'],
  ['draft', 'draft', 'draft', 'draft', 'draft', 'draft'],
]

const STATUS_STYLE = {
  read: { dot: 'bg-white/30', text: 'text-white/45', label: 'Reading' },
  ok: { dot: 'bg-brand', text: 'text-brand', label: 'Matched' },
  diff: { dot: 'bg-amber', text: 'text-amber', label: 'Differs' },
  missing: { dot: 'bg-amber', text: 'text-amber', label: 'Missing' },
  flag: { dot: 'bg-amber', text: 'text-amber', label: 'Flagged' },
  draft: { dot: 'bg-brand', text: 'text-brand', label: 'In draft' },
}

const STEP_MS = 2400
const REVIEW_MS = 3200
const LAST = STEPS.length

function prefersReduced() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function LoopPipeline() {
  const reduced = prefersReduced()
  const [stage, setStage] = useState(reduced ? LAST : 0)
  const [playing, setPlaying] = useState(!reduced)

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(
      () => setStage((s) => (s >= LAST ? 0 : s + 1)),
      stage >= LAST ? REVIEW_MS : STEP_MS,
    )
    return () => window.clearTimeout(id)
  }, [stage, playing])

  const reviewing = stage >= LAST

  return (
    <div
      className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-navy-deep shadow-[0_40px_80px_-50px_rgba(10,16,28,0.9)] grain"
      role="group"
      aria-label="Illustration: how one Endloops run works"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-blue/20 blur-[120px]"
      />

      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-brand" />
          </span>
          <p className="eyebrow truncate text-white/55">Run · Supplier invoices — Q3</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="eyebrow hidden rounded-full border border-white/15 px-2.5 py-1 text-white/50 sm:inline">
            Illustrative
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            aria-label={playing ? 'Pause the sequence' : 'Play the sequence'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            {playing ? (
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path d="M3.5 2.5v7M8.5 2.5v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path d="M3.5 2.3v7.4L9.5 6z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="relative grid gap-6 p-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8 md:p-7">
        <figure className="min-w-0">
          <figcaption className="eyebrow mb-3 text-white/40">Source document</figcaption>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3.5">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <span className="text-[0.8rem] font-medium text-white/80">INV-4480</span>
              <span className="tnum text-[0.72rem] text-white/40">04 Jul 2025</span>
            </div>
            <ul className="space-y-2">
              {ROWS.map((row, i) => {
                const status = ROW_STATUS[Math.min(stage, LAST - 1)][i]
                const style = STATUS_STYLE[status]
                return (
                  <li
                    key={row.id}
                    className="flex items-center justify-between gap-2 rounded px-1.5 py-1 transition-colors duration-500"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 ${style.dot}`}
                      />
                      <span className="tnum truncate text-[0.74rem] text-white/65">{row.id}</span>
                    </span>
                    <span className={`tnum shrink-0 text-[0.74rem] transition-colors duration-500 ${style.text}`}>
                      {row.amt}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-white/40">
            Every figure keeps its link back to this document.
          </p>
        </figure>

        <div className="min-w-0">
          <p className="eyebrow mb-3 text-white/40">What the software does</p>
          <ol className="space-y-1.5">
            {STEPS.map((step, i) => {
              const done = stage > i
              const current = stage === i
              return (
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false)
                      setStage(i)
                    }}
                    aria-current={current ? 'step' : undefined}
                    className="w-full rounded-lg px-3 py-3 text-left transition-colors duration-300 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`tnum mt-0.5 text-[0.7rem] transition-colors ${
                          done || current ? 'text-brand' : 'text-white/30'
                        }`}
                      >
                        {step.n}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span
                            className={`text-[0.94rem] font-medium transition-colors ${
                              done || current ? 'text-white' : 'text-white/45'
                            }`}
                          >
                            {step.label}
                          </span>
                          <span
                            className={`tnum text-[0.75rem] transition-colors ${
                              done || current ? 'text-brand' : 'text-white/30'
                            }`}
                          >
                            {done || current ? step.result : '—'}
                          </span>
                        </span>

                        <span className="mt-1 block text-[0.78rem] text-white/40">{step.meta}</span>

                        <span
                          aria-hidden="true"
                          className="mt-2.5 block h-[3px] w-full overflow-hidden rounded-full bg-white/10"
                        >
                          <span
                            className="block h-full w-full origin-left rounded-full bg-linear-to-r from-brand to-teal"
                            style={{
                              transform: `scaleX(${done ? 1 : 0})`,
                              animation:
                                current && !reduced && playing
                                  ? `bar-fill ${STEP_MS}ms linear forwards`
                                  : undefined,
                            }}
                          />
                        </span>
                      </span>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <div
        className={`relative flex flex-col gap-4 border-t px-5 py-5 transition-colors duration-500 md:flex-row md:items-center md:justify-between md:px-7 ${
          reviewing ? 'border-brand/40 bg-brand/[0.09]' : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
              reviewing ? 'bg-brand' : 'bg-white/25'
            }`}
          />
          <div>
            <p
              className={`text-[0.94rem] font-medium transition-colors ${
                reviewing ? 'text-white' : 'text-white/55'
              }`}
            >
              {reviewing
                ? '3 items need a decision — human review'
                : 'Waiting for the software to finish preparing'}
            </p>
            <p className="mt-0.5 text-[0.78rem] text-white/45">
              {reviewing
                ? 'Adjust · query · approve — the sign-off is always yours.'
                : 'Nothing is approved automatically.'}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-all duration-500 ${
              reviewing ? 'bg-white text-ink' : 'border border-white/15 text-white/35'
            }`}
          >
            Approve
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-all duration-500 ${
              reviewing ? 'border border-white/35 text-white' : 'border border-white/10 text-white/25'
            }`}
          >
            Adjust
          </span>
        </div>
      </div>
    </div>
  )
}
