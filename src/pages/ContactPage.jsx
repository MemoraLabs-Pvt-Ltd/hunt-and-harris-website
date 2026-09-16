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
        description="Get in touch with Hunt & Harris — call, email or visit our Ras Al Khaimah office. We help you buy, rent, sell and invest in property across RAK."
      />
      <Navbar />
      <ContactUs />
      <ContactSection hideTagline />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
