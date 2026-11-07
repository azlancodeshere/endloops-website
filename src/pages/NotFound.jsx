import Button from '../components/Button'
import Reveal from '../components/Reveal'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found', 'That page does not exist.')

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="shell-narrow">
        <Reveal>
          <p className="eyebrow text-brand-deep">404</p>
          <h1 className="display mt-6 text-headline text-ink">
            This page does not exist.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-ink-soft">
            The link may be out of date, or the address may have a typo. The
            main sections are one click away.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/" variant="primary" arrow>
              Back to home
            </Button>
            <Button to="/contact" variant="secondary">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
