'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Destination {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  price_from: number
  duration_days: number
  rating: number
  reviews_count: number
  highlights: string[]
  latitude?: number
  longitude?: number
}

export default function DestinationDetailPage() {
  const params = useParams()
  const destinationId = params.id as string
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        const found = data.find((d: Destination) => d.id.toString() === destinationId)
        setDestination(found)
      } catch (error) {
        console.error('Failed to fetch destination:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestination()
  }, [destinationId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 dark:text-gray-400">Destination not found</p>
        </div>
      </div>
    )
  }

  const relatedActivities = [
    { name: 'Guided Tours', icon: '🗺️' },
    { name: 'Adventure Sports', icon: '🏔️' },
    { name: 'Local Cuisine', icon: '🍽️' },
    { name: 'Cultural Experience', icon: '🎭' },
    { name: 'Photography', icon: '📸' },
    { name: 'Wellness', icon: '🧘' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main>
        {/* Hero Image */}
        <section className="relative h-96 w-full overflow-hidden">
          <motion.img
            src={destination.image_url}
            alt={destination.name}
            className="h-full w-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <Link href="/destinations">
            <Button
              variant="ghost"
              className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          {/* Title Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-8 right-8 text-white"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-600 text-sm font-semibold mb-3">
              {destination.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{destination.name}</h1>
          </motion.div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{destination.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{destination.reviews_count} reviews</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-bold">{destination.duration_days}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                      From $.{destination.price_from}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About This Destination
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {destination.description}
                  </p>
                </div>

                {/* Highlights */}
                {destination.highlights && destination.highlights.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Highlights
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                        >
                          <span className="text-2xl">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activities */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Activities & Experiences
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {relatedActivities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="text-3xl mb-2">{activity.icon}</div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {activity.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-1"
              >
                {/* Booking Card */}
                <div className="sticky top-20 p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Book This Trip
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Price per person
                      </p>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        $.{destination.price_from}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Duration
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {destination.duration_days} days
                      </p>
                    </div>
                  </div>

                  {!showForm ? (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-3"
                    >
                      Book Now
                    </Button>
                  ) : (
                    <div className="space-y-3 mb-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
                      />
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
                      />
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800">
                        <option>Number of travelers</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        Send Inquiry
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowForm(false)}
                  >
                    View All Trips
                  </Button>

                  {/* Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      ✓ Expert local guides included
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ✓ Flexible booking & cancellation
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ✓ 24/7 customer support
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
