import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TourPageLayout, type TourPackage } from '@/components/tour-page-layout'

const allInclude = [
  'Airport pickup & drop-off',
  'Professional English-speaking chauffeur guide',
  'Private air-conditioned vehicle',
  'Air-conditioned classy hotel stays',
  'Half Board Basis (Breakfast & Dinner Included)',
]

const packages: TourPackage[] = [
  {
    id: 1,
    image: '/webp/wilpattu-sunset-1-scaled.webp',
    name: 'INTO THE WILD EXPRESS',
    duration: '6 Nights / 7 Days',
    theme: 'Best Wildlife Highlights in One Week',
    perfectFor: 'Travelers wanting the best wildlife highlights in one week',
    days: [
      { day: 'Day 1', title: 'Arrival / Negombo', desc: 'Meet & greet at airport. Transfer to hotel. Relax by beach.' },
      { day: 'Day 2', title: 'Wilpattu National Park', desc: 'Early departure for full-day safari. Search for leopards, sloth bears, deer, crocodiles, peacocks.' },
      { day: 'Day 3', title: 'Sigiriya / Cultural Zone', desc: 'Travel inland. Village scenery and optional Sigiriya Rock visit.' },
      { day: 'Day 4', title: 'Minneriya National Park', desc: 'Evening safari for the famous elephant gathering (seasonal).' },
      { day: 'Day 5', title: 'Udawalawe National Park', desc: 'Morning safari with excellent elephant sightings.' },
      { day: 'Day 6', title: 'Mirissa', desc: 'Whale watching boat trip. Blue whales, dolphins, turtles possible.' },
      { day: 'Day 7', title: 'Departure', desc: 'Transfer to airport.' },
    ],
    includes: ['3 Safaris', 'Whale watching', 'AC Hotels / Half Board'],
  },
  {
    id: 2,
    image: '/webp/shutterstock_1522275089 - Leopard.webp',
    name: 'INTO THE WILD ULTIMATE SAFARI',
    duration: '12 Nights / 13 Days',
    theme: 'Maximum Safari Action',
    perfectFor: 'Wildlife enthusiasts wanting maximum safari action',
    days: [
      { day: 'Day 1', title: 'Arrival Negombo', desc: 'Rest after flight.' },
      { day: 'Day 2', title: 'Wilpattu Safari', desc: 'Leopards & bears.' },
      { day: 'Day 3', title: 'Wilpattu Morning / Transfer Sigiriya', desc: 'Morning wildlife viewing then scenic drive to Sigiriya.' },
      { day: 'Day 4', title: 'Minneriya Safari', desc: 'Large elephant herds.' },
      { day: 'Day 5', title: 'Polonnaruwa / Nature Drive', desc: 'Explore ancient city and surrounding nature.' },
      { day: 'Day 6', title: 'Kandy Highlands', desc: 'Forest birding.' },
      { day: 'Day 7', title: 'Nuwara Eliya / Horton Plains', desc: 'Highland scenery and nature walks.' },
      { day: 'Day 8', title: 'Transfer Yala', desc: 'Scenic drive to Yala National Park.' },
      { day: 'Day 9', title: 'Full Day Yala Safari', desc: 'Best chance for leopards.' },
      { day: 'Day 10', title: 'Bundala National Park', desc: 'Bird paradise, flamingos, crocodiles.' },
      { day: 'Day 11', title: 'Udawalawe Safari', desc: 'Large elephant herds in open grasslands.' },
      { day: 'Day 12', title: 'Mirissa Whale Watching', desc: 'Blue whale and dolphin cruise.' },
      { day: 'Day 13', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['6 Wildlife experiences', 'Multiple national parks', 'Whales + Leopards + Elephants'],
  },
  {
    id: 3,
    image: '/webp/udawalawe1.webp',
    name: 'INTO THE WILD BIRDING SPECIALIST',
    duration: '8 Nights / 9 Days',
    theme: 'Birdwatching, Photography & Nature',
    perfectFor: 'Birdwatchers, photographers, nature lovers',
    days: [
      { day: 'Day 1', title: 'Negombo Wetlands', desc: 'Water birds, kingfishers.' },
      { day: 'Day 2', title: 'Anawilundawa Sanctuary', desc: 'Migratory species.' },
      { day: 'Day 3', title: 'Kandy Forest Reserves', desc: 'Endemic birding walk.' },
      { day: 'Day 4', title: 'Nuwara Eliya', desc: 'Highland species.' },
      { day: 'Day 5', title: 'Horton Plains', desc: 'Whistling thrush, raptors.' },
      { day: 'Day 6', title: 'Transfer Sinharaja', desc: 'Journey to the rainforest.' },
      { day: 'Day 7', title: 'Sinharaja Rainforest', desc: 'Blue Magpie, Red-faced Malkoha.' },
      { day: 'Day 8', title: 'Bundala Wetlands', desc: 'Flamingos & shore birds.' },
      { day: 'Day 9', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Guided birding routes', 'Nature walks', 'Photography opportunities'],
  },
  {
    id: 4,
    image: '/webp/Whale-04.webp',
    name: 'INTO THE WILD BIG FIVE OF SRI LANKA',
    duration: '9 Nights / 10 Days',
    theme: 'Leopard • Elephant • Sloth Bear • Blue Whale • Crocodile',
    days: [
      { day: 'Day 1', title: 'Arrival', desc: 'Airport welcome and hotel transfer.' },
      { day: 'Day 2', title: 'Wilpattu Safari', desc: 'Leopard + sloth bear chance.' },
      { day: 'Day 3', title: 'Sigiriya', desc: 'Cultural zone exploration.' },
      { day: 'Day 4', title: 'Minneriya Safari', desc: 'Elephants.' },
      { day: 'Day 5', title: 'Transfer Yala', desc: 'Scenic drive to Yala National Park.' },
      { day: 'Day 6', title: 'Full Day Yala', desc: 'Leopard hotspot + crocodiles.' },
      { day: 'Day 7', title: 'Udawalawe', desc: 'Huge elephant herds.' },
      { day: 'Day 8', title: 'Mirissa', desc: 'Coastal arrival and relaxation.' },
      { day: 'Day 9', title: 'Whale Watching', desc: 'Blue whale cruise from Mirissa.' },
      { day: 'Day 10', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Big Five themed journey', 'Jeep safaris + whale cruise'],
  },
  {
    id: 5,
    image: '/webp/shutterstock_495542851.webp',
    name: 'INTO THE WILD LUXURY SAFARI ESCAPE',
    duration: '7 Nights / 8 Days',
    theme: 'Premium Private Wildlife Experiences',
    perfectFor: 'Honeymooners & luxury travelers',
    badge: 'Luxury',
    days: [
      { day: 'Day 1', title: 'Arrival VIP Welcome', desc: 'Premium airport welcome and private transfer.' },
      { day: 'Day 2', title: 'Boutique Beach Stay', desc: 'Luxury coastal resort relaxation.' },
      { day: 'Day 3', title: 'Luxury Yala Lodge', desc: 'Check into exclusive safari lodge.' },
      { day: 'Day 4', title: 'Private Yala Safari', desc: 'Exclusive jeep experience.' },
      { day: 'Day 5', title: 'Spa / Relaxation', desc: 'Full day wellness and relaxation.' },
      { day: 'Day 6', title: 'Udawalawe Safari', desc: 'Private elephant safari.' },
      { day: 'Day 7', title: 'Mirissa Luxury Resort', desc: 'Private whale cruise option.' },
      { day: 'Day 8', title: 'Departure', desc: 'Airport transfer.' },
    ],
    includes: ['Premium resorts', 'Fine dining', 'Private wildlife experiences', 'Honeymoon friendly'],
  },
]

export default function WildlifeTours() {
  return (
    <>
      <Navbar />
      <TourPageLayout
        heroImage="/webp/shutterstock_495542851.webp"
        heroEyebrow="Into the Wild"
        heroTitle="Wildlife Tour Packages"
        heroSubtitle="Leopards, elephants, blue whales and more — experience Sri Lanka's untamed wildlife with expert guides."
        heroGradient="linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(4,20,10,0.82) 100%)"
        allInclude={allInclude}
        packages={packages}
      />
      <Footer />
    </>
  )
}
