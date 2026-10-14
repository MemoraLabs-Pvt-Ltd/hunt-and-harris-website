import { useState } from 'react'
import './FaqSection.css'

const FAQS = [
  {
    q: 'Who founded Hunt & Harris Real Estate and who runs it today?',
    a: 'Hunt & Harris Real Estate is led by Neema Kataria, our Managing Partner, and Wendy Stapleton, our Managing Director — two women who have shaped the agency around honest advice and genuine care since day one.',
  },
  {
    q: 'How long has Hunt & Harris Real Estate been in business?',
    a: 'We opened our doors in 2007 and have spent nearly two decades helping buyers, sellers and investors find the right home across Ras Al Khaimah.',
  },
  {
    q: 'Which areas in Ras Al Khaimah do you cover?',
    a: "We work across all of RAK's most sought-after communities — Al Hamra Village, Al Marjan Island, Mina Al Arab and Ras Al Khaimah City, among others.",
  },
  {
    q: 'Can foreign nationals buy property in RAK?',
    a: 'Yes. Ras Al Khaimah offers freehold ownership to all nationalities in designated areas, and we guide international buyers through every step of the process.',
  },
  {
    q: 'Do you handle off-plan properties?',
    a: 'Absolutely. We have early access to leading off-plan launches and help clients secure the best units and payment plans before they reach the wider market.',
  },
  {
    q: 'What fees are involved in buying a property?',
    a: 'Typical costs include the RAK transfer fee, our agency commission, and standard registration charges. We give you a clear, itemised breakdown up front — no surprises.',
  },
  {
    q: 'Do you offer in-house conveyancing?',
    a: 'Yes — our in-house conveyancing team manages the legal paperwork and transfer end to end, saving you time and keeping the whole process stress-free.',
  },
  {
    q: 'How do I list my property for sale with Hunt & Harris Real Estate?',
    a: "Simply book a consultation. We'll arrange a valuation, agree a strategy, and market your property across our channels and qualified buyer network.",
  },
  {
    q: 'Do you help with rentals and property management?',
    a: 'We do. From finding the right tenants to ongoing property management, our team looks after landlords and tenants alike.',
  },
  {
    q: 'How is Hunt & Harris Real Estate different from other RAK agencies?',
    a: 'Honest, no-pressure advice, deep local knowledge and genuine after-sales support. We treat finding a home as something personal — never transactional.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq-sec" id="faq" style={{ scrollMarginTop: '90px' }}>
      <div className="faq-inner">
        {/* Left — heading + contact card */}
        <div className="faq-left">
          <h2 className="faq-title">
            Got Questions?<br />
            <span className="faq-title-italic">We&rsquo;ve Got Answers</span>
          </h2>
          <p className="faq-sub">
            If you&rsquo;re unsure where to start or want to see how we can help you buy,
            sell or invest in Ras Al Khaimah, reach out and we&rsquo;ll walk you through it.
          </p>

          <div className="faq-card">
            <img
              className="faq-card-avatar"
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=faces&auto=format&q=85"
              alt="Hunt & Harris Real Estate advisor"
            />
            <h3 className="faq-card-title">Book an Intro Call</h3>
            <p className="faq-card-desc">
              Time to get introduced and explore how Hunt &amp; Harris Real Estate can help.
            </p>

            <a href="/contact" className="faq-card-btn">
              Book a Call
              <span className="faq-card-btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="8 7 17 7 17 16" />
                </svg>
              </span>
            </a>

            <div className="faq-card-email">
              <span className="faq-card-email-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <div className="faq-card-email-text">
                <span className="faq-card-email-label">Do you prefer email communication?</span>
                <a className="faq-card-email-addr" href="mailto:info@huntandharris.com">info@huntandharris.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="faq-right">
          {FAQS.map((item, i) => (
            <div className={`faq-item${open === i ? ' is-open' : ''}`} key={i}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-q-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="12" y1="5" x2="12" y2="19" className="faq-q-icon-v" />
                  </svg>
                </span>
              </button>
              <div className="faq-a-wrap">
                <div className="faq-a-inner">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
