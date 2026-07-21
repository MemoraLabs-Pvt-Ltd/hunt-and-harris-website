import { useState } from 'react'
import PortalShell from './PortalShell'

const I = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>,
  card: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 3 3 6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" /></svg>,
}

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: I.home },
  { key: 'payments', label: 'Rent & Payments', icon: I.card },
  { key: 'maintenance', label: 'Maintenance', icon: I.wrench, badge: 1 },
  { key: 'documents', label: 'Documents', icon: I.doc },
]

const PAYMENTS = [
  { date: '01 Jul 2026', desc: 'Rent — Q3 instalment', amount: 'AED 42,000', status: ['Paid', 'green'] },
  { date: '01 Apr 2026', desc: 'Rent — Q2 instalment', amount: 'AED 42,000', status: ['Paid', 'green'] },
  { date: '01 Oct 2026', desc: 'Rent — Q4 instalment', amount: 'AED 42,000', status: ['Upcoming', 'blue'] },
  { date: '05 Feb 2026', desc: 'Security deposit', amount: 'AED 8,400', status: ['Paid', 'green'] },
]

const REQUESTS = [
  { title: 'AC not cooling — master bedroom', date: 'Raised 12 Jul 2026', status: ['In Progress', 'amber'] },
  { title: 'Kitchen tap leak', date: 'Resolved 28 Jun 2026', status: ['Resolved', 'green'] },
]

const DOCS = [
  ['Tenancy Contract 2026', 'PDF · 240 KB'],
  ['Ejari Certificate', 'PDF · 180 KB'],
  ['Rent Receipt — Q2', 'PDF · 96 KB'],
  ['Move-in Inspection Report', 'PDF · 1.2 MB'],
]

export default function TenantPortal() {
  const [active, setActive] = useState('dashboard')
  const user = { name: 'Sarah Mitchell', meta: 'Al Hamra Village', initials: 'SM', greeting: 'Welcome back, Sarah' }

  return (
    <PortalShell
      role="Tenant"
      brandColor="#7ab4d8"
      navItems={NAV}
      active={active}
      setActive={setActive}
      user={user}
    >
      {active === 'dashboard' && <Dashboard />}
      {active === 'payments' && <Payments />}
      {active === 'maintenance' && <Maintenance />}
      {active === 'documents' && <Documents />}
    </PortalShell>
  )
}

function Dashboard() {
  return (
    <>
      <div className="pt-stats">
        <Stat icon={I.card} value="AED 42,000" label="Next rent due · 01 Oct" />
        <Stat icon={I.calendar} value="04 Feb 2027" label="Lease ends" />
        <Stat icon={I.wrench} value="1" label="Open request" />
        <Stat icon={I.doc} value="4" label="Documents" />
      </div>

      <div className="pt-grid">
        <div className="pt-card">
          <div className="pt-card-head">
            <span className="pt-card-title">Recent Activity</span>
          </div>
          <div className="pt-list">
            <Row icon={I.card} title="Q2 rent payment received" sub="01 Apr 2026" value="AED 42,000" />
            <Row icon={I.wrench} title="Maintenance request updated" sub="AC repair — In Progress" />
            <Row icon={I.doc} title="Ejari certificate uploaded" sub="18 Feb 2026" />
            <Row icon={I.calendar} title="Renewal reminder" sub="Lease ends in 6 months" />
          </div>
        </div>

        <div className="pt-card pt-due">
          <div className="pt-card-head"><span className="pt-card-title">Rent Due</span></div>
          <div className="pt-due-amount">AED 42,000</div>
          <div className="pt-due-meta">Q4 instalment · due 01 October 2026</div>
          <a className="pt-due-btn" href="https://business.mamopay.com/pay/huntandharris" target="_blank" rel="noopener noreferrer">
            Pay Now
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" /></svg>
          </a>
        </div>
      </div>
    </>
  )
}

function Payments() {
  return (
    <div className="pt-card">
      <div className="pt-card-head">
        <span className="pt-card-title">Payment History</span>
        <a className="pt-due-btn" style={{ marginTop: 0, background: '#111110', color: '#fff' }} href="https://business.mamopay.com/pay/huntandharris" target="_blank" rel="noopener noreferrer">Pay Rent</a>
      </div>
      <div className="pt-table-wrap">
        <table className="pt-table">
          <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {PAYMENTS.map((p, i) => (
              <tr key={i}>
                <td>{p.date}</td><td style={{ fontWeight: 400 }}>{p.desc}</td><td>{p.amount}</td>
                <td><span className={`pt-tag pt-tag--${p.status[1]}`}>{p.status[0]}</span></td>
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
    <div className="pt-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="pt-card">
        <div className="pt-card-head"><span className="pt-card-title">Your Requests</span></div>
        <div className="pt-list">
          {REQUESTS.map((r, i) => (
            <div className="pt-row" key={i}>
              <span className="pt-row-icon">{I.wrench}</span>
              <div className="pt-row-main">
                <div className="pt-row-title">{r.title}</div>
                <div className="pt-row-sub">{r.date}</div>
              </div>
              <span className={`pt-tag pt-tag--${r.status[1]}`}>{r.status[0]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-card">
        <div className="pt-card-head"><span className="pt-card-title">Raise a New Request</span></div>
        <form className="pt-form" onSubmit={(e) => e.preventDefault()}>
          <div className="pt-field"><label className="pt-label">Category</label>
            <select className="pt-input"><option>Air Conditioning</option><option>Plumbing</option><option>Electrical</option><option>Appliances</option><option>Other</option></select>
          </div>
          <div className="pt-field"><label className="pt-label">Describe the issue</label>
            <textarea className="pt-input" rows={4} placeholder="Tell us what needs attention…" /></div>
          <button className="pt-btn" type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  )
}

function Documents() {
  return (
    <div className="pt-card">
      <div className="pt-card-head"><span className="pt-card-title">Your Documents</span></div>
      <div className="pt-list">
        {DOCS.map(([name, meta], i) => (
          <div className="pt-row" key={i}>
            <span className="pt-row-icon">{I.doc}</span>
            <div className="pt-row-main"><div className="pt-row-title">{name}</div><div className="pt-row-sub">{meta}</div></div>
            <button className="pt-icon-btn" aria-label="Download">{I.download}</button>
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
function Row({ icon, title, sub, value }) {
  return (
    <div className="pt-row">
      <span className="pt-row-icon">{icon}</span>
      <div className="pt-row-main"><div className="pt-row-title">{title}</div><div className="pt-row-sub">{sub}</div></div>
      {value && <span className="pt-row-value">{value}</span>}
    </div>
  )
}
