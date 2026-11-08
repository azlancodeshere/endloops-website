import Reveal from './Reveal'
import { LOOP_STEPS } from '../config/content'

export default function ProcessLoop() {
  return (
    <div className="mt-14">
      <div aria-hidden="true" className="relative mb-10 hidden md:block">
        <div className="absolute left-0 right-0 top-[13px] h-px bg-line" />
        <div className="absolute left-0 top-[13px] h-px w-1/2 bg-linear-to-r from-brand to-teal" />
        <div className="absolute left-1/2 top-[13px] h-px w-1/2 bg-linear-to-r from-teal to-purple" />

        <ol className="relative grid grid-cols-4 gap-6">
          {LOOP_STEPS.map((step) => (
            <li key={step.n} className="flex flex-col items-start">
              <span
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 text-[0.62rem] font-semibold tnum ${
                  step.who === 'software'
                    ? 'border-brand bg-brand text-white'
                    : 'border-purple bg-white text-purple'
                }`}
              >
                {step.n}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {LOOP_STEPS.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 90}
            className="relative flex flex-col"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 text-[0.62rem] font-semibold tnum md:hidden ${
                  step.who === 'software'
                    ? 'border-brand bg-brand text-white'
                    : 'border-purple bg-white text-purple'
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`eyebrow ${
                  step.who === 'software' ? 'text-brand-deep' : 'text-purple'
                }`}
              >
                {step.who === 'software' ? 'Software' : 'Your team'}
              </span>
            </span>

            <h3 className="display mt-4 text-[1.3rem] leading-snug text-ink">
              {step.title}
            </h3>

            <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
