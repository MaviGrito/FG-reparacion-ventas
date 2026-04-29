import PageTransition from '../components/layout/PageTransition'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/contact/ContactForm'
import LocationSection from '../components/contact/LocationSection'

export default function Contacto() {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-16">
        <LocationSection />
        <section className="bg-light py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
