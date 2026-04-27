'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, MapPin, Heart, Shield, DollarSign, Lightbulb } from 'lucide-react'

// ─── Why Travel reasons ───────────────────────────────────────────────────────
const reasons = [
  {
    id: 1,
    title: 'Local Experts, Real Experiences',
    description: 'Guides who know Sri Lanka beyond the guidebooks — from hidden waterfalls to village kitchens.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 2,
    title: 'Tailor-Made Journeys',
    description: 'Trips fully customized to your travel style, pace, and interests.',
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    id: 3,
    title: 'Authentic & Immersive',
    description: 'Experience real culture, food, and village life — not just tourist spots.',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 4,
    title: 'Trusted & Reliable Service',
    description: '24/7 support and smooth travel logistics from arrival to departure.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: 5,
    title: 'Best Value for Your Journey',
    description: 'Premium Sri Lankan experiences at competitive, transparent prices.',
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: 6,
    title: 'Safe & Comfortable Travel',
    description: 'Professional guides, quality transport, and vetted accommodation.',
    icon: <Lightbulb className="w-6 h-6" />,
  },
]

// ─── Social platforms ─────────────────────────────────────────────────────────
const socialPlatforms = [
  {
    key: 'facebook',
    label: 'Facebook',
    screenshot: '/webp/pro1.jpeg',
    url: 'https://facebook.com/travellunatics',
    color: '#1877F2',
    lightBg: '#EBF5FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    screenshot: '/webp/pro4.jpeg',
    url: 'https://instagram.com/travellunatics',
    color: '#E1306C',
    lightBg: '#FEE9F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    screenshot: '/webp/pro3.jpeg',
    url: 'https://tiktok.com/@travellunatics',
    color: '#010101',
    lightBg: '#F3F3F3',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.83 1.54V6.78a4.85 4.85 0 01-1.06-.09z" />
      </svg>
    ),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    screenshot: '/webp/pro5.jpeg',
    url: 'https://youtube.com/@travellunatics',
    color: '#FF0000',
    lightBg: '#FFF0F0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: 'tripadvisor',
    label: 'Tripadvisor',
    screenshot: '/webp/pro6.jpeg',
    url: 'https://tripadvisor.com/travellunatics',
    color: '#00AF87',
    lightBg: '#E6F7F4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.682 1.846a5.261 5.261 0 00-.581 7.888 5.263 5.263 0 007.888-.581l3.017 3.308 3.017-3.308a5.262 5.262 0 007.888.581 5.26 5.26 0 00-.581-7.888L24 6.648h-4.35a14.118 14.118 0 00-7.644-2.353zM12 7.116a9.35 9.35 0 014.808 1.313H7.192A9.35 9.35 0 0112 7.116zm-6.758 3.087a3.488 3.488 0 110 6.975 3.488 3.488 0 010-6.975zm13.516 0a3.488 3.488 0 110 6.975 3.488 3.488 0 010-6.975zm-13.516 1.59a1.898 1.898 0 100 3.795 1.898 1.898 0 000-3.795zm13.516 0a1.898 1.898 0 100 3.795 1.898 1.898 0 000-3.795z" />
      </svg>
    ),
  },
]

// ─── Social card component ────────────────────────────────────────────────────
function SocialCard({ platform, index }: { platform: typeof socialPlatforms[0]; index: number }) {
  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 flex-shrink-0"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      whileHover={{ y: -8 }}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{
            backgroundColor: platform.color,
            boxShadow: `0 4px 16px ${platform.color}40`,
          }}
        >
          {platform.icon}
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-700">
          {platform.label}
        </span>
      </div>

      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          width: 175,
          height: 310,
          borderRadius: 24,
          border: '2px solid rgba(0,0,0,0.07)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
          background: platform.lightBg,
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{ width: 56, height: 10, background: 'rgba(0,0,0,0.10)', borderRadius: '0 0 8px 8px' }}
        />
        <Image
          src={platform.screenshot}
          alt={`${platform.label} profile`}
          fill
          sizes="175px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${platform.lightBg} 0%, transparent 100%)` }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ borderRadius: 22, boxShadow: `inset 0 0 0 2px ${platform.color}55` }}
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span
            className="px-3 py-1 rounded-full text-white text-[9px] font-black uppercase tracking-widest whitespace-nowrap"
            style={{ background: platform.color, boxShadow: `0 2px 10px ${platform.color}60` }}
          >
            Visit →
          </span>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Main exported section ────────────────────────────────────────────────────
export function WhyTravelSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFF7ED)' }}
    >
      {/* ════════ PART 1 — WHY TRAVEL WITH US ════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">

        {/* ── Mobile/Tablet: Image banner at top ── */}
        <motion.div
          className="block lg:hidden mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 260 }}>
            {/* Two images side by side for mobile/tablet */}
            <div className="flex gap-3 h-full">
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <Image
                  src="/webp/group1.jpg"
                  alt="Expert local guides"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white/70 text-[9px] font-mono uppercase tracking-wider mb-0.5">Our Team</p>
                  <p className="text-white font-bold text-xs">Expert Local Guides</p>
                </div>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <Image
                  src="/webp/Amatasiri.jpeg"
                  alt="Tailor-made journeys"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white/70 text-[9px] font-mono uppercase tracking-wider mb-0.5">Experience</p>
                  <p className="text-white font-bold text-xs">Tailored Journeys</p>
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-xl px-4 py-2 text-center z-10"
              style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid rgba(249,115,22,0.15)',
                minWidth: 80,
              }}
            >
              <p className="text-2xl font-black" style={{ color: '#F97316', fontFamily: "'Playfair Display', serif" }}>10+</p>
              <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">Years of Trust</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#F97316' }}>
              Travelers
            </p>
            <h2
              className="font-bold text-gray-900 leading-tight mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.8rem)',
              }}
            >
              Why Travel With{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #F97316, #EA580C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Travel Lunatics?
              </span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 sm:mb-10 max-w-md">
              We craft seamless Sri Lankan journeys for couples, solo adventurers, families, and special interest groups with over 10 years of island expertise behind every itinerary.
            </p>

            {/* Icon list — 3 reasons */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {reasons.slice(0, 3).map((reason, i) => (
                <motion.div
                  key={reason.id}
                  className="flex items-start gap-4 sm:gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'transparent', border: '2px solid #F97316', color: '#F97316' }}
                  >
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{reason.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Desktop image collage (hidden on mobile/tablet — shown at top instead) ── */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ height: 520 }}
          >
            {/* Peach accent rectangle */}
            <div
              className="absolute"
              style={{ right: 0, bottom: 0, width: 330, height: 390, borderRadius: 16, background: '#FED7AA', zIndex: 0 }}
            />
            {/* Top-left image */}
            <div
              className="absolute overflow-hidden"
              style={{ top: 0, left: 0, width: 310, height: 290, borderRadius: 14, zIndex: 2, border: '4px solid white', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
            >
              <Image src="/webp/group2.jpg" alt="Expert local guides" fill sizes="310px" className="object-cover" />
            </div>
            {/* Bottom-right image */}
            <div
              className="absolute overflow-hidden"
              style={{ bottom: 0, right: 0, width: 275, height: 350, borderRadius: 14, zIndex: 3, border: '4px solid white', boxShadow: '0 12px 40px rgba(0,0,0,0.16)' }}
            >
              <Image src="/webp/Amatasiri.jpeg" alt="Tailor-made journeys" fill sizes="275px" className="object-cover" />
            </div>
            {/* Floating stat */}
            <motion.div
              className="absolute z-10 flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-center"
              style={{
                background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                top: 230, left: 210, border: '1px solid rgba(249,115,22,0.15)', minWidth: 110,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-4xl font-black" style={{ color: '#F97316', fontFamily: "'Playfair Display', serif" }}>2+</p>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Years of Trust</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Bottom 3 reasons ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16 pt-12 sm:pt-16"
          style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          {reasons.slice(3).map((reason, i) => (
            <motion.div
              key={reason.id}
              className="flex items-start gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'transparent', border: '2px solid #F97316', color: '#F97316' }}
              >
                {reason.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
                <div className="mt-3 h-[3px] w-10 rounded-full" style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════════ PART 2 — SOCIAL MEDIA ════════ */}
      <div className="py-14 sm:py-20" style={{ background: '#FAFAF8', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, #F97316)' }} />
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">✦ Follow Our Journey</p>
              <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, #F97316)' }} />
            </div>
            <h2
              className="font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Social{' '}
              <span style={{ background: 'linear-gradient(90deg, #F97316, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Media
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
              Stay inspired with travel tips, destination highlights, and real traveler stories from across Sri Lanka.
            </p>
          </motion.div>

          {/* Desktop + Tablet: same SocialCard style, wrap on tablet */}
          <div className="hidden sm:flex flex-wrap items-start justify-center gap-8">
            {socialPlatforms.map((platform, i) => (
              <SocialCard key={platform.key} platform={platform} index={i} />
            ))}
          </div>
 
          {/* Mobile: horizontal scroll */}
          <div
            className="sm:hidden flex gap-5 overflow-x-auto pb-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {socialPlatforms.map((platform, i) => (
              <motion.a
                key={platform.key}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: platform.color }}>
                  {platform.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{platform.label}</span>
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 148, height: 262,
                    borderRadius: 20,
                    border: '2px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    background: platform.lightBg,
                  }}
                >
                  <Image src={platform.screenshot} alt={`${platform.label} profile`} fill sizes="148px" className="object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${platform.lightBg} 0%, transparent 100%)` }} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        div::-webkit-scrollbar { display: none }
      `}</style>
    </section>
  )
}