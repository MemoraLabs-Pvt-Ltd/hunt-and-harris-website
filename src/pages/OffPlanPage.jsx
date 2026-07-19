import Navbar from '../components/Navbar'
import OffPlanListing from '../components/OffPlanListing'
import Footer from '../components/Footer'

export default function OffPlanPage() {
  return (
    <>
      <Navbar />
      <OffPlanListing />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
