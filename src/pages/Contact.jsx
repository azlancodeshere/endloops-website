import { useState } from 'react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import usePageMeta from '../hooks/usePageMeta'
import { SITE } from '../config/site'

const NEXT_STEPS = [
  { t: 'We read it', b: 'One business day, from a person — not an auto-reply.' },
  { t: 'A short call', b: 'Twenty minutes to understand the process and the deadline behind it.' },
  { t: 'A worked example', b: 'We run your sample documents through and show you the output.' },
]

const FAQ = [
  {
    q: 'Do we have to replace our systems?',
    a: 'No. Standalone tools drop into the workflow you already run, and output arrives as structured data and readable schedules rather than a new place to work.',
  },
  {
    q: 'Does the software approve anything on its own?',
    a: 'Never. It prepares, checks and surfaces exceptions. A professional reviews and signs off — that boundary is a product requirement, not a disclaimer.',
  },
  {
    q: 'What is ready today?',
    a: 'Some products are in use and others are in development. Tell us which process you need and we will say plainly whether it is ready for your team.',
  },
]

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className="border-b border-line">
      <dt>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-4 py-7 text-left"
        >
          <span className="text-[1.05rem] font-medium leading-snug text-ink transition-colors hover:text-brand-deep">
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-mute transition-all duration-300 ${
              open ? 'rotate-45 border-brand text-brand' : ''
            }`}
          >
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
              <path
                d="M6 2v8M2 6h8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </dt>
      <dd
        id={`${id}-panel`}
        aria-labelledby={`${id}-btn`}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-7 text-[0.98rem] leading-relaxed text-ink-soft">{a}</p>
        </div>
      </dd>
    </div>
  )
}

export default function Contact() {
  usePageMeta(
    'Talk to us',
    'Request a demo or tell us about the process that costs your team the most hours. We reply within one business day.',
  )

  return (
    <>
      <PageHero
        index="01"
        label="Contact"
        title="Tell us what eats the most hours."
        intro="One process is enough to start with. Describe how the work reaches you today — documents, systems, deadlines — and we will come back with how Endloops would handle it."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="display text-title text-ink">Request a demo</h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                  Fields marked with{' '}
                  <span aria-hidden="true" className="text-brand-deep">*</span>{' '}
                  are required. We do not add you to a mailing list.
                </p>
              </Reveal>
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <div className="rounded-2xl border border-line bg-mist p-7 md:p-8">
                  <h2 className="eyebrow text-ink-mute">What happens next</h2>
                  <ol className="mt-6 space-y-5">
                    {NEXT_STEPS.map((s, i) => (
                      <li key={s.t} className="flex gap-4">
                        <span className="tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[0.75rem] font-semibold text-brand-deep">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block text-[0.97rem] font-medium text-ink">{s.t}</span>
                          <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-soft">{s.b}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-6 rounded-2xl border border-line p-7 md:p-8">
                  <h2 className="eyebrow text-ink-mute">Direct</h2>
                  <ul className="mt-6 space-y-4">
                    {SITE.phone && (
                      <li>
                        <span className="block text-[0.82rem] text-ink-mute">Phone</span>
                        <a
                          href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                          className="draw-underline mt-1 inline-block text-[1rem] font-medium text-ink transition-colors hover:text-brand-deep"
                        >
                          {SITE.phone}
                        </a>
                      </li>
                    )}
                    <li>
                      <span className="block text-[0.82rem] text-ink-mute">Based in</span>
                      <span className="mt-1 block text-[1rem] font-medium text-ink">{SITE.address}</span>
                    </li>
                    <li>
                      <span className="block text-[0.82rem] text-ink-mute">Origin</span>
                      <span className="mt-1 block text-[0.97rem] leading-relaxed text-ink-soft">{SITE.originLine}</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow text-brand-deep">Before you ask</p>
              <h2 className="display mt-6 text-headline text-ink">Three questions we get first.</h2>
            </Reveal>
            <dl className="mt-12 border-t border-line">
              {FAQ.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
