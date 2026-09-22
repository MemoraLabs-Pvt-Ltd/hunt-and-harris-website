import { useState } from 'react'
import PortalShell from './PortalShell'
import { properties } from '../../data/offPlan'
import './Admin.css'

const SHORT = {
  'Al Marjan Island': 'Marjan',
  'Al Hamra Village': 'Al Hamra',
  'Mina Al Arab': 'Mina',
  'Al Zorah': 'Zorah',
  'Ras Al Khaimah City': 'RAK City',
  'Dafan Al Nakheel': 'Dafan',
  'Al Hamriyah': 'Hamriyah',
}
const BY_COMMUNITY = properties.reduce((a, p) => { a[p.location] = (a[p.location] || 0) + 1; return a }, {})

const I = {
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  building: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V4h8v17M14 21V9h4v12M9 8h.01M9 12h.01M9 16h.01" /></svg>,
  inbox: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5 5h14l3 7v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6z" /></svg>,
  pen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>,
  layout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  image: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>,
}

const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&h=300&q=80`

const SUBMISSIONS = [
  { landlord: 'Neema Kataria', prop: '2-Bed Apartment, Marina Vista', loc: 'Al Marjan Island', date: '19 Jul 2026', rent: 'AED 145,000/yr', img: IMG('1600585154340-be6161a56a0c'), status: 'pending' },
  { landlord: 'David Al-Rashid', prop: '4-Bed Villa, Lagoon Views', loc: 'Al Hamra Village', date: '17 Jul 2026', rent: 'AED 320,000/yr', img: IMG('1600607687939-ce8a6c25118c'), status: 'pending' },
  { landlord: 'Elena Volkov', prop: 'Studio, Gateway Residences', loc: 'Mina Al Arab', date: '15 Jul 2026', rent: 'AED 55,000/yr', img: IMG('1568605114967-8130f3a36994'), status: 'pending' },
  { landlord: 'James Thornton', prop: '1-Bed, Pearl Bay', loc: 'Al Marjan Island', date: '12 Jul 2026', rent: 'AED 78,000/yr', img: IMG('1600596542815-ffad4c1539a9'), status: 'approved' },
]

const BLOGS = [
  { title: 'Why RAK Is Outperforming Dubai on Rental Yield', cat: 'Market Reports', date: '01 Jun 2026', status: ['Published', 'green'] },
  { title: 'The Wynn Effect: Al Marjan Values', cat: 'Off-Plan', date: '20 May 2026', status: ['Published', 'green'] },
  { title: 'Buying Freehold in RAK as a Foreign National', cat: 'Buying Guides', date: '—', status: ['Draft', 'gray'] },
  { title: 'RAK Price Trends: H2 2026 Preview', cat: 'Market Reports', date: '—', status: ['Draft', 'gray'] },
]

const MEDIA = ['1600585154340-be6161a56a0c', '1600607687939-ce8a6c25118c', '1568605114967-8130f3a36994', '1600596542815-ffad4c1539a9', '1613490493576-7fde63acd811', '1580587771525-78b9dba3b914', '1570129477492-45c003edd2be', '1512917774080-9991f1c4c750']

export default function AdminPortal() {
  const [active, setActive] = useState('dashboard')
  const [subs, setSubs] = useState(SUBMISSIONS)
  const pending = subs.filter((s) => s.status === 'pending').length

  const nav = [
    { key: 'dashboard', label: 'Dashboard', icon: I.grid },
    { key: 'listings', label: 'Listings', icon: I.building },
    { key: 'submissions', label: 'Landlord Submissions', icon: I.inbox, badge: pending || undefined },
    { key: 'blog', label: 'Blog', icon: I.pen },
    { key: 'home', label: 'Home Page', icon: I.layout },
    { key: 'media', label: 'Media', icon: I.image },
  ]

  const user = { name: 'Admin · Hunt & Harris Real Estate', meta: 'Content Manager', initials: 'HH', greeting: 'Content & listings management' }
  const decide = (idx, status) => setSubs((s) => s.map((x, i) => (i === idx ? { ...x, status } : x)))

  return (
    <PortalShell role="Admin" brandColor="#111110" navItems={nav} active={active} setActive={setActive} user={user}>
      {active === 'dashboard' && <Dashboard pending={pending} onGo={setActive} />}
      {active === 'listings' && <Listings />}
      {active === 'submissions' && <Submissions subs={subs} decide={decide} />}
      {active === 'blog' && <Blog />}
      {active === 'home' && <HomePage />}
      {active === 'media' && <Media />}
    </PortalShell>
  )
}

function Dashboard({ pending, onGo }) {
  const entries = Object.entries(BY_COMMUNITY)
  const max = Math.max(...entries.map(([, c]) => c))
  return (
    <>
      <div className="pt-stats">
        <Stat tone="blue" icon={I.building} value={properties.length} label="Active listings" trend="+3 this month" />
        <Stat tone="amber" icon={I.inbox} value={pending} label="Pending submissions" trend={`${pending} to review`} flat />
        <Stat tone="green" icon={I.pen} value="2" label="Published blogs" trend="+1 this week" />
        <Stat tone="violet" icon={I.image} value={MEDIA.length} label="Media files" trend="8.2 MB used" flat />
      </div>

      <div className="pt-grid">
        <div className="pt-card">
          <div className="pt-card-head">
            <span className="pt-card-title">Listings by Community</span>
            <span className="pt-card-link" onClick={() => onGo('listings')}>Manage</span>
          </div>
          <div className="ad-chart">
            {entries.map(([loc, count]) => (
              <div className="ad-bar-wrap" key={loc}>
                <span className="ad-bar-val">{count}</span>
                <div className="ad-bar" style={{ height: `${(count / max) * 100}%` }} />
                <span className="ad-bar-label">{SHORT[loc] || loc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-card">
          <div className="pt-card-head"><span className="pt-card-title">Quick Actions</span></div>
          <div className="pt-list">
            <button className="pt-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onGo('blog')}>+ New Blog Post</button>
            <button className="pt-btn" style={{ width: '100%', marginTop: 10, background: '#f2f3f4', color: '#111110' }} onClick={() => onGo('listings')}>+ Add Listing</button>
            <button className="pt-btn" style={{ width: '100%', marginTop: 10, background: '#f2f3f4', color: '#111110' }} onClick={() => onGo('submissions')}>Review {pending} Submissions</button>
          </div>
        </div>
      </div>

      <div className="pt-card" style={{ marginTop: 18 }}>
        <div className="pt-card-head"><span className="pt-card-title">Recent Activity</span></div>
        <div className="pt-list">
          <Row icon={I.inbox} title="New landlord submission" sub="Neema Kataria · Marina Vista · 2 hours ago" />
          <Row icon={I.pen} title="Blog published" sub="Why RAK Is Outperforming Dubai · yesterday" />
          <Row icon={I.building} title="Listing updated" sub="Lagoon Views · price changed · 2 days ago" />
          <Row icon={I.layout} title="Home page hero edited" sub="3 days ago" />
        </div>
      </div>
    </>
  )
}

function Listings() {
  return (
    <div className="pt-card">
      <div className="pt-card-head">
        <span className="pt-card-title">Property Listings</span>
        <button className="pt-btn" style={{ padding: '10px 18px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{I.plus} Add Listing</button>
      </div>
      <div className="pt-table-wrap">
        <table className="pt-table">
          <thead><tr><th>Property</th><th>Location</th><th>Price from</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {properties.slice(0, 9).map((p, i) => (
              <tr key={p.slug}>
                <td><div className="ad-cell"><img className="ad-thumb" src={p.image} alt="" />{p.name}</div></td>
                <td style={{ fontWeight: 400 }}>{p.location}</td>
                <td style={{ fontWeight: 400 }}>{p.priceFrom}</td>
                <td><span className={`pt-tag pt-tag--${i % 4 === 0 ? 'gray' : 'green'}`}>{i % 4 === 0 ? 'Draft' : 'Published'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="pt-icon-btn" style={{ width: 34, height: 34 }} aria-label="Edit">{I.edit}</button>
                    <button className="pt-icon-btn" style={{ width: 34, height: 34 }} aria-label="Delete">{I.trash}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Submissions({ subs, decide }) {
  return (
    <>
      <p className="pt-section-lead">Listings submitted by landlords through their portal. Review the details, then approve to publish on the listings page or reject with feedback.</p>
      <div className="pt-props">
        {subs.map((s, i) => (
          <div className="pt-prop" key={i}>
            <img className="pt-prop-img" src={s.img} alt={s.prop} />
            <div className="pt-prop-body">
              <div className="pt-prop-name">{s.prop}</div>
              <div className="pt-prop-loc">{s.loc} · by {s.landlord}</div>
              <div className="pt-prop-loc" style={{ marginTop: 4 }}>{s.rent} · submitted {s.date}</div>
              <div className="pt-prop-foot">
                {s.status === 'pending' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="pt-btn" style={{ padding: '9px 16px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#2e8a4a' }} onClick={() => decide(i, 'approved')}>{I.check} Approve</button>
                    <button className="pt-btn" style={{ padding: '9px 16px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f2f3f4', color: '#111110' }} onClick={() => decide(i, 'rejected')}>{I.x} Reject</button>
                  </div>
                ) : (
                  <span className={`pt-tag pt-tag--${s.status === 'approved' ? 'green' : 'red'}`}>{s.status === 'approved' ? 'Approved' : 'Rejected'}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Blog() {
  return (
    <div className="pt-card">
      <div className="pt-card-head">
        <span className="pt-card-title">Blog Posts</span>
        <button className="pt-btn" style={{ padding: '10px 18px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{I.plus} New Post</button>
      </div>
      <div className="pt-table-wrap">
        <table className="pt-table">
          <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {BLOGS.map((b, i) => (
              <tr key={i}>
                <td><div className="ad-cell"><span className="ad-cat-dot">{I.pen}</span>{b.title}</div></td>
                <td style={{ fontWeight: 400 }}>{b.cat}</td>
                <td style={{ fontWeight: 400 }}>{b.date}</td>
                <td><span className={`pt-tag pt-tag--${b.status[1]}`}>{b.status[0]}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="pt-icon-btn" style={{ width: 34, height: 34 }} aria-label="Edit">{I.edit}</button>
                    <button className="pt-icon-btn" style={{ width: 34, height: 34 }} aria-label="Delete">{I.trash}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="pt-grid" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
      <div className="pt-card">
        <div className="pt-card-head"><span className="pt-card-title">Hero & Content</span></div>
        <form className="pt-form" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 'none' }}>
          <div className="pt-field"><label className="pt-label">Hero heading</label><input className="pt-input" defaultValue="Dream RAK" /></div>
          <div className="pt-field"><label className="pt-label">Hero subtitle</label><input className="pt-input" defaultValue="Discover, compare, and confidently secure your perfect property." /></div>
          <div className="pt-field"><label className="pt-label">Featured properties</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {properties.slice(0, 4).map((p) => (
                <label key={p.slug} className="pl-check"><input type="checkbox" defaultChecked={p !== properties[3]} /> {p.name}</label>
              ))}
            </div>
          </div>
          <button className="pt-btn" type="submit">Save Changes</button>
        </form>
      </div>
      <div className="pt-card">
        <div className="pt-card-head"><span className="pt-card-title">Section Visibility</span></div>
        <div className="pt-list">
          {['Awards banner', 'Featured properties', 'Client testimonials', 'Latest blog', 'Contact form'].map((s, i) => (
            <div className="pt-row" key={s}>
              <div className="pt-row-main"><div className="pt-row-title">{s}</div></div>
              <span className={`pt-tag pt-tag--${i === 3 ? 'gray' : 'green'}`}>{i === 3 ? 'Hidden' : 'Visible'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="pt-card-head"><span className="pt-card-title">Home Banner</span></div>
          <Dropzone />
        </div>
      </div>
    </div>
  )
}

function Media() {
  return (
    <>
      <Dropzone />
      <div className="pt-props" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 18 }}>
        {MEDIA.map((id, i) => (
          <div className="pt-card" key={i} style={{ padding: 8 }}>
            <img src={IMG(id)} alt="" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
          </div>
        ))}
      </div>
    </>
  )
}

function Dropzone() {
  return (
    <div style={{ border: '1.5px dashed rgba(17,17,16,0.2)', borderRadius: 14, padding: '30px 20px', textAlign: 'center', color: 'rgba(17,17,16,0.55)', background: '#fafbfb' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>{I.image}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#111110' }}>Drag & drop images here</div>
      <div style={{ fontSize: 12.5, marginTop: 4 }}>or click to browse · JPG, PNG, WebP up to 10 MB</div>
    </div>
  )
}

function Stat({ icon, value, label, tone = 'blue', trend, flat }) {
  return (
    <div className="pt-stat ad-stat">
      <span className={`pt-stat-icon ad-icon-${tone}`}>{icon}</span>
      <div className="pt-stat-value">{value}</div>
      <div className="pt-stat-label">{label}</div>
      {trend && (
        <span className={`ad-trend ad-trend--${flat ? 'flat' : 'up'}`}>
          {!flat && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" /></svg>}
          {trend}
        </span>
      )}
    </div>
  )
}
function Row({ icon, title, sub }) {
  return (
    <div className="pt-row">
      <span className="pt-row-icon">{icon}</span>
      <div className="pt-row-main"><div className="pt-row-title">{title}</div><div className="pt-row-sub">{sub}</div></div>
    </div>
  )
}
