import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TourPageLayout, type TourPackage } from '@/components/tour-page-layout'

const allInclude = [
  'Airport pickup & drop-off',
  'Professional English-speaking chauffeur guide throughout',
  'Private air-conditioned vehicle (car/van)',
  'Carefully selected star-class air-conditioned hotels',
  'Half Board Basis (Breakfast & Dinner Included Daily)',
  'All fuel, parking, highway charges included',
  'Assistance at temples, heritage sites & entrances',
  'Flexible stops for photography, food & local experiences',
]

const packages: TourPackage[] = [
  {
    id: 1,
    image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg',
    name: 'INTO SRI LANKA HIGHLIGHTS JOURNEY',
    duration: '9 Nights / 10 Days',
    theme: 'Culture + Safari + Highlands + Beach',
    perfectFor: 'Balanced introduction to Sri Lanka',
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo', desc: 'Warmly welcomed by your English-speaking chauffeur guide. Transferred to hotel in Negombo, a coastal town known for its relaxed beach atmosphere.' },
      { day: 'Day 2', title: 'Anuradhapura Ancient Kingdom', desc: `Explore sacred ruins including the Sri Maha Bodhi tree, ancient stupas, monasteries, and massive stone structures built over 2,000 years ago.` },
      { day: 'Day 3', title: 'Sigiriya Rock Fortress', desc: `Visit the iconic Sigiriya Rock Fortress. Climb through water gardens, stairways, and fresco galleries to explore King Kashyapa's palace summit.` },
      { day: 'Day 4', title: 'Minneriya National Park Safari', desc: 'Afternoon jeep safari. Famous for large elephant gatherings, deer, crocodiles, monkeys, and many bird species.' },
      { day: 'Day 5', title: 'Kandy Cultural City', desc: 'Visit the Temple of the Tooth Relic. Walk around Kandy Lake and experience an evening cultural dance show.' },
      { day: 'Day 6', title: 'Nuwara Eliya Highlands', desc: 'Tea plantations, waterfalls, and misty mountains. Explore colonial-era buildings and tea estates.' },
      { day: 'Day 7', title: 'Transfer to Weligama', desc: 'Descend from the hills to the southern coastline. Check into beach hotel.' },
      { day: 'Day 8', title: 'Weligama Beach Leisure', desc: 'Fully dedicated to relaxation: swimming, sunbathing, or beach walks.' },
      { day: 'Day 9', title: 'Weligama Leisure & Optional Experiences', desc: 'Optional whale watching from Mirissa, surfing lessons, spa treatments, or coastal village exploration.' },
      { day: 'Day 10', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Cultural Triangle sites', 'Minneriya Safari', 'Kandy cultural show', 'Nuwara Eliya tea experience', 'Weligama beach stay'],
  },
  {
    id: 2,
    image: '/webp/shutterstock_30691945.webp',
    name: 'INTO SRI LANKA WILDLIFE & HERITAGE BLEND',
    duration: '11 Nights / 12 Days',
    theme: 'Strong Cultural Core + Multiple Safaris + Beach Finale',
    description: `This journey combines ancient civilization, wildlife encounters, cultural experiences, and coastal relaxation in Weligama. It moves at a comfortable pace with carefully selected routes to reduce fatigue and maximize experience.`,
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo', desc: 'Arrival and relaxation after your journey.' },
      { day: 'Day 2', title: 'Dambulla Cave Temple', desc: 'UNESCO-listed cave temple complex filled with ancient murals and Buddha statues carved into rock chambers.' },
      { day: 'Day 3', title: 'Sigiriya Rock Fortress', desc: `Explore Sigiriya in detail, learning about its royal history, engineering brilliance, and artistic heritage.` },
      { day: 'Day 4', title: 'Polonnaruwa Ancient City', desc: 'Medieval capital with royal palace ruins, stone carvings, and ancient irrigation systems.' },
      { day: 'Day 5', title: 'Wilpattu National Park Safari', desc: `Sri Lanka's largest national park, known for leopard and sloth bear sightings.` },
      { day: 'Day 6', title: 'Transfer to Kandy', desc: 'Scenic drive into the hill country with arrival in the cultural capital.' },
      { day: 'Day 7', title: 'Kandy Cultural Experience', desc: 'Temple of the Tooth Relic and traditional Kandyan dance performance in the evening.' },
      { day: 'Day 8', title: 'Udawalawe Elephant Safari', desc: 'Morning safari focused on large elephant herds living freely in open plains.' },
      { day: 'Day 9', title: 'Transfer to Weligama', desc: 'Travel to the southern coast.' },
      { day: 'Day 10', title: 'Weligama Beach Leisure', desc: 'Full day of relaxation by the Indian Ocean.' },
      { day: 'Day 11', title: 'Weligama Leisure / Optional Whale Watching', desc: 'Optional whale watching or full rest day.' },
      { day: 'Day 12', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Ancient city tours', 'Wilpattu leopard safari', 'Udawalawe elephant safari', 'Whale watching option', 'Beach finale'],
  },
  {
    id: 3,
    image: '/webp/pexels-isharakasthuriarachchi-6031391.jpg',
    name: 'INTO SRI LANKA GRAND SAFARI & CULTURE EXPEDITION',
    duration: '13 Nights / 14 Days',
    theme: 'Deep Cultural Immersion + Full Wildlife Circuit + Extended Beach Stay',
    description: 'A complete Sri Lankan journey combining ancient kingdoms, sacred temples, multiple safari parks, tea country landscapes, and a long relaxing beach stay in Weligama.',
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo', desc: 'Arrival and welcome by your chauffeur guide.' },
      { day: 'Day 2', title: 'Anuradhapura Ancient City', desc: `Sri Lanka's oldest recorded capital — Sri Maha Bodhi tree, massive stupas, ancient monasteries.` },
      { day: 'Day 3', title: 'Mihintale Sacred Mountain', desc: 'Sacred mountain where Buddhism was introduced to Sri Lanka. Stone steps to ancient stupas.' },
      { day: 'Day 4', title: 'Sigiriya Rock Fortress', desc: 'Water gardens, frescoes, mirror wall inscriptions, and summit palace ruins.' },
      { day: 'Day 5', title: 'Minneriya National Park Safari', desc: 'Large gatherings of wild elephants in open landscapes near ancient reservoirs.' },
      { day: 'Day 6', title: 'Polonnaruwa Ancient City', desc: 'Medieval kingdom, temples, royal structures, and the famous Gal Vihara Buddha statues.' },
      { day: 'Day 7', title: 'Dambulla Cave Temple + Cultural Dance', desc: 'Ancient cave temple complex and traditional cultural dance performance in the evening.' },
      { day: 'Day 8', title: 'Kandy Sacred City', desc: 'Temple of the Tooth Relic and lakeside exploration.' },
      { day: 'Day 9', title: 'Nuwara Eliya Tea Country', desc: 'Misty mountains, waterfalls, tea plantations, and colonial architecture.' },
      { day: 'Day 10', title: 'Yala National Park Safari', desc: 'Full-day safari in leopard territory with elephants, crocodiles, and rich biodiversity.' },
      { day: 'Day 11', title: 'Bundala Bird Sanctuary', desc: 'Flamingos, migratory birds, and wetland ecosystems.' },
      { day: 'Day 12', title: 'Transfer to Weligama', desc: 'Travel to southern coast.' },
      { day: 'Day 13', title: 'Weligama Beach Leisure', desc: 'Full relaxation day with sunset views.' },
      { day: 'Day 14', title: 'Weligama Leisure & Optional Activities', desc: 'Optional whale watching, surfing, spa, or complete relaxation.' },
    ],
    includes: ['6 UNESCO/heritage sites', 'Yala + Minneriya + Bundala safaris', 'Extended Weligama beach stay', 'Whale watching option'],
  },
  {
    id: 4,
    image: '/webp/pexels-ollivves-1078983.jpg',
    name: 'INTO SRI LANKA LUXURY WILDLIFE & BEACH ESCAPE',
    duration: '10 Nights / 11 Days',
    theme: 'Premium Safari + Luxury Heritage + Weligama Beach',
    perfectFor: 'Luxury travelers, honeymooners, premium clients',
    badge: 'Luxury',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo (Luxury Stay)', desc: 'VIP welcome by English-speaking chauffeur guide. Transfer to luxury hotel in Negombo.' },
      { day: 'Day 2', title: 'Sigiriya Boutique Experience', desc: 'Travel to Cultural Triangle and check into boutique hotel near Sigiriya.' },
      { day: 'Day 3', title: 'Private Sigiriya Rock Fortress Tour', desc: 'Private guided climb with flexible schedule, avoiding crowds and focusing on photography.' },
      { day: 'Day 4', title: 'Minneriya Private Safari', desc: 'Exclusive jeep safari experience focusing on elephant herds and wildlife photography.' },
      { day: 'Day 5', title: 'Luxury Kandy Cultural Stay', desc: 'Private guided Temple of the Tooth Relic experience, followed by relaxed evening in luxury hotel.' },
      { day: 'Day 6', title: 'Yala Leopard Safari', desc: 'Private safari experience in leopard territory with expert guiding.' },
      { day: 'Day 7', title: 'Transfer to Weligama Luxury Beach Resort', desc: 'Arrive at premium beachfront resort and begin coastal relaxation.' },
      { day: 'Day 8', title: 'Weligama Beach Leisure', desc: 'Full day relaxation with optional spa treatments and sunset dining.' },
      { day: 'Day 9', title: 'Weligama Leisure & Whale Watching Option', desc: 'Optional whale watching in Mirissa or complete leisure day.' },
      { day: 'Day 10', title: 'Final Leisure Day', desc: 'Free day for shopping, rest, or beach activities.' },
      { day: 'Day 11', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Premium boutique hotels', 'Private guided tours', 'Exclusive safari experiences', 'Luxury beach resort', 'Honeymoon friendly'],
  },
  {
    id: 5,
    image: '/webp/BANNER.webp',
    name: 'INTO SRI LANKA ULTIMATE COMPLETE EXPERIENCE',
    duration: '15 Nights / 16 Days',
    theme: 'Full Island Discovery — Culture, Wildlife, Highlands & Extended Beach',
    description: `The most complete Sri Lanka experience covering all major cultural, wildlife, and scenic destinations, ending with three full relaxing days in Weligama beach for a perfect slow travel finish.`,
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Airport pickup and hotel transfer.' },
      { day: 'Day 2', title: 'Anuradhapura Ancient Kingdom', desc: `Explore Sri Lanka's first capital and sacred Buddhist monuments.` },
      { day: 'Day 3', title: 'Mihintale Sacred Mountain', desc: 'Birthplace of Buddhism in Sri Lanka.' },
      { day: 'Day 4', title: 'Sigiriya Rock Fortress', desc: 'Climb the iconic Lion Rock fortress.' },
      { day: 'Day 5', title: 'Polonnaruwa Ancient City', desc: 'Medieval ruins and royal heritage sites.' },
      { day: 'Day 6', title: 'Minneriya Safari', desc: 'Elephant gatherings and wildlife.' },
      { day: 'Day 7', title: 'Dambulla Cave Temple', desc: 'Ancient cave murals and statues.' },
      { day: 'Day 8', title: 'Kandy Cultural City', desc: 'Temple of the Tooth + cultural show.' },
      { day: 'Day 9', title: 'Nuwara Eliya Highlands', desc: 'Tea plantations, waterfalls, and colonial charm.' },
      { day: 'Day 10', title: 'Yala National Park Safari', desc: 'Leopard safari and wildlife exploration.' },
      { day: 'Day 11', title: 'Bundala Bird Sanctuary', desc: 'Birdwatching and wetland ecosystems.' },
      { day: 'Day 12', title: 'Transfer to Weligama', desc: 'Arrive at southern coast beach resort.' },
      { day: 'Day 13', title: 'Weligama Beach Leisure', desc: 'Relaxation, swimming, sunset views.' },
      { day: 'Day 14', title: 'Weligama Leisure & Optional Activities', desc: 'Whale watching, surfing, spa, or leisure.' },
      { day: 'Day 15', title: 'Final Beach Leisure Day', desc: 'Full relaxation and coastal enjoyment.' },
      { day: 'Day 16', title: 'Departure', desc: 'Airport transfer and end of tour.' },
    ],
    includes: ['All major heritage sites', '4 national park safaris', '3-day Weligama beach finale', 'Whale watching option', 'Complete Sri Lanka circuit'],
  },
]

export default function DiscoverSriLanka() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/pexels-eslames1-32414014.webp"
        heroEyebrow="Discover Sri Lanka"
        heroTitle="Round Tour Packages"
        heroSubtitle="Complete island journeys — culture, wildlife, highlands and beach in one unforgettable experience."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(10,28,18,0.85) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
