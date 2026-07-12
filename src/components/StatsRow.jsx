import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'motion/react'
import './StatsRow.css'

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Clients' },
  { value: 18,   suffix: '+', label: 'Years of Expertise' },
  { value: 200,  suffix: '+', label: 'Off-Plan Units Secured' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction' },
]

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
        onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
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
      className="sr-stat-card"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 * index }}
    >
      <div className="sr-stat-number">{display}{stat.suffix}</div>
      <div className="sr-stat-label">{stat.label}</div>
    </motion.div>
  )
}

export default function StatsRow() {
  return (
    <section className="sr-sec">
      <div className="sr-stats">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  )
}
