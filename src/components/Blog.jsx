import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { POSTS } from '../data/blogPosts'
import './Blog.css'

// Latest articles pulled from the real blog data.
const posts = POSTS.slice(0, 6).map((p) => ({
  tag: p.category,
  title: p.title,
  date: p.date,
  img: p.img,
  slug: p.slug,
}))

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
          <Link to="/blog" className="bl-view-all">View all</Link>
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
            <Link className="bl-card" key={p.slug} to={`/blog/${p.slug}`} style={{ flex: `0 0 ${cardWidth}` }}>
              <div className="bl-card-img-wrap">
                <img src={p.img} alt={p.title} className="bl-card-img" />
              </div>
              <div className="bl-card-body">
                <span className="bl-card-tag">{p.tag}</span>
                <h3 className="bl-card-title">{p.title}</h3>
                <p className="bl-card-date">{p.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
