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
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
