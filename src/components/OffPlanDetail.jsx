import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProperty } from '../data/offPlan'
import './OffPlanDetail.css'

const ACTIONS = [
  { label: 'Amenities Plan', href: '#' },
  { label: 'View Brochure', href: '#' },
  { label: 'Floor Plan', href: '#' },
]

export default function OffPlanDetail({ slug }) {
  const property = getProperty(slug)
  const carouselRef = useRef(null)
  const pausedRef = useRef(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Open each property at the top (hero), not at the listing's scroll position
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Auto-advance the gallery like a carousel (pauses on hover)
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const id = setInterval(() => {
      if (pausedRef.current) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: el.clientWidth * 0.7, behavior: 'smooth' })
      }
    }, 3800)
    return () => clearInterval(id)
  }, [slug])

  if (!property) {
    return (
      <section className="opd-missing">
        <h1>Property not found</h1>
        <Link to="/off-plan" className="opd-back-link">Back to off-plan properties</Link>
      </section>
    )
  }

  const scroll = (dir) => {
    const el = carouselRef.current
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' })
  }

  const photos = property.gallery.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="opd-hero" style={{ backgroundImage: `url(${property.image})` }}>
        <div className="opd-hero-overlay" />
        <div className="opd-hero-content">
          <Link to="/off-plan" className="opd-crumb">← Off-Plan Properties</Link>
          <span className="opd-hero-loc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {property.location}, Ras Al Khaimah
          </span>
          <h1 className="opd-hero-name">{property.name}</h1>
        </div>
      </section>

      {/* Photos of the place */}
      <section className="opd-photos">
        {photos.map((src, i) => (
          <div className="opd-photo" key={i}>
            <img src={src} alt={`${property.name} view ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </section>

      {/* Description + facts + actions */}
      <section className="opd-overview">
        <div className="opd-overview-left">
          <span className="opd-eyebrow">Overview</span>
          <h2 className="opd-overview-title">About {property.name}</h2>
          <p className="opd-overview-body">{property.description}</p>

          <div className="opd-actions">
            {ACTIONS.map((a) => (
              <a className="opd-action" href={a.href} key={a.label}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                </svg>
                {a.label}
              </a>
            ))}
            <a className="opd-action opd-action--primary" href="#register">Register Interest</a>
          </div>
        </div>

        <aside className="opd-facts">
          <div className="opd-fact">
            <span className="opd-fact-label">Starting From</span>
            <span className="opd-fact-value">{property.priceFrom}</span>
          </div>
          <div className="opd-fact">
            <span className="opd-fact-label">Handover</span>
            <span className="opd-fact-value">{property.handover}</span>
          </div>
          <div className="opd-fact">
            <span className="opd-fact-label">Bedrooms</span>
            <span className="opd-fact-value">{property.beds}</span>
          </div>
          <div className="opd-fact">
            <span className="opd-fact-label">Status</span>
            <span className="opd-fact-value">{property.status}</span>
          </div>
        </aside>
      </section>

      {/* Gallery carousel */}
      <section className="opd-gallery">
        <div className="opd-gallery-head">
          <h2 className="opd-gallery-title">Gallery</h2>
          <div className="opd-gallery-nav">
            <button onClick={() => scroll(-1)} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div
          className="opd-carousel"
          ref={carouselRef}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {property.gallery.map((src, i) => (
            <div className="opd-slide" key={i}>
              <img src={src} alt={`${property.name} gallery ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Register interest */}
      <section className="opd-register" id="register" style={{ backgroundImage: `url(${property.gallery[1]})` }}>
        <div className="opd-register-overlay" />
        <div className="opd-register-card">
          <h2 className="opd-register-title">Register Your <span className="opd-italic">Interest</span></h2>
          <p className="opd-register-sub">
            Leave your details and our team will share pricing, availability and payment plans for {property.name}.
          </p>
          <form className="opd-form" onSubmit={(e) => e.preventDefault()}>
            <input className="opd-input" type="text" placeholder="Full name" value={form.name} onChange={set('name')} required />
            <input className="opd-input" type="email" placeholder="Email address" value={form.email} onChange={set('email')} required />
            <input className="opd-input" type="tel" placeholder="Phone number" value={form.phone} onChange={set('phone')} />
            <textarea className="opd-input opd-textarea" placeholder="Message (optional)" rows={3} value={form.message} onChange={set('message')} />
            <button className="opd-submit" type="submit">Register Interest</button>
          </form>
        </div>
      </section>
    </>
  )
}
