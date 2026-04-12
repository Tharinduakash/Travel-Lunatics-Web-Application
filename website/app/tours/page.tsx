'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Users, Star, ArrowRight, Check, ChevronDown, MapPin, Shield, Phone } from 'lucide-react'
import Link from 'next/link'

// ─── ALL PACKAGES ────────────────────────────────────────────────
const ALL_PACKAGES = [
  {
    id: 1,
    category: 'Round Tour',
    filter: 'round',
    days: 5, nights: 4,
    title: 'Sri Lanka Highlights',
    subtitle: 'Perfect first taste',
    badge: 'Most Popular',
    price: 'From $480',
    priceNum: 480,
    rating: 4.9, reviews: 187,
    groupSize: '2–12',
    image: '/webp/sigiriya2.webp',
    highlights: ['Sigiriya Rock Fortress', 'Kandy Temple of Tooth', 'Ella Train Ride', 'Mirissa Beach', 'Galle Fort'],
    description: 'The essential Sri Lanka circuit — ancient rock fortresses, misty hill country, and golden beaches in five unforgettable days.',
    href: '/tours/highlights',
    accent: '#2e7d52',
    featured: true,
  },
  {
    id: 2,
    category: 'Heritage Tour',
    filter: 'heritage',
    days: 7, nights: 6,
    title: 'Cultural Discovery',
    subtitle: 'Deep history & heritage',
    badge: 'Best Value',
    price: 'From $650',
    priceNum: 650,
    rating: 4.8, reviews: 214,
    groupSize: '2–10',
    image: '/webp/dambulla2.webp',
    highlights: ['Ancient Cultural Triangle', 'Dambulla Cave Temples', 'Polonnaruwa Ruins', 'Peradeniya Gardens', 'Cooking Class', 'Village Life'],
    description: 'Immerse yourself in 2,500 years of history — ancient cities, cave temples, and authentic village experiences.',
    href: '/tours/cultural',
    accent: '#a0522d',
    featured: false,
  },
  {
    id: 3,
    category: 'Classic Tour',
    filter: 'classic',
    days: 10, nights: 9,
    title: 'Classic Sri Lanka',
    subtitle: 'The complete island story',
    badge: 'Bestseller',
    price: 'From $920',
    priceNum: 920,
    rating: 4.9, reviews: 341,
    groupSize: '2–8',
    image: '/webp/mirissa-beach.webp',
    highlights: ['Full Cultural Triangle', 'Hill Country Train Ride', 'Tea Plantations', 'Yala Wildlife Safari', 'South Coast Beaches', 'Whale Watching'],
    description: 'Culture, wildlife, hill country and beaches — the definitive 10-day journey through Sri Lanka\'s greatest hits.',
    href: '/tours/classic',
    accent: '#1565c0',
    featured: true,
  },
  {
    id: 4,
    category: 'Premium Tour',
    filter: 'premium',
    days: 14, nights: 13,
    title: 'Grand Sri Lanka',
    subtitle: 'North to south immersion',
    badge: 'Premium',
    price: 'From $1,280',
    priceNum: 1280,
    rating: 5.0, reviews: 98,
    groupSize: '2–6',
    image: '/webp/knuckles1.webp',
    highlights: ['Jaffna & The North', 'Full Cultural Triangle', 'Knuckles Trekking', 'All Wildlife Parks', 'East Coast Beaches', 'Village Cooking'],
    description: 'From the ancient north to the tropical south — a 14-day odyssey covering every corner of the island.',
    href: '/tours/grand',
    accent: '#6a1b9a',
    featured: false,
  },
  {
    id: 5,
    category: 'Luxury Tour',
    filter: 'luxury',
    days: 18, nights: 17,
    title: 'Ultimate Experience',
    subtitle: 'Sri Lanka without limits',
    badge: 'Luxury',
    price: 'From $1,680',
    priceNum: 1680,
    rating: 5.0, reviews: 54,
    groupSize: '2–4',
    image: '/webp/l3.webp',
    highlights: ['Every region covered', 'Island & boat trips', 'All wildlife parks', 'Ayurveda retreat', 'Private experiences', 'Luxury properties'],
    description: 'The most comprehensive Sri Lanka experience — 18 days of luxury, adventure, culture and nature with nothing left out.',
    href: '/tours/ultimate',
    accent: '#b8860b',
    featured: false,
  },
  {
    id: 6,
    category: 'Round Tour',
    filter: 'round',
    days: 8, nights: 7,
    title: 'Island Essentials',
    subtitle: 'Best of all worlds',
    badge: 'Great Choice',
    price: 'From $740',
    priceNum: 740,
    rating: 4.8, reviews: 162,
    groupSize: '2–10',
    image: '/webp/shutterstock_495542851.webp',
    highlights: ['Sigiriya Rock', 'Kandy City', 'Ella Hill Country', 'Udawalawe Safari', 'South Coast Beaches'],
    description: 'Eight days hitting the best of Sri Lanka — history, wildlife, hill country, and beaches in a perfectly paced loop.',
    href: '/tours/island-essentials',
    accent: '#2e7d52',
    featured: false,
  },
  {
    id: 7,
    category: 'Heritage Tour',
    filter: 'heritage',
    days: 5, nights: 4,
    title: 'Ancient Kingdoms',
    subtitle: 'Sacred sites & temples',
    badge: 'History Pick',
    price: 'From $420',
    priceNum: 420,
    rating: 4.7, reviews: 89,
    groupSize: '2–12',
    image: '/webp/50554486_374109793377333_1796786361257164800_n.webp',
    highlights: ['Anuradhapura Sacred City', 'Polonnaruwa Ruins', 'Dambulla Caves', 'Mihintale Temple', 'Ancient Stupas'],
    description: 'A focused deep-dive into Sri Lanka\'s ancient kingdoms — sacred cities, towering stupas and rock-cut temples.',
    href: '/tours/ancient-kingdoms',
    accent: '#a0522d',
    featured: false,
  },
  {
    id: 8,
    category: 'Honeymoon',
    filter: 'honeymoon',
    days: 10, nights: 9,
    title: 'Romance in Paradise',
    subtitle: 'Love & luxury combined',
    badge: 'Couples Favourite',
    price: 'From $1,100',
    priceNum: 1100,
    rating: 5.0, reviews: 76,
    groupSize: '2',
    image: '/webp/personal.webp',
    highlights: ['Private beach resort', 'Couple spa & Ayurveda', 'Sunset sailing', 'Candle-lit dinners', 'Hill country retreat', 'Whale watching'],
    description: 'A romantic island escape — intimate resorts, private beaches, sunset sailboats and hill-country hideaways for two.',
    href: '/tours/romance',
    accent: '#c2185b',
    featured: true,
  },
  {
    id: 9,
    category: 'Bespoke',
    filter: 'bespoke',
    days: 0, nights: 0,
    title: 'Custom Private Tour',
    subtitle: 'Designed just for you',
    badge: 'Bespoke',
    price: 'Custom quote',
    priceNum: 0,
    rating: 5.0, reviews: 430,
    groupSize: 'Any size',
    image: '/webp/pexels-ollivves-1078983.jpg',
    highlights: ['Your dates & pace', 'Private expert guide', 'Flexible itinerary', 'Any destinations', 'Any budget range', 'Family or solo friendly'],
    description: 'Tell us your dream Sri Lanka — we design a completely personalized itinerary around your interests, pace, and budget.',
    href: '/contact',
    accent: '#c6a25c',
    featured: false,
  },
]

const FILTERS = [
  { key: 'all',       label: 'All Tours' },
  { key: 'round',     label: 'Round Tours' },
  { key: 'classic',   label: 'Classic' },
  { key: 'heritage',  label: 'Heritage' },
  { key: 'premium',   label: 'Premium' },
  { key: 'luxury',    label: 'Luxury' },
  { key: 'honeymoon', label: 'Honeymoon' },
  { key: 'bespoke',   label: 'Bespoke' },
]

const SORT_OPTIONS = [
  { key: 'popular',  label: 'Most Popular' },
  { key: 'price_asc', label: 'Price: Low → High' },
  { key: 'price_desc', label: 'Price: High → Low' },
  { key: 'duration', label: 'Duration' },
]

const PROCESS = [
  { step: '01', title: 'Choose Your Style', desc: 'Browse our curated packages or tell us your dream itinerary. No pressure — just inspiration.' },
  { step: '02', title: 'Custom Quote', desc: 'Our experts tailor every detail — dates, hotels, activities — and send you a free, no-obligation quote.' },
  { step: '03', title: 'Book with Confidence', desc: 'Secure your trip with a small deposit. We handle all logistics, visas, and on-ground arrangements.' },
  { step: '04', title: 'Travel & Enjoy', desc: 'Your private guide meets you at the airport. Sit back and let us create memories that last a lifetime.' },
]

const FAQS = [
  { q: 'Are these private tours or group tours?', a: 'All our standard packages are run as private tours — your family or group only, with a dedicated guide and vehicle. We do not mix strangers into the same vehicle.' },
  { q: 'Can I customise any of these itineraries?', a: 'Absolutely. Every package is a starting point. We can extend, shorten, add activities, upgrade hotels, or redesign the route entirely around your preferences.' },
  { q: 'What is included in the price?', a: 'Prices include accommodation, private air-conditioned vehicle, expert guide, entrance fees listed, and daily breakfast. International flights are not included.' },
  { q: 'When is the best time to visit Sri Lanka?', a: 'Sri Lanka has two monsoon seasons so the "best" time depends on which coast you visit. December–April is ideal for the south & west; May–September suits the east & north. We can advise based on your dates.' },
  { q: 'Do you offer travel insurance?', a: 'We strongly recommend travel insurance and can connect you with trusted providers. We also offer a flexible cancellation policy with full credit for rescheduling.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function ToursPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort]     = useState('popular')
  const [sortOpen, setSortOpen]         = useState(false)
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [hoveredId, setHoveredId]       = useState<number | null>(null)

  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? ALL_PACKAGES
      : ALL_PACKAGES.filter(p => p.filter === activeFilter)

    if (activeSort === 'price_asc')  list = [...list].sort((a, b) => a.priceNum - b.priceNum)
    if (activeSort === 'price_desc') list = [...list].sort((a, b) => b.priceNum - a.priceNum)
    if (activeSort === 'duration')   list = [...list].sort((a, b) => b.days - a.days)
    if (activeSort === 'popular')    list = [...list].sort((a, b) => b.reviews - a.reviews)
    return list
  }, [activeFilter, activeSort])

  return (
    <main className="tours-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        .tours-root { font-family: 'DM Sans', sans-serif; background: #f7f4ef; min-height: 100vh; }

        /* ── HERO ───────────────────────────── */
        .th-hero {
          position: relative; height: 52vh; min-height: 380px;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden;
        }
        .th-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
        .th-hero-over {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,8,4,0.35) 0%, rgba(10,8,4,0.18) 40%, rgba(10,8,4,0.75) 100%);
        }
        /* gold accent line at bottom of hero */
        .th-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #c6a25c 30%, #e8c97a 50%, #c6a25c 70%, transparent); }
        .th-hero-content { position: relative; z-index: 2; max-width: 1300px; margin: 0 auto; padding: 0 2rem 56px; width: 100%; }
        .th-breadcrumb { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .th-breadcrumb a { color: #c6a25c; text-decoration: none; }
        .th-hero-ey { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #c6a25c; margin-bottom: 12px; }
        .th-hero-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(36px, 5vw, 64px); font-weight: 700; color: #fff; line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 12px; }
        .th-hero-sub { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.65); max-width: 500px; line-height: 1.65; }

        /* ── STATS STRIP ────────────────────── */
        .th-stats {
          background: #fff; border-bottom: 1px solid #e8e2d8;
          padding: 0 2rem;
        }
        .th-stats-inner {
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        @media (max-width: 640px) { .th-stats-inner { grid-template-columns: repeat(2, 1fr); } }
        .th-stat {
          padding: 28px 24px; text-align: center;
          border-right: 1px solid #e8e2d8;
        }
        .th-stat:last-child { border-right: none; }
        .th-stat-num { font-family: 'Playfair Display', serif; font-style: italic; font-size: 36px; font-weight: 700; color: #c6a25c; line-height: 1; }
        .th-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9a8870; margin-top: 4px; }

        /* ── MAIN CONTENT ───────────────────── */
        .th-main { max-width: 1300px; margin: 0 auto; padding: 56px 2rem 80px; }

        /* ── FILTER BAR ─────────────────────── */
        .th-filter-bar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; margin-bottom: 40px; flex-wrap: wrap;
        }
        .th-filters { display: flex; flex-wrap: wrap; gap: 8px; }
        .th-filter-btn {
          padding: 9px 18px; border-radius: 3px; border: 1.5px solid #e0d8cc;
          background: transparent; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: #5a5040; cursor: pointer; transition: all 0.22s ease; white-space: nowrap;
        }
        .th-filter-btn:hover { border-color: #c6a25c; color: #c6a25c; }
        .th-filter-btn.active { background: #c6a25c; border-color: #c6a25c; color: #fff; }

        /* Sort dropdown */
        .th-sort { position: relative; }
        .th-sort-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 3px; border: 1.5px solid #e0d8cc;
          background: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: #5a5040; cursor: pointer; transition: all 0.22s ease; white-space: nowrap;
        }
        .th-sort-btn:hover { border-color: #c6a25c; color: #c6a25c; }
        .th-sort-drop {
          position: absolute; top: calc(100% + 6px); right: 0;
          background: #fff; border: 1px solid #e0d8cc; border-radius: 6px;
          min-width: 180px; overflow: hidden;
          opacity: 0; visibility: hidden; transform: translateY(-6px);
          transition: all 0.22s ease; z-index: 50;
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
        }
        .th-sort-drop.open { opacity: 1; visibility: visible; transform: translateY(0); }
        .th-sort-opt {
          display: block; width: 100%; padding: 11px 16px; border: none; background: none;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          color: #5a5040; text-align: left; cursor: pointer; border-bottom: 1px solid #f0ebe3;
          transition: all 0.18s ease;
        }
        .th-sort-opt:last-child { border-bottom: none; }
        .th-sort-opt:hover { background: #faf6f0; color: #c6a25c; padding-left: 22px; }
        .th-sort-opt.active { color: #c6a25c; font-weight: 700; background: #faf6f0; }

        /* Result count */
        .th-count { font-size: 13px; color: #9a8870; }
        .th-count strong { color: #1a1209; }

        /* ── PACKAGES GRID ──────────────────── */
        .th-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        @media (max-width: 1024px) { .th-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .th-grid { grid-template-columns: 1fr; } }

        /* ── PACKAGE CARD ───────────────────── */
        .th-card {
          background: #fff; border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s ease;
          display: flex; flex-direction: column;
        }
        .th-card:hover { transform: translateY(-7px); box-shadow: 0 24px 56px rgba(0,0,0,0.11); }
        .th-card.featured { border-color: rgba(198,162,92,0.3); }

        .th-card-img-wrap { position: relative; height: 210px; overflow: hidden; flex-shrink: 0; }
        .th-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .th-card:hover .th-card-img { transform: scale(1.07); }
        .th-card-img-over { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.45) 100%); }

        .th-card-badge {
          position: absolute; top: 14px; left: 14px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 3px; background: #fff; color: #1a1209;
        }
        .th-card.featured .th-card-badge { background: #c6a25c; color: #fff; }

        .th-card-dur {
          position: absolute; bottom: 14px; right: 14px;
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 19px; font-weight: 700; color: #fff; line-height: 1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .th-card-dur small { font-family: 'DM Sans', sans-serif; font-style: normal; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); display: block; }

        .th-card-body { padding: 22px; display: flex; flex-direction: column; flex: 1; }
        .th-card-cat { font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 7px; }
        .th-card-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #1a1209; line-height: 1.2; margin-bottom: 5px; }
        .th-card-sub { font-size: 12px; color: #9a8870; margin-bottom: 12px; }
        .th-card-desc { font-size: 13px; font-weight: 300; line-height: 1.65; color: #5a5040; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .th-card-hls { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid #f0ebe3; flex: 1; }
        .th-card-hl { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #5a5040; }
        .th-card-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        .th-card-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; font-size: 12px; color: #9a8870; }
        .th-card-mi { display: flex; align-items: center; gap: 4px; }

        .th-card-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .th-card-price-lbl { font-size: 9.5px; color: #9a8870; margin-bottom: 2px; }
        .th-card-price { font-size: 18px; font-weight: 700; color: #1a1209; line-height: 1; }
        .th-card-cta {
          display: inline-flex; align-items: center; gap: 5px; padding: 11px 18px; border-radius: 3px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; color: #fff; cursor: pointer;
          position: relative; overflow: hidden; transition: gap 0.25s ease; white-space: nowrap;
        }
        .th-card-cta::before { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.15); transform: translateX(-102%); transition: transform 0.25s cubic-bezier(.4,0,.2,1); }
        .th-card-cta:hover { gap: 9px; }
        .th-card-cta:hover::before { transform: translateX(0); }
        .th-card-cta span { position: relative; z-index: 1; display: flex; align-items: center; gap: 5px; }

        /* ── PROCESS SECTION ────────────────── */
        .th-process { background: #fff; padding: 80px 2rem; border-top: 1px solid #e8e2d8; border-bottom: 1px solid #e8e2d8; }
        .th-process-inner { max-width: 1300px; margin: 0 auto; }
        .th-process-hdr { text-align: center; margin-bottom: 56px; }
        .th-process-ey { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #c6a25c; margin-bottom: 12px; }
        .th-process-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; color: #1a1209; }
        .th-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        @media (max-width: 900px) { .th-process-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .th-process-grid { grid-template-columns: 1fr; } }

        .th-proc-card { position: relative; padding: 32px 24px; border-radius: 12px; background: #f7f4ef; border: 1px solid #e8e2d8; }
        .th-proc-step { font-family: 'Playfair Display', serif; font-style: italic; font-size: 52px; font-weight: 700; color: rgba(198,162,92,0.18); line-height: 1; margin-bottom: 16px; }
        .th-proc-icon { width: 44px; height: 44px; border-radius: 50%; background: rgba(198,162,92,0.12); border: 1.5px solid rgba(198,162,92,0.3); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #c6a25c; }
        .th-proc-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1a1209; margin-bottom: 10px; }
        .th-proc-desc { font-size: 13px; font-weight: 300; line-height: 1.7; color: #5a5040; }
        /* connector line */
        .th-proc-card::after { content: '→'; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); color: #c6a25c; font-size: 18px; opacity: 0.5; }
        .th-proc-card:last-child::after { display: none; }
        @media (max-width: 900px) { .th-proc-card::after { display: none; } }

        /* ── WHY US STRIP ───────────────────── */
        .th-why { padding: 72px 2rem; background: #f7f4ef; }
        .th-why-inner { max-width: 1300px; margin: 0 auto; }
        .th-why-hdr { display: flex; align-items: end; justify-content: space-between; gap: 32px; margin-bottom: 48px; flex-wrap: wrap; }
        .th-why-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(28px, 3.5vw, 42px); font-weight: 700; color: #1a1209; }
        .th-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .th-why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .th-why-grid { grid-template-columns: 1fr; } }
        .th-why-item { padding: 28px 24px; background: #fff; border-radius: 12px; border: 1px solid #e8e2d8; }
        .th-why-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; background: rgba(198,162,92,0.1); color: #c6a25c; }
        .th-why-item-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #1a1209; margin-bottom: 8px; }
        .th-why-item-desc { font-size: 13px; font-weight: 300; line-height: 1.68; color: #5a5040; }

        /* ── FAQ ────────────────────────────── */
        .th-faq { padding: 72px 2rem; background: #fff; border-top: 1px solid #e8e2d8; }
        .th-faq-inner { max-width: 860px; margin: 0 auto; }
        .th-faq-hdr { text-align: center; margin-bottom: 48px; }
        .th-faq-ey { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #c6a25c; margin-bottom: 12px; }
        .th-faq-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(26px, 3vw, 40px); font-weight: 700; color: #1a1209; }
        .th-faq-item { border-bottom: 1px solid #e8e2d8; overflow: hidden; }
        .th-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 22px 0; background: none; border: none; cursor: pointer; text-align: left;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: #1a1209;
          transition: color 0.22s ease;
        }
        .th-faq-q:hover { color: #c6a25c; }
        .th-faq-q svg { flex-shrink: 0; color: #c6a25c; transition: transform 0.3s ease; }
        .th-faq-q.open svg { transform: rotate(180deg); }
        .th-faq-a { font-size: 14px; font-weight: 300; line-height: 1.75; color: #5a5040; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s ease; }
        .th-faq-a.open { max-height: 200px; padding-bottom: 20px; }

        /* ── BOTTOM CTA BANNER ──────────────── */
        .th-banner {
          margin: 0; padding: 72px 2rem;
          background: linear-gradient(120deg, #1a1209 0%, #2c1e08 45%, #1a1209 100%);
          position: relative; overflow: hidden;
        }
        .th-banner::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(198,162,92,0.16) 0%, transparent 58%),
                      radial-gradient(ellipse at 15% 80%, rgba(198,162,92,0.06) 0%, transparent 40%);
        }
        .th-banner::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #c6a25c 30%, #e8c97a 50%, #c6a25c 70%, transparent); }
        .th-banner-inner { position: relative; z-index: 1; max-width: 1300px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
        .th-banner-ey { font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #c6a25c; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .th-banner-ey::before { content: ''; display: block; width: 24px; height: 1.5px; background: #c6a25c; }
        .th-banner-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(24px, 3vw, 38px); font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 10px; }
        .th-banner-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); max-width: 400px; line-height: 1.65; }
        .th-banner-actions { display: flex; flex-direction: column; gap: 14px; flex-shrink: 0; }
        .th-banner-btn-gold {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px; border-radius: 3px; border: 1px solid rgba(198,162,92,0.6);
          background: transparent; color: #c6a25c;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; overflow: hidden; white-space: nowrap;
          position: relative; transition: color 0.35s ease, gap 0.3s ease;
        }
        .th-banner-btn-gold::before { content: ''; position: absolute; inset: 0; background: #c6a25c; transform: translateX(-102%); transition: transform 0.32s cubic-bezier(.4,0,.2,1); }
        .th-banner-btn-gold:hover { color: #1a1209; gap: 16px; }
        .th-banner-btn-gold:hover::before { transform: translateX(0); }
        .th-banner-btn-gold span { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }
        .th-banner-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.2);
          background: transparent; color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s ease; white-space: nowrap;
        }
        .th-banner-btn-outline:hover { border-color: rgba(255,255,255,0.5); color: #fff; }

        /* empty state */
        .th-empty { grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #9a8870; font-size: 15px; font-style: italic; }

        @media (max-width: 480px) {
          .th-hero-content { padding-bottom: 40px; }
          .th-main { padding: 40px 1.25rem 60px; }
          .th-process { padding: 56px 1.25rem; }
          .th-why { padding: 52px 1.25rem; }
          .th-faq { padding: 52px 1.25rem; }
          .th-banner { padding: 52px 1.25rem; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="th-hero">
        <img src="/webp/train.webp" alt="Sri Lanka Tours" className="th-hero-img" />
        <div className="th-hero-over" />
        <div className="th-hero-content">
          <div className="th-breadcrumb">
            <Link href="/">Home</Link> / Tours
          </div>
          <p className="th-hero-ey">Explore Sri Lanka</p>
          <h1 className="th-hero-title">Our Tour Packages</h1>
          <p className="th-hero-sub">From 3-day escapes to 18-day odysseys — every journey is private, personalized, and expertly guided.</p>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────── */}
      <div className="th-stats">
        <div className="th-stats-inner">
          {[
            { num: '9+',   label: 'Tour Packages' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '1,200+', label: 'Happy Travelers' },
            { num: '100%', label: 'Private Tours' },
          ].map((s) => (
            <div key={s.label} className="th-stat">
              <div className="th-stat-num">{s.num}</div>
              <div className="th-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PACKAGES ──────────────────────────────── */}
      <div className="th-main">

        {/* Filter + Sort bar */}
        <motion.div className="th-filter-bar" {...fadeUp()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="th-filters">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`th-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="th-count">Showing <strong>{filtered.length}</strong> packages</p>
          </div>

          <div className="th-sort">
            <button className="th-sort-btn" onClick={() => setSortOpen(!sortOpen)}>
              Sort: {SORT_OPTIONS.find(o => o.key === activeSort)?.label}
              <ChevronDown size={13} style={{ transform: sortOpen ? 'rotate(180deg)' : '', transition: 'transform 0.25s' }} />
            </button>
            <div className={`th-sort-drop ${sortOpen ? 'open' : ''}`}>
              {SORT_OPTIONS.map((o) => (
                <button key={o.key} className={`th-sort-opt ${activeSort === o.key ? 'active' : ''}`}
                  onClick={() => { setActiveSort(o.key); setSortOpen(false) }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="th-grid">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <p className="th-empty">No packages found for this filter.</p>
            ) : filtered.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className={`th-card ${pkg.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(pkg.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="th-card-img-wrap">
                  <img src={pkg.image} alt={pkg.title} className="th-card-img" />
                  <div className="th-card-img-over" />
                  <div className="th-card-badge">{pkg.badge}</div>
                  {pkg.days > 0 ? (
                    <div className="th-card-dur">{pkg.nights}N / {pkg.days}D<small>Nights & Days</small></div>
                  ) : (
                    <div className="th-card-dur">✦<small>Flexible</small></div>
                  )}
                </div>

                <div className="th-card-body">
                  <p className="th-card-cat" style={{ color: pkg.accent }}>{pkg.category}</p>
                  <h2 className="th-card-title">{pkg.title}</h2>
                  <p className="th-card-sub">{pkg.subtitle}</p>
                  <p className="th-card-desc">{pkg.description}</p>

                  <div className="th-card-hls">
                    {pkg.highlights.map((h, j) => (
                      <div key={j} className="th-card-hl">
                        <div className="th-card-dot" style={{ background: pkg.accent }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="th-card-meta">
                    <div className="th-card-mi">
                      <Star size={11} fill={pkg.accent} style={{ color: pkg.accent }} />
                      <span style={{ color: '#1a1209', fontWeight: 600 }}>{pkg.rating}</span>
                      <span>({pkg.reviews})</span>
                    </div>
                    <div className="th-card-mi"><Users size={11} /><span>{pkg.groupSize}</span></div>
                    {pkg.days > 0 && <div className="th-card-mi"><Clock size={11} /><span>{pkg.days}D</span></div>}
                  </div>

                  <div className="th-card-footer">
                    <div>
                      <p className="th-card-price-lbl">Starting from</p>
                      <p className="th-card-price">{pkg.price}</p>
                    </div>
                    <Link href={pkg.href} className="th-card-cta" style={{ background: pkg.accent }}>
                      <span>Enquire <ArrowRight size={11} /></span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section className="th-process">
        <div className="th-process-inner">
          <motion.div className="th-process-hdr" {...fadeUp()}>
            <p className="th-process-ey">Simple & Transparent</p>
            <h2 className="th-process-title">How it works</h2>
          </motion.div>
          <div className="th-process-grid">
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} className="th-proc-card" {...fadeUp(i * 0.1)}>
                <div className="th-proc-step">{p.step}</div>
                <h3 className="th-proc-title">{p.title}</h3>
                <p className="th-proc-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────── */}
      <section className="th-why">
        <div className="th-why-inner">
          <motion.div className="th-why-hdr" {...fadeUp()}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c6a25c', marginBottom: 10 }}>Why Travel Lunatics</p>
              <h2 className="th-why-title">What sets us apart</h2>
            </div>
            <Link href="/about" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1209', textDecoration: 'none', borderBottom: '1.5px solid #1a1209', paddingBottom: 3, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Our story <ArrowRight size={13} />
            </Link>
          </motion.div>
          <div className="th-why-grid">
            {[
              { icon: <Shield size={18} />, title: '100% Private Tours', desc: 'Your group only. We never mix strangers into the same vehicle or guide.' },
              { icon: <Star size={18} />, title: 'Expert Local Guides', desc: 'Passionate, English-speaking guides who know every hidden corner of the island.' },
              { icon: <Check size={18} />, title: 'All-Inclusive Logistics', desc: 'Hotels, vehicle, entrances, activities — all arranged so you just enjoy the journey.' },
              { icon: <MapPin size={18} />, title: 'Flexible & Customisable', desc: 'Every itinerary can be adjusted to your pace, interests, and travel dates.' },
              { icon: <Phone size={18} />, title: '24/7 On-Ground Support', desc: 'Our team is available around the clock during your trip — any issue, any time.' },
              { icon: <Users size={18} />, title: 'Sustainable Travel', desc: 'We work with local partners and give back to the communities that make Sri Lanka special.' },
            ].map((w, i) => (
              <motion.div key={w.title} className="th-why-item" {...fadeUp(i * 0.08)}>
                <div className="th-why-icon">{w.icon}</div>
                <h3 className="th-why-item-title">{w.title}</h3>
                <p className="th-why-item-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="th-faq">
        <div className="th-faq-inner">
          <motion.div className="th-faq-hdr" {...fadeUp()}>
            <p className="th-faq-ey">Got Questions?</p>
            <h2 className="th-faq-title">Frequently asked</h2>
          </motion.div>
          {FAQS.map((faq, i) => (
            <motion.div key={i} className="th-faq-item" {...fadeUp(i * 0.06)}>
              <button
                className={`th-faq-q ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <ChevronDown size={18} />
              </button>
              <div className={`th-faq-a ${openFaq === i ? 'open' : ''}`}>
                {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ─────────────────────── */}
      <section className="th-banner">
        <div className="th-banner-inner">
          <motion.div {...fadeUp()}>
            <p className="th-banner-ey">Ready to explore?</p>
            <h2 className="th-banner-title">Let us build your perfect<br />Sri Lanka journey</h2>
            <p className="th-banner-sub">Our travel experts will craft a personalised itinerary around your interests, pace, and budget — completely free.</p>
          </motion.div>
          <motion.div className="th-banner-actions" {...fadeUp(0.1)}>
            <Link href="/contact" className="th-banner-btn-gold">
              <span>Talk to our team <ArrowRight size={14} /></span>
            </Link>
            <Link href="/tours/custom" className="th-banner-btn-outline">
              Build custom tour <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}