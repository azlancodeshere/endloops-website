/**
 * Accessibility + console audit.
 * Runs axe-core across all routes at desktop (1440px) and mobile (390px),
 * and fails if any axe violations or console errors are found.
 *
 *   node scripts/a11y-audit.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const BASE = process.argv[2] || 'http://localhost:4173'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const AXE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', 'axe-core', 'axe.min.js'),
  'utf8',
)

const ROUTES = ['/', '/solutions', '/tools', '/about', '/contact', '/no-such-page']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

let failures = 0
const summary = []

for (const vp of VIEWPORTS) {
  const page = await browser.newPage()
  await page.setViewport({ width: vp.width, height: vp.height })

  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 30000 })
    await page.evaluate(AXE)
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        resultTypes: ['violations'],
      })
    })

    const errors = consoleErrors.splice(0)
    const v = results.violations
    const ok = v.length === 0 && errors.length === 0
    if (!ok) failures++
    summary.push(
      `${ok ? 'PASS' : 'FAIL'}  ${vp.name.padEnd(7)} ${route.padEnd(16)} ` +
        `axe: ${v.length} violation(s), console: ${errors.length} error(s)`,
    )
    for (const viol of v) {
      summary.push(`        - [${viol.impact}] ${viol.id}: ${viol.help}`)
      for (const node of viol.nodes.slice(0, 3)) {
        summary.push(`          ${node.target.join(' ')}`)
        if (node.failureSummary) {
          summary.push(`            ${node.failureSummary.replace(/\n/g, ' | ')}`)
        }
      }
    }
    for (const e of errors.slice(0, 3)) summary.push(`        - console: ${e.slice(0, 200)}`)
  }
  await page.close()
}

await browser.close()

console.log(summary.join('\n'))
console.log(`\n${failures === 0 ? 'ALL PASS' : `${failures} ROUTE/VIEWPORT COMBINATIONS FAILED`}`)
process.exit(failures === 0 ? 0 : 1)
