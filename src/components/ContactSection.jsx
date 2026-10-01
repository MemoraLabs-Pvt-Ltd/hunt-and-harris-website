import { useState } from 'react'
import './ContactSection.css'
import { submitLead } from '../utils/submitLead'

const EMPTY = { name: '', company: '', email: '', phone: '', subject: '', message: '' }

export default function ContactSection({ hideForm = false, hideTagline = false }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const res = await submitLead({ form: 'Contact', page: 'Contact', ...form })
    if (res.ok) {
      setStatus('success')
      setForm(EMPTY)
    } else {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Tagline */}
      {!hideTagline && (
      <div className="cs-tagline">
        <p className="cs-tagline-text">
          We guide our clients through finding, buying and owning property in Ras Al Khaimah.
        </p>
      </div>
      )}

      {/* Form — hidden when hideForm is set (e.g. About page) */}
      {!hideForm && (
      <section className="cs-sec">
        <div className="cs-head">
          <h2 className="cs-title">Get in Touch</h2>
          <p className="cs-sub">We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.</p>
        </div>

        <form className="cs-form" onSubmit={onSubmit}>
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

          <button className="cs-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="cs-form-note cs-form-note--ok">Thanks — we've received your message and will be in touch shortly.</p>
          )}
          {status === 'error' && (
            <p className="cs-form-note cs-form-note--err">Something went wrong sending your message. Please try again, or email us at info@huntandharris.com.</p>
          )}
        </form>
      </section>
      )}
    </>
  )
}
