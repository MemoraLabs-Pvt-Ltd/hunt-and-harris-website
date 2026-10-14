import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useSearchParams } from 'react-router-dom'
import ListingsMap from './ListingsMap'
import GridSkeleton from './GridSkeleton'
import { prefetchProperty } from '../utils/prefetch'
import './Listings.css'

const money = (l) => {
  const n = Number(l.price)
  const amt = Number.isFinite(n) && n > 0 ? n.toLocaleString('en-US') : (l.price || '—')
  const suffix = l.priceFreq === 'month' ? '/month' : ''
  return `${l.currency || 'AED'} ${amt}${suffix}`
}
const bedsLabel = (b) => (!b ? '—' : /studio/i.test(b) ? 'Studio' : `${b} Bed`)

const DEFAULTS = { for: 'All', type: 'All', location: 'All', city: 'All', beds: 'All', min: '', max: '' }
const EMPTY = [] // stable reference so the filter memo doesn't rerun every render

// Sort options for the results list.
const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'beds-desc', label: 'Most bedrooms' },
]
const sortListings = (arr, sort) => {
  const copy = [...arr]
  const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0)
  switch (sort) {
    case 'price-asc': return copy.sort((a, b) => (num(a.price) || Infinity) - (num(b.price) || Infinity))
    case 'price-desc': return copy.sort((a, b) => num(b.price) - num(a.price))
    case 'beds-desc': return copy.sort((a, b) => (parseFloat(b.beds) || 0) - (parseFloat(a.beds) || 0))
    case 'newest': return copy.sort((a, b) => new Date(b.lastUpdate || 0) - new Date(a.lastUpdate || 0))
    default: return arr // 'featured' keeps the source order
  }
}

// Budget presets mirror the ranges used on propertyfinder.ae — lower steps for
// rentals (yearly), higher steps for sales. Shown as quick chips in the popover.
const SALE_STEPS = [500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000, 10000000, 20000000]
const RENT_STEPS = [20000, 40000, 60000, 80000, 100000, 150000, 200000, 300000, 500000]
// "All" mixes sale + rent, so span the low (rental) range up to the high (sale) range.
const ALL_STEPS = [20000, 50000, 100000, 250000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000]
const fmtNum = (n) => Number(n).toLocaleString('en-US')

function Select({ label, value, options, onChange }) {
  return (
    <label className="lst-select">
      <span className="lst-select-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="All">All {label}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.value} ({o.count})</option>)}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
    </label>
  )
}

// PropertyFinder-style "Price" pill that opens a popover with Min/Max inputs.
// The panel is portalled to <body> so it isn't clipped by the filter bar's
// horizontal-scroll overflow.
function PricePopover({ min, max, steps, onChange }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const btnRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const place = () => {
      const el = btnRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const left = Math.max(12, Math.min(r.left, window.innerWidth - 352))
      setPos({ top: r.bottom + 8, left })
    }
    place()
    const onDoc = (e) => {
      if (btnRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open])

  const digits = (v) => v.replace(/[^\d]/g, '')
  const active = !!(min || max)
  const label = min && max ? `AED ${fmtNum(min)} – ${fmtNum(max)}`
    : min ? `AED ${fmtNum(min)}+`
    : max ? `Up to AED ${fmtNum(max)}`
    : 'Price'

  return (
    <div className="lst-price">
      <button ref={btnRef} type="button" className={`lst-price-btn${active ? ' is-active' : ''}${open ? ' is-open' : ''}`} onClick={() => setOpen((o) => !o)}>
        {label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && createPortal(
        <div ref={panelRef} className="lst-price-pop" style={{ top: pos.top, left: pos.left }}>
          <div className="lst-price-pop-title">Price</div>
          <div className="lst-price-row">
            <input className="lst-price-input" inputMode="numeric" placeholder="Min. Price (AED)"
              value={min ? fmtNum(min) : ''} onChange={(e) => onChange('min', digits(e.target.value))} />
            <span className="lst-price-dash">—</span>
            <input className="lst-price-input" inputMode="numeric" placeholder="Max. Price (AED)"
              value={max ? fmtNum(max) : ''} onChange={(e) => onChange('max', digits(e.target.value))} />
          </div>
          <div className="lst-price-chips">
            {steps.map((n) => (
              <button type="button" key={n} className="lst-price-chip" onClick={() => onChange(min ? 'max' : 'min', String(n))}>
                AED {fmtNum(n)}
              </button>
            ))}
          </div>
          {active && <button type="button" className="lst-price-reset" onClick={() => { onChange('min', ''); onChange('max', '') }}>Reset</button>}
        </div>,
        document.body,
      )}
    </div>
  )
}

// Scroll container with an always-visible custom scrollbar (macOS hides the
// native overlay scrollbar when idle, so we render our own draggable thumb).
function ScrollList({ className, children }) {
  const listRef = useRef(null)
  const thumbRef = useRef(null)
  const dragRef = useRef(null)

  const layout = () => {
    const el = listRef.current
    const thumb = thumbRef.current
    if (!el || !thumb) return
    const trackH = thumb.parentElement.clientHeight
    const { scrollHeight, clientHeight, scrollTop } = el
    if (scrollHeight <= clientHeight + 2) { thumb.style.display = 'none'; return }
    thumb.style.display = 'block'
    const th = Math.max(32, (clientHeight / scrollHeight) * trackH)
    const top = (trackH - th) * (scrollTop / (scrollHeight - clientHeight))
    thumb.style.height = `${th}px`
    thumb.style.transform = `translateY(${top}px)`
  }

  useEffect(() => {
    const el = listRef.current
    layout()
    el.addEventListener('scroll', layout, { passive: true })
    window.addEventListener('resize', layout)
    return () => { el.removeEventListener('scroll', layout); window.removeEventListener('resize', layout) }
  }, [])
  useEffect(layout) // re-measure whenever the list content changes

  const onThumbDown = (e) => {
    e.preventDefault()
    const el = listRef.current
    const trackH = thumbRef.current.parentElement.clientHeight
    dragRef.current = { y: e.clientY, top: el.scrollTop, sh: el.scrollHeight, ch: el.clientHeight, trackH }
    const move = (ev) => {
      const d = dragRef.current
      if (!d) return
      const th = Math.max(32, (d.ch / d.sh) * d.trackH)
      const trackRange = d.trackH - th
      if (trackRange > 0) el.scrollTop = d.top + ((ev.clientY - d.y) / trackRange) * (d.sh - d.ch)
    }
    const up = () => { dragRef.current = null; document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up) }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div className="lst-scroll">
      <div className={className} ref={listRef}>{children}</div>
      <div className="lst-scroll-track"><div className="lst-scroll-thumb" ref={thumbRef} onMouseDown={onThumbDown} /></div>
    </div>
  )
}

function PropertyCard({ l }) {
  return (
    <Link
      className="lst-card"
      to={`/property/${l.ref}`}
      onMouseEnter={() => prefetchProperty(l.ref)}
      onFocus={() => prefetchProperty(l.ref)}
    >
      <div className="lst-card-img">
        {l.image ? <img src={l.image} alt={l.title} loading="lazy" /> : <div className="lst-noimg">No image</div>}
        <span className={`lst-badge ${l.propertyFor === 'Rent' ? 'lst-badge--blue' : 'lst-badge--green'}`}>{/off\s*plan/i.test(l.propertyFor) ? 'Off-Plan' : /^sale$/i.test(l.propertyFor) ? 'Buy' : `For ${l.propertyFor}`}</span>
      </div>
      <div className="lst-card-body">
        <div className="lst-card-loc">{[l.subLocation, l.location].filter(Boolean).join(', ') || l.city}</div>
        <h3 className="lst-card-title">{l.title || l.tower || l.type}</h3>
        <div className="lst-card-price">{money(l)}</div>
        <div className="lst-card-specs">
          <span>{l.type}</span><span>{bedsLabel(l.beds)}</span><span>{l.baths || '—'} Bath</span>{l.built && <span>{l.built} sqft</span>}
        </div>
      </div>
    </Link>
  )
}

export default function Listings() {
  // Driven entirely by the same-origin static JSON so the page shell paints
  // instantly and navigation never blocks on the feed.
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [view, setView] = useState('grid')
  // Seed filters from the URL query (?for=&location=&type=&min=&max=…) so the
  // home page hero search can deep-link into a pre-filtered listings page.
  const [searchParams] = useSearchParams()
  const [f, setF] = useState(() => {
    const g = (k, d) => searchParams.get(k) || d
    return {
      for: g('for', 'All'), type: g('type', 'All'), location: g('location', 'All'),
      city: g('city', 'All'), beds: g('beds', 'All'),
      min: g('min', ''), max: g('max', ''),
    }
  })
  const [shown, setShown] = useState(24)
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    let alive = true
    fetch('/data/listings-all.json')
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((d) => { if (alive) setData(d) })
      .catch((e) => { if (alive) setErr(String(e?.message || e)) })
    return () => { alive = false }
  }, [])

  const listings = data?.listings || EMPTY
  const total = data?.total || 0
  const facets = data?.facets || {}
  const error = err
  const loading = !data && !err

  const set = (k) => (v) => { setF((p) => ({ ...p, [k]: v })); setShown(24) }
  const setPrice = (k, v) => { setF((p) => ({ ...p, [k]: v })); setShown(24) }
  // Switching sale/rent resets the budget, since the two use different ranges.
  const pickFor = (v) => { setF((p) => ({ ...p, for: v, min: '', max: '' })); setShown(24) }
  const priceSteps = f.for === 'Rent' ? RENT_STEPS : f.for === 'Sale' ? SALE_STEPS : ALL_STEPS

  const filtered = useMemo(() => {
    const min = f.min ? Number(f.min) : null
    const max = f.max ? Number(f.max) : null
    return listings.filter((l) => {
      const price = Number(l.price)
      const okBudget = (min == null && max == null) ||
        (Number.isFinite(price) && price > 0 && (min == null || price >= min) && (max == null || price <= max))
      return (
        (f.for === 'All' || l.propertyFor === f.for) &&
        (f.type === 'All' || l.type === f.type) &&
        (f.location === 'All' || l.location === f.location) &&
        (f.city === 'All' || l.city === f.city) &&
        (f.beds === 'All' || l.beds === f.beds) &&
        okBudget
      )
    })
  }, [listings, f])

  const sorted = useMemo(() => sortListings(filtered, sort), [filtered, sort])

  const dirty = Object.keys(DEFAULTS).some((k) => f[k] !== DEFAULTS[k])

  // Map view: the map acts as a filter — only listings inside the visible map
  // area (or a hand-drawn box) appear in the side list.
  const [mapBounds, setMapBounds] = useState(null)
  const [drawMode, setDrawMode] = useState(false)
  const [drawnBounds, setDrawnBounds] = useState(null)
  const areaBounds = drawnBounds || mapBounds
  const mapped = useMemo(() => filtered.filter((l) => l.lat != null && l.lng != null), [filtered])
  const inBounds = useMemo(() => {
    if (!areaBounds) return mapped
    const { north, south, east, west } = areaBounds
    return mapped.filter((l) => l.lat <= north && l.lat >= south && l.lng >= west && l.lng <= east)
  }, [mapped, areaBounds])
  const handleDraw = (b) => { setDrawMode(false); if (b) setDrawnBounds(b) }

  // Nearby = listings closest to the centre of the current view / drawn box,
  // shown as a horizontal-scroll strip below the map.
  const nearby = useMemo(() => {
    const list = inBounds.length ? inBounds : mapped
    if (!areaBounds) return list.slice(0, 24)
    const cLat = (areaBounds.north + areaBounds.south) / 2
    const cLng = (areaBounds.east + areaBounds.west) / 2
    const dist = (l) => (l.lat - cLat) ** 2 + (l.lng - cLng) ** 2
    return [...list].sort((a, b) => dist(a) - dist(b)).slice(0, 24)
  }, [inBounds, mapped, areaBounds])
  const nearbyRef = useRef(null)
  const scrollNearby = (dir) => {
    const el = nearbyRef.current
    if (!el) return
    const card = el.querySelector('.lst-card')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.85
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="lst-sec">
      <div className="lst-head">
        <h1 className="lst-title">Browse <span className="lst-italic">Properties</span></h1>
        <p className="lst-sub">{total ? `${total} live listings` : 'Loading listings'} across Ras Al Khaimah and the Northern Emirates &mdash; for sale, rent and off-plan.</p>
      </div>

      {error && <p className="lst-error">Could not load listings: {error}</p>}

      {loading ? <GridSkeleton count={12} columns={4} /> : (
      <>
      <div className="lst-bar">
        <div className="lst-seg">
          {['All', ...(facets.propertyFor || []).map((o) => o.value)].map((v) => (
            <button key={v} className={`lst-seg-btn${f.for === v ? ' is-active' : ''}`} onClick={() => pickFor(v)}>{/^sale$/i.test(v) ? 'Buy' : v}</button>
          ))}
        </div>

        <div className="lst-selects">
          <Select label="Type" value={f.type} options={facets.type || []} onChange={set('type')} />
          <Select label="Location" value={f.location} options={facets.location || []} onChange={set('location')} />
          <Select label="Beds" value={f.beds} options={facets.beds || []} onChange={set('beds')} />
          <PricePopover min={f.min} max={f.max} steps={priceSteps} onChange={setPrice} />
          <Select label="City" value={f.city} options={facets.city || []} onChange={set('city')} />
          {dirty && <button className="lst-clear" onClick={() => setF(DEFAULTS)}>Clear</button>}
        </div>

        <div className="lst-toggle">
          <button className={`lst-toggle-btn${view === 'grid' ? ' is-active' : ''}`} onClick={() => setView('grid')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            Grid
          </button>
          <button className={`lst-toggle-btn${view === 'map' ? ' is-active' : ''}`} onClick={() => setView('map')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3zM9 3v15M15 6v15" /></svg>
            Map
          </button>
        </div>
      </div>

      <div className="lst-count">
        <span>
          {view === 'map'
            ? <>{inBounds.length} {inBounds.length === 1 ? 'property' : 'properties'} {drawnBounds ? 'in your drawn area' : 'in this area'} · {drawnBounds ? 'clear the box to reset' : 'drag, zoom or draw a box to filter'}</>
            : <>{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</>}
        </span>
        {view === 'grid' && (
          <label className="lst-sort">
            <span className="lst-sort-label">Sort by</span>
            <select value={sort} onChange={(e) => { setSort(e.target.value); setShown(24) }}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </label>
        )}
      </div>

      {view === 'grid' ? (
        <>
          <div className="lst-grid">
            {sorted.slice(0, shown).map((l) => <PropertyCard key={l.ref} l={l} />)}
          </div>
          {shown < sorted.length && (
            <div className="lst-more-wrap"><button className="lst-more" onClick={() => setShown((s) => s + 24)}>Load more</button></div>
          )}
        </>
      ) : (
        <>
        <div className="lst-map-wrap">
          <ScrollList className="lst-map-list">
            {inBounds.length === 0
              ? <div className="lst-map-empty">No properties in this area.<br />Zoom out or drag the map to see more.</div>
              : inBounds.map((l) => <PropertyCard key={l.ref} l={l} />)}
          </ScrollList>
          <div className="lst-map-panel">
            <div className="lst-map-tools">
              {drawnBounds ? (
                <button className="lst-draw-btn is-clear" onClick={() => { setDrawnBounds(null); setDrawMode(false) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  Clear area
                </button>
              ) : (
                <button className={`lst-draw-btn${drawMode ? ' is-active' : ''}`} onClick={() => setDrawMode((d) => !d)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V4a1 1 0 0 1 1-1h3M17 3h3a1 1 0 0 1 1 1v3M21 17v3a1 1 0 0 1-1 1h-3M7 21H4a1 1 0 0 1-1-1v-3" /></svg>
                  {drawMode ? 'Drag on map…' : 'Draw area'}
                </button>
              )}
            </div>
            <ListingsMap
              listings={mapped}
              fitToData={false}
              onBoundsChange={setMapBounds}
              drawActive={drawMode}
              drawnBounds={drawnBounds}
              onDrawComplete={handleDraw}
            />
          </div>
        </div>

        {nearby.length > 0 && (
          <div className="lst-nearby">
            <div className="lst-nearby-head">
              <h3 className="lst-nearby-title">Nearby properties</h3>
              <div className="lst-nearby-nav">
                <button className="lst-nearby-arrow" onClick={() => scrollNearby(-1)} aria-label="Scroll left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="lst-nearby-arrow" onClick={() => scrollNearby(1)} aria-label="Scroll right">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
            <div className="lst-nearby-track" ref={nearbyRef}>
              {nearby.map((l) => <PropertyCard key={l.ref} l={l} />)}
            </div>
          </div>
        )}
        </>
      )}
      </>
      )}
    </section>
  )
}
