// Build-time data generator.
//
// Writes static JSON into public/data/ (copied to dist/data/ by Vite) so the
// browser can fetch listing data same-origin — no CORS, gzipped by the CDN,
// and off the critical render path. This is what lets the home page render its
// top content immediately (Properties fetches home.json after paint) and lets
// the browse page lazily upgrade from the baked first 200 to the full set.
//
// Runs from the `prebuild` npm hook. If the feed is unreachable it writes empty
// fallbacks and warns instead of failing the build — the client just shows its
// skeleton / empty state.
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homeLoader, buildListings, offPlanLoader } from '../src/data/feedLoader.js'
import { SITE_URL } from '../src/seo/siteConfig.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const OUT_DIR = resolve(ROOT, 'data')

// Static (non-property) routes worth indexing, with crawl priority.
const STATIC_ROUTES = [
  { path: '/', priority: '1.0' },
  { path: '/listings', priority: '0.9' },
  { path: '/off-plan', priority: '0.9' },
  { path: '/services', priority: '0.7' },
  { path: '/about', priority: '0.6' },
  { path: '/blog', priority: '0.6' },
  { path: '/conveyancing', priority: '0.5' },
  { path: '/pay-online', priority: '0.3' },
]

const xmlEscape = (s) => String(s).replace(/[<>&'"]/g, (c) => (
  { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]
))

async function writeSitemapAndRobots(listings) {
  const urls = [
    ...STATIC_ROUTES.map((r) => ({ loc: SITE_URL + (r.path === '/' ? '' : r.path), priority: r.priority })),
    ...listings.map((l) => ({
      loc: `${SITE_URL}/property/${l.ref}`,
      priority: '0.8',
      lastmod: /^\d{4}-\d{2}-\d{2}/.test(l.lastUpdate || '') ? l.lastUpdate.slice(0, 10) : undefined,
    })),
  ]
  const body = urls.map((u) => [
    '  <url>',
    `    <loc>${xmlEscape(u.loc)}</loc>`,
    u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
    `    <priority>${u.priority}</priority>`,
    '  </url>',
  ].filter(Boolean).join('\n')).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  await writeFile(resolve(ROOT, 'sitemap.xml'), sitemap)
  console.log(`[gen-data] sitemap.xml — ${urls.length} URLs`)

  const robots = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /portal/',
    'Disallow: /feed',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
  await writeFile(resolve(ROOT, 'robots.txt'), robots)
  console.log('[gen-data] robots.txt')
}

async function emit(name, data) {
  const file = resolve(OUT_DIR, name)
  await writeFile(file, JSON.stringify(data))
  const kb = (JSON.stringify(data).length / 1024).toFixed(1)
  console.log(`[gen-data] ${name} — ${kb} KiB`)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  try {
    const home = await homeLoader()
    await emit('home.json', home)
  } catch (e) {
    console.warn(`[gen-data] home.json failed: ${e?.message || e}`)
    await emit('home.json', { featured: [] })
  }

  try {
    const listings = await buildListings()
    await emit('listings-all.json', listings)
    await writeSitemapAndRobots(listings.listings)
  } catch (e) {
    console.warn(`[gen-data] listings-all.json failed: ${e?.message || e}`)
    await emit('listings-all.json', { listings: [], total: 0, facets: {} })
    await writeSitemapAndRobots([]) // still emit a valid sitemap/robots with static routes
  }

  try {
    const offPlan = await offPlanLoader()
    await emit('off-plan.json', offPlan)
  } catch (e) {
    console.warn(`[gen-data] off-plan.json failed: ${e?.message || e}`)
    await emit('off-plan.json', { listings: [], places: [], total: 0 })
  }
}

main()
