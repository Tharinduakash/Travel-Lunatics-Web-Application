'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

// ── FEATURED (2 hero cards) ──────────────────────────────────────
const FEATURED = [
  {
    id: 'f1',
    category: 'Quick Escape',
    title: 'Sri Lanka in a Flash',
    days: 3,
    nights: 2,
    tagline: '3 Days · 2 Nights Escape',
    description: 'Hit all the iconic highlights — Sigiriya Rock, Dambulla Caves, and the misty jungle — in one perfectly paced long weekend.',
    image: '/webp/sigiriya.webp',
    price: 'From $280',
    badge: 'Most Popular',
    badgeColor: '#c6a25c',
    highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Minneriya Safari', 'Jungle Lodge Stay'],
    buttonText: 'Explore Tour',
    href: '/tours/sri-lanka-flash',
    size: 'large',
  },
  {
    id: 'f2',
    category: 'Cultural Escape',
    title: 'Walk Like a Local',
    days: 4,
    nights: 3,
    tagline: 'Village Life & Cultural Immersion',
    description: 'Cook with village families, harvest spices, ride tuk-tuks through paddy fields, and live the unhurried rhythm of real Sri Lankan life.',
    image: '/webp/image.webp',
    price: 'From $320',
    badge: 'Fan Favourite',
    badgeColor: '#2e7d52',
    highlights: ['Village Cooking Class', 'Paddy Field Walk', 'Local Market Tour', 'Spice Garden'],
    buttonText: 'Explore Experience',
    href: '/experiences/village-life',
    size: 'medium',
  },
]

// ── 3 HIGHLIGHT PACKAGES ─────────────────────────────────────────
const HIGHLIGHT_PKGS = [
  {
    id: 1,
    category: 'Round Tour',
    days: 5, nights: 4,
    title: 'Sri Lanka Highlights',
    subtitle: 'Perfect first taste',
    badge: 'Most Popular',
    price: 'From $480',
    rating: 4.9, reviews: 187,
    groupSize: '2–12',
    image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg',
    highlights: ['Sigiriya Rock Fortress', 'Kandy Temple of Tooth', 'Ella Train Ride', 'Mirissa Beach'],
    description: 'The essential Sri Lanka circuit — ancient rock fortresses, misty hill country, and golden beaches.',
    href: '/tours/highlights',
    accent: '#2e7d52',
  },
  {
    id: 2,
    category: 'Classic Tour',
    days: 10, nights: 9,
    title: 'Classic Sri Lanka',
    subtitle: 'The complete island story',
    badge: 'Bestseller',
    price: 'From $920',
    rating: 4.9, reviews: 341,
    groupSize: '2–8',
    image: '/webp/mirissa-beach.webp',
    highlights: ['Cultural Triangle', 'Hill Country Train', 'Yala Safari', 'Whale Watching'],
    description: 'Culture, wildlife, hill country and beaches — the definitive 10-day journey.',
    href: '/tours/classic',
    accent: '#1565c0',
  },
  {
    id: 3,
    category: 'Bespoke',
    days: 0, nights: 0,
    title: 'Custom Private Tour',
    subtitle: 'Designed just for you',
    badge: 'Bespoke',
    price: 'Custom quote',
    rating: 5.0, reviews: 430,
    groupSize: 'Any size',
    image: '/webp/pexels-ollivves-1078983.jpg',
    highlights: ['Your dates & pace', 'Private guide', 'Flexible itinerary', 'Any budget'],
    description: 'Tell us your dream — we design a completely personalized itinerary around you.',
    href: '/contact',
    accent: '#c6a25c',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export function TourPackagesSection() {
  const [activeCard, setActiveCard] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  // Track which card is visible on mobile scroll
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.scrollWidth / HIGHLIGHT_PKGS.length
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActiveCard(Math.min(idx, HIGHLIGHT_PKGS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className="tps-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,500;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .tps-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f4ef;
          padding: 100px 0 80px;
          overflow: hidden;
          position: relative;
        }
        .tps-root::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse at 20% 0%, rgba(198,162,92,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 100%, rgba(46,125,82,0.04) 0%, transparent 55%);
        }
        .tps-wrap { position: relative; z-index: 1; max-width: 1300px; margin: 0 auto; padding: 0 2rem; }

        /* HEADER */
        .tps-header {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px 80px; align-items: end; margin-bottom: 64px;
        }
        @media (max-width: 768px) { .tps-header { grid-template-columns: 1fr; gap: 20px; margin-bottom: 44px; } }

        .tps-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c6a25c; margin-bottom: 14px;
          display: flex; align-items: center; gap: 12px;
        }
        .tps-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: #c6a25c; }
        .tps-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 4vw, 54px); font-weight: 700; line-height: 1.1;
          color: #1a1209; letter-spacing: -0.01em;
        }
        .tps-heading em { font-style: italic; color: #c6a25c; }
        .tps-sub { font-size: 15px; font-weight: 300; line-height: 1.75; color: #5a5040; max-width: 400px; margin-bottom: 24px; }
        .tps-view-all {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: #1a1209; text-decoration: none; border-bottom: 1.5px solid #1a1209; padding-bottom: 3px;
          transition: color 0.25s, border-color 0.25s, gap 0.25s;
        }
        .tps-view-all:hover { color: #c6a25c; border-color: #c6a25c; gap: 16px; }

        /* FEATURED LABEL */
        .tps-feat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
          color: #9a8870; margin-bottom: 18px;
          display: flex; align-items: center; gap: 12px;
        }
        .tps-feat-label::after { content: ''; flex: 1; height: 1px; background: #e0d8cc; }

        /* FEATURED GRID */
        .tps-feat-grid {
          display: grid; grid-template-columns: 3fr 2fr;
          grid-template-rows: 500px; gap: 14px; margin-bottom: 14px;
        }
        @media (max-width: 900px) { .tps-feat-grid { grid-template-columns: 1fr; grid-template-rows: 360px 300px; } }
        @media (max-width: 500px) { .tps-feat-grid { grid-template-rows: 300px 260px; } }

        /* FEATURED CARD */
        .feat-card {
          position: relative; overflow: hidden; border-radius: 14px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.10);
          transition: box-shadow 0.4s ease;
        }
        .feat-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.17); }
        .feat-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .feat-card:hover .feat-img { transform: scale(1.06); }
        .feat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,8,4,0.06) 0%, rgba(10,8,4,0.15) 40%, rgba(10,8,4,0.74) 100%);
          transition: background 0.4s ease;
        }
        .feat-card:hover .feat-overlay { background: linear-gradient(180deg, rgba(10,8,4,0.1) 0%, rgba(10,8,4,0.22) 40%, rgba(10,8,4,0.82) 100%); }
        .feat-badge {
          position: absolute; top: 18px; left: 18px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 3px; color: #fff;
        }
        .feat-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 26px; display: flex; flex-direction: column; }
        .feat-cat { font-size: 9px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 7px; }
        .feat-title {
          font-family: 'Playfair Display', serif; font-weight: 700; color: #fff;
          line-height: 1.15; letter-spacing: -0.01em; margin-bottom: 6px;
        }
        .feat-card-large .feat-title { font-size: clamp(22px, 2.6vw, 34px); }
        .feat-card-medium .feat-title { font-size: clamp(18px, 2vw, 26px); }
        .feat-tagline { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.55); margin-bottom: 12px; letter-spacing: 0.04em; }
        .feat-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.35s ease; }
        .feat-card:hover .feat-chips { max-height: 70px; opacity: 1; }
        .feat-chip { font-size: 10px; font-weight: 500; padding: 3px 9px; border-radius: 40px; background: rgba(255,255,255,0.11); color: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.16); }
        .feat-desc { font-size: 12.5px; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,0.7); max-width: 400px; margin-bottom: 18px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s ease, opacity 0.35s ease; }
        .feat-card:hover .feat-desc { max-height: 72px; opacity: 1; }
        .feat-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .feat-meta { display: flex; align-items: center; gap: 14px; }
        .feat-days { font-family: 'Playfair Display', serif; font-style: italic; font-size: 24px; font-weight: 700; color: #c6a25c; line-height: 1; }
        .feat-days span { font-family: 'DM Sans', sans-serif; font-style: normal; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.42); display: block; }
        .feat-price-sm { font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.42); display: block; margin-bottom: 2px; }
        .feat-price { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .feat-btn {
          display: inline-flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: 3px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; color: #fff; background: #c6a25c; border: none; cursor: pointer;
          position: relative; overflow: hidden; flex-shrink: 0; transition: gap 0.3s ease;
        }
        .feat-btn::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.14); transform: translateX(-102%); transition: transform 0.3s cubic-bezier(.4,0,.2,1); }
        .feat-btn:hover { gap: 11px; }
        .feat-btn:hover::before { transform: translateX(0); }

        /* DIVIDER */
        .tps-divider { display: flex; align-items: center; gap: 18px; margin: 54px 0 38px; }
        .tps-divider-line { flex: 1; height: 1px; background: #e0d8cc; }
        .tps-divider-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: 20px; font-weight: 600; color: #1a1209; white-space: nowrap; }

        /* PKG GRID */
        .tps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 1024px) { .tps-grid { grid-template-columns: repeat(2, 1fr); } }

        /* Mobile: horizontal scroll — one card visible at a time */
        @media (max-width: 600px) {
          .tps-grid-scroll-wrap {
            position: relative;
            margin: 0 -1rem; /* bleed to screen edges */
          }
          .tps-grid {
            display: flex;
            flex-direction: row;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding: 4px 1rem 16px;
          }
          .tps-grid::-webkit-scrollbar { display: none; }
          .tps-grid .pkg-card {
            flex: 0 0 82vw;
            max-width: 320px;
            scroll-snap-align: start;
          }
          /* Scroll hint dots */
          .tps-scroll-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 4px;
          }
          .tps-scroll-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #e0d8cc; transition: background 0.3s, width 0.3s;
          }
          .tps-scroll-dot.active { background: #c6a25c; width: 18px; border-radius: 3px; }
          /* Scroll label */
          .tps-scroll-label {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
            color: #9a8870; margin-bottom: 12px;
          }
          .tps-scroll-label::before, .tps-scroll-label::after {
            content: ''; display: block; width: 20px; height: 1px; background: #e0d8cc;
          }
        }
        @media (min-width: 601px) {
          .tps-grid-scroll-wrap { display: contents; }
          .tps-scroll-label, .tps-scroll-dots { display: none; }
        }

        /* PKG CARD */
        .pkg-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s ease; }
        .pkg-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.10); }
        .pkg-img-wrap { position: relative; height: 195px; overflow: hidden; }
        .pkg-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
        .pkg-card:hover .pkg-img { transform: scale(1.07); }
        .pkg-img-over { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.42) 100%); }
        .pkg-badge-tag { position: absolute; top: 13px; left: 13px; font-size: 9px; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; padding: 5px 11px; border-radius: 3px; background: #fff; color: #1a1209; }
        .pkg-day-tag { position: absolute; bottom: 13px; right: 13px; font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; font-weight: 700; color: #fff; line-height: 1; text-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .pkg-day-tag small { font-family: 'DM Sans', sans-serif; font-style: normal; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); display: block; }
        .pkg-body { padding: 20px 20px 18px; }
        .pkg-cat { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 7px; }
        .pkg-title { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: #1a1209; line-height: 1.2; margin-bottom: 5px; }
        .pkg-sub { font-size: 11.5px; color: #9a8870; font-weight: 400; margin-bottom: 11px; }
        .pkg-desc { font-size: 12.5px; font-weight: 300; line-height: 1.65; color: #5a5040; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pkg-hls { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f0ebe3; }
        .pkg-hl { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #5a5040; }
        .pkg-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .pkg-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; font-size: 11.5px; color: #9a8870; }
        .pkg-meta-it { display: flex; align-items: center; gap: 4px; }
        .pkg-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .pkg-price-lbl { font-size: 9.5px; color: #9a8870; margin-bottom: 2px; }
        .pkg-price { font-size: 17px; font-weight: 700; color: #1a1209; line-height: 1; }
        .pkg-cta {
          display: inline-flex; align-items: center; gap: 5px; padding: 10px 16px; border-radius: 3px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
          text-decoration: none; color: #fff; border: none; cursor: pointer;
          position: relative; overflow: hidden; transition: gap 0.25s ease; white-space: nowrap;
        }
        .pkg-cta::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.14); transform: translateX(-102%); transition: transform 0.25s cubic-bezier(.4,0,.2,1); }
        .pkg-cta:hover { gap: 9px; }
        .pkg-cta:hover::before { transform: translateX(0); }
        .pkg-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 5px; }

        /* BANNER — gold/dark matching website palette */
        .tps-banner {
          margin-top: 52px; border-radius: 14px;
          background: linear-gradient(120deg, #1a1209 0%, #2c1e08 45%, #1a1209 100%);
          padding: 50px 56px;
          display: flex; align-items: center; justify-content: space-between; gap: 28px;
          position: relative; overflow: hidden;
        }
        .tps-banner::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 65% 50%, rgba(198,162,92,0.16) 0%, transparent 60%),
                      radial-gradient(ellipse at 10% 80%, rgba(198,162,92,0.06) 0%, transparent 40%);
        }
        /* gold accent line at top */
        .tps-banner::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #c6a25c 30%, #e8c97a 50%, #c6a25c 70%, transparent);
        }
        @media (max-width: 700px) { .tps-banner { flex-direction: column; padding: 36px 28px; } }
        .tps-banner-inner { position: relative; z-index: 1; }
        .tps-banner-ey { font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #c6a25c; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .tps-banner-ey::before { content: ''; display: block; width: 24px; height: 1.5px; background: #c6a25c; }
        .tps-banner-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(22px, 2.8vw, 32px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .tps-banner-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); max-width: 380px; line-height: 1.65; }
        .tps-banner-btn {
          position: relative; z-index: 1; flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px; border-radius: 3px; border: 1px solid rgba(198,162,92,0.6);
          background: transparent; color: #c6a25c;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; overflow: hidden; transition: color 0.35s ease, gap 0.3s ease;
          white-space: nowrap;
        }
        .tps-banner-btn::before { content: ''; position: absolute; inset: 0; background: #c6a25c; transform: translateX(-102%); transition: transform 0.32s cubic-bezier(.4,0,.2,1); }
        .tps-banner-btn:hover { color: #1a1209; gap: 16px; }
        .tps-banner-btn:hover::before { transform: translateX(0); }
        .tps-banner-btn span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }

        @media (max-width: 480px) {
          .tps-root { padding: 60px 0 52px; }
          .feat-body { padding: 18px; }
          .pkg-body { padding: 15px; }
          .tps-banner { padding: 26px 20px; }
        }
      `}</style>

      <div className="tps-wrap">

        {/* HEADER */}
        <motion.div className="tps-header" {...fadeUp()}>
          <div>
            <p className="tps-eyebrow">Trending Journeys</p>
            <h2 className="tps-heading">Journeys Travelers <em>Love</em></h2>
          </div>
          <div>
            <p className="tps-sub">Flexible itineraries crafted for every kind of traveller — from quick weekend escapes to epic month-long odysseys across the island.</p>
            <Link href="/tours" className="tps-view-all">Browse all packages <ArrowRight size={13} /></Link>
          </div>
        </motion.div>

        {/* FEATURED LABEL */}
        <motion.p className="tps-feat-label" {...fadeUp(0.08)}>Featured Picks</motion.p>

        {/* FEATURED GRID */}
        <motion.div className="tps-feat-grid" {...fadeUp(0.12)}>
          {FEATURED.map((f) => (
            <div key={f.id} className={`feat-card feat-card-${f.size}`}>
              <img src={f.image} alt={f.title} className="feat-img" />
              <div className="feat-overlay" />
              <div className="feat-badge" style={{ background: f.badgeColor }}>{f.badge}</div>
              <div className="feat-body">
                <p className="feat-cat">{f.category}</p>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-tagline">{f.tagline}</p>
                <div className="feat-chips">
                  {f.highlights.map((h, i) => <span key={i} className="feat-chip">{h}</span>)}
                </div>
                <p className="feat-desc">{f.description}</p>
                <div className="feat-footer">
                  <div className="feat-meta">
                    <div className="feat-days">{f.days}<span>Days</span></div>
                    <div>
                      <span className="feat-price-sm">Starting from</span>
                      <p className="feat-price">{f.price}</p>
                    </div>
                  </div>
                  <Link href={f.href} className="feat-btn">
                    <Plus size={12} />{f.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <motion.div className="tps-divider" {...fadeUp(0.08)}>
          <div className="tps-divider-line" />
          <span className="tps-divider-text">Popular Packages</span>
          <div className="tps-divider-line" />
        </motion.div>

        {/* 3 PKG CARDS */}
        <div className="tps-grid-scroll-wrap">
          <p className="tps-scroll-label">Swipe to explore</p>
          <div className="tps-grid" ref={gridRef}>
            {HIGHLIGHT_PKGS.map((pkg, i) => (
            <motion.div key={pkg.id} className="pkg-card" {...fadeUp(i * 0.08)}>
              <div className="pkg-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="pkg-img" />
                <div className="pkg-img-over" />
                <div className="pkg-badge-tag">{pkg.badge}</div>
                {pkg.days > 0 ? (
                  <div className="pkg-day-tag">{pkg.nights}N / {pkg.days}D<small>Nights & Days</small></div>
                ) : (
                  <div className="pkg-day-tag">✦<small>Flexible</small></div>
                )}
              </div>
              <div className="pkg-body">
                <p className="pkg-cat" style={{ color: pkg.accent }}>{pkg.category}</p>
                <h3 className="pkg-title">{pkg.title}</h3>
                <p className="pkg-sub">{pkg.subtitle}</p>
                <p className="pkg-desc">{pkg.description}</p>
                <div className="pkg-hls">
                  {pkg.highlights.map((h, j) => (
                    <div key={j} className="pkg-hl">
                      <div className="pkg-dot" style={{ background: pkg.accent }} />{h}
                    </div>
                  ))}
                </div>
                <div className="pkg-meta">
                  <div className="pkg-meta-it">
                    <Star size={11} fill={pkg.accent} style={{ color: pkg.accent }} />
                    <span style={{ color: '#1a1209', fontWeight: 600 }}>{pkg.rating}</span>
                    <span>({pkg.reviews})</span>
                  </div>
                  <div className="pkg-meta-it"><Users size={11} /><span>{pkg.groupSize} pax</span></div>
                  {pkg.days > 0 && <div className="pkg-meta-it"><Clock size={11} /><span>{pkg.days} days</span></div>}
                </div>
                <div className="pkg-footer">
                  <div>
                    <p className="pkg-price-lbl">Starting from</p>
                    <p className="pkg-price">{pkg.price}</p>
                  </div>
                  <Link href={pkg.href} className="pkg-cta" style={{ background: pkg.accent }}>
                    <span>Enquire <ArrowRight size={11} /></span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
          {/* Dot indicators — mobile only */}
          <div className="tps-scroll-dots">
            {HIGHLIGHT_PKGS.map((_, i) => (
              <button
                key={i}
                className={`tps-scroll-dot ${i === activeCard ? 'active' : ''}`}
                onClick={() => {
                  const el = gridRef.current
                  if (!el) return
                  const cardWidth = el.scrollWidth / HIGHLIGHT_PKGS.length
                  el.scrollTo({ left: cardWidth * i, behavior: 'smooth' })
                  setActiveCard(i)
                }}
                aria-label={`Package ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* BANNER */}
        <motion.div className="tps-banner" {...fadeUp(0.08)}>
          <div className="tps-banner-inner">
            <p className="tps-banner-ey">Not sure where to start?</p>
            <h3 className="tps-banner-title">Let us design your perfect<br />Sri Lanka journey</h3>
            <p className="tps-banner-sub">Our travel experts craft a personalised itinerary around your interests, pace, and budget — completely free.</p>
          </div>
          <Link href="/contact" className="tps-banner-btn">
            <span>Talk to our team <ArrowRight size={14} /></span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}