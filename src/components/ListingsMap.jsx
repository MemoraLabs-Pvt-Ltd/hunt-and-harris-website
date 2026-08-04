import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

const money = (l) => {
  const n = Number(l.price)
  const amt = Number.isFinite(n) && n > 0 ? n.toLocaleString('en-US') : l.price
  const suffix = l.priceFreq === 'month' ? '/mo' : ''
  return `${l.currency || 'AED'} ${amt}${suffix}`
}
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

const popup = (l) => `
  <div class="lst-pop">
    ${l.image ? `<img class="lst-pop-img" src="${esc(l.image)}" alt="">` : ''}
    <div class="lst-pop-body">
      <div class="lst-pop-tag">${esc(l.propertyFor)}${l.type ? ' · ' + esc(l.type) : ''}</div>
      <div class="lst-pop-price">${esc(money(l))}</div>
      <div class="lst-pop-title">${esc(l.title || l.tower || l.type)}</div>
      <div class="lst-pop-loc">${esc([l.subLocation, l.location, l.city].filter(Boolean).join(', '))}</div>
    </div>
  </div>`

export default function ListingsMap({ listings }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const LRef = useRef(null)
  const layerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !elRef.current || mapRef.current) return
      const map = L.map(elRef.current, { preferCanvas: true, scrollWheelZoom: true }).setView([25.75, 55.9], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)
      mapRef.current = map
      LRef.current = L
      layerRef.current = L.layerGroup().addTo(map)
      setReady(true)
    })()
    return () => {
      cancelled = true
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const L = LRef.current
    const layer = layerRef.current
    layer.clearLayers()
    const pts = []
    for (const l of listings) {
      if (l.lat == null || l.lng == null) continue
      const marker = L.circleMarker([l.lat, l.lng], {
        radius: 7,
        weight: 2,
        color: '#ffffff',
        fillColor: l.propertyFor === 'Rent' ? '#3f86bd' : '#2e8a4a',
        fillOpacity: 1,
      })
      marker.bindPopup(popup(l), { minWidth: 220, closeButton: true })
      marker.on('mouseover', () => marker.setStyle({ radius: 9 }))
      marker.on('mouseout', () => marker.setStyle({ radius: 7 }))
      marker.addTo(layer)
      pts.push([l.lat, l.lng])
    }
    if (pts.length) {
      try { mapRef.current.fitBounds(pts, { padding: [40, 40], maxZoom: 13 }) } catch { /* ignore */ }
    }
    // Re-measure after the container becomes visible (toggle from grid → map)
    setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 60)
  }, [ready, listings])

  return <div className="lst-map" ref={elRef} />
}
