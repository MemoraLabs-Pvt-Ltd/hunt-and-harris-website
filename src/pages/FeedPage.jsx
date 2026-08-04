import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FEED_URL } from '../data/feedLoader'
import './FeedPage.css'

const money = (l) => {
  const n = Number(l.price)
  const amount = Number.isFinite(n) ? n.toLocaleString('en-US') : l.price
  const suffix = l.priceFreq === 'month' ? '/month' : l.priceFreq === 'year' || l.priceFreq === 'yearly' ? '/year' : ''
  return `${l.currency} ${amount}${suffix}`
}
const bedsLabel = (b) => (!b ? '—' : /studio/i.test(b) ? 'Studio' : `${b} Bed`)

export default function FeedPage() {
  const { listings = [], total = 0, error } = useLoaderData() || {}
  const [shown, setShown] = useState(36)
  const [sel, setSel] = useState(null)
  const visible = listings.slice(0, shown)

  return (
    <>
      <Seo path="/feed" title="Feed Preview" noindex />
      <Navbar />
      <section className="fd-sec">
        <div className="fd-head">
          <span className="fd-badge">Live CRM Feed</span>
          <h1 className="fd-title">Property Feed <span className="fd-italic">Preview</span></h1>
          <p className="fd-sub">
            Pulled at build time from your CRM&rsquo;s generic XML feed.
            <br /><code className="fd-url">{FEED_URL}</code>
          </p>
          {error
            ? <p className="fd-error">Could not load feed: {error}</p>
            : <p className="fd-count">{total} listings in feed · showing {Math.min(shown, listings.length)}{listings.length < total ? ` of first ${listings.length}` : ''}</p>}
        </div>

        <div className="fd-grid">
          {visible.map((l) => (
            <article className="fd-card" key={l.ref} onClick={() => setSel(l)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSel(l) }}>
              <div className="fd-card-img">
                {l.image
                  ? <img src={l.image} alt={l.title} loading="lazy" />
                  : <div className="fd-noimg">No image</div>}
                <span className="fd-view">View all {l.imageCount} photos</span>
                <span className={`fd-tag ${l.propertyFor === 'Rent' ? 'fd-tag--blue' : 'fd-tag--green'}`}>For {l.propertyFor}</span>
                <span className="fd-tag fd-tag--status">{l.status}</span>
              </div>

              <div className="fd-card-body">
                <div className="fd-ref">{l.ref} · {l.type}</div>
                <h3 className="fd-card-title">{l.title}</h3>
                <div className="fd-price">{money(l)}</div>

                <div className="fd-specs">
                  <span>{bedsLabel(l.beds)}</span>
                  <span>{l.baths || '—'} Bath</span>
                  <span>{l.built ? `${l.built} sqft` : '—'}</span>
                </div>

                <div className="fd-loc">
                  {[l.tower, l.subLocation, l.location, l.city].filter(Boolean).join(' · ')}
                </div>

                <div className="fd-meta">
                  {l.completion && <span className="fd-chip">{l.completion}</span>}
                  {l.furnished && <span className="fd-chip">{l.furnished}</span>}
                  <span className="fd-chip">{l.imageCount} photos</span>
                  {l.floorplans > 0 && <span className="fd-chip fd-chip--blue">{l.floorplans} floor plan</span>}
                  <span className="fd-chip">{l.featureCount} features</span>
                </div>

                <div className="fd-agent">
                  {l.agent.photo && <img src={l.agent.photo} alt="" />}
                  <div>
                    <div className="fd-agent-name">{l.agent.name || 'Unassigned'}</div>
                    <div className="fd-agent-meta">{l.agent.mobile}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {shown < listings.length && (
          <div className="fd-more-wrap">
            <button className="fd-more" onClick={() => setShown((s) => s + 36)}>Load more</button>
          </div>
        )}
      </section>

      {sel && (
        <div className="fd-modal" onClick={() => setSel(null)}>
          <div className="fd-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="fd-modal-head">
              <div>
                <div className="fd-modal-ref">{sel.ref} · {sel.type} · For {sel.propertyFor} · {money(sel)}</div>
                <h3 className="fd-modal-title">{sel.title}</h3>
                <div className="fd-modal-meta">{[sel.tower, sel.subLocation, sel.location, sel.city].filter(Boolean).join(' · ')}</div>
              </div>
              <button className="fd-modal-close" onClick={() => setSel(null)} aria-label="Close">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="fd-modal-count">{sel.images.length} images{sel.floorplans > 0 ? ` · ${sel.floorplans} floor plan` : ''}</div>
            <div className="fd-modal-gallery">
              {sel.images.map((url, i) => (
                <a className="fd-modal-img" href={url} target="_blank" rel="noopener noreferrer" key={i}>
                  <img src={url} alt={`${sel.title} — ${i + 1}`} loading="lazy" />
                </a>
              ))}
              {sel.images.length === 0 && <p className="fd-modal-empty">No images in the feed for this listing.</p>}
            </div>
          </div>
        </div>
      )}
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
