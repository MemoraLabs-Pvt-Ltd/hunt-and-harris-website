import './LatestProperties.css'

const BedIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V19M22 9V19M2 14h20M2 9a5 5 0 015-5h10a5 5 0 015 5"/>
    <rect x="6" y="9" width="5" height="5" rx="1"/><rect x="13" y="9" width="5" height="5" rx="1"/>
  </svg>
)

const BathIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 11h14a2 2 0 012 2v1a4 4 0 01-4 4H7a4 4 0 01-4-4v-1a2 2 0 012-2z"/>
    <path d="M5 11V6a2 2 0 012-2h1.5"/>
  </svg>
)

const CarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="8" width="22" height="10" rx="2"/>
    <path d="M5 8l2-4h10l2 4"/>
    <circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
  </svg>
)

const AreaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)

const BuildingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const properties = [
  {
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&auto=format&q=85',
    price: '$1,120,000',
    name: 'Corner Prestige',
    development: 'Silver Palm Villas',
    beds: 5, baths: 5, parking: 2, area: '3,050 sq ft',
  },
  {
    img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop&auto=format&q=85',
    price: '$1,120,000',
    name: 'Park Serenity',
    development: 'Parkside Residences',
    beds: 3, baths: 3, parking: 1, area: '3,050 sq ft',
  },
  {
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format&q=85',
    price: '$1,120,000',
    name: 'Green Contemporary',
    development: 'Green District Residences',
    beds: 3, baths: 3, parking: 2, area: '3,050 sq ft',
  },
]

export default function LatestProperties() {
  return (
    <section className="lp-sec">

      {/* Col 1 Row 1 — label */}
      <div className="lp-label">
        <span className="lp-dot-sm" />
        Latest Properties
      </div>

      {/* Col 2 Row 1 — button */}
      <div className="lp-top-row">
        <button className="lp-view-all-btn">View All</button>
      </div>

      {/* Col 1 Row 2 — accent dot */}
      <div className="lp-dot-lg" />

      {/* Col 2 Row 2 — cards */}
      <div className="lp-grid">
        {properties.map((p) => (
          <div className="lp-card" key={p.name}>
            <div className="lp-img-wrap">
              <img src={p.img} alt={p.name} className="lp-img" />
              <span className="lp-badge">For Sale</span>
            </div>
            <div className="lp-card-body">
              <div className="lp-price">{p.price}</div>
              <div className="lp-name">{p.name}</div>
              <div className="lp-dev">
                <BuildingIcon />
                {p.development}
              </div>
              <div className="lp-spacer" />
              <div className="lp-divider" />
              <div className="lp-specs-row">
                <div className="lp-specs">
                  <span className="lp-spec"><BedIcon />{p.beds}</span>
                  <span className="lp-spec"><BathIcon />{p.baths}</span>
                  <span className="lp-spec"><CarIcon />{p.parking}</span>
                </div>
                <div className="lp-area"><AreaIcon />{p.area}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
