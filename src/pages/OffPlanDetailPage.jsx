import Navbar from '../components/Navbar'
import OffPlanDetail from '../components/OffPlanDetail'
import Footer from '../components/Footer'

export default function OffPlanDetailPage({ slug }) {
  return (
    <>
      <Navbar />
      <OffPlanDetail slug={slug} />
      <Footer />
    </>
  )
}
