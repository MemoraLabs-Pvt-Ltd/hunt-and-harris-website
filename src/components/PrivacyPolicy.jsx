import './PrivacyPolicy.css'

const SECTIONS = [
  {
    h: 'Introduction',
    p: [
      'Hunt & Harris Real Estate ("we", "us", "our") is committed to protecting the privacy of everyone who contacts us, uses our website, or engages our services. This policy explains what personal information we collect, how we use it, and the choices you have.',
      'By using our website or submitting your details through any of our forms, you consent to the practices described in this policy.',
    ],
  },
  {
    h: 'Information We Collect',
    p: ['We may collect the following information when you interact with us:'],
    ul: [
      'Contact details such as your name, email address and phone number.',
      'Property details you share with us — for example when requesting an appraisal, registering interest, or listing a property.',
      'Enquiry content, including any message you send through our contact, appraisal or register-interest forms.',
      'Technical information such as your browser type and general usage data collected automatically as you browse the site.',
    ],
  },
  {
    h: 'How We Use Your Information',
    p: ['We use the information you provide to:'],
    ul: [
      'Respond to your enquiries and provide the services you request.',
      'Arrange property viewings, valuations and appraisals.',
      'Keep you informed about properties, services and updates that may be relevant to you.',
      'Improve our website, services and customer experience.',
      'Meet our legal, regulatory and contractual obligations.',
    ],
  },
  {
    h: 'Sharing Your Information',
    p: [
      'We do not sell your personal information. We may share it with trusted third parties only where necessary to deliver our services — for example property developers, banks, the Land Department, or service providers who help us operate our business — and always in line with applicable law.',
    ],
  },
  {
    h: 'Data Retention',
    p: [
      'We keep your personal information only for as long as needed to fulfil the purposes set out in this policy, or as required to meet legal and regulatory obligations, after which it is securely deleted.',
    ],
  },
  {
    h: 'Security',
    p: [
      'We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    h: 'Your Rights',
    p: ['Subject to applicable law, you may:'],
    ul: [
      'Request access to the personal information we hold about you.',
      'Ask us to correct or update inaccurate information.',
      'Request that we delete your information where there is no legal reason to retain it.',
      'Withdraw your consent to marketing communications at any time.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'Our website may use cookies and similar technologies to help the site function and to understand how it is used. You can control cookies through your browser settings.',
    ],
  },
  {
    h: 'Contact Us',
    p: [
      'If you have any questions about this policy or wish to exercise your rights, please contact us at info@huntandharris.com or +971 7 243 4005.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <section className="pp-sec">
      <div className="pp-inner">
        <span className="pp-eyebrow">Legal</span>
        <h1 className="pp-title">Privacy <span className="pp-title-italic">Policy</span></h1>
        <p className="pp-updated">Last updated: October 2026</p>

        {SECTIONS.map((s) => (
          <div className="pp-block" key={s.h}>
            <h2 className="pp-h">{s.h}</h2>
            {s.p?.map((para, i) => <p className="pp-p" key={i}>{para}</p>)}
            {s.ul && (
              <ul className="pp-ul">
                {s.ul.map((li, i) => <li key={i}>{li}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
