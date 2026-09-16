import './Footer.css'
import FloatingWhatsApp from './FloatingWhatsApp'

export default function Footer() {
  return (
    <footer style={{ margin: 0, padding: 0 }}>
      <FloatingWhatsApp />
      <div style={{ background: '#0a0a0a' }}>
        <div className="footer-inner">

          {/* Main grid */}
          <div className="footer-main-grid">

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
              <img src="/homepage/hhlogo.svg" alt="Hunt & Harris" style={{ height: '36px', width: 'auto', display: 'block', margin: 0, padding: 0 }} />

              <div>
                <p style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>General Info</p>
                <address
                  style={{
                    fontStyle: 'normal',
                    fontFamily: "'FH Oscar', 'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(22px, 2.2vw, 32px)',
                    lineHeight: 1.35,
                    color: '#ffffff',
                    marginBottom: '16px',
                    display: 'block',
                  }}
                >
                  UG-01 Amenity Centre, RAKEZ<br />
                  Al Hamra Industrial Zone – FZ,<br />
                  P.O Box 6439<br />
                  Ras Al Khaimah,<br />
                  United Arab Emirates
                </address>

                <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href="mailto:info@huntandharris.com" style={{ display: 'block', color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>
                    info@huntandharris.com
                  </a>
                  <a href="tel:+97172434005" style={{ display: 'block', color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>
                    +971 7 243 4005
                  </a>
                </div>

                <p style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Opening Hours</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <li style={{ color: '#9ca3af', fontSize: '14px' }}>Monday to Friday: 9 AM to 6 PM</li>
                  <li style={{ color: '#9ca3af', fontSize: '14px' }}>Saturday: 10 AM to 4 PM</li>
                  <li style={{ color: '#9ca3af', fontSize: '14px' }}>Sunday: Closed</li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div>
              {/* Awards pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
                {['Bayut Award Winner', 'Dubizzle Top Agency', 'PropertyFinder Excellence', 'Women in Leadership'].map(award => (
                  <span
                    key={award}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '6px 16px', cursor: 'default', color: '#9ca3af', fontSize: '12px' }}
                  >
                    {award}
                  </span>
                ))}
              </div>

              {/* Nav columns */}
              <div className="footer-nav-grid">
                <div>
                  <p style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '18px' }}>Navigation</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {['Home', 'Listings', 'About Us', 'Off Plan', 'Services', 'Blogs'].map(item => (
                      <li key={item}><a href="#" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '18px' }}>Information</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {['FAQ', 'Contact', 'Privacy Policy', 'Conveyancing', 'Pay Online', 'Portals'].map(item => (
                      <li key={item}><a href="#" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>{item}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '18px' }}>Socials</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { label: 'Instagram', href: 'https://www.instagram.com/huntandharrisuae' },
                      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hunt-and-harris-real-estate/' },
                      { label: 'Facebook', href: 'https://www.facebook.com/share/193JrmfeLT/?mibextid=wwXIfr' },
                      { label: 'YouTube', href: 'https://youtube.com/@huntharrisrealestate' },
                    ].map(({ label, href }) => (
                      <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>{label}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom-bar">
            <p style={{ color: '#d1d5db', fontSize: '12px', lineHeight: 1.6 }}>
              © Copyright {new Date().getFullYear()} Hunt &amp; Harris Real Estate — All rights reserved. RERA Licensed.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              All data and communications are handled in accordance with applicable data protection laws and enterprise-grade security standards. Hunt &amp; Harris makes no representations or warranties regarding property valuations, legal compliance, or financial outcomes resulting from the use of any information provided.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              All third-party references, analyses, or data are provided "as is," and Hunt &amp; Harris assumes no responsibility for their accuracy, completeness, or continued availability. Hunt &amp; Harris does not provide accounting, tax, or regulatory advice unless explicitly agreed upon through a separate written agreement. Users are responsible for ensuring the accuracy of their financial records and maintaining compliance with all relevant local, national, or international regulations. Hunt &amp; Harris is not responsible for any losses resulting from misinterpretation, errors, or omissions in the information provided.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              Hunt &amp; Harris is a licensed real estate agency registered in Ras Al Khaimah, UAE. For questions related to the information provided or data security, please refer to our Privacy Policy or contact{' '}
              <a href="mailto:info@huntandharris.com" style={{ color: '#6b7280', textDecoration: 'underline' }}>
                info@huntandharris.com
              </a>.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
