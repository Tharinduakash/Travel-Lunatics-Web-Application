'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '10+',  label: 'Years Guiding' },
  { value: '500+', label: 'Happy Travelers' },
  { value: '35+',  label: 'Destinations' },
  { value: '98%',  label: 'Satisfaction Rate' },
]

function StatCounter({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numeric = parseInt(value.replace(/[^0-9]/g, ''))
          const suffix = value.replace(/[0-9]/g, '')
          const steps = 50
          const increment = numeric / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= numeric) {
              setDisplay(value)
              clearInterval(timer)
            } else {
              setDisplay(Math.floor(current) + suffix)
            }
          }, 28)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05, y: -4 }}
      className="flex flex-col items-center justify-center rounded-2xl py-6 px-4 text-center transition-all duration-300 cursor-default"
      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      <p className="text-3xl sm:text-4xl font-bold mb-1 tabular-nums" style={{ color: '#F97316' }}>
        {display}
      </p>
      <p className="text-xs text-gray-500 font-medium tracking-wide">{label}</p>
    </motion.div>
  )
}

export function AboutWhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const leftY  = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251,146,60,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-px w-10 bg-orange-400" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
            About Travel Lunatics
          </span>
          <span className="h-px w-10 bg-orange-400" />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <h2
            className="font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 3.5rem)' }}
          >
            Who We Are —{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Beyond the Tourist Route
            </span>
          </h2>
        </motion.div>

        {/* Desktop 3-col grid */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">

          {/* Left image — parallax up */}
          <motion.div
            className="col-span-4"
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '3/4' }}>
              <img src="/webp/sigiriya.webp" alt="Sigiriya Rock Fortress" className="w-full h-full object-cover" />
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.7)' }}
              >
                <p className="text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wide">Cultural Heritage</p>
                <p className="text-sm font-bold text-gray-800">Sigiriya Rock Fortress</p>
              </div>
            </div>
          </motion.div>

          {/* Center text card */}
          <motion.div
            className="col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl p-8 md:p-10 shadow-xl" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3
                className="text-xl font-bold mb-4 text-gray-900 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                We Show You the Real Sri Lanka…
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Travel Lunatics is a Sri Lankan travel company specializing in authentic, personalized
                experiences across the island. Our goal is to show visitors the{' '}
                <strong className="text-gray-800">real Sri Lanka</strong> — not only the famous tourist
                destinations, but also the local lifestyle, traditions, food, and culture that make the
                island truly unique.
              </p>
              <ul className="space-y-3 mb-7">
                {[
                  'Experienced guides, professional drivers & local hosts',
                  'Every journey carefully designed for comfort & safety',
                  'Unforgettable memories guaranteed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: '#F97316' }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-2 pl-4 border-l-2"
                style={{ borderColor: '#F97316' }}
              >
                <p className="text-sm italic text-gray-500 leading-relaxed">
                  "Not just sightseeing — a deeper, authentic connection with the island."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right image — parallax down */}
          <motion.div
            className="col-span-4"
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '3/4' }}>
              <img src="/webp/mirissa-beach.webp" alt="Mirissa Beach, Sri Lanka" className="w-full h-full object-cover" />
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.7)' }}
              >
                <p className="text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wide">Coastal Paradise</p>
                <p className="text-sm font-bold text-gray-800">Mirissa Beach</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet: images + text card */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
              <img src="/webp/sigiriya.webp" alt="Sigiriya" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                <p className="text-white/70 text-[9px] font-medium uppercase tracking-wide mb-0.5">Cultural Heritage</p>
                <p className="text-white text-[11px] font-bold">Sigiriya Rock Fortress</p>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
              <img src="/webp/mirissa-beach.webp" alt="Mirissa Beach" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                <p className="text-white/70 text-[9px] font-medium uppercase tracking-wide mb-0.5">Coastal Paradise</p>
                <p className="text-white text-[11px] font-bold">Mirissa Beach</p>
              </div>
            </div>
          </div>
          <motion.div
            className="rounded-3xl p-6 sm:p-8 shadow-xl"
            style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              We Show You the Real Sri Lanka…
            </h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Travel Lunatics is a Sri Lankan travel company specializing in authentic, personalized
              experiences across the island — local lifestyle, traditions, food, and culture that make
              the island truly unique.
            </p>
            <ul className="space-y-3">
              {[
                'Experienced guides, professional drivers & local hosts',
                'Every journey carefully designed for comfort & safety',
                'Unforgettable memories guaranteed',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#F97316' }}>✓</span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>
    </section>
  )
}
