# Process note

## Framing

The brief's hardest requirement was not visual. It was making two product types
unmistakable — end-to-end solutions versus standalone tools. So I made that the spine of
the site rather than one section among many: a tabbed comparison on the home page, matching
page introductions, footer columns split by type, and an FAQ that answers it again.

## Design language

I wanted something native to audit rather than generic SaaS, so I built from the
working-paper grid: hairline rules, numbered mono eyebrows, registration marks, tabular
figures. The palette is sampled from the supplied logo — green `#00A860` through teal
`#0E8573`, navy `#182030` for text — so the brand anchors the system instead of sitting on
top of it. Fraunces carries the headlines for editorial weight; Inter and IBM Plex Mono
handle reading and figures. The brief supplied no performance claims, so I invented none.

## Build

React, Vite and Tailwind v4 with one dependency beyond that (React Router) — no component
library, so nothing reads as off-the-shelf. All copy sits in a single config file, so
wording can be reviewed without touching layout. Motion is deliberately quiet: reveals only,
driven by IntersectionObserver, and the class that hides content is applied only when motion
is permitted, so nothing can be stranded invisible.

## Verification

Rather than trusting my eye, I audited the result: axe-core returned zero violations across
six routes at both 1440px and 390px; 45 scripted assertions covered the tabs, walkthrough,
mobile menu and form validation; the console was clean throughout. Two genuine bugs
surfaced — a cascade conflict that kept the mobile header's CTA visible, and a muted grey
failing AA contrast — and both were fixed.
