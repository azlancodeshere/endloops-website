import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import usePageMeta from '../hooks/usePageMeta'
import { PRINCIPLES, ROADMAP } from '../config/content'
import { SITE } from '../config/site'

const CAPABILITIES_WE_GROW = [
  {
    t: 'Engineering',
    b: 'Building systems that hold up under real volumes, real deadlines and real client data — where a silent error costs far more than a missing feature.',
  },
  {
    t: 'Design',
    b: 'Making the reasoning legible. A reviewer should be able to see why a figure was flagged without being taught how to use the product first.',
  },
  {
    t: 'Quality',
    b: 'Testing against the edge cases that only appear in practice, because in financial work the exception is often the whole point of the job.',
  },
]

export default function About() {
  usePageMeta(
    'About',
    'Endloops grew out of the technology department of Alkazim, a Dubai accounting and audit firm. We build automation for accounting, audit and property finance teams across the GCC and beyond.',
  )

  return (
    <>
      <PageHero
        index="01"
        label="About Endloops"
        title="Born inside an accounting firm."
        intro="Endloops did not start as a product idea. It started as a department doing the work — building software to automate the financial tasks that Alkazim's own teams performed for clients, every day, under deadline."
      />

      {/* Origin story */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-brand-deep">The origin</p>
                <h2 className="display mt-6 text-headline text-ink">
                  The department became the company.
                </h2>

                <div className="mt-8 space-y-6 text-[1.05rem] leading-relaxed text-ink-soft">
                  <p>
                    {SITE.origin} is an accounting and audit firm based in Dubai.
                    Over the years, its technology department built software to
                    automate the financial work the firm itself was doing — the
                    reading, matching, checking and drafting that sits behind
                    every engagement.
                  </p>
                  <p>
                    That department is now Endloops: a company that builds
                    automation for financial professionals. The difference is
                    scope. The same tools, the same standards, now built for
                    accountants, auditors, finance teams and property management
                    companies beyond one firm.
                  </p>
                  <p>
                    It shapes how we work. We have seen these processes run for
                    real clients, against real deadlines, where being
                    approximately right is not an option. So we build for the run
                    where nothing goes wrong — not for the demo where everything
                    does.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <figure className="rounded-2xl border border-line bg-mist p-8 md:p-10">
                  <span aria-hidden="true" className="block h-10 w-px bg-linear-to-b from-brand to-teal" />
                  <blockquote className="display mt-7 text-[1.45rem] leading-snug text-ink md:text-[1.65rem]">
                    “The software prepares the work. The professional reviews and
                    decides.”
                  </blockquote>
                  <figcaption className="mt-6 text-[0.92rem] leading-relaxed text-ink-mute">
                    The principle every Endloops product is built around — and
                    the reason a reviewer can trust what reaches their desk.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            label="What we believe"
            title="Four things we are not willing to trade away."
            intro="Our users rely on tools they can trust with detailed, time-sensitive work. These are the constraints we design under, in order of priority."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {PRINCIPLES.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className="bg-mist p-8 transition-colors duration-300 hover:bg-white md:p-10"
              >
                <span className="tnum eyebrow text-brand-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display mt-5 text-[1.3rem] leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Direction */}
      <section className="border-t border-line bg-white py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="03"
            label="Where we are heading"
            title="The trusted automation partner for the region."
            intro="Endloops is young, and clear about what it wants to become: the automation partner that accounting, audit and property finance teams across the GCC — and beyond — rely on."
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {ROADMAP.map((item, i) => (
              <Reveal
                as="li"
                key={item.n}
                delay={i * 70}
                className="bg-white p-7 md:p-9"
              >
                <span className="tnum eyebrow text-purple">{item.n}</span>
                <h3 className="mt-4 text-[1.05rem] font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Growing capabilities */}
      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="04"
            label="Growing together"
            title="Three capabilities, built side by side."
            intro="We are growing engineering, design and quality together — because automation that finance teams can genuinely trust needs all three, not just the first."
          />

          <ul className="mt-14 space-y-px overflow-hidden rounded-xl border border-line bg-line">
            {CAPABILITIES_WE_GROW.map((item, i) => (
              <Reveal
                as="li"
                key={item.t}
                delay={i * 70}
                className="grid gap-3 bg-mist p-7 transition-colors duration-300 hover:bg-white md:grid-cols-12 md:gap-8 md:p-9"
              >
                <h3 className="display text-[1.35rem] text-ink md:col-span-4">
                  {item.t}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-ink-soft md:col-span-8">
                  {item.b}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Join the conversation"
        title="Help shape how Endloops looks, feels and works."
        body="Whether you are evaluating automation for your team or want to talk about the work behind it, we would like to hear from you."
        primary={{ label: 'Talk to us', to: '/contact' }}
        secondary={{ label: 'See what we build', to: '/solutions' }}
      />
    </>
  )
}
