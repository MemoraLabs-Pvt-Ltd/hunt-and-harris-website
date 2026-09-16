import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import StatsRow from './StatsRow'
import CeoStatementStatic from './CeoStatementStatic'
import './CompanyBackground.css'

const EASE = [0.22, 1, 0.36, 1]

export default function CompanyBackground() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const rise = (delay) => ({
    initial: { opacity: 0, y: 34 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 },
    transition: { duration: 1.6, delay, ease: EASE },
  })

  return (
    <section className="cb-sec" ref={sectionRef}>
      <h2 className="cb-heading">
        Helping buyers, sellers, and investors find the<br />
        right homes in Ras Al Khaimah since 2007.
      </h2>

      <StatsRow />

      <CeoStatementStatic />

      <div className="cb-band">
        <div className="cb-band-inner">
          {/* Leadership — two people cards */}
          <motion.div className="cb-team-head" {...rise(0.05)}>
            <h3 className="cb-team-title">
              Guided by the vision of two<br />
              remarkable women.
            </h3>
          </motion.div>

          <div className="cb-team-grid">
            {[
              { name: 'Neema Kataria', role: 'Managing Partner', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=760&h=680&fit=crop&crop=faces&auto=format&q=90' },
              { name: 'Wendy Stapleton', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=760&h=680&fit=crop&crop=faces&auto=format&q=90' },
            ].map((p, i) => (
              <motion.div className="cb-team-card" key={p.name} {...rise(0.15 + i * 0.12)}>
                <div className="cb-team-img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="cb-team-namerow">
                  <span className="cb-team-name">{p.name}</span>
                  <a className="cb-team-linkedin" href="#" aria-label={`${p.name} on LinkedIn`}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.02 8h4.96v16H.02V8zm7.5 0h4.75v2.2h.07c.66-1.25 2.27-2.57 4.67-2.57 5 0 5.92 3.29 5.92 7.57V24h-4.96v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24H7.52V8z" />
                    </svg>
                  </a>
                </div>
                <span className="cb-team-role">{p.role}</span>
              </motion.div>
            ))}
          </div>

          {/* Mission & Vision — light editorial split */}
          <div className="cb-mv-wrap">
            <motion.div className="cb-mv-col" {...rise(0.1)}>
              <span className="cb-mv-num">01</span>
              <span className="cb-mv-label">Our Mission</span>
              <p className="cb-mv-body">
                To help every client make confident, well-informed property decisions by
                combining local expertise, complete transparency, and modern real estate
                tools &mdash; guiding buyers, sellers, and investors to the right home with
                clarity and care.
              </p>
            </motion.div>

            <motion.div className="cb-mv-col" {...rise(0.22)}>
              <span className="cb-mv-num">02</span>
              <span className="cb-mv-label">Our Vision</span>
              <p className="cb-mv-body">
                To be the most trusted real estate agency in the country &mdash; a place where
                people don&rsquo;t just close deals, but find where they belong, built on honest
                advice, lasting relationships, and a genuine understanding of what home means.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
