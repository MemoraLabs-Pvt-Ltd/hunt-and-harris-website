import './Conveyancing.css'

const IMG = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

const FEATURES = [
  {
    title: 'Property Transfer & Conveyancing',
    desc: 'Professional property transfer services in Ras Al Khaimah, covering documentation review, regulatory compliance, NOC processing, and final transfer coordination with the Land Department.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: 'Rental Dispute Services',
    desc: 'Specialised rental dispute support in Ras Al Khaimah, including legal notice preparation and landlord compliance in accordance with UAE rental regulations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6M9 11h.01M15 11h.01" />
      </svg>
    ),
  },
  {
    title: 'Transparent Conveyancing Fees',
    desc: 'Fixed conveyancing fees for cash and mortgage property transfers in Ras Al Khaimah, with clear pricing and no hidden administrative costs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Real Estate Legal Support',
    desc: 'Additional real estate legal services including property ownership transfer, lost title deed replacement, document translation, and Power of Attorney representation in the UAE.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M6 21V9l6-4 6 4v12" />
        <rect x="9" y="12" width="2.5" height="2.5" /><rect x="13" y="12" width="2.5" height="2.5" />
      </svg>
    ),
  },
]

const ADDITIONAL = [
  {
    title: 'Property Ownership Transfer',
    desc: 'Legal and administrative management of property ownership transfer in full compliance with UAE regulations.',
    price: 'AED 3,000 + VAT',
    img: IMG('1600585154340-be6161a56a0c', 700, 620),
  },
  {
    title: 'Rental Dispute Services',
    desc: 'Professional preparation of legal notices and rental dispute support in accordance with UAE rental laws.',
    price: 'AED 2,000 + VAT',
    img: IMG('1600210492493-0946911123ea', 700, 620),
  },
  {
    title: 'Lost Title Deed Replacement',
    desc: 'Confirmation of legal ownership and replacement of lost title deeds through the required regulatory procedures.',
    price: 'AED 5,000 + VAT',
    img: IMG('1613490493576-7fde63acd811', 700, 620),
  },
  {
    title: 'Power Of Attorney Representation',
    desc: 'Property-related Power of Attorney setup and representation for clients unable to attend in person.',
    price: 'AED 5,000 + VAT (+AED 1,500 court fees)',
    img: IMG('1570129477492-45c003edd2be', 700, 620),
  },
  {
    title: 'Document Translation',
    desc: 'Certified translation of property and legal documents in compliance with official requirements.',
    price: 'Pricing based on document volume',
    img: IMG('1600585154526-990dced4db0d', 700, 620),
  },
]

const WHY = ['Since 2007', 'Transparent Pricing', 'End to End Support', 'UAE Legal Compliance']

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function Conveyancing() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className="cv-hero"
        style={{ backgroundImage: `url(${IMG('1512917774080-9991f1c4c750', 1920, 1080)})` }}
      >
        <div className="cv-hero-overlay" />
        <div className="cv-hero-content">
          <h1 className="cv-hero-title">
            Conveyancing <span className="cv-italic">Services</span><br />in Ras Al Khaimah
          </h1>
          <p className="cv-hero-sub">Professional Property Transfer &amp; Legal Support</p>
        </div>

        <div className="cv-hero-cards">
          <div className="cv-price-card cv-price-card--blue">
            <span className="cv-price-label">Cash Transaction</span>
            <span className="cv-price-amount">AED 3,000</span>
            <span className="cv-price-vat">Plus VAT</span>
          </div>
          <div className="cv-price-card cv-price-card--gray">
            <span className="cv-price-label">Mortgage Transaction</span>
            <span className="cv-price-amount">AED 4,000</span>
            <span className="cv-price-vat">Plus VAT</span>
          </div>
        </div>
      </section>

      {/* ---------- Intro + feature grid ---------- */}
      <section className="cv-intro">
        <div className="cv-intro-left">
          <h2 className="cv-intro-title">Conveyancing Services in <span className="cv-italic">Ras Al Khaimah</span></h2>
          <p className="cv-intro-body">
            Hunt &amp; Harris Real Estate provides professional conveyancing services in Ras Al
            Khaimah, managing the complete legal and administrative process involved in property
            transfers across the UAE. Whether you are buying, selling, or transferring ownership,
            our team ensures full compliance with UAE property regulations while coordinating with
            banks, developers, and the Land Department for a smooth and secure transaction.
          </p>
        </div>

        <div className="cv-feature-grid">
          {FEATURES.map((f) => (
            <div className="cv-feature" key={f.title}>
              <span className="cv-feature-icon">{f.icon}</span>
              <h3 className="cv-feature-title">{f.title}</h3>
              <p className="cv-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Additional legal services ---------- */}
      <section className="cv-add">
        <h2 className="cv-add-title">Additional Real Estate<br /><span className="cv-italic">Legal Services</span></h2>
        <div className="cv-add-grid">
          {ADDITIONAL.map((c) => (
            <article className="cv-add-card" key={c.title}>
              <div className="cv-add-text">
                <h3 className="cv-add-card-title">{c.title}</h3>
                <p className="cv-add-card-desc">{c.desc}</p>
                <span className="cv-add-card-price">{c.price}</span>
              </div>
              <div className="cv-add-img">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Why choose ---------- */}
      <section className="cv-why">
        <h2 className="cv-why-title">Why <span className="cv-italic">Choose</span><br />Hunt &amp; Harris?</h2>
        <div className="cv-why-inner">
          <div className="cv-why-img">
            <img src={IMG('1521737604893-d14cc237f11d', 860, 860)} alt="Hunt & Harris consultation" loading="lazy" />
          </div>
          <div className="cv-why-right">
            <p className="cv-why-body">
              At Hunt &amp; Harris, we combine unmatched expertise with exceptional customer
              service, striving to be the UAE&rsquo;s most inclusive and trusted real estate
              agency of choice.
            </p>
            <ul className="cv-why-list">
              {WHY.map((item) => (
                <li className="cv-why-item" key={item}>
                  <span className="cv-why-check"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
