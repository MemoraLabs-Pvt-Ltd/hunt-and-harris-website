// Static duplicate of CeoStatement — same design/layout, but the surrounding
// images do NOT parallax on scroll (they sit at their base positions). Reuses
// CeoStatement.css so the look is identical. The animated original is kept in
// CeoStatement.jsx.
import './CeoStatement.css'

const SIZE = 170
const OUTER = 420
const INNER = 130
const IN = 'calc(13% + 72px)'
const IMG = (id, faces) =>
  `https://images.unsplash.com/photo-${id}?w=420&h=420&fit=crop${faces ? '&crop=faces' : ''}&auto=format&q=80`

const MEDIA = [
  // left — outer column (second row removed, rows below pulled up)
  { side: 'left', x: '1.5%', top: 0,   speed: OUTER,      video: '/about-us/company-bg1.mp4' },
  { side: 'left', x: '1.5%', top: 320, speed: OUTER,      src: IMG('1543269865-cbf427effbad') },
  { side: 'left', x: '1.5%', top: 640, speed: OUTER + 8,  src: IMG('1600585154340-be6161a56a0c') },
  // left — inner column
  { side: 'left', x: IN, top: 160, speed: INNER,      src: IMG('1600596542815-ffad4c1539a9') },
  { side: 'left', x: IN, top: 480, speed: INNER,      src: IMG('1600210492493-0946911123ea') },
  { side: 'left', x: IN, top: 800, speed: INNER + 10, src: IMG('1449844908441-8829872d2607') },
  // right — outer column
  { side: 'right', x: '1.5%', top: 0,   speed: OUTER + 8,  src: IMG('1512917774080-9991f1c4c750') },
  { side: 'right', x: '1.5%', top: 320, speed: OUTER + 10, src: IMG('1521737604893-d14cc237f11d') },
  { side: 'right', x: '1.5%', top: 640, speed: OUTER,      src: IMG('1568605114967-8130f3a36994') },
  // right — inner column
  { side: 'right', x: IN, top: 160, speed: INNER + 8,  src: IMG('1600585154526-990dced4db0d') },
  { side: 'right', x: IN, top: 480, speed: INNER + 10, src: IMG('1580587771525-78b9dba3b914') },
  { side: 'right', x: IN, top: 800, speed: INNER,      src: IMG('1570129477492-45c003edd2be') },
  // centre
  { center: true, pos: 'top',    top: 20,   size: 200, speed: 0, src: IMG('1564013799919-ab600027ffc6') },
  { center: true, pos: 'bottom', top: 1080, size: 200, speed: 0, src: IMG('1600880292203-757bb62b4baf') },
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

export default function CeoStatementStatic() {
  return (
    <section className="ceo-sec ceo-static">
      {MEDIA.map((m, i) => (
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
