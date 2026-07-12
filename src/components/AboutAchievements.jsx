import './AboutAchievements.css'

export default function AboutAchievements() {
  return (
    <section className="ach-sec">
      <div className="ach-head">
        <span className="ach-pill">
          <span className="ach-dot" />
          Our Achievements
        </span>
        <h2 className="ach-title">
          Delivering trusted property expertise<br />
          for a seamless and confident future.
        </h2>
      </div>

      <div className="ach-grid">

        {/* Top-left — big stat + trust */}
        <div className="ach-card ach-card--stat ach-top-left">
          <div>
            <div className="ach-stat-number">5000+</div>
            <div className="ach-stat-label">Properties Sold<br />Across RAK</div>
          </div>
          <div className="ach-trust-row">
            <div className="ach-avatars">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces&auto=format&q=80" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces&auto=format&q=80" alt="" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces&auto=format&q=80" alt="" />
              <span className="ach-avatar-more">+</span>
            </div>
            <p className="ach-trust-text">Trusted by buyers and<br />investors worldwide</p>
          </div>
        </div>

        {/* Top-middle — small stat */}
        <div className="ach-card ach-card--stat ach-top-mid">
          <div>
            <div className="ach-stat-number">18+</div>
            <div className="ach-stat-label">Years of Experience</div>
          </div>
        </div>

        {/* Right — tall image spanning 2 rows */}
        <div className="ach-card ach-card--img ach-right">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&h=900&fit=crop&crop=top&auto=format&q=85"
            alt="Property consultant"
          />
        </div>

        {/* Bottom-left — image only */}
        <div className="ach-card ach-card--img ach-bot-left">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=420&fit=crop&auto=format&q=85"
            alt="Luxury property"
          />
        </div>

        {/* Bottom-middle — stat + description */}
        <div className="ach-card ach-card--stat ach-bot-mid">
          <div>
            <div className="ach-stat-number">1200+</div>
            <div className="ach-stat-label">Happy Families</div>
          </div>
          <p className="ach-desc">
            Connecting buyers, investors and families with exceptional properties — from waterfront villas to off-plan opportunities in RAK.
          </p>
        </div>

      </div>
    </section>
  )
}
