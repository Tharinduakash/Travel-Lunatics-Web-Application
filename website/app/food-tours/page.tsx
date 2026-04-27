import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TourPageLayout, type TourPackage } from '@/components/tour-page-layout'

const allInclude = [
  'Airport pickup & drop-off',
  'English-speaking chauffeur guide',
  'Private air-conditioned vehicle',
  'Star-class air-conditioned hotels',
  'Half Board basis (Breakfast & Dinner)',
  'Cooking classes, market visits & food experiences',
  'All transport, fuel & parking included',
]

const packages: TourPackage[] = [
  {
    id: 1,
    image: '/webp/cook.webp',
    name: 'INTO SRI LANKA – FLAVOURS OF SPICE TRAIL',
    duration: '7 Nights / 8 Days',
    theme: 'Cooking, Spice Gardens, Street Food & Cultural Cuisine',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Arrival and relaxation at beach hotel.' },
      { day: 'Day 2', title: 'Colombo Street Food Experience', desc: 'Explore local food streets, try kottu roti, hoppers, seafood dishes, and tropical fruits. Evening cooking introduction with local chef.' },
      { day: 'Day 3', title: 'Spice Garden Experience (Matale)', desc: 'Visit traditional spice gardens. Learn about cinnamon, cardamom, pepper, cloves and Ayurvedic cooking traditions.' },
      { day: 'Day 4', title: 'Kandy Cooking Class', desc: 'Hands-on Sri Lankan cooking class: rice & curry preparation, coconut sambol making, traditional spice blending.' },
      { day: 'Day 5', title: 'Village Cooking Experience (Habarana)', desc: 'Cook with a local village family using clay pots and firewood. Authentic rural Sri Lankan lunch experience.' },
      { day: 'Day 6', title: 'Nuwara Eliya Tea & Food Fusion', desc: 'Tea plantation visit + colonial-era cuisine tasting.' },
      { day: 'Day 7', title: 'Beach Transfer to Weligama', desc: 'Relax at beach hotel.' },
      { day: 'Day 8', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['All cooking class ingredients', 'Market tours', 'Local chef guidance', 'Recipe booklet'],
  },
  {
    id: 2,
    image: '/webp/Cookery-demo-cooking-in-the-kitchen.jpg',
    name: 'INTO SRI LANKA – GRAND CULINARY JOURNEY',
    duration: '10 Nights / 11 Days',
    theme: 'Deep Culinary Exploration & Regional Food Diversity',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Arrival and hotel transfer.' },
      { day: 'Day 2', title: 'Colombo Food Markets', desc: 'Explore local markets, fish auctions, fruit markets and street food cooking.' },
      { day: 'Day 3', title: 'Coastal Seafood Cooking (Negombo)', desc: 'Fresh seafood cooking class with lagoon fish and crab curry preparation.' },
      { day: 'Day 4', title: 'Kandy Spice Cooking Experience', desc: 'Traditional Kandyan cuisine workshop.' },
      { day: 'Day 5', title: 'Sigiriya Village Cooking', desc: 'Farm-to-table cooking experience in rural village setting.' },
      { day: 'Day 6', title: 'Dambulla Market & Herbal Cooking', desc: 'Learn herbal food traditions and Ayurvedic cooking.' },
      { day: 'Day 7', title: 'Hill Country Food & Tea Experience', desc: 'Tea tasting + colonial dining experience.' },
      { day: 'Day 8', title: 'Southern Cooking (Galle Area)', desc: 'Coconut-based southern cuisine workshop.' },
      { day: 'Day 9', title: 'Weligama Transfer', desc: 'Travel to the southern coast.' },
      { day: 'Day 10', title: 'Beach Cooking & Seafood Grill Night', desc: 'Learn beach-style seafood grilling.' },
      { day: 'Day 11', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Regional cooking workshops', 'Market tours island-wide', 'Seafood experiences', 'All ingredients & guidance'],
  },
  {
    id: 3,
    image: '/webp/chef.jpg',
    name: 'INTO SRI LANKA – CHEF FOR A DAY EXPERIENCE',
    duration: '6 Nights / 7 Days',
    theme: 'Hands-On Cooking & Immersive Food Culture',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Arrival and hotel transfer.' },
      { day: 'Day 2', title: 'Colombo Cooking Studio', desc: 'Professional cooking class with local chef.' },
      { day: 'Day 3', title: 'Spice Market Exploration', desc: 'Visit Pettah market and learn spice selection.' },
      { day: 'Day 4', title: 'Kandy Cooking & Temple Food Culture', desc: 'Learn temple-inspired vegetarian cuisine.' },
      { day: 'Day 5', title: 'Habarana Village Kitchen Experience', desc: 'Cook with local family in rural kitchen.' },
      { day: 'Day 6', title: 'Beach Cooking Experience (Weligama)', desc: 'Seafood BBQ and coastal cooking.' },
      { day: 'Day 7', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Professional chef guidance', 'Spice market tour', 'Village kitchen experience', 'Seafood BBQ night'],
  },
]

export default function FoodTours() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/shutterstock_1050911312.webp"
        heroEyebrow="Spice Trails of Sri Lanka"
        heroTitle="Food & Culinary Experiences"
        heroSubtitle="Cooking classes, spice gardens, street food markets and authentic village kitchens across the island."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(80,20,0,0.82) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
