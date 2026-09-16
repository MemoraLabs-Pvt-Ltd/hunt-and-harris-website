import Navbar from '../components/Navbar'
import BlogPost from '../components/BlogPost'
import Footer from '../components/Footer'

export default function BlogPostPage() {
  return (
    <>
      <Navbar />
      <BlogPost />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
