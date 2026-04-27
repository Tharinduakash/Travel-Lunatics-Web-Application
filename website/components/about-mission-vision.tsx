'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye } from 'lucide-react'

const cards = [
  {
    icon: Shield,
    label: 'Our Mission',
    title: 'Authentic & Meaningful Travel Experiences',
    body: `Our mission is to create authentic and meaningful travel experiences that allow visitors to connect deeply with Sri Lanka's culture, people, nature, and traditions. We aim to provide journeys that go beyond traditional tourism and give travelers the opportunity to experience the real life of the island.`,
    accent: '#F97316',
    accentBg: 'rgba(249,115,22,0.07)',
    glowBg: 'rgba(249,115,22,0.06)',
    blobPos: '-top-16 -left-16',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    title: `Sri Lanka's Most Trusted Travel Partner`,
    body: `Our vision is to become one of Sri Lanka's most trusted and respected travel experience providers, known internationally for authentic tours, professional service, and personalized planning. We are committed to responsible tourism that supports local communities and preserves Sri Lanka's cultural and natural heritage.`,
    accent: '#EA580C',
    accentBg: 'rgba(234,88,12,0.07)',
    glowBg: 'rgba(234,88,12,0.06)',
    blobPos: '-top-16 -right-16',
  },
]

export function AboutMissionVision() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      style={{ background: '#FFFFFF' }}
    >
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-orange-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
              What Drives Us
            </span>
            <span className="h-px w-10 bg-orange-400" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 3.5rem)' }}
          >
            Mission &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vision
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                className="relative rounded-3xl p-10 sm:p-12 overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                style={{ background: card.accentBg, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {/* Glow blob */}
                <div
                  className={`absolute w-72 h-72 rounded-full pointer-events-none ${card.blobPos}`}
                  style={{ background: `radial-gradient(circle, ${card.glowBg} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: '#FFFFFF', border: `1px solid ${card.accent}30`, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
                  >
                    <Icon size={20} style={{ color: card.accent }} />
                  </div>

                  {/* Label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="h-px w-7 flex-shrink-0"
                      style={{ background: card.accent }}
                    />
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.25em]"
                      style={{ color: card.accent }}
                    >
                      {card.label}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-gray-900 leading-tight mb-5 text-2xl sm:text-3xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {card.body}
                  </p>

                  {/* Bottom accent bar */}
                  <div
                    className="mt-8 h-[3px] w-16 rounded-full"
                    style={{ background: `linear-gradient(to right, ${card.accent}, transparent)` }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>
    </section>
  )
}
