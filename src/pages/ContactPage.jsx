import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import ContactUs from '../components/ContactUs'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact Us"
        description="Get in touch with Hunt & Harris Real Estate — call, email or visit our Ras Al Khaimah office. We help you buy, rent, sell and invest in property across RAK."
      />
      <Navbar />
      <ContactUs />
      <ContactSection hideTagline />
      <Footer />
    </>
  )
}
