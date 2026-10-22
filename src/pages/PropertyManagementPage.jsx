import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import PropertyManagement from '../components/PropertyManagement'
import Footer from '../components/Footer'

export default function PropertyManagementPage() {
  return (
    <>
      <Seo
        path="/property-management"
        title="Property Management — Get Your Property Listed"
        description="List your property with Hunt & Harris Real Estate. Request a free appraisal from our award-winning agents and download our listing guide — covering every community across Ras Al Khaimah."
      />
      <Navbar />
      <PropertyManagement />
      <Footer />
    </>
  )
}
