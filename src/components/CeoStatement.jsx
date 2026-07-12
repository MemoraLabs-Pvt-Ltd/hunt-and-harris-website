import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import './CeoStatement.css'

// side + x offset from that edge, top, size, and parallax speed.
// Inner items (closer to centre) get a SMALL speed → drift slowly.
// Outer items (near the edges) get a LARGE speed → move rapidly.
const SIZE = 170
const OUTER = 420 // fast
const INNER = 130 // slow
const IN = 'calc(13% + 72px)'
const IMG = (id, faces) =>
  `https://images.unsplash.com/photo-${id}?w=420&h=420&fit=crop${faces ? '&crop=faces' : ''}&auto=format&q=80`

// Five media per column. Outer column (edge) moves fast, inner column (toward
// centre) moves slow. Inner rows are offset half a step for a staggered grid.
// Mix of homes, interiors, people meeting/talking and videos — not only faces.
const MEDIA = [
  // left — outer column (fast, 4)
  { side: 'left', x: '1.5%', top: 0,   speed: OUTER,      video: '/about-us/company-bg1.mp4' },
  { side: 'left', x: '1.5%', top: 320, speed: OUTER + 10, src: IMG('1613490493576-7fde63acd811') }, // bright modern home
  { side: 'left', x: '1.5%', top: 640, speed: OUTER,      src: IMG('1543269865-cbf427effbad') }, // friends laughing
  { side: 'left', x: '1.5%', top: 960, speed: OUTER + 8,  src: IMG('1600585154340-be6161a56a0c') }, // villa + pool
  // left — inner column (slow, 4)
  { side: 'left', x: IN, top: 160,  speed: INNER,      src: IMG('1600596542815-ffad4c1539a9') }, // bright home
  { side: 'left', x: IN, top: 480,  speed: INNER + 8,  src: IMG('1573496359142-b8d87734a5a2', true) }, // smiling woman
  { side: 'left', x: IN, top: 800,  speed: INNER,      src: IMG('1600210492493-0946911123ea') }, // bright interior
  { side: 'left', x: IN, top: 1120, speed: INNER + 10, src: IMG('1449844908441-8829872d2607') }, // locality / homes
  // right — outer column (fast, 4)
  { side: 'right', x: '1.5%', top: 0,   speed: OUTER + 8,  src: IMG('1512917774080-9991f1c4c750') }, // bright house
  { side: 'right', x: '1.5%', top: 320, speed: OUTER,      video: '/about-us/company-bg2.mp4' },
  { side: 'right', x: '1.5%', top: 640, speed: OUTER + 10, src: IMG('1521737604893-d14cc237f11d') }, // happy team
  { side: 'right', x: '1.5%', top: 960, speed: OUTER,      src: IMG('1568605114967-8130f3a36994') }, // bright modern home
  // right — inner column (slow, 4)
  { side: 'right', x: IN, top: 160,  speed: INNER + 8,  src: IMG('1600585154526-990dced4db0d') }, // bright interior
  { side: 'right', x: IN, top: 480,  speed: INNER,      src: IMG('1600880292203-757bb62b4baf') }, // people smiling
  { side: 'right', x: IN, top: 800,  speed: INNER + 10, src: IMG('1580587771525-78b9dba3b914') }, // bright home
  { side: 'right', x: IN, top: 1120, speed: INNER,      src: IMG('1570129477492-45c003edd2be') }, // bright home / street
  // centre — kept clear of the pinned text (top high, bottom low)
  { center: true, pos: 'top',    top: 20,   size: 200, speed: 0, src: IMG('1564013799919-ab600027ffc6') }, // bright home (top)
  { center: true, pos: 'bottom', top: 1400, size: 200, speed: 0, src: IMG('1600880292203-757bb62b4baf') }, // people (bottom)
]

function ParallaxItem({ item, progress }) {
  const y = useTransform(progress, [0, 1], [item.speed, -item.speed])
  const size = item.size || SIZE
  const style = { top: item.top, width: size, height: size, y }
  if (item.center) style.left = `calc(50% - ${size / 2}px)`
  else if (item.side === 'left') style.left = item.x
  else style.right = item.x

  return (
    <motion.div className={`ceo-media${item.center ? ` ceo-media-center ceo-media-${item.pos}` : ''}`} style={style}>
      {item.video ? (
        <video src={item.video} autoPlay muted loop playsInline />
      ) : (
        <img src={item.src} alt="" />
      )}
    </motion.div>
  )
}

export default function CeoStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section className="ceo-sec" ref={ref}>
      {MEDIA.map((m, i) => (
        <ParallaxItem key={i} item={m} progress={scrollYProgress} />
      ))}

      <div className="ceo-center">
        <div className="ceo-center-inner">
          <p className="ceo-kicker">We built more than an agency.</p>

          <p className="ceo-body">
            For nearly two decades, Hunt &amp; Harris has guided families, investors and
            first-time buyers to the right home in Ras Al Khaimah &mdash; powered by honest
            advice, deep local knowledge, and a genuine belief that finding a home should
            feel personal, never transactional.
          </p>

          <p className="ceo-attr">
            <span className="ceo-attr-name">Neema Kataria</span>
            <span className="ceo-attr-role">Managing Partner, Hunt &amp; Harris</span>
          </p>
        </div>
      </div>
    </section>
  )
}
