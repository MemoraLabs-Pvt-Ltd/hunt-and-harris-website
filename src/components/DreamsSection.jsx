import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import './DreamsSection.css'

const IconAgents = () => (
  <img src="/homepage/experiencedagents.png" alt="Experienced agents" style={{ width: 32, height: 32, objectFit: 'contain' }} />
)

const IconLegality = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#111110" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="14"/>
    <path d="M13 23l10-10"/>
    <circle cx="13.5" cy="13.5" r="1.5" fill="#111110" stroke="none"/>
    <circle cx="22.5" cy="22.5" r="1.5" fill="#111110" stroke="none"/>
  </svg>
)

const IconYear = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#111110" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="8" width="28" height="24" rx="3"/>
    <path d="M4 15h28"/>
    <path d="M12 4v8M24 4v8"/>
    <rect x="10" y="20" width="4" height="4" rx="1"/>
    <rect x="22" y="20" width="4" height="4" rx="1"/>
  </svg>
)

const IconStar = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#111110" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4l3.6 7.3L30 12.5l-6 5.8 1.4 8.2L18 22.5l-7.4 4 1.4-8.2-6-5.8 8.4-1.2L18 4z"/>
  </svg>
)

const features = [
  { Icon: IconAgents,   title: 'Experienced agents',    body: 'Discover the best properties to match your budget and lifestyle.' },
  { Icon: IconLegality, title: 'Clear legality',        body: 'Full legal transparency with in-house conveyancing at every step.' },
  { Icon: IconYear,     title: 'Est. Since 2007',       body: 'Over 17 years of trusted real estate counsel in Ras Al Khaimah.' },
  { Icon: IconStar,     title: 'Rated 4.8+ on Google',  body: 'Consistently top-rated by buyers, investors and families across the UAE.' },
]

export default function DreamsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section className="ds-sec" ref={sectionRef}>
      <h2 className="ds-title">Making your dreams come true with our advisors</h2>

      <div className="ds-grid">

        {/* Image stack */}
        <div className="ds-img-stack">
          <div className="ds-img-main-wrap">
            <img
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury property"
              className="ds-img"
            />
          </div>
          <div className="ds-img-row">
            <div className="ds-img-small-wrap">
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=85"
                alt="Property interior"
                className="ds-img"
              />
            </div>
            <div className="ds-img-small-wrap">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=85"
                alt="Property exterior"
                className="ds-img"
              />
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="ds-content">
          <p className="ds-mission">
            Our mission is to provide a seamless and expert experience for individuals and families searching for their perfect property in Ras Al Khaimah.
            <span className="ds-mission-ext"> With over 17 years of local expertise, we go beyond transactions — building lasting relationships rooted in trust, transparency, and a genuine understanding of what home means to you.</span>
          </p>
          <p className="ds-mission ds-mission-ext">
            Whether you are a first-time buyer navigating the market for the very first time, a seasoned investor expanding your portfolio, or a family looking for the right community to call home — Hunt &amp; Harris brings the knowledge, integrity, and dedication to make every step of your journey feel effortless.
          </p>
          <a href="/about" className="ds-btn">
            Read More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          <div className="ds-rule" />

          <div className="ds-features">
            {features.map(({ Icon, title, body }, i) => (
              <motion.div
                className="ds-feature"
                key={title}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 2.4, delay: 0.4 + i * 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <Icon />
                <h4 className="ds-feat-title">{title}</h4>
                <p className="ds-feat-body">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
