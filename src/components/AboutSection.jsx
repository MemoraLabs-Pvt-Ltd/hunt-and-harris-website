import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import './AboutSection.css'

const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const stats = [
  { value: '18',   label: 'Years of Experience' },
  { value: '5k+',  label: 'Happy Clients' },
  { value: '500+', label: 'Properties Sold' },
]

const fromTop = (delay = 0) => ({
  initial: { opacity: 0, y: -38 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
})

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: -38 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -38 },
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay },
  })

  return (
    <section className="ab-sec" ref={ref}>

      <motion.div className="ab-pill" {...anim(0)}>
        <PillIcon />
        About Us
      </motion.div>

      <motion.h2 className="ab-heading" {...anim(0.1)}>
        We help people find the right homes with care, trust and clear guidance every step of the way.
      </motion.h2>

      <div className="ab-bottom">

        <motion.div className="ab-img-wrap" {...anim(0.2)}>
          <img
            className="ab-img"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=700&fit=crop&auto=format&q=90"
            alt="Luxury property exterior"
          />
        </motion.div>

        <div className="ab-content">

          <motion.p
            className="ab-desc"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            We have been helping buyers, investors and families find their perfect home in RAK, guided by honest advice and a deep knowledge of the market since 2007.
          </motion.p>

          <div className="ab-stats">
            {stats.map((s, i) => (
              <motion.div className="ab-stat" key={s.label} {...anim(0.36 + i * 0.08)}>
                <div className="ab-stat-number">{s.value}</div>
                <div className="ab-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button className="ab-btn" {...anim(0.6)}>
            More About Us &nbsp;↗
          </motion.button>

        </div>

      </div>

    </section>
  )
}
