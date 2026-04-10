'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    subtitle: 'The Pearl of the Indian Ocean',
    description: 'Experience the breathtaking beauty of Sri Lanka with our expertly curated travel experiences.',
    image: 'https://images.unsplash.com/photo-1561862260-11b8c3665604?w=1200&h=600&fit=crop',
    buttonText: 'Explore Destinations',
    buttonLink: '/destinations',
    gradient: 'from-blue-900/50 to-blue-600/50',
  },
  {
    id: 2,
    title: 'Adventure Awaits',
    subtitle: 'Thrilling Experiences',
    description: 'From hiking Pidurangala Rock to surfing in Arugambe, find your next adventure.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop',
    buttonText: 'Browse Tours',
    buttonLink: '/tours',
    gradient: 'from-orange-900/50 to-red-600/50',
  },
  {
    id: 3,
    title: 'Cultural Immersion',
    subtitle: 'Explore Heritage & Traditions',
    description: 'Visit ancient temples, colonial architecture, and vibrant local communities.',
    image: 'https://images.unsplash.com/photo-1548013146-72f92cb33daa?w=1200&h=600&fit=crop',
    buttonText: 'View Experiences',
    buttonLink: '/experiences',
    gradient: 'from-amber-900/50 to-yellow-600/50',
  },
  {
    id: 4,
    title: 'Pristine Beaches',
    subtitle: 'Tropical Paradise',
    description: 'Relax on golden shores, swim in crystal-clear waters, and watch stunning sunsets.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    buttonText: 'See Beaches',
    buttonLink: '/destinations',
    gradient: 'from-cyan-900/50 to-blue-600/50',
  },
  {
    id: 5,
    title: 'Wildlife Safari',
    subtitle: 'Nature\'s Majesty',
    description: 'Encounter leopards, elephants, and exotic birds in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop',
    buttonText: 'Discover Wildlife',
    buttonLink: '/experiences',
    gradient: 'from-green-900/50 to-emerald-600/50',
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return

    autoPlayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current)
    }
  }, [isAutoPlay])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
    // Resume auto-play after 5 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
    // Resume auto-play after 5 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const slide = slides[currentSlide]

  return (
    <>
      <style>{`
        .hero-slideshow {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          margin-top: 72px;
        }

        @media (max-width: 768px) {
          .hero-slideshow {
            height: 400px;
            margin-top: 62px;
          }
        }

        @media (max-width: 480px) {
          .hero-slideshow {
            height: 300px;
          }
        }

        .slide-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            var(--gradient) 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
          z-index: 2;
        }

        .slide-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 80px;
          z-index: 3;
          color: white;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .slide-content {
            padding: 40px 40px;
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .slide-content {
            padding: 30px 20px;
          }
        }

        .slide-content h1 {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 12px;
          line-height: 1.2;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .slide-content h1 {
            font-size: 40px;
          }
        }

        @media (max-width: 480px) {
          .slide-content h1 {
            font-size: 28px;
          }
        }

        .slide-content h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          opacity: 0.95;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .slide-content h2 {
            font-size: 16px;
            margin-bottom: 12px;
          }
        }

        .slide-content p {
          font-size: 16px;
          margin-bottom: 32px;
          line-height: 1.6;
          max-width: 500px;
          opacity: 0.9;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .slide-content p {
            font-size: 14px;
            margin-bottom: 24px;
          }
        }

        .slide-button {
          padding: 14px 36px;
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 8px 24px rgba(255, 122, 69, 0.3);
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .slide-button:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 122, 69, 0.4);
        }

        .slide-button:active {
          transform: translateY(0);
        }

        /* Navigation Controls */
        .nav-buttons {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .nav-buttons {
            bottom: 20px;
            gap: 12px;
          }
        }

        .nav-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.3);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .nav-button {
            width: 44px;
            height: 44px;
          }
        }

        .nav-button:hover {
          background: rgba(255, 122, 69, 0.5);
          border-color: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        /* Slide Indicators */
        .slide-indicators {
          position: absolute;
          bottom: 30px;
          right: 30px;
          z-index: 5;
          display: flex;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .slide-indicators {
            bottom: 20px;
            right: 20px;
            gap: 6px;
          }
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          border-color: #ffffff;
          width: 32px;
          border-radius: 6px;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        /* Fade animations */
        .slide-fade-enter {
          animation: fadeIn 0.8s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div className="hero-slideshow">
        <div className="slide-container" key={slide.id}>
          <img
            src={slide.image}
            alt={slide.title}
            className="slide-image"
          />
          <div
            className="slide-overlay"
            style={{ '--gradient': slide.gradient } as React.CSSProperties}
          />

          <div className="slide-content slide-fade-enter">
            <h2>{slide.subtitle}</h2>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a href={slide.buttonLink} className="slide-button">
              {slide.buttonText}
            </a>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="nav-button"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
