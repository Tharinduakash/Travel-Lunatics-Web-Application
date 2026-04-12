'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export interface GalleryPhoto {
  id: number;
  title: string;
  image: string;
  location?: string;
  region?: string;
  category?: string;
  year?: number;
  span?: 1 | 2 | 3;
}

const ALL_PHOTOS: GalleryPhoto[] = [
  // Heritage
  { id: 1,  title: 'Sigiriya at Dawn',              image: '/images/gallery-1.jpg',   location: 'Sigiriya',          region: 'Cultural Triangle', category: 'Heritage',  year: 2025, span: 3 },
  { id: 2,  title: 'Galle Fort Sunset',             image: '/images/gallery-2.jpg',   location: 'Galle',             region: 'South Coast',       category: 'Heritage',  year: 2024, span: 2 },
  { id: 3,  title: 'Polonnaruwa Ancient Ruins',     image: '/images/gallery-3.jpg',   location: 'Polonnaruwa',       region: 'Cultural Triangle', category: 'Heritage',  year: 2024, span: 1 },
  { id: 4,  title: 'Dambulla Cave Temple',          image: '/images/gallery-4.jpg',   location: 'Dambulla',          region: 'Cultural Triangle', category: 'Heritage',  year: 2025, span: 2 },
  { id: 5,  title: 'Temple of the Tooth',           image: '/images/gallery-5.jpg',   location: 'Kandy',             region: 'Hill Country',      category: 'Heritage',  year: 2024, span: 1 },
  // Nature
  { id: 6,  title: 'Tea Trails, Nuwara Eliya',      image: '/images/gallery-6.jpg',   location: 'Nuwara Eliya',      region: 'Hill Country',      category: 'Nature',    year: 2025, span: 2 },
  { id: 7,  title: 'Nine Arches Bridge',            image: '/images/gallery-7.jpg',   location: 'Demodara, Ella',    region: 'Hill Country',      category: 'Nature',    year: 2025, span: 3 },
  { id: 8,  title: 'Horton Plains Misty Morning',   image: '/images/gallery-8.jpg',   location: 'Horton Plains',     region: 'Hill Country',      category: 'Nature',    year: 2024, span: 1 },
  { id: 9,  title: 'Sinharaja Rainforest Canopy',   image: '/images/gallery-9.jpg',   location: 'Sinharaja',         region: 'South West',        category: 'Nature',    year: 2024, span: 2 },
  // Wildlife
  { id: 10, title: 'Yala Leopard at Dusk',          image: '/images/gallery-10.jpg',  location: 'Yala National Park', region: 'South East',       category: 'Wildlife',  year: 2025, span: 3 },
  { id: 11, title: 'Mirissa Blue Whale Watch',      image: '/images/gallery-11.jpg',  location: 'Mirissa',           region: 'South Coast',       category: 'Wildlife',  year: 2025, span: 2 },
  { id: 12, title: 'Elephants at Minneriya',        image: '/images/gallery-12.jpg',  location: 'Minneriya',         region: 'North Central',     category: 'Wildlife',  year: 2024, span: 1 },
  { id: 13, title: 'Bentota River Crocodile',       image: '/images/gallery-13.jpg',  location: 'Bentota',           region: 'West Coast',        category: 'Wildlife',  year: 2024, span: 2 },
  // Adventure
  { id: 14, title: 'Ella Rock Summit Trek',         image: '/images/gallery-14.jpg',  location: 'Ella',              region: 'Hill Country',      category: 'Adventure', year: 2025, span: 2 },
  { id: 15, 'title': 'Adam\'s Peak Pilgrimage',     image: '/images/gallery-15.jpg',  location: 'Sri Pada',          region: 'Sabaragamuwa',      category: 'Adventure', year: 2025, span: 3 },
  { id: 16, title: 'Kitulgala White Water',         image: '/images/gallery-16.jpg',  location: 'Kitulgala',         region: 'Sabaragamuwa',      category: 'Adventure', year: 2024, span: 1 },
  { id: 17, title: 'Surfing Arugam Bay',            image: '/images/gallery-17.jpg',  location: 'Arugam Bay',        region: 'East Coast',        category: 'Adventure', year: 2025, span: 2 },
  // Beaches
  { id: 18, title: 'Unawatuna Golden Hour',         image: '/images/gallery-18.jpg',  location: 'Unawatuna',         region: 'South Coast',       category: 'Beaches',   year: 2025, span: 3 },
  { id: 19, title: 'Tangalle Lagoon',               image: '/images/gallery-19.jpg',  location: 'Tangalle',          region: 'South Coast',       category: 'Beaches',   year: 2024, span: 1 },
  { id: 20, title: 'Passikuda Crystal Waters',      image: '/images/gallery-20.jpg',  location: 'Passikudah',        region: 'East Coast',        category: 'Beaches',   year: 2025, span: 2 },
  // Culture
  { id: 21, title: 'Kandy Esala Perahera',          image: '/images/gallery-21.jpg',  location: 'Kandy',             region: 'Hill Country',      category: 'Culture',   year: 2024, span: 3 },
  { id: 22, title: 'Colombo Pettah Market',         image: '/images/gallery-22.jpg',  location: 'Pettah, Colombo',   region: 'Western Province',  category: 'Culture',   year: 2025, span: 2 },
  { id: 23, title: 'Traditional Mask Carving',      image: '/images/gallery-23.jpg',  location: 'Ambalangoda',       region: 'South West',        category: 'Culture',   year: 2024, span: 1 },
  { id: 24, title: 'Katharagama Festival Flames',   image: '/images/gallery-24.jpg',  location: 'Katharagama',       region: 'South East',        category: 'Culture',   year: 2025, span: 2 },
];

const CATEGORIES = ['All', 'Heritage', 'Nature', 'Wildlife', 'Adventure', 'Beaches', 'Culture'];
const YEARS      = ['All', '2025', '2024'];
const PAGE_SIZE  = 18;

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  'Heritage':  { bg: 'rgba(234,179,8,0.92)',   text: '#000' },
  'Nature':    { bg: 'rgba(34,197,94,0.92)',   text: '#000' },
  'Wildlife':  { bg: 'rgba(249,115,22,0.92)',  text: '#fff' },
  'Adventure': { bg: 'rgba(239,68,68,0.92)',   text: '#fff' },
  'Beaches':   { bg: 'rgba(56,189,248,0.92)',  text: '#000' },
  'Culture':   { bg: 'rgba(168,85,247,0.92)',  text: '#fff' },
};

const H: Record<number, string> = { 1: '160px', 2: '240px', 3: '320px' };

function PhotoCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  const cat = CAT_COLORS[photo.category ?? ''] ?? { bg: 'rgba(249,115,22,0.92)', text: '#fff' };

  return (
    <div
      className="group cursor-pointer"
      style={{
        breakInside: 'avoid',
        marginBottom: '8px',
        display: 'inline-block',
        width: '100%',
        animationDelay: `${(index % PAGE_SIZE) * 35}ms`,
        animation: 'fadeUp 0.4s ease both',
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl border border-stone-700/30 group-hover:border-orange-400/50 transition-all duration-300"
        style={{ height: H[photo.span ?? 2] }}
      >
        {!imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.image}
            alt={photo.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1c1917, #0c0a09)' }}>
            <span className="text-2xl mb-1">🌴</span>
            <span className="text-white/20 text-[8px] text-center px-2">{photo.title}</span>
          </div>
        )}

        {/* Base gradient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)' }} />

        {/* Hover warm overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.20) 0%, transparent 50%)' }} />

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, #F97316, #FCD34D)' }} />

        {/* Category badge */}
        {photo.category && (
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            <span className="px-1.5 py-[2px] rounded-full text-[8px] font-black uppercase tracking-wider"
              style={{ background: cat.bg, color: cat.text }}>
              {photo.category}
            </span>
          </div>
        )}

        {/* Year tag */}
        {photo.year && (
          <span className="absolute top-2 right-2 text-[8px] font-mono text-white/35 bg-black/50 rounded px-1 py-0.5">
            {photo.year}
          </span>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
          {photo.region && (
            <p className="text-orange-300 text-[8px] font-mono tracking-widest mb-0.5 uppercase">{photo.region}</p>
          )}
          <h3
            className="text-white font-black text-[10px] leading-tight line-clamp-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {photo.title}
          </h3>
          <p className="text-white/0 group-hover:text-white/50 text-[9px] mt-0.5 transition-colors duration-300 line-clamp-1">
            📍 {photo.location}
          </p>
        </div>

        {/* Inner border glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(249,115,22,0.45)' }} />
      </div>
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap transition-all duration-200 border ${
        active
          ? 'text-white shadow-lg'
          : 'border-stone-600/40 text-stone-400 hover:border-orange-400/40 hover:text-stone-200'
      }`}
      style={active ? {
        background: 'linear-gradient(135deg, #F97316, #EA580C)',
        borderColor: '#F97316',
        boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
      } : {}}
    >
      {label}
    </button>
  );
}

export default function GalleryPage() {
  const [cat,    setCat]    = useState('All');
  const [year,   setYear]   = useState('All');
  const [search, setSearch] = useState('');
  const [page,   setPage]   = useState(1);

  const filtered = useMemo(() =>
    ALL_PHOTOS.filter((p) => {
      const cOk = cat  === 'All' || p.category === cat;
      const yOk = year === 'All' || String(p.year) === year;
      const sOk = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.location ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.region ?? '').toLowerCase().includes(search.toLowerCase());
      return cOk && yOk && sOk;
    }),
  [cat, year, search]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = paginated.length < filtered.length;
  const reset     = () => { setCat('All'); setYear('All'); setSearch(''); setPage(1); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .gp-masonry { columns: 3; column-gap: 8px; }
        @media (min-width: 640px)  { .gp-masonry { columns: 4; } }
        @media (min-width: 1024px) { .gp-masonry { columns: 5; } }
        @media (min-width: 1280px) { .gp-masonry { columns: 6; } }
        .no-scroll::-webkit-scrollbar { display: none }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none }
      `}</style>

      <div className="min-h-screen text-white" style={{ background: '#0f0e0d' }}>

        {/* ── Hero ── */}
        <div className="relative overflow-hidden pt-24 pb-14 px-4 sm:px-6 lg:px-8">

          {/* Warm radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[130px]"
              style={{ background: 'rgba(249,115,22,0.09)' }} />
          </div>

          {/* Dot texture */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle, #d97706 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="relative max-w-7xl mx-auto">

            {/* Back link */}
            <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-300 text-sm mb-10 group transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8" style={{ background: '#F97316' }} />
                  <p className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: '#F97316' }}>
                    ✦ Photo Gallery
                  </p>
                </div>

                <h1
                  className="font-bold leading-none text-white"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
                    letterSpacing: '0.01em',
                  }}
                >
                  SRI LANKA,<br />
                  <span style={{
                    background: 'linear-gradient(90deg, #F97316 0%, #FCD34D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    FRAME BY FRAME.
                  </span>
                </h1>

                <div className="h-[3px] w-14 mt-4 rounded-full"
                  style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />

                <p className="text-stone-400 mt-3 max-w-md text-sm leading-relaxed">
                  A curated visual archive of Sri Lanka's heritage, nature, wildlife, and culture — captured by our team across the island.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 lg:gap-12 shrink-0">
                {[
                  { n: '200+', l: 'Photos' },
                  { n: '9',    l: 'Regions' },
                  { n: '6',    l: 'Categories' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p
                      className="font-black leading-none"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        background: 'linear-gradient(90deg, #F97316, #FCD34D)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {n}
                    </p>
                    <p className="text-stone-500 text-[9px] tracking-widest uppercase mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky filters ── */}
        <div
          className="sticky top-0 z-30 border-b py-3 px-4 sm:px-6 lg:px-8"
          style={{
            background: 'rgba(15,14,13,0.92)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(120,90,60,0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 sm:items-center">

            {/* Search */}
            <div className="relative flex-shrink-0 sm:w-52">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Search destinations…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-full pl-8 pr-4 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(120,90,60,0.25)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(249,115,22,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(120,90,60,0.25)')}
              />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scroll flex-1">
              {CATEGORIES.map((c) => (
                <Pill key={c} label={c} active={cat === c} onClick={() => { setCat(c); setPage(1); }} />
              ))}
            </div>

            {/* Year pills */}
            <div className="flex gap-2 no-scroll overflow-x-auto shrink-0">
              {YEARS.map((y) => (
                <Pill key={y} label={y} active={year === y} onClick={() => { setYear(y); setPage(1); }} />
              ))}
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 flex items-center justify-between">
          <p className="text-stone-600 text-[9px] font-mono tracking-widest">
            SHOWING {Math.min(paginated.length, filtered.length)} OF {filtered.length} PHOTOS
          </p>
          {(cat !== 'All' || year !== 'All' || search) && (
            <button onClick={reset} className="text-orange-500/60 hover:text-orange-400 text-[9px] font-mono tracking-widest transition-colors">
              CLEAR ×
            </button>
          )}
        </div>

        {/* ── MASONRY ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-4xl mb-4">🌴</p>
              <p className="text-stone-500 text-lg">No photos found.</p>
              <button onClick={reset} className="mt-4 text-orange-400 text-sm underline underline-offset-4">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${cat}-${year}-${search}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="gp-masonry"
                >
                  {paginated.map((photo, i) => (
                    <PhotoCard key={photo.id} photo={photo} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {hasMore && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <p className="text-stone-600 text-[9px] font-mono tracking-widest">
                    {filtered.length - paginated.length} MORE PHOTOS
                  </p>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="group px-10 py-3 font-black tracking-widest uppercase text-xs rounded-full transition-all duration-300"
                    style={{
                      border: '1px solid rgba(249,115,22,0.35)',
                      color: '#F97316',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#F97316';
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                      (e.currentTarget as HTMLElement).style.borderColor = '#F97316';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#F97316';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.35)';
                    }}
                  >
                    Load More{' '}
                    <span className="group-hover:rotate-90 inline-block transition-transform duration-300">+</span>
                  </button>
                </div>
              )}

              {!hasMore && filtered.length > 0 && (
                <p className="text-center text-stone-700 text-[9px] font-mono tracking-[0.3em] mt-10">
                  ✦ ALL {filtered.length} PHOTOS LOADED ✦
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}