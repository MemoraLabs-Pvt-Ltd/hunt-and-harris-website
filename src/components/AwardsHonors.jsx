import './AwardsHonors.css'

const AWARDS = [
  {
    accent: '#3aa75a', // Bayut green
    letter: 'B',
    brand: 'Bayut',
    titleMain: 'Top Agency',
    titleSerif: 'Excellence',
    year: '2025',
    to: 'This award is proudly presented to',
    name: 'Hunt & Harris',
    desc: "Recognized as one of Bayut's highest-rated agencies in Ras Al Khaimah for consistent service and results.",
  },
  {
    accent: '#ef5e4e', // Property Finder coral
    letter: 'P',
    brand: 'Property Finder',
    titleMain: 'Community',
    titleSerif: 'Superagent',
    year: '2026',
    to: 'This certificate is proudly presented to',
    name: 'Hunt & Harris',
    desc: 'Awarded for outstanding client ratings and market leadership across the Property Finder platform.',
    signed: true,
  },
  {
    accent: '#c1912f', // Women in Leadership gold
    letter: 'W',
    brand: 'Women in Leadership',
    titleMain: 'Real Estate',
    titleSerif: 'Leadership',
    year: '2025',
    to: 'This honour is proudly presented to',
    name: 'Neema Kataria & Wendy Stapleton',
    desc: 'Celebrating the women leading Hunt & Harris and shaping the RAK property industry.',
  },
]

export default function AwardsHonors() {
  return (
    <section className="aw-sec">
      <div className="aw-pill">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h12v3a6 6 0 0 1-12 0V4z" />
          <path d="M6 5H3v1a3 3 0 0 0 3 3M18 5h3v1a3 3 0 0 1-3 3" />
          <path d="M12 13v4M8 21h8M9 21a3 3 0 0 1 6 0" />
        </svg>
        Industry Recognition
      </div>

      <h2 className="aw-title">
        <span className="aw-title-italic">Awards</span> &amp; Honors
      </h2>

      <p className="aw-sub">
        Our work has been recognized with <b>55+ awards</b> from the region&rsquo;s most trusted
        names &mdash; <b>Bayut</b>, <b>Dubizzle</b>, <b>Property Finder</b> and the{' '}
        <b>Women in Leadership Awards</b>.
      </p>

      <div className="aw-grid">
        {AWARDS.map((a) => (
          <article className="aw-card" key={a.brand}>
            <div className="aw-card-head">
              <span className="aw-card-mark" style={{ background: a.accent }}>{a.letter}</span>
              <span className="aw-card-brand">
                {a.brand}
                <span className="aw-card-brand-sub">award</span>
              </span>
            </div>

            <div className="aw-card-title">
              <span className="aw-card-title-main">{a.titleMain}</span>
              <span className="aw-card-title-line">
                <span className="aw-card-title-serif">{a.titleSerif}</span>
                <span className="aw-card-title-year">{a.year}</span>
              </span>
            </div>

            <div className="aw-card-body">
              <p className="aw-card-to">{a.to}</p>
              <p className="aw-card-name">{a.name}</p>
              <p className="aw-card-desc">{a.desc}</p>
            </div>

            {a.signed && (
              <div className="aw-card-sign">
                <span className="aw-card-sign-scribble">✎</span>
                <span className="aw-card-sign-name">
                  N.S.
                  <span className="aw-card-sign-role">Founder &amp; Award Director</span>
                </span>
              </div>
            )}

            <span className="aw-badge" style={{ '--accent': a.accent }}>{a.letter}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
