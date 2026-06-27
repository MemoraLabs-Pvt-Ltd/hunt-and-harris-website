import { useState, useEffect } from 'react'
import './Hero.css'

const SLIDES = [
  '/hero-desert.jpg',
  // 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=85',
]

const TABS = ['Buy', 'Rent', 'Sell']

const LOCATIONS = [
  'Select Location',
  'Al Hamra Village',
  'Al Marjan Island',
  'Mina Al Arab',
  'Al Zorah',
  'Ras Al Khaimah City',
  'Al Hamriyah',
  'Dafan Al Nakheel',
]

const BUDGETS = [
  'Any Budget',
  'Under AED 500K',
  'AED 500K – 1M',
  'AED 1M – 2M',
  'AED 2M – 5M',
  'AED 5M+',
]

const TYPES = [
  'Property Type',
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Commercial',
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Buy')
  const [slide, setSlide] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length)
        setFading(false)
      }, 700)
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="hero-bg"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === slide ? (fading ? 0 : 1) : 0,
            transition: 'opacity 700ms ease-in-out',
          }}
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
              {char === ' ' ? ' ' : char}
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
            <select defaultValue="">
              {LOCATIONS.map(l => (
                <option key={l} value={l === 'Select Location' ? '' : l} disabled={l === 'Select Location'}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="sdiv search-sdiv-desktop" />

          <div className="sfield sfield-anim" style={{ animationDelay: '280ms' }}>
            <div className="sfield-label">Budget</div>
            <select defaultValue="">
              {BUDGETS.map(b => (
                <option key={b} value={b === 'Any Budget' ? '' : b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="sdiv search-sdiv-desktop" />

          <div className="sfield sfield-anim" style={{ animationDelay: '360ms' }}>
            <div className="sfield-label">Property Type</div>
            <select defaultValue="">
              {TYPES.map(t => (
                <option key={t} value={t === 'Property Type' ? '' : t} disabled={t === 'Property Type'}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="ssub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Search
        </button>
      </div>
    </section>
  )
}
