import './AwardsBanner.css'

// The portals / organisations that have recognised Hunt & Harris Real Estate.
// Each logo travels through the marquee with its recent award caption beneath it
// (recognition + year — no recipient). Rendered as brand wordmarks (grayscale by
// default, full colour on hover). Swap for official logo files in /public later.
const PLATFORMS = [
  { key: 'propertyfinder', node: (<span><b>property</b>finder</span>), award: 'Winner — Quality Brokerage 2023' },
  { key: 'bayut',          node: (<span>bayut</span>),                award: 'Agency of the Year 2020' },
  { key: 'dubizzle',       node: (<span>dubizzle</span>),            award: 'Ruby Club — Agency of the Year 2025' },
  { key: 'uniestate',      node: (<span>UNIESTATE</span>),           award: 'Digital Partner Award 2025' },
]

export default function AwardsBanner() {
  // Duplicated so the marquee can loop seamlessly.
  const items = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS]
  return (
    <div className="ab-strip">
      <div className="ab-label">
        Recognised by the leading<br />portals for the following awards
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
