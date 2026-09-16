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

// Default framing = the UAE (Northern Emirates / RAK, where the stock is).
const UAE_CENTER = [25.55, 55.8]
const UAE_ZOOM = 9

export default function ListingsMap({ listings, onBoundsChange, fitToData = true, drawActive = false, drawnBounds = null, onDrawComplete }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const LRef = useRef(null)
  const layerRef = useRef(null)
  const drawnRectRef = useRef(null)
  const [ready, setReady] = useState(false)

  // Keep the latest callbacks in refs so handlers bound once always call the
  // current ones without needing to re-bind.
  const onBoundsRef = useRef(onBoundsChange)
  onBoundsRef.current = onBoundsChange
  const onDrawRef = useRef(onDrawComplete)
  onDrawRef.current = onDrawComplete

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !elRef.current || mapRef.current) return
      const map = L.map(elRef.current, { preferCanvas: true, scrollWheelZoom: true }).setView(UAE_CENTER, UAE_ZOOM)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)
      mapRef.current = map
      LRef.current = L
      layerRef.current = L.layerGroup().addTo(map)
      const emitBounds = () => {
        const b = map.getBounds()
        onBoundsRef.current?.({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() })
      }
      map.on('moveend', emitBounds)
      emitBounds()
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
    if (fitToData && pts.length) {
      try { mapRef.current.fitBounds(pts, { padding: [40, 40], maxZoom: 13 }) } catch { /* ignore */ }
    }
    // Re-measure after the container becomes visible (toggle from grid → map)
    setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 60)
  }, [ready, listings, fitToData])

  // Persisted "drawn area" rectangle.
  useEffect(() => {
    if (!ready) return
    const L = LRef.current
    if (drawnRectRef.current) { drawnRectRef.current.remove(); drawnRectRef.current = null }
    if (drawnBounds) {
      const { north, south, east, west } = drawnBounds
      const corners = [[south, west], [north, east]]
      drawnRectRef.current = L.rectangle(corners, {
        color: '#111110', weight: 2, dashArray: '6 5', fillColor: '#3f86bd', fillOpacity: 0.08,
      }).addTo(mapRef.current)
      // Zoom the map to the drawn region.
      try { mapRef.current.fitBounds(corners, { padding: [28, 28], maxZoom: 15 }) } catch { /* ignore */ }
    }
  }, [ready, drawnBounds])

  // Draw mode: drag on the map to sketch a rectangle → becomes the filter.
  useEffect(() => {
    if (!ready || !drawActive) return
    const L = LRef.current
    const map = mapRef.current
    map.dragging.disable()
    map.getContainer().style.cursor = 'crosshair'
    let start = null
    let rect = null
    const onDown = (e) => { start = e.latlng; if (rect) { rect.remove(); rect = null } }
    const onMove = (e) => {
      if (!start) return
      const b = L.latLngBounds(start, e.latlng)
      if (rect) rect.setBounds(b)
      else rect = L.rectangle(b, { color: '#3f86bd', weight: 2, fillColor: '#3f86bd', fillOpacity: 0.1 }).addTo(map)
    }
    const onUp = (e) => {
      if (!start) return
      const dragged = map.latLngToContainerPoint(start).distanceTo(map.latLngToContainerPoint(e.latlng))
      const b = L.latLngBounds(start, e.latlng)
      start = null
      if (rect) { rect.remove(); rect = null }
      if (dragged < 10) { onDrawRef.current?.(null); return } // treated as a cancel-click
      onDrawRef.current?.({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() })
    }
    map.on('mousedown', onDown)
    map.on('mousemove', onMove)
    map.on('mouseup', onUp)
    return () => {
      map.off('mousedown', onDown); map.off('mousemove', onMove); map.off('mouseup', onUp)
      map.dragging.enable(); map.getContainer().style.cursor = ''
      if (rect) rect.remove()
    }
  }, [ready, drawActive])

  return <div className="lst-map" ref={elRef} />
}
