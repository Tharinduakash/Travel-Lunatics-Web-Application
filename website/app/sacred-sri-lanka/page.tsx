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
    image: '/webp/sigiriya.webp',
    name: 'INTO SRI LANKA HIGHLIGHTS JOURNEY',
    duration: '9 Nights / 10 Days',
    theme: 'Culture + Safari + Highlands + Beach',
    perfectFor: 'Balanced introduction to Sri Lanka',
    days: [
      {
        day: 'Day 1',
        title: 'Arrival in Negombo',
        desc: `Upon arrival at Colombo International Airport, you will be warmly welcomed by your English-speaking chauffeur guide. You will be transferred to your hotel in Negombo, a coastal town known for its relaxed beach atmosphere. The rest of the day is free for rest after your flight.`,
      },
      {
        day: 'Day 2',
        title: 'Anuradhapura Ancient Kingdom',
        desc: `You travel inland to Anuradhapura, Sri Lanka's first great capital. Explore sacred ruins including the Sri Maha Bodhi tree, ancient stupas, monasteries, and massive stone structures built over 2,000 years ago.`,
      },
      {
        day: 'Day 3',
        title: 'Sigiriya Rock Fortress',
        desc: `Visit the iconic Sigiriya Rock Fortress. The climb takes you through ancient water gardens, stairways, and fresco galleries. At the summit, explore the ruins of King Kashyapa's palace and enjoy panoramic views of the surrounding forests and villages.`,
      },
      {
        day: 'Day 4',
        title: 'Minneriya National Park Safari',
        desc: 'Afternoon jeep safari in Minneriya National Park — famous for large elephant gatherings. You also see deer, crocodiles, monkeys, and many bird species.',
      },
      {
        day: 'Day 5',
        title: 'Kandy Cultural City',
        desc: `You travel to Kandy, the last royal capital of Sri Lanka. Visit the Temple of the Tooth Relic, one of Buddhism's most sacred sites. Walk around Kandy Lake and experience an evening cultural dance show with traditional drumming and fire performances.`,
      },
      {
        day: 'Day 6',
        title: 'Nuwara Eliya Highlands',
        desc: 'Continue into the central highlands. The journey passes tea plantations, waterfalls, and misty mountains. Explore colonial-era buildings and tea estates in Nuwara Eliya.',
      },
      {
        day: 'Day 7',
        title: 'Transfer to Weligama',
        desc: 'Descend from the hills and travel to the southern coastline. Check into your beach hotel and spend the evening relaxing by the ocean.',
      },
      {
        day: 'Day 8',
        title: 'Weligama Beach Leisure',
        desc: 'This day is fully dedicated to relaxation. Enjoy swimming, sunbathing, beach walks, or simply resting at your hotel.',
      },
      {
        day: 'Day 9',
        title: 'Weligama Leisure & Optional Experiences',
        desc: 'Optional whale watching from Mirissa, surfing lessons, spa treatments, or coastal village exploration.',
      },
      {
        day: 'Day 10',
        title: 'Departure',
        desc: 'After breakfast, transferred back to the airport for your departure flight.',
      },
    ],
    includes: ['Cultural Triangle sites', 'Minneriya Safari', 'Kandy cultural show', 'Nuwara Eliya tea experience', 'Weligama beach stay'],
  },
  {
    id: 2,
    image: '/webp/Dambulla Temple 01.webp',
    name: 'INTO SRI LANKA WILDLIFE & HERITAGE BLEND',
    duration: '11 Nights / 12 Days',
    theme: 'Ancient Cities + Safaris + Culture + Weligama Beach Finale',
    description: `Designed for travelers who want a perfect balance between Sri Lanka's ancient civilization, wildlife encounters, cultural experiences, and coastal relaxation. The itinerary moves at a comfortable pace with carefully selected travel routes to reduce fatigue and maximize experience.`,
    days: [
      {
        day: 'Day 1',
        title: 'Arrival in Negombo',
        desc: 'Welcomed by your professional English-speaking chauffeur guide and transferred to your beach hotel in Negombo. Rest of day free for recovery.',
      },
      {
        day: 'Day 2',
        title: 'Dambulla Cave Temple (Sacred Art & History)',
        desc: `Visit the Dambulla Cave Temple, a UNESCO World Heritage site carved into a massive rock. Explore ancient cave chambers filled with Buddhist statues, golden Buddha figures, and wall paintings dating back over 2,000 years.`,
      },
      {
        day: 'Day 3',
        title: 'Sigiriya Rock Fortress (Ancient Royal Power)',
        desc: `Ascend through landscaped gardens, water systems, and stone stairways to the ancient palace ruins at the summit. See the famous Sigiriya frescoes and mirror wall inscriptions. Panoramic views of forests and villages from the top.`,
      },
      {
        day: 'Day 4',
        title: 'Polonnaruwa Ancient City (Medieval Kingdom)',
        desc: `Explore a vast archaeological landscape filled with royal palaces, audience halls, Buddhist temples, and stone sculptures. Highlight: the Gal Vihara, where four giant Buddha statues are carved directly into granite rock.`,
      },
      {
        day: 'Day 5',
        title: 'Wilpattu National Park Safari (Leopards & Wilderness)',
        desc: `Full-day safari in Sri Lanka's largest and oldest national park. Encounter leopards, sloth bears, spotted deer, crocodiles, and a wide range of bird species in untouched wilderness.`,
      },
      {
        day: 'Day 6',
        title: 'Transfer to Kandy (Cultural Capital)',
        desc: 'Travel toward Kandy, passing rural landscapes and scenic countryside. Check into your hotel and relax in the cool hill capital atmosphere.',
      },
      {
        day: 'Day 7',
        title: 'Kandy Cultural Experience',
        desc: `Visit the sacred Temple of the Tooth Relic. Peaceful walk around Kandy Lake. Evening: vibrant cultural dance performance showcasing Kandyan drumming, fire shows, and traditional costumes.`,
      },
      {
        day: 'Day 8',
        title: 'Udawalawe Elephant Safari',
        desc: 'Morning safari in Udawalawe National Park. Observe large herds of wild elephants, elephant families, baby elephants, and other wildlife in their natural habitat.',
      },
      {
        day: 'Day 9',
        title: 'Transfer to Weligama (Southern Coast)',
        desc: `Travel to Sri Lanka's southern coastline. Check into beach resort in Weligama.`,
      },
      {
        day: 'Day 10',
        title: 'Weligama Beach Leisure Day',
        desc: 'Fully dedicated to relaxation. Enjoy the beach, swim in the Indian Ocean, or simply relax at your hotel.',
      },
      {
        day: 'Day 11',
        title: 'Weligama Leisure & Optional Experiences',
        desc: 'Optional whale watching from Mirissa, surfing lessons, spa treatments, or exploring nearby coastal villages.',
      },
      {
        day: 'Day 12',
        title: 'Departure',
        desc: 'After breakfast, transferred back to the airport for your departure flight.',
      },
    ],
    includes: ['Ancient city tours', 'Wilpattu leopard safari', 'Udawalawe elephant safari', 'Whale watching option', 'Beach finale'],
  },
  {
    id: 3,
    image: '/webp/Aukana Buddha Statue.webp',
    name: 'INTO SRI LANKA GRAND SAFARI & CULTURE EXPEDITION',
    duration: '13 Nights / 14 Days',
    theme: 'Deep Cultural Immersion + Full Wildlife Circuit + Extended Weligama Beach Stay',
    description: 'A complete Sri Lankan journey combining ancient kingdoms, sacred temples, multiple safari parks, tea country landscapes, and a long relaxing beach stay in Weligama.',
    days: [
      { day: 'Day 1', title: 'Arrival in Negombo', desc: 'Arrival and welcome by your chauffeur guide. Transfer to beach hotel. Rest after international flight.' },
      {
        day: 'Day 2',
        title: 'Anuradhapura Ancient City (First Kingdom)',
        desc: `Explore sacred sites including the Sri Maha Bodhi tree, massive stupas, ancient monasteries, and historical reservoirs — the beginning of Sri Lanka's civilization and Buddhist heritage.`,
      },
      {
        day: 'Day 3',
        title: 'Mihintale Sacred Mountain (Birthplace of Buddhism)',
        desc: 'Visit Mihintale, believed to be the place where Buddhism was introduced to Sri Lanka. Climb stone steps to ancient stupas with panoramic views of surrounding plains.',
      },
      {
        day: 'Day 4',
        title: 'Sigiriya Rock Fortress (Royal Citadel in the Sky)',
        desc: 'Explore Sigiriya in depth — water gardens, frescoes, mirror wall inscriptions, and summit palace ruins. One of the most iconic archaeological sites in Asia.',
      },
      {
        day: 'Day 5',
        title: 'Minneriya National Park Safari (Elephant Gathering)',
        desc: 'Experience Minneriya National Park, famous for large gatherings of wild elephants moving across open landscapes near ancient reservoirs.',
      },
      {
        day: 'Day 6',
        title: 'Polonnaruwa Ancient City (Medieval Capital)',
        desc: 'Explore the medieval kingdom — temples, royal structures, and the famous Gal Vihara Buddha statues carved into rock.',
      },
      {
        day: 'Day 7',
        title: 'Dambulla Cave Temple + Cultural Dance Evening',
        desc: 'Visit the Dambulla Cave Temple complex filled with ancient murals and Buddha statues. Evening: traditional cultural dance performance in Habarana.',
      },
      {
        day: 'Day 8',
        title: 'Kandy Sacred City (Temple of the Tooth)',
        desc: 'Travel to Kandy. Visit the Temple of the Tooth Relic. Explore the city center and enjoy the lakeside atmosphere.',
      },
      {
        day: 'Day 9',
        title: 'Nuwara Eliya Tea Country (Hill Country)',
        desc: 'Travel through misty mountains, waterfalls, and tea plantations. Experience colonial architecture and cool climate scenery in Nuwara Eliya.',
      },
      {
        day: 'Day 10',
        title: 'Yala National Park Safari (Leopard Territory)',
        desc: 'Full-day safari in Yala National Park — known for leopard sightings, elephants, crocodiles, and rich biodiversity.',
      },
      {
        day: 'Day 11',
        title: 'Bundala Bird Sanctuary (Wetland Ecosystem)',
        desc: 'Explore Bundala — home to flamingos, migratory birds, and wetland ecosystems.',
      },
      { day: 'Day 12', title: 'Transfer to Weligama (Beach Arrival)', desc: 'Travel to the southern coast and arrive in Weligama. Check into beach hotel and relax.' },
      { day: 'Day 13', title: 'Weligama Beach Leisure Day', desc: 'Full day of relaxation. Swimming, sunbathing, and sunset views over the Indian Ocean.' },
      { day: 'Day 14', title: 'Weligama Leisure & Optional Activities', desc: 'Optional whale watching from Mirissa, surfing lessons, spa treatments, or complete relaxation.' },
    ],
    includes: ['6 UNESCO/heritage sites', 'Yala + Minneriya + Bundala safaris', 'Extended Weligama beach stay', 'Whale watching option'],
  },
  {
    id: 4,
    image: '/webp/Temple of Tooth relic (Dalanda Maligawa) 01.webp',
    name: 'INTO SRI LANKA LUXURY WILDLIFE & BEACH ESCAPE',
    duration: '10 Nights / 11 Days',
    theme: 'Premium Safari Experience + Luxury Heritage + Weligama Beach',
    perfectFor: 'Luxury travelers, honeymooners, premium clients',
    badge: 'Luxury',
    description: 'A high-end curated journey designed for luxury travelers, honeymooners, and premium clients who want exclusive wildlife experiences combined with comfort, privacy, and beach relaxation in Weligama.',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo (Luxury Stay)', desc: 'Arrival at Colombo Airport and VIP welcome by your English-speaking chauffeur guide. Transfer to a luxury hotel in Negombo.' },
      { day: 'Day 2', title: 'Sigiriya Boutique Experience', desc: 'Travel to the Cultural Triangle and check into a boutique hotel near Sigiriya. Relax and prepare for heritage exploration.' },
      { day: 'Day 3', title: 'Private Sigiriya Rock Fortress Tour', desc: 'Private guided climb of Sigiriya with a flexible schedule, avoiding crowds and focusing on photography and storytelling.' },
      { day: 'Day 4', title: 'Minneriya Private Safari', desc: 'Exclusive jeep safari experience in Minneriya National Park focusing on elephant herds and wildlife photography.' },
      { day: 'Day 5', title: 'Luxury Kandy Cultural Stay', desc: 'Visit the Temple of the Tooth Relic with a private guided experience, followed by a relaxed evening in a luxury hotel.' },
      { day: 'Day 6', title: 'Yala Leopard Safari', desc: 'Journey to Yala National Park for a private safari experience in leopard territory with expert guiding.' },
      { day: 'Day 7', title: 'Transfer to Weligama Luxury Beach Resort', desc: 'Arrive at a premium beachfront resort in Weligama and begin coastal relaxation.' },
      { day: 'Day 8', title: 'Weligama Beach Leisure', desc: 'Full day relaxation with optional spa treatments and sunset dining.' },
      { day: 'Day 9', title: 'Weligama Leisure & Whale Watching Option', desc: 'Optional whale watching in Mirissa or complete leisure day by the beach.' },
      { day: 'Day 10', title: 'Final Leisure Day', desc: 'Free day for shopping, rest, or beach activities.' },
      { day: 'Day 11', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Premium boutique hotels', 'Private guided tours', 'Exclusive safari experiences', 'Luxury beach resort', 'Honeymoon friendly'],
  },
  {
    id: 5,
    image: '/webp/kandy1.webp',
    name: 'INTO SRI LANKA ULTIMATE COMPLETE EXPERIENCE',
    duration: '15 Nights / 16 Days',
    theme: 'Full Island Discovery — Culture, Wildlife, Highlands & Extended Beach',
    description: `The most complete Sri Lanka experience covering all major cultural, wildlife, and scenic destinations, ending with three full relaxing days in Weligama beach for a perfect slow travel finish.`,
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Airport pickup and hotel transfer. Relax after flight.' },
      { day: 'Day 2', title: 'Anuradhapura Ancient Kingdom', desc: `Explore Sri Lanka's first capital and sacred Buddhist monuments.` },
      { day: 'Day 3', title: 'Mihintale Sacred Mountain', desc: 'Visit the birthplace of Buddhism in Sri Lanka.' },
      { day: 'Day 4', title: 'Sigiriya Rock Fortress', desc: 'Climb the iconic Lion Rock fortress.' },
      { day: 'Day 5', title: 'Polonnaruwa Ancient City', desc: 'Discover medieval ruins and royal heritage sites.' },
      { day: 'Day 6', title: 'Minneriya Safari', desc: 'Experience elephant gatherings and wildlife.' },
      { day: 'Day 7', title: 'Dambulla Cave Temple', desc: 'Explore ancient cave murals and statues.' },
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

export default function SacredSriLanka() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/sigiriya.webp"
        heroEyebrow="Sacred Sri Lanka"
        heroTitle="Spiritual Journey & Round Tour Packages"
        heroSubtitle="Ancient kingdoms, sacred mountains, spiritual temples and breathtaking highlands — experience the soul of Sri Lanka."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(30,15,50,0.85) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
