import './AwardsBanner.css'

// The portals / organisations that have recognised Hunt & Harris Real Estate.
// Rendered as brand wordmarks (grayscale by default, full colour on hover).
// Swap these for official logo files in /public if/when provided.
const PLATFORMS = [
  { key: 'propertyfinder', node: (<span><b>property</b>finder</span>) },
  { key: 'bayut',          node: (<span>bayut</span>) },
  { key: 'dubizzle',       node: (<span>dubizzle</span>) },
  { key: 'uniestate',      node: (<span>UNIESTATE</span>) },
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
            <span key={`${p.key}-${i}`} className={`ab-logo ab-logo--${p.key}`}>{p.node}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
