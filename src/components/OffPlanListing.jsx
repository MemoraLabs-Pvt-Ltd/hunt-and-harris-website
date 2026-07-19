import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PLACES, properties } from '../data/offPlan'
import './OffPlanListing.css'

const COUNTS = properties.reduce((acc, p) => {
  acc[p.location] = (acc[p.location] || 0) + 1
  return acc
}, {})
const countFor = (p) => (p === 'All' ? properties.length : COUNTS[p] || 0)

export default function OffPlanListing() {
  const [place, setPlace] = useState('All')
  const list = place === 'All' ? properties : properties.filter((p) => p.location === place)

  return (
    <section className="opl-sec">
      <div className="opl-hero">
        <h1 className="opl-title">
          Discover Exclusive <span className="opl-italic">Off-Plan</span><br />
          Properties in Ras Al Khaimah
        </h1>
        <p className="opl-sub">
          Secure the region&rsquo;s most anticipated launches early &mdash; with the best units,
          payment plans and pricing across RAK&rsquo;s finest waterfront communities.
        </p>
      </div>

      <div className="opl-filters">
        {PLACES.map((p) => (
          <button
            key={p}
            className={`opl-filter${place === p ? ' is-active' : ''}`}
            onClick={() => setPlace(p)}
          >
            {p} <span className="opl-filter-count">({countFor(p)})</span>
          </button>
        ))}
      </div>

      <div className="opl-count">
        {list.length} {list.length === 1 ? 'development' : 'developments'}
        {place !== 'All' && <> in {place}</>}
      </div>

      <div className="opl-grid">
        {list.map((p) => (
          <Link className="opl-card" to={`/off-plan/${p.slug}`} key={p.slug}>
            <div className="opl-card-img">
              <img src={p.image} alt={p.name} loading="lazy" />
              <span className="opl-card-badge">{p.status}</span>
              <span className="opl-card-handover">Handover {p.handover}</span>
            </div>
            <div className="opl-card-body">
              <div className="opl-card-loc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {p.location}
              </div>
              <h3 className="opl-card-name">{p.name}</h3>
              <div className="opl-card-foot">
                <div className="opl-card-price">
                  <span className="opl-card-price-label">From</span>
                  {p.priceFrom}
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
    </section>
  )
}
