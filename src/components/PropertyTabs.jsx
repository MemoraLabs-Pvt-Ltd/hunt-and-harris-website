import { useState } from 'react'
import './PropertyTabs.css'

const fmt = (n) => (Math.round((Number(n) || 0) * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })

function compute({ total, down, rate, years, tax, insurance }) {
  const T = Number(total) || 0
  const dp = Number(down) || 0
  const r = (Number(rate) || 0) / 100 / 12
  const n = (Number(years) || 0) * 12
  const loan = Math.max(0, T * (1 - dp / 100))
  const pi = n <= 0 ? 0 : r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n
  const taxM = (Number(tax) || 0) / 12
  const insM = (Number(insurance) || 0) / 12
  return { pi, taxM, insM, monthly: pi + taxM + insM }
}

const FIELDS = [
  ['total', 'Total Amount (AED)'],
  ['down', 'Down Payment (%)'],
  ['rate', 'Interest Rate %'],
  ['years', 'Loan Terms (Years)'],
  ['tax', 'Property Tax (AED / yr)'],
  ['insurance', 'Home Insurance (AED / yr)'],
]

function Calculator({ price }) {
  const [f, setF] = useState({ total: price || 1000000, down: 20, rate: 4.5, years: 25, tax: 0, insurance: 0 })
  const [res, setRes] = useState(() => compute({ total: price || 1000000, down: 20, rate: 4.5, years: 25, tax: 0, insurance: 0 }))
  const on = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))

  const t = res.monthly || 1
  const a = (res.pi / t) * 100
  const b = (res.taxM / t) * 100

  return (
    <div className="mc">
      <div className="mc-chart">
        <div
          className="mc-donut"
          style={{ background: `conic-gradient(#2f6fd0 0 ${a}%, #7ab4d8 ${a}% ${a + b}%, #cfe0ef ${a + b}% 100%)` }}
        >
          <div className="mc-donut-hole">
            <span className="mc-donut-amt">AED {fmt(res.monthly)}</span>
            <span className="mc-donut-sub">Monthly</span>
          </div>
        </div>
        <div className="mc-legend">
          <div><span className="mc-dot" style={{ background: '#2f6fd0' }} /> Principal &amp; Interest <b>{fmt(res.pi)}</b></div>
          <div><span className="mc-dot" style={{ background: '#7ab4d8' }} /> Property Tax <b>{fmt(res.taxM)}</b></div>
          <div><span className="mc-dot" style={{ background: '#cfe0ef' }} /> Home Insurance <b>{fmt(res.insM)}</b></div>
        </div>
      </div>

      <div className="mc-form">
        <div className="mc-grid">
          {FIELDS.map(([k, label]) => (
            <label className="mc-field" key={k}>
              <span className="mc-label">{label}</span>
              <input className="mc-input" type="number" value={f[k]} onChange={on(k)} />
            </label>
          ))}
        </div>
        <button className="mc-calc" onClick={() => setRes(compute(f))}>Calculate</button>
      </div>
    </div>
  )
}

function Details({ p }) {
  const rows = [
    ['Reference', p.ref],
    ['Type', p.type],
    ['Purpose', p.propertyFor],
    ['Status', p.status],
    ['Completion', p.completion],
    ['Furnishing', p.furnished],
    ['Bedrooms', /studio/i.test(p.beds) ? 'Studio' : p.beds],
    ['Bathrooms', p.baths],
    ['Built-up Area', p.built && `${p.built} ${p.sizeUnit.trim()}`],
    ['Plot', p.plot && `${p.plot} ${p.sizeUnit.trim()}`],
    ['Floor', p.floor],
    ['View', p.view],
    ['Parking', p.parking],
    ['Cheques', p.propertyFor === 'Rent' ? p.cheques : ''],
  ].filter(([, v]) => v)
  return (
    <div className="ptab-details">
      {rows.map(([k, v]) => (
        <div className="ptab-row" key={k}><span className="ptab-k">{k}</span><span className="ptab-v">{v}</span></div>
      ))}
    </div>
  )
}

function Features({ p }) {
  if (!p.features.length) return <p className="ptab-empty">No amenities listed for this property.</p>
  return (
    <div className="ptab-features">
      {p.features.map((f) => (
        <span className="ptab-feat" key={f}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          {f}
        </span>
      ))}
    </div>
  )
}

export default function PropertyTabs({ property: p }) {
  const [tab, setTab] = useState('details')
  const TABS = [['details', 'Details'], ['features', 'Features'], ['calculator', 'Calculator']]
  return (
    <div className="ptab">
      <div className="ptab-head">
        {TABS.map(([k, label]) => (
          <button key={k} className={`ptab-tab${tab === k ? ' is-active' : ''}`} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      <div className="ptab-body">
        {tab === 'details' && <Details p={p} />}
        {tab === 'features' && <Features p={p} />}
        {tab === 'calculator' && <Calculator price={Number(p.price)} />}
      </div>
    </div>
  )
}
