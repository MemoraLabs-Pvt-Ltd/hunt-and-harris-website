import { GUIDES } from '../data/guides'
import './Guides.css'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function Guides() {
  return (
    <section className="gd-sec">
      <div className="gd-hero">
        <h1 className="gd-title">
          Free property <span className="gd-title-italic">guides</span><br />
          to help you decide with confidence
        </h1>
        <p className="gd-sub">
          Download our expert guides on buying, selling, renting and off-plan investing in
          Ras Al Khaimah — practical, no-nonsense advice from the Hunt &amp; Harris Real Estate team.
        </p>
      </div>

      <div className="gd-grid">
        {GUIDES.map((g) => (
          <div className="gd-card" key={g.slug}>
            <div className="gd-card-img">
              <img src={g.img} alt={g.title} loading="lazy" />
              <span className="gd-card-badge">PDF</span>
            </div>
            <div className="gd-card-body">
              <h3 className="gd-card-title">{g.title}</h3>
              <p className="gd-card-desc">{g.desc}</p>
              <a className="gd-card-btn" href={g.file} download target="_blank" rel="noopener noreferrer">
                <DownloadIcon /> Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
