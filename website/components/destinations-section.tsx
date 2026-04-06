'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const DESTINATIONS = [
  {
    id: 'colombo',
    name: 'Colombo',
    region: 'Western Province',
    tag: 'Urban',
    tagColor: '#6366f1',
    desc: 'The vibrant capital blending Dutch colonial architecture, modern skyscrapers, and legendary street food.',
    highlights: ['Galle Face Green', 'Pettah Market', 'National Museum', 'Colombo Fort'],
    image: '/webp/pexels-thilina-alagiyawanna-3266092-23234938.jpg',
    size: 'normal',
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    region: 'North Central',
    tag: 'Heritage',
    tagColor: '#f59e0b',
    desc: 'An ancient rock fortress rising 200m from the jungle floor — one of Asia\'s most dramatic archaeological sites.',
    highlights: ['Lion Rock', 'Frescoes', 'Water Gardens', 'Pidurangala'],
    image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg',
    size: 'normal',
  },
  {
    id: 'kandy',
    name: 'Kandy',
    region: 'Central Province',
    tag: 'Cultural',
    tagColor: '#8b5cf6',
    desc: 'The last royal capital of Sri Lanka, home to the sacred Tooth Relic temple and surrounded by mist-covered hills.',
    highlights: ['Temple of Tooth', 'Peradeniya Gardens', 'Kandy Lake', 'Cultural Shows'],
    image: '/webp/IMG_0974.jpg',
    size: 'normal',
  },
  {
    id: 'ella',
    name: 'Ella',
    region: 'Uva Province',
    tag: 'Adventure',
    tagColor: '#10b981',
    desc: 'A cool mountain village with breathtaking viewpoints, epic hikes, and the iconic Nine Arch Bridge.',
    highlights: ['Ella Rock', 'Nine Arch Bridge', 'Little Adams Peak', 'Tea Estates'],
    image: '/webp/pexels-shaani-sewwandi-1401278-2937148.webp',
    size: 'normal',
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    region: 'Central Province',
    tag: 'Hill Country',
    tagColor: '#06b6d4',
    desc: 'Sri Lanka\'s "Little England" at 1,868m — misty tea plantations, cool climate, and colonial-era charm.',
    highlights: ['Tea Factories', 'Horton Plains', 'Gregory Lake', 'Victoria Park'],
    image: '/webp/pexels-isharakasthuriarachchi-6031391.jpg',
    size: 'normal',
  },
  {
    id: 'galle',
    name: 'Galle',
    region: 'Southern Province',
    tag: 'Colonial',
    tagColor: '#f97316',
    desc: 'A UNESCO World Heritage Dutch fort city with cobblestone streets, boutique hotels, and a legendary lighthouse.',
    highlights: ['Galle Fort', 'Dutch Lighthouse', 'Rampart Walks', 'Art Galleries'],
    image: '/webp/pexels-ollivves-1078983.jpg',
    size: 'normal',
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    region: 'Eastern Province',
    tag: 'Beach',
    tagColor: '#0ea5e9',
    desc: 'One of the world\'s finest natural harbors with pristine beaches, whale watching, and ancient Hindu temples.',
    highlights: ['Nilaveli Beach', 'Pigeon Island', 'Koneswaram Temple', 'Whale Watching'],
    image: '/webp/UJEI2767.jpg',
    size: 'large',
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    region: 'Southern Province',
    tag: 'Wildlife',
    tagColor: '#ef4444',
    desc: 'Sri Lanka\'s most iconic safari destination and home to the world\'s highest density of leopards.',
    highlights: ['Leopard Safaris', 'Elephant Herds', 'Sloth Bears', 'Bird Watching'],
    image: '/webp/shutterstock_30691945.webp',
    size: 'large',
  },
]

export function DestinationsSection() {
  const [active, setActive] = useState<string>(DESTINATIONS[0].id)
  const activeD = DESTINATIONS.find(d => d.id === active)!

  return (
    <section className="relative py-24 bg-[#04080a] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dest-section { font-family: 'DM Sans', sans-serif; }
        .dest-heading { font-family: 'Cormorant Garamond', serif; }

        .dest-list-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s ease;
        }
        .dest-list-item:hover {
          background: rgba(255,255,255,0.04);
        }
        .dest-list-item.active {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }

        .dest-pin {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .dest-list-item.active .dest-pin,
        .dest-list-item:hover .dest-pin { transform: scale(1.15); }

        .dest-preview {
          position: sticky;
          top: 100px;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/5;
        }

        .dest-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .dest-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .dest-highlight-pill {
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 50px;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          white-space: nowrap;
        }
      `}</style>

      <div className="dest-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-emerald-400 mb-4">
            Explore the Island
          </p>
          <h2 className="dest-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-5">
            Top <em>Destinations</em>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Sri Lanka offers incredible diversity — from ancient ruins to pristine beaches — all within a small island.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left: destination list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.id}
                className={`dest-list-item ${active === dest.id ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActive(dest.id)}
              >
                {/* Pin */}
                <div className="dest-pin" style={{ background: `${dest.tagColor}22` }}>
                  <MapPin size={14} style={{ color: dest.tagColor }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm transition-colors ${active === dest.id ? 'text-white' : 'text-white/70'}`}>
                      {dest.name}
                    </span>
                    <span className="dest-tag hidden sm:inline-flex"
                      style={{ background: `${dest.tagColor}22`, color: dest.tagColor }}>
                      {dest.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/35 mt-0.5">{dest.region}</p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={14}
                  className="transition-all shrink-0"
                  style={{
                    color: active === dest.id ? dest.tagColor : 'rgba(255,255,255,0.2)',
                    transform: active === dest.id ? 'rotate(0deg)' : 'rotate(45deg)',
                  }}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <Link href="/destinations"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all">
                View all destinations <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Right: preview panel */}
          <div className="lg:col-span-3">
            <div className="dest-preview">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeD.id}
                  src={activeD.image}
                  alt={activeD.name}
                  className="dest-preview-img"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeD.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="dest-tag" style={{ background: `${activeD.tagColor}33`, color: activeD.tagColor }}>
                        <MapPin size={9} /> {activeD.tag}
                      </span>
                      <span className="text-xs text-white/40">{activeD.region}</span>
                    </div>

                    <h3 className="dest-heading text-4xl font-bold text-white mb-2">{activeD.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-sm">{activeD.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {activeD.highlights.map((h, i) => (
                        <span key={i} className="dest-highlight-pill">{h}</span>
                      ))}
                    </div>

                    <Link href={`/destinations`}
                      className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:gap-3"
                      style={{ background: `${activeD.tagColor}33`, border: `1px solid ${activeD.tagColor}55` }}>
                      Explore {activeD.name} <ArrowUpRight size={14} />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}