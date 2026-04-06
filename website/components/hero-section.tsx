"use client"

import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    image: "/webp/shutterstock_495542851.webp",
    title: "Discover Paradise",
    subtitle: "Explore the stunning beaches of Sri Lanka",
  },
  {
    image: "/webp/shutterstock_1050911312.webp",
    title: "Adventure Awaits",
    subtitle: "Conquer majestic mountains and lush trails",
  },
  {
    image: "/webp/pexels-tomas-malik-793526-1998439.webp",
    title: "Rich Culture",
    subtitle: "Immerse yourself in ancient traditions",
  },
  {
    image: "/webp/pexels-elina-sazonova-4403903.webp",
    title: "Natural Wonders",
    subtitle: "Experience breathtaking waterfalls and wildlife",
  },
  {
    image: "/webp/pexels-eslames1-32414014.webp",
    title: "Hike the Trails",
    subtitle: "Discover scenic hiking routes across Sri Lanka",
  },
  {
    image: "/webp/Travel1.webp",
    title: "Train Journeys",
    subtitle: "Dive into picturesque train rides through tea plantations",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const isAutoPlaying = useRef(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToSlide = useCallback((indexFn: (prev: number) => number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent((p) => indexFn(p))
      setIsAnimating(false)
    }, 400)
  }, [])

  const prev = useCallback(() => {
    goToSlide((p) => (p - 1 + slides.length) % slides.length)
  }, [goToSlide])

  const next = useCallback(() => {
    goToSlide((p) => (p + 1) % slides.length)
  }, [goToSlide])

  const goTo = useCallback((i: number) => {
    goToSlide(() => i)
  }, [goToSlide])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (isAutoPlaying.current) {
        goToSlide((p) => (p + 1) % slides.length)
      }
    }, 5000)
  }, [goToSlide])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const pausePlay = () => { isAutoPlaying.current = false }
  const resumePlay = () => { isAutoPlaying.current = true }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --teal: #00d4b8;
          --coral: #ff6b47;
          --dark: #060f1c;
          --glass: rgba(6, 15, 28, 0.42);
        }

        /*
          Full-bleed wrapper — breaks out of ANY parent padding/container.
          width: 100vw + left: 50% + margin-left: -50vw is the standard
          CSS full-bleed technique. This guarantees the hero always
          touches both screen edges regardless of layout padding above.
        */
        .hero-wrapper {
          display: block;
          width: 100vw;
          position: relative;
          left: 50%;
          margin-left: -50vw;
          /* Reset any inherited spacing */
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
          overflow: hidden;
        }

        .hero-root {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 580px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          background: var(--dark);
          isolation: isolate;
          padding: 0;
          margin: 0;
        }

        /* Grain texture for cinematic depth */
        .hero-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 5;
          opacity: 0.55;
          mix-blend-mode: overlay;
        }

        /* ── Slides ── */
        .hero-slide {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          opacity: 0;
          transition: opacity 1.1s cubic-bezier(.4,0,.2,1);
        }
        .hero-slide.active { opacity: 1; }

        .hero-slide-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.04);
          transition: transform 6s ease-out;
        }
        .hero-slide.active .hero-slide-bg {
          transform: scale(1);
        }

        /* Cinematic vignette */
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(6,15,28,0.2) 0%, transparent 60%),
            linear-gradient(
              to bottom,
              rgba(6,15,28,0.55) 0%,
              rgba(6,15,28,0.05) 30%,
              rgba(6,15,28,0.05) 58%,
              rgba(6,15,28,0.82) 100%
            );
        }

        /* ── Content ── */
        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          text-align: center;
          padding: 0 1.5rem 96px;
          z-index: 6;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -0.01em;
          max-width: 820px;
          text-shadow: 0 4px 32px rgba(0,0,0,0.55);
          margin-bottom: 16px;
          transition: opacity 0.45s ease 0.07s, transform 0.45s ease 0.07s;
          opacity: 1;
          transform: translateY(0);
        }
        .hero-title.hidden { opacity: 0; transform: translateY(20px); }

        .hero-rule {
          width: 56px;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--coral));
          border-radius: 2px;
          margin: 0 auto 16px;
          transition: opacity 0.45s ease 0.13s, transform 0.45s ease 0.13s;
          opacity: 1;
          transform: scaleX(1);
        }
        .hero-rule.hidden { opacity: 0; transform: scaleX(0.3); }

        .hero-sub {
          font-size: clamp(0.9rem, 1.6vw, 1.1rem);
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          max-width: 480px;
          line-height: 1.7;
          text-shadow: 0 1px 12px rgba(0,0,0,0.5);
          margin-bottom: 36px;
          transition: opacity 0.45s ease 0.18s, transform 0.45s ease 0.18s;
          opacity: 1;
          transform: translateY(0);
        }
        .hero-sub.hidden { opacity: 0; transform: translateY(20px); }

        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          transition: opacity 0.45s ease 0.25s, transform 0.45s ease 0.25s;
          opacity: 1;
          transform: translateY(0);
        }
        .hero-btns.hidden { opacity: 0; transform: translateY(20px); }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(115deg, var(--coral) 0%, #e8522a 55%, #c8420a 100%);
          border-radius: 50px;
          border: none;
          box-shadow: 0 8px 28px rgba(255,107,71,0.42), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(255,107,71,0.52);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          color: rgba(255,255,255,0.92);
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 50px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.55);
          transform: translateY(-3px);
        }

        /* ── Arrows — desktop ONLY (≥1024px) ── */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.22);
          background: var(--glass);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .hero-root:hover .hero-arrow { opacity: 1; }
        }
        @media (max-width: 1023px) {
          .hero-arrow { display: none !important; }
        }
        .hero-arrow:hover {
          background: rgba(0,212,184,0.2);
          border-color: rgba(0,212,184,0.6);
          transform: translateY(-50%) scale(1.1);
        }
        .hero-arrow-left  { left: 28px; }
        .hero-arrow-right { right: 28px; }

        /* ── Vertical strip nav (desktop ≥1280) ── */
        .hero-strip { display: none; }
        @media (min-width: 1280px) {
          .hero-strip {
            display: flex;
            flex-direction: column;
            gap: 6px;
            position: absolute;
            right: 32px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }
          .hero-strip-item {
            width: 3px;
            border-radius: 4px;
            background: rgba(255,255,255,0.22);
            cursor: pointer;
            transition: all 0.4s ease;
            height: 28px;
            border: none;
            padding: 0;
          }
          .hero-strip-item.active {
            height: 52px;
            background: linear-gradient(to bottom, var(--teal), var(--coral));
          }
          .hero-strip-item:hover:not(.active) {
            background: rgba(255,255,255,0.5);
          }
        }

        /* ── Bottom bar ── */
        .hero-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .hero-dots {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hero-dot-btn {
          border: none;
          cursor: pointer;
          background: rgba(255,255,255,0.32);
          border-radius: 50px;
          height: 6px;
          width: 6px;
          padding: 0;
          transition: all 0.4s cubic-bezier(.4,0,.2,1);
        }
        .hero-dot-btn.active {
          width: 30px;
          background: #fff;
        }
        .hero-dot-btn:hover:not(.active) {
          background: rgba(255,255,255,0.65);
          transform: scale(1.3);
        }

        .hero-counter {
          position: absolute;
          left: 24px;
          bottom: 22px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.12em;
          font-family: 'DM Sans', sans-serif;
        }
        .hero-counter b {
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          font-family: 'Cormorant Garamond', serif;
        }

        /* ── Progress bar ── */
        .hero-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2.5px;
          background: linear-gradient(90deg, var(--teal) 0%, var(--coral) 100%);
          animation: pgbar 5s linear forwards;
          z-index: 12;
        }
        @keyframes pgbar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Swipe hint — mobile only ── */
        .hero-swipe-hint { display: none; }
        @media (max-width: 1023px) {
          .hero-swipe-hint {
            display: flex;
            position: absolute;
            bottom: 76px;
            left: 50%;
            transform: translateX(-50%);
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.38);
            z-index: 8;
            white-space: nowrap;
            animation: fadeout 1s ease 3s forwards;
          }
          @keyframes fadeout { to { opacity: 0; pointer-events: none; } }
          .swipe-icon { display: flex; gap: 2px; align-items: center; }
          .swipe-bar {
            width: 14px; height: 2px;
            border-radius: 2px;
            background: rgba(255,255,255,0.38);
            animation: swipeanim 1.8s ease infinite;
          }
          @keyframes swipeanim {
            0%, 100% { transform: translateX(0); opacity: 0.4; }
            50% { transform: translateX(5px); opacity: 0.9; }
          }
        }
      `}</style>

      {/*
        .hero-wrapper uses the CSS full-bleed technique:
          width: 100vw  →  stretch to full viewport width
          left: 50%     →  shift right by 50% of parent
          margin-left: -50vw  →  pull back by 50vw, centering it
        This cancels out any padding the parent layout adds,
        so the slideshow always starts at the very left edge of the screen.
      */}
      <div className="hero-wrapper">
        <section
          className="hero-root"
          onMouseEnter={pausePlay}
          onMouseLeave={resumePlay}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className={`hero-slide ${i === current ? "active" : ""}`}>
              <div
                className="hero-slide-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="hero-overlay" />
            </div>
          ))}

          <div className="hero-content">
            <h1 className={`hero-title ${isAnimating ? "hidden" : ""}`}>
              {slides[current].title}
            </h1>
            <div className={`hero-rule ${isAnimating ? "hidden" : ""}`} />
            <p className={`hero-sub ${isAnimating ? "hidden" : ""}`}>
              {slides[current].subtitle}
            </p>
            <div className={`hero-btns ${isAnimating ? "hidden" : ""}`}>
              <Link href="/book" className="btn-primary">
                Plan Your Adventure
                <ArrowRight size={15} />
              </Link>
              <Link href="/destinations" className="btn-secondary">
                Explore Destinations
              </Link>
            </div>
          </div>

          <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>

          <div className="hero-strip">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-strip-item ${i === current ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="hero-swipe-hint">
            <div className="swipe-icon">
              <div className="swipe-bar" />
              <div className="swipe-bar" style={{ animationDelay: '0.15s' }} />
            </div>
            Swipe to explore
          </div>

          <div className="hero-bottom">
            <div className="hero-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot-btn ${i === current ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hero-counter">
            <b>{String(current + 1).padStart(2, "0")}</b>
            <span style={{ margin: '0 3px' }}>/</span>
            {String(slides.length).padStart(2, "0")}
          </div>

          <div key={`progress-${current}`} className="hero-progress" />
        </section>
      </div>
    </>
  )
}