import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import Guides from '../components/Guides'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function GuidesPage() {
  return (
    <>
      <Seo
        path="/guides"
        title="Property Guides"
        description="Free downloadable property guides for Ras Al Khaimah — buyers guide, listing guide, rental guide, off-plan guide and more from the Hunt & Harris Real Estate team."
      />
      <Navbar />
      <Guides />
      <ContactSection />
      <Footer />
    </>
  )
}
