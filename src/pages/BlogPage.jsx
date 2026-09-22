import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import BlogListing from '../components/BlogListing'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function BlogPage() {
  return (
    <>
      <Seo
        path="/blog"
        title="Property Blog & Market Insights"
        description="News, guides and market insights on Ras Al Khaimah real estate — buying, renting, off-plan trends and investment tips from the Hunt & Harris Real Estate team."
      />
      <Navbar />
      <BlogListing />
      <ContactSection />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
