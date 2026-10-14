import { Link } from 'react-router-dom'
import './ServiceDetail.css'

// Generic service detail page: hero + intro paragraphs + benefits list +
// closing line + CTA. Content is passed in so each service reuses this layout.
export default function ServiceDetail({
  image,
  title,
  tagline,
  paras = [],
  listTitle,
  list = [],
  closing,
  ctaTitle,
  ctaText,
}) {
  return (
    <>
      <section className="sd-hero" style={{ backgroundImage: `url(${image})` }}>
        <div className="sd-hero-overlay" />
        <div className="sd-hero-content">
          <Link to="/services" className="sd-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Services
          </Link>
          <h1 className="sd-title">{title}</h1>
          {tagline && <p className="sd-tagline">{tagline}</p>}
        </div>
      </section>

      <section className="sd-body">
        <div className="sd-inner">
          {paras.map((p, i) => <p className="sd-p" key={i}>{p}</p>)}

          {list.length > 0 && (
            <div className="sd-list-block">
              {listTitle && <h2 className="sd-list-title">{listTitle}</h2>}
              <ul className="sd-list">
                {list.map((li, i) => (
                  <li key={i}><span className="sd-list-ico">✦</span> {li}</li>
                ))}
              </ul>
            </div>
          )}

          {closing && <p className="sd-p">{closing}</p>}

          {(ctaTitle || ctaText) && (
            <div className="sd-cta">
              {ctaTitle && <h3 className="sd-cta-title">{ctaTitle}</h3>}
              {ctaText && <p className="sd-cta-text">{ctaText}</p>}
              <Link to="/contact" className="sd-cta-btn">Speak to our team</Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
