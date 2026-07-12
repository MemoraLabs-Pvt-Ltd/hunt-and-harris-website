import { useState } from 'react'
import './ContactSection.css'

export default function ContactSection({ hideForm = false }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <>
      {/* Tagline */}
      <div className="cs-tagline">
        <p className="cs-tagline-text">
          We guide our clients through finding, buying and owning
          <span className="cs-tagline-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=160&h=100&q=80"
              alt=""
              className="cs-tagline-img"
            />
          </span>
          property in Ras Al Khaimah.
        </p>
      </div>

      {/* Form — hidden when hideForm is set (e.g. About page) */}
      {!hideForm && (
      <section className="cs-sec">
        <div className="cs-head">
          <h2 className="cs-title">Get in Touch</h2>
          <p className="cs-sub">We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.</p>
        </div>

        <form className="cs-form" onSubmit={e => e.preventDefault()}>
          <div className="cs-row">
            <div className="cs-field">
              <label className="cs-label">Full Name <span>*</span></label>
              <input className="cs-input" type="text" placeholder="John Doe" value={form.name} onChange={set('name')} required />
            </div>
            <div className="cs-field">
              <label className="cs-label">Company</label>
              <input className="cs-input" type="text" placeholder="Your Company" value={form.company} onChange={set('company')} />
            </div>
          </div>

          <div className="cs-row">
            <div className="cs-field">
              <label className="cs-label">Email Address <span>*</span></label>
              <input className="cs-input" type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="cs-field">
              <label className="cs-label">Phone Number</label>
              <input className="cs-input" type="tel" placeholder="+971 50 123 4567" value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div className="cs-field cs-field-full">
            <label className="cs-label">Subject <span>*</span></label>
            <div className="cs-select-wrap">
              <select className="cs-select" value={form.subject} onChange={set('subject')} required>
                <option value="" disabled>Select a subject</option>
                <option>Buy a Property</option>
                <option>Sell a Property</option>
                <option>Off-Plan Inquiry</option>
                <option>Property Management</option>
                <option>Investment Advice</option>
                <option>General Inquiry</option>
              </select>
              <svg className="cs-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>

          <div className="cs-field cs-field-full">
            <label className="cs-label">How can we help you? <span>*</span></label>
            <textarea className="cs-textarea" placeholder="Tell us how we can help you..." value={form.message} onChange={set('message')} rows={5} required />
          </div>

          <button className="cs-submit" type="submit">Send Message</button>
        </form>
      </section>
      )}
    </>
  )
}
