import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GridSkeleton from './GridSkeleton'
import './Properties.css'
import { prefetchProperty } from '../utils/prefetch'

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V19M22 9V19M2 14h20M2 9a5 5 0 015-5h10a5 5 0 015 5" />
    <rect x="6" y="9" width="5" height="5" rx="1" /><rect x="13" y="9" width="5" height="5" rx="1" />
  </svg>
)
const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3zM6 20v1M18 20v1" />
  </svg>
)
const AreaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const money = (l) => {
  const n = Number(l.price)
  const amt = Number.isFinite(n) && n > 0 ? n.toLocaleString('en-US') : (l.price || '—')
  const suffix = l.priceFreq === 'month' ? '/mo' : ''
  return `${l.currency || 'AED'} ${amt}${suffix}`
}
const bedsLabel = (b) => (!b ? '—' : /studio/i.test(b) ? 'Studio' : b)

export default function Properties() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const gridRef = useRef(null)

  // Fetched client-side (same-origin static JSON) so the rest of the home page
  // paints immediately — the feed never blocks the hero above.
  useEffect(() => {
    let alive = true
    fetch('/data/home.json')
      .then((r) => (r.ok ? r.json() : { featured: [] }))
      .then((d) => { if (alive) setFeatured(d.featured || []) })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll('.pcard') || [])
    if (!cards.length) return
    cards.forEach((card, i) => {
      const delay = `${(i % 4) * 120}ms`
      const badge = card.querySelector('.pcard-badge')
      const details = card.querySelector('.pcard-details')
      if (badge) badge.style.transitionDelay = delay
      if (details) details.style.transitionDelay = delay
    })
    const check = () => {
      cards.forEach((card) => {
        if (card.classList.contains('pcard-visible')) return
        if (card.getBoundingClientRect().top < window.innerHeight - 60) card.classList.add('pcard-visible')
      })
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [featured])

  return (
    <section className="prop-sec">
      <div className="prop-header">
        <h2 className="prop-title">Explore Our Latest Properties</h2>
        <p className="prop-sub">Featured homes across Ras Al Khaimah &mdash; freshly listed and hand-picked</p>
      </div>

      {loading && featured.length === 0 ? <GridSkeleton count={9} columns={4} /> : (
      <div className="prop-grid" ref={gridRef}>
        {featured.map((l) => (
          <Link className="pcard" key={l.ref} to={`/property/${l.ref}`} onMouseEnter={() => prefetchProperty(l.ref)} onFocus={() => prefetchProperty(l.ref)}>
            <div className="pcard-img-wrap">
              {l.image ? <img src={l.image} alt={l.title} className="pcard-img" loading="lazy" /> : <div className="pcard-img" />}
              <span className="pcard-badge">{l.type || (/off\s*plan/i.test(l.propertyFor) ? 'Off-Plan' : l.propertyFor)}</span>
            </div>
            <div className="pcard-body">
              <div className="pcard-addr">{[l.subLocation, l.location].filter(Boolean).join(', ') || l.city}</div>
              <div className="pcard-name">{l.title || l.tower || l.type}</div>
              <div className="pcard-details">
                <div className="pcard-rule" />
                <div className="pcard-footer">
                  <div className="pcard-specs">
                    <span className="pcard-spec"><BedIcon />{bedsLabel(l.beds)}</span>
                    <span className="pcard-spec"><BathIcon />{l.baths || '—'}</span>
                    {l.built && <span className="pcard-spec"><AreaIcon />{l.built} sq.ft</span>}
                  </div>
                  <div className="pcard-price">{money(l)}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      )}

      <div className="prop-more-wrap">
        <a href="/listings" className="prop-more-btn">View More</a>
      </div>
    </section>
  )
}
