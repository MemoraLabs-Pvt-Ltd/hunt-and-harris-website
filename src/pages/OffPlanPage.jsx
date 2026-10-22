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
      <Footer />
    </>
  )
}
