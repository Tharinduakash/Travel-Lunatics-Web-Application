'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    title: 'Mountain Adventures',
    description: 'Hike through misty highlands and explore hidden valleys',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    title: 'Pristine Beaches',
    description: 'Relax on golden shores and watch incredible sunsets',
  },
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
    title: 'Ancient Temples',
    description: 'Discover spiritual heritage and architectural wonders',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {heroImages[current].title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-md">
            {heroImages[current].description}
          </p>

          <div className="flex gap-4">
            <Link href="/destinations">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                Explore Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/75'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => goToSlide((current - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        ←
      </button>
      <button
        onClick={() => goToSlide((current + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        →
      </button>
    </div>
  )
}
