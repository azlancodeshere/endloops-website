import Reveal from './Reveal'
import Button from './Button'
import { SITE } from '../config/site'

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
        className="pointer-events-none absolute -left-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/30 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-24 h-[32rem] w-[32rem] rounded-full bg-blue/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-purple/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
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
