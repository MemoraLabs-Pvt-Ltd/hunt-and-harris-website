import { useEffect, useRef } from 'react'
import './Properties.css'

const CarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="8" width="22" height="10" rx="2"/>
    <path d="M5 8l2-4h10l2 4"/>
    <circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
  </svg>
)

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V19M22 9V19M2 14h20M2 9a5 5 0 015-5h10a5 5 0 015 5"/>
    <rect x="6" y="9" width="5" height="5" rx="1"/><rect x="13" y="9" width="5" height="5" rx="1"/>
  </svg>
)

const AreaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
)

const units = [
  {
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=85',
    badge: 'Villa',
    addr: 'Al Hamra Village, RAK',
    name: 'Sunset Bay Villa',
    parking: 2, beds: 4, area: '4,200 sq.ft',
    price: 'AED 2.8M',
  },
  {
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=85',
    badge: 'Mansion',
    addr: 'Al Marjan Island, RAK',
    name: 'The Fairway Estate',
    parking: 3, beds: 6, area: '7,500 sq.ft',
    price: 'AED 5.4M',
  },
  {
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85',
    badge: 'Penthouse',
    addr: 'Mina Al Arab, RAK',
    name: 'Pearl Tower Penthouse',
    parking: 1, beds: 3, area: '3,100 sq.ft',
    price: 'AED 1.9M',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85',
    badge: 'Luxury',
    addr: 'Al Zorah, Ajman',
    name: 'The Zorah Residence',
    parking: 2, beds: 5, area: '5,800 sq.ft',
    price: 'AED 4.1M',
  },
  {
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    badge: 'Villa',
    addr: 'Dafan Al Nakheel, RAK',
    name: 'Palm Garden Villa',
    parking: 2, beds: 4, area: '3,900 sq.ft',
    price: 'AED 2.2M',
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85',
    badge: 'Townhouse',
    addr: 'Al Hamriyah, RAK',
    name: 'Crest Townhouse',
    parking: 1, beds: 3, area: '2,400 sq.ft',
    price: 'AED 1.4M',
  },
]

export default function Properties() {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll('.pcard') || [])
    if (!cards.length) return

    cards.forEach((card, i) => {
      const delay = `${i % 3 * 150}ms`
      const badge = card.querySelector('.pcard-badge')
      const details = card.querySelector('.pcard-details')
      if (badge) badge.style.transitionDelay = delay
      if (details) details.style.transitionDelay = delay
    })

    const check = () => {
      cards.forEach(card => {
        if (card.classList.contains('pcard-visible')) return
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight - 60) {
          card.classList.add('pcard-visible')
        }
      })
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <section className="prop-sec">
      <div className="prop-header">
        <h2 className="prop-title">Explore Our Latest Properties</h2>
        <p className="prop-sub">Hand-picked luxury units across Ras Al Khaimah's finest communities</p>
      </div>
      <div className="prop-grid" ref={gridRef}>
        {units.map(p => (
          <div className="pcard" key={p.name}>
            <div className="pcard-img-wrap">
              <img src={p.img} alt={p.name} className="pcard-img" />
              <span className="pcard-badge">{p.badge}</span>
            </div>
            <div className="pcard-body">
              <div className="pcard-addr">{p.addr}</div>
              <div className="pcard-name">{p.name}</div>
              <div className="pcard-details">
                <div className="pcard-rule" />
                <div className="pcard-footer">
                  <div className="pcard-specs">
                    <span className="pcard-spec"><CarIcon />{p.parking}</span>
                    <span className="pcard-spec"><BedIcon />{p.beds}</span>
                    <span className="pcard-spec"><AreaIcon />{p.area}</span>
                  </div>
                  <div className="pcard-price">{p.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="prop-more-wrap">
        <a href="/listings" className="prop-more-btn">View More</a>
      </div>
    </section>
  )
}
