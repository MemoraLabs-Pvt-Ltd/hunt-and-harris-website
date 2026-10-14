import { useState } from 'react'
import { Link } from 'react-router-dom'
import { POSTS, CATEGORIES } from '../data/blogPosts'
import { submitLead } from '../utils/submitLead'
import './BlogListing.css'

export default function BlogListing() {
  const [active, setActive] = useState('All')
  const posts = active === 'All' ? POSTS : POSTS.filter((p) => p.category === active)

  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | sending | success | error

  const onSubscribe = async (e) => {
    e.preventDefault()
    if (subStatus === 'sending') return
    setSubStatus('sending')
    const res = await submitLead({ form: 'Blog Subscribe', page: '/blog', email })
    if (res.ok) {
      setSubStatus('success')
      setEmail('')
    } else {
      setSubStatus('error')
    }
  }

  return (
    <section className="blg-sec">
      <div className="blg-hero">
        <h1 className="blg-title">
          Get valuable <span className="blg-title-italic">and useful</span><br />
          insights into RAK real estate
        </h1>

        <p className="blg-sub">
          Explore market trends, buying guides and expert advice from the Hunt &amp; Harris Real Estate
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

      {/* Subscribe band */}
      <div className="blg-sub-band">
        <div className="blg-sub-copy">
          <h2 className="blg-sub-title">Stay in the loop</h2>
          <p className="blg-sub-text">Get the latest RAK market insights and new listings straight to your inbox.</p>
        </div>
        <form className="blg-sub-form" onSubmit={onSubscribe}>
          <input
            className="blg-sub-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="blg-sub-btn" type="submit" disabled={subStatus === 'sending'}>
            {subStatus === 'sending' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {subStatus === 'success' && <p className="blg-sub-note blg-sub-note--ok">You&rsquo;re subscribed — thank you!</p>}
          {subStatus === 'error' && <p className="blg-sub-note blg-sub-note--err">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  )
}
