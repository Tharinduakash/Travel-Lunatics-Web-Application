'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Shalini Castelli & Family',
    country: 'Italy',
    flag: '🇮🇹',
    trip: 'Wonderful Family Trip to Sri Lanka',
    review:
      "Wonderful family trip to Sri Lanka. We were a multi-generational group and Sampath was able to navigate our interests seamlessly. He was extremely knowledgeable about the sites and provided great suggestions to enhance our experience all the time. They even decorated the bus with balloons and streamers to celebrate our granddaughter's birthday and organised a cake at Golden Crown in Kandy. It's a birthday she will never forget.",
    rating: 5,
    duration: '10 Day Tour',
  },
  {
    id: 2,
    name: 'Ms. Karin De Silva',
    country: 'Australia',
    flag: '🇦🇺',
    trip: '10 Day Cultural Journey',
    review:
      'Our tour escort was very capable on educating us on all practices. We have to say a big thank you to Sampath, Kelum, Rasika and Hirunika for a most educational and exciting tour. Sampath and Kelum imparted so much information to us and answered any questions we put to them. Fantastic tour guides! We always felt safe and nothing was too much trouble for this team.',
    rating: 5,
    duration: '10 Day Tour',
  },
  {
    id: 3,
    name: 'James & Rebecca Thornton',
    country: 'United Kingdom',
    flag: '🇬🇧',
    trip: 'Honeymoon in Paradise',
    review:
      'Travel Lunatics made our honeymoon absolutely magical. From the moment we landed, every detail was taken care of. The private beach dinners in Mirissa, the misty tea estate walks in Ella, and the surprise sunrise at Sigiriya — every single day exceeded our expectations. We cannot imagine a better way to have experienced Sri Lanka.',
    rating: 5,
    duration: '14 Day Honeymoon',
  },
  {
    id: 4,
    name: 'Marie & Pierre Dubois',
    country: 'France',
    flag: '🇫🇷',
    trip: 'Adventure Through the Highlands',
    review:
      "An extraordinary journey through Sri Lanka's highlands and coast. Our guide was passionate, knowledgeable, and made every stop feel special. The wildlife safari at Yala was breathtaking — we saw three leopards in one morning! The cooking class in Kandy was a highlight. We have already recommended Travel Lunatics to all our friends.",
    rating: 5,
    duration: '12 Day Adventure',
  },
  {
    id: 5,
    name: 'Aiko & Hiroshi Tanaka',
    country: 'Japan',
    flag: '🇯🇵',
    trip: 'Sri Lanka Cultural Immersion',
    review:
      'We have travelled to many countries but Sri Lanka with Travel Lunatics was something different entirely. The village life experience near Habarana was deeply moving — we stayed with a local family, cooked together, and learned about farming traditions. The train ride from Kandy to Ella through the mist and tea fields is something we will carry in our hearts forever.',
    rating: 5,
    duration: '9 Day Cultural Tour',
  },
  {
    id: 6,
    name: 'The Müller Family',
    country: 'Germany',
    flag: '🇩🇪',
    trip: 'Family Wildlife & Heritage Tour',
    review:
      'Perfect organisation, outstanding guides, and memories that will last a lifetime. Our three children were engaged every single day. The whale watching in Mirissa was the highlight for the kids, while the Galle Fort walk charmed us adults completely. Travel Lunatics managed every detail so we could simply enjoy the experience.',
    rating: 5,
    duration: '11 Day Family Tour',
  },
  {
    id: 7,
    name: 'Sofia Andersson',
    country: 'Sweden',
    flag: '🇸🇪',
    trip: 'Solo Explorer Adventure',
    review:
      "As a solo female traveller, safety and quality guidance were my top priorities. Travel Lunatics delivered on every front. My driver-guide Priya was not just knowledgeable but genuinely kind. The Adam's Peak night climb, the turtle release at dawn in Kosgoda, the leopard sighting at Yala — I could not have asked for a more perfect Sri Lanka experience.",
    rating: 5,
    duration: '8 Day Solo Tour',
  },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function RealStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  // Parallax: image moves up as user scrolls down through section
  // Range is tight so the image doesn't travel too far
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // ── KEY FIX: image is exactly 120% tall, starts showing bottom, reveals top on scroll ──
  // bgY goes from +8% (bottom visible = girl on rock) to -8% (top visible = sky)
  const bgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }
  const next = () => {
    setDirection(1)
    setCurrent(c => (c + 1) % TESTIMONIALS.length)
  }

  const t = TESTIMONIALS[current]

  const slideVariants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      // ── Section height: enough for content + image reveal zone at bottom ──
      style={{ minHeight: '90vh' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .rs-display { font-family: 'Playfair Display', Georgia, serif; }
        .rs-body    { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ── PARALLAX BACKGROUND IMAGE ─────────────────────────────────────
          Height: 120% of section — the extra 20% is the hidden bottom
          (the girl on the rock) that scrolls into view as user moves down.
          top: -10% keeps it flush with the section top edge.
          objectPosition: 'center bottom' anchors the bottom of the image
          (the landscape/person) so it's what appears first.
      ──────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          y: bgY,
          // ── Exact sizing: 120% height, offset -10% so top is flush ──
          height: '120%',
          top: '-10%',
        }}
      >
        <img
          src="/webp/BANNER.webp"
          alt="Sri Lanka landscape"
          className="w-full h-full object-cover"
          // objectPosition bottom = shows the bottom of image (person/landscape) first
          style={{ objectPosition: 'center bottom' }}
        />
      </motion.div>

      {/* ── Top fade: white → transparent so heading is readable ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60%',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.80) 45%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Bottom: NO overlay — let the image fully show at the bottom ── */}

      {/* ── CONTENT ────────────────────────────────────────────────────── */}
      <div className="rs-body relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Watermark ghost text */}
          <div
            className="rs-display absolute left-0 right-0 text-center pointer-events-none select-none"
            style={{
              fontSize: 'clamp(4.5rem, 13vw, 10rem)',
              fontWeight: 900,
              fontStyle: 'italic',
              color: 'rgba(0,0,0,0.05)',
              lineHeight: 1,
              top: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            real stories
          </div>

          <div className="flex items-center justify-center gap-3 mb-4 relative">
            <span className="h-px w-8 bg-orange-400" />
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
              ✦ Traveler Stories
            </p>
            <span className="h-px w-8 bg-orange-400" />
          </div>

          <h2
            className="rs-display font-bold leading-tight text-gray-900 relative"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Real{' '}
            <em
              style={{
                background: 'linear-gradient(90deg, #F97316, #EA580C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Experiences
            </em>
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed relative">
            Discover the unforgettable journeys of travelers who explored Sri Lanka with Travel Lunatics.
          </p>
        </motion.div>

        {/* ── Testimonial card ── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* ── CARD: reduced opacity (0.55) so background shows through ── */}
            <div
              className="relative rounded-3xl px-8 sm:px-14 py-10 text-center"
              style={{
             // ← transparent card
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.70)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
              }}
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #F97316, #EA580C)',
                    boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                  }}
                >
                  <Quote className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Trip label */}
              <p
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                style={{ color: '#F97316' }}
              >
                &ldquo;{t.trip}&rdquo;
              </p>

              {/* Review */}
              <p
                className="rs-display text-gray-800 leading-relaxed mb-7 mx-auto"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  fontStyle: 'italic',
                  maxWidth: '680px',
                  lineHeight: 1.8,
                }}
              >
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1.5">
                <Stars count={t.rating} />
                <p
                  className="rs-display font-bold text-gray-900 mt-1"
                  style={{ fontSize: '1.05rem' }}
                >
                  — {t.name} —
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-gray-500 text-xs font-medium">
                  <span>{t.flag} {t.country}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                    style={{ background: 'rgba(249,115,22,0.12)', color: '#F97316' }}
                  >
                    {t.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Verified Traveler</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="flex flex-col items-center gap-5 mt-8">
          <div className="flex items-center gap-5">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(0,0,0,0.10)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F97316'
                el.style.borderColor = '#F97316'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.75)'
                el.style.borderColor = 'rgba(0,0,0,0.10)'
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 26 : 7,
                    height: 7,
                    background: i === current
                      ? 'linear-gradient(90deg, #F97316, #EA580C)'
                      : 'rgba(0,0,0,0.18)',
                  }}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(0,0,0,0.10)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F97316'
                el.style.borderColor = '#F97316'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.75)'
                el.style.borderColor = 'rgba(0,0,0,0.10)'
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Counter */}
          <p className="text-xs text-gray-400 font-mono tracking-widest">
            {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </p>

          {/* Progress bar */}
          <div
            className="w-48 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #F97316, #FCD34D)' }}
              animate={{ width: `${((current + 1) / TESTIMONIALS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* ── Image reveal zone — NO content, pure image shows here ──
          This is the "bottom section come from hidden place" area.
          Height controls how much landscape is visible below the card.
      ── */}
      <div style={{ height: '22vh' }} />
    </section>
  )
}