'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const stats = [
  { value: '50+', label: 'Years of Excellence' },
  { value: '10K+', label: 'Happy Travelers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '200+', label: 'Destinations' },
]

const StatCounter = ({ value, label }: { value: string; label: string }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numericValue = parseInt(value.replace(/[KM%+]/g, ''))
          const multiplier = value.includes('M') ? 1000000 : value.includes('K') ? 1000 : 1
          const finalValue = numericValue * multiplier
          const steps = 60
          const increment = finalValue / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= finalValue) {
              setDisplayValue(value)
              clearInterval(timer)
            } else {
              setDisplayValue(
                current >= 1000000
                  ? `${(current / 1000000).toFixed(1)}M`
                  : current >= 1000
                  ? `${(current / 1000).toFixed(0)}K`
                  : Math.floor(current).toString()
              )
            }
          }, 25)
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
      className="flex flex-col items-center justify-center rounded-2xl py-5 sm:py-6 px-2 sm:px-4 text-center transition-all duration-300 cursor-default"
      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 tabular-nums" style={{ color: '#F97316' }}>
        {displayValue}
      </p>
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium tracking-wide leading-tight">{label}</p>
    </motion.div>
  )
}

export function HomeAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rightY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: '#FAFAF8' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251,146,60,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Eyebrow ── */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-px w-10 bg-orange-400" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
            Who We Are
          </span>
          <span className="h-px w-10 bg-orange-400" />
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          className="text-center mb-10 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          <h2
            className="font-bold leading-tight tracking-tight text-gray-900"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 5vw, 3.75rem)',
            }}
          >
            Sri Lanka&apos;s Leading
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Destination Management
            </span>
          </h2>
        </motion.div>

        {/* ── Mobile/Tablet: Stacked images above text card ── */}
        <div className="lg:hidden mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Two images side by side */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Sigiriya image */}
              <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
                <img
                  src="/webp/sigiriya.webp"
                  alt="Sigiriya Rock Fortress, Sri Lanka"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-3"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-white/70 text-[9px] font-medium uppercase tracking-wide mb-0.5">Cultural Heritage</p>
                  <p className="text-white text-[11px] font-bold leading-tight">Sigiriya Rock Fortress</p>
                </div>
              </div>

              {/* Mirissa image */}
              <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
                <img
                  src="/webp/mirissa-beach.webp"
                  alt="Mirissa Beach"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-3"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-white/70 text-[9px] font-medium uppercase tracking-wide mb-0.5">Coastal Paradise</p>
                  <p className="text-white text-[11px] font-bold leading-tight">Mirissa Beach</p>
                </div>
              </div>
            </div>

            {/* Stats grid below images on mobile/tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-3">
              {stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden lg:grid grid-cols-12 gap-10 md:gap-14 items-center">

          {/* Left image — parallax UP */}
          <motion.div
            className="col-span-4"
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '3/4' }}>
              <img src="/webp/sigiriya.webp" alt="Sigiriya Rock Fortress, Sri Lanka" className="w-full h-full object-cover" />
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.7)' }}
              >
                <p className="text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wide">Cultural Heritage</p>
                <p className="text-sm font-bold text-gray-800">Sigiriya Rock Fortress</p>
              </div>
            </div>
          </motion.div>

          {/* Center — text card */}
          <motion.div
            className="col-span-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl p-8 md:p-10 shadow-xl" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Experience the enchantment of Sri Lanka with Travel Lunatics&hellip;
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                Travel Lunatics has been a leader in the Sri Lankan tourism industry for over five decades of excellence — organizing inbound tours for couples on holiday or honeymoon, individual adventurers, nature lovers, and special interest groups.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Subsidiary of Sri Lanka's largest conglomerate",
                  'Trusted partner for leading global travel brands',
                  'Award-winning service since 1972',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#F97316' }}>✓</span>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
              >
                <span>Discover Our Story</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right image — parallax DOWN */}
          <motion.div
            className="col-span-4"
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '3/4' }}>
              <img src="/webp/mirissa-beach.webp" alt="Sri Lanka coastline aerial view" className="w-full h-full object-cover" />
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

        {/* ── Mobile/Tablet: Text card below images ── */}
        <div className="lg:hidden">
          <motion.div
            className="rounded-3xl p-6 sm:p-8 shadow-xl"
            style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-xl font-bold mb-3 text-gray-900 leading-snug"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Experience the enchantment of Sri Lanka with Travel Lunatics&hellip;
            </h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Travel Lunatics has been a leader in the Sri Lankan tourism industry for over five decades of excellence — organizing inbound tours for couples, individual adventurers, nature lovers, and special interest groups.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Subsidiary of Sri Lanka's largest conglomerate",
                'Trusted partner for leading global travel brands',
                'Award-winning service since 1972',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#F97316' }}>✓</span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
            >
              <span>Discover Our Story</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Desktop stats row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid mt-16 md:mt-20 grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <StatCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}