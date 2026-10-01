// Static duplicate of CeoStatement — same design/layout, but the surrounding
// images do NOT parallax on scroll (they sit at their base positions). Reuses
// CeoStatement.css so the look is identical. The animated original is kept in
// CeoStatement.jsx.
import './CeoStatement.css'

const SIZE = 170
const OUTER = 420
const INNER = 130
const IN = 'calc(13% + 72px)'
const J = (n) => `/photos/journey/j${n}.jpg`

const MEDIA = [
  // left — outer column (second row removed, rows below pulled up)
  { side: 'left', x: '1.5%', top: 0,   speed: OUTER,      video: '/about-us/company-bg1.mp4' },
  { side: 'left', x: '1.5%', top: 320, speed: OUTER,      src: J(1) },
  { side: 'left', x: '1.5%', top: 640, speed: OUTER + 8,  src: J(2) },
  // left — inner column
  { side: 'left', x: IN, top: 160, speed: INNER,      src: J(3) },
  { side: 'left', x: IN, top: 480, speed: INNER,      src: J(4) },
  { side: 'left', x: IN, top: 800, speed: INNER + 10, src: J(5) },
  // right — outer column
  { side: 'right', x: '1.5%', top: 0,   speed: OUTER + 8,  src: J(6) },
  { side: 'right', x: '1.5%', top: 320, speed: OUTER + 10, src: J(7) },
  { side: 'right', x: '1.5%', top: 640, speed: OUTER,      src: J(8) },
  // right — inner column
  { side: 'right', x: IN, top: 160, speed: INNER + 8,  src: J(9) },
  { side: 'right', x: IN, top: 480, speed: INNER + 10, src: J(10) },
  { side: 'right', x: IN, top: 800, speed: INNER,      src: J(11) },
  // centre
  { center: true, pos: 'top',    top: 20,   size: 200, speed: 0, src: J(12) },
  { center: true, pos: 'bottom', top: 1080, size: 200, speed: 0, src: J(13) },
]

function StaticItem({ item }) {
  const size = item.size || SIZE
  const style = { top: item.top, width: size, height: size }
  if (item.center) style.left = `calc(50% - ${size / 2}px)`
  else if (item.side === 'left') style.left = item.x
  else style.right = item.x

  return (
    <div className={`ceo-media${item.center ? ` ceo-media-center ceo-media-${item.pos}` : ''}`} style={style}>
      {item.video ? (
        <video src={item.video} autoPlay muted loop playsInline />
      ) : (
        <img src={item.src} alt="" />
      )}
    </div>
  )
}

// Set to true to show the scattered photos around the statement again.
const SHOW_MEDIA = false

export default function CeoStatementStatic() {
  return (
    <section className={`ceo-sec ceo-static${SHOW_MEDIA ? '' : ' ceo-nomedia'}`}>
      {SHOW_MEDIA && MEDIA.map((m, i) => (
        <StaticItem key={i} item={m} />
      ))}

      <div className="ceo-center">
        <div className="ceo-center-inner">
          <p className="ceo-kicker">We built more than an agency.</p>

          <p className="ceo-body">
            For nearly two decades, Hunt &amp; Harris Real Estate has guided families, investors and
            first-time buyers to the right home in Ras Al Khaimah &mdash; powered by honest
            advice, deep local knowledge, and a genuine belief that finding a home should
            feel personal, never transactional.
          </p>

          <p className="ceo-attr">
            <span className="ceo-attr-name">Neema Kataria</span>
            <span className="ceo-attr-role">Managing Partner, Hunt &amp; Harris Real Estate</span>
          </p>
        </div>
      </div>
    </section>
  )
}
