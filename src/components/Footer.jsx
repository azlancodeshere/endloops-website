import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV, SITE } from '../config/site'
import { SOLUTIONS, TOOLS } from '../config/content'

function Column({ heading, children }) {
  return (
    <div>
      <h2 className="eyebrow text-ink-mute">{heading}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="draw-underline text-[0.95rem] text-ink-soft transition-colors hover:text-ink"
      >
        {children}
      </Link>
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white">
      <hr className="brand-rule" aria-hidden="true" />

      <div className="shell pb-10 pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo className="h-8 w-auto" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-ink-soft">
              {SITE.description}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-mute">
              {SITE.originLine}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <Column heading="End-to-end">
              <FooterLink to="/solutions">All solutions</FooterLink>
              {SOLUTIONS.slice(0, 3).map((s) => (
                <FooterLink key={s.id} to={`/solutions#${s.id}`}>
                  {s.name}
                </FooterLink>
              ))}
            </Column>

            <Column heading="Standalone">
              <FooterLink to="/tools">All tools</FooterLink>
              {TOOLS.slice(0, 3).map((t) => (
                <FooterLink key={t.id} to={`/tools#${t.id}`}>
                  {t.name}
                </FooterLink>
              ))}
            </Column>

            <Column heading="Company">
              {NAV.map((item) => (
                <FooterLink key={item.to} to={item.to}>
                  {item.label}
                </FooterLink>
              ))}
            </Column>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  )
}
