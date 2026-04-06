'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Shield, Eye, Star, Users, Globe, Heart, Award, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const WHY_US = [
  { icon: Award,  label: 'Licensed National Tour Guide' },
  { icon: Star,   label: 'Over 10 Years Experience' },
  { icon: Heart,  label: 'Authentic Local Experiences' },
  { icon: Users,  label: 'Personalized Private Tours' },
  { icon: Shield, label: 'Professional & Friendly Team' },
  { icon: Globe,  label: 'Deep Cultural & Historical Knowledge' },
]

const STATS = [
  { number: '10+',  label: 'Years Guiding' },
  { number: '500+', label: 'Happy Travelers' },
  { number: '35+',  label: 'Destinations' },
  { number: '98%',  label: 'Satisfaction Rate' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="about-root min-h-screen transition-colors duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── CSS Variables + tiny helpers that Tailwind can't express ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* DARK (default) */
        .dark .about-root, .about-root {
          --bg:            #080c0a;
          --bg-alt:        #0a1410;
          --bg-founder:    #071510;
          --bg-card:       rgba(255,255,255,0.025);
          --bg-card-h:     rgba(0,229,200,0.05);
          --border:        rgba(255,255,255,0.07);
          --border-h:      rgba(0,229,200,0.28);
          --text:          #ffffff;
          --text-muted:    rgba(255,255,255,0.55);
          --text-faint:    rgba(255,255,255,0.30);
          --accent:        #00e5c8;
          --accent2:       #ff7a45;
          --accent-bg:     rgba(0,229,200,0.10);
          --accent2-bg:    rgba(255,122,69,0.10);
          --hero-from:     #0a2218;
          --hero-to:       #04100a;
          --badge-text:    #04100a;
          --badge-sub:     rgba(4,16,10,0.65);
          --cta-bg:        #0a3d2e;
          --shadow:        0 8px 32px rgba(0,229,200,0.22);
          --credential-bg: rgba(0,0,0,0.55);
          --hero-glow:     rgba(0,229,200,0.07);
        }

        /* LIGHT */
        html:not(.dark) .about-root {
          --bg:            #f4f1eb;
          --bg-alt:        #e8f5f0;
          --bg-founder:    #ddf0ea;
          --bg-card:       rgba(0,0,0,0.03);
          --bg-card-h:     rgba(0,140,120,0.07);
          --border:        rgba(0,0,0,0.09);
          --border-h:      rgba(0,130,110,0.35);
          --text:          #0d1f19;
          --text-muted:    rgba(13,31,25,0.60);
          --text-faint:    rgba(13,31,25,0.36);
          --accent:        #00695c;
          --accent2:       #b5430b;
          --accent-bg:     rgba(0,105,92,0.09);
          --accent2-bg:    rgba(181,67,11,0.08);
          --hero-from:     #c8e8df;
          --hero-to:       #a8d5ca;
          --badge-text:    #ffffff;
          --badge-sub:     rgba(255,255,255,0.75);
          --cta-bg:        #c8e8df;
          --shadow:        0 8px 32px rgba(0,105,92,0.20);
          --credential-bg: rgba(255,255,255,0.82);
          --hero-glow:     rgba(0,105,92,0.10);
        }

        /* Cormorant font helper */
        .font-display { font-family: 'Cormorant Garamond', serif; }

        /* Section label ::before line — can't do pseudo in Tailwind */
        .section-label::before {
          content: '';
          display: inline-block;
          width: 28px; height: 1.5px;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* Who image custom border-radius (asymmetric, can't do in Tailwind) */
        .who-img         { border-radius: 4px 40px 4px 40px; }
        .who-img-frame   { border-radius: 4px 40px 4px 40px; }

        /* Stat/pill/card hover — Tailwind group-hover doesn't do CSS var transitions cleanly */
        .stat-item:hover   { border-color: var(--border-h); background: var(--bg-card-h); transform: translateY(-3px); }
        .why-pill:hover    { border-color: var(--border-h); background: var(--bg-card-h); transform: translateX(5px); }
        .mv-card:hover     { border-color: var(--border-h); transform: translateY(-4px); }
      `}</style>

      <Navbar />
      <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)' }}
          />
          {/* Radial glow */}
          <div
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 70%)',
              top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.p
              className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-6 justify-center"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              Our Story
            </motion.p>

            <motion.h1
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8"
              style={{ color: 'var(--text)' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              Travel Sri Lanka<br />
              <em style={{ color: 'var(--accent)' }}>Like a Local</em>
            </motion.h1>

            <motion.p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            >
              We are more than a travel company — we are your connection to the real Sri Lanka:
              its people, its culture, its hidden places.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold transition-all hover:opacity-85 hover:gap-3"
                style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}
              >
                Plan Your Journey <ArrowRight size={15} />
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold transition-all hover:opacity-75"
                style={{ color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                Explore Destinations
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom fade line */}
          <div
            className="absolute left-1/2 bottom-0 w-px h-20"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </section>

        {/* ══ WHO WE ARE ════════════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

              {/* Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
              >
                <img
                  src="/webp/pexels-tomas-malik-793526-1998439.webp"
                  alt="Sri Lanka"
                  className="who-img w-full object-cover block"
                  style={{ aspectRatio: '3/4' }}
                />
                {/* Offset frame */}
                <div
                  className="who-img-frame absolute pointer-events-none opacity-50"
                  style={{
                    top: -16, right: -16,
                    width: '100%', height: '100%',
                    border: '2px solid var(--border-h)',
                  }}
                />
                {/* Badge */}
                <div
                  className="absolute bottom-6 -left-5 px-5 py-3 rounded-xl text-[13px] font-bold leading-snug"
                  style={{ background: 'var(--accent)', color: 'var(--badge-text)', boxShadow: 'var(--shadow)' }}
                >
                  <div>🇱🇰 Sri Lanka</div>
                  <div className="text-[11px] font-normal mt-0.5" style={{ color: 'var(--badge-sub)' }}>
                    Authentic Travel Since 2016
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5"
                  style={{ color: 'var(--accent)' }}>
                  Who We Are
                </p>
                <h2 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6"
                  style={{ color: 'var(--text)' }}>
                  Beyond the<br /><em style={{ color: 'var(--accent)' }}>Tourist Route</em>
                </h2>
                <p className="leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                  Travel Lunatics is a Sri Lankan travel company specializing in authentic, personalized
                  experiences across the island. Our goal is to show visitors the{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>real Sri Lanka</strong> —
                  not only the famous tourist destinations, but also the local lifestyle, traditions,
                  food, and culture that make the island truly unique.
                </p>
                <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
                  Our team of experienced guides, professional drivers, and local hosts are passionate
                  about sharing the beauty of Sri Lanka with travelers from around the world. Every
                  journey is carefully designed to ensure comfort, safety, and unforgettable memories.
                </p>

                <div className="flex flex-col gap-3">
                  {WHY_US.slice(0, 3).map((item, i) => (
                    <motion.div
                      key={i} className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════════ */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className="stat-item text-center py-8 px-6 rounded-2xl border transition-all duration-300 cursor-default"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <p className="font-display text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                    {s.number}
                  </p>
                  <p className="text-sm tracking-wide" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOUNDER ═══════════════════════════════════════════ */}
        <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--bg-founder)' }} />

          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5 justify-center"
                style={{ color: 'var(--accent)' }}>
                The Person Behind the Journey
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-bold" style={{ color: 'var(--text)' }}>
                Meet Our <em style={{ color: 'var(--accent)' }}>Founder</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">

              {/* Photo + credentials */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
              >
                {/*
                  ── SWAP FOR REAL PHOTO ──────────────────────────
                  Replace the placeholder div below with:
                  <img src="/images/nilitha.jpg" alt="Nilitha Jayawardena"
                    className="w-full object-cover object-top rounded-3xl block"
                    style={{ aspectRatio:'3/4', border:'1px solid var(--border)' }} />
                  ────────────────────────────────────────────────
                */}
                <div
                  className="w-full rounded-3xl flex items-center justify-center"
                  style={{
                    aspectRatio: '3/4',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                     <img src="/webp/Amatasiri.jpeg" alt="Nilitha Jayawardena"
                    className="w-full object-cover object-top rounded-3xl block"
                    style={{ aspectRatio:'3/4', border:'1px solid var(--border)' }} />
                </div>

                {/* Credential pills */}
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    { icon: null,  text: 'Licensed National Tour Guide — Sri Lanka Tourism' },
                    { icon: null,  text: '10+ Years in Sri Lanka Tourism Industry' },
                    { icon: 'pin', text: 'Based in Sri Lanka · Available Island-Wide' },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs backdrop-blur-md"
                      style={{
                        background: 'var(--credential-bg)',
                        border: '1px solid var(--border-h)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {c.icon === 'pin'
                        ? <MapPin size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        : <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                      }
                      {c.text}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5"
                  style={{ color: 'var(--accent)' }}>
                  Founder &amp; Director
                </p>
                <h3 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-2"
                  style={{ color: 'var(--text)' }}>
                  Nilitha<br />Jayawardena
                </h3>
                <p className="text-sm font-semibold mb-8" style={{ color: 'var(--accent)' }}>
                  Founder &amp; Director · Travel Lunatics
                </p>

                <div className="flex flex-col gap-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <p>
                    Nilitha Jayawardena is the founder and director of Travel Lunatics and a{' '}
                    <strong style={{ color: 'var(--text)', fontWeight: 600 }}>licensed national tour guide</strong>{' '}
                    in Sri Lanka. With over{' '}
                    <strong style={{ color: 'var(--text)', fontWeight: 600 }}>10 years of experience</strong>{' '}
                    in the tourism industry, he has guided travelers from many countries, sharing deep
                    knowledge of Sri Lanka's culture, history, wildlife, and traditions.
                  </p>
                  <p>
                    His passion for travel and storytelling allows visitors to truly understand Sri Lanka
                    beyond simple sightseeing — connecting them with the island's soul through villages,
                    food, local families, and hidden places most tourists never see.
                  </p>
                  <p>
                    Through Travel Lunatics, Nilitha creates meaningful journeys that allow travelers to{' '}
                    <strong style={{ color: 'var(--text)', fontWeight: 600 }}>experience Sri Lanka like a local</strong>.
                  </p>
                </div>

                {/* Pull quote */}
                <div
                  className="mt-8 pl-5"
                  style={{ borderLeft: '2px solid var(--accent)' }}
                >
                  <p className="font-display text-xl italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    "The best travel experiences come from connecting with local culture —
                    the food, the families, the stories."
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-faint)' }}>— Nilitha Jayawardena</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold transition-all hover:opacity-85 hover:gap-3"
                    style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}
                  >
                    Plan a Trip with Nilitha <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://wa.me/94743582799" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold transition-all hover:opacity-75"
                    style={{ color: 'var(--text)', border: '1px solid var(--border)' }}
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ MISSION & VISION ══════════════════════════════════ */}
        <section className="py-28 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5 justify-center"
                style={{ color: 'var(--accent)' }}>
                What Drives Us
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-bold" style={{ color: 'var(--text)' }}>
                Mission &amp; <em style={{ color: 'var(--accent)' }}>Vision</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Mission card */}
              <motion.div
                className="mv-card relative rounded-3xl p-12 overflow-hidden border transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-bg) 0%, transparent 100%)',
                  border: '1px solid var(--border)',
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                {/* Glow blob */}
                <div className="absolute w-72 h-72 rounded-full pointer-events-none -top-14 -left-14"
                  style={{ background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-h)' }}>
                    <Shield size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5"
                    style={{ color: 'var(--accent)' }}>
                    Our Mission
                  </p>
                  <h3 className="font-display text-3xl font-bold leading-tight mb-4" style={{ color: 'var(--text)' }}>
                    Authentic &amp; Meaningful<br />Travel Experiences
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Our mission is to create authentic and meaningful travel experiences that allow
                    visitors to connect deeply with Sri Lanka's culture, people, nature, and traditions.
                    We aim to provide journeys that go beyond traditional tourism and give travelers
                    the opportunity to experience the real life of the island.
                  </p>
                </div>
              </motion.div>

              {/* Vision card */}
              <motion.div
                className="mv-card relative rounded-3xl p-12 overflow-hidden border transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--accent2-bg) 0%, transparent 100%)',
                  border: '1px solid var(--border)',
                }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.2 }}
              >
                <div className="absolute w-72 h-72 rounded-full pointer-events-none -top-14 -right-14"
                  style={{ background: 'radial-gradient(circle, var(--accent2-bg) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'var(--accent2-bg)', border: '1px solid var(--border-h)' }}>
                    <Eye size={20} style={{ color: 'var(--accent2)' }} />
                  </div>
                  <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5"
                    style={{ color: 'var(--accent2)' }}>
                    <span className="w-7 h-px flex-shrink-0" style={{ background: 'var(--accent2)' }} />
                    Our Vision
                  </p>
                  <h3 className="font-display text-3xl font-bold leading-tight mb-4" style={{ color: 'var(--text)' }}>
                    Sri Lanka's Most Trusted<br />Travel Partner
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Our vision is to become one of Sri Lanka's most trusted and respected travel
                    experience providers, known internationally for authentic tours, professional
                    service, and personalized planning. We are committed to responsible tourism
                    that supports local communities and preserves Sri Lanka's cultural and natural heritage.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ WHY TRAVEL WITH US ════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-alt)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5"
                  style={{ color: 'var(--accent)' }}>
                  Our Advantage
                </p>
                <h2 className="font-display text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--text)' }}>
                  Why Travel<br /><em style={{ color: 'var(--accent)' }}>With Us?</em>
                </h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Every detail of your trip — from the route to the restaurants, from the timing
                  to the hidden stops — is shaped by over a decade of local expertise and genuine passion.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHY_US.map((item, i) => (
                  <motion.div
                    key={i}
                    className="why-pill flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-300 cursor-default"
                    style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-bg)' }}
                    >
                      <item.icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="relative overflow-hidden rounded-[28px] p-12 sm:p-16 text-center"
              style={{ background: 'var(--cta-bg)', border: '1px solid var(--border-h)' }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Glow */}
              <div
                className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -top-24 -right-24"
                style={{ background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-4 justify-center"
                  style={{ color: 'var(--accent)' }}>
                  Ready to Explore?
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                  Start Your Sri Lanka<br /><em style={{ color: 'var(--accent)' }}>Adventure Today</em>
                </h2>
                <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
                  Contact Nilitha directly and let us design a personalized journey
                  based on your interests, pace, and travel style.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[13px] font-semibold transition-all hover:opacity-85 hover:gap-3"
                    style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}
                  >
                    Get in Touch <ArrowRight size={16} />
                  </Link>
                  <a
                    href="mailto:Travellunatics@gmail.com"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[13px] font-semibold transition-all hover:opacity-75"
                    style={{ color: 'var(--text)', border: '1px solid var(--border)' }}
                  >
                    Travellunatics@gmail.com
                  </a>
                </div>
                <p className="text-xs mt-6" style={{ color: 'var(--text-faint)' }}>
                  📞 WhatsApp / Phone: +94 74 358 2799
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}