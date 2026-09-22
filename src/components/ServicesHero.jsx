import './ServicesHero.css'

/* Small monochrome logo marks (reused across the wall like the reference) */
const MARK = {
  hex: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 4 5 3v6l-5 3-5-3V9l5-3Z" /></svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 12l10 10 10-10L12 2Zm0 4.8L17.2 12 12 17.2 6.8 12 12 6.8Z" /></svg>
  ),
  dot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" /></svg>
  ),
  tri: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2 20h20L12 3Zm0 5.5L17 18H7l5-9.5Z" /></svg>
  ),
  wave: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 9c3-4 6 4 9 0s6-4 9 0M3 15c3-4 6 4 9 0s6-4 9 0" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 21V6l7-3v18H4Zm9 0V9l7 3v9h-7ZM6.5 8.5h2v2h-2v-2Zm0 4h2v2h-2v-2Z" /></svg>
  ),
}

const LOGOS_TOP = [
  { mark: 'building', name: 'Emaar', cls: 'svh-lg-spaced' },
  { mark: 'hex', name: 'RAK Properties', sub: 'DEVELOPMENTS' },
  { mark: 'diamond', name: 'Aldar', cls: 'svh-lg-bold' },
  { mark: 'wave', name: 'Al Hamra', cls: 'svh-lg-serif' },
  { mark: 'dot', name: 'Ellington', cls: 'svh-lg-spaced' },
  { mark: 'tri', name: 'Nakheel' },
  { mark: 'building', name: 'DAMAC', cls: 'svh-lg-spaced' },
]

const LOGOS_BOTTOM = [
  { mark: 'diamond', name: 'Sobha Realty', cls: 'svh-lg-serif' },
  { mark: 'wave', name: 'Danube' },
  { mark: 'hex', name: 'Marjan', sub: 'AL MARJAN ISLAND' },
  { mark: 'dot', name: 'Betterhomes', cls: 'svh-lg-bold' },
  { mark: 'tri', name: 'Bayut' },
  { mark: 'building', name: 'Property Finder' },
  { mark: 'diamond', name: 'Ellington', cls: 'svh-lg-spaced' },
]

function LogoRow({ logos, dir }) {
  const items = [...logos, ...logos]
  return (
    <div className="svh-logo-row">
      <div className={`svh-logo-track svh-logo-track--${dir}`}>
        {items.map((l, i) => (
          <span className={`svh-logo ${l.cls || ''}`} key={`${l.name}-${i}`}>
            <span className="svh-logo-mark">{MARK[l.mark]}</span>
            <span className="svh-logo-text">
              {l.name}
              {l.sub && <span className="svh-logo-sub">{l.sub}</span>}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServicesHero() {
  return (
    <section className="svh-sec">
      <div className="svh-hero">
        <div className="svh-inner">
          <h1 className="svh-title">
            Full-Service Real Estate<br />
            <span className="svh-title-serif">for Buyers, Sellers &amp; Investors</span>
          </h1>

          <p className="svh-sub">
            From finding your first home to building an investment portfolio, Hunt &amp; Harris Real Estate
            handles every step &mdash; buying, selling, off-plan, conveyancing and property
            management across Ras Al Khaimah. Let us make your next move effortless.
          </p>

          <a href="#contact" className="svh-cta">
            Book a Free Consultation
            <span className="svh-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </span>
          </a>
        </div>

        <p className="svh-trusted">Trusted by 2,000+ homeowners and investors across Ras Al Khaimah</p>
      </div>

      {/* Builder/developer logo marquee — hidden for now (kept for later use) */}
      <div className="svh-logos" hidden>
        <LogoRow logos={LOGOS_TOP} dir="left" />
        <LogoRow logos={LOGOS_BOTTOM} dir="right" />
      </div>
    </section>
  )
}
