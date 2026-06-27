import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AwardsBanner from './components/AwardsBanner'
import Properties from './components/Properties'
import DreamsSection from './components/DreamsSection'
import GoogleReviews from './components/GoogleReviews'
import Services from './components/Services'
import Blog from './components/Blog'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AwardsBanner />
      <DreamsSection />
      <Properties />
      <Services />
      <GoogleReviews />
      <Blog />
      <ContactSection />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
