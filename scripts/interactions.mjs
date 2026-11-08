/**
 * Interaction smoke tests: tabs, FAQ accordion, form validation,
 * mobile menu, ScrollToTop, and hash navigation.
 *
 *   node scripts/interactions.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'

const BASE = process.argv[2] || 'http://localhost:4173'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

let pass = 0
let fail = 0
const check = (name, ok, detail = '') => {
  ok ? pass++ : fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : ` — ${detail}`}`)
}

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

// ── Home: product tabs ──────────────────────────────────────────────
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
const tabs = await page.$$('[role="tab"]')
check('tabs: 2 tabs rendered', tabs.length === 2, `got ${tabs.length}`)
if (tabs.length === 2) {
  await tabs[1].click()
  const selected = await page.$eval('[role="tab"]:nth-of-type(2)', (el) => el.getAttribute('aria-selected'))
  check('tabs: clicking switches aria-selected', selected === 'true')
  const panel = await page.$eval('[role="tabpanel"]', (el) => el.textContent.length > 50)
  check('tabs: panel has content', panel)
}

// ── Home: pipeline has pause control ────────────────────────────────
const pauseBtn = await page.$('button[aria-label*="pause" i], button[aria-label*="Pause"]')
check('pipeline: pause control present', Boolean(pauseBtn))

// ── Contact: FAQ accordion ──────────────────────────────────────────
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' })
const faqBtn = await page.$('#faq-0-btn')
check('faq: first button rendered', Boolean(faqBtn))
if (faqBtn) {
  const before = await page.$eval('#faq-0-panel', (el) => el.getBoundingClientRect().height)
  await faqBtn.click()
  await new Promise((r) => setTimeout(r, 500))
  const after = await page.$eval('#faq-0-panel', (el) => el.getBoundingClientRect().height)
  const expanded = await page.$eval('#faq-0-btn', (el) => el.getAttribute('aria-expanded'))
  check('faq: click expands answer', after > before, `${before} -> ${after}`)
  check('faq: aria-expanded flips to true', expanded === 'true')
}

// ── Contact: form validation ────────────────────────────────────────
const submit = await page.$('form button[type="submit"]')
check('form: submit button present', Boolean(submit))
if (submit) {
  await submit.click()
  await new Promise((r) => setTimeout(r, 300))
  const invalid = await page.$$('[aria-invalid="true"]')
  check('form: empty submit flags fields', invalid.length >= 3, `${invalid.length} fields`)
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-invalid'))
  check('form: focus moves to first invalid', focused === 'true')
}

// ── Tools: walkthrough step switching ───────────────────────────────
await page.goto(`${BASE}/tools`, { waitUntil: 'networkidle0' })
const walkOl = await page.$$('section ol button')
if (walkOl.length >= 4) {
  await walkOl[2].click()
  await new Promise((r) => setTimeout(r, 300))
  const cur = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-current="step"]')
    return btn ? btn.textContent.trim() : ''
  })
  check('walkthrough: clicking step 3 sets aria-current', cur.includes('Match and check'), cur)
  const curCount = await page.$$eval('button[aria-current="step"]', (els) => els.length)
  check('walkthrough: exactly one current step', curCount === 1, `got ${curCount}`)
} else {
  check('walkthrough: step buttons rendered', false, `got ${walkOl.length}`)
}

// ── Mobile: menu opens/closes, Escape works ─────────────────────────
await page.setViewport({ width: 390, height: 844 })
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
const burger = await page.$('button[aria-controls="mobile-menu"]')
check('menu: burger button present', Boolean(burger))
if (burger) {
  await burger.click()
  await new Promise((r) => setTimeout(r, 200))
  let open = await page.$eval('#mobile-menu', (el) => !el.hidden)
  check('menu: opens on click', open)
  const expanded = await page.$eval('button[aria-controls="mobile-menu"]', (el) => el.getAttribute('aria-expanded'))
  check('menu: aria-expanded true', expanded === 'true')
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 200))
  open = await page.$eval('#mobile-menu', (el) => !el.hidden)
  check('menu: Escape closes', !open)
}

// ── ScrollToTop button ──────────────────────────────────────────────
const stVisibleBefore = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Back to top"]')
  if (!btn) return null
  return getComputedStyle(btn).opacity
})
await page.evaluate(() => window.scrollTo(0, 2000))
await new Promise((r) => setTimeout(r, 700))
const stState = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label="Back to top"]')
  if (!btn) return null
  return { opacity: getComputedStyle(btn).opacity, y: window.scrollY }
})
check('scroll-to-top: appears after scroll', stState && Number(stState.opacity) > 0.9, JSON.stringify(stState))
if (stState && Number(stState.opacity) > 0.9) {
  await page.click('button[aria-label="Back to top"]')
  let y = -1
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 250))
    y = await page.evaluate(() => window.scrollY)
    if (y < 10) break
  }
  check('scroll-to-top: click returns to top', y < 10, `y=${y}`)
}
check('scroll-to-top: hidden at top initially', stVisibleBefore === '0' || stVisibleBefore === null)

// ── Hash navigation (/solutions#budget-review) ─────────────────────
await page.setViewport({ width: 1440, height: 900 })
await page.goto(`${BASE}/solutions#budget-review`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 900))
const hashOk = await page.evaluate(() => {
  const el = document.getElementById('budget-review')
  if (!el) return false
  const r = el.getBoundingClientRect()
  return r.top >= -5 && r.top < 400
})
check('hash: /solutions#budget-review scrolls to section', hashOk)

// ── Logo renders (no broken image) ─────────────────────────────────
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' })
const logo = await page.evaluate(() => {
  const img = document.querySelector('header img')
  return img ? { complete: img.complete, w: img.naturalWidth } : null
})
check('logo: loads with natural width', logo && logo.complete && logo.w > 0, JSON.stringify(logo))

// ── Single h1 per page ──────────────────────────────────────────────
for (const route of ['/', '/solutions', '/tools', '/about', '/contact', '/nope']) {
  await page.goto(BASE + route, { waitUntil: 'networkidle0' })
  const h1 = await page.$$eval('h1', (els) => els.length)
  check(`h1: exactly one on ${route}`, h1 === 1, `got ${h1}`)
}

await browser.close()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
