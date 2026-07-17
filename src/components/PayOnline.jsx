import './PayOnline.css'

export default function PayOnline() {
  return (
    <section className="po-sec">
      <div className="po-hero">
        <h1 className="po-title">
          Pay <span className="po-title-italic">online</span>, quickly<br />
          and securely
        </h1>
        <p className="po-sub">
          Settle invoices, deposits and fees through our secure payment gateway &mdash;
          anytime, from anywhere in the world.
        </p>
      </div>

      <div className="po-card">
        <span className="po-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
          </svg>
        </span>

        <h2 className="po-card-title">Payment Terms</h2>

        <p className="po-card-text">
          Please note that by proceeding with the online payment, the customer agrees to bear
          all charges associated with the transaction processing fees. We use MamoPay as our
          payment gateway platform, which is regulated by the Dubai Financial Services
          Authority (&ldquo;DFSA&rdquo;).
        </p>

        <a className="po-card-btn" href="https://business.mamopay.com/pay/huntandharris" target="_blank" rel="noopener noreferrer">
          Click here to pay online
          <span className="po-card-btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="8 7 17 7 17 16" />
            </svg>
          </span>
        </a>

        <div className="po-card-secure">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Secured by MamoPay &middot; DFSA regulated
        </div>
      </div>
    </section>
  )
}
