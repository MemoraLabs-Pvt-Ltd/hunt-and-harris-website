import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

const PRIMARY_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Listings', href: '/listings' },
  { label: 'About Us', href: '/about' },
  { label: 'Off Plan', href: '/#properties' },
  { label: 'Services', href: '/services' },
]

// Routes whose hero has a light background — the navbar must use dark text at the top
const LIGHT_HERO_PATHS = ['/services', '/blog', '/pay-online']

// Which nav link matches the current route (falls back to Home)
const linkForPath = (pathname) =>
  [...PRIMARY_LINKS, ...EXTRA_LINKS].find(l => l.href === pathname)?.label ?? 'Home'

const EXTRA_LINKS = [
  { label: 'Blogs',        href: '/blog' },
  { label: 'Conveyancing', href: '#conveyancing' },
  { label: 'Pay Online',   href: '/pay-online' },
]

const PORTAL_LINKS = [
  { label: 'Tenant Portal',   href: '#tenant-portal' },
  { label: 'Landlord Portal', href: '#landlord-portal' },
]

export default function Navbar() {
  const location = useLocation()
  const [active, setActive]           = useState(() => linkForPath(location.pathname))
  const [isTop, setIsTop]             = useState(true)
  const [portalsOpen, setPortalsOpen] = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [portalPos, setPortalPos]     = useState({ top: 0, left: 0 })

  const portalsButtonRef = useRef(null)
  const closeTimer       = useRef(null)

  // Light-text treatment only when pinned at the top over a dark hero
  const lightHero = LIGHT_HERO_PATHS.includes(location.pathname)
  const navLight = isTop && !lightHero

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link that matches the current route
  useEffect(() => {
    setActive(linkForPath(location.pathname))
  }, [location.pathname])

  const openPortals = () => {
    clearTimeout(closeTimer.current)
    if (portalsButtonRef.current) {
      const rect = portalsButtonRef.current.getBoundingClientRect()
      setPortalPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 })
    }
    setPortalsOpen(true)
  }

  const closePortals = () => {
    closeTimer.current = setTimeout(() => setPortalsOpen(false), 150)
  }

  const pillLink = (label, href) => (
    <a
      key={label}
      href={href}
      onClick={() => setActive(label)}
      style={{
        display: 'block',
        padding: '6px 14px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: active === label ? 600 : 500,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        transition: 'background 180ms, color 180ms',
        backgroundColor: active === label ? '#7ab4d8' : 'transparent',
        color: navLight ? '#ffffff' : '#111110',
      }}
    >
      {label}
    </a>
  )

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 28px',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ flexShrink: 0 }}>
        <img src="/homepage/hhlogo.svg" alt="Hunt & Harris" style={{ height: 36, width: 'auto' }} />
      </a>

      {/* Desktop pill nav */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 1,
          backgroundColor: navLight ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 999,
          padding: '4px 6px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
        className="desktop-nav"
      >
        {/* Primary links — always visible */}
        {PRIMARY_LINKS.map(l => pillLink(l.label, l.href))}

        {/* Extra links + Portals — grid 1fr→0fr for butter-smooth collapse */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isTop ? '1fr' : '0fr',
            opacity: isTop ? 1 : 0,
            transition: 'grid-template-columns 1800ms cubic-bezier(0.16,1,0.3,1), opacity 1800ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            {EXTRA_LINKS.map(l => pillLink(l.label, l.href))}

            {/* Portals button */}
            <button
              ref={portalsButtonRef}
              onMouseEnter={openPortals}
              onMouseLeave={closePortals}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: portalsOpen ? 600 : 500,
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'inherit',
                transition: 'background 180ms, color 180ms',
                backgroundColor: portalsOpen ? 'rgba(255,255,255,0.22)' : 'transparent',
                color: navLight ? '#ffffff' : '#111110',
                whiteSpace: 'nowrap',
              }}
            >
              Portals
              <svg
                style={{
                  width: 12, height: 12,
                  transform: portalsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms',
                }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contact us CTA */}
      <a
        href="#contact"
        style={{
          display: 'none',
          padding: '8px 20px',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: '#7ab4d8',
          textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        className="desktop-cta"
      >
        Contact us
      </a>

      {/* Mobile hamburger */}
      <button
        style={{
          padding: '7px', borderRadius: 999,
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#1f2937',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer', border: 'none',
        }}
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <div style={{ width: 18, height: 2, background: 'currentColor', marginBottom: 4 }} />
        <div style={{ width: 18, height: 2, background: 'currentColor', marginBottom: 4 }} />
        <div style={{ width: 18, height: 2, background: 'currentColor' }} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 16, right: 16, marginTop: 8,
          backgroundColor: '#ffffff', borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          padding: '14px 18px',
        }}>
          {[...PRIMARY_LINKS, ...EXTRA_LINKS, ...PORTAL_LINKS].map((l, i, arr) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => { setActive(l.label); setMenuOpen(false) }}
              style={{
                display: 'block', padding: '11px 0',
                color: '#374151', fontWeight: 500, fontSize: 14,
                textDecoration: 'none',
                borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block', marginTop: 10,
              backgroundColor: '#7ab4d8', color: '#ffffff',
              textAlign: 'center', padding: '11px', borderRadius: 999,
              fontWeight: 600, textDecoration: 'none', fontSize: 14,
            }}
          >
            Contact us
          </a>
        </div>
      )}

      {/* Portals portal dropdown */}
      {portalsOpen && createPortal(
        <div
          style={{ position: 'fixed', top: portalPos.top, left: portalPos.left, transform: 'translateX(-50%)', zIndex: 9999 }}
          onMouseEnter={openPortals}
          onMouseLeave={closePortals}
        >
          <div style={{
            backgroundColor: '#ffffff', borderRadius: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
            padding: '6px 0', minWidth: 180,
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            {PORTAL_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  display: 'block', padding: '9px 16px',
                  fontSize: 13, color: '#374151', textDecoration: 'none',
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav  { display: flex !important; }
          .desktop-cta  { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
