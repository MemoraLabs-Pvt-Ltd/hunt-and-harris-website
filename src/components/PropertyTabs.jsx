import { useState } from 'react'
import './PropertyTabs.css'

const fmt = (n) => (Math.round((Number(n) || 0) * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })

function compute({ total, downAmt, rate, years }) {
  const T = Number(total) || 0
  const D = Math.min(T, Math.max(0, Number(downAmt) || 0))
  const r = (Number(rate) || 0) / 100 / 12
  const n = (Number(years) || 0) * 12
  const loan = Math.max(0, T - D)
  const pi = n <= 0 ? 0 : r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n
  return { pi, loan, monthly: pi }
}

// Fields other than the down payment (which has its own %/AED control).
const FIELD_TOTAL = ['total', 'Total Amount (AED)']
const FIELDS_REST = [
  ['rate', 'Interest Rate %'],
  ['years', 'Loan Terms (Years)'],
]

function Calculator({ price }) {
  const base = price || 1000000
  const [f, setF] = useState({ total: base, down: 20, downAmt: Math.round(base * 0.2), rate: 4.5, years: 25 })
  const [downMode, setDownMode] = useState('pct') // 'pct' | 'amt'
  const [res, setRes] = useState(() => compute({ total: base, downAmt: Math.round(base * 0.2), rate: 4.5, years: 25 }))

  const on = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))

  // Keep down % and down amount in sync when the total changes.
  const onTotal = (e) => setF((p) => {
    const total = e.target.value
    const T = Number(total) || 0
    return downMode === 'pct'
      ? { ...p, total, downAmt: Math.round(T * (Number(p.down) || 0) / 100) }
      : { ...p, total, down: T > 0 ? Math.round((Number(p.downAmt) || 0) / T * 1000) / 10 : 0 }
  })

  // Editing the down payment updates both the % and the amount.
  const onDown = (e) => setF((p) => {
    const v = e.target.value
    const T = Number(p.total) || 0
    if (downMode === 'pct') {
      const pct = Number(v) || 0
      return { ...p, down: v, downAmt: Math.round(T * pct / 100) }
    }
    const amt = Number(v) || 0
    return { ...p, downAmt: v, down: T > 0 ? Math.round(amt / T * 1000) / 10 : 0 }
  })

  return (
    <div className="mc">
      <div className="mc-chart">
        <div
          className="mc-donut"
          style={{ background: `conic-gradient(#3f86bd 0 75%, #7ab4d8 75% 100%)` }}
        >
          <div className="mc-donut-hole">
            <span className="mc-donut-amt">AED {fmt(res.monthly)}</span>
            <span className="mc-donut-sub">Monthly</span>
          </div>
        </div>
        <div className="mc-legend">
          <div><span className="mc-dot" style={{ background: '#3f86bd' }} /> Monthly Payment <b>{fmt(res.monthly)}</b></div>
          <div><span className="mc-dot" style={{ background: '#7ab4d8' }} /> Loan Amount <b>{fmt(res.loan)}</b></div>
        </div>
      </div>

      <div className="mc-form">
        <div className="mc-grid">
          <label className="mc-field">
            <span className="mc-label">{FIELD_TOTAL[1]}</span>
            <input className="mc-input" type="number" value={f.total} onChange={onTotal} />
          </label>

          <label className="mc-field">
            <span className="mc-label">
              Down Payment
              <span className="mc-dp-toggle">
                <button type="button" className={downMode === 'pct' ? 'is-active' : ''} onClick={() => setDownMode('pct')}>%</button>
                <button type="button" className={downMode === 'amt' ? 'is-active' : ''} onClick={() => setDownMode('amt')}>AED</button>
              </span>
            </span>
            <input
              className="mc-input"
              type="number"
              value={downMode === 'pct' ? f.down : f.downAmt}
              onChange={onDown}
            />
          </label>

          {FIELDS_REST.map(([k, label]) => (
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
  // The mortgage calculator only makes sense for purchases — hide it for rentals.
  const isRent = p.propertyFor === 'Rent'
  const TABS = [['details', 'Details'], ['features', 'Features'], ...(isRent ? [] : [['calculator', 'Calculator']])]
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
        {tab === 'calculator' && !isRent && <Calculator price={Number(p.price)} />}
      </div>
    </div>
  )
}
