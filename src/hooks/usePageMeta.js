import { useEffect } from 'react'

const SUFFIX = 'Endloops'

/**
 * Sets document title + meta description per route. Kept as a hook rather than
 * a component so any page can call it without nesting extra markup.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SUFFIX}` : `${SUFFIX} — Automation for financial professionals`
    document.title = fullTitle

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
