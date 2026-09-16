import { useState } from 'react'
import { Link } from 'react-router-dom'
import { POSTS, CATEGORIES } from '../data/blogPosts'
import './BlogListing.css'

export default function BlogListing() {
  const [active, setActive] = useState('All')
  const posts = active === 'All' ? POSTS : POSTS.filter((p) => p.category === active)

  return (
    <section className="blg-sec">
      <div className="blg-hero">
        <h1 className="blg-title">
          Get valuable <span className="blg-title-italic">and useful</span><br />
          insights into RAK real estate
        </h1>

        <p className="blg-sub">
          Explore market trends, buying guides and expert advice from the Hunt &amp; Harris
          team, helping you make confident property decisions across Ras Al Khaimah.
        </p>
      </div>

      <div className="blg-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`blg-filter${active === c ? ' is-active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="blg-grid">
        {posts.map((p) => (
          <Link className="blg-card" to={`/blog/${p.slug}`} key={p.slug}>
            <div className="blg-card-img">
              <img src={p.img} alt={p.title} loading="lazy" />
              <span className="blg-card-tag">{p.category}</span>
            </div>
            <div className="blg-card-body">
              <div className="blg-card-meta">{p.date} &middot; {p.read}</div>
              <h3 className="blg-card-title">{p.title}</h3>
              <p className="blg-card-excerpt">{p.excerpt}</p>
              <span className="blg-card-link">
                Read more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
