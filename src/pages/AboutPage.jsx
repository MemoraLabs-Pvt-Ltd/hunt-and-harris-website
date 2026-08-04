import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import AboutHero from '../components/AboutHero'
import CompanyBackground from '../components/CompanyBackground'
import OurHistory from '../components/OurHistory'
import AwardsHonors from '../components/AwardsHonors'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <>
      <Seo
        path="/about"
        title="About Us"
        description="Meet Hunt & Harris — a trusted Ras Al Khaimah real estate agency. Our history, awards, team and commitment to helping you buy, sell and rent with confidence."
      />
      <Navbar />
      <AboutHero />
      <CompanyBackground />
      <OurHistory />
      <AwardsHonors />
      <FaqSection />
      <ContactSection hideForm />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
