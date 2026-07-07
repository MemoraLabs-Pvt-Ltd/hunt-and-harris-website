import { useRef, useEffect } from 'react'
import './ClientsSection.css'

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Property Buyer · United Kingdom",
    text: "Absolutely outstanding service from start to finish. The Hunt & Harris team took time to genuinely understand what we were looking for in RAK, and delivered beyond our expectations. This is what premium real estate service looks like.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Al Hamra Village",
    stars: 5,
  },
  {
    name: "James Thornton",
    role: "Portfolio Investor · Ireland",
    text: "Professional, knowledgeable, and truly invested in finding us the right property. The off-plan access they provided was incredible — we got in early at the best price. Could not recommend more highly.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Mina Al Arab",
    stars: 4,
  },
  {
    name: "Amelia Foster",
    role: "First-time Buyer · Australia",
    text: "Seamless process and a team that genuinely cares. Found our dream apartment within weeks. The in-house conveyancing saved us so much time and stress.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Mina Al Arab",
    stars: 5,
  },
  {
    name: "Rohan & Priya Mehta",
    role: "Family Buyers · India",
    text: "We had tried two other agencies before Hunt & Harris. The difference was night and day — honest advice, zero pressure, and a result we are genuinely thrilled with.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Al Marjan Island",
    stars: 4,
  },
  {
    name: "David Al-Rashid",
    role: "Investment Client · UAE",
    text: "Handled our investment portfolio with precision and great market insight. Deep knowledge of the RAK off-plan market that you simply won't find anywhere else. Highly trusted advisors.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Al Hamra Village",
    stars: 5,
  },
  {
    name: "Elena Volkov",
    role: "Property Owner · Russia",
    text: "From the very first call, they understood exactly what we needed. We are now proud owners in RAK thanks to Hunt & Harris. The after-sales support has been exceptional.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&auto=format&q=85",
    location: "Mina Al Arab",
    stars: 4,
  },
]

const duplicated = [...testimonials, ...testimonials]

export default function ClientsSection() {
  const wrapRef = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const SPEED = 0.25 // px per frame (~15px/sec at 60fps)
  const CARD_WIDTH = 540 // card width + gap

  const tick = () => {
    const el = wrapRef.current
    if (el && !pausedRef.current) {
      el.scrollLeft += SPEED
      // Seamless loop: when we've scrolled through the first half, reset
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  const prev = () => {
    pausedRef.current = true
    wrapRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' })
    setTimeout(() => { pausedRef.current = false }, 600)
  }

  const next = () => {
    pausedRef.current = true
    wrapRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' })
    setTimeout(() => { pausedRef.current = false }, 600)
  }

  return (
    <section className="cl-sec">

      <div className="cl-head">
        <h2 className="cl-title">What Our Clients Say</h2>
        <p className="cl-sub">
          Real experiences from buyers, investors and families who found their place in Ras Al Khaimah with Hunt &amp; Harris.
        </p>
        <div className="cl-trust">
          <div className="cl-trust-avatars">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format&q=85" alt="" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format&q=85" alt="" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format&q=85" alt="" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format&q=85" alt="" />
          </div>
          <div className="cl-trust-text">
            <span className="cl-trust-count">5,000+</span>
            <span className="cl-trust-label">people trust us</span>
          </div>
        </div>
      </div>

      <div
        className="cl-track-wrap"
        ref={wrapRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="cl-track">
          {duplicated.map((t, i) => (
            <div key={i} className="cl-card">
              <div className="cl-stars">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} viewBox="0 0 24 24" width="16" height="16"
                    fill={s < t.stars ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth={s < t.stars ? '0' : '1.5'}
                    style={{ opacity: s < t.stars ? 1 : 0.25 }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="cl-card-text">"{t.text}"</p>
              <div className="cl-card-footer">
                <div className="cl-card-author">
                  <img src={t.avatar} alt={t.name} className="cl-avatar" />
                  <div className="cl-author-info">
                    <div className="cl-author-name">{t.name}</div>
                    <div className="cl-author-role">{t.role}</div>
                  </div>
                </div>
                <div className="cl-divider" />
                <div className="cl-location">
                  <PinIcon />
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cl-controls">
        <button className="cl-btn" onClick={prev} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="cl-btn" onClick={next} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

    </section>
  )
}
