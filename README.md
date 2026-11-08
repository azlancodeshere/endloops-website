# Endloops — marketing website

A five-page marketing site for **Endloops**, the automation company spun out of the
technology department of Alkazim, a Dubai accounting and audit firm.

**Live site: https://endloops-website.vercel.app/**

Built as a take-home assignment for the Full-Stack Engineering Intern (UI/UX & Product
Design) role. React + Vite + Tailwind CSS.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the production build locally
```

Node 20.19+ or 22.12+ required (Vite 8 requirement; developed on Node 22).

---

## Pages

| Route        | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `/`          | Hero, the problem, the two product types, capabilities, the human loop  |
| `/solutions` | The five **end-to-end solutions** in detail                             |
| `/tools`     | An interactive walkthrough, then the six **standalone tools**           |
| `/about`     | Origin, principles, roadmap, the three capabilities being grown         |
| `/contact`   | Validated demo-request form, next steps, direct details, FAQ            |
| anything else| A real 404 page — no dead ends                                          |

---

## The one idea the site is built around

The brief's central messaging requirement was to make two product types unmistakable.
That became the spine of the site rather than a single section:

- **End-to-end solutions** — hand over the whole workflow (budget review, escrow audit,
  financial audit, interim audit, property budgeting).
- **Standalone tools** — keep your workflow, remove one bottleneck (extraction, vouching,
  expenses, report review, tender verification, reconciliation).

The distinction is restated in the hero, both page introductions, the tabbed home section,
the footer columns and the contact FAQ, so a visitor cannot leave without having met it.

---

## Design system

All tokens live in `src/index.css` under `@theme`, so a value is changed in exactly one place.

**Brand colours are sampled from the supplied logo**, not invented:

| Token                  | Value     | Source                                     |
| ---------------------- | --------- | ------------------------------------------ |
| `--color-brand`        | `#00A860` | Green end of the logo loop                 |
| `--color-teal`         | `#0E9B84` | Teal end of the logo loop                  |
| `--color-ink`          | `#182030` | The logo wordmark                          |
| `--color-blue`         | `#2563EB` | Brand extension (brief lists blue)         |
| `--color-purple`       | `#6D28D9` | Brand extension (brief lists purple)       |
| `--color-amber`        | `#F59E0B` | Functional status colour for exceptions    |
| `--color-paper`        | `#FFFFFF` | Primary surface — the logo has a white bg  |

**Typography** — Fraunces (display, variable `SOFT`/`WONK`/`opsz`), Inter (UI and body),
IBM Plex Mono (eyebrows, figures, labels). Loaded from Google Fonts with `preconnect` and
`display=swap`.

**Visual language** — an editorial "working paper" system: hairline rules, numbered mono
eyebrows, registration marks on card corners (`crop-marks`), tabular figures, and a
green→teal→blue→purple `brand-rule`. Type uses a fluid `clamp()` scale, so there are no
hard jumps between breakpoints.

**Motion** — deliberately restrained. Sections fade and rise once via `IntersectionObserver`
(`src/components/Reveal.jsx`). The class that hides content is only applied when an observer
exists *and* motion is permitted, so content can never be stranded at `opacity: 0`.

---

## Accessibility

- axe-core: **0 violations across all 6 routes at both 1440px and 390px** — re-verified by
  `npm run test:a11y` (starts `npm run preview` first), which also fails on console errors
- Interaction smoke tests (tabs, FAQ, form, mobile menu, scroll-to-top, hash links, logo,
  one `h1` per page): `npm run test:interactions`
- Visible skip link, single `<h1>` per page, correct landmark structure
- Tabs implement the ARIA tabs pattern with roving `tabindex` and arrow-key activation
- Mobile menu: `aria-expanded`/`aria-controls`, Escape to close, body scroll locked
- Form: `noValidate` with custom errors wired through `aria-describedby` and `aria-invalid`;
  focus moves to the first invalid field, and to the confirmation panel on success
- One consistent focus ring site-wide (`:focus-visible`), green for contrast on both light
  and dark surfaces
- `prefers-reduced-motion` disables reveals, the auto-playing pipeline and smooth scrolling

---

## Interaction

- **Hero pipeline** — an auto-advancing illustration of one run (read → match → check →
  draft → human sign-off), with a pause control and clickable steps
- **Product tabs** — switch between the two product types
- **Walkthrough** — a four-step, keyboard-reachable demo of purchase-order extraction
- **Contact form** — validation, error and success states

---

## ⚠️ Before launch

1. **The form's delivery address is a placeholder.** `SITE.email` in `src/config/site.js`
   is set to `hello@endloops.com` — it was not supplied in the brief and must be confirmed.
   It is used only as the contact form's internal mailto target and is **not displayed
   anywhere on the site**. `phone`, `linkedin` and `address` are in the same file — leave
   `phone`/`linkedin` empty to hide those rows.
2. **The logo** is the artwork extracted from the supplied brief and is used as-is in
   `public/logo.jpg` — never recoloured, redrawn or stretched. It sits only on pure-white
   surfaces (header and footer) because the bitmap has a white background. An SVG version
   would be sharper on high-density displays.
3. **No performance claims are invented.** The brief did not supply any, so the copy uses
   product facts instead. The walkthrough's figures are explicitly labelled *illustrative*.
4. **Product readiness** is described honestly ("some are in use, others are in development")
   rather than implying everything is shipped.

---

## Deployment

Client-side routing needs an SPA fallback — both configs are included:

- **Vercel** — `vercel.json` rewrites everything to `/index.html`
- **Netlify** — `netlify.toml` sets the build command, publish dir and a `/*` redirect

```bash
npm run build   # then deploy dist/
```

---

## Project structure

```
public/
  logo.jpg          ← supplied logo, used as-is
  favicon.svg
src/
  index.css         ← Tailwind v4 @theme tokens + component classes
  App.jsx           ← routes, skip link, scroll/hash manager
  config/
    site.js         ← editable contact details and navigation
    content.js      ← all product and marketing copy (single source)
  components/       ← Header, Footer, Logo, Button, Reveal, SectionHeading,
                      PageHero, CtaBand, LoopPipeline, OfferingTabs,
                      CapabilityList, ProcessLoop, Walkthrough, ContactForm,
                      Counter, ScrollToTop
  pages/            ← Home, Solutions, Tools, About, Contact, NotFound
  hooks/            ← usePageMeta (per-route title + description)
```

Copy lives in `src/config/content.js` so wording can be reviewed and revised without
touching any layout.
