import './ServicesGrid.css'

const IMG = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=90`

/* Top block — 4 cards (1 tall, 2 standard, 1 wide) */
const MAIN = [
  {
    area: 'a',
    title: 'Rental',
    // TODO: replace with client-supplied rental content
    desc: 'Find the right home to rent, or let your property with confidence — from tenant matching to tenancy contracts, we handle it end to end across Ras Al Khaimah.',
    img: '/photos/interior-living-1.jpg',
    actions: [
      { label: 'Download Guide', href: '/guides/rental-guide.pdf', download: true },
      { label: 'Learn More', href: '/listings?for=Rent' },
    ],
  },
  {
    area: 'b',
    title: 'Buying',
    // TODO: replace with client-supplied buying content
    desc: 'Expert guidance and sharp negotiation to help you buy your dream home at the best possible price across Ras Al Khaimah.',
    img: '/photos/community-1.jpg',
    actions: [
      { label: 'Download Guide', href: '/guides/buyers-guide.pdf', download: true },
      { label: 'Learn More', href: '/listings?for=Sale' },
    ],
  },
  {
    area: 'c',
    title: 'Selling',
    // TODO: replace with client-supplied selling content
    desc: 'Price it right, market it beautifully and negotiate hard — we sell your property for the best possible outcome.',
    img: '/photos/townhouse-facade.jpg',
    actions: [
      { label: 'Download Guide', href: '/guides/listing-guide.pdf', download: true },
      { label: 'Learn More', href: '/property-management' },
    ],
  },
  {
    area: 'd',
    title: 'Off-Plan Investment',
    desc: "Early access to RAK's most anticipated launches, with the payment plans and insight to invest with confidence.",
    img: '/photos/rak-aerial-4.jpg',
    actions: [
      { label: 'Download Guide', href: '/guides/off-plan-guide.pdf', download: true },
      { label: 'Learn More', href: '/off-plan' },
    ],
  },
]

/* Bottom block — 2 cards */
const SUB = [
  {
    title: 'Property Management',
    desc: "Hands-off ownership — we handle tenants, maintenance and rent collection so your investment works while you don't.",
    img: '/photos/towers.jpg',
    imgPos: 'top',
    badge: 'New',
    actions: [
      { label: 'Download Brochure', href: '/guides/property-management-brochure.pdf', download: true },
      { label: 'Learn More', href: '/property-management' },
    ],
  },
  {
    title: 'Conveyancing',
    desc: 'Our in-house team manages the legal paperwork and transfer end to end, keeping your purchase smooth and secure.',
    img: IMG('1554224155-6726b3ff858f', 1100, 760),
    actions: [
      { label: 'Download Guide', href: '/guides/conveyancing-services.pdf', download: true },
      { label: 'Learn More', href: '/conveyancing' },
    ],
  },
  {
    title: 'Property Search',
    desc: 'From your first viewing to the right shortlist — we help you find homes that truly fit your life and budget across Ras Al Khaimah.',
    img: '/photos/villa-dusk.jpg',
    actions: [
      { label: 'Learn More', href: '/listings' },
    ],
  },
  {
    title: 'Mortgage Consultancy',
    desc: 'Expert mortgage guidance and tailored financing solutions in the UAE and overseas, through our licensed consultancy partners.',
    img: IMG('1560518883-ce09059eeffa', 1100, 760),
    actions: [
      { label: 'Learn More', href: '/mortgage-consultancy' },
    ],
  },
  {
    title: 'Foreign Currency Exchange',
    desc: 'Competitive exchange rates and seamless international transfers through our FX partner, Agility Forex UK Ltd.',
    img: '/photos/terrace-seaview.jpg',
    actions: [
      { label: 'Learn More', href: '/foreign-exchange' },
    ],
  },
  {
    title: 'Interior Design & Furnishing',
    desc: 'Beautifully furnished spaces tailored to your needs and budget — from furniture packages to full turnkey solutions.',
    img: '/photos/living-luxe.jpg',
    actions: [
      { label: 'Learn More', href: '/interior-design' },
    ],
  },
]

const ArrowIcon = () => (
  <span className="sg-card-more-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </svg>
  </span>
)
const DownloadIcon = () => (
  <span className="sg-card-more-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  </span>
)

function Card({ title, desc, img, className = '', badge, imgPos, actions }) {
  return (
    <article className={`sg-card ${className}`}>
      {badge && <span className="sg-card-badge">{badge}</span>}
      <img className="sg-card-img" src={img} alt={title} loading="lazy" style={imgPos ? { objectPosition: imgPos } : undefined} />
      <div className="sg-card-shade" />
      <div className="sg-card-top">
        <h3 className="sg-card-title">{title}</h3>
        <p className="sg-card-desc">{desc}</p>
      </div>
      {actions ? (
        <div className="sg-card-actions">
          {actions.map((a) => (
            <a
              key={a.label}
              className="sg-card-more sg-card-more--inline"
              href={a.href}
              {...(a.download ? { download: true, target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {a.label}
              {a.download ? <DownloadIcon /> : <ArrowIcon />}
            </a>
          ))}
        </div>
      ) : (
        <a className="sg-card-more" href="#contact">
          Learn More
          <ArrowIcon />
        </a>
      )}
    </article>
  )
}

export default function ServicesGrid() {
  return (
    <section className="sg-sec">
      <h2 className="sg-title">
        Our <span className="sg-title-italic">Services</span>
      </h2>

      <div className="sg-main">
        {MAIN.map((c) => (
          <Card key={c.area} {...c} className={`sg-${c.area}`} />
        ))}
      </div>

      <div className="sg-sub">
        {SUB.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    </section>
  )
}
