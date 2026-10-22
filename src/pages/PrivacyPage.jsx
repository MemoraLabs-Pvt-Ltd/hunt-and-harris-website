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
      <Footer />
    </>
  )
}
