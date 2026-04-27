'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Star, Heart, Users, Shield, Globe } from 'lucide-react'

const reasons = [
  { icon: Award,  title: 'Licensed National Tour Guide',       desc: 'Nilitha is a licensed national guide certified by Sri Lanka Tourism.' },
  { icon: Star,   title: 'Over 10 Years Experience',           desc: 'A decade of guiding travelers through every corner of Sri Lanka.' },
  { icon: Heart,  title: 'Authentic Local Experiences',        desc: 'Villages, food, local families, and hidden places most tourists never see.' },
  { icon: Users,  title: 'Personalized Private Tours',         desc: 'Every itinerary is fully tailored to your pace, interests, and travel style.' },
  { icon: Shield, title: 'Professional & Friendly Team',       desc: 'Expert drivers, guides, and hosts committed to your comfort and safety.' },
  { icon: Globe,  title: 'Deep Cultural & Historical Knowledge', desc: `Rich storytelling that brings Sri Lanka's history and traditions to life.` },
]

export function AboutWhyUs() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAFAF8, #FFF7ED)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

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
              Our Advantage
            </span>
            <span className="h-px w-10 bg-orange-400" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 3.5rem)' }}
          >
            Why Travel{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              With Us?
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mt-4 max-w-xl mx-auto">
            Every detail of your trip — from the route to the restaurants, from the timing to the hidden
            stops — is shaped by over a decade of local expertise and genuine passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: icon grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div
                  key={r.title}
                  className="flex items-start gap-4 p-5 rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ border: '2px solid #F97316', color: '#F97316' }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{r.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                    <div className="mt-2 h-[2px] w-8 rounded-full" style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* RIGHT: image collage (desktop) */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ height: 520 }}
          >
            {/* Peach accent rect */}
            <div
              className="absolute"
              style={{ right: 0, bottom: 0, width: 320, height: 380, borderRadius: 16, background: '#FED7AA', zIndex: 0 }}
            />
            {/* Top-left image */}
            <div
              className="absolute overflow-hidden"
              style={{ top: 0, left: 0, width: 300, height: 280, borderRadius: 14, zIndex: 2, border: '4px solid white', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
            >
              <Image src="/webp/group1.jpg" alt="Travel Lunatics team" fill sizes="300px" className="object-cover" />
            </div>
            {/* Bottom-right image */}
            <div
              className="absolute overflow-hidden"
              style={{ bottom: 0, right: 0, width: 265, height: 340, borderRadius: 14, zIndex: 3, border: '4px solid white', boxShadow: '0 12px 40px rgba(0,0,0,0.16)' }}
            >
              <Image src="/webp/Amatasiri.jpeg" alt="Nilitha guiding travelers" fill sizes="265px" className="object-cover" />
            </div>
            {/* Floating stat */}
            <motion.div
              className="absolute z-10 flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-center"
              style={{
                background: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                top: 220, left: 200,
                border: '1px solid rgba(249,115,22,0.15)',
                minWidth: 110,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-4xl font-black" style={{ color: '#F97316', fontFamily: "'Playfair Display', serif" }}>10+</p>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Years of Trust</p>
            </motion.div>
          </motion.div>

          {/* Mobile image pair */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
                <Image src="/webp/group1.jpg" alt="Travel Lunatics team" fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-xs">Our Team</p>
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ borderRadius: '1.25rem', aspectRatio: '3/4' }}>
                <Image src="/webp/Amatasiri.jpeg" alt="Nilitha guiding" fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-xs">Expert Guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>
    </section>
  )
}
