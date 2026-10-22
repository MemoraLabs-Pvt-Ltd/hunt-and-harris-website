import { useState, useEffect } from 'react'
import { submitLead } from '../utils/submitLead'
import './PropertyManagement.css'

const LOCATIONS = [
  'Al Hamra Village',
  'Al Marjan Island',
  'Mina Al Arab',
  'Al Hamra',
  'Julphar / City Centre',
  'Jebel Jais',
  'Al Nakheel',
  'Other / Not sure',
]

const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Plot / Land',
  'Commercial',
  'Office',
]

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', location: '', propertyType: '', message: '' }
const MAX = 180

// Residential vs Commercial management offerings (content adapted from
// huntandharris.com/property-management-hunt-harris).
const SEGMENTS = [
  {
    id: 'residential',
    label: 'Residential',
    img: '/photos/pm-residential.jpg',
    blurb:
      'From villas and townhouses to apartments across Ras Al Khaimah, we assume the role of the landlord — acting in your best interest at all times. Our in-house local team markets your home, screens for quality tenants and keeps it well maintained throughout the tenancy.',
    points: ['Tenant screening & referencing', 'Rent collection & renewals', 'Routine inspections & maintenance', 'Marketing across Bayut, Property Finder & Dubizzle'],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    img: '/photos/pm-commercial.jpg',
    blurb:
      'For offices, retail and commercial units, our experienced managers handle every step — from securing reliable business tenants to lease administration and upkeep — so your asset stays occupied, compliant and performing.',
    points: ['Business tenant sourcing & vetting', 'Lease administration & service charges', 'Scheduled maintenance & compliance', 'Transparent reporting for owners'],
  },
]

const PM_STATS = [
  { value: '19+', label: 'Years of property management experience in the Northern Emirates' },
  { value: '90%', label: 'Occupancy rate with high-quality tenants for your property' },
  { value: '50+', label: 'Bayut, Dubizzle & Property Finder awards' },
]

export default function PropertyManagement() {
  const [form, setForm] = useState(EMPTY)

  // Scroll to #residential / #commercial when linked from the navbar dropdown.
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (id) {
      const el = document.getElementById(id)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }, [])

  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k) => (e) => {
    const v = k === 'message' ? e.target.value.slice(0, MAX) : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const res = await submitLead({
      form: 'Property Management — Get Listed',
      page: '/property-management',
      name: [form.firstName, form.lastName].filter(Boolean).join(' '),
      email: form.email,
      phone: form.phone,
      location: form.location,
      propertyType: form.propertyType,
      message: form.message,
    })
    if (res.ok) {
      setStatus('success')
      setForm(EMPTY)
    } else {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero band */}
      <section className="pm-hero" style={{ backgroundImage: 'url(/photos/pm-hero.jpg)' }}>
        <div className="pm-hero-overlay" />
        <div className="pm-hero-content">
          <span className="pm-eyebrow pm-eyebrow--light">Property Management</span>
          <h1 className="pm-hero-title">
            Get Your Property <span className="pm-title-italic">Listed</span>
          </h1>
          <p className="pm-hero-lead">
            List with Hunt &amp; Harris Real Estate for the ultimate advantage &mdash; market-leading
            exposure, full coverage of every community in Ras Al Khaimah, and award-winning agents.
          </p>
          <div className="pm-hero-btns">
            <a className="pm-guide-btn" href="/guides/listing-guide.pdf" download target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Listing Guide
            </a>
            <a className="pm-guide-btn pm-guide-btn--ghost" href="/guides/property-management-brochure.pdf" download target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* Residential & Commercial overview */}
      <section className="pm-rc" id="residential-commercial">
        <div className="pm-rc-inner">
          <div className="pm-rc-head">
            <span className="pm-eyebrow">Experienced property managers</span>
            <h2 className="pm-rc-title">Residential &amp; Commercial Property Management</h2>
            <p className="pm-rc-intro">
              As your management company we assume the role of the landlord, acting in your best interest at
              all times. Our team is trained and experienced in collecting rent, screening tenants and
              maintaining strong relationships &mdash; so your property is let only to quality tenants and kept
              well maintained during and after every tenancy.
            </p>
          </div>

          <div className="pm-rc-grid">
            {SEGMENTS.map((s) => (
              <article id={s.id} key={s.id} className="pm-rc-card">
                <div className="pm-rc-card-img" style={{ backgroundImage: `url(${s.img})` }}>
                  <span className="pm-rc-card-tag">{s.label}</span>
                </div>
                <div className="pm-rc-card-body">
                  <h3 className="pm-rc-card-title">{s.label} Management</h3>
                  <p className="pm-rc-card-blurb">{s.blurb}</p>
                  <ul className="pm-rc-card-points">
                    {s.points.map((p) => (
                      <li key={p}><span className="pm-benefit-ico">✦</span> {p}</li>
                    ))}
                  </ul>
                  <a className="pm-rc-card-cta" href="#appraisal">List your property →</a>
                </div>
              </article>
            ))}
          </div>

          <div className="pm-stats">
            {PM_STATS.map((st) => (
              <div key={st.value} className="pm-stat">
                <div className="pm-stat-value">{st.value}</div>
                <div className="pm-stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    <section className="pm-sec" id="appraisal">
      <div className="pm-inner">
        <div className="pm-feature">
          <div className="pm-feature-img" style={{ backgroundImage: 'url(/photos/pm-feature.jpg)' }} />
          <ul className="pm-benefits">
            <li><span className="pm-benefit-ico">✦</span> Request a free, no-obligation appraisal</li>
            <li><span className="pm-benefit-ico">✦</span> Award-winning agents across RAK</li>
            <li><span className="pm-benefit-ico">✦</span> Maximum exposure on Bayut, Property Finder &amp; Dubizzle</li>
            <li><span className="pm-benefit-ico">✦</span> Honest pricing guided by live market data</li>
          </ul>
        </div>

        <form className="pm-form" onSubmit={onSubmit}>
          <div className="pm-form-head">
            <h2 className="pm-form-title">Request an Appraisal</h2>
            <p className="pm-form-sub">Tell us about your property and our team will be in touch.</p>
          </div>
          <div className="pm-row">
            <div className="pm-field">
              <label className="pm-label">First Name <span>*</span></label>
              <input className="pm-input" type="text" placeholder="E.g. John" value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div className="pm-field">
              <label className="pm-label">Last Name</label>
              <input className="pm-input" type="text" placeholder="E.g. John Doe" value={form.lastName} onChange={set('lastName')} />
            </div>
          </div>

          <div className="pm-row">
            <div className="pm-field">
              <label className="pm-label">Email Address <span>*</span></label>
              <input className="pm-input" type="email" placeholder="E.g. john@doe.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="pm-field">
              <label className="pm-label">Phone Number</label>
              <input className="pm-input" type="tel" placeholder="E.g. +1 3004005000" value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div className="pm-row">
            <div className="pm-field">
              <label className="pm-label">Location</label>
              <div className="pm-select-wrap">
                <select className="pm-select" value={form.location} onChange={set('location')}>
                  <option value="">Select One</option>
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <svg className="pm-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
            <div className="pm-field">
              <label className="pm-label">Property Type</label>
              <div className="pm-select-wrap">
                <select className="pm-select" value={form.propertyType} onChange={set('propertyType')}>
                  <option value="">Select One</option>
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <svg className="pm-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>
          </div>

          <div className="pm-field pm-field-full">
            <label className="pm-label">Describe Your Property</label>
            <textarea className="pm-textarea" rows={4} value={form.message} onChange={set('message')} maxLength={MAX} />
            <span className="pm-counter">{form.message.length} / {MAX}</span>
          </div>

          <button className="pm-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="pm-note pm-note--ok">Thank you — your request has been received. Our team will be in touch to arrange your appraisal.</p>
          )}
          {status === 'error' && (
            <p className="pm-note pm-note--err">Something went wrong sending your request. Please try again, or email info@huntandharris.com.</p>
          )}
        </form>
      </div>
    </section>
    </>
  )
}
