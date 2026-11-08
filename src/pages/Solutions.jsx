import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import usePageMeta from '../hooks/usePageMeta'
import { SOLUTIONS } from '../config/content'

const SHARED = [
  {
    t: 'The whole process, not a slice',
    b: 'From the first document through to the finished report or schedule, without hand-offs in between.',
  },
  {
    t: 'Every figure traceable',
    b: 'Any number in the output can be traced back to the document and the location it came from.',
  },
  {
    t: 'Exceptions surfaced with reasons',
    b: 'Nothing is buried in a log. Each flag states what was found, where, and which rule fired.',
  },
  {
    t: 'Sign-off stays with your team',
    b: 'The software prepares; a professional reviews and decides. On every engagement, every time.',
  },
]

export default function Solutions() {
  usePageMeta(
    'End-to-end solutions',
    'Complete software that runs an entire process start to finish: budget review, escrow audit, financial audit, interim audit and property budget preparation.',
  )

  return (
    <>
      <PageHero
        index="01"
        label="End-to-end solutions"
        title="Hand over the whole workflow."
        intro="An end-to-end solution runs a complete process from the first document to the final report. You receive the output and a short list of exceptions — not a pile of tasks to work through yourself."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {['Budget review', 'Escrow audit', 'Financial audit', 'Interim audit', 'Property budgeting'].map(
            (n) => (
              <span key={n} className="text-[0.9rem] text-ink-soft">
                {n}
              </span>
            ),
          )}
        </div>
      </PageHero>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <ul className="border-t border-line">
            {SOLUTIONS.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                id={item.id}
                className="scroll-mt-28 border-b border-line py-12 transition-colors duration-300 hover:border-brand/20 md:py-16"
              >
                <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <p className="eyebrow text-brand-deep">
                      {String(i + 1).padStart(2, '0')} · End-to-end
                    </p>
                    <h2 className="display mt-5 text-title text-ink">{item.name}</h2>
                    <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-mute">
                      For: {item.audience}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <p className="text-lead text-ink">{item.summary}</p>
                    <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">{item.detail}</p>

                    <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 text-[0.93rem] leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            label="In common"
            title="What every end-to-end solution gives you."
            intro="They cover different processes, but they are built to the same standard — because that is what makes an output usable in front of a client or a committee."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SHARED.map((item, i) => (
              <Reveal
                as="li"
                key={item.t}
                delay={i * 70}
                className="bg-mist p-7 transition-colors duration-300 hover:bg-white"
              >
                <span className="tnum eyebrow text-brand-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.02rem] font-medium leading-snug text-ink">{item.t}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-soft">{item.b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Which process should we take off your desk?"
        body="Tell us how the work reaches you today — documents, systems, deadlines — and we will show you how an end-to-end solution would run it."
        primary={{ label: 'Talk to us', to: '/contact' }}
        secondary={{ label: 'See the standalone tools', to: '/tools' }}
      />
    </>
  )
}
