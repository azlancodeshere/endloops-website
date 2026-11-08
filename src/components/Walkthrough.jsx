import { useState } from 'react'

const STEPS = [
  { n: '01', label: 'Hand it over' },
  { n: '02', label: 'Extract' },
  { n: '03', label: 'Match and check' },
  { n: '04', label: 'Sign off' },
]

const FILES = [
  'INV-4471.pdf', 'INV-4472.pdf', 'PO-2210.pdf', 'INV-4480.pdf',
  'INV-4491.jpg', 'PO-2214.pdf', 'INV-4495.pdf', 'STMT-Jul.pdf',
  'INV-4502.pdf', 'PO-2219.pdf', 'INV-4511.jpg', 'INV-4515.pdf',
]

const EXTRACTED = [
  { field: 'Supplier', value: 'Gulf Meridian Trading', src: 'p.1, header', conf: '99.4%' },
  { field: 'Invoice no.', value: 'INV-4480', src: 'p.1, top right', conf: '99.1%' },
  { field: 'Date', value: '04 Jul 2025', src: 'p.1, header', conf: '98.7%' },
  { field: 'PO reference', value: 'PO-2210', src: 'p.1, footer', conf: '97.9%' },
  { field: 'Net total', value: '23,714.29', src: 'p.1, totals', conf: '99.6%' },
  { field: 'VAT 5%', value: '1,185.71', src: 'p.1, totals', conf: '99.2%' },
  { field: 'Gross total', value: '24,900.00', src: 'p.1, totals', conf: '99.6%' },
]

const MATCHES = [
  { ref: 'INV-4471', result: 'Agrees to PO-2208', state: 'ok', note: 'Total and quantity match' },
  { ref: 'INV-4472', result: 'Agrees to PO-2208', state: 'ok', note: 'Within agreed tolerance' },
  { ref: 'INV-4480', result: 'Exceeds PO by AED 1,400.00', state: 'flag', note: 'No approved variation found' },
  { ref: 'PO-2210', result: 'No invoice received', state: 'flag', note: 'Open commitment' },
  { ref: 'INV-4495', result: 'Agrees to PO-2214', state: 'ok', note: 'Total and quantity match' },
]

function Panel({ step }) {
  if (step === 0) {
    return (
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="display text-title text-ink">Drop in the batch.</h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
            Invoices, purchase orders and statements — scanned, photographed or
            exported. Hundreds of documents in one run, in whatever order they
            arrive.
          </p>
          <ul className="mt-6 space-y-2 text-[0.94rem] text-ink-soft">
            {['PDF, images and exports accepted', 'Mixed document types in a single batch', 'No re-typing or manual sorting'].map(
              (t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-mist p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="eyebrow text-ink-mute">Incoming batch</span>
            <span className="eyebrow rounded-full bg-white px-2.5 py-1 text-brand-deep">48 files</span>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {FILES.map((f) => (
              <li
                key={f}
                className="truncate rounded-md border border-line bg-white px-2.5 py-2 text-[0.72rem] text-ink-soft"
              >
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.78rem] text-ink-mute">…and 36 more in the same run.</p>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h3 className="display text-title text-ink">Every figure, with its source.</h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
            Fields are read from each document and returned as structured data.
            Nothing arrives as an unexplained number — each value keeps the page
            and location it came from, so a reviewer can check it in seconds.
          </p>
          <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-mute">
            Confidence is shown per field. Anything below your threshold is
            routed to a person instead of being trusted silently.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center justify-between border-b border-line bg-mist px-4 py-3">
            <span className="eyebrow text-ink-mute">INV-4480 · extracted</span>
            <span className="eyebrow text-brand-deep">7 fields</span>
          </div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Fields extracted from invoice INV-4480</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="eyebrow px-4 py-2.5 font-medium text-ink-mute">Field</th>
                <th scope="col" className="eyebrow px-4 py-2.5 font-medium text-ink-mute">Value</th>
                <th scope="col" className="eyebrow hidden px-4 py-2.5 font-medium text-ink-mute sm:table-cell">Source</th>
                <th scope="col" className="eyebrow px-4 py-2.5 text-right font-medium text-ink-mute">Conf.</th>
              </tr>
            </thead>
            <tbody>
              {EXTRACTED.map((r) => (
                <tr key={r.field} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 text-[0.85rem] text-ink-soft">{r.field}</td>
                  <td className="tnum px-4 py-2.5 text-[0.85rem] font-medium text-ink">{r.value}</td>
                  <td className="hidden px-4 py-2.5 text-[0.78rem] text-ink-mute sm:table-cell">{r.src}</td>
                  <td className="tnum px-4 py-2.5 text-right text-[0.8rem] text-brand-deep">{r.conf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h3 className="display text-title text-ink">Checked against the register.</h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
            Each invoice is matched to its purchase order and tested against the
            rules you agreed — totals, quantities, duplicates and approved
            limits. Agreed items clear; the rest become a short list.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <span className="flex items-center gap-2 text-[0.9rem] text-ink-soft">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand" />
              <span className="tnum font-medium text-ink">45</span> agreed
            </span>
            <span className="flex items-center gap-2 text-[0.9rem] text-ink-soft">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="tnum font-medium text-ink">3</span> need review
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center justify-between border-b border-line bg-mist px-4 py-3">
            <span className="eyebrow text-ink-mute">Match results</span>
            <span className="eyebrow text-amber-deep">2 shown · 3 flagged</span>
          </div>
          <ul>
            {MATCHES.map((m) => (
              <li key={m.ref} className="border-b border-line px-4 py-3 last:border-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        m.state === 'ok' ? 'bg-brand' : 'bg-amber'
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="tnum block text-[0.85rem] font-medium text-ink">{m.ref}</span>
                      <span
                        className={`block text-[0.85rem] ${
                          m.state === 'ok' ? 'text-ink-soft' : 'text-amber-deep'
                        }`}
                      >
                        {m.result}
                      </span>
                      <span className="mt-0.5 block text-[0.78rem] text-ink-mute">{m.note}</span>
                    </span>
                  </span>
                  <span
                    className={`eyebrow shrink-0 rounded-full px-2 py-1 ${
                      m.state === 'ok' ? 'bg-brand/10 text-brand-ink' : 'bg-amber/15 text-amber-deep'
                    }`}
                  >
                    {m.state === 'ok' ? 'Pass' : 'Review'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <h3 className="display text-title text-ink">Prepared — then handed to you.</h3>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
          The output is a working schedule with the matches, the exceptions and
          the evidence already attached. Your team works the three items that
          need judgement and signs off the rest.
        </p>
        <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-mute">
          Nothing is approved by the software. The sign-off stays with a person.
        </p>
      </div>

      <div className="rounded-xl border border-line bg-mist p-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-ink-mute">Output</span>
          <span className="eyebrow rounded-full bg-brand px-2.5 py-1 text-white">Ready</span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {[
            { t: 'Matching schedule', d: '48 lines, evidence linked' },
            { t: 'Exception list', d: '3 items, with reasons' },
            { t: 'Extracted data', d: 'CSV, ready for your ledger' },
          ].map((o) => (
            <li key={o.t} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3">
              <span>
                <span className="block text-[0.9rem] font-medium text-ink">{o.t}</span>
                <span className="block text-[0.78rem] text-ink-mute">{o.d}</span>
              </span>
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brand" aria-hidden="true">
                <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-lg border border-purple/25 bg-purple/[0.05] px-4 py-3">
          <p className="text-[0.85rem] font-medium text-ink">Awaiting your sign-off</p>
          <p className="mt-0.5 text-[0.78rem] text-ink-mute">3 exceptions · reviewer required</p>
        </div>
      </div>
    </div>
  )
}

export default function Walkthrough() {
  const [step, setStep] = useState(0)

  const go = (n) => setStep(Math.min(Math.max(n, 0), STEPS.length - 1))

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-50px_rgba(24,32,48,0.5)]">
      <div className="border-b border-line bg-mist px-4 py-3 md:px-6">
        <ol className="flex flex-wrap gap-x-1 gap-y-2">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={i === step ? 'step' : undefined}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.85rem] font-medium transition-all duration-300 ${
                  i === step
                    ? 'bg-white text-ink shadow-[0_1px_2px_rgba(24,32,48,0.12)]'
                    : 'text-ink-soft hover:bg-white/70 hover:text-ink'
                }`}
              >
                <span
                  className={`tnum text-[0.72rem] ${
                    i === step ? 'text-brand-deep' : 'text-ink-mute'
                  }`}
                >
                  {s.n}
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="px-5 py-8 md:px-8 md:py-10">
        <div
          key={step}
          style={{ animation: 'fade-in 0.45s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <Panel step={step} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[0.9rem] font-medium text-ink transition-all hover:border-ink/40 hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M13 8H4m0 0 3.5-3.5M4 8l3.5 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <span aria-hidden="true" className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s.n}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-brand' : 'w-1.5 bg-line-strong'
              }`}
            />
          ))}
        </span>

        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={step === STEPS.length - 1}
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2.5 text-[0.9rem] font-medium text-white transition-all hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
