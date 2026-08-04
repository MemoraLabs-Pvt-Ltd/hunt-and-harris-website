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
        description="Secure, transparent property conveyancing in Ras Al Khaimah. Hunt & Harris manages contracts, transfers and due diligence so your purchase or sale completes smoothly."
      />
      <Navbar />
      <Conveyancing />
      <ContactSection />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
