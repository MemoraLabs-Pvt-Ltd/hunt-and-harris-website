import './ServicesShowcase.css'

export default function ServicesShowcase() {
  return (
    <section className="sw-sec">
      {/* Grid guide */}
      <span className="sw-grid-top" aria-hidden="true" />

      <div className="sw-inner">
        <div className="sw-left">
          <h2 className="sw-title">
            Get Expert Help With Buying, Selling, Off-Plan And Property Management
          </h2>
          <p className="sw-sub">
            Whether you&rsquo;re searching for your first home, a high-yield investment, or the
            right tenant for your property, our team makes every step simple.
          </p>

          <a href="#contact" className="sw-cta">
            Book a Viewing
            <span className="sw-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </span>
          </a>
        </div>

        <div className="sw-gallery">
          <img
            className="sw-image"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=820&q=85"
            alt="Luxury waterfront villa in Ras Al Khaimah"
          />
        </div>
      </div>
    </section>
  )
}
