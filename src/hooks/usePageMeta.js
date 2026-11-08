import { useEffect } from 'react'

const SUFFIX = 'Endloops'

export default function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SUFFIX}`
      : `${SUFFIX} — Automation for financial professionals`
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
