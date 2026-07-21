import { useState } from 'react'
import PortalShell from './PortalShell'

const I = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>,
  building: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V4h8v17M14 21V9h4v12M9 8h.01M9 12h.01M9 16h.01" /></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M8 14v4M13 9v9M18 6v12" /></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 3 3 6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z" /></svg>,
  wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 14h2" /></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" /></svg>,
}

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&h=300&q=80`

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: I.home },
  { key: 'properties', label: 'My Properties', icon: I.building },
  { key: 'financials', label: 'Financials', icon: I.wallet },
  { key: 'maintenance', label: 'Maintenance', icon: I.wrench, badge: 2 },
]

const PROPERTIES = [
  { name: 'Marina Vista · 1204', loc: 'Al Marjan Island', rent: 'AED 145,000/yr', status: ['Occupied', 'green'], tenant: 'J. Thornton · ends Mar 2027', img: IMG('1600585154340-be6161a56a0c') },
  { name: 'Lagoon Views · Villa 8', loc: 'Al Hamra Village', rent: 'AED 220,000/yr', status: ['Occupied', 'green'], tenant: 'A. Foster · ends Aug 2026', img: IMG('1600607687939-ce8a6c25118c') },
  { name: 'Gateway Residences · 706', loc: 'Mina Al Arab', rent: 'AED 98,000/yr', status: ['Vacant', 'amber'], tenant: 'Available to let', img: IMG('1568605114967-8130f3a36994') },
  { name: 'Bab Al Bahr · 312', loc: 'Al Hamra Village', rent: 'AED 110,000/yr', status: ['Occupied', 'green'], tenant: 'E. Volkov · ends Jan 2027', img: IMG('1600596542815-ffad4c1539a9') },
]

const STATEMENTS = [
  { month: 'June 2026', collected: 'AED 47,750', fees: 'AED 2,388', payout: 'AED 45,362', status: ['Paid out', 'green'] },
  { month: 'May 2026', collected: 'AED 47,750', fees: 'AED 2,388', payout: 'AED 45,362', status: ['Paid out', 'green'] },
  { month: 'April 2026', collected: 'AED 39,500', fees: 'AED 1,975', payout: 'AED 37,525', status: ['Paid out', 'green'] },
  { month: 'July 2026', collected: 'AED 47,750', fees: 'AED 2,388', payout: 'AED 45,362', status: ['Processing', 'blue'] },
]

const APPROVALS = [
  { title: 'Marina Vista 1204 — AC compressor replacement', quote: 'Quote: AED 1,850', status: ['Awaiting approval', 'amber'] },
  { title: 'Bab Al Bahr 312 — repaint living room', quote: 'Quote: AED 1,200', status: ['Awaiting approval', 'amber'] },
  { title: 'Lagoon Views Villa 8 — pool servicing', quote: 'AED 600 · approved', status: ['Approved', 'green'] },
]

export default function LandlordPortal() {
  const [active, setActive] = useState('dashboard')
  const user = { name: 'Neema Kataria', meta: '4 properties', initials: 'NK', greeting: 'Welcome back, Neema' }

  return (
    <PortalShell role="Landlord" brandColor="#3f86bd" navItems={NAV} active={active} setActive={setActive} user={user}>
      {active === 'dashboard' && <Dashboard />}
      {active === 'properties' && <Properties />}
      {active === 'financials' && <Financials />}
      {active === 'maintenance' && <Maintenance />}
    </PortalShell>
  )
}

function Dashboard() {
  return (
    <>
      <div className="pt-stats">
        <Stat icon={I.building} value="4" label="Properties" />
        <Stat icon={I.users} value="75%" label="Occupancy" />
        <Stat icon={I.wallet} value="AED 47,750" label="Monthly rent" />
        <Stat icon={I.chart} value="AED 573K" label="Income YTD" />
      </div>

      <div className="pt-grid">
        <div className="pt-card">
          <div className="pt-card-head"><span className="pt-card-title">Portfolio</span><span className="pt-card-link">View all</span></div>
          <div className="pt-list">
            {PROPERTIES.slice(0, 3).map((p, i) => (
              <div className="pt-row" key={i}>
                <img className="pt-row-icon" style={{ objectFit: 'cover', width: 44, height: 44 }} src={p.img} alt="" />
                <div className="pt-row-main"><div className="pt-row-title">{p.name}</div><div className="pt-row-sub">{p.loc} · {p.rent}</div></div>
                <span className={`pt-tag pt-tag--${p.status[1]}`}>{p.status[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-card pt-due">
          <div className="pt-card-head"><span className="pt-card-title">Next Payout</span></div>
          <div className="pt-due-amount">AED 45,362</div>
          <div className="pt-due-meta">July statement · processing</div>
          <div className="pt-due-btn" style={{ cursor: 'default' }}>Expected 05 Aug 2026</div>
        </div>
      </div>
    </>
  )
}

function Properties() {
  return (
    <div className="pt-props">
      {PROPERTIES.map((p, i) => (
        <div className="pt-prop" key={i}>
          <img className="pt-prop-img" src={p.img} alt={p.name} />
          <div className="pt-prop-body">
            <div className="pt-prop-name">{p.name}</div>
            <div className="pt-prop-loc">{p.loc}</div>
            <div className="pt-prop-loc" style={{ marginTop: 6 }}>{p.tenant}</div>
            <div className="pt-prop-foot">
              <span className="pt-prop-rent">{p.rent}</span>
              <span className={`pt-tag pt-tag--${p.status[1]}`}>{p.status[0]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Financials() {
  return (
    <div className="pt-card">
      <div className="pt-card-head"><span className="pt-card-title">Owner Statements</span></div>
      <div className="pt-table-wrap">
        <table className="pt-table">
          <thead><tr><th>Month</th><th>Rent collected</th><th>Mgmt fee</th><th>Payout</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {STATEMENTS.map((s, i) => (
              <tr key={i}>
                <td>{s.month}</td><td style={{ fontWeight: 400 }}>{s.collected}</td><td style={{ fontWeight: 400 }}>{s.fees}</td>
                <td>{s.payout}</td><td><span className={`pt-tag pt-tag--${s.status[1]}`}>{s.status[0]}</span></td>
                <td><button className="pt-icon-btn" aria-label="Download">{I.download}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Maintenance() {
  return (
    <div className="pt-card">
      <div className="pt-card-head"><span className="pt-card-title">Maintenance & Approvals</span></div>
      <div className="pt-list">
        {APPROVALS.map((a, i) => (
          <div className="pt-row" key={i}>
            <span className="pt-row-icon">{I.wrench}</span>
            <div className="pt-row-main"><div className="pt-row-title">{a.title}</div><div className="pt-row-sub">{a.quote}</div></div>
            {a.status[0] === 'Awaiting approval'
              ? <button className="pt-btn" style={{ padding: '9px 18px', fontSize: 13 }}>Approve</button>
              : <span className={`pt-tag pt-tag--${a.status[1]}`}>{a.status[0]}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className="pt-stat">
      <span className="pt-stat-icon">{icon}</span>
      <div className="pt-stat-value">{value}</div>
      <div className="pt-stat-label">{label}</div>
    </div>
  )
}
