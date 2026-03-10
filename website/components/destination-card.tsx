'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DestinationCardProps {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  price_from: number
  duration_days: number
  rating: number
  reviews_count: number
  highlights?: string[]
}

export function DestinationCard({
  id,
  name,
  description,
  image_url,
  category,
  price_from,
  duration_days,
  rating,
  reviews_count,
  highlights = [],
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.img
          src={image_url}
          alt={name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {rating} ({reviews_count})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {highlights.slice(0, 2).map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <div className="flex justify-between items-center text-sm mb-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="h-4 w-4" />
              {duration_days} days
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              From Rs.{price_from.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Button */}
        <Link href={`/destinations/${id}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
