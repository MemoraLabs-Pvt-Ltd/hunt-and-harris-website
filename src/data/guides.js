// Downloadable PDF guides. Files live in /public/guides and are served
// as same-origin static assets so the browser can download them directly.
const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=760&q=85`

export const GUIDES = [
  {
    slug: 'buyers-guide',
    title: 'Buyers Guide',
    desc: 'Everything you need to know before buying a home in Ras Al Khaimah — from budgeting and mortgages to the transfer process.',
    file: '/guides/buyers-guide.pdf',
    img: IMG('1560518883-ce09059eeffa'),
  },
  {
    slug: 'listing-guide',
    title: 'Listing Guide',
    desc: 'A step-by-step walkthrough of selling your property with confidence — pricing, preparation, marketing and completion.',
    file: '/guides/listing-guide.pdf',
    img: IMG('1600596542815-ffad4c1539a9'),
  },
  {
    slug: 'rental-guide',
    title: 'Rental Guide',
    desc: 'For tenants and landlords alike — how renting works in RAK, from tenancy contracts to your rights and responsibilities.',
    file: '/guides/rental-guide.pdf',
    img: IMG('1600585154340-be6161a56a0c'),
  },
  {
    slug: 'off-plan-guide',
    title: 'Off-Plan Guide',
    desc: 'Understand off-plan investing — payment plans, developer due diligence, handover timelines and how to buy early with confidence.',
    file: '/guides/off-plan-guide.pdf',
    img: IMG('1582407947304-fd86f028f716'),
  },
  {
    slug: 'why-list-exclusively',
    title: 'Why List Exclusively',
    desc: 'The case for an exclusive listing — how a focused strategy delivers stronger marketing, better buyers and a smoother sale.',
    file: '/guides/why-list-exclusively.pdf',
    img: IMG('1521737604893-d14cc237f11d'),
  },
]
