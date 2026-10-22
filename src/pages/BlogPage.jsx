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
      <Footer />
    </>
  )
}
