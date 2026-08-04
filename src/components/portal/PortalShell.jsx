import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../seo/Seo'
import './Portal.css'

export default function PortalShell({ role, brandColor, navItems, active, setActive, user, title, children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeItem = navItems.find((n) => n.key === active)

  return (
    <div className="pt-shell">
      <Seo title={`${role} Portal`} noindex />
      <aside className={`pt-sidebar${menuOpen ? ' is-open' : ''}`}>
        <Link to="/" className="pt-logo">
          <img src="/homepage/hhlogo.svg" alt="Hunt & Harris" />
        </Link>

        <div className="pt-role" style={{ color: brandColor }}>{role} Portal</div>

        <nav className="pt-nav">
          {navItems.map((n) => (
            <button
              key={n.key}
              className={`pt-nav-item${active === n.key ? ' is-active' : ''}`}
              onClick={() => { setActive(n.key); setMenuOpen(false) }}
            >
              <span className="pt-nav-icon">{n.icon}</span>
              {n.label}
              {n.badge ? <span className="pt-nav-badge">{n.badge}</span> : null}
            </button>
          ))}
        </nav>

        <div className="pt-user">
          <span className="pt-avatar" style={{ background: brandColor }}>{user.initials}</span>
          <div className="pt-user-info">
            <span className="pt-user-name">{user.name}</span>
            <span className="pt-user-meta">{user.meta}</span>
          </div>
        </div>
        <Link to="/portal/login" className="pt-logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Log out
        </Link>
      </aside>

      {menuOpen && <div className="pt-scrim" onClick={() => setMenuOpen(false)} />}

      <div className="pt-main">
        <header className="pt-topbar">
          <button className="pt-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <div className="pt-topbar-title">
            <h1>{title || activeItem?.label}</h1>
            <p>{user.greeting}</p>
          </div>
          <div className="pt-topbar-actions">
            <button className="pt-icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
              <span className="pt-dot" />
            </button>
            <span className="pt-avatar pt-avatar--sm" style={{ background: brandColor }}>{user.initials}</span>
          </div>
        </header>

        <div className="pt-content">{children}</div>
      </div>
    </div>
  )
}
