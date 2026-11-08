import { useRef, useState } from 'react'
import { SITE } from '../config/site'

const INTERESTS = [
  'An end-to-end solution',
  'A standalone tool',
  'Both — show me the full range',
  'Not sure yet',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  else if (values.name.trim().length < 2) errors.name = 'Please enter at least 2 characters.'

  if (!values.email.trim()) errors.email = 'Please enter your work email.'
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'That does not look like a valid email address.'

  if (!values.interest) errors.interest = 'Please choose what you are interested in.'

  if (!values.message.trim()) errors.message = 'Please add a short message.'
  else if (values.message.trim().length < 20)
    errors.message = 'A little more detail helps — at least 20 characters.'

  return errors
}

const FIELD_CLASS =
  'w-full rounded-lg border bg-white px-4 py-3 text-[0.97rem] text-ink ' +
  'placeholder:text-ink-mute transition-colors duration-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand/35'

function fieldClass(hasError) {
  return `${FIELD_CLASS} ${
    hasError ? 'border-amber-deep/60' : 'border-line-strong hover:border-ink/30 focus:border-brand'
  }`
}

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [draftUrl, setDraftUrl] = useState('')

  const formRef = useRef(null)
  const successRef = useRef(null)

  const set = (key) => (event) => {
    const next = { ...values, [key]: event.target.value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, interest: true, message: true })

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    setStatus('sending')

    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || '—'}`,
      `Interested in: ${values.interest}`,
      '',
      values.message,
    ].join('\n')

    const url = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Website enquiry — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`

    window.setTimeout(() => {
      setDraftUrl(url)
      setStatus('sent')
      window.location.href = url
      requestAnimationFrame(() => successRef.current?.focus())
    }, 500)
  }

  if (status === 'sent') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-brand/30 bg-brand/[0.06] p-8 outline-none md:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
            <path d="M5 10.5l3.4 3.4L15 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h2 className="display mt-6 text-title text-ink">Your request is ready to send.</h2>
        <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
          We have opened your email app with everything filled in — press send
          and we will come back to you within one business day.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={draftUrl}
            className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-6 py-3 text-[0.95rem] font-medium text-white transition-colors hover:bg-brand-ink"
          >
            Open the draft again
          </a>
        </div>

        <p className="mt-6 text-[0.85rem] text-ink-mute">
          Nothing opened? Check your email app for the drafted message and press
          send — we will come back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[0.9rem] font-medium text-ink">
            Full name <span aria-hidden="true" className="text-brand-deep">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            placeholder="Amina Rahman"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-[0.83rem] text-amber-deep">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[0.9rem] font-medium text-ink">
            Work email <span aria-hidden="true" className="text-brand-deep">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            placeholder="amina@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-[0.83rem] text-amber-deep">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-[0.9rem] font-medium text-ink">
            Company <span className="text-ink-mute">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            onBlur={blur('company')}
            placeholder="Alkazim & Co."
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label htmlFor="interest" className="mb-2 block text-[0.9rem] font-medium text-ink">
            I am interested in <span aria-hidden="true" className="text-brand-deep">*</span>
          </label>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              value={values.interest}
              onChange={set('interest')}
              onBlur={blur('interest')}
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={errors.interest ? 'interest-error' : undefined}
              className={`${fieldClass(Boolean(errors.interest))} appearance-none pr-10`}
            >
              <option value="">Choose an option…</option>
              {INTERESTS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {errors.interest && (
            <p id="interest-error" className="mt-2 text-[0.83rem] text-amber-deep">
              {errors.interest}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[0.9rem] font-medium text-ink">
          How can we help? <span aria-hidden="true" className="text-brand-deep">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          onBlur={blur('message')}
          placeholder="Tell us about a process that costs your team the most hours — invoices to match, schedules to prepare, documents to vouch."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          className={`${fieldClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-[0.83rem] text-amber-deep">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-2 text-[0.83rem] text-ink-mute">
            The more specific, the more useful our first reply will be.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-7 py-3.5 text-[0.97rem] font-medium text-white shadow-[0_1px_2px_rgba(24,32,48,0.16)] transition-all duration-300 hover:-translate-y-px hover:bg-brand-ink hover:shadow-[0_10px_24px_-10px_rgba(0,97,58,0.65)] disabled:translate-y-0 disabled:opacity-60"
        >
          {status === 'sending' ? 'Preparing…' : 'Request a demo'}
          {status !== 'sending' && (
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M3 8h9m0 0-3.5-3.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <p className="text-[0.85rem] text-ink-mute">
          We reply within one business day. No mailing lists.
        </p>
      </div>
    </form>
  )
}
