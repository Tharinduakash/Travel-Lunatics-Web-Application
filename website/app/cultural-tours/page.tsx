import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TourPageLayout, type TourPackage } from '@/components/tour-page-layout'

const allInclude = [
  'Airport pickup & drop-off',
  'English-speaking chauffeur guide',
  'Private air-conditioned vehicle',
  'Comfortable star-class accommodation',
  'Half Board basis (Breakfast & Dinner)',
  'Village visits, home stays & cultural interaction',
  'Transport, fuel & guidance included',
]

const packages: TourPackage[] = [
  {
    id: 1,
    image: '/webp/main-image-3-scaled.webp',
    name: 'INTO SRI LANKA – VILLAGE LIFE EXPERIENCE',
    duration: '7 Nights / 8 Days',
    theme: 'Authentic Rural Lifestyle Immersion',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Airport welcome and coastal hotel transfer.' },
      { day: 'Day 2', title: 'Habarana Village Stay', desc: 'Experience rural life: bullock cart rides, farming activities, local cooking.' },
      { day: 'Day 3', title: 'Sigiriya Countryside Life', desc: 'Interact with farming communities and village temples.' },
      { day: 'Day 4', title: 'Polonnaruwa Local Lifestyle Tour', desc: 'Explore how rural communities live around ancient ruins.' },
      { day: 'Day 5', title: 'Kandy Local Market & Family Interaction', desc: 'Visit local markets and traditional homes.' },
      { day: 'Day 6', title: 'Tea Estate Workers Experience', desc: 'Learn tea plucking and plantation life in Nuwara Eliya.' },
      { day: 'Day 7', title: 'Transfer to Weligama', desc: 'Scenic drive to southern coast.' },
      { day: 'Day 8', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Village home visits', 'Cultural interactions', 'Local cooking experience', 'Plantation tour'],
  },
  {
    id: 2,
    image: '/webp/Temple of Tooth relic (Dalanda Maligawa) 02.webp',
    name: 'AUTHENTIC ISLAND LIFE EXPERIENCE',
    duration: '10 Nights / 11 Days',
    theme: 'Real Sri Lanka Living — Villages, Fishing Culture, Temples, Farming & Coastal Life',
    description: `A deep cultural immersion designed for travelers who want to experience Sri Lanka as it truly is lived by locals. Focuses on real homes, real food, real traditions, and real daily life across villages, towns, and coastal communities, ending with relaxation in Weligama.`,
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo (Coastal Welcome)', desc: 'Warmly welcomed by your chauffeur guide and transferred to Negombo, a coastal fishing town. Evening free to relax by the beach and observe local fishing boats and lagoon life.' },
      { day: 'Day 2', title: 'Fishing Village Life Experience', desc: 'Early morning fish market visit where fishermen bring in their fresh catch. Visit a fishing village and experience a lagoon boat ride through mangroves and small island communities.' },
      { day: 'Day 3', title: 'Rural Village Experience (Habarana Region)', desc: 'Bullock cart ride through farming paths, catamaran boat ride on a village reservoir, and visit a local home where villagers prepare traditional rice and curry using firewood cooking methods.' },
      { day: 'Day 4', title: 'Farming & Agricultural Life', desc: 'Observe paddy fields, irrigation systems, and seasonal farming activities. Interact with farmers working in rice fields or vegetable plantations.' },
      { day: 'Day 5', title: 'Sigiriya Local Community & Village Culture', desc: 'Visit villages surrounding Sigiriya, interact with local families, and attend a cultural storytelling session or local gathering.' },
      { day: 'Day 6', title: 'Polonnaruwa Rural Heritage Life', desc: 'Explore the ancient city from a local perspective, observing how nearby communities live beside ancient monuments.' },
      { day: 'Day 7', title: 'Kandy Local City Life', desc: 'Visit local markets, craft villages with artisans producing wood carvings and brass items. Evening walk around Kandy Lake.' },
      { day: 'Day 8', title: 'Hill Country Tea Estate Life (Nuwara Eliya Region)', desc: 'Visit tea plantations, experience plantation worker life, and learn how tea leaves are plucked, processed, and graded.' },
      { day: 'Day 9', title: 'Transfer to Weligama (Coastal Transition)', desc: 'Descend from the hills to the southern coastline. Check into beach hotel in Weligama.' },
      { day: 'Day 10', title: 'Weligama Beach Local Life Experience', desc: 'Visit local fishermen, observe surf culture in Mirissa, and enjoy fresh seafood prepared in local coastal style.' },
      { day: 'Day 11', title: 'Departure', desc: 'Airport transfer concluding your full island immersion experience.' },
    ],
    includes: ['Real village home visits', 'Fish market experience', 'Bullock cart & boat rides', 'Tea estate tour', 'Coastal fishing culture'],
  },
  {
    id: 3,
    image: '/webp/Dambulla Temple 01.webp',
    name: 'ROOTS OF SRI LANKA EXPERIENCE',
    duration: '6 Nights / 7 Days',
    theme: 'Deep Cultural Immersion • Village Life • Ancient Beliefs • Local Traditions',
    description: `A short but highly immersive cultural journey for travelers who want to understand the true roots of Sri Lanka — how people live, worship, farm, cook, and maintain traditions that go back centuries.`,
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo (Coastal Introduction)', desc: `Welcome and transfer to Negombo. This coastal town introduces Sri Lanka's everyday life through its fishing community, lagoon systems, and beach culture.` },
      { day: 'Day 2', title: 'Fishing Heritage & Coastal Life', desc: 'Early morning fish market, fishing village visit, and observation of centuries-old traditions of small-scale fishing and boat building.' },
      { day: 'Day 3', title: 'Habarana Village Immersion', desc: 'Bullock cart ride through farmland, catamaran boat ride on a reservoir, traditional clay-pot cooking with local families, and interaction with farmers and villagers.' },
      { day: 'Day 4', title: 'Ancient Beliefs & Village Temples', desc: 'Visit small village temples where daily rituals take place. Learn about local customs, offerings, and Buddhist practices embedded in rural life.' },
      { day: 'Day 5', title: 'Sigiriya Surrounding Communities', desc: 'Explore villages around Sigiriya. Interact with local families, farmers, and artisans in small home industries such as wood carving and weaving.' },
      { day: 'Day 6', title: 'Kandy Cultural Roots', desc: 'Local markets, traditional craft workshops, Temple of the Tooth Relic, and evening traditional cultural dance performance.' },
      { day: 'Day 7', title: 'Departure via Colombo', desc: 'Return to Colombo with optional stop for colonial architecture or local street life before airport transfer.' },
    ],
    includes: ['Village temple visits', 'Cultural dance performance', 'Craft workshop experience', 'Fishing heritage tour'],
  },
]

export default function CulturalTours() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/Dambulla Temple 01.webp"
        heroEyebrow="Echoes of the Past"
        heroTitle="Cultural Immersion Experiences"
        heroSubtitle="Ancient kingdoms, sacred temples and authentic village life — connect with the true soul of Sri Lanka."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(50,25,0,0.85) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
