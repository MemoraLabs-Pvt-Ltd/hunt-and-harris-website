import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GridSkeleton from './GridSkeleton'
import './OffPlanListing.css'
import { prefetchProperty } from '../utils/prefetch'

const money = (l) => {
  const n = Number(l.price)
  const amount = Number.isFinite(n) && n > 0 ? n.toLocaleString('en-US') : (l.price || '—')
  return `${l.currency || 'AED'} ${amount}`
}
const bedsLabel = (b) => (!b ? '—' : /studio/i.test(b) ? 'Studio' : `${b} Bed`)

export default function OffPlanListing() {
  // Driven by the same-origin static JSON so the page shell paints instantly
  // and navigation never blocks on the feed.
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [place, setPlace] = useState('All')
  const [shown, setShown] = useState(36)

  useEffect(() => {
    let alive = true
    fetch('/data/off-plan.json')
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((d) => { if (alive) setData(d) })
      .catch((e) => { if (alive) setErr(String(e?.message || e)) })
    return () => { alive = false }
  }, [])

  const listings = data?.listings || []
  const places = data?.places || []
  const total = data?.total || 0
  const error = err

  const filtered = place === 'All' ? listings : listings.filter((l) => l.location === place)
  const visible = filtered.slice(0, shown)
  const pick = (p) => { setPlace(p); setShown(36) }
  const loading = !data && !err

  return (
    <section className="opl-sec">
      <div className="opl-hero">
        <h1 className="opl-title">
          Discover Exclusive <span className="opl-italic">Off-Plan</span><br />
          Properties in Ras Al Khaimah
        </h1>
        <p className="opl-sub">
          Secure the region&rsquo;s most anticipated launches early &mdash; direct from developers
          and resale, across RAK&rsquo;s finest waterfront communities.
        </p>
        <a className="opl-guide-btn" href="/guides/off-plan-guide.pdf" download target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Off-Plan Guide
        </a>
      </div>

      {error && <p className="opl-error">Could not load listings: {error}</p>}

      {loading ? <GridSkeleton count={12} columns={3} /> : (
      <>
      <div className="opl-filters">
        <button className={`opl-filter${place === 'All' ? ' is-active' : ''}`} onClick={() => pick('All')}>
          All <span className="opl-filter-count">({total})</span>
        </button>
        {places.map((p) => (
          <button key={p.name} className={`opl-filter${place === p.name ? ' is-active' : ''}`} onClick={() => pick(p.name)}>
            {p.name} <span className="opl-filter-count">({p.count})</span>
          </button>
        ))}
      </div>

      <div className="opl-count">
        {filtered.length} {filtered.length === 1 ? 'development' : 'developments'}
        {place !== 'All' && <> in {place}</>}
      </div>

      <div className="opl-grid">
        {visible.map((l) => (
          <Link className="opl-card" key={l.ref} to={`/property/${l.ref}`} onMouseEnter={() => prefetchProperty(l.ref)} onFocus={() => prefetchProperty(l.ref)}>
            <div className="opl-card-img">
              {l.image ? <img src={l.image} alt={l.title} loading="lazy" /> : <div className="opl-noimg">No image</div>}
              <span className="opl-card-badge">Off-Plan</span>
              <span className="opl-card-view">View {l.imageCount} photos</span>
            </div>
            <div className="opl-card-body">
              <div className="opl-card-loc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {[l.subLocation, l.location].filter(Boolean).join(', ') || l.city}
              </div>
              <h3 className="opl-card-name">{l.title || l.tower || l.type}</h3>
              <div className="opl-card-specs">
                <span>{bedsLabel(l.beds)}</span>
                <span>{l.baths || '—'} Bath</span>
                {l.built && <span>{l.built} sqft</span>}
              </div>
              <div className="opl-card-foot">
                <div className="opl-card-price">
                  <span className="opl-card-price-label">From</span>
                  {money(l)}
                </div>
                <span className="opl-card-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {shown < filtered.length && (
        <div className="opl-more-wrap">
          <button className="opl-more" onClick={() => setShown((s) => s + 36)}>Load more</button>
        </div>
      )}
      </>
      )}
    </section>
  )
}
