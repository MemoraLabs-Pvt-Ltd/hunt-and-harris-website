import './ServicesGrid.css'

const IMG = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=90`

/* Top block — 4 cards (1 tall, 2 standard, 1 wide) */
const MAIN = [
  {
    area: 'a',
    title: 'Property Search',
    desc: 'From your first viewing to the right shortlist — we help you find homes that truly fit your life and budget across Ras Al Khaimah.',
    img: IMG('1600585154340-be6161a56a0c', 900, 1300),
  },
  {
    area: 'b',
    title: 'Buying & Selling',
    desc: "Expert guidance and sharp negotiation, whether you're buying your dream home or selling for the best possible price.",
    img: IMG('1600607687939-ce8a6c25118c', 1000, 760),
  },
  {
    area: 'c',
    title: 'Off-Plan Investment',
    desc: "Early access to RAK's most anticipated launches, with the payment plans and insight to invest with confidence.",
    img: IMG('1568605114967-8130f3a36994', 1000, 760),
  },
  {
    area: 'd',
    title: 'Property Management',
    desc: "Hands-off ownership — we handle tenants, maintenance and rent collection so your investment works while you don't.",
    img: IMG('1600596542815-ffad4c1539a9', 1400, 720),
  },
]

/* Bottom block — 2 cards */
const SUB = [
  {
    title: 'Conveyancing',
    desc: 'Our in-house team manages the legal paperwork and transfer end to end, keeping your purchase smooth and secure.',
    img: IMG('1554224155-6726b3ff858f', 1100, 760),
  },
  {
    title: 'Mortgage Advisory',
    desc: 'Access trusted lenders and the right financing structure, tailored to residents and international buyers alike.',
    img: IMG('1560518883-ce09059eeffa', 1100, 760),
  },
]

function Card({ title, desc, img, className = '' }) {
  return (
    <article className={`sg-card ${className}`}>
      <img className="sg-card-img" src={img} alt={title} loading="lazy" />
      <div className="sg-card-shade" />
      <div className="sg-card-top">
        <h3 className="sg-card-title">{title}</h3>
        <p className="sg-card-desc">{desc}</p>
      </div>
      <a className="sg-card-more" href="#contact">
        Learn More
        <span className="sg-card-more-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="8 7 17 7 17 16" />
          </svg>
        </span>
      </a>
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
