const IMG = (id, w = 1200, h = 850) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

// Pool of property/interior images reused across the listings
const POOL = [
  '1600585154340-be6161a56a0c',
  '1600607687939-ce8a6c25118c',
  '1568605114967-8130f3a36994',
  '1600596542815-ffad4c1539a9',
  '1613490493576-7fde63acd811',
  '1580587771525-78b9dba3b914',
  '1570129477492-45c003edd2be',
  '1600210492493-0946911123ea',
  '1600585154526-990dced4db0d',
  '1512917774080-9991f1c4c750',
  '1613977257363-707ba9348227',
  '1449844908441-8829872d2607',
  '1560518883-ce09059eeffa',
  '1560520653-9e0e4c89eb11',
  '1554224155-6726b3ff858f',
]

export const PLACES = [
  'All',
  'Al Marjan Island',
  'Al Hamra Village',
  'Mina Al Arab',
  'Al Zorah',
  'Ras Al Khaimah City',
  'Dafan Al Nakheel',
  'Al Hamriyah',
]

const RAW = [
  ['Marjan Heights', 'Al Marjan Island'],
  ['Pearl Bay Residences', 'Al Marjan Island'],
  ['Marina Vista', 'Al Marjan Island'],
  ['Azure Marjan', 'Al Marjan Island'],
  ['The Cove Tower', 'Al Marjan Island'],
  ['Marjan Beach Residences', 'Al Marjan Island'],
  ['Al Hamra Waterfront', 'Al Hamra Village'],
  ['Falcon Island Villas', 'Al Hamra Village'],
  ['Lagoon Views', 'Al Hamra Village'],
  ['Golf Vista Residences', 'Al Hamra Village'],
  ['Bab Al Bahr Suites', 'Al Hamra Village'],
  ['Gateway Residences', 'Mina Al Arab'],
  ['Marbella Villas', 'Mina Al Arab'],
  ['Hayat Island Towers', 'Mina Al Arab'],
  ['Junoon Residences', 'Mina Al Arab'],
  ['Quattro Del Mar', 'Mina Al Arab'],
  ['Al Zorah Marina', 'Al Zorah'],
  ['Nikki Beach Residences', 'Al Zorah'],
  ['The Gardens at Zorah', 'Al Zorah'],
  ['Julphar Heights', 'Ras Al Khaimah City'],
  ['City Centre Residences', 'Ras Al Khaimah City'],
  ['Corniche Views', 'Ras Al Khaimah City'],
  ['Nakheel Gardens', 'Dafan Al Nakheel'],
  ['Palm Court Residences', 'Dafan Al Nakheel'],
  ['Hamriyah Bay', 'Al Hamriyah'],
  ['Coastal Living Residences', 'Al Hamriyah'],
]

const HANDOVERS = ['Q4 2026', 'Q2 2027', 'Q1 2028', 'Q3 2027', 'Q4 2027']
const BEDS = ['1 – 3 Bed', 'Studio – 2 Bed', '2 – 4 Bed', '1 – 4 Bed', '3 – 5 Bed']

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const properties = RAW.map(([name, location], i) => ({
  slug: slugify(name),
  name,
  location,
  status: 'Off-Plan',
  image: IMG(POOL[i % POOL.length], 1200, 850),
  gallery: Array.from({ length: 6 }, (_, k) => IMG(POOL[(i + k) % POOL.length], 1400, 950)),
  priceFrom: `AED ${(0.9 + (i % 9) * 0.35).toFixed(1)}M`,
  handover: HANDOVERS[i % HANDOVERS.length],
  beds: BEDS[i % BEDS.length],
  description:
    `${name} is an exclusive off-plan development in ${location}, Ras Al Khaimah — offering ` +
    `contemporary residences with premium finishes, resort-style amenities and striking ` +
    `waterfront and skyline views. Thoughtfully designed for modern living and strong ` +
    `investment potential, it blends architectural elegance with the relaxed coastal lifestyle ` +
    `Ras Al Khaimah is celebrated for.`,
}))

export const getProperty = (slug) => properties.find((p) => p.slug === slug)
