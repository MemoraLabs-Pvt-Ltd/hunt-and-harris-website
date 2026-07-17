import { useRef } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'motion/react'
import './AboutHero.css'

export default function AboutHero() {
  const containerRef = useRef(null)
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
  const tintOpacity = useTransform(scrollYProgress, [0, 0.3], [0.32, 0])

  return (
    <section className="about-hero-scroll" ref={containerRef}>
      <div className="about-hero-sticky">
        <motion.div
          className="about-hero-media"
          style={{ scale: videoScale, y: videoY, borderRadius: videoRadius }}
        >
          <video
            className="about-hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/about-us/company-bg.mp4" type="video/mp4" />
          </video>

          <motion.div className="about-hero-tint" style={{ opacity: tintOpacity }} />

          <motion.div className="about-hero-content" style={{ opacity: textOpacity, filter: textBlur, visibility: textVisibility }}>
            <h1 className="about-hero-title">
              Built on <span className="about-hero-title-italic">trust</span>.<br />
              Driven by <span className="about-hero-title-italic">results</span>.
            </h1>
            <p className="about-hero-sub">
              We guide our clients through finding, buying and owning property in Ras Al Khaimah.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
