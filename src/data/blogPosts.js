// Blog content. Author posts here — each needs a unique `slug`, the card fields,
// and a `body` (array of { type: 'p' | 'h2', text }). Placeholder article copy is
// included; replace the body text with the real articles when ready.
const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=760&q=85`

export const CATEGORIES = [
  'All', 'Market Reports', 'Buying Guides', 'Off-Plan',
  'Investment', 'Areas', 'Selling', 'Lifestyle',
]

const P = (text) => ({ type: 'p', text })
const H = (text) => ({ type: 'h2', text })

export const POSTS = [
  {
    slug: 'why-rak-outperforms-dubai-rental-yield',
    category: 'Market Reports',
    title: 'Why RAK Is Outperforming Dubai on Rental Yield',
    excerpt: 'Ras Al Khaimah is quietly delivering some of the strongest returns in the UAE. Here is what the numbers actually say.',
    img: IMG('1512453979798-5ea266f8880c'),
    date: 'June 2026',
    read: '6 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('For years, UAE property conversations started and ended with Dubai. That is changing. Ras Al Khaimah is now delivering gross rental yields that consistently edge out the more established emirate — and the gap is drawing serious investor attention.'),
      H('The yield story'),
      P('Lower entry prices combined with strong, steady rental demand mean many RAK communities return between 7% and 9% gross — comfortably above the Dubai average. For buy-to-let investors, that spread compounds meaningfully over time.'),
      H('Why demand is holding up'),
      P('Tourism, new resorts and a growing resident population have kept occupancy high. As RAK positions itself as a lifestyle and leisure destination, both short-term and long-term rental demand continue to build.'),
      P('Numbers move, so treat these as a snapshot rather than a promise — but the direction of travel is clear. Talk to us for a community-by-community breakdown of current yields.'),
    ],
  },
  {
    slug: 'wynn-effect-al-marjan-values',
    category: 'Off-Plan',
    title: 'The Wynn Effect: What the New Resort Means for Al Marjan Values',
    excerpt: 'The region’s first integrated resort is reshaping Al Marjan Island. We break down the impact on prices and demand.',
    img: IMG('1582407947304-fd86f028f716'),
    date: 'May 2026',
    read: '7 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Al Marjan Island has become the most talked-about address in Ras Al Khaimah — and the arrival of the region’s first integrated resort is the reason why. The ripple effects on nearby property values are already visible.'),
      H('A demand magnet'),
      P('Large-scale hospitality projects bring jobs, visitors and international visibility. That translates directly into demand for both homes and short-stay rentals in the surrounding communities.'),
      H('What it means for buyers'),
      P('Early buyers on Al Marjan have already seen off-plan prices firm up. For investors, the combination of capital appreciation potential and strong holiday-let demand is compelling — provided you choose the right project and payment plan.'),
      P('Off-plan carries its own considerations. We help you weigh developer track record, handover timelines and exit strategy before you commit.'),
    ],
  },
  {
    slug: 'buy-freehold-property-rak-foreign-national',
    category: 'Buying Guides',
    title: 'How to Buy Freehold Property in RAK as a Foreign National',
    excerpt: 'Everything international buyers need to know about freehold ownership, paperwork and the transfer process.',
    img: IMG('1560518883-ce09059eeffa'),
    date: 'April 2026',
    read: '8 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Ras Al Khaimah welcomes international buyers, and freehold ownership in designated areas is straightforward once you know the steps. Here is the process from offer to keys.'),
      H('Freehold zones'),
      P('Foreign nationals can own freehold in designated communities such as Al Hamra Village, Al Marjan Island and Mina Al Arab. Freehold means you own the property and the land it sits on outright.'),
      H('The paperwork'),
      P('You will need your passport, a signed sales agreement (MOU), and a deposit — typically 10%. The transfer is completed at the RAK Land Department, where the title deed is issued in your name.'),
      H('Costs to budget for'),
      P('Beyond the purchase price, factor in transfer fees, an agency fee and any service charges. Our team walks you through the full cost breakdown up front, so there are no surprises at transfer.'),
    ],
  },
  {
    slug: 'al-hamra-village-investor-community',
    category: 'Investment',
    title: 'Al Hamra Village: The Waterfront Community Investors Return To',
    excerpt: 'Mature, walkable and consistently in demand — why Al Hamra remains a favourite for long-term investors.',
    img: IMG('1600596542815-ffad4c1539a9'),
    date: 'April 2026',
    read: '5 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Some communities are hype; others are proven. Al Hamra Village is firmly in the second camp — a mature, waterfront community that investors keep coming back to.'),
      H('Why it works'),
      P('A golf course, marina, beach, hotels and retail all within a walkable footprint make Al Hamra a genuine lifestyle destination. That depth of amenities keeps both residents and tenants loyal.'),
      H('The investment case'),
      P('Established communities tend to offer steadier occupancy and more predictable resale demand than brand-new launches. For investors prioritising stability, Al Hamra is hard to beat.'),
      P('Ask us for current availability and rental performance across Al Hamra’s villas, townhouses and apartments.'),
    ],
  },
  {
    slug: 'living-in-rak-resident-experience',
    category: 'Lifestyle',
    title: 'Living in RAK: What Residents Say After 12 Months',
    excerpt: 'Beaches, mountains and a slower pace — real residents share what daily life is actually like in Ras Al Khaimah.',
    img: IMG('1600585154340-be6161a56a0c'),
    date: 'March 2026',
    read: '5 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('What is it really like to live in Ras Al Khaimah once the novelty wears off? We asked residents who have called RAK home for a year or more.'),
      H('The pace'),
      P('The word that comes up again and again is “calm.” RAK offers the conveniences of the UAE with noticeably less traffic, more space and easy access to both beach and mountains.'),
      H('The trade-offs'),
      P('Residents are honest about the trade-offs — fewer nightlife options than Dubai, and some errands still mean a drive. But for families and remote workers, most say the balance is well worth it.'),
      P('Thinking of making the move? We can match you with the community that fits your lifestyle and budget.'),
    ],
  },
  {
    slug: 'mina-al-arab-vs-al-marjan-island',
    category: 'Areas',
    title: 'Mina Al Arab vs Al Marjan Island: Which Community Fits You?',
    excerpt: 'Two of RAK’s most popular waterfront addresses, compared on price, lifestyle and investment potential.',
    img: IMG('1600607687939-ce8a6c25118c'),
    date: 'March 2026',
    read: '6 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Mina Al Arab and Al Marjan Island are two of RAK’s most sought-after waterfront communities — but they suit different buyers. Here is how they compare.'),
      H('Al Marjan Island'),
      P('Man-made islands, a growing resort scene and strong short-let potential make Al Marjan the choice for investors chasing capital growth and holiday-rental demand.'),
      H('Mina Al Arab'),
      P('Nature reserves, quieter beaches and an established residential feel make Mina Al Arab a favourite for families and end-users who want to live in the home they buy.'),
      P('Not sure which fits? Tell us your goals and we will point you to the right side of the water.'),
    ],
  },
  {
    slug: 'upgrades-that-add-value-before-selling-rak',
    category: 'Selling',
    title: '5 Upgrades That Actually Add Value Before You Sell in RAK',
    excerpt: 'Not every renovation pays off. Here are the improvements buyers in RAK genuinely pay more for.',
    img: IMG('1568605114967-8130f3a36994'),
    date: 'February 2026',
    read: '4 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Before you list, it is tempting to renovate everything. Don’t. A handful of targeted upgrades deliver most of the return — the rest rarely pays for itself.'),
      H('Where to spend'),
      P('Fresh, neutral paint, updated kitchen and bathroom fittings, quality lighting, and professional deep-cleaning consistently lift both perceived value and sale price. Curb appeal and a tidy outdoor space matter more than buyers admit.'),
      H('Where to save'),
      P('Bold personal finishes, over-specced smart-home systems and full structural reconfigurations rarely return their cost. Buyers want a clean canvas, not someone else’s taste.'),
      P('We can walk your property before listing and tell you exactly which upgrades are worth it for your target buyer.'),
    ],
  },
  {
    slug: 'rak-property-price-trends-2026-half-year',
    category: 'Market Reports',
    title: 'RAK Property Price Trends: 2026 Half-Year Review',
    excerpt: 'A data-led look at how prices have moved across communities in the first half of the year.',
    img: IMG('1613490493576-7fde63acd811'),
    date: 'February 2026',
    read: '7 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('The first half of 2026 has been an active one for Ras Al Khaimah property. Here is our data-led read on where prices moved, and why.'),
      H('The headline'),
      P('Waterfront and off-plan communities led price growth, buoyed by resort-driven demand, while established areas held firm on the back of steady end-user activity.'),
      H('What’s driving it'),
      P('New launches, infrastructure investment and rising international awareness of RAK continue to support values. Supply is growing, but demand has so far kept pace.'),
      P('Want the full community-by-community numbers? Reach out for our latest market brief.'),
    ],
  },
  {
    slug: 'short-term-vs-long-term-rentals-rak',
    category: 'Investment',
    title: 'Short-Term vs Long-Term Rentals: Where the Yields Are',
    excerpt: 'Holiday lets or annual tenants? We compare the returns, effort and rules for each strategy in RAK.',
    img: IMG('1580587771525-78b9dba3b914'),
    date: 'January 2026',
    read: '6 min read',
    author: 'The Hunt & Harris Team',
    body: [
      P('Should you rent your RAK property to holidaymakers or lock in an annual tenant? Both work — but they suit different investors and different properties.'),
      H('Short-term lets'),
      P('In tourist-heavy areas like Al Marjan, short-term rentals can deliver higher gross returns, especially in peak season. The trade-off is more active management, higher running costs and occupancy that swings with the calendar.'),
      H('Long-term tenancies'),
      P('Annual leases offer predictable income and far less day-to-day effort. For hands-off investors, the slightly lower gross yield is often worth the stability.'),
      P('Our property management team runs both models — tell us your property and goals, and we’ll model the numbers for you.'),
    ],
  },
]

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null
}

// Route helpers for prerendering /blog/:slug
export function blogPostPaths() {
  return POSTS.map((p) => `/blog/${p.slug}`)
}

export function blogPostLoader({ params }) {
  const post = getPost(params.slug)
  if (!post) return { post: null, related: [] }
  const related = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const fill = POSTS.filter((p) => p.slug !== post.slug && !related.includes(p))
  return { post, related: [...related, ...fill].slice(0, 3) }
}
