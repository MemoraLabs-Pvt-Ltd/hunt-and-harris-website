import Seo from './seo/Seo'
import { SITE_URL, SITE_NAME, DEFAULT_DESC } from './seo/siteConfig'
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

const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/hero-desert.jpg`,
    logo: `${SITE_URL}/homepage/hhlogo.svg`,
    description: DEFAULT_DESC,
    areaServed: 'Ras Al Khaimah, United Arab Emirates',
    address: { '@type': 'PostalAddress', addressLocality: 'Ras Al Khaimah', addressCountry: 'AE' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/listings?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function App() {
  return (
    <>
      <Seo
        path="/"
        description="Discover homes for sale and rent across Ras Al Khaimah with Hunt & Harris Real Estate — off-plan launches, waterfront apartments, villas and expert local guidance."
        jsonLd={HOME_JSONLD}
      />
      <Navbar />
      <Hero />
      <AwardsBanner />
      <AboutSection2 />
      <Properties />
      <ClientsSection />
      <Blog />
      <ContactSection />
      <Footer />
    </>
  )
}
