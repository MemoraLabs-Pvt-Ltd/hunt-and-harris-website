import { Head } from 'vite-react-ssg'
import { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESC, DEFAULT_OG_IMAGE, absUrl } from './siteConfig'

// Per-page SEO: unique title + description + canonical + Open Graph / Twitter,
// and optional JSON-LD structured data. Rendered via vite-react-ssg's <Head>
// (react-helmet-async), so it's baked into each prerendered page.
export default function Seo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const url = absUrl(path)
  const blocks = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : []

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(block)}</script>
      ))}
    </Head>
  )
}
