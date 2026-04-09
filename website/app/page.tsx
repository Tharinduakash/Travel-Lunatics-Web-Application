import { Navbar } from '@/components/navbar'
import { HeroSlideshow } from '@/components/hero-slideshow'
import { FloatingWidgets } from '@/components/floating-widgets'
import { FeaturedDestinations } from '@/components/featured-destinations'
import { HomeAboutSection } from '@/components/home-about-section'
import { ServicesSection } from '@/components/services-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { ExperiencesSection } from '@/components/experiences-section'
import { TourPackagesSection } from '@/components/tour-packages-section'
import { DestinationsSection } from '@/components/destinations-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <HeroSlideshow />
      <FloatingWidgets />
       
        <FeaturedDestinations />

        {/* Services Section */}
        <ServicesSection />

        <ExperiencesSection/>

        <TourPackagesSection />

        {/* About Section */}
        <HomeAboutSection />

        <DestinationsSection />



        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
    

      {/* Footer */}
      <Footer />
    </main>
  )
}
