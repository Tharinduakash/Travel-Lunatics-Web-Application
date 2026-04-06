'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DestinationCard } from './destination-card'
import { Skeleton } from '@/components/ui/skeleton'

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
}

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        // Guard: ensure data is an array before calling .slice()
        if (!Array.isArray(data)) {
          console.error('Unexpected API response shape:', data)
          return
        }
        setDestinations(data.slice(0, 6))
      } catch (error) {
        console.error('Failed to fetch destinations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Visit Sri Lanka&apos;s Top Destinations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most popular and breathtaking destinations across Sri Lanka
          </p>
        </motion.div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No destinations available at the moment.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {destinations.map((destination) => (
              <motion.div key={destination.id} variants={itemVariants}>
                <DestinationCard {...destination} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}