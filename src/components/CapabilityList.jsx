import Reveal from './Reveal'
import { CAPABILITIES } from '../config/content'

export default function CapabilityList() {
  return (
    <ul className="mt-14 border-t border-line">
      {CAPABILITIES.map((item, i) => (
        <Reveal
          as="li"
          key={item.n}
          delay={i * 60}
          className="group border-b border-line"
        >
          <div className="grid grid-cols-1 gap-2 py-7 transition-colors duration-300 group-hover:bg-mist/70 md:grid-cols-12 md:gap-8 md:px-4">
            <span className="tnum eyebrow col-span-1 pt-1.5 text-brand-deep md:pt-2">
              {item.n}
            </span>

            <h3 className="display col-span-1 text-[1.3rem] leading-snug text-ink md:col-span-4 md:text-[1.45rem]">
              {item.title}
            </h3>

            <p className="col-span-1 text-[0.98rem] leading-relaxed text-ink-soft md:col-span-6">
              {item.body}
            </p>

            <span className="eyebrow col-span-1 hidden justify-end pt-2 text-ink-mute opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:col-span-1 md:flex">
              {item.detail}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
