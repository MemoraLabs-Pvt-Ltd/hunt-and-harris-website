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
              <img src="/homepage/hhlogo.svg" alt="Hunt & Harris Real Estate" style={{ height: '36px', width: 'auto', display: 'block', margin: 0, padding: 0 }} />

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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {['Bayut Award Winner', 'Dubizzle Top Agency', 'PropertyFinder Excellence', 'Women in Leadership'].map(award => (
                  <span
                    key={award}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '6px 16px', cursor: 'default', color: '#9ca3af', fontSize: '12px' }}
                  >
                    {award}
                  </span>
                ))}
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
                {[
                  { label: 'Instagram', href: 'https://www.instagram.com/huntandharrisuae', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.95c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94zm5.82-7.74a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z' },
                  { label: 'Facebook', href: 'https://www.facebook.com/HuntandHarrisUAE/', path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94z' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hunt-and-harris-real-estate/', path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.02 8h4.96v16H.02V8zm7.5 0h4.75v2.2h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.92 3.29 5.92 7.57V24h-4.96v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24H7.52V8z' },
                  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCuKDEZaMLE01ghyAJXrjANQ/featured', path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z' },
                ].map(({ label, href, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`footer-social-icon fs-${label.toLowerCase()}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
                  </a>
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
                      { label: 'Facebook', href: 'https://www.facebook.com/HuntandHarrisUAE/' },
                      { label: 'YouTube', href: 'https://www.youtube.com/channel/UCuKDEZaMLE01ghyAJXrjANQ/featured' },
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
              © Copyright {new Date().getFullYear()} Hunt &amp; Harris Real Estate — All rights reserved.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              All data and communications are handled in accordance with applicable data protection laws and enterprise-grade security standards. Hunt &amp; Harris Real Estate makes no representations or warranties regarding property valuations, legal compliance, or financial outcomes resulting from the use of any information provided.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              All third-party references, analyses, or data are provided "as is," and Hunt &amp; Harris Real Estate assumes no responsibility for their accuracy, completeness, or continued availability. Hunt &amp; Harris Real Estate does not provide accounting, tax, or regulatory advice unless explicitly agreed upon through a separate written agreement. Users are responsible for ensuring the accuracy of their financial records and maintaining compliance with all relevant local, national, or international regulations. Hunt &amp; Harris Real Estate is not responsible for any losses resulting from misinterpretation, errors, or omissions in the information provided.
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6 }}>
              Hunt &amp; Harris Real Estate is a licensed real estate agency registered in Ras Al Khaimah, UAE. For questions related to the information provided or data security, please refer to our Privacy Policy or contact{' '}
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
