import Seo from '../seo/Seo'
import Navbar from '../components/Navbar'
import ServiceDetail from '../components/ServiceDetail'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ForeignExchangePage() {
  return (
    <>
      <Seo
        path="/foreign-exchange"
        title="Foreign Currency Exchange"
        description="Competitive foreign exchange and seamless international transfers through Hunt & Harris Real Estate's FX partner, Agility Forex UK Ltd."
      />
      <Navbar />
      <ServiceDetail
        image="/photos/rak-aerial-hero.jpg"
        title="Foreign Currency Exchange"
        tagline="Competitive exchange rates. Seamless international transfers. Personalised service."
        paras={[
          'Through our partnership with Agility Forex UK Ltd., Hunt & Harris Real Estate helps clients access competitive foreign exchange services for international transfers of all sizes, whether for personal or business purposes.',
          'Combining market expertise, advanced technology and a client-focused approach, Agility Forex aims to deliver an efficient, straightforward and cost-effective currency exchange experience. Clients can benefit from competitive exchange rates and transparent pricing as an alternative to traditional bank transfer services.',
          'For individuals and businesses managing international payments or currency exposure, experienced currency specialists provide tailored support to help navigate market movements and plan transactions effectively.',
        ]}
        listTitle="Key benefits include:"
        list={[
          'Fast, efficient and personalised service',
          'Competitive foreign exchange rates',
          'Spot and forward contracts',
          'Regular monthly international payments',
          'Market insights and exchange rate updates',
          'Referenced and trackable international payments',
          'Access to SWIFT payment confirmations',
          'Inclusive exchange rates with no additional handling or telegraphic transfer (TT) fees, subject to the agreed service terms',
        ]}
        closing="Whether you are purchasing property overseas, transferring funds internationally or managing business transactions, our foreign exchange partner can help make the process simpler and more efficient."
        ctaTitle="Ready to make your international transfers easier?"
        ctaText="Speak to our team to discover how our foreign exchange partner can support your currency exchange and international payment needs."
      />
      <ContactSection hideForm />
      <Footer />
    </>
  )
}
