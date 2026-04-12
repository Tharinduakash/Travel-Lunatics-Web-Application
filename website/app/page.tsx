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

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <HeroSlideshow />
      <FloatingWidgets />
       <HomeAboutSection />
       <GallerySection />
        <WhyTravelSection />
        <FeaturedDestinations />
        <TourPackagesSection />
        <ExperiencesSection/>
        <RealStoriesSection />
      <Footer />
    </main>
  )
}
