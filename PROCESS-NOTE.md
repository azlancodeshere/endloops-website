# Process note

## Framing

The hardest requirement was not visual: making two product types unmistakable —
end-to-end solutions versus standalone tools. So I made that the spine of the site:
a tabbed comparison on the home page, matching page introductions, footer columns split
by type, and an FAQ that answers it again.

## Design language

I wanted something native to audit rather than generic SaaS, so I built from the
working-paper grid: hairline rules, numbered mono eyebrows, registration marks, tabular
figures. The palette is sampled from the supplied logo — green `#00A860` through teal
`#0E9B84`, navy `#182030` for text. Fraunces carries headlines; Inter and IBM Plex Mono
handle reading. No performance claims were supplied, so I invented none.

## Build

React, Vite and Tailwind v4 with one dependency beyond that (React Router) — no component
library. All copy sits in a single config file. Motion is quiet: reveals only, driven by
IntersectionObserver, applied only when motion is permitted, so nothing can be stranded
invisible.

## Verification

I audited rather than trusted my eye: axe-core returns zero violations across six routes
at 1440px and 390px, and 27 scripted checks cover the tabs, walkthrough, FAQ, form, menu
and scroll-to-top — both committed as npm scripts. Two bugs surfaced — a cascade conflict
in the mobile header, and a grey failing AA contrast — both fixed.

## What I would improve with more time

A committed automated test suite, performance optimization (an SVG logo, a real form
endpoint instead of the mailto fallback), and cross-browser testing beyond Chrome.

## Tools, AI and hours

I used Antigravity (Google DeepMind's AI coding agent) for planning, generating and
reviewing code — plus my own passes for copy, accessibility and design. Time spent: roughly
15–25 hours across design, build and audit.
