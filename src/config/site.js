/**
 * Site-wide constants.
 *
 * NOTE FOR HAND-OVER: the contact details below are placeholders — everything
 * else on the site is derived from the assignment brief. Replace `email` (and
 * `phone` / `address` if you want them shown) before launch. They live here so
 * they can be changed in exactly one place.
 */
export const SITE = {
  name: 'Endloops',
  tagline: 'Automation for financial professionals',
  description:
    'Endloops builds automation for accountants, auditors, finance teams and property management companies.',
  location: 'Dubai, United Arab Emirates',
  origin: 'Alkazim',
  originLine: 'The technology department of Alkazim, a Dubai accounting and audit firm.',

  // TODO: confirm with Endloops before launch.
  email: 'hello@endloops.com',
  phone: '', // leave empty to hide the row
  address: 'Dubai, United Arab Emirates',
  linkedin: '', // leave empty to hide

  demoHref: '/contact',
}

export const NAV = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Tools', to: '/tools' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
