import { useState, useEffect } from 'react'
import './Services.css'

const services = [
  {
    label: 'Explore',
    title: 'Off-Plan Properties',
    poster: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
    href: '/off-plan',
  },
  {
    label: 'Discover',
    title: 'Property Management',
    poster: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85',
    href: '/management',
  },
  {
    label: 'Experience',
    title: 'Conveyancing',
    poster: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=85',
    href: '/conveyancing',
  },
  {
    label: 'Finance',
    title: 'Mortgages',
    poster: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85',
    href: '/mortgages',
  },
  {
    label: 'Instant',
    title: 'Pay Online',
    poster: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85',
    href: '/pay-online',
  },
  {
    label: 'Inspect',
    title: 'Snagging',
    poster: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85',
    href: '/snagging',
  },
  {
    label: 'Seamless',
    title: 'Property Handover',
    poster: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=85',
    href: '/handover',
  },
  {
    label: 'Exchange',
    title: 'Currency',
    poster: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=900&q=85',
    href: '/currency',
  },
]

function getVisible() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 640) return 1
  if (window.innerWidth <= 1024) return 2
  return 3
}

export default function Services() {
  const [visible, setVisible] = useState(getVisible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onResize = () => {
      const v = getVisible()
      setVisible(v)
      setIndex(i => Math.min(i, Math.max(0, services.length - v)))
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const max = services.length - visible

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(max, i + 1))

  const gap = 16
  const cardWidth = `calc((100% - ${gap * (visible - 1)}px) / ${visible})`

  return (
    <section className="sv-sec">
      <div className="sv-top">
        <div>
          <h2 className="sv-title">Our Services</h2>
          <p className="sv-sub">Everything you need to buy, manage and protect your property in RAK</p>
        </div>
        <div className="sv-nav">
          <button className="sv-nav-btn" onClick={prev} disabled={index === 0} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button className="sv-nav-btn" onClick={next} disabled={index === max} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="sv-viewport">
        <div
          className="sv-track"
          style={{ transform: `translateX(calc(-${index} * (${cardWidth} + ${gap}px)))` }}
        >
          {services.map((s) => (
            <a className="sv-card" key={s.title} href={s.href} style={{ flex: `0 0 ${cardWidth}` }}>
              <img src={s.poster} alt={s.title} className="sv-img" />
              <div className="sv-overlay" />
              <div className="sv-body">
                <div className="sv-card-content">
                  <p className="sv-label">{s.label}</p>
                  <h3 className="sv-card-title">{s.title}</h3>
                </div>
                <div className="sv-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="sv-dots">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            className={`sv-dot${i === index ? ' sv-dot-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
