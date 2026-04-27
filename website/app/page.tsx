import { Navbar } from '@/components/navbar'
import { HeroSlideshow } from '@/components/hero-slideshow'
import { FloatingWidgets } from '@/components/floating-widgets'
import { FeaturedDestinations } from '@/components/featured-destinations'
import { HomeAboutSection } from '@/components/home-about-section'
import { WhyTravelSection } from '@/components/why-travel-section'
import { RealStoriesSection } from '@/components/real-stories-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { ExperiencesSection } from '@/components/experiences-section'
import { TourPackagesSection } from '@/components/tour-packages-section'
import { DestinationsSection } from '@/components/destinations-section'
import { GallerySection } from '@/components/GallerySection'
import { MiniSlideshow } from '@/components/MiniSlideshow'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlideshow />
      <FloatingWidgets />
      <HomeAboutSection />
      <GallerySection />
      <WhyTravelSection />

      {/* MiniSlideshow — mobile only, always light background */}
      <div
        className="lg:hidden px-4 py-8"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)' }}
      >
        <MiniSlideshow />
      </div>

      <FeaturedDestinations />
      <TourPackagesSection />
      <ExperiencesSection />
      <RealStoriesSection />
      <Footer />
    </main>
  )
}