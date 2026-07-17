import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AwardsBanner from './components/AwardsBanner'
import Properties from './components/Properties'
import ClientsSection from './components/ClientsSection'
import AboutSection2 from './components/AboutSection2'
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
      <AboutSection2 />
      <Properties />
      <ClientsSection />
      <Blog />
      <ContactSection />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
