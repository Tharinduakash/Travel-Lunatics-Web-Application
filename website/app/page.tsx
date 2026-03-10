import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturedDestinations } from '@/components/featured-destinations'
import { ServicesSection } from '@/components/services-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      
      <main className="pt-8">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mx-auto max-w-7xl">
            <HeroSection />
          </div>
        </div>

        {/* Featured Destinations */}
        <FeaturedDestinations />

        {/* Services Section */}
        <ServicesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
