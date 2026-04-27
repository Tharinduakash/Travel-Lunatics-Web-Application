import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TourPageLayout, type TourPackage } from '@/components/tour-page-layout'

const allInclude = [
  'Airport pickup & drop-off',
  'English-speaking chauffeur guide',
  'Private air-conditioned vehicle',
  'Star-class beach hotels',
  'Half Board basis (Breakfast & Dinner)',
  'All transport, fuel & parking included',
]

const packages: TourPackage[] = [
  {
    id: 1,
    image: '/webp/mirissa-beach.webp',
    name: 'SOUTH BEACH DISCOVERY JOURNEY',
    duration: '7 Nights / 8 Days',
    theme: 'Weligama • Mirissa • Tangalle • Unawatuna Coastal Experience',
    days: [
      { day: 'Day 1', title: 'Arrival / Transfer to Weligama', desc: 'Welcomed by chauffeur guide and transferred to Weligama. Rest of day free to relax on the beach and enjoy sunset views over the Indian Ocean.' },
      { day: 'Day 2', title: 'Weligama Beach Relaxation', desc: 'Full day in Weligama, known for its wide sandy beach and calm surf. Optional surfing lessons available.' },
      { day: 'Day 3', title: 'Mirissa Whale Watching & Beach Life', desc: 'Early morning whale watching excursion from Mirissa. Relax on Mirissa beach with its palm-fringed coastline and laid-back atmosphere.' },
      { day: 'Day 4', title: 'Tangalle Wild Beach Escape', desc: 'Travel to Tangalle, known for untouched beaches, coconut groves, and peaceful coves. Evening dramatic sunset over the open ocean.' },
      { day: 'Day 5', title: 'Rekawa Turtle Beach Experience', desc: 'Visit Rekawa beach where sea turtles come ashore to nest (seasonal). Rare natural wildlife beach experience combined with coastal beauty.' },
      { day: 'Day 6', title: 'Unawatuna Beach & Galle Fort', desc: `Unawatuna's swimming-friendly waters and nearby Galle Fort — a UNESCO colonial fortress with cafes, boutiques, and ocean walls.` },
      { day: 'Day 7', title: 'Leisure Day in Weligama', desc: 'Return to Weligama for relaxation. Enjoy spa treatments, beach walks, or optional seafood dining by the ocean.' },
      { day: 'Day 8', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Whale watching excursion', 'Turtle beach visit', 'Galle Fort tour', 'Beach hotel stays'],
  },
  {
    id: 2,
    image: '/webp/bentota-beach.webp',
    name: 'LUXURY BEACH & LAGOON ESCAPE',
    duration: '8 Nights / 9 Days',
    theme: 'Bentota • Kalpitiya • Negombo • Weligama Luxury Coastal',
    perfectFor: 'High-end travelers, couples, honeymooners',
    badge: 'Luxury',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo Lagoon Stay', desc: 'Arrival and relaxation in Negombo, a coastal lagoon town known for fishing culture and sunset boat rides.' },
      { day: 'Day 2', title: 'Bentota Luxury Beach Resort', desc: `Travel to Bentota, one of Sri Lanka's most famous luxury beach areas. Relax in a resort surrounded by river and ocean landscapes.` },
      { day: 'Day 3', title: 'Bentota Water Sports Day', desc: 'Full day of optional activities such as jet skiing, banana boat rides, river safaris through mangroves, and beach relaxation.' },
      { day: 'Day 4', title: 'Kosgoda Turtle Hatchery & Beach', desc: 'Visit turtle conservation project and learn about sea turtle protection. Relax on quiet beaches nearby.' },
      { day: 'Day 5', title: 'Transfer to Kalpitiya (Lagoon Experience)', desc: 'Travel north to Kalpitiya, known for untouched lagoons and dolphin-rich waters.' },
      { day: 'Day 6', title: 'Dolphin & Lagoon Safari (Kalpitiya)', desc: 'Early morning dolphin watching excursion followed by lagoon boat safari through sandbanks and mangrove islands.' },
      { day: 'Day 7', title: 'Transfer to Weligama (Southern Coast)', desc: 'Scenic drive back to southern coastline. Check into beach hotel in Weligama.' },
      { day: 'Day 8', title: 'Weligama Beach Leisure', desc: 'Relaxation day with optional surfing or spa treatments.' },
      { day: 'Day 9', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['Luxury resort stays', 'Dolphin watching', 'Water sports', 'Turtle conservation visit'],
  },
  {
    id: 3,
    image: '/webp/pexels-tomas-malik-793526-1998439.webp',
    name: 'ULTIMATE SURF & SUNSET COAST EXPERIENCE',
    duration: '6 Nights / 7 Days',
    theme: 'Arugam Bay • Weligama • Hiriketiya Surf & Lifestyle Journey',
    perfectFor: 'Young travelers, surfers, and lifestyle tourists',
    days: [
      { day: 'Day 1', title: 'Arrival / Transfer to Weligama', desc: `Arrival and introduction to Sri Lanka's surf coast. Relax at beach hotel.` },
      { day: 'Day 2', title: 'Weligama Surf & Beach Day', desc: 'Beginner-friendly surfing lessons in calm waters, followed by beach relaxation and sunset cafes.' },
      { day: 'Day 3', title: 'Hiriketiya Bay Experience', desc: 'Travel to Hiriketiya, a hidden crescent-shaped surf bay. Enjoy swimming, surfing, and laid-back beach cafes.' },
      { day: 'Day 4', title: 'Tangalle Hidden Beaches', desc: 'Explore secluded beaches and coastal rock formations. A peaceful day away from crowds.' },
      { day: 'Day 5', title: 'Arugam Bay Surf Capital', desc: `If season allows, travel to Arugam Bay, Sri Lanka's surf capital. Enjoy surf culture, beach bars, and relaxed coastal life.` },
      { day: 'Day 6', title: 'Return Relaxation', desc: 'Return journey with relaxed stopovers. Final beach sunset in Weligama or local coastal town.' },
      { day: 'Day 7', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Surfing lessons', 'Hiriketiya Bay visit', 'Arugam Bay experience', 'Beach lifestyle activities'],
  },
  {
    id: 4,
    image: '/webp/jaffna1.webp',
    name: 'EAST & NORTH BEACH EXPLORER',
    duration: '7 Nights / 8 Days',
    theme: 'East Coast Paradise + Cultural Contrast + Seasonal Best Beaches',
    description: 'Best Season: April – September (East Coast Dry Season). Calm seas, sunny weather, perfect for beaches & surfing.',
    days: [
      { day: 'Day 1', title: 'Arrival / Transfer to Negombo', desc: 'Arrival and rest at coastal hotel near airport.' },
      { day: 'Day 2', title: 'Transfer to Arugam Bay', desc: `Scenic journey to Sri Lanka's surfing capital. Evening relaxation on beach.` },
      { day: 'Day 3', title: 'Arugam Bay Surf Experience', desc: 'Full day surfing experience in world-famous surf breaks. Beach cafes and sunset lifestyle.' },
      { day: 'Day 4', title: 'Lagoon & Wildlife Experience', desc: 'Explore Pottuvil lagoons, mangroves, elephants, and birdlife in untouched eastern wilderness.' },
      { day: 'Day 5', title: 'Pasikudah Beach', desc: 'Travel north along east coast to Pasikudah, known for shallow turquoise waters perfect for swimming.' },
      { day: 'Day 6', title: 'Trincomalee Cultural Coast', desc: 'Visit Koneswaram Temple, natural harbour viewpoints, and Nilaveli beach relaxation.' },
      { day: 'Day 7', title: 'Beach Leisure Day (Nilaveli / Uppuveli)', desc: 'Full relaxation, snorkeling, and optional dolphin watching.' },
      { day: 'Day 8', title: 'Departure via Colombo', desc: 'Return transfer to airport.' },
    ],
    includes: ['East coast surf experience', 'Pasikudah crystal waters', 'Trincomalee temples', 'Dolphin watching'],
  },
  {
    id: 5,
    image: '/webp/shutterstock_374392756- surfer.webp',
    name: 'NORTH & NORTH-WEST BEACH + KITE SURFING',
    duration: '8 Nights / 9 Days',
    theme: 'Remote Beaches + Kite Surfing + Culture + Untouched Coastlines',
    description: 'Best Season: May – October (North-West Kite Surf Season). Strong winds, ideal for kite surfing & lagoon sports.',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Coastal arrival and rest.' },
      { day: 'Day 2', title: 'Transfer to Kalpitiya', desc: `Drive to Sri Lanka's kite surfing paradise. Lagoon sunset arrival.` },
      { day: 'Day 3', title: 'Kite Surfing Experience', desc: 'Full day kite surfing lessons or advanced sessions in world-class wind conditions.' },
      { day: 'Day 4', title: 'Dolphin Watching & Sandbank Safari', desc: 'Morning dolphin cruise followed by island hopping in isolated sandbanks.' },
      { day: 'Day 5', title: 'Mannar Island Transfer', desc: 'Journey to northern region with unique cultural and geographic landscapes.' },
      { day: 'Day 6', title: 'Mannar Cultural & Coastal Exploration', desc: 'Visit Baobab trees, fishing communities, and quiet desert-like beaches.' },
      { day: 'Day 7', title: 'Jaffna Peninsula Experience', desc: 'Nallur Temple, Jaffna Fort, local Tamil cuisine experience, and Casuarina Beach.' },
      { day: 'Day 8', title: 'Beach Leisure in Keerimalai / Point Pedro', desc: 'Quiet northern beaches, spiritual water springs, and coastal relaxation.' },
      { day: 'Day 9', title: 'Departure', desc: 'Return transfer to Colombo Airport.' },
    ],
    includes: ['Kite surfing experience', 'Dolphin watching', 'Northern cultural tour', 'Jaffna local cuisine'],
  },
]

export default function BeachTours() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/pexels-tomas-malik-793526-1998439.webp"
        heroEyebrow="Sun, Sand & Serenity"
        heroTitle="Beach Tour Packages"
        heroSubtitle="Pristine shores, marine adventures and coastal paradise from the south to the north of Sri Lanka."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,30,65,0.82) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
