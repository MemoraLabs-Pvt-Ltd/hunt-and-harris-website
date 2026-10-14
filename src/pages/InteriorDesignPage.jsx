import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import ServiceDetail from '../components/ServiceDetail'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function InteriorDesignPage() {
  return (
    <>
      <Seo
        path="/interior-design"
        title="Interior Design & Furnishing"
        description="Beautifully furnished spaces tailored to your needs and budget — from furniture packages to complete turnkey furnishing solutions with Hunt & Harris Real Estate."
      />
      <Navbar />
      <ServiceDetail
        image="/photos/living-luxe.jpg"
        title="Interior Design & Furnishing"
        tagline="Beautifully furnished spaces, tailored to your needs and budget."
        paras={[
          'Whether you are furnishing a new home, updating an existing property, equipping staff accommodation or designing an office, Hunt & Harris Real Estate can help bring your vision to life.',
          'We begin with a personalised consultation to understand your requirements, style preferences and budget. From essential furniture packages and window treatments to a complete turnkey furnishing solution, we tailor our services to suit your space and lifestyle.',
          'Through our network of established suppliers, we can source furniture, furnishings and decorative accessories in a variety of styles and price ranges. Our team helps coordinate the entire process, from initial planning and product selection to project management, delivery and installation.',
          'With a focus on convenience, quality and attention to detail, we aim to make furnishing your property as seamless as possible.',
        ]}
        listTitle="Our services include:"
        list={[
          'Personalised consultations and space planning',
          'Furniture packages tailored to your budget',
          'Curtains, soft furnishings and decorative accessories',
          'Furniture and product sourcing',
          'Home, office and staff accommodation furnishing',
          'Project coordination and installation management',
          'Delivery planning and final setup',
        ]}
        closing="From a few finishing touches to a fully furnished property, we take care of the details so you can save time and enjoy a hassle-free experience."
        ctaTitle="Let us help bring your space to life."
        ctaText="Tell us about your property, your style and your budget. Our team will help you explore the right furnishing solution for your needs."
      />
      <ContactSection hideForm />
      <div style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff 0%, #d0d0d0 30%, #707070 60%, #0a0a0a 100%)', width: '100%' }} />
      <Footer />
    </>
  )
}
