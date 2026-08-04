import './GridSkeleton.css'

export default function GridSkeleton({ count = 8, columns = 4 }) {
  return (
    <div className="sk-grid" style={{ '--sk-cols': columns }}>
      {Array.from({ length: count }).map((_, i) => (
        <div className="sk-card" key={i}>
          <div className="sk-img" />
          <div className="sk-body">
            <div className="sk-line sk-w40" />
            <div className="sk-line sk-w85" />
            <div className="sk-line sk-w55" />
          </div>
        </div>
      ))}
    </div>
  )
}
