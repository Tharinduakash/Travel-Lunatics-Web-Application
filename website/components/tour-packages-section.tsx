'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PACKAGES = [
  {
    id: 1,
    days: 5,
    title: 'Sri Lanka Highlights',
    subtitle: 'Perfect first taste',
    badge: 'Most Popular',
    badgeColor: '#00e5c8',
    price: 'From $480',
    rating: 4.9,
    reviews: 187,
    groupSize: '2–12',
    gradient: 'from-[#0a3d2e] to-[#0d2b1e]',
    accentColor: '#00e5c8',
    highlights: ['Sigiriya Rock Fortress', 'Kandy Temple', 'Ella Train Ride', 'Mirissa Beach', 'Galle Fort'],
    description: 'The essential Sri Lanka circuit — ancient rock fortresses, misty hill country, and golden beaches in just 5 days.',
    image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg',
  },
  {
    id: 2,
    days: 7,
    title: 'Cultural Discovery',
    subtitle: 'Deep history & heritage',
    badge: 'Best Value',
    badgeColor: '#ffb703',
    price: 'From $650',
    rating: 4.8,
    reviews: 214,
    groupSize: '2–10',
    gradient: 'from-[#3d2a00] to-[#2a1d00]',
    accentColor: '#ffb703',
    highlights: ['Ancient Triangle', 'Dambulla Caves', 'Polonnaruwa', 'Peradeniya Gardens', 'Cooking Class', 'Village Life'],
    description: 'Immerse yourself in 2,500 years of history — ancient cities, cave temples, and authentic village experiences.',
    image: '/webp/dambulla2.webp',
  },
  {
    id: 3,
    days: 10,
    title: 'Classic Sri Lanka',
    subtitle: 'The complete island story',
    badge: 'Bestseller',
    badgeColor: '#ff7a45',
    price: 'From $920',
    rating: 4.9,
    reviews: 341,
    groupSize: '2–8',
    gradient: 'from-[#3d0a0a] to-[#2a0808]',
    accentColor: '#ff7a45',
    highlights: ['Cultural Triangle', 'Hill Country Train', 'Tea Plantations', 'Yala Safari', 'South Coast Beaches', 'Whale Watching'],
    description: 'Culture, wildlife, hill country, and beaches — the definitive 10-day journey through Sri Lanka\'s greatest hits.',
    image: '/webp/mirissa-beach.webp',
  },
  {
    id: 4,
    days: 14,
    title: 'Grand Sri Lanka',
    subtitle: 'North to south immersion',
    badge: 'Premium',
    badgeColor: '#a78bfa',
    price: 'From $1,280',
    rating: 5.0,
    reviews: 98,
    groupSize: '2–6',
    gradient: 'from-[#1a0a3d] to-[#110828]',
    accentColor: '#a78bfa',
    highlights: ['Jaffna & North', 'Full Cultural Triangle', 'Knuckles Trekking', 'Wildlife Safaris', 'East Coast Beaches', 'Cooking & Village'],
    description: 'From the ancient north to the tropical south — a 14-day odyssey covering every corner of the island.',
    image: '/webp/pexels-arul-karki-2155927995-34037253.jpg',
  },
  {
    id: 5,
    days: 18,
    title: 'Ultimate Experience',
    subtitle: 'Sri Lanka without limits',
    badge: 'Luxury',
    badgeColor: '#f4d03f',
    price: 'From $1,680',
    rating: 5.0,
    reviews: 54,
    groupSize: '2–4',
    gradient: 'from-[#1a1200] to-[#0f0b00]',
    accentColor: '#f4d03f',
    highlights: ['Every region covered', 'Island & boat trips', 'All wildlife parks', 'Ayurveda retreat', 'Private experiences', 'Luxury properties'],
    description: 'The most comprehensive Sri Lanka experience — 18 days of luxury, adventure, culture, and nature with nothing left out.',
    image: '/webp/pexels-elina-sazonova-4403900.jpg',
  },
  {
    id: 6,
    days: 0,
    title: 'Custom Private Tour',
    subtitle: 'Designed just for you',
    badge: 'Bespoke',
    badgeColor: '#00e5c8',
    price: 'Custom quote',
    rating: 5.0,
    reviews: 430,
    groupSize: 'Any size',
    gradient: 'from-[#0a1f1a] to-[#051210]',
    accentColor: '#00e5c8',
    highlights: ['Your dates & pace', 'Any destinations', 'Private guide', 'Custom activities', 'Flexible itinerary', 'Any budget range'],
    description: 'Tell us your dream trip and we\'ll design a completely personalized itinerary around your interests, pace, and budget.',
    image: '/webp/pexels-ollivves-1078983.jpg',
  },
]

export function TourPackagesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-[#060a08] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pkg-section { font-family: 'DM Sans', sans-serif; }
        .pkg-heading { font-family: 'Cormorant Garamond', serif; }

        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) { .pkg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .pkg-grid { grid-template-columns: 1fr; } }

        .pkg-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.35s cubic-bezier(.4,0,.2,1), border-color 0.35s;
          cursor: pointer;
        }
        .pkg-card:hover {
          transform: translateY(-6px);
        }

        .pkg-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease, opacity 0.4s ease;
          opacity: 0.15;
        }
        .pkg-card:hover .pkg-card-img {
          transform: scale(1.08);
          opacity: 0.25;
        }

        .pkg-days-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.1;
          text-align: center;
          border: 2px solid;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }
        .pkg-card:hover .pkg-days-pill { transform: scale(1.1) rotate(-5deg); }

        .pkg-highlight {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.65);
          padding: 5px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }

        .pkg-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          padding: 11px 20px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .pkg-cta:hover { transform: translateX(4px); gap: 10px; }
      `}</style>

      <div className="pkg-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-emerald-400 mb-4">
              Plan Your Journey
            </p>
            <h2 className="pkg-heading text-5xl sm:text-6xl font-bold text-white leading-tight">
              Tour <em>Packages</em>
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed sm:text-right">
            Flexible itineraries designed for every travel style — from quick escapes to epic island odysseys.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="pkg-grid">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              className={`pkg-card bg-linear-to-br ${pkg.gradient}`}
              style={{
                borderColor: hovered === pkg.id ? `${pkg.accentColor}40` : 'rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={pkg.image} alt={pkg.title} className="pkg-card-img" />

              <div className="relative z-10 p-6 flex flex-col h-full min-h-105">

                {/* Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{ background: `${pkg.accentColor}22`, color: pkg.accentColor, border: `1px solid ${pkg.accentColor}44` }}>
                    {pkg.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill={pkg.accentColor} style={{ color: pkg.accentColor }} />
                    <span className="text-xs text-white/60">{pkg.rating} ({pkg.reviews})</span>
                  </div>
                </div>

                {/* Days pill */}
                <div className="pkg-days-pill"
                  style={{ borderColor: `${pkg.accentColor}60`, color: pkg.accentColor, background: `${pkg.accentColor}12` }}>
                  {pkg.days > 0 ? <><span className="text-lg font-800">{pkg.days}</span><br /><span style={{fontSize:10}}>DAYS</span></> : '✦'}
                </div>

                {/* Title */}
                <h3 className="pkg-heading text-2xl font-bold text-white mb-1">{pkg.title}</h3>
                <p className="text-xs text-white/40 mb-3">{pkg.subtitle}</p>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{pkg.description}</p>

                {/* Highlights */}
                <div className="flex-1 mb-5">
                  {pkg.highlights.slice(0, 4).map((h, j) => (
                    <div key={j} className="pkg-highlight">
                      <Check size={11} style={{ color: pkg.accentColor, flexShrink: 0 }} />
                      {h}
                    </div>
                  ))}
                  {pkg.highlights.length > 4 && (
                    <p className="text-xs mt-2" style={{ color: pkg.accentColor }}>
                      +{pkg.highlights.length - 4} more included
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/08">
                  <div>
                    <p className="text-xs text-white/35 mb-0.5">Starting from</p>
                    <p className="text-lg font-semibold text-white">{pkg.price}</p>
                  </div>
                  <Link href="/contact" className="pkg-cta"
                    style={{ background: `${pkg.accentColor}22`, color: pkg.accentColor, border: `1px solid ${pkg.accentColor}44` }}>
                    Enquire <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Not sure which package suits you?</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #00e5c8, #00a896)' }}>
            Talk to our team — it&apos;s free <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}