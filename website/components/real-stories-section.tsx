'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  destination_id: number
  rating: number
  review: string
  image_url: string
}

export function RealStoriesSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [autoplayActive, setAutoplayActive] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        setTestimonials(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length === 0 || !autoplayActive) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length, autoplayActive])

  const handlePrev = () => {
    setAutoplayActive(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplayActive(true)
  }

  const handleNext = () => {
    setAutoplayActive(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoplayActive(true)
  }

  const goToSlide = (index: number) => {
    setAutoplayActive(false)
    setCurrent(index)
    setAutoplayActive(true)
  }

  if (loading || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[current]

  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#04080a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .real-stories-section { font-family: 'DM Sans', sans-serif; }
        .real-stories-heading { font-family: 'Cormorant Garamond', serif; }
        .real-stories-quote { font-family: 'Cormorant Garamond', serif; }

        .real-stories-container {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .real-stories-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
          transition: opacity 0.6s ease;
        }

        .real-stories-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,8,10,0.92) 0%, rgba(4,8,10,0.8) 50%, rgba(6,42,35,0.85) 100%);
          z-index: 2;
        }

        .real-stories-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-w-3xl;
          padding: 3rem 2rem;
          width: 100%;
        }

        .real-stories-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #00e5c8;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .real-stories-quote-text {
          font-size: 1.875rem;
          line-height: 1.4;
          font-weight: 500;
          color: white;
          margin-bottom: 2rem;
          max-width: 800px;
          letter-spacing: -0.5px;
        }
        @media (max-width: 768px) {
          .real-stories-quote-text {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
        }

        .real-stories-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .real-stories-author-name {
          font-size: 18px;
          font-weight: 600;
          color: #00e5c8;
          margin-bottom: 0.25rem;
        }

        .real-stories-author-title {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.05em;
        }

        .real-stories-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .real-stories-arrow {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
        }
        .real-stories-arrow:hover {
          background: rgba(0,229,200,0.1);
          border-color: #00e5c8;
          transform: scale(1.08);
        }

        .real-stories-dots {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
        }

        .real-stories-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .real-stories-dot.active {
          background: #00e5c8;
          width: 28px;
          border-radius: 5px;
        }
        .real-stories-dot:hover {
          background: rgba(0,229,200,0.5);
        }
      `}</style>

      <div className="real-stories-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4">
            Traveler Stories
          </p>
          <h2 className="real-stories-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Real <em>Experiences</em>
          </h2>
          <p className="text-sm text-white/50 mt-6 max-w-2xl mx-auto">
            Discover the unforgettable journeys of travelers who have explored Sri Lanka with Travel Lunatics
          </p>
        </motion.div>

        {/* Carousel */}
        <AnimatePresence mode="fade">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="real-stories-container"
          >
            {/* Background Image */}
            {currentTestimonial.image_url && (
              <img
                src={currentTestimonial.image_url}
                alt={currentTestimonial.name}
                className="real-stories-bg-image"
              />
            )}

            {/* Overlay */}
            <div className="real-stories-overlay" />

            {/* Content */}
            <div className="real-stories-content">
              <p className="real-stories-label">Real Story</p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="real-stories-quote-text"
              >
                &ldquo;{currentTestimonial.review}&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="real-stories-author"
              >
                <div className="real-stories-author-name">
                  {currentTestimonial.name}
                </div>
                <div className="real-stories-author-title">
                  Verified Traveler
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          {/* Arrow Controls */}
          <div className="real-stories-nav">
            <button
              onClick={handlePrev}
              className="real-stories-arrow"
              aria-label="Previous story"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="real-stories-dots">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`real-stories-dot ${idx === current ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to story ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="real-stories-arrow"
              aria-label="Next story"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Counter */}
          <div className="text-sm text-white/40 font-medium">
            {current + 1} of {testimonials.length}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
