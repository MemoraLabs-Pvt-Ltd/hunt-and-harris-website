import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import Listings from '../components/Listings'
import Footer from '../components/Footer'

export default function ListingsPage() {
  return (
    <>
      <Seo
        path="/listings"
        title="Properties for Sale & Rent in Ras Al Khaimah"
        description="Browse live property listings across Ras Al Khaimah and the Northern Emirates — apartments, villas and townhouses for sale and rent, with map search. Hunt & Harris Real Estate."
      />
      <Navbar />
      <Listings />
      <Footer />
    </>
  )
}
