import './AwardsBanner.css'

// Brand wordmarks (grayscale by default, full colour on hover). Swap for
// official logo files in /public later.
const NODE = {
  propertyfinder: (<span><b>property</b>finder</span>),
  bayut:          (<span>bayut</span>),
  dubizzle:       (<span>dubizzle</span>),
  uniestate:      (<span>UNIESTATE</span>),
}

// All AGENCY-level awards won by Hunt & Harris Real Estate (individual-agent
// awards are intentionally excluded). Each travels through the marquee with its
// brand wordmark and the award + year.
const AWARDS = [
  // Property Finder
  { key: 'propertyfinder', award: 'Most Outstanding Agency 2017' },
  { key: 'propertyfinder', award: '1st Best Quality Brokerage 2020' },
  { key: 'propertyfinder', award: '1st Most Leads Generated 2020' },
  { key: 'propertyfinder', award: '1st Best Quality Brokerage 2021' },
  { key: 'propertyfinder', award: 'Winner — Quality Brokerage 2023' },
  // Bayut
  { key: 'bayut', award: 'Agent of the Month 2019' },
  { key: 'bayut', award: 'Agency of the Year 2020' },
  { key: 'bayut', award: '2nd Agency of the Year 2021' },
  { key: 'bayut', award: '3rd Agency of the Year 2022' },
  { key: 'bayut', award: 'Finalist Agency of the Year 2022' },
  { key: 'bayut', award: 'Finalist Agency of the Year 2023' },
  { key: 'bayut', award: '2nd Agency of the Year 2023' },
  { key: 'bayut', award: 'Agency of the Month 2023' },
  { key: 'bayut', award: 'Agent of the Year — 1st Runner Up 2024' },
  { key: 'bayut', award: 'Agent of the Year — 1st Runner Up 2025' },
  // Dubizzle
  { key: 'dubizzle', award: 'Agency of the Month 2022' },
  { key: 'dubizzle', award: 'Agency of the Month 2024' },
  { key: 'dubizzle', award: 'Top Deal Makers 2025' },
  { key: 'dubizzle', award: 'Ruby Club — Agency of the Year 2025' },
  // Uniestate
  { key: 'uniestate', award: 'Digital Partner Award 2025' },
]

export default function AwardsBanner() {
  // Duplicated so the marquee can loop seamlessly.
  const items = [...AWARDS, ...AWARDS, ...AWARDS].map((a) => ({ ...a, node: NODE[a.key] }))
  return (
    <div className="ab-strip">
      <div className="ab-label">
        Recognised by the leading brands for the following awards
      </div>
      <div className="ab-track-wrap">
        <div className="ab-track">
          {items.map((p, i) => (
            <span key={`${p.key}-${i}`} className={`ab-item ab-logo--${p.key}`}>
              <span className="ab-logo">{p.node}</span>
              <span className="ab-award">{p.award}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
