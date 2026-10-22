import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import PayOnline from '../components/PayOnline'
import Footer from '../components/Footer'

export default function PayOnlinePage() {
  return (
    <>
      <Seo
        path="/pay-online"
        title="Pay Online"
        description="Pay rent, deposits and agency fees securely online with Hunt & Harris Real Estate via MamoPay — fast, safe card payments for tenants and clients in Ras Al Khaimah."
      />
      <Navbar />
      <PayOnline />
      <Footer />
    </>
  )
}
