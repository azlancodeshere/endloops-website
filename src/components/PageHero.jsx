import Reveal from './Reveal'

/**
 * Compact hero used on the interior pages. Sits on a tinted background so the
 * pure-white header (which carries the supplied logo) still reads as a clean
 * band above it.
 */
export default function PageHero({ index, label, title, intro, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      {/* Soft brand wash, kept well away from the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-brand/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-24 h-64 w-64 rounded-full bg-purple/10 blur-[100px]"
      />

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
