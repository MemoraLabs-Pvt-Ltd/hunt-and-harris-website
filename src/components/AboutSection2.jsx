import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'motion/react'
import './AboutSection2.css'

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Clients' },
  { value: 18,   suffix: '+', label: 'Years of Expertise' },
  { value: 200,  suffix: '+', label: 'Off-Plan Units Secured' },
  { value: 4.8,  suffix: '★', decimals: 1, label: 'Rated on Google' },
]

const images = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=520&h=380&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=520&h=380&fit=crop&auto=format&q=85',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=520&h=380&fit=crop&auto=format&q=85',
]

const VP = { once: false, amount: 0.25 }

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, stat.value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setDisplay(
          stat.decimals
            ? v.toFixed(stat.decimals)
            : Math.round(v).toLocaleString()
        ),
      })
      return controls.stop
    } else {
      motionVal.set(0)
      setDisplay('0')
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      className="as2-stat-card"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 * index }}
    >
      <div className="as2-stat-number">{display}<span style={stat.suffix === '★' ? { fontSize: '0.6em', verticalAlign: '0.08em', marginLeft: '0.05em' } : undefined}>{stat.suffix}</span></div>
      <div className="as2-stat-label">{stat.label}</div>
    </motion.div>
  )
}

export default function AboutSection2() {
  return (
    <section className="as2-sec">

      {/* <motion.div className="as2-pill" ...>Who We Are</motion.div> */}

      <motion.h2
        className="as2-heading"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <span className="as2-dim">We have been helping buyers, investors</span>
        {' '}<span className="as2-strong">and families find their perfect home</span>
        {' '}<span className="as2-strong">in RAK, guided by honest advice and</span>
        {' '}<span className="as2-dim">a deep knowledge of the market</span>
        {' '}<span className="as2-strong">since 2007.</span>
      </motion.h2>

      <div className="as2-images">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="as2-img-wrap"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
          >
            <img className="as2-img" src={src} alt={`Property ${i + 1}`} />
          </motion.div>
        ))}
      </div>

      {/* <motion.div className="as2-impact-pill" ...>Our Impact</motion.div> */}

      <div className="as2-stats">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      <motion.div
        className="as2-know-more-wrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <a href="/about" className="as2-know-more-btn" style={{ textDecoration: 'none' }}>
          Know More About Us
          <span className="as2-arrow">↗</span>
        </a>
      </motion.div>

    </section>
  )
}
