import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Seo from '../../seo/Seo'
import './Portal.css'

const ROLES = ['tenant', 'landlord', 'admin']
// Real property-management portal — tenants & landlords sign in here.
const PM_PORTAL_URL = 'https://pm.huntandharris-re.com/login?returnUrl=%2Fdashboard'

export default function PortalLogin() {
  const [role, setRole] = useState('tenant')
  const [params] = useSearchParams()
  const navigate = useNavigate()

  // Preselect the tab from ?role= (set after mount to avoid hydration mismatch)
  useEffect(() => {
    const r = params.get('role')
    if (ROLES.includes(r)) setRole(r)
  }, [params])

  const LABEL = { tenant: 'Tenant', landlord: 'Landlord', admin: 'Admin' }

  const submit = (e) => {
    e.preventDefault()
    // Front-end only for now — routes to the relevant dashboard.
    navigate(`/portal/${role}`)
  }

  return (
    <div className="pl-page">
      <Seo title="Portal Login" noindex />
      <div className="pl-form-side">
        <Link to="/" className="pl-logo">
          <img src="/homepage/hhlogo.svg" alt="Hunt & Harris Real Estate" />
        </Link>

        <div className="pl-form-wrap">
          <h1 className="pl-title">Welcome <span className="pl-title-italic">back</span></h1>
          <p className="pl-sub">Sign in to access your Hunt &amp; Harris Real Estate portal.</p>

          <div className="pl-tabs">
            <button className={`pl-tab${role === 'tenant' ? ' is-active' : ''}`} onClick={() => setRole('tenant')}>
              Tenant
            </button>
            <button className={`pl-tab${role === 'landlord' ? ' is-active' : ''}`} onClick={() => setRole('landlord')}>
              Landlord
            </button>
            <button className={`pl-tab${role === 'admin' ? ' is-active' : ''}`} onClick={() => setRole('admin')}>
              Admin
            </button>
          </div>

          {role === 'admin' ? (
            <form className="pl-form" onSubmit={submit}>
              <div className="pt-field">
                <label className="pt-label">Email address</label>
                <input className="pt-input" type="email" placeholder="you@example.com" required />
              </div>
              <div className="pt-field">
                <label className="pt-label">Password</label>
                <input className="pt-input" type="password" placeholder="••••••••" required />
              </div>
              <div className="pl-row-between">
                <label className="pl-check">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#reset" className="pl-forgot">Forgot password?</a>
              </div>
              <button className="pl-submit" type="submit">
                Sign in to {LABEL[role]} Portal
              </button>
            </form>
          ) : (
            <div className="pl-form">
              <p className="pl-ext-note">
                {LABEL[role]}s sign in securely on our property management portal.
              </p>
              <a className="pl-submit" href={PM_PORTAL_URL}>
                Continue to {LABEL[role]} Portal
              </a>
            </div>
          )}

          <p className="pl-note">
            Don&rsquo;t have access yet? <a href="/#contact">Contact our team</a>
          </p>
        </div>
      </div>

      <div
        className="pl-image-side"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=1500&q=85)' }}
      >
        <div className="pl-image-quote">
          <h2>Your property, managed with clarity.</h2>
          <p>Track rent, documents, maintenance and more — all in one secure place.</p>
        </div>
      </div>
    </div>
  )
}
