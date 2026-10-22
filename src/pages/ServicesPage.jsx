import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import ServicesHero from '../components/ServicesHero'
import ServicesShowcase from '../components/ServicesShowcase'
import ServicesGrid from '../components/ServicesGrid'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ServicesPage() {
  return (
    <>
      <Seo
        path="/services"
        title="Real Estate Services"
        description="Full-service real estate in Ras Al Khaimah — residential sales, leasing, property management, off-plan investment and conveyancing, all under one roof at Hunt & Harris Real Estate."
      />
      <Navbar />
      <ServicesHero />
      <ServicesShowcase />
      <ServicesGrid />
      <ContactSection />
      <Footer />
    </>
  )
}
