import './ContactUs.css'

const PHONE = '+971 7 243 4005'
const PHONE_TEL = '+97172434005'
const EMAIL = 'info@huntandharris.com'

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
)
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
)
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)

export default function ContactUs() {
  return (
    <section className="cu">
      <div className="cu-hero">
        <div className="cu-hero-text">
          <span className="cu-kicker">Get in touch</span>
          <h1 className="cu-title">
            Let&rsquo;s find your <span className="cu-italic">place</span><br />in Ras Al Khaimah
          </h1>
          <p className="cu-sub">
            Buying, renting, selling or investing — our team is here to help with honest advice,
            quick answers and zero pressure. Reach out and we&rsquo;ll get back to you fast.
          </p>
          <div className="cu-actions">
            <a className="cu-btn cu-btn--primary" href={`tel:${PHONE_TEL}`}><IconPhone /> Call us</a>
            <a className="cu-btn cu-btn--ghost" href={`mailto:${EMAIL}`}><IconMail /> Email us</a>
          </div>
        </div>

        <div className="cu-hero-media">
          <img src="/about-us/team.png" alt="The Hunt &amp; Harris team" />
        </div>
      </div>

      <div className="cu-info">
        <div className="cu-card">
          <span className="cu-card-icon"><IconPin /></span>
          <h3 className="cu-card-title">Visit us</h3>
          <p className="cu-card-text">UG-01 Amenity Centre, RAKEZ<br />Al Hamra Industrial Zone &ndash; FZ<br />Ras Al Khaimah, UAE</p>
        </div>
        <div className="cu-card">
          <span className="cu-card-icon"><IconPhone /></span>
          <h3 className="cu-card-title">Call us</h3>
          <a className="cu-card-link" href={`tel:${PHONE_TEL}`}>{PHONE}</a>
        </div>
        <div className="cu-card">
          <span className="cu-card-icon"><IconMail /></span>
          <h3 className="cu-card-title">Email us</h3>
          <a className="cu-card-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="cu-card">
          <span className="cu-card-icon"><IconClock /></span>
          <h3 className="cu-card-title">Opening hours</h3>
          <p className="cu-card-text">Mon&ndash;Fri: 9 AM &ndash; 6 PM<br />Saturday: 10 AM &ndash; 4 PM<br />Sunday: Closed</p>
        </div>
      </div>
    </section>
  )
}
