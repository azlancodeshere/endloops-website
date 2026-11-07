import Reveal from './Reveal'

/**
 * Section opener: mono eyebrow with a rule, display headline, optional lead.
 * The numbering is part of the editorial/working-paper visual language.
 */
export default function SectionHeading({
  index,
  label,
  title,
  intro,
  align = 'left',
  tone = 'light',
  className = '',
  children,
}) {
  const isDark = tone === 'dark'
  const centered = align === 'center'

  return (
    <Reveal
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {(index || label) && (
        <p
          className={`eyebrow flex items-center gap-3 ${
            centered ? 'justify-center' : ''
          } ${isDark ? 'text-brand' : 'text-brand-deep'}`}
        >
          {index && (
            <span className={isDark ? 'text-white/45' : 'text-ink-mute'}>{index}</span>
          )}
          {index && label && (
            <span
              aria-hidden="true"
              className={`h-px w-8 ${isDark ? 'bg-white/25' : 'bg-line-strong'}`}
            />
          )}
          {label && <span>{label}</span>}
        </p>
      )}

      <h2
        className={`display mt-6 text-headline ${isDark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={`mt-6 text-lead ${isDark ? 'text-white/70' : 'text-ink-soft'} ${
            centered ? '' : 'max-w-2xl'
          }`}
        >
          {intro}
        </p>
      )}

      {children}
    </Reveal>
  )
}
