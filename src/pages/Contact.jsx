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
            {/* Form */}
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

            {/* Sidebar */}
            {/* Not an <aside>: nested inside <main> it would create a
                nested landmark, which is flagged as an a11y violation. */}
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
                          <span className="block text-[0.97rem] font-medium text-ink">
                            {s.t}
                          </span>
                          <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-soft">
                            {s.b}
                          </span>
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
                    <li>
                      <span className="block text-[0.82rem] text-ink-mute">Email</span>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="draw-underline mt-1 inline-block text-[1rem] font-medium text-ink transition-colors hover:text-brand-deep"
                      >
                        {SITE.email}
                      </a>
                    </li>
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
                      <span className="mt-1 block text-[1rem] font-medium text-ink">
                        {SITE.address}
                      </span>
                    </li>
                    <li>
                      <span className="block text-[0.82rem] text-ink-mute">Origin</span>
                      <span className="mt-1 block text-[0.97rem] leading-relaxed text-ink-soft">
                        {SITE.originLine}
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow text-brand-deep">Before you ask</p>
              <h2 className="display mt-6 text-headline text-ink">
                Three questions we get first.
              </h2>
            </Reveal>

            <dl className="mt-12 border-t border-line">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 70} className="border-b border-line py-7">
                  <dt className="text-[1.05rem] font-medium leading-snug text-ink">
                    {item.q}
                  </dt>
                  <dd className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                    {item.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
