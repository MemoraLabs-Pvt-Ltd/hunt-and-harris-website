import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

const SLIDES = [
  '/hero-1.jpg',
  '/hero-2.jpg',
  '/hero-3.jpg',
]

const TABS = ['Buy', 'Rent', 'Sell']
// Which propertyFor value each tab searches for (Sell → lead capture instead).
const TAB_FOR = { Buy: 'Sale', Rent: 'Rent' }

// Budget bands → min/max query params for the /listings price filter.
const BUDGET_RANGE = {
  'Under AED 500K': { max: '500000' },
  'AED 500K – 1M': { min: '500000', max: '1000000' },
  'AED 1M – 2M': { min: '1000000', max: '2000000' },
  'AED 2M – 5M': { min: '2000000', max: '5000000' },
  'AED 5M+': { min: '5000000' },
}

export default function Hero() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Buy')
  const [slide, setSlide] = useState(0)

  // Crossfade through the hero images behind the "Dream RAK" title.
  useEffect(() => {
    if (SLIDES.length < 2) return
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Search selections + options pulled from the live feed facets.
  const [location, setLocation] = useState('')
  const [beds, setBeds] = useState('')
  const [budget, setBudget] = useState('')
  const [type, setType] = useState('')
  const [locations, setLocations] = useState([])
  const [bedsOptions, setBedsOptions] = useState([])
  const [types, setTypes] = useState([])

  // Populate Location + Bedrooms + Property Type from the same-origin feed data.
  useEffect(() => {
    let alive = true
    fetch('/data/listings-all.json')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (!alive || !d) return
        setLocations((d.facets?.location || []).map(o => o.value))
        setBedsOptions((d.facets?.beds || []).map(o => o.value))
        setTypes((d.facets?.type || []).map(o => o.value))
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  const onSearch = () => {
    // "Sell" is a seller intent → send them to the contact section, not a search.
    if (activeTab === 'Sell') {
      document.querySelector('.cs-sec')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const p = new URLSearchParams()
    if (TAB_FOR[activeTab]) p.set('for', TAB_FOR[activeTab])
    if (location) p.set('location', location)
    if (beds) p.set('beds', beds)
    if (type) p.set('type', type)
    const band = BUDGET_RANGE[budget]
    if (band?.min) p.set('min', band.min)
    if (band?.max) p.set('max', band.max)
    navigate(`/listings?${p.toString()}`)
  }

  return (
    <section className="hero">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="hero-bg"
          style={{ backgroundImage: `url(${src})`, opacity: i === slide ? 1 : 0 }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-text">
        <h1 className="hero-h1">
          {'Dream RAK'.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char"
              style={{ animationDelay: `${200 + i * 60}ms` }}
            >
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h1>
        <p className="hero-sub">
          Discover, compare, and confidently secure your perfect property — powered by local expertise.
        </p>
      </div>

      <div className="hero-search">
        <div className="search-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`stab${activeTab === t ? ' active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="sdiv search-sdiv-desktop" />

        <div className="search-fields">
          <div className="sfield sfield-anim" style={{ animationDelay: '200ms' }}>
            <div className="sfield-label">Location</div>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">{locations.length ? 'Any Location' : 'Select Location'}</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="sdiv search-sdiv-desktop" />

          <div className="sfield sfield-anim" style={{ animationDelay: '280ms' }}>
            <div className="sfield-label">Bedrooms</div>
            <select value={beds} onChange={e => setBeds(e.target.value)}>
              <option value="">Any Beds</option>
              {bedsOptions.map(b => <option key={b} value={b}>{/^studio$/i.test(b) ? b : `${b} Bed${b === '1' ? '' : 's'}`}</option>)}
            </select>
          </div>

          <div className="sdiv search-sdiv-desktop" />

          <div className="sfield sfield-anim" style={{ animationDelay: '360ms' }}>
            <div className="sfield-label">Budget</div>
            <select value={budget} onChange={e => setBudget(e.target.value)}>
              <option value="">Any Budget</option>
              {Object.keys(BUDGET_RANGE).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="sdiv search-sdiv-desktop" />

          <div className="sfield sfield-anim" style={{ animationDelay: '440ms' }}>
            <div className="sfield-label">Property Type</div>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">{types.length ? 'Any Type' : 'Property Type'}</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button className="ssub" onClick={onSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Search
        </button>
      </div>
    </section>
  )
}
