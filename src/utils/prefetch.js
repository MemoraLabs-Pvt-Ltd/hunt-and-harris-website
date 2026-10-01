// Prefetch helpers for vite-react-ssg static loader data.
//
// On a soft navigation, vite-react-ssg fetches a manifest (once) then the
// per-route JSON before the page can render. On a slow connection that makes
// clicks feel laggy even after the skeleton shows. We warm both ahead of time:
//   - warmManifest(): fetch the manifest soon after load, so the first
//     property click doesn't pay for it.
//   - prefetchProperty(ref): on hover/focus of a property link, fetch that
//     property's JSON so the click reads it from cache.
//
// All files in a build share the same hash (window.__VITE_REACT_SSG_HASH__),
// so the per-route path is predictable. No-ops in dev (hash undefined).

const done = new Set()

function hash() {
  return typeof window !== 'undefined' ? window.__VITE_REACT_SSG_HASH__ : undefined
}

export function warmManifest() {
  const h = hash()
  if (!h) return
  const url = `/static-loader-data-manifest-${h}.json`
  if (done.has(url)) return
  done.add(url)
  fetch(url).catch(() => {})
}

export function prefetchProperty(ref) {
  const h = hash()
  if (!h || !ref) return
  const url = `/static-loader-data/property/${ref}.${h}.json`
  if (done.has(url)) return
  done.add(url)
  warmManifest()
  fetch(url).catch(() => {})
}
