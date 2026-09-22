// Site-wide floating WhatsApp button (bottom-right). Uses the company number.
const WA_NUMBER = '97172434005'
const WA_TEXT = "Hi Hunt & Harris Real Estate, I'd like to know more about your properties."
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fab-wa"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
        <path d="M16.04 4C9.9 4 4.9 9 4.9 15.13c0 2.16.63 4.17 1.72 5.87L4.5 28l7.2-2.06a11.1 11.1 0 0 0 4.34.88h.01c6.14 0 11.14-5 11.14-11.13C27.19 9 22.18 4 16.04 4zm0 20.03h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.86 1.1 1.03-3.76-.22-.39a9.2 9.2 0 0 1-1.41-4.9c0-5.09 4.15-9.23 9.24-9.23a9.2 9.2 0 0 1 9.23 9.24c0 5.09-4.14 9.42-9.24 9.42zm5.06-6.9c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.74-1.38-1.65-1.54-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.46-.62-.47l-.53-.01c-.19 0-.49.07-.74.35-.25.28-.97.95-.97 2.31s.99 2.68 1.13 2.87c.14.19 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z" />
      </svg>
    </a>
  )
}
