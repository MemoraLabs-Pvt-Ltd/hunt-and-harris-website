/**
 * Hunt & Harris — website lead collector.
 *
 * Receives JSON POSTs from the website forms (Contact + Off-Plan "Register
 * Interest") and appends each one as a row in the bound Google Sheet.
 *
 * Headers are created automatically from whatever fields a form sends, so you
 * never have to touch this file when a form gains or loses a field. A new field
 * just becomes a new column on the right.
 *
 * ── Setup (one time) ──────────────────────────────────────────────────────
 * 1. Create a Google Sheet (this is where leads land).
 * 2. Extensions → Apps Script. Delete the sample code, paste THIS file.
 * 3. Save. Then Deploy → New deployment → type "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone                (required — the website is anonymous)
 *    Click Deploy, authorise when prompted, and COPY the "Web app" URL.
 *    It looks like: https://script.google.com/macros/s/AKfy..../exec
 * 4. Put that URL in the website:
 *      - Vercel → Project → Settings → Environment Variables →
 *        SHEETS_ENDPOINT = <the /exec URL>   (then redeploy)
 *      - For local dev, add it to a `.env.local` file at the project root.
 *
 * ── Updating later ────────────────────────────────────────────────────────
 * If you edit this script, Deploy → Manage deployments → edit the existing
 * deployment → Version: "New version" → Deploy. This keeps the SAME URL so you
 * don't have to change anything on the website. (A brand new deployment gives a
 * new URL and would need the env var updated.)
 */

// Name of the tab inside the Sheet that rows are written to.
var SHEET_NAME = 'Leads'

// Column order preference. Any field not listed here is appended after these,
// in the order it first appears. "timestamp" is added automatically.
var PREFERRED_ORDER = [
  'timestamp', 'form', 'name', 'company', 'email', 'phone',
  'subject', 'message', 'property', 'page'
]

function doPost(e) {
  try {
    var data = {}
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents)
    }

    // Stamp server-side time (ignore any client-supplied timestamp).
    data.timestamp = new Date()

    var lock = LockService.getScriptLock()
    lock.waitLock(20000) // avoid two submissions racing on the header row
    try {
      appendRow_(data)
    } finally {
      lock.releaseLock()
    }

    return json_({ result: 'success' })
  } catch (err) {
    return json_({ result: 'error', message: String(err) })
  }
}

// A GET just confirms the endpoint is live (handy to open in a browser).
function doGet() {
  return json_({ result: 'ok', message: 'Hunt & Harris lead endpoint is live.' })
}

function appendRow_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)

  var lastCol = sheet.getLastColumn()
  var headers = lastCol > 0
    ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(String)
    : []

  // Decide the header set: existing headers + any new keys from this payload,
  // ordered by PREFERRED_ORDER first, then first-seen order.
  var keys = Object.keys(data)
  var all = headers.slice()
  keys.forEach(function (k) { if (all.indexOf(k) === -1) all.push(k) })
  all.sort(function (a, b) {
    var ia = PREFERRED_ORDER.indexOf(a)
    var ib = PREFERRED_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return 0
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })

  // (Re)write the header row if it changed (new column appeared).
  if (all.length !== headers.length || all.some(function (h, i) { return h !== headers[i] })) {
    sheet.getRange(1, 1, 1, all.length).setValues([all])
    sheet.getRange(1, 1, 1, all.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }

  var row = all.map(function (h) {
    var v = data[h]
    return v === undefined || v === null ? '' : v
  })
  sheet.appendRow(row)
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
