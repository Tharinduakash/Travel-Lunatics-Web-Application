'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideItem {
  id: number;
  headline: string;
  sub: string;
  accent: string;
  image?: string;
  bg: string;
  cta?: { label: string; href: string };
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 1,
    headline: 'EXPLORE SRI LANKA',
    sub: 'Discover Hidden Paradise',
    accent: '#F97316',
    image: '/webp/feature7.webp',
    bg: 'transparent',
    cta: { label: 'Start Your Journey', href: '#tours' },
  },
  {
    id: 2,
    headline: 'CHASE THE WAVES',
    sub: 'Surfing & Beach Escapes',
    accent: '#EA580C',
    image: '/webp/mirissa-beach-sri-lanka-1.webp',
    bg: 'transparent',
    cta: { label: 'View Beaches', href: '#beaches' },
  },
  {
    id: 3,
    headline: 'MOUNTAIN MAGIC',
    sub: 'Ella & Hill Country Views',
    accent: '#F97316',
    image: '/webp/Travel1.webp',
    bg: 'transparent',
    cta: { label: 'Explore Hills', href: '#destinations' },
  },
  {
    id: 4,
    headline: 'WILD ADVENTURES',
    sub: 'Safari & Nature Experiences',
    accent: '#EA580C',
    image: '/webp/shutterstock_1522275089 - Leopard.webp',
    bg: 'transparent',
    cta: { label: 'Book Safari', href: '#contact' },
  },
];

interface MiniSlideshowProps {
  slides?: SlideItem[];
  height?: number;
  interval?: number;
  className?: string;
}

function usePreloadedImages(slides: SlideItem[]) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(slides.map((s) => [s.id, !s.image]))
  );

  useEffect(() => {
    slides.forEach((slide) => {
      if (!slide.image) return;
      const img = new window.Image();
      img.onload  = () => setLoaded((prev) => ({ ...prev, [slide.id]: true }));
      img.onerror = () => setLoaded((prev) => ({ ...prev, [slide.id]: true }));
      img.src = slide.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loaded;
}

export function MiniSlideshow({
  slides = DEFAULT_SLIDES,
  height = 200,
  interval = 3500,
  className = '',
}: MiniSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageReady = usePreloadedImages(slides);

  const goTo = useCallback(
    (idx: number) => {
      const target = ((idx % slides.length) + slides.length) % slides.length;
      if (imageReady[slides[target].id]) setCurrent(target);
    },
    [slides, imageReady],
  );

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        return imageReady[slides[next].id] ? next : prev;
      });
    }, interval);
  }, [interval, slides, imageReady]);

  useEffect(() => {
    restartTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restartTimer]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 36) { goTo(current + (diff > 0 ? 1 : -1)); restartTimer(); }
    touchStartX.current = null;
  };

  const slide = slides[current];
  const isCurrentReady = imageReady[slide.id];

  return (
    <>
      <style>{`
        /* Force this component to always render on a light surface,
           regardless of the html[class="dark"] from next-themes.
           The colour-scheme: light tells the browser to render
           scrollbars, form controls, etc. in light mode too. */
        .mini-slideshow-root {
          color-scheme: light;
          background: #FFF7ED !important;
        }

        @keyframes ms-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div
        className={`mini-slideshow-root relative w-full overflow-hidden rounded-2xl ${className}`}
        style={{
          height,
          /* Belt-and-braces: inline style + class above */
          background: '#FFF7ED',
          border: '1px solid rgba(249,115,22,0.15)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── Background image ── */}
        <AnimatePresence mode="wait">
          {isCurrentReady && (
            <motion.div
              key={`bg-${slide.id}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {slide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="sync"
                />
              )}

              {/* Dark gradient at bottom for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Loading skeleton ── */}
        <AnimatePresence>
          {!isCurrentReady && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(90deg, #FFF7ED 25%, #FEE9D1 50%, #FFF7ED 75%)',
                backgroundSize: '200% 100%',
                animation: 'ms-shimmer 1.4s infinite linear',
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Subtle accent glow ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: `inset 0 0 20px ${slide.accent}10` }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Text content ── */}
        <AnimatePresence mode="wait">
          {isCurrentReady && (
            <motion.div
              key={`content-${slide.id}`}
              className="relative z-10 h-full flex items-end px-4 pb-4 gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-[8px] font-black uppercase tracking-[0.25em] mb-0.5 truncate"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  Travel Lunatics · Sri Lanka
                </p>
                <h2
                  className="font-black text-white leading-none truncate"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: height < 110 ? 18 : 22,
                    letterSpacing: '-0.01em',
                    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                  }}
                >
                  {slide.headline}
                </h2>
                <p
                  className="text-[10px] font-medium mt-0.5 truncate"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  {slide.sub}
                </p>
              </div>

              {slide.cta && (
                <motion.a
                  href={slide.cta.href}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-white font-black text-[9px] uppercase tracking-widest whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #F97316, #EA580C)',
                    boxShadow: '0 2px 10px rgba(249,115,22,0.45)',
                  }}
                  whileTap={{ scale: 0.93 }}
                >
                  {slide.cta.label}
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Dot indicators ── */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {slides.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => { goTo(i); restartTimer(); }}
              className="h-[5px] rounded-full cursor-pointer"
              animate={{
                width: i === current ? 18 : 5,
                backgroundColor:
                  i === current ? '#F97316' : 'rgba(255,255,255,0.45)',
                opacity: imageReady[s.id] ? 1 : 0.35,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl z-20">
          <motion.div
            key={`bar-${current}`}
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #F97316, #FCD34D)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: interval / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </>
  );
}