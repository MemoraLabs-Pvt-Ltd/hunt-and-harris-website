import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import Conveyancing from '../components/Conveyancing'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ConveyancingPage() {
  return (
    <>
      <Seo
        path="/conveyancing"
        title="Property Conveyancing"
        description="Secure, transparent property conveyancing in Ras Al Khaimah. Hunt & Harris Real Estate manages contracts, transfers and due diligence so your purchase or sale completes smoothly."
      />
      <Navbar />
      <Conveyancing />
      <ContactSection />
      <Footer />
    </>
  )
}
