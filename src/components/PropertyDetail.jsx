import { useState, useEffect, useRef } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Seo from '../seo/Seo'
import { absUrl } from '../seo/siteConfig'
import ListingsMap from './ListingsMap'
import PropertyTabs from './PropertyTabs'
import './PropertyDetail.css'

const money = (p) => {
  const n = Number(p.price)
  const amt = Number.isFinite(n) && n > 0 ? n.toLocaleString('en-US') : (p.price || '—')
  return `${p.currency || 'AED'} ${amt}`
}
const bedsLabel = (b) => (!b ? '—' : /studio/i.test(b) ? 'Studio' : `${b} Bed`)
const stripHtml = (s) => (s || '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
  .replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"')
  .replace(/\s+/g, ' ').trim()

// Build the per-property SEO metadata + JSON-LD from the feed data.
function propertySeo(p) {
  const forLabel = p.propertyFor === 'Rent' ? 'for Rent' : p.propertyFor === 'Off Plan' ? '(Off-Plan)' : 'for Sale'
  const where = [p.subLocation || p.location, p.city].filter(Boolean).join(', ')
  const title = [bedsLabel(p.beds) !== '—' && bedsLabel(p.beds), p.type, forLabel, where && `in ${where}`]
    .filter(Boolean).join(' ')
  const desc = (stripHtml(p.desc) ||
    `${bedsLabel(p.beds)} ${p.type} ${forLabel} in ${where}. ${money(p)}. Enquire with Hunt & Harris.`).slice(0, 300).trim()
  const path = `/property/${p.ref}`
  const priceNum = Number(p.price)

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title || p.title || p.type,
    description: desc,
    image: (p.images || []).slice(0, 6),
    category: [p.type, p.propertyFor].filter(Boolean).join(' · '),
    offers: {
      '@type': 'Offer',
      priceCurrency: p.currency || 'AED',
      ...(Number.isFinite(priceNum) && priceNum > 0 ? { price: priceNum } : {}),
      availability: /available/i.test(p.status) ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      url: absUrl(path),
    },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Listings', item: absUrl('/listings') },
      { '@type': 'ListItem', position: 3, name: title || p.type, item: absUrl(path) },
    ],
  }
  return { title, desc, path, image: p.images?.[0], jsonLd: [product, breadcrumb] }
}

// Only mount the Leaflet map (dynamic import + tile requests) once it's near
// the viewport, so it doesn't compete with the initial page render.
function LazyMap({ property }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || show) return
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect() }
    }, { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [show])
  return <div className="pd-map" ref={ref}>{show && <ListingsMap listings={[property]} />}</div>
}

// Horizontal, scroll-snapping carousel of related listings with arrow controls.
function RelatedCarousel({ related }) {
  const trackRef = useRef(null)
  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.pd-rel')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.85
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }
  return (
    <div className="pd-related">
      <div className="pd-related-head">
        <h2 className="pd-h2">Related Properties</h2>
        <div className="pd-related-nav">
          <button className="pd-related-arrow" onClick={() => scroll(-1)} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="pd-related-arrow" onClick={() => scroll(1)} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div className="pd-related-track" ref={trackRef}>
        {related.map((r) => (
          <Link className="pd-rel" to={`/property/${r.ref}`} key={r.ref}>
            <div className="pd-rel-img">
              {r.image ? <img src={r.image} alt={r.title} loading="lazy" /> : <div className="pd-rel-noimg">No image</div>}
              <span className={`pd-rel-badge ${r.propertyFor === 'Rent' ? 'is-rent' : 'is-sale'}`}>For {r.propertyFor}</span>
            </div>
            <div className="pd-rel-body">
              <div className="pd-rel-loc">{[r.subLocation, r.location].filter(Boolean).join(', ') || r.city}</div>
              <h3 className="pd-rel-title">{r.title || r.tower || r.type}</h3>
              <div className="pd-rel-price">{money(r)}</div>
              <div className="pd-rel-specs">
                <span>{bedsLabel(r.beds)}</span><span>{r.baths || '—'} Bath</span>{r.built && <span>{r.built} sqft</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { property: p, related = [] } = useLoaderData() || {}
  const [showAll, setShowAll] = useState(false)

  // Each property (including client-side transitions between properties) starts at the top.
  useEffect(() => { window.scrollTo(0, 0) }, [p?.ref])

  if (!p) {
    return (
      <div className="pd-missing">
        <Seo title="Property not found" noindex />
        <h1>Property not found</h1>
        <Link to="/listings" className="pd-back-link">Back to listings</Link>
      </div>
    )
  }

  const seo = propertySeo(p)

  const isRent = p.propertyFor === 'Rent'
  const rentLabel = isRent ? `${p.rentFrequency || 'Annual'} Rent` : (p.propertyFor === 'Off Plan' ? 'Price From' : 'Price')
  const main = p.images[0]
  const grid = p.images.slice(1, 5)
  const fpImage = p.floorplanImages[0] || p.images[1] || main

  return (
    <section className="pd">
      <Seo path={seo.path} title={seo.title} description={seo.desc} image={seo.image} type="product" jsonLd={seo.jsonLd} />
      {/* Header */}
      <div className="pd-head">
        <Link to="/listings" className="pd-back">&larr; All properties</Link>
        <h1 className="pd-title">{p.tower || p.title || p.type}</h1>
        <div className="pd-addr">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          {p.locationDetail || [p.subLocation, p.location, p.city].filter(Boolean).join(', ')}
        </div>
        <div className="pd-accent">{[p.type, p.subLocation || p.location].filter(Boolean).join(' · ')}</div>
      </div>

      {/* Gallery */}
      <div className="pd-gallery">
        <button className="pd-gallery-main" onClick={() => setShowAll(true)}>
          {main ? <img src={main} alt={p.title} /> : <span className="pd-noimg">No image</span>}
        </button>
        <div className="pd-gallery-grid">
          {grid.map((url, i) => (
            <button className="pd-gallery-cell" key={i} onClick={() => setShowAll(true)}>
              <img src={url} alt="" loading="lazy" />
              {i === grid.length - 1 && p.images.length > 1 && (
                <span className="pd-showall">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                  Show all {p.images.length} photos
                </span>
              )}
            </button>
          ))}
          {grid.length === 0 && <div className="pd-gallery-cell pd-gallery-empty">No additional photos</div>}
        </div>
      </div>

      {/* Body */}
      <div className="pd-body">
        <div className="pd-main">
          {/* Stats */}
          <div className="pd-stats">
            <div className="pd-stat"><span className="pd-stat-label">{rentLabel}</span><span className="pd-stat-value">{money(p)}</span></div>
            <div className="pd-stat"><span className="pd-stat-label">Bedrooms</span><span className="pd-stat-value">{bedsLabel(p.beds)}</span></div>
            <div className="pd-stat"><span className="pd-stat-label">Bathrooms</span><span className="pd-stat-value">{p.baths || '—'} ba</span></div>
            <div className="pd-stat"><span className="pd-stat-label">Square Feet</span><span className="pd-stat-value">{p.built ? `${p.built} ${p.sizeUnit.trim()}` : '—'}</span></div>
          </div>

          {/* Pricing & Floor Plans */}
          <h2 className="pd-h2">Pricing &amp; Floor Plans</h2>
          <div className="pd-fp">
            <div className="pd-fp-info">
              <div className="pd-fp-type">{bedsLabel(p.beds)} · {p.baths || '—'} Bath {p.type}</div>
              <div className="pd-fp-price">{money(p)}</div>
              <div className="pd-fp-sub">
                {[bedsLabel(p.beds), `${p.baths || '—'} baths`, p.built && `${p.built} ${p.sizeUnit.trim()}`].filter(Boolean).join(', ')}
                {isRent && p.cheques && <> · {p.cheques} cheques</>}
              </div>
              <div className="pd-fp-actions">
                {p.floorplanImages.length > 0
                  ? <a className="pd-btn pd-btn--soft" href={p.floorplanImages[0]} target="_blank" rel="noopener noreferrer">Floor Plan</a>
                  : <button className="pd-btn pd-btn--soft" disabled>Floor Plan</button>}
                <a className="pd-btn pd-btn--soft" href="#contact">Request Tour</a>
              </div>
            </div>
            <div className="pd-fp-img">{fpImage && <img src={fpImage} alt="Floor plan" loading="lazy" />}</div>
          </div>

          <div className="pd-table-wrap">
            <table className="pd-table">
              <thead><tr><th>Price</th><th>{p.sizeUnit.trim()}</th><th>Availability</th></tr></thead>
              <tbody>
                <tr>
                  <td>{money(p)}</td>
                  <td>{p.built || '—'}</td>
                  <td><span className={`pd-avail${/available/i.test(p.status) ? ' is-avail' : ''}`}>{p.status || '—'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* About */}
          {p.desc && (
            <>
              <h2 className="pd-h2">About</h2>
              <div className="pd-about" dangerouslySetInnerHTML={{ __html: p.desc }} />
            </>
          )}

          {/* Details / Features / Mortgage calculator */}
          <h2 className="pd-h2">Details, Amenities &amp; Payment</h2>
          <PropertyTabs property={p} />

          {/* Location */}
          {p.lat != null && (
            <>
              <h2 className="pd-h2">Location</h2>
              <LazyMap property={p} />
            </>
          )}
        </div>

        {/* Contact sidebar */}
        <aside className="pd-side" id="contact">
          <div className="pd-contact">
            <div className="pd-contact-title">Contact property</div>
            <button className="pd-btn pd-btn--primary">Request Tour</button>
            <button className="pd-btn pd-btn--outline">Send Message</button>
            {p.agent.mobile && <a className="pd-phone" href={`tel:${p.agent.mobile.replace(/\s/g, '')}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
              {p.agent.mobile}
            </a>}
            <div className="pd-contact-meta">
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeLinecap="round" /></svg> Language: English</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg> Open Hours 9am – 5pm</span>
            </div>
            {p.agent.name && (
              <div className="pd-agent">
                {p.agent.photo && <img src={p.agent.photo} alt={p.agent.name} loading="lazy" />}
                <div>
                  <div className="pd-agent-name">{p.agent.name}</div>
                  <div className="pd-agent-meta">{p.agent.email}</div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Related properties */}
      {related.length > 0 && <RelatedCarousel related={related} />}

      {/* All-photos lightbox */}
      {showAll && (
        <div className="pd-modal" onClick={() => setShowAll(false)}>
          <div className="pd-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-head">
              <span>{p.images.length} photos · {p.tower || p.title}</span>
              <button className="pd-modal-close" onClick={() => setShowAll(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="pd-modal-grid">
              {p.images.map((url, i) => (
                <a className="pd-modal-img" href={url} target="_blank" rel="noopener noreferrer" key={i}><img src={url} alt="" loading="lazy" /></a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
