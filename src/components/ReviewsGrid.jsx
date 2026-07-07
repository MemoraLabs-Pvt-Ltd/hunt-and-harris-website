import './ReviewsGrid.css'

const GoogleLogo = () => (
  <svg className="rg-g-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const Stars = ({ cardClass = '' }) => (
  <div className="rg-card-stars">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`rg-card-star ${cardClass}`}>★</span>
    ))}
  </div>
)

const reviews = [
  {
    featured: true,
    text: "Absolutely outstanding service from start to finish. The Hunt & Harris team took the time to genuinely understand what we were looking for in RAK, and delivered beyond our expectations. Every question was answered promptly, every concern addressed. This is what premium real estate service looks like.",
    name: "Sarah Mitchell",
    date: "March 2025",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Professional, knowledgeable, and truly invested in finding us the right property. Could not recommend more highly.",
    name: "James Thornton",
    date: "January 2025",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Seamless process and a team that genuinely cares. Found our dream apartment in Mina Al Arab within weeks.",
    name: "Amelia Foster",
    date: "April 2025",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=96&h=96&fit=crop&crop=face&auto=format&q=80",
  },
  {
    wide: true,
    text: "We had tried two other agencies before Hunt & Harris. The difference was night and day — honest advice, zero pressure, and a result we are genuinely thrilled with.",
    name: "Rohan & Priya Mehta",
    date: "February 2025",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=96&h=96&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "Handled our investment portfolio with precision and great market insight. Highly trusted advisors.",
    name: "David Al-Rashid",
    date: "May 2025",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face&auto=format&q=80",
  },
]

export default function ReviewsGrid() {
  return (
    <section className="rg-sec">
      <div className="rg-header">
        <div className="rg-header-left">
          <span className="rg-label">Google Reviews</span>
          <h2 className="rg-title">Rated 4.8 out of 5</h2>
        </div>
        <div className="rg-rating-badge">
          <span className="rg-score">4.8</span>
          <div className="rg-stars">
            {[1,2,3,4,5].map(i => <span key={i} className="rg-star">★</span>)}
          </div>
          <span className="rg-count">Based on 200+ verified reviews</span>
        </div>
      </div>

      <div className="rg-grid">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`rg-card${r.featured ? ' rg-card-featured' : ''}${r.wide ? ' rg-card-wide' : ''}`}
          >
            <div className="rg-card-top">
              <Stars />
              <GoogleLogo />
            </div>
            <p className="rg-card-text">"{r.text}"</p>
            <div className="rg-card-author">
              <img className="rg-avatar" src={r.img} alt={r.name} />
              <div>
                <div className="rg-author-name">{r.name}</div>
                <div className="rg-author-date">{r.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
