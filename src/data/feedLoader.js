import { XMLParser } from 'fast-xml-parser'

export const FEED_URL = 'https://api-crm.huntandharris-re.com/listings/feed/generic'

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', trimValues: true })
const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x])
const str = (x) => (x == null ? '' : String(typeof x === 'object' && x['#text'] != null ? x['#text'] : x)).trim()

function mapProperty(p) {
  // <location> is used twice: once as the area name (string) and once as
  // { latitude, longitude } — take the string one, capture coords from the object.
  let area = ''
  let lat = null
  let lng = null
  for (const l of arr(p.location)) {
    if (l && typeof l === 'object') {
      const la = Number(str(l.latitude))
      const lo = Number(str(l.longitude))
      if (Number.isFinite(la) && Number.isFinite(lo) && (la !== 0 || lo !== 0)) { lat = la; lng = lo }
    } else if (l != null) area = str(l)
  }

  const images = arr(p.images?.image).map((im) => ({
    id: im?.id,
    url: str(im?.url),
    floorplan: arr(im?.tags?.tag).some((t) => str(t).toLowerCase() === 'floorplan'),
  })).filter((im) => im.url)

  const features = [...arr(p.features?.feature), ...arr(p.features?.amenity)].map(str).filter(Boolean)

  // Lean object — only the fields the preview page renders (keeps the
  // prerendered page/hydration payload small).
  return {
    ref: str(p.ref),
    title: str(p.title),
    price: str(p.price),
    currency: str(p.currency) || 'AED',
    priceFreq: str(p.price_freq),
    propertyFor: str(p.property_for),
    type: str(p.type),
    tower: str(p.tower),
    subLocation: str(p.sub_location),
    location: area,
    city: str(p.city),
    lat,
    lng,
    status: str(p.property_status),
    completion: str(p.completion_status),
    beds: str(p.beds),
    baths: str(p.baths),
    built: str(p.surface_area?.built),
    furnished: str(p.furnished),
    featured: str(p.featured),
    lastUpdate: str(p.last_update),
    image: images[0]?.url || '',
    images: images.map((i) => i.url),
    imageCount: images.length,
    floorplans: images.filter((i) => i.floorplan).length,
    featureCount: features.length,
    agent: {
      name: str(p.agent?.name),
      mobile: str(p.agent?.mobile),
      photo: str(p.agent?.profile_picture),
    },
  }
}

// Cache the raw parsed feed so every loader/getStaticPaths call in a build
// reuses a single network fetch.
let rawPromise
function getRawProps() {
  if (!rawPromise) {
    rawPromise = (async () => {
      const res = await fetch(FEED_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return arr(parser.parse(await res.text())?.root?.property)
    })()
  }
  return rawPromise
}

async function fetchAll() {
  return (await getRawProps()).map(mapProperty)
}

// Memoized full mapped list (reused across all property pages in a build)
let allMappedPromise
function getAllMapped() {
  if (!allMappedPromise) allMappedPromise = getRawProps().then((raw) => raw.map(mapProperty))
  return allMappedPromise
}

const distanceKm = (a, b) => {
  if (a.lat == null || b.lat == null) return Infinity
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(s))
}

// Related = same purpose, ranked by same sub-location/area + same beds (BHK)
// + same type, tie-broken by geographic proximity.
function relatedFor(p, all) {
  const scored = all
    .filter((l) => l.ref !== p.ref && l.propertyFor === p.propertyFor)
    .map((l) => {
      let s = 0
      if (l.subLocation && l.subLocation === p.subLocation) s += 3
      else if (l.location && l.location === p.location) s += 2
      if (l.beds && l.beds === p.beds) s += 2
      if (l.type && l.type === p.type) s += 1
      return { l, s, d: distanceKm(p, l) }
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.d - b.d)
  const chosen = (scored.length ? scored : all.filter((l) => l.ref !== p.ref && l.propertyFor === p.propertyFor).map((l) => ({ l })))
    .slice(0, 6)
    .map(({ l }) => { const { images: _i, ...rest } = l; return rest })
  return chosen
}

// Full detail mapping for a single property page (everything the feed carries).
function mapPropertyFull(p) {
  let area = ''
  let lat = null
  let lng = null
  for (const l of arr(p.location)) {
    if (l && typeof l === 'object') {
      const la = Number(str(l.latitude)); const lo = Number(str(l.longitude))
      if (Number.isFinite(la) && Number.isFinite(lo) && (la !== 0 || lo !== 0)) { lat = la; lng = lo }
    } else if (l != null) area = str(l)
  }
  const imgs = arr(p.images?.image)
    .map((im) => ({ url: str(im?.url), floorplan: arr(im?.tags?.tag).some((t) => str(t).toLowerCase() === 'floorplan') }))
    .filter((i) => i.url)
  const features = [...new Set([...arr(p.features?.feature), ...arr(p.features?.amenity)].map(str).filter(Boolean))]

  return {
    ref: str(p.ref), title: str(p.title),
    price: str(p.price), currency: str(p.currency) || 'AED', priceFreq: str(p.price_freq),
    propertyType: str(p.property_type), propertyFor: str(p.property_for), type: str(p.type),
    tower: str(p.tower), subLocation: str(p.sub_location), location: area, city: str(p.city),
    country: str(p.country), locationDetail: str(p.location_detail), lat, lng,
    status: str(p.property_status), completion: str(p.completion_status),
    beds: str(p.beds), baths: str(p.baths), built: str(p.surface_area?.built), plot: str(p.surface_area?.plot),
    sizeUnit: str(p.size_unit) || 'SqFt', furnished: str(p.furnished), parking: str(p.parking),
    floor: str(p.floor), view: str(p.view), keyLocation: str(p.key_location),
    rentFrequency: str(p.rent_frequency), cheques: str(p.cheques), featured: str(p.featured),
    videoUrl: str(p.video_url), desc: str(p.desc),
    images: imgs.map((i) => i.url),
    floorplanImages: imgs.filter((i) => i.floorplan).map((i) => i.url),
    features,
    agent: {
      name: str(p.agent?.name), mobile: str(p.agent?.mobile), email: str(p.agent?.email),
      reference: str(p.agent?.reference), photo: str(p.agent?.profile_picture),
    },
  }
}

// One static page per property ref (prerendered at build).
export async function propertyPaths() {
  try {
    const raw = await getRawProps()
    return raw.map((p) => `/property/${str(p.ref)}`)
  } catch { return [] }
}

export async function propertyLoader({ params }) {
  try {
    const raw = await getRawProps()
    const found = raw.find((p) => str(p.ref) === params.ref)
    if (!found) return { property: null, related: [] }
    const property = mapPropertyFull(found)
    const related = relatedFor(property, await getAllMapped())
    return { property, related }
  } catch (e) {
    return { property: null, related: [], error: String(e?.message || e) }
  }
}

export async function feedLoader() {
  try {
    const all = await fetchAll()
    // Cap the prerendered payload for this preview page; expose the true total.
    return { listings: all.slice(0, 150), total: all.length }
  } catch (e) {
    return { listings: [], total: 0, error: String(e?.message || e) }
  }
}

// Home page — featured properties, newest first (by last_update).
// Falls back to newest overall if there aren't enough featured ones.
export async function homeLoader() {
  try {
    const all = (await getAllMapped()).map(({ images: _i, ...rest }) => rest)
    const newest = (a, b) => (b.lastUpdate || '').localeCompare(a.lastUpdate || '')
    const featured = all.filter((l) => /^yes$/i.test(l.featured)).sort(newest)
    const rest = all.filter((l) => !/^yes$/i.test(l.featured)).sort(newest)
    return { featured: [...featured, ...rest].slice(0, 8), featuredCount: featured.length }
  } catch (e) {
    return { featured: [], error: String(e?.message || e) }
  }
}

// Full browse-page dataset — lean cards (no per-listing image arrays) plus
// filter facets built from the real API tag values, with counts. Used both by
// the route loader (capped) and the build-time static JSON generator (full).
export async function buildListings() {
  const all = await fetchAll()
  const listings = all.map(({ images: _drop, ...rest }) => rest) // keep first image + coords, drop heavy arrays
  const facet = (key) => {
    const m = {}
    for (const l of listings) { const v = (l[key] || '').toString().trim(); if (v) m[v] = (m[v] || 0) + 1 }
    return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }))
  }
  return {
    listings,
    total: listings.length,
    mapped: listings.filter((l) => l.lat != null).length,
    facets: {
      propertyFor: facet('propertyFor'),
      type: facet('type'),
      location: facet('location'),
      city: facet('city'),
      status: facet('status'),
      beds: facet('beds'),
    },
  }
}

// Prerendered payload is capped so the initial HTML stays light; the client
// upgrades to the full set from /data/listings-all.json after first paint.
const LISTINGS_PRERENDER_CAP = 200

export async function listingsLoader() {
  try {
    const data = await buildListings()
    return { ...data, listings: data.listings.slice(0, LISTINGS_PRERENDER_CAP) }
  } catch (e) {
    return { listings: [], total: 0, facets: {}, error: String(e?.message || e) }
  }
}

// Off-plan listings (completion_status = "Off Plan" or "Off Plan Primary")
// + the place filter built from the real API locations, with counts.
export async function offPlanLoader() {
  try {
    const all = await fetchAll()
    // Cards link to detail pages (no lightbox) → drop the heavy per-listing
    // image arrays so the page payload stays small and loads fast.
    const listings = all.filter((l) => /off\s*plan/i.test(l.completion)).map(({ images: _i, ...rest }) => rest)
    const counts = {}
    for (const l of listings) {
      const area = l.location || 'Other'
      counts[area] = (counts[area] || 0) + 1
    }
    const places = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
    return { listings, places, total: listings.length }
  } catch (e) {
    return { listings: [], places: [], total: 0, error: String(e?.message || e) }
  }
}
