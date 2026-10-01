// Sends a website form submission to the Google Sheet (via the Apps Script
// web app). See google-apps-script/Code.gs for the receiving end and setup.
//
// The endpoint URL comes from the SHEETS_ENDPOINT env var so it can differ
// per environment and isn't hard-coded. Set it in Vercel (and .env.local for
// local dev) to the Apps Script "/exec" URL. The SHEETS_ prefix is exposed to
// browser code via vite.config.js `envPrefix`.
const ENDPOINT = import.meta.env.SHEETS_ENDPOINT || ''

/**
 * Append a lead to the Google Sheet.
 * @param {Object} payload - form fields, e.g. { form, name, email, phone, message }
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function submitLead(payload) {
  if (!ENDPOINT) {
    // Not configured yet — fail loudly in dev, gracefully in prod.
    console.warn('[submitLead] SHEETS_ENDPOINT is not set; submission skipped.')
    return { ok: false, error: 'not-configured' }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      // text/plain keeps this a "simple" request → no CORS preflight, which
      // Apps Script web apps don't answer. The body is still JSON.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.result === 'error') {
      return { ok: false, error: data.message || `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: String(err?.message || err) }
  }
}
