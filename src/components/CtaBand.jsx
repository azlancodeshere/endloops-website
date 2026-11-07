import Reveal from './Reveal'
import Button from './Button'
import { SITE } from '../config/site'

/** Closing call to action — the only full-width dark band on a page. */
export default function CtaBand({
  eyebrow = 'Next step',
  title = 'Tell us what eats the most hours.',
  body = 'Send us one repetitive process and we will walk you through how Endloops would handle it — what it reads, what it checks and where your team signs off.',
  primary = { label: 'Request a demo', to: SITE.demoHref },
  secondary = { label: 'See the solutions', to: '/solutions' },
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy grain">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-24 h-[30rem] w-[30rem] rounded-full bg-blue/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-purple/20 blur-[110px]"
      />

      <div className="shell relative py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-brand">{eyebrow}</p>
          <h2 className="display mt-6 text-headline text-white">{title}</h2>
          <p className="mt-6 max-w-2xl text-lead text-white/70">{body}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="onDark" to={primary.to} arrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button variant="outlineOnDark" to={secondary.to}>
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
