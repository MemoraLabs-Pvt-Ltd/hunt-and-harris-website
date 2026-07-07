import { motion } from 'motion/react'
import './GoogleReviews.css'

const reviews = [
  {
    name: 'Mohammed Al Shamsi',
    location: 'Ras Al Khaimah',
    rating: 5,
    text: 'Exceptional service from start to finish. The team at Hunt & Harris guided us through every step of purchasing our villa in Al Hamra Village. Couldn\'t have asked for a smoother experience.',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Sarah & Tom Whitfield',
    location: 'United Kingdom',
    rating: 5,
    text: 'We were buying from overseas and were nervous about the process. Hunt & Harris made it completely stress-free. Professional, transparent, and genuinely looking out for our best interests.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Priya Suresh',
    location: 'Dubai',
    rating: 5,
    text: 'Found our dream apartment at Mina Al Arab through them. The off-plan access they provided was incredible — we got in early at the best price. Highly recommend for investors.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Khalid Al Nuaimi',
    location: 'Abu Dhabi',
    rating: 5,
    text: 'James and his team have deep knowledge of the RAK market that you simply won\'t find anywhere else. They found us exactly what we wanted at Al Marjan Island within our budget.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Elena Volkov',
    location: 'Russia',
    rating: 5,
    text: 'From the very first call, they understood what we needed. The conveyancing was handled in-house which saved us so much time. We are now proud owners in RAK thanks to Hunt & Harris.',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    name: 'Aarav Mehta',
    location: 'India',
    rating: 5,
    text: 'Very professional team. They only showed us properties that matched our criteria — no time wasted. The rental management service has been excellent ever since we purchased.',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    name: 'Fatima Al Rashidi',
    location: 'Kuwait',
    rating: 5,
    text: 'Hunt & Harris helped us find the perfect family villa in RAK. Their attention to detail and commitment to finding the right fit — not just any property — was outstanding.',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    name: 'James O\'Brien',
    location: 'Ireland',
    rating: 5,
    text: 'As a first-time buyer in the UAE, I needed hand-holding through the entire process. The team was patient, knowledgeable and made the whole experience genuinely enjoyable.',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    name: 'Nadia Petrov',
    location: 'Ukraine',
    rating: 5,
    text: 'We compared several agencies before choosing Hunt & Harris. The difference in professionalism and market knowledge was immediately obvious. Closed on our penthouse in under three weeks.',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    name: 'Carlos Reyes',
    location: 'Spain',
    rating: 5,
    text: 'Relocating to RAK was a big decision and Hunt & Harris made it simple. They matched us with a property that ticked every box and the after-sales support has been outstanding.',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    name: 'Aisha Al Mansoori',
    location: 'Sharjah',
    rating: 5,
    text: 'Dealt with multiple agencies across the UAE and Hunt & Harris stands head and shoulders above the rest. Transparent, honest, and truly dedicated to finding the right fit.',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    name: 'David & Lisa Chen',
    location: 'Singapore',
    rating: 5,
    text: 'We purchased our holiday home at Al Marjan Island through Hunt & Harris. The entire process — from viewing to title deed — was handled seamlessly. Absolutely five stars.',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    name: 'Olga Kovalenko',
    location: 'Germany',
    rating: 5,
    text: 'Incredibly professional and responsive team. They handled all the paperwork and legalities so we could focus on the excitement of owning our first UAE property.',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    name: 'Tariq Al Hashimi',
    location: 'Oman',
    rating: 5,
    text: 'Outstanding knowledge of the RAK off-plan market. They secured us an early-access unit at a developer-direct price that we could not have found anywhere else.',
    image: 'https://randomuser.me/api/portraits/men/88.jpg',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= count ? '#FBBC04' : '#e5e7eb'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialsColumn({ testimonials, duration = 15 }) {
  return (
    <div className="gr-col-wrap">
      <div className="gr-col-track" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map(idx => (
          testimonials.map((r, i) => (
            <div key={`${idx}-${i}`} className="gr-tcard">
              <Stars count={r.rating} />
              <p className="gr-ttext">{r.text}</p>
              <div className="gr-tauthor">
                <img src={r.image} alt={r.name} className="gr-tavatar" />
                <div>
                  <div className="gr-tname">{r.name}</div>
                  <div className="gr-tloc">{r.location}</div>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  )
}

const col1 = reviews.slice(0, 5)
const col2 = reviews.slice(5, 10)
const col3 = reviews.slice(10, 15)

export default function GoogleReviews() {
  return (
    <section className="gr-sec">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="gr-head"
      >
        <h2 className="gr-title">What Our Clients Say</h2>
        <p className="gr-sub">Real experiences from buyers, investors and families who found their place in RAK with us</p>

        <div className="inline-flex flex-wrap items-center justify-center p-1 rounded-full bg-white border border-gray-300 text-sm mb-8" style={{ marginTop: '24px' }}>
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" className="rounded-full border-2 border-white w-[30px] h-[30px] object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" className="rounded-full border-2 border-white w-[30px] h-[30px] object-cover -translate-x-2" alt="" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" className="rounded-full border-2 border-white w-[30px] h-[30px] object-cover -translate-x-4" alt="" />
          </div>
          <p className="-translate-x-2 pr-2 text-gray-700">Trusted by <strong className="text-gray-900">5,000+</strong> people</p>
        </div>
      </motion.div>

      <div className="gr-columns">
        <TestimonialsColumn testimonials={col1} duration={18} />
        <TestimonialsColumn testimonials={col2} duration={22} />
        <TestimonialsColumn testimonials={col3} duration={20} />
      </div>
    </section>
  )
}
