import { useRef } from 'react'
import { motion, useScroll, useInView, useTransform } from 'motion/react'
import './OurHistory.css'

const milestones = [
  {
    year: '2007',
    title: 'The idea sparked',
    body: 'It all started with a few passionate agents who believed real estate could be simpler, more transparent, and a lot more human. With a few laptops, endless coffee, and a shared dream, the journey began from a small office with big ambitions.',
    img: '/photos/waterfront-townhouses.jpg',
  },
  {
    year: '2011',
    title: 'The first breakthrough',
    body: 'After helping our first 100 clients find their perfect homes, word began to spread. People loved our honest advice and easy-going approach — no pressure, no jargon, just genuine help.',
    img: null,
  },
  {
    year: '2015',
    title: 'Growing across RAK',
    body: 'We expanded our team and opened new doors across Ras Al Khaimah, becoming a trusted name for buyers, sellers and investors looking for guidance they could truly rely on.',
    img: '/photos/rak-aerial-3.jpg',
  },
  {
    year: '2019',
    title: 'A modern approach',
    body: 'We embraced technology and off-plan expertise, giving our clients smarter tools and clearer insights to make confident property decisions in a fast-moving market.',
    img: null,
  },
  {
    year: '2026',
    title: 'Where we are today',
    body: "Thousands of happy families later, we're still driven by the same belief we started with — that finding a home should feel personal, honest and effortless.",
    img: '/photos/rak-aerial-hero.jpg',
  },
]

function Milestone({ item }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.6 })

  return (
    <div className="hist-item" ref={ref}>
      <div className="hist-marker-row">
        <span className={`hist-node${inView ? ' is-active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v13M6 12l6 6 6-6" />
          </svg>
        </span>
        <span className="hist-dots" />
        <span className="hist-year">{item.year}</span>
      </div>

      <motion.div
        className="hist-card"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="hist-card-title">{item.title}</h3>
        <p className="hist-card-body">{item.body}</p>
        {item.img && <img className="hist-card-img" src={item.img} alt={item.title} />}
      </motion.div>
    </div>
  )
}

export default function OurHistory() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  // Reveal the gradient line top-to-bottom so it grows darker as you scroll
  const lineClip = useTransform(scrollYProgress, [0, 1], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'])

  return (
    <section className="hist-sec">
      <div className="hist-inner">
        <div className="hist-left">
          <h2 className="hist-title">Our journey<br />through the years</h2>
        </div>

        <div className="hist-timeline" ref={timelineRef}>
          <div className="hist-track" />
          <motion.div className="hist-progress" style={{ clipPath: lineClip }} />

          {milestones.map((m) => (
            <Milestone key={m.year} item={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
