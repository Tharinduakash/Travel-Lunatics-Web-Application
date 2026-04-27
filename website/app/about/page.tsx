import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about-hero'
import { AboutWhoWeAre } from '@/components/about-who-we-are'
import { AboutFounder } from '@/components/about-founder'
import { AboutMissionVision } from '@/components/about-mission-vision'
import { AboutWhyUs } from '@/components/about-why-us'
import { AboutCta } from '@/components/about-cta'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <AboutWhoWeAre />
      <AboutFounder />
      <AboutMissionVision />
      <AboutWhyUs />
      <AboutCta />
      <Footer />
    </main>
  )
}
