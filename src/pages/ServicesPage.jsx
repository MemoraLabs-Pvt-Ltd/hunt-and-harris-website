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
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
