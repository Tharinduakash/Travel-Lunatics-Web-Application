'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { MapPin, X, ChevronRight, Search, ZoomIn } from 'lucide-react'

// ── Full 20-item dataset ─────────────────────────────────────────────────────
const ALL_EXPERIENCES = [
  { id: 1,  title: 'Train Ride Through the Hills',       tagline: "World's most scenic railway",        category: 'Adventure',  location: 'Ella',                image: '/images/exp-train.jpg',       span: 2, color: '#1B4332', activities: ['Kandy to Ella route', 'Nine Arch Bridge views', 'Tea plantation panoramas', 'Open door photo stops', 'Waterfall sightings'] },
  { id: 2,  title: 'Leopard Safari Adventure',           tagline: "Asia's finest wild kingdom",          category: 'Wildlife',   location: 'Yala National Park',  image: '/images/exp-yala.jpg',        span: 3, color: '#594F3A', activities: ['Leopard tracking jeep safari', 'Asian elephant herds', 'Sloth bear sightings', 'Crocodile river cruise', 'Bird watching'] },
  { id: 3,  title: 'Whale Watching',                     tagline: 'Giants of the Indian Ocean',          category: 'Wildlife',   location: 'Mirissa',             image: '/images/exp-whale.jpg',       span: 1, color: '#023E8A', activities: ['Blue whale sightings', 'Spinner dolphin pods', 'Sunrise boat departures', 'Marine biologist guides', 'Humpback whale spotting'] },
  { id: 4,  title: 'Temple & Cultural Walks',            tagline: '2,500 years of living heritage',      category: 'Culture',    location: 'Kandy',               image: '/images/exp-temple.jpg',      span: 2, color: '#7B2D8B', activities: ['Sacred Tooth Relic Temple', 'Kandyan cultural show', 'Peradeniya Botanical Gardens', 'Evening lake walk', 'Local market tour'] },
  { id: 5,  title: 'Sigiriya Rock Fortress Climb',       tagline: 'Lion Rock at dawn',                   category: 'Heritage',   location: 'Sigiriya',            image: '/images/exp-sigiriya.jpg',    span: 2, color: '#9B2226', activities: ['Summit climb at sunrise', 'Ancient fresco gallery', 'Water gardens tour', 'Pidurangala viewpoint', 'Local guide stories'] },
  { id: 6,  title: 'Village Life Experience',            tagline: 'Live like a local',                   category: 'Culture',    location: 'Habarana',            image: '/images/exp-village.jpg',     span: 1, color: '#2D6A4F', activities: ['Bullock cart ride', 'Paddy field walk', 'Traditional cooking class', 'Village lake canoe ride', 'Local family homestay'] },
  { id: 7,  title: 'Sea Turtle Conservation',            tagline: 'Protect the ancient mariners',        category: 'Wildlife',   location: 'Kosgoda',             image: '/images/exp-turtle.jpg',      span: 1, color: '#0077B6', activities: ['Hatchery visit', 'Turtle release ceremony', 'Night nesting watch', 'Conservation briefing', 'Beach walk'] },
  { id: 8,  title: 'Sri Lankan Cooking Class',           tagline: 'Taste the spice of life',             category: 'Culture',    location: 'Kandy',               image: '/images/exp-cooking.jpg',     span: 2, color: '#E76F51', activities: ['Spice market visit', 'Rice and curry cooking', 'Sambol preparation', 'Traditional desserts', 'Sit-down family meal'] },
  { id: 9,  title: 'White Water Rafting',                tagline: 'Ride the Kelani rapids',              category: 'Adventure',  location: 'Kitulgala',           image: '/images/exp-rafting.jpg',     span: 1, color: '#0096C7', activities: ['Grade 3 & 4 rapids', 'Safety briefing', 'Team rafting', 'Riverside picnic', 'Swimming in calm pools'] },
  { id: 10, title: "Sunrise at Adam's Peak",             tagline: 'Sacred mountain pilgrimage',          category: 'Heritage',   location: 'Sri Pada',            image: '/images/exp-adamspeak.jpg',   span: 2, color: '#5A189A', activities: ['Night trek by lantern', 'Multi-faith pilgrimage trail', 'Summit sunrise watch', 'Bell ringing at peak', 'Descent through tea estates'] },
  { id: 11, title: 'Galle Fort Heritage Walk',           tagline: 'UNESCO World Heritage streets',       category: 'Heritage',   location: 'Galle',               image: '/images/exp-galle.jpg',       span: 1, color: '#C77DFF', activities: ['Dutch rampart walk', 'Lighthouse visit', 'Colonial architecture tour', 'Boutique & gallery trail', 'Sunset from the fort walls'] },
  { id: 12, title: 'Elephant Gathering Safari',          tagline: "World's largest elephant gathering",  category: 'Wildlife',   location: 'Minneriya',           image: '/images/exp-elephant.jpg',    span: 3, color: '#6D6875', activities: ['400+ elephants gathering', 'Jeep safari', 'Golden hour viewing', 'Photography session', 'Baby elephant sightings'] },
  { id: 13, title: 'Deep Sea Fishing',                   tagline: 'Cast into the Indian Ocean',          category: 'Adventure',  location: 'Trincomalee',         image: '/images/exp-fishing.jpg',     span: 1, color: '#005F73', activities: ['Half-day boat charter', 'Tuna & barracuda fishing', 'Traditional fishing methods', 'Catch & cook experience', 'Sunset return cruise'] },
  { id: 14, title: 'Colombo Street Food Tour',           tagline: 'Flavors of the capital',              category: 'Culture',    location: 'Colombo',             image: '/images/exp-food.jpg',        span: 2, color: '#AE2012', activities: ['Pettah market visit', 'Hoppers & egg hoppers', 'Kottu roti tasting', 'Tropical fruit stalls', 'Street desserts & sweets'] },
  { id: 15, title: 'Snorkeling at Pigeon Island',        tagline: 'Sri Lanka\'s finest reef',            category: 'Adventure',  location: 'Trincomalee',         image: '/images/exp-snorkel.jpg',     span: 1, color: '#0E9594', activities: ['Coral reef snorkeling', 'Blacktip reef sharks', 'Colourful tropical fish', 'Glass-bottom boat ride', 'Beach picnic'] },
  { id: 16, title: 'Polonnaruwa Ancient City',           tagline: 'Cycling through a lost kingdom',      category: 'Heritage',   location: 'Polonnaruwa',         image: '/images/exp-polonnaruwa.jpg', span: 2, color: '#B5838D', activities: ['Bicycle tour of ruins', 'Gal Vihara rock temple', 'Parakrama Samudra lake', 'Royal palace complex', 'Archaeological museum'] },
  { id: 17, title: 'Tea Plantation Walk',                tagline: 'Where Ceylon tea is born',            category: 'Culture',    location: 'Nuwara Eliya',        image: '/images/exp-tea.jpg',         span: 2, color: '#1B4332', activities: ['Walk through tea rows', 'Meet tea pluckers', 'Tea factory tour', 'Production process demo', 'Guided tea tasting'] },
  { id: 18, title: 'Kayaking in Bentota',                tagline: 'Paddle through mangrove rivers',      category: 'Adventure',  location: 'Bentota',             image: '/images/exp-kayak.jpg',       span: 1, color: '#2EC4B6', activities: ['Mangrove forest kayak', 'Crocodile spotting', 'Bird watching', 'River estuary paddle', 'Sunset lagoon cruise'] },
  { id: 19, title: 'Dambulla Cave Temple',               tagline: '2,000 years of sacred art',           category: 'Heritage',   location: 'Dambulla',            image: '/images/exp-dambulla.jpg',    span: 1, color: '#6A040F', activities: ['Five cave temples', '157 Buddha statues', 'Ancient mural paintings', 'Rock fortress views', 'Sunrise meditation walk'] },
  { id: 20, title: 'Hot Air Balloon Ride',               tagline: 'Sri Lanka from the sky',              category: 'Adventure',  location: 'Dambulla',            image: '/images/exp-balloon.jpg',     span: 3, color: '#E9C46A', activities: ['Sunrise launch', 'Cultural triangle aerial views', 'Sigiriya from the air', 'Champagne landing toast', 'Certificate of flight'] },
]

const CATEGORIES = ['All', 'Adventure', 'Wildlife', 'Culture', 'Heritage']
const PAGE_SIZE = 18

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Adventure: { bg: '#FEE2E2', text: '#B91C1C' },
  Wildlife:  { bg: '#FEF9C3', text: '#713F12' },
  Culture:   { bg: '#FED7AA', text: '#C2410C' },
  Heritage:  { bg: '#EDE9FE', text: '#6D28D9' },
}

const HEIGHTS: Record<number, string> = { 1: '200px', 2: '310px', 3: '430px' }

// ── Card ─────────────────────────────────────────────────────────────────────
function ExpCard({ exp, index, onOpen }: { exp: typeof ALL_EXPERIENCES[0]; index: number; onOpen: (e: typeof ALL_EXPERIENCES[0]) => void }) {
  const cat = CAT_COLORS[exp.category] ?? { bg: '#FED7AA', text: '#C2410C' }

  return (
    <div
      className="group cursor-pointer"
      style={{
        breakInside: 'avoid',
        marginBottom: '10px',
        display: 'inline-block',
        width: '100%',
        animationDelay: `${(index % PAGE_SIZE) * 35}ms`,
        animation: 'fadeUp 0.4s ease both',
      }}
      onClick={() => onOpen(exp)}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-stone-200 group-hover:border-orange-300 transition-all duration-300"
        style={{ height: HEIGHTS[exp.span] }}
      >
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.18) 0%, transparent 50%)' }} />

        <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, #F97316, #FCD34D)' }} />

        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ background: cat.bg, color: cat.text }}>{exp.category}</span>
        </div>

        <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100"
          style={{ background: 'rgba(255,255,255,0.90)' }}>
          <ZoomIn className="w-3 h-3 text-gray-700" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-2.5 h-2.5 text-orange-300" />
            <span className="text-orange-300 text-[9px] font-mono tracking-widest uppercase">{exp.location}</span>
          </div>
          <h3 className="text-white font-black text-[11px] leading-tight line-clamp-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{exp.title}</h3>
          <p className="text-white/0 group-hover:text-white/50 text-[9px] mt-0.5 transition-colors duration-300 line-clamp-1">
            {exp.tagline}
          </p>
        </div>

        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(249,115,22,0.40)' }} />
      </div>
    </div>
  )
}

// ── Pill ─────────────────────────────────────────────────────────────────────
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200"
      style={active ? {
        background: 'linear-gradient(135deg, #F97316, #EA580C)',
        color: 'white', border: '1px solid #F97316',
        boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
      } : {
        background: 'white', color: '#6b7280',
        border: '1px solid rgba(0,0,0,0.09)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
      {label}
    </button>
  )
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function ExpModal({ exp, onClose }: { exp: typeof ALL_EXPERIENCES[0]; onClose: () => void }) {
  const cat = CAT_COLORS[exp.category] ?? { bg: '#FED7AA', text: '#C2410C' }
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.22)' }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="relative h-64 md:h-full overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${exp.color}aa, transparent)` }} />
            <div className="absolute bottom-5 left-5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block"
                style={{ background: cat.bg, color: cat.text }}>{exp.category}</span>
              <h3 className="text-white font-bold text-xl leading-tight mt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                {exp.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-orange-300" />
                <span className="text-orange-300 text-[10px] font-mono">{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="p-7 flex flex-col gap-5 overflow-y-auto">
            <div className="flex items-start justify-between">
              <p className="text-gray-500 text-sm italic">{exp.tagline}</p>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0 ml-3"
                style={{ background: 'rgba(0,0,0,0.06)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#F97316' }}>
                What You'll Do
              </p>
              <div className="flex flex-col gap-2">
                {exp.activities.map((a, i) => (
                  <motion.div key={i} className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#F97316' }} />
                    <span className="text-sm text-gray-600 leading-relaxed">{a}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}
                onClick={onClose}
              >
                Enquire About This Experience <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ExperiencesPage() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [active, setActive] = useState<typeof ALL_EXPERIENCES[0] | null>(null)

  const filtered = useMemo(() =>
    ALL_EXPERIENCES.filter(e => {
      const cOk = cat === 'All' || e.category === cat
      const sOk = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
      return cOk && sOk
    }),
  [cat, search])

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length
  const reset = () => { setCat('All'); setSearch(''); setPage(1) }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .exp-page-masonry { columns: 2; column-gap: 10px; }
        @media (min-width: 640px)  { .exp-page-masonry { columns: 3; } }
        @media (min-width: 1024px) { .exp-page-masonry { columns: 4; } }
        @media (min-width: 1280px) { .exp-page-masonry { columns: 5; } }
        div::-webkit-scrollbar { display: none }
      `}</style>

      <div className="min-h-screen" style={{ background: '#FAFAF8' }}>
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative pt-28 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden"
          style={{ background: 'linear-gradient(to bottom, #FFF7ED, #FAFAF8)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(249,115,22,0.09) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm mb-10 group transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-orange-400" />
                  <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">✦ What We Offer</p>
                </div>
                <h1 className="font-bold leading-tight text-gray-900 mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
                  Unmissable{' '}
                  <span style={{ background: 'linear-gradient(90deg, #F97316, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Experiences
                  </span>
                  <br />in Sri Lanka
                </h1>
                <div className="h-[3px] w-14 rounded-full mb-3"
                  style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />
                <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                  The best way to explore Sri Lanka is through experiences that connect you deeply with its culture, wildlife, and landscapes.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 lg:gap-12 shrink-0">
                {[{ n: '20+', l: 'Experiences' }, { n: '9', l: 'Regions' }, { n: '4', l: 'Categories' }].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-black leading-none"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', background: 'linear-gradient(90deg, #F97316, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {n}
                    </p>
                    <p className="text-stone-500 text-[9px] tracking-widest uppercase mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sticky filters ── */}
        <div className="sticky top-0 z-30 py-3 px-4 sm:px-6 lg:px-8"
          style={{ background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-shrink-0 sm:w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input type="text" placeholder="Search experiences…" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="w-full rounded-full pl-9 pr-4 py-2 text-xs text-gray-700 placeholder-stone-400 focus:outline-none transition-colors bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }} />
            </div>
            <div className="flex gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map(c => <Pill key={c} label={c} active={cat === c} onClick={() => { setCat(c); setPage(1) }} />)}
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 flex items-center justify-between">
          <p className="text-stone-500 text-[9px] font-mono tracking-widest">
            SHOWING {Math.min(paginated.length, filtered.length)} OF {filtered.length} EXPERIENCES
          </p>
          {(cat !== 'All' || search) && (
            <button onClick={reset} className="text-orange-500/70 hover:text-orange-500 text-[9px] font-mono tracking-widest transition-colors">
              CLEAR ×
            </button>
          )}
        </div>

        {/* ── Masonry ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {filtered.length === 0 ? (
            <div className="py-28 text-center">
              <p className="text-3xl mb-3">🌴</p>
              <p className="text-gray-500">No experiences found.</p>
              <button onClick={reset} className="mt-3 text-orange-500 text-sm underline underline-offset-4">Clear filters</button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${cat}-${search}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="exp-page-masonry"
                >
                  {paginated.map((exp, i) => (
                    <ExpCard key={exp.id} exp={exp} index={i} onOpen={setActive} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {hasMore && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-stone-500 text-[9px] font-mono tracking-widest">
                    {filtered.length - paginated.length} MORE EXPERIENCES
                  </p>
                  <button onClick={() => setPage(p => p + 1)}
                    className="group px-10 py-3 font-black tracking-widest uppercase text-xs rounded-full transition-all duration-300"
                    style={{ border: '1px solid rgba(249,115,22,0.35)', color: '#F97316' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F97316'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#F97316' }}>
                    Load More <span className="group-hover:rotate-90 inline-block transition-transform duration-300">+</span>
                  </button>
                </div>
              )}

              {!hasMore && filtered.length > 0 && (
                <p className="text-center text-stone-400 text-[9px] font-mono tracking-[0.3em] mt-10">
                  ✦ ALL {filtered.length} EXPERIENCES LOADED ✦
                </p>
              )}
            </>
          )}
        </div>

        <Footer />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && <ExpModal exp={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}