import { useState, useEffect } from 'react'
import './Blog.css'

const posts = [
  {
    tag: 'Market Report',
    title: 'Why RAK Is Outperforming Dubai on Rental Yield',
    date: 'June 2026',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85',
  },
  {
    tag: 'Off Plan',
    title: 'The Wynn Effect: What the New Resort Means for Al Marjan Values',
    date: 'May 2026',
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=85',
  },
  {
    tag: "Buyer's Guide",
    title: 'How to Buy Freehold Property in RAK as a Foreign National',
    date: 'April 2026',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85',
  },
  {
    tag: 'Investment',
    title: 'Al Hamra Village: The Waterfront Community Investors Keep Coming Back To',
    date: 'March 2026',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
  },
  {
    tag: 'Lifestyle',
    title: 'Living in RAK: What Residents Actually Say After 12 Months',
    date: 'February 2026',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
  },
]

function getVisible() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 640) return 1
  if (window.innerWidth <= 1024) return 2
  return 3
}

export default function Blog() {
  const [visible, setVisible] = useState(getVisible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onResize = () => {
      const v = getVisible()
      setVisible(v)
      setIndex(i => Math.min(i, Math.max(0, posts.length - v)))
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const max = posts.length - visible
  const gap = 24
  const cardWidth = `calc((100% - ${gap * (visible - 1)}px) / ${visible})`

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(max, i + 1))

  return (
    <section className="bl-sec">
      <div className="bl-top">
        <div className="bl-top-left">
          <h2 className="bl-title">Stay sharp on<br />the RAK market.</h2>
          <p className="bl-sub">Market insights, property guides, and the stories shaping real estate in Ras Al Khaimah.</p>
        </div>
        <div className="bl-top-right">
          <a href="#blog" className="bl-view-all">View all</a>
          <button className="bl-nav-btn" onClick={prev} disabled={index === 0} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button className="bl-nav-btn" onClick={next} disabled={index === max} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="bl-viewport">
        <div
          className="bl-track"
          style={{ transform: `translateX(calc(-${index} * (${cardWidth} + ${gap}px)))` }}
        >
          {posts.map((p) => (
            <a className="bl-card" key={p.title} href="#blog" style={{ flex: `0 0 ${cardWidth}` }}>
              <div className="bl-card-img-wrap">
                <img src={p.img} alt={p.title} className="bl-card-img" />
              </div>
              <div className="bl-card-body">
                <span className="bl-card-tag">{p.tag}</span>
                <h3 className="bl-card-title">{p.title}</h3>
                <p className="bl-card-date">{p.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
