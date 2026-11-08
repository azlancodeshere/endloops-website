import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Walkthrough from '../components/Walkthrough'
import CtaBand from '../components/CtaBand'
import usePageMeta from '../hooks/usePageMeta'
import { TOOLS } from '../config/content'

const PLUG_IN = [
  {
    t: 'Start with one task',
    b: 'Pick the job that costs your team the most hours. Nothing else has to change to get value from it.',
  },
  {
    t: 'Keep the tools you use',
    b: 'Output lands as structured data and readable schedules — ready for the ledger, working paper or system you already run.',
  },
  {
    t: 'Add more when ready',
    b: 'Because each tool stands alone, the next one is a decision rather than a migration.',
  },
]

export default function Tools() {
  usePageMeta(
    'Standalone tools',
    'Focused tools that each solve one specific need: purchase-order extraction, vouching automation, expense working, financial report review, tender verification and reconciliation.',
  )

  return (
    <>
      <PageHero
        index="01"
        label="Standalone tools"
        title="Keep your workflow. Remove one bottleneck."
        intro="Each tool solves a single, specific job and drops straight into the process you already run. Start where the pain is highest and add the rest when you are ready."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {['Extraction', 'Vouching', 'Expenses', 'Report review', 'Tenders', 'Reconciliation'].map(
            (n) => (
              <span key={n} className="text-[0.9rem] text-ink-mute">
                {n}
              </span>
            ),
          )}
        </div>
      </PageHero>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            index="02"
            label="See it work"
            title="Purchase-order extraction, step by step."
            intro="A worked example of one tool, from a batch of documents to a signed-off schedule. The figures are illustrative, but the flow is the real one."
          />

          <Reveal className="mt-12">
            <Walkthrough />
          </Reveal>

          <p className="mt-5 text-[0.85rem] text-ink-mute">
            Illustrative example — document names, figures and results are
            representative, not real client data.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="03"
            label="The range"
            title="Six tools, six specific jobs."
            intro="Some are already in use and others are in development. Ask us which are ready for your team today — we will not oversell it."
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                id={item.id}
                delay={(i % 3) * 80}
                className="crop-marks scroll-mt-28 flex flex-col rounded-xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-32px_rgba(0,168,96,0.35)]"
              >
                <span className="tnum eyebrow text-purple">
                  {String(i + 1).padStart(2, '0')} · Tool
                </span>

                <h3 className="display mt-5 text-[1.3rem] leading-snug text-ink">
                  {item.name}
                </h3>

                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.summary}
                </p>

                <p className="mt-4 text-[0.93rem] leading-relaxed text-ink-soft">
                  {item.detail}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.points.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[0.89rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-6 text-[0.85rem] leading-relaxed text-ink-mute">
                  {item.works}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="04"
            label="Adoption"
            title="Standalone, but never isolated."
            intro="A tool you can start with on its own should also be a tool that grows with you."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {PLUG_IN.map((item, i) => (
              <Reveal
                as="li"
                key={item.t}
                delay={i * 70}
                className="bg-white p-7 md:p-9"
              >
                <span className="tnum eyebrow text-brand-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-medium text-ink">{item.t}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.b}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Which single task costs you the most hours?"
        body="Start there. Tell us about one recurring job — matching, vouching, extracting — and we will walk you through exactly how the tool would handle it."
        primary={{ label: 'Talk to us', to: '/contact' }}
        secondary={{ label: 'See end-to-end solutions', to: '/solutions' }}
      />
    </>
  )
}
