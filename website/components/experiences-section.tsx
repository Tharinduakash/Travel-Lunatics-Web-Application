'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronRight, X } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'village',
    title: 'Village Life',
    tagline: 'Live like a local',
    color: '#2d6a4f',
    accent: '#95d5b2',
    description: 'Experience the peaceful charm of rural Sri Lanka and discover traditional village life with local families.',
    activities: [
      'Bullock cart ride through village paths',
      'Canoe or boat ride across a village lake',
      'Walk through paddy fields',
      'Visit a traditional village house',
      'Learn about local farming traditions',
      'Enjoy a traditional village meal',
    ],
    locations: ['Near Sigiriya', 'Near Habarana', 'Near Dambulla'],
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
  },
  {
    id: 'cooking',
    title: 'Sri Lankan Cooking',
    tagline: 'Taste the spice of life',
    color: '#9b2226',
    accent: '#ffb703',
    description: 'Sri Lankan cuisine is famous for its rich spices and flavors. Learn to cook traditional dishes with local chefs.',
    activities: [
      'Visit a local spice market',
      'Learn about Sri Lankan spices',
      'Cook traditional rice and curry',
      'Prepare sambols and local dishes',
      'Enjoy the meal you prepare',
    ],
    locations: ['Kandy', 'Ella', 'Colombo'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  },
  {
    id: 'wildlife',
    title: 'Wildlife Safari',
    tagline: "Asia's finest wild kingdom",
    color: '#594f3a',
    accent: '#e9c46a',
    description: 'Sri Lanka is one of the best wildlife destinations in Asia. See leopards, elephants, and sloth bears in the wild.',
    activities: [
      'Leopard tracking safari',
      'Asian elephant herds',
      'Sloth bear sightings',
      'Crocodile river cruises',
      'Wild buffalo and birds',
    ],
    locations: ['Yala National Park', 'Udawalawe', 'Minneriya'],
    image: '/webp/personal.webp',
  },
  {
    id: 'tea',
    title: 'Tea Plantation',
    tagline: 'Where Ceylon tea is born',
    color: '#1b4332',
    accent: '#b7e4c7',
    description: 'Discover the breathtaking tea plantations of Sri Lanka\'s hill country and learn how world-famous Ceylon tea is made.',
    activities: [
      'Walk through tea plantations',
      'Meet tea pluckers',
      'Visit a tea factory',
      'Learn tea production process',
      'Enjoy guided tea tasting',
    ],
    locations: ['Nuwara Eliya', 'Ella', 'Hatton'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'cultural',
    title: 'Cultural Heritage',
    tagline: '2,500 years of history',
    color: '#7b2d8b',
    accent: '#f4acb7',
    description: 'Explore ancient cities, sacred temples, and historical monuments spanning over two millennia of civilization.',
    activities: [
      'Sigiriya Rock Fortress',
      'Kandy Sacred Temple',
      'Ancient Anuradhapura',
      'Polonnaruwa ruins',
      'Dambulla Cave Temple',
    ],
    locations: ['Sigiriya', 'Kandy', 'Anuradhapura', 'Polonnaruwa'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    id: 'streetfood',
    title: 'Street Food Tour',
    tagline: 'Flavors of the streets',
    color: '#e76f51',
    accent: '#ffd166',
    description: 'Explore Sri Lanka\'s vibrant food culture through bustling local markets and irresistible street food.',
    activities: [
      'Hoppers & egg hoppers',
      'Kottu Roti experience',
      'String hoppers & curries',
      'Fresh tropical fruit stalls',
      'Traditional sweets & desserts',
    ],
    locations: ['Colombo', 'Kandy', 'Galle'],
    image: '/webp/shutterstock_1050911312.webp',
  },
  {
    id: 'train',
    title: 'Scenic Train Journey',
    tagline: 'The world\'s most beautiful rail',
    color: '#264653',
    accent: '#2a9d8f',
    description: 'The hill country train journey is one of the most scenic railway rides in the world — through mountains, tea fields, and waterfalls.',
    activities: [
      'Kandy to Ella route',
      'Nine Arch Bridge views',
      'Tea plantation panoramas',
      'Waterfall sightings',
      'Open door photo stops',
    ],
    locations: ['Kandy', 'Nanuoya', 'Ella'],
    image: '/webp/LSL_B2_Best-way-to-travel-around-sri-lanka-with-kids_1920x700.webp',
  },
]

// ── Reusable card sub-component ─────────────────────────────
interface ExpCardProps {
  exp: typeof EXPERIENCES[0]
  delay: number
  className?: string
  onOpen: (id: string) => void
}

function ExpCard({ exp, delay, className = '', onOpen }: ExpCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`exp-card ${className}`}
      onClick={() => onOpen(exp.id)}
    >
      <img src={exp.image} alt={exp.title} className="exp-card-img" />
      <div className="exp-card-overlay" />
      <div className="exp-card-content">
        <h3 className="exp-heading text-xl font-bold text-white leading-tight">{exp.title}</h3>
        <p className="text-xs text-white/60 mt-1">{exp.tagline}</p>
        <div className="exp-card-peek mt-3">
          <div className="flex items-center gap-1 text-xs font-medium" style={{ color: exp.accent }}>
            Explore <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ExperiencesSection() {
  const [active, setActive] = useState<string | null>(null)
  const activeExp = EXPERIENCES.find(e => e.id === active)

  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0f0d]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .exp-section { font-family: 'DM Sans', sans-serif; }
        .exp-heading { font-family: 'Cormorant Garamond', serif; }

        .exp-card {
          position: relative;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 3/4;
          transition: transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        /* Full-width banner card override */
        .exp-card.\!aspect-\[21\/7\] {
          aspect-ratio: 21/7 !important;
        }
        .exp-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 16px 40px rgba(0,229,200,0.12), 0 8px 24px rgba(0,0,0,0.3);
        }

        .exp-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .exp-card:hover .exp-card-img { transform: scale(1.08); }

        .exp-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          transition: background 0.4s ease;
        }
        .exp-card:hover .exp-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 100%);
        }

        .exp-card-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }

        .exp-card-peek {
          transform: translateY(60px);
          transition: transform 0.4s cubic-bezier(.4,0,.2,1);
        }
        .exp-card:hover .exp-card-peek { transform: translateY(0); }

        .exp-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .exp-modal {
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 24px;
          background: #0f1810;
          border: 1px solid rgba(255,255,255,0.08);
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 640px) {
          .exp-modal { grid-template-columns: 1fr; }
          .exp-modal-img { display: none; }
        }

        .exp-activity-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 14px;
          color: rgba(255,255,255,0.75);
        }

        .exp-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          margin-top: 7px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="exp-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-emerald-400 mb-4">
            What We Offer
          </p>
          <h2 className="exp-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-5">
            Our <em>Experiences</em>
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            The best way to explore Sri Lanka is through experiences that connect you with local culture and nature.
          </p>
        </motion.div>

        {/* Cards grid — Bento layout, zero empty space
             Row 1 (4 cols): [WIDE=2] [normal] [normal]
             Row 2 (4 cols): [normal] [normal] [WIDE=2]
             Row 3 (4 cols): [FULL=4]
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* 0 — wide */}
          <ExpCard exp={EXPERIENCES[0]} delay={0} className="col-span-2" onOpen={setActive} />
          {/* 1, 2 — normal */}
          <ExpCard exp={EXPERIENCES[1]} delay={0.07} className="col-span-1" onOpen={setActive} />
          <ExpCard exp={EXPERIENCES[2]} delay={0.14} className="col-span-1" onOpen={setActive} />

          {/* 3, 4 — normal */}
          <ExpCard exp={EXPERIENCES[3]} delay={0.21} className="col-span-1" onOpen={setActive} />
          <ExpCard exp={EXPERIENCES[4]} delay={0.28} className="col-span-1" onOpen={setActive} />
          {/* 5 — wide */}
          <ExpCard exp={EXPERIENCES[5]} delay={0.35} className="col-span-2" onOpen={setActive} />

          {/* 6 — full width banner */}
          <ExpCard exp={EXPERIENCES[6]} delay={0.42} className="col-span-2 lg:col-span-4 aspect-21/7!" onOpen={setActive} />

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && activeExp && (
          <motion.div
            className="exp-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="exp-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="exp-modal-img relative overflow-hidden rounded-l-3x1">
                <img src={activeExp.image} alt={activeExp.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, ${activeExp.color}99, transparent)`
                }} />
                <div className="absolute bottom-6 left-6">
                  <h3 className="exp-heading text-3xl font-bold text-white">{activeExp.title}</h3>
                  <p className="text-sm mt-1" style={{ color: activeExp.accent }}>{activeExp.tagline}</p>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="sm:hidden">
                    <h3 className="exp-heading text-2xl font-bold text-white">{activeExp.title}</h3>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="ml-auto w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">{activeExp.description}</p>

                {/* Activities */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                    style={{ color: activeExp.accent }}>Activities</p>
                  <div>
                    {activeExp.activities.map((a, i) => (
                      <motion.div
                        key={i}
                        className="exp-activity-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="exp-dot" style={{ background: activeExp.accent }} />
                        {a}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-3"
                    style={{ color: activeExp.accent }}>Best Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.locations.map((loc, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full text-white/80"
                        style={{ background: `${activeExp.color}60`, border: `1px solid ${activeExp.accent}30` }}>
                        <MapPin size={10} style={{ color: activeExp.accent }} />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="mt-auto w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${activeExp.color}, ${activeExp.accent}66)` }}
                  onClick={() => setActive(null)}
                >
                  Book This Experience →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
