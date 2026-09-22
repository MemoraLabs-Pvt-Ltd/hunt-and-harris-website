import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import OffPlanListing from '../components/OffPlanListing'
import Footer from '../components/Footer'

export default function OffPlanPage() {
  return (
    <>
      <Seo
        path="/off-plan"
        title="Off-Plan Properties in Ras Al Khaimah"
        description="Explore exclusive off-plan launches across Ras Al Khaimah — waterfront apartments, villas and townhouses direct from developers, with flexible payment plans. Hunt & Harris Real Estate."
      />
      <Navbar />
      <OffPlanListing />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
