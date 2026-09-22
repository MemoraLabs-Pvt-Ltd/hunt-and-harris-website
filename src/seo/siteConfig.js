// Central SEO config. When the final production domain is confirmed, change
// SITE_URL here (and nowhere else) — canonical URLs, Open Graph, the sitemap
// and robots.txt all derive from it.
export const SITE_URL = 'https://www.huntandharris.com'
export const SITE_NAME = 'Hunt & Harris Real Estate'
export const DEFAULT_TITLE = 'Hunt & Harris Real Estate — Property in Ras Al Khaimah'
export const DEFAULT_DESC =
  'Hunt & Harris Real Estate — buy, rent and invest in property across Ras Al Khaimah and the Northern Emirates. Off-plan launches, residential sales and long-term rentals.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-desert.jpg`

// Absolute URL for a route path (canonical / og:url).
export const absUrl = (path = '/') => SITE_URL + (path === '/' ? '' : path)
