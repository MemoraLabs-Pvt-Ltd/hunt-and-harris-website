import { useState } from 'react'
import './BlogListing.css'

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=820&h=560&q=85`

const CATEGORIES = [
  'All', 'Market Reports', 'Buying Guides', 'Off-Plan',
  'Investment', 'Areas', 'Selling', 'Lifestyle',
]

const POSTS = [
  {
    category: 'Market Reports',
    title: 'Why RAK Is Outperforming Dubai on Rental Yield',
    excerpt: 'Ras Al Khaimah is quietly delivering some of the strongest returns in the UAE. Here is what the numbers actually say.',
    img: IMG('1512453979798-5ea266f8880c'),
    date: 'June 2026',
    read: '6 min read',
  },
  {
    category: 'Off-Plan',
    title: 'The Wynn Effect: What the New Resort Means for Al Marjan Values',
    excerpt: 'The region’s first integrated resort is reshaping Al Marjan Island. We break down the impact on prices and demand.',
    img: IMG('1582407947304-fd86f028f716'),
    date: 'May 2026',
    read: '7 min read',
  },
  {
    category: 'Buying Guides',
    title: 'How to Buy Freehold Property in RAK as a Foreign National',
    excerpt: 'Everything international buyers need to know about freehold ownership, paperwork and the transfer process.',
    img: IMG('1560518883-ce09059eeffa'),
    date: 'April 2026',
    read: '8 min read',
  },
  {
    category: 'Investment',
    title: 'Al Hamra Village: The Waterfront Community Investors Return To',
    excerpt: 'Mature, walkable and consistently in demand — why Al Hamra remains a favourite for long-term investors.',
    img: IMG('1600596542815-ffad4c1539a9'),
    date: 'April 2026',
    read: '5 min read',
  },
  {
    category: 'Lifestyle',
    title: 'Living in RAK: What Residents Say After 12 Months',
    excerpt: 'Beaches, mountains and a slower pace — real residents share what daily life is actually like in Ras Al Khaimah.',
    img: IMG('1600585154340-be6161a56a0c'),
    date: 'March 2026',
    read: '5 min read',
  },
  {
    category: 'Areas',
    title: 'Mina Al Arab vs Al Marjan Island: Which Community Fits You?',
    excerpt: 'Two of RAK’s most popular waterfront addresses, compared on price, lifestyle and investment potential.',
    img: IMG('1600607687939-ce8a6c25118c'),
    date: 'March 2026',
    read: '6 min read',
  },
  {
    category: 'Selling',
    title: '5 Upgrades That Actually Add Value Before You Sell in RAK',
    excerpt: 'Not every renovation pays off. Here are the improvements buyers in RAK genuinely pay more for.',
    img: IMG('1568605114967-8130f3a36994'),
    date: 'February 2026',
    read: '4 min read',
  },
  {
    category: 'Market Reports',
    title: 'RAK Property Price Trends: 2026 Half-Year Review',
    excerpt: 'A data-led look at how prices have moved across communities in the first half of the year.',
    img: IMG('1613490493576-7fde63acd811'),
    date: 'February 2026',
    read: '7 min read',
  },
  {
    category: 'Investment',
    title: 'Short-Term vs Long-Term Rentals: Where the Yields Are',
    excerpt: 'Holiday lets or annual tenants? We compare the returns, effort and rules for each strategy in RAK.',
    img: IMG('1580587771525-78b9dba3b914'),
    date: 'January 2026',
    read: '6 min read',
  },
]

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
          <a className="blg-card" href="#blog-post" key={p.title}>
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
          </a>
        ))}
      </div>
    </section>
  )
}
