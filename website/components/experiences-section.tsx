'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, X, ChevronRight, ZoomIn } from 'lucide-react'

export interface Experience {
  id: number
  title: string
  tagline: string
  category: string
  location: string
  image: string
  span: 1 | 2 | 3
  activities: string[]
  color: string
}

export const ALL_EXPERIENCES: Experience[] = [
  // ── Featured 4 from brief ──
  { id: 1,  title: 'Train Ride Through the Hills',       tagline: "World's most scenic rail journey",  category: 'Adventure',  location: 'Ella',                      image: '/webp/pexels-senuscape-728360-1658967.jpg',      span: 2, color: '#1B4332', activities: ['Kandy to Ella route', 'Nine Arch Bridge views', 'Tea plantation panoramas', 'Open door photo stops', 'Waterfall sightings'] },
  { id: 2,  title: 'Leopard Safari Adventure',           tagline: "Asia's finest wild kingdom",        category: 'Wildlife',   location: 'Yala National Park',        image: '/webp/shutterstock_30691945.webp',       span: 3, color: '#594F3A', activities: ['Leopard tracking jeep safari', 'Asian elephant herds', 'Sloth bear sightings', 'Crocodile river cruise', 'Bird watching'] },
  { id: 3,  title: 'Whale Watching',                     tagline: 'Giants of the Indian Ocean',        category: 'Wildlife',   location: 'Mirissa',                   image: '/webp/Whale-04.webp',      span: 1, color: '#023E8A', activities: ['Blue whale sightings', 'Spinner dolphin pods', 'Sunrise boat departures', 'Marine biologist guides', 'Humpback whale spotting'] },
  { id: 4,  title: 'Temple & Cultural Walks',            tagline: '2,500 years of living heritage',    category: 'Culture',    location: 'Kandy',                     image: '/webp/IMG_0974.jpg',     span: 2, color: '#7B2D8B', activities: ['Sacred Tooth Relic Temple', 'Kandyan cultural show', 'Peradeniya Botanical Gardens', 'Evening lake walk', 'Local market tour'] },
  // ── Additional 10 ──
  { id: 5,  title: 'Sigiriya Rock Fortress',             tagline: 'Lion Rock at dawn',                 category: 'Heritage',   location: 'Sigiriya',                  image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg',   span: 2, color: '#9B2226', activities: ['Summit climb at sunrise', 'Ancient fresco gallery', 'Water gardens tour', 'Pidurangala viewpoint', 'Local guide stories'] },
  { id: 6,  title: 'Village Life Experience',            tagline: 'Live like a local',                 category: 'Culture',    location: 'Habarana',                  image: '/webp/cook.webp',    span: 1, color: '#2D6A4F', activities: ['Bullock cart ride', 'Paddy field walk', 'Traditional cooking class', 'Village lake canoe ride', 'Local family homestay'] },
  { id: 7,  title: 'Sea Turtle Conservation',            tagline: 'Protect the ancient mariners',      category: 'Wildlife',   location: 'Kosgoda',                   image: '/webp/LK58240100-01-E-1280-720.webp',     span: 1, color: '#0077B6', activities: ['Hatchery visit', 'Turtle release ceremony', 'Night nesting watch', 'Conservation briefing', 'Beach walk'] },
  { id: 8,  title: 'Sri Lankan Cooking Class',           tagline: 'Taste the spice of life',           category: 'Culture',    location: 'Kandy',                     image: '/webp/shutterstock_1050911312.webp',    span: 2, color: '#E76F51', activities: ['Spice market visit', 'Rice and curry cooking', 'Sambol preparation', 'Traditional desserts', 'Sit-down family meal'] },
  { id: 9,  title: 'White Water Rafting',                tagline: 'Ride the Kelani rapids',            category: 'Adventure',  location: 'Kitulgala',                 image: '/webp/feature5.webp',    span: 1, color: '#0096C7', activities: ['Grade 3 & 4 rapids', 'Safety briefing', 'Team rafting', 'Riverside picnic', 'Swimming in calm pools'] },
  { id: 10, title: 'Sunrise at Adam\'s Peak',            tagline: 'Sacred mountain pilgrimage',        category: 'Heritage',   location: 'Sri Pada',                  image: '/webp/Adam_s Peak.webp',  span: 2, color: '#5A189A', activities: ['Night trek by lantern', 'Multi-faith pilgrimage trail', 'Summit sunrise watch', 'Bell ringing at peak', 'Descent through tea estates'] },
  { id: 11, title: 'Galle Fort Heritage Walk',           tagline: 'UNESCO World Heritage streets',     category: 'Heritage',   location: 'Galle',                     image: '/webp/photo-1507296993015-167a20c29988.webp',      span: 1, color: '#C77DFF', activities: ['Dutch rampart walk', 'Lighthouse visit', 'Colonial architecture tour', 'Boutique & gallery trail', 'Sunset from the fort walls'] },
  { id: 12, title: 'Elephant Gathering',                 tagline: 'The world\'s largest gathering',    category: 'Wildlife',   location: 'Minneriya',                 image: '/webp/udawalawe.webp',   span: 3, color: '#6D6875', activities: ['400+ elephants gathering', 'Jeep safari', 'Evening golden hour viewing', 'Photography session', 'Baby elephant sightings'] },
  { id: 13, title: 'Deep Sea Fishing',                   tagline: 'Cast into the Indian Ocean',        category: 'Adventure',  location: 'Trincomalee',               image: '/webp/UJEI2767.jpg',    span: 1, color: '#005F73', activities: ['Half-day boat charter', 'Tuna & barracuda fishing', 'Traditional fishing methods', 'Catch & cook experience', 'Sunset return cruise'] },
  { id: 14, title: 'Colombo Food Tour',                  tagline: 'Flavors of the capital',            category: 'Culture',    location: 'Colombo',                   image: '/webp/01.webp',       span: 2, color: '#AE2012', activities: ['Pettah market visit', 'Hoppers & egg hoppers', 'Kottu roti tasting', 'Tropical fruit stalls', 'Street desserts & sweets'] },
]

const CATEGORIES = ['All', 'Adventure', 'Wildlife', 'Culture', 'Heritage']

const HEIGHTS: Record<number, string> = { 1: '200px', 2: '310px', 3: '430px' }

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Adventure: { bg: '#FEE2E2', text: '#B91C1C' },
  Wildlife:  { bg: '#FEF9C3', text: '#713F12' },
  Culture:   { bg: '#FED7AA', text: '#C2410C' },
  Heritage:  { bg: '#EDE9FE', text: '#6D28D9' },
}

// ── Card ────────────────────────────────────────────────────────────────────
function ExpCard({ exp, index, onOpen }: { exp: Experience; index: number; onOpen: (e: Experience) => void }) {
  const cat = CAT_COLORS[exp.category] ?? { bg: '#FED7AA', text: '#C2410C' }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      onClick={() => onOpen(exp)}
      className="group cursor-pointer"
      style={{ breakInside: 'avoid', marginBottom: '10px', display: 'inline-block', width: '100%' }}
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
        />

        {/* Gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

        {/* Warm hover tint */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.18) 0%, transparent 50%)' }} />

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, #F97316, #FCD34D)' }} />

        {/* Category badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ background: cat.bg, color: cat.text }}>
            {exp.category}
          </span>
        </div>

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100"
          style={{ background: 'rgba(255,255,255,0.90)' }}>
          <ZoomIn className="w-3 h-3 text-gray-700" />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-2.5 h-2.5 text-orange-300" />
            <span className="text-orange-300 text-[9px] font-mono tracking-widest uppercase">{exp.location}</span>
          </div>
          <h3 className="text-white font-black text-[11px] leading-tight line-clamp-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {exp.title}
          </h3>
          <p className="text-white/0 group-hover:text-white/50 text-[9px] mt-0.5 transition-colors duration-300 line-clamp-1">
            {exp.tagline}
          </p>
        </div>

        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(249,115,22,0.40)' }} />
      </div>
    </motion.div>
  )
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function ExpModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const cat = CAT_COLORS[exp.category] ?? { bg: '#FED7AA', text: '#C2410C' }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Image side */}
          <div className="relative h-64 md:h-full overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${exp.color}99, transparent)` }} />
            <div className="absolute bottom-5 left-5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block"
                style={{ background: cat.bg, color: cat.text }}>
                {exp.category}
              </span>
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

          {/* Content side */}
          <div className="p-7 flex flex-col gap-5 overflow-y-auto">
            <div className="flex items-start justify-between">
              <p className="text-gray-500 text-sm italic">{exp.tagline}</p>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.06)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Activities */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#F97316' }}>
                What You'll Do
              </p>
              <div className="flex flex-col gap-2">
                {exp.activities.map((a, i) => (
                  <motion.div key={i} className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#F97316' }} />
                    <span className="text-sm text-gray-600 leading-relaxed">{a}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <Link href="/experiences"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}>
                Book This Experience <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Section ─────────────────────────────────────────────────────────────
export function ExperiencesSection() {
  const [selected, setSelected] = useState('All')
  const [active, setActive] = useState<Experience | null>(null)

  const filtered = selected === 'All'
    ? ALL_EXPERIENCES.slice(0, 10)
    : ALL_EXPERIENCES.filter(e => e.category === selected).slice(0, 10)

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFF7ED, #FAFAF8)' }}>

      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-orange-400" />
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">✦ What We Offer</p>
            <span className="h-px w-8 bg-orange-400" />
          </div>
          <h2 className="font-bold text-gray-900 leading-tight mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Unmissable{' '}
            <span style={{ background: 'linear-gradient(90deg, #F97316, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Experiences
            </span>{' '}in Sri Lanka
          </h2>
          <div className="h-[3px] w-14 mx-auto rounded-full mb-4"
            style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            The best way to explore Sri Lanka is through experiences that connect you with local culture, wildlife, and nature.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelected(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200"
              style={selected === cat ? {
                background: 'linear-gradient(135deg, #F97316, #EA580C)',
                color: 'white',
                border: '1px solid #F97316',
                boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
              } : {
                background: 'white',
                color: '#6b7280',
                border: '1px solid rgba(0,0,0,0.09)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* 5-column masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="exp-masonry"
            style={{ columnGap: '10px' }}
          >
            {filtered.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} index={i} onOpen={setActive} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mt-10"
        >
          <Link href="/experiences"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest text-white transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 4px 18px rgba(249,115,22,0.35)' }}>
            View All Experiences
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && <ExpModal exp={active} onClose={() => setActive(null)} />}
      </AnimatePresence>

      <style>{`
        .exp-masonry { columns: 2; }
        @media (min-width: 640px)  { .exp-masonry { columns: 3; } }
        @media (min-width: 1024px) { .exp-masonry { columns: 4; } }
        @media (min-width: 1280px) { .exp-masonry { columns: 5; } }
      `}</style>
    </section>
  )
}