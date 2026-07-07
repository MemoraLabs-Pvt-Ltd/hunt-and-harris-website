import { useState, useEffect, useRef } from 'react'
import './TestimonialsSpotlight.css'

const testimonials = [
  {
    text: "Hunt & Harris made our property search in RAK completely effortless. Their team's knowledge of the local market and genuine care for our needs was unlike any agency we had ever worked with before.",
    name: "Sarah Mitchell",
    role: "Homeowner, Al Hamra Village",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "From the very first consultation to the final handover, every single step was handled with professionalism and full transparency. We felt truly supported throughout the entire journey.",
    name: "James Thornton",
    role: "Property Investor, Mina Al Arab",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "We relocated from London and were naturally nervous about purchasing property abroad. Hunt & Harris gave us complete confidence — their expertise and honesty made all the difference.",
    name: "Priya & Rohan Mehta",
    role: "Buyers, Hayat Island",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
  },
  {
    text: "The team went above and beyond to find us a property that matched exactly what we were looking for. Their dedication to our brief and their market knowledge is truly second to none.",
    name: "David Al-Rashid",
    role: "Investment Client, Ras Al Khaimah",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face&auto=format&q=80",
  },
]

export default function TestimonialsSpotlight() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const goTo = (i) => {
    if (i === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(i)
      setVisible(true)
    }, 380)
    resetTimer()
  }

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((active + 1) % testimonials.length)

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(autoAdvance, 7000)
  }

  const autoAdvance = () => {
    setVisible(false)
    setTimeout(() => {
      setActive(prev => (prev + 1) % testimonials.length)
      setVisible(true)
    }, 380)
  }

  useEffect(() => {
    timerRef.current = setInterval(autoAdvance, 7000)
    return () => clearInterval(timerRef.current)
  }, [])

  const t = testimonials[active]

  return (
    <section className="ts-sec">
      <div className="ts-inner">
        <div className="ts-quote-mark">"</div>

        <div className="ts-body" style={{ opacity: visible ? 1 : 0 }}>
          <p className="ts-text">{t.text}</p>
          <div className="ts-author">
            <img className="ts-avatar" src={t.img} alt={t.name} />
            <div>
              <div className="ts-name">{t.name}</div>
              <div className="ts-role">{t.role}</div>
            </div>
          </div>
        </div>

        <div className="ts-footer">
          <div className="ts-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`ts-dot${i === active ? ' ts-dot-active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="ts-arrows">
            <button className="ts-arrow" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="ts-arrow" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
