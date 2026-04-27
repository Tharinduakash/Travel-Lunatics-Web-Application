'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  gradient: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Discover Sri Lanka',
    subtitle: 'Iconic Round Tours & Timeless Journeys',
    description: 'From Sigiriya to Ella and golden beaches, explore the island\'s most breathtaking destinations in one unforgettable journey.',
    image: '/webp/pexels-eslames1-32414014.webp',
    buttonText: 'View Packages',
    buttonLink: '/discover-sri-lanka',
    gradient: 'from-black/70 via-black/40 to-transparent',
  },
  {
    id: 2,
    title: 'Spice Trails of Sri Lanka',
    subtitle: 'Taste the Island, Bite by Bite',
    description: 'Dive into rich flavors, vibrant markets, and authentic village cooking experiences across the island.',
    image: '/webp/shutterstock_1050911312.webp',
    buttonText: 'Explore Food Tours',
    buttonLink: '/food-tours',
    gradient: 'from-orange-900/70 via-red-700/40 to-transparent',
  },
  {
    id: 3,
    title: 'Into the Wild',
    subtitle: 'Untamed Safari Adventures',
    description: 'Witness elephants, leopards, and whales in their natural habitats with thrilling wildlife safaris.',
    image: '/webp/shutterstock_495542851.webp',
    buttonText: 'Explore Wildlife Tours',
    buttonLink: '/wildlife-tours',
    gradient: 'from-green-900/70 via-emerald-700/40 to-transparent',
  },
  {
    id: 4,
    title: 'Echoes of the Past',
    subtitle: 'Living Heritage & Ancient Kingdoms',
    description: 'Step into centuries of history with ancient cities, sacred temples, and cultural wonders.',
    image: '/webp/Dambulla Temple 01.webp',
    buttonText: 'Explore Heritage Tours',
    buttonLink: '/cultural-tours',
    gradient: 'from-amber-900/70 via-yellow-700/40 to-transparent',
  },
  {
    id: 5,
    title: 'Sacred Sri Lanka',
    subtitle: 'A Journey Through Spiritual Awakening',
    description: 'Experience deep spirituality through sacred mountains, rituals, and timeless traditions.',
    image: '/webp/sigiriya.webp',
    buttonText: 'Explore Pilgrimage Tours',
    buttonLink: '/sacred-sri-lanka',
    gradient: 'from-purple-900/70 via-indigo-700/40 to-transparent',
  },
  {
    id: 6,
    title: 'Sun, Sand & Serenity',
    subtitle: 'Ultimate Beach Escapes',
    description: 'Relax under swaying palms, swim in turquoise waters, and enjoy peaceful coastal moments.',
    image: '/webp/pexels-tomas-malik-793526-1998439.webp',
    buttonText: 'Explore Beach Tours',
    buttonLink: '/beach-tours',
    gradient: 'from-cyan-900/70 via-blue-700/40 to-transparent',
  },
  {
    id: 7,
    title: 'Live Like a Local',
    subtitle: 'Authentic Village & Cultural Experiences',
    description: 'Connect with local communities, enjoy traditional cooking, and explore real Sri Lankan village life.',
    image: '/webp/Galle-lighthouse2-scaled-1.webp',
    buttonText: 'Explore Local Experiences',
    buttonLink: '/local-experiences',
    gradient: 'from-stone-900/70 via-yellow-800/40 to-transparent',
  },
]

const SLIDE_DURATION = 6000
const TRANSITION_MS  = 1200
const TOTAL          = slides.length

export function HeroSlideshow() {
  const [current, setCurrent]             = useState(0)
  const [prev, setPrev]                   = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  // Single source of truth for "what index are we on" — never stale in closures
  const currentRef      = useRef(0)
  const transitioningRef = useRef(false)
  const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null)
  const transRef        = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Core transition: always reads from currentRef, never from stale closure ──
  const goTo = useCallback((toIndex: number) => {
    if (transitioningRef.current) return

    const fromIndex = currentRef.current
    if (toIndex === fromIndex) return

    transitioningRef.current = true
    setTransitioning(true)
    setPrev(fromIndex)
    currentRef.current = toIndex
    setCurrent(toIndex)

    if (transRef.current) clearTimeout(transRef.current)
    transRef.current = setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
      transitioningRef.current = false
    }, TRANSITION_MS)
  }, [])

  // ── Start (or restart) the auto-play interval ──
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      // Read from ref — always fresh, no stale closure issue
      const next = (currentRef.current + 1) % TOTAL
      goTo(next)
    }, SLIDE_DURATION)
  }, [goTo])

  // ── Mount: kick off auto-play once ──
  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (transRef.current) clearTimeout(transRef.current)
    }
  }, [startTimer])

  // ── Manual dot click ──
  const handleDotClick = useCallback((index: number) => {
    goTo(index)
    startTimer() // reset the auto-play countdown
  }, [goTo, startTimer])

  const slideNum = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .hero-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 500px;
          overflow: hidden;
        }

        /* ── SLIDE LAYERS ───────────────── */
        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
        }
        .hero-slide.leaving {
          z-index: 1;
          animation: heroFadeOut ${TRANSITION_MS}ms ease forwards;
        }
        .hero-slide.entering {
          z-index: 2;
          animation: heroFadeIn ${TRANSITION_MS}ms ease forwards;
        }
        .hero-slide.idle { z-index: 2; }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(1.045); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes heroFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }

        /* ── IMAGE & OVERLAY ────────────── */
        .hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(4,10,22,0.58) 0%,
            rgba(4,10,22,0.18) 35%,
            rgba(4,10,22,0.12) 55%,
            rgba(4,10,22,0.68) 100%
          );
        }

        /* ── CONTENT ────────────────────── */
        .hero-content {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 0 6vw;
          padding-top: 6vh;
        }
        .hero-entering .hero-content {
          animation: contentIn 1.4s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(10px, 1.1vw, 12px);
          font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c6a25c; margin-bottom: 14px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.6);
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-weight: 700;
          font-size: clamp(36px, 5.8vw, 76px);
          color: #fff; line-height: 1.08; letter-spacing: -0.01em;
          margin-bottom: 18px; max-width: 700px;
          text-shadow: 0 4px 28px rgba(0,0,0,0.55);
        }
        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(13px, 1.35vw, 16px);
          font-weight: 300; line-height: 1.75;
          color: rgba(255,255,255,0.76); max-width: 460px;
          margin-bottom: 34px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 30px; border: 1px solid rgba(198,162,92,0.8);
          border-radius: 2px; background: transparent; color: #c6a25c;
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none; cursor: pointer;
          position: relative; overflow: hidden; transition: color 0.35s ease;
        }
        .hero-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #c6a25c; transform: translateX(-102%);
          transition: transform 0.35s cubic-bezier(.4,0,.2,1);
        }
        .hero-cta:hover { color: #0a0f1a; }
        .hero-cta:hover::before { transform: translateX(0); }
        .hero-cta span { position: relative; z-index: 1; }

        /* ── BOTTOM HUD ─────────────────── */
        .hero-hud {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 10;
          display: flex; align-items: flex-end; justify-content: space-between;
          padding: 0 6vw 32px;
        }

        /* Slide counter */
        .hero-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.4);
          line-height: 1;
        }
        .hero-count strong {
          display: block;
          color: #c6a25c; font-size: 22px; font-weight: 700;
          font-family: 'Playfair Display', serif; font-style: italic;
          line-height: 1; margin-bottom: 2px;
        }

        /* Dot indicators — centered */
        .hero-dots {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
        }
        .hero-dot {
          height: 2px; border-radius: 2px;
          background: rgba(255,255,255,0.3);
          border: none; cursor: pointer; padding: 0;
          transition: width 0.4s cubic-bezier(.4,0,.2,1), background 0.4s ease;
          width: 20px;
        }
        .hero-dot.active { width: 44px; background: #c6a25c; }
        .hero-dot:hover:not(.active) { background: rgba(255,255,255,0.6); }

        /* Scroll hint */
        .hero-scroll {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0.5;
        }
        .hero-scroll-text {
          font-family: 'DM Sans', sans-serif; font-size: 9px;
          font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.7); writing-mode: vertical-rl;
        }
        .hero-scroll-line {
          width: 1px; height: 38px;
          background: linear-gradient(180deg, rgba(198,162,92,0.9), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,100% { opacity:0.35; transform:scaleY(1); }
          50%      { opacity:1;    transform:scaleY(0.5); }
        }

        /* Progress bar */
        .hero-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          background: #c6a25c; z-index: 11;
          animation: progressFill ${SLIDE_DURATION}ms linear forwards;
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── MOBILE ─────────────────────── */
        @media (max-width: 768px) {
          .hero-scroll { display: none; }
          .hero-hud { padding-bottom: 28px; }
          .hero-dots { bottom: 26px; }
        }
      `}</style>

      <div className="hero-wrap">

        {/* Outgoing slide */}
        {prev !== null && (
          <div className="hero-slide leaving" key={`prev-${prev}`}>
            <img src={slides[prev].image} alt={slides[prev].title} className="hero-img" />
            <div className="hero-overlay" />
          </div>
        )}

        {/* Active slide */}
        <div
          className={`hero-slide ${transitioning ? 'entering hero-entering' : 'idle'}`}
          key={`curr-${current}`}
        >
          <img src={slides[current].image} alt={slides[current].title} className="hero-img" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">{slides[current].subtitle}</p>
            <h1 className="hero-title">{slides[current].title}</h1>
            <p className="hero-desc">{slides[current].description}</p>
            <a href={slides[current].buttonLink} className="hero-cta">
              <span>{slides[current].buttonText}</span>
            </a>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="hero-hud">
          {/* Slide counter */}
          <div className="hero-count">
            <strong>{slideNum(current + 1)}</strong>
            / {slideNum(TOTAL)}
          </div>

          {/* Dots — absolutely centered */}
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === current ? 'active' : ''}`}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div className="hero-scroll">
            <span className="hero-scroll-text">Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </div>

        {/* Progress bar — key forces re-animation on each slide */}
        <div className="hero-progress" key={`prog-${current}`} />
      </div>
    </>
  )
}