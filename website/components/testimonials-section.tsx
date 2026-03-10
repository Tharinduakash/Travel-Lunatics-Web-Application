'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  destination_id: number
  rating: number
  review: string
  image_url: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  if (loading || testimonials.length === 0) {
    return null
  }

  const visibleTestimonials = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Traveler Experiences
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Hear what our amazing travelers have to say about their adventures
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {visibleTestimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg border transition-all ${
                  idx === 0
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Verified Traveler
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? 'bg-emerald-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
