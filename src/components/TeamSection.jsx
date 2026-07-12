import './TeamSection.css'

const allMembers = [
  { name: 'James Harris',   role: 'Managing Director',          img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Sarah Hunt',     role: 'Property Specialist',        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Sophia Hayes',   role: 'Client Relations',           img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Noah Brooks',    role: 'Lead Realtor',               img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Amelia Foster',  role: 'Senior Property Consultant', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Daniel Reed',    role: 'Senior Consultant',          img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Liam Carter',    role: 'Property Advisor',           img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Emma Wilson',    role: 'Investment Consultant',      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Oliver Grant',   role: 'Off-Plan Specialist',        img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Isla Morgan',    role: 'Listings Manager',           img: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Ethan Cole',     role: 'Property Valuer',            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Mia Thompson',   role: 'Client Success',             img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Lucas Bennett',  role: 'Sales Executive',            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Chloe Adams',    role: 'Marketing Manager',          img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Aiden Scott',    role: 'Property Negotiator',        img: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Grace Lee',      role: 'Conveyancing Manager',       img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Ryan Mitchell',  role: "Buyer's Agent",              img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Zoe Clarke',     role: 'Rental Specialist',          img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Jake Turner',    role: 'Area Specialist · RAK',      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Hannah Evans',   role: 'Interior Consultant',        img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Mason White',    role: 'Commercial Advisor',         img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Lily Parker',    role: 'Tenant Relations',           img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Charlie Fox',    role: 'Digital Marketing',          img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Nora King',      role: 'Operations Manager',         img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
  { name: 'Finn Cooper',    role: 'Property Analyst',           img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=640&fit=crop&crop=faces&auto=format&q=85' },
]

const topRow    = allMembers.slice(0, 13)
const bottomRow = allMembers.slice(13)

function TeamRow({ members, direction }) {
  const duplicated = [...members, ...members]
  return (
    <div className={`team-row-wrap team-row-${direction}`}>
      <div className="team-row-track">
        {duplicated.map((m, i) => (
          <div key={i} className="team-card">
            <img src={m.img} alt={m.name} className="team-card-img" />
            <div className="team-card-overlay">
              <div className="team-card-info">
                <span className="team-card-role">{m.role}</span>
                <span className="team-card-name">{m.name}</span>
              </div>
              <button className="team-card-btn" aria-label={`View ${m.name}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="team-sec">
      <div className="team-head">
        <span className="team-pill">Agents</span>
        <h2 className="team-title">Your trusted team</h2>
        <p className="team-sub">
          We're here to get results, guide you clearly and handle<br />
          things with care from day one to deal done.
        </p>
        <button className="team-cta">
          Find your property
          <span className="team-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </button>
      </div>

      <div className="team-rows">
        <TeamRow members={topRow}    direction="left"  />
        <TeamRow members={bottomRow} direction="right" />
      </div>
    </section>
  )
}
