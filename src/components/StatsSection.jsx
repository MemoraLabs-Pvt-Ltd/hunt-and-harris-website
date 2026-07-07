import './StatsSection.css'

const stats = [
  {
    number: '500+',
    desc: 'Properties successfully transacted across Ras Al Khaimah, guiding buyers, investors and families to the right home.',
  },
  {
    number: '4.8★',
    desc: 'Average Google review rating from verified clients — reflecting our commitment to transparency and care at every step.',
  },
  {
    number: 'Since 2007',
    desc: 'Years of trusted real estate expertise in RAK, built on lasting relationships and deep market knowledge.',
  },
]

export default function StatsSection() {
  return (
    <section className="ss-sec">
      <div className="ss-image-wrap">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=1100&fit=crop&auto=format&q=85"
          alt="Luxury property in RAK"
        />
      </div>

      <div className="ss-content">
        <p className="ss-desc">
          From the moment you begin your search to the day you collect your keys, our team provides dedicated, honest guidance at every step — built on nearly two decades of expertise in the Ras Al Khaimah property market.
        </p>

        <div className="ss-stats">
          {stats.map((s, i) => (
            <div className="ss-stat" key={i}>
              <span className="ss-stat-number">{s.number}</span>
              <span className="ss-stat-desc">{s.desc}</span>
            </div>
          ))}
        </div>

        <button className="ss-btn">Learn more about us</button>
      </div>
    </section>
  )
}
