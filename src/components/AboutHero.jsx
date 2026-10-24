import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'motion/react'
import './AboutHero.css'

// Toggle the overlay text (title + subtitle) on the About hero
const SHOW_CONTENT = false

export default function AboutHero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted && v.paused) v.play().catch(() => {})
    setMuted(v.muted)
  }
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Video smoothly shrinks (from the top) into a rounded card as you scroll
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.64], { ease: easeInOut })
  const videoRadius = useTransform(scrollYProgress, [0, 0.5], ['0px', '24px'], { ease: easeInOut })
  const videoY = useTransform(scrollYProgress, [0, 0.5], ['0vh', '11vh'], { ease: easeInOut })

  // Hero text starts fading the instant the video begins shrinking — even, gradual dissolve (linear), then hides
  const textOpacity = useTransform(scrollYProgress, [0, 0.26], [1, 0])
  const textBlur = useTransform(scrollYProgress, [0, 0.26], ['blur(0px)', 'blur(10px)'])
  const textVisibility = useTransform(scrollYProgress, v => (v >= 0.28 ? 'hidden' : 'visible'))

  return (
    <section className="about-hero-scroll" ref={containerRef}>
      <div className="about-hero-sticky">
        <motion.div
          className="about-hero-media"
          style={{ scale: videoScale, y: videoY, borderRadius: videoRadius }}
        >
          <video
            ref={videoRef}
            className="about-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/why-hh-poster.jpg"
          >
            <source src="/video/why-hh.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            className="about-hero-mute"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {SHOW_CONTENT && (
          <motion.div className="about-hero-content" style={{ opacity: textOpacity, filter: textBlur, visibility: textVisibility }}>
            <h1 className="about-hero-title">
              Built on <span className="about-hero-title-italic">trust</span>.<br />
              Driven by <span className="about-hero-title-italic">results</span>.
            </h1>
            <p className="about-hero-sub">
              We guide our clients through finding, buying and owning property in Ras Al Khaimah.
            </p>
          </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
