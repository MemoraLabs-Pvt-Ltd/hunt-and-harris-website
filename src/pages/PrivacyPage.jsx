import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import PrivacyPolicy from '../components/PrivacyPolicy'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Seo
        path="/privacy"
        title="Privacy Policy"
        description="How Hunt & Harris Real Estate collects, uses and protects your personal information."
      />
      <Navbar />
      <PrivacyPolicy />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
