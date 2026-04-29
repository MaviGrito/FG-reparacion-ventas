import PageTransition from '../components/layout/PageTransition'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import ServicesPreview from '../components/home/ServicesPreview'
import WhyUs from '../components/home/WhyUs'
import BrandsCarousel from '../components/home/BrandsCarousel'
import ProductsPreview from '../components/home/ProductsPreview'
import MaintenanceSection from '../components/home/MaintenanceSection'
import LocationSection from '../components/contact/LocationSection'

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <Hero />
        <section id="servicios">
          <ServicesPreview />
        </section>
        <WhyUs />
        <BrandsCarousel />
        <ProductsPreview />
        <MaintenanceSection />
        <LocationSection />
      </main>
      <Footer />
    </PageTransition>
  )
}
