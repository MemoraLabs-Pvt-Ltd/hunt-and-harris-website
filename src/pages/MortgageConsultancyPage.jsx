import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import ServiceDetail from '../components/ServiceDetail'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function MortgageConsultancyPage() {
  return (
    <>
      <Seo
        path="/mortgage-consultancy"
        title="Mortgage Consultancy"
        description="Expert mortgage guidance and tailored financing solutions in the UAE and overseas, through Hunt & Harris Real Estate's licensed mortgage consultancy partners."
      />
      <Navbar />
      <ServiceDetail
        image="/photos/villa-garden.jpg"
        title="Mortgage Consultancy"
        tagline="Expert mortgage guidance. Tailored financing solutions. Greater confidence in your property journey."
        paras={[
          'Whether you are purchasing a home in the UAE or financing a property overseas, Hunt & Harris Real Estate connects clients with fully licensed mortgage consultancy firms to help make the financing process clearer and more manageable.',
          'Our mortgage consultancy partners bring decades of experience in international financial services, combined with in-depth knowledge of local property markets and established relationships with major banks in the UAE and internationally.',
          'Through personalised mortgage consultancy, they help you understand your borrowing capacity, explore available financing options and identify a solution suited to your financial circumstances and property requirements.',
          'From assessing your eligibility and researching the mortgage market to comparing providers and exploring tailored financing arrangements, you can receive guidance throughout your property purchasing journey.',
        ]}
        listTitle="How we can help:"
        list={[
          'Assess your mortgage eligibility and borrowing capacity',
          'Explore mortgage options in the UAE and overseas',
          'Identify suitable lenders and financing solutions',
          'Understand mortgage terms, requirements and costs',
          'Receive guidance tailored to your financial profile and property goals',
          'Navigate the mortgage process with greater clarity and confidence',
        ]}
        closing="Our priority is to connect you with experienced professionals who understand your individual needs. Our consultancy partners can help you explore potential financing solutions while treating your information confidentially."
        ctaTitle="Ready to explore your financing options?"
        ctaText="Speak to our team and we'll connect you with a licensed mortgage consultancy partner suited to your needs."
      />
      <ContactSection hideForm />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
