import { useRef, useEffect } from 'react'
import './ClientsSection.css'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=hunt+and+harris#lrd=0x3ef60a6a96385273:0x9234db33a57fb4ca,1'

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

// Real 5-star Google reviews.
const testimonials = [
  {
    name: "Abbie Higham",
    role: "Home Buyer",
    text: "I had a fantastic experience with Elise. She really took the time to understand exactly what I was looking for and recommended properties that suited my requirements. As someone new to the area, her knowledge and support were especially appreciated — I felt well looked after and confident I was making the right decisions.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
  {
    name: "Emma Ogley",
    role: "Tenant · Apartment",
    text: "Having recently moved to RAK, I was so lucky to be recommended to Elise. She helped me find an apartment incredibly quickly and was always available to answer my questions, no matter the time of day. Her responsiveness and genuine willingness to help made settling into a new place so easy.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
  {
    name: "Mosche Abramovitz",
    role: "Buyer, Seller & Landlord",
    text: "I've worked with Hunt & Harris Real Estate since 2024 — buying, selling and renting — and every experience has been positive. Rhymen Ledesma guides you through the entire process with professionalism and warmth, and Mohammad Ibrar makes the conveyancing smooth as a waterslide. If you value your time and money, look no further.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
  {
    name: "Dikshya Lamsal",
    role: "Studio Owner",
    text: "Working with Rhymen was such a positive experience — professional, trustworthy, and always keeping me updated. He went above and beyond to make everything easy, and stayed supportive even after handover. I'm really happy with my new studio in Al Hamra and would definitely recommend him.",
    location: "Al Hamra Village",
    stars: 5,
  },
  {
    name: "Tigin Çancı",
    role: "Property Buyer",
    text: "A truly excellent experience from the first step to the final stage of purchasing my property. A special thank you to Rea, who was incredibly helpful, responsive and knowledgeable throughout. Their commitment, transparency and client-focused approach truly set them apart.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
  {
    name: "Teeshan Ramtohul",
    role: "Apartment Buyer",
    text: "I had an exceptional experience with Elena. The very first apartment she showed me in Al Hamra Village checked all the boxes — I confirmed it on the spot! Her market knowledge is impressive and she even guided me step-by-step through the FEWA setup, which was invaluable as I'm new to the region.",
    location: "Al Hamra Village",
    stars: 5,
  },
  {
    name: "Vicente Gramuntell",
    role: "Tenant",
    text: "From the beginning, Elise's communication and management of the process were excellent, and she was always kind and helpful. What we especially appreciated is that even after we moved in, she kept checking that everything was working and we were comfortable. That follow-up shows she genuinely cares about her clients.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
  {
    name: "Ajesh K M",
    role: "Apartment Buyer",
    text: "I recently purchased an apartment and the whole experience was smooth and pleasant — handled professionally and transparently from start to finish. Special thanks to Ms. Prakriti and Mr. Faizal for their support and guidance. I'd confidently recommend them to anyone looking for a hassle-free purchase.",
    location: "Ras Al Khaimah",
    stars: 5,
  },
]

// First + last initials for the avatar chip (no photos supplied).
const initials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const GoogleG = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-label="Google review">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
  </svg>
)

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
          Real experiences from buyers, investors and families who found their place in Ras Al Khaimah with Hunt &amp; Harris Real Estate.
        </p>
        <div className="cl-trust-group">
          <a className="cl-trust cl-trust-link" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <span className="cl-trust-g"><GoogleG /></span>
            <div className="cl-trust-text">
              <span className="cl-trust-count">650+ reviews</span>
              <span className="cl-trust-label">See them on Google →</span>
            </div>
          </a>
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
                <div className="cl-stars-row">
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
                <GoogleG />
              </div>
              <p className="cl-card-text">"{t.text}"</p>
              <div className="cl-card-footer">
                <div className="cl-card-author">
                  <div className="cl-avatar cl-avatar-initials">{initials(t.name)}</div>
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
