'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1,  title: 'Sigiriya at Dawn',            image: '/webp/pexels-sahan-hapuarachchi-2150299748-31154120.jpg', location: 'Sigiriya',      region: 'Cultural Triangle', category: 'Heritage',  year: 2024, span: 3 },
  { id: 2,  title: 'Tea Trails, Nuwara Eliya',    image: '/webp/shutterstock_322868936.webp',                      location: 'Nuwara Eliya',  region: 'Hill Country',      category: 'Nature',    year: 2024, span: 2 },
  { id: 3,  title: 'Galle Fort Sunset',           image: '/webp/Galle Fort 01.webp',                               location: 'Galle',         region: 'South Coast',       category: 'Heritage',  year: 2025, span: 1 },
  { id: 4,  title: 'Mirissa Whale Watch',         image: '/webp/P28.webp',                                         location: 'Mirissa',       region: 'South Coast',       category: 'Wildlife',  year: 2025, span: 2 },
  { id: 5,  title: 'Yala Leopard Sighting',       image: '/webp/shutterstock_30691945.webp',                       location: 'Yala',          region: 'South East',        category: 'Wildlife',  year: 2024, span: 3 },
  { id: 6,  title: 'Dambulla Cave Temple',        image: '/webp/Dambulla Temple 01.webp',                          location: 'Dambulla',      region: 'Cultural Triangle', category: 'Heritage',  year: 2025, span: 2 },
  { id: 7,  title: 'Polonnaruwa Ruins',           image: '/webp/Polonnaru Galviharaya-03.webp',                    location: 'Polonnaruwa',   region: 'Cultural Triangle', category: 'Heritage',  year: 2024, span: 2 },
  { id: 8,  title: 'Nine Arches Bridge',          image: '/webp/nine.webp',                                        location: 'Demodara',      region: 'Hill Country',      category: 'Nature',    year: 2025, span: 1 },
  { id: 9,  title: 'Unawatuna Beach',             image: '/webp/pexels-ollivves-1078983.jpg',                      location: 'Unawatuna',     region: 'South Coast',       category: 'Beaches',   year: 2025, span: 3 },
  { id: 10, title: 'Kandy Perahera Procession',   image: '/webp/Temple of Tooth relic (Dalanda Maligawa) 02.webp', location: 'Kandy',         region: 'Hill Country',      category: 'Culture',   year: 2024, span: 2 },
  { id: 11, title: "Adam's Peak Pilgrimage",      image: '/webp/Adam_s Peak.webp',                                 location: 'Sri Pada',      region: 'Hill Country',      category: 'Adventure', year: 2025, span: 1 },
  { id: 12, title: 'Horton Plains Misty Morning', image: '/webp/hortain.webp',                                     location: 'Horton Plains', region: 'Hill Country',      category: 'Nature',    year: 2024, span: 1 },
];

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Heritage:  { bg: 'rgba(234,179,8,0.92)',  text: '#000' },
  Nature:    { bg: 'rgba(34,197,94,0.92)',  text: '#000' },
  Wildlife:  { bg: 'rgba(249,115,22,0.92)', text: '#fff' },
  Adventure: { bg: 'rgba(239,68,68,0.92)',  text: '#fff' },
  Beaches:   { bg: 'rgba(56,189,248,0.92)', text: '#000' },
  Culture:   { bg: 'rgba(168,85,247,0.92)', text: '#fff' },
};

const H: Record<number, string> = { 1: '160px', 2: '240px', 3: '320px' };

/* ─── Desktop masonry card (unchanged) ─── */
function PhotoCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const cat = CAT_COLORS[photo.category ?? ''] ?? { bg: 'rgba(249,115,22,0.92)', text: '#fff' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
      className="group cursor-pointer"
      style={{ breakInside: 'avoid', marginBottom: '8px', display: 'inline-block', width: '100%' }}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/5 group-hover:border-orange-400/40 transition-all duration-300"
        style={{ height: H[photo.span ?? 2] }}
      >
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 17vw"
          className="object-cover object-center"
          style={{ transition: 'transform 0.6s ease' }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.18) 0%, transparent 55%)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to bottom, #F97316, #FCD34D)' }} />
        {photo.category && (
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            <span className="px-1.5 py-[2px] rounded-full text-[8px] font-black uppercase tracking-wider"
              style={{ background: cat.bg, color: cat.text }}>
              {photo.category}
            </span>
          </div>
        )}
        {photo.year && (
          <span className="absolute top-2 right-2 text-[8px] font-mono text-white/35 bg-black/50 rounded px-1 py-0.5">
            {photo.year}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
          {photo.region && (
            <p className="text-orange-300 text-[8px] font-mono tracking-widest mb-0.5 uppercase">{photo.region}</p>
          )}
          <h3 className="text-white font-black text-[10px] leading-tight line-clamp-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {photo.title}
          </h3>
          <p className="text-white/0 group-hover:text-white/50 text-[9px] mt-0.5 transition-colors duration-300 line-clamp-1">
            📍 {photo.location}
          </p>
        </div>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(249,115,22,0.45)' }} />
      </div>
    </motion.div>
  );
}

/* ─── Mobile horizontal scroll card ─── */
function MobileCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const cat = CAT_COLORS[photo.category ?? ''] ?? { bg: 'rgba(249,115,22,0.92)', text: '#fff' };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="mob-card flex-shrink-0"
    >
      {/* Image area */}
      <div className="mob-card-img">
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          sizes="160px"
          className="object-cover object-center"
        />
        {/* Dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
        }} />
        {/* Category badge */}
        {photo.category && (
          <span className="mob-badge" style={{ background: cat.bg, color: cat.text }}>
            {photo.category}
          </span>
        )}
        {/* Year */}
        {photo.year && (
          <span className="mob-year">{photo.year}</span>
        )}
        {/* Location pin over image bottom */}
        <div className="mob-card-foot">
          <p className="mob-region">{photo.region}</p>
          <h3 className="mob-title">{photo.title}</h3>
        </div>
      </div>

      {/* Location row below image */}
      <div className="mob-card-meta">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{photo.location}</span>
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAFAF8, #FFF7ED)' }}
    >
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 px-4 md:px-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-orange-400" />
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
                ✦ Photo Gallery
              </p>
            </div>
            <h2
              className="font-bold leading-none text-gray-900"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
            >
              Sri Lanka Through{' '}
              <span style={{
                background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Our Lens
              </span>
            </h2>
            <div className="h-[3px] w-14 mt-3 rounded-full"
              style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }} />
            <p className="text-gray-500 mt-2 text-sm max-w-sm leading-relaxed">
              Moments captured across the island — from misty highlands to golden coastlines.
            </p>
          </div>

          {/* Desktop: view all */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block shrink-0"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{ borderColor: '#F97316', color: '#F97316' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#F97316';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#F97316';
              }}
            >
              View Full Gallery
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════
            MOBILE: horizontal scroll row
            Hidden on sm+ screens
        ══════════════════════════════ */}
        <div className="mob-scroll-wrap sm:hidden">
          {/* Fade edge hints */}
          <div className="mob-fade-left"  />
          <div className="mob-fade-right" />

          <div className="mob-scroll-track">
            {GALLERY_PHOTOS.map((photo, i) => (
              <MobileCard key={photo.id} photo={photo} index={i} />
            ))}

            {/* "View All" tail card */}
            <Link href="/gallery" className="mob-viewall-card flex-shrink-0">
              <div className="mob-viewall-inner">
                <div className="mob-viewall-icon">
                  <svg width="22" height="22" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <p className="mob-viewall-text">View<br/>All</p>
                <p className="mob-viewall-count">200+ moments</p>
              </div>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════
            DESKTOP: masonry grid
            Hidden on mobile
        ══════════════════════════════ */}
        <div className="gl-masonry hidden sm:block px-4 md:px-8" style={{ columnGap: '8px' }}>
          {GALLERY_PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mt-8 sm:hidden px-4"
        >
          <Link
            href="/gallery"
            className="group text-sm font-bold uppercase tracking-widest transition-colors duration-300"
            style={{ color: '#F97316' }}
          >
            View Full Gallery
            <span
              className="block h-[2px] w-0 mt-1.5 transition-all duration-300 group-hover:w-full rounded-full"
              style={{ background: '#F97316' }}
            />
          </Link>
        </motion.div>

        <p className="text-gray-400 text-[9px] text-center mt-6 font-mono tracking-[0.3em] uppercase px-4">
          Showing {GALLERY_PHOTOS.length} of 200+ Moments
        </p>
      </div>

      <style>{`
        /* ── Desktop masonry ── */
        .gl-masonry { columns: 2; }
        @media (min-width: 640px)  { .gl-masonry { columns: 4; } }
        @media (min-width: 1024px) { .gl-masonry { columns: 5; } }
        @media (min-width: 1280px) { .gl-masonry { columns: 6; } }

        /* ── Mobile horizontal scroll wrapper ── */
        .mob-scroll-wrap {
          position: relative;
          width: 100%;
        }

        /* Fade edge hints so user knows it scrolls */
        .mob-fade-left,
        .mob-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 24px;
          z-index: 2;
          pointer-events: none;
        }
        .mob-fade-left  { left: 0;  background: linear-gradient(to right, #FAFAF8, transparent); }
        .mob-fade-right { right: 0; background: linear-gradient(to left,  #FFF7ED, transparent); }

        /* Scrollable track */
        .mob-scroll-track {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 16px 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .mob-scroll-track::-webkit-scrollbar { display: none; }

        /* ── Individual mobile card ── */
        .mob-card {
          scroll-snap-align: start;
          width: 148px;
          cursor: pointer;
        }

        /* Image container */
        .mob-card-img {
          position: relative;
          width: 148px;
          height: 200px;
          border-radius: 14px;
          overflow: hidden;
          background: #e5e5e5;
          /* Warm subtle border */
          box-shadow: 0 0 0 1px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.10);
        }

        /* Category badge */
        .mob-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 2px 7px;
          border-radius: 999px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          z-index: 2;
        }

        /* Year */
        .mob-year {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 8px;
          font-family: monospace;
          color: rgba(255,255,255,0.55);
          background: rgba(0,0,0,0.45);
          padding: 1px 5px;
          border-radius: 4px;
          z-index: 2;
        }

        /* Bottom info inside image */
        .mob-card-foot {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 8px 9px;
          z-index: 2;
        }
        .mob-region {
          font-size: 7px;
          font-family: monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FDA56A;
          margin-bottom: 2px;
          line-height: 1;
        }
        .mob-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Location row below image */
        .mob-card-meta {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 6px;
          padding: 0 2px;
        }
        .mob-card-meta span {
          font-size: 10px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── "View All" tail card ── */
        .mob-viewall-card {
          scroll-snap-align: start;
          width: 110px;
          height: 200px;
          border-radius: 14px;
          border: 1.5px dashed rgba(249,115,22,0.35);
          background: rgba(255,247,237,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .mob-viewall-card:active {
          background: rgba(249,115,22,0.07);
          border-color: rgba(249,115,22,0.65);
        }
        .mob-viewall-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .mob-viewall-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(249,115,22,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .mob-viewall-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 13px;
          font-weight: 700;
          color: #F97316;
          text-align: center;
          line-height: 1.2;
        }
        .mob-viewall-count {
          font-size: 8px;
          color: #9ca3af;
          text-align: center;
          font-family: monospace;
          letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  );
}