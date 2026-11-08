import Reveal from './Reveal'

export default function PageHero({ index, label, title, intro, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/[0.09] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-24 h-72 w-72 rounded-full bg-purple/[0.08] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-blue/[0.06] blur-[90px]"
      />

      <span aria-hidden="true" className="brand-rule absolute left-0 top-0 block w-full" />

      <div className="shell relative py-16 md:py-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-brand-deep">
            {index && <span className="text-ink-mute">{index}</span>}
            {index && label && (
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            )}
            <span>{label}</span>
          </p>

          <h1 className="display mt-6 max-w-4xl text-headline text-ink">{title}</h1>

          {intro && (
            <p className="mt-7 max-w-2xl text-lead text-ink-soft">{intro}</p>
          )}

          {children && <div className="mt-9">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}
