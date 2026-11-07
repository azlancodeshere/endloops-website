import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import OfferingTabs from '../components/OfferingTabs'
import CapabilityList from '../components/CapabilityList'
import ProcessLoop from '../components/ProcessLoop'
import LoopPipeline from '../components/LoopPipeline'
import CtaBand from '../components/CtaBand'
import Button from '../components/Button'
import usePageMeta from '../hooks/usePageMeta'
import { PROBLEMS, AUDIENCES } from '../config/content'

const TRUST = [
  {
    k: 'Origin',
    v: 'The technology department of Alkazim, a Dubai accounting and audit firm.',
  },
  {
    k: 'Built for',
    v: 'Accountants, auditors, finance teams and property management companies.',
  },
  {
    k: 'Always',
    v: 'The software prepares the work. A professional reviews and signs off.',
  },
]

export default function Home() {
  usePageMeta(
    'Automation for financial professionals',
    'Endloops builds automation for accountants, auditors, finance teams and property management companies. The software prepares the work — your team reviews, decides and signs off.',
  )

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-brand/[0.09] blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-blue/[0.07] blur-[130px]"
        />

        <div className="shell relative pb-10 pt-14 md:pb-14 md:pt-20">
          <Reveal className="max-w-4xl">
            <p className="eyebrow flex items-center gap-3 text-brand-deep">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              Automation for financial professionals
            </p>

            <h1 className="display mt-8 text-display text-ink">
              The busywork is handled.
              <br className="hidden sm:block" /> The judgement is yours.
            </h1>
          </Reveal>

          <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <p className="max-w-2xl text-lead text-ink-soft">
                Endloops builds automation for accountants, auditors, finance
                teams and property management companies — software that reads
                your documents, checks them against your rules and drafts the
                working papers, so your people spend their hours on judgement
                instead of keying.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button to="/contact" variant="primary" arrow>
                  Request a demo
                </Button>
                <Button href="#how-it-works" variant="secondary">
                  See how it works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-line bg-mist p-6 md:p-7">
                <p className="eyebrow text-ink-mute">At a glance</p>
                <dl className="mt-5">
                  {TRUST.map((item) => (
                    <div key={item.k} className="mt-4 border-t border-line pt-4 first:mt-0">
                      <dt className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-brand-deep">
                        {item.k}
                      </dt>
                      <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">
                        {item.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The visual that explains the product */}
        <div className="shell relative pb-16 md:pb-24">
          <Reveal delay={120}>
            <LoopPipeline />
          </Reveal>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            label="The problem"
            title="Where the day actually goes."
            intro="Much of a finance professional's day is spent on tasks software can handle. The work is repetitive, it leaves room for error, and it takes attention away from judgement and away from clients."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {PROBLEMS.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="bg-mist p-7 transition-colors duration-300 hover:bg-white md:p-9"
              >
                <h3 className="text-[1.05rem] font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Two offerings ────────────────────────────────────────── */}
      <section className="border-t border-line bg-white py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            label="What we build"
            title="Two ways to put Endloops to work."
            intro="Some teams want an entire process handed over. Others want to keep their process and remove the one task costing them the most hours. Both exist — and the range keeps growing."
          >
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-ink-mute">
              A few products are already in use and others are in development.
              We will tell you plainly which ones are ready for your team.
            </p>
          </SectionHeading>

          <div className="mt-12">
            <OfferingTabs />
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="03"
            label="Capabilities"
            title="What the technology actually does."
            intro="Five capabilities, applied to the work you already do — whether it arrives as a single document or a few hundred."
          />
          <CapabilityList />
        </div>
      </section>

      {/* ── The loop ─────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-t border-line bg-white py-20 md:py-28"
      >
        <div className="shell">
          <SectionHeading
            index="04"
            label="How it works"
            title="Every loop ends with a person."
            intro="That is the whole idea. The software prepares and checks and surfaces what needs attention — then a professional reviews it, decides, and signs off. Nothing is approved automatically."
          />
          <ProcessLoop />
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="05"
            label="Who it is for"
            title="Built for people whose work has to be right."
            intro="Detailed, time-sensitive work, on deadlines that do not move. For teams like these, reliability and clarity matter as much as anything on screen."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="group bg-mist p-7 transition-colors duration-300 hover:bg-white"
              >
                <span className="tnum eyebrow text-brand-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-[1.05rem] font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
