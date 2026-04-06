'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DestinationCard } from '@/components/destination-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'

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

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Beach', 'Historical', 'Adventure', 'Nature', 'Spiritual']

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        setDestinations(data)
        setFilteredDestinations(data)
      } catch (error) {
        console.error('Failed to fetch destinations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  useEffect(() => {
    let filtered = destinations

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((dest) => dest.category === selectedCategory)
    }

    setFilteredDestinations(filtered)
  }, [searchQuery, selectedCategory, destinations])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="pt-8">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-26 bg-linear-to-b from-gray-50 to-transparent dark:from-gray-900">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Explore Sri Lanka
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover stunning destinations across the island
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-base rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Filter className="h-5 w-5 text-gray-500 self-center mr-2" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <DestinationCard {...destination} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No destinations found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
