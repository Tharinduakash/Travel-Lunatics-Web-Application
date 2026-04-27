'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

const credentials = [
  { icon: 'dot', text: 'Licensed National Tour Guide — Sri Lanka Tourism' },
  { icon: 'dot', text: '10+ Years in Sri Lanka Tourism Industry' },
  { icon: 'pin', text: 'Based in Sri Lanka · Available Island-Wide' },
]

export function AboutFounder() {
  return (
    <section
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FFF7ED, #FAFAF8)' }}
    >
      {/* Subtle peach accent blob */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, #FED7AA 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">

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
              The Person Behind the Journey
            </span>
            <span className="h-px w-10 bg-orange-400" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 3.5rem)' }}
          >
            Meet Our{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Founder
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">

          {/* Photo + credentials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: '3/4', borderRadius: '1.5rem', border: '4px solid white', boxShadow: '0 12px 40px rgba(0,0,0,0.13)' }}
            >
              <Image
                src="/webp/Amatasiri.jpeg"
                alt="Nilitha Jayawardena — Founder & Director"
                fill
                sizes="380px"
                className="object-cover object-top"
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl text-[13px] font-bold leading-snug"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
                }}
              >
                <div>🇱🇰 Licensed National Guide</div>
                <div className="text-[11px] font-normal mt-0.5 text-white/80">
                  Authentic Travel Since 2016
                </div>
              </div>
            </div>

            {/* Credential pills */}
            <div className="mt-4 flex flex-col gap-2">
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(249,115,22,0.18)', color: '#6B7280', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
                >
                  {c.icon === 'pin'
                    ? <MapPin size={12} style={{ color: '#F97316', flexShrink: 0 }} />
                    : <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F97316' }} />
                  }
                  {c.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#F97316' }}>
              Founder &amp; Director
            </p>
            <h3
              className="font-bold text-gray-900 leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Nilitha<br />Jayawardena
            </h3>
            <p className="text-sm font-semibold mb-8" style={{ color: '#F97316' }}>
              Founder &amp; Director · Travel Lunatics
            </p>

            <div className="flex flex-col gap-5 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Nilitha Jayawardena is the founder and director of Travel Lunatics and a{' '}
                <strong className="text-gray-800 font-semibold">licensed national tour guide</strong> in
                Sri Lanka. With over{' '}
                <strong className="text-gray-800 font-semibold">10 years of experience</strong> in the
                tourism industry, he has guided travelers from many countries, sharing deep knowledge of
                Sri Lanka's culture, history, wildlife, and traditions.
              </p>
              <p>
                His passion for travel and storytelling allows visitors to truly understand Sri Lanka
                beyond simple sightseeing — connecting them with the island's soul through villages,
                food, local families, and hidden places most tourists never see.
              </p>
              <p>
                Through Travel Lunatics, Nilitha creates meaningful journeys that allow travelers to{' '}
                <strong className="text-gray-800 font-semibold">experience Sri Lanka like a local</strong>.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className="mt-8 pl-5 border-l-4"
              style={{ borderColor: '#F97316' }}
            >
              <p
                className="text-lg italic text-gray-500 leading-relaxed"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "The best travel experiences come from connecting with local culture —
                the food, the families, the stories."
              </p>
              <p className="text-sm mt-2 text-gray-400 font-medium">— Nilitha Jayawardena</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold text-white transition-all hover:opacity-90 hover:gap-3"
                style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
              >
                Plan a Trip with Nilitha
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://wa.me/94743582799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold text-gray-700 border border-gray-200 transition-all hover:border-orange-300 hover:text-orange-600"
              >
                WhatsApp Chat
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
      `}</style>
    </section>
  )
}
