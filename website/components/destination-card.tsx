'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Clock, ArrowUpRight, MapPin } from 'lucide-react'
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

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Beach:      { bg: '#DBEAFE', text: '#1D4ED8' },
  Historical: { bg: '#FEF3C7', text: '#92400E' },
  Adventure:  { bg: '#FEE2E2', text: '#B91C1C' },
  Nature:     { bg: '#D1FAE5', text: '#065F46' },
  Spiritual:  { bg: '#EDE9FE', text: '#6D28D9' },
  Cultural:   { bg: '#FED7AA', text: '#C2410C' },
  Wildlife:   { bg: '#FEF9C3', text: '#713F12' },
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
  highlights = [],
}: DestinationCardProps) {
  const cat = CAT_COLORS[category] ?? { bg: '#FED7AA', text: '#C2410C' }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex-shrink-0 bg-white rounded-2xl overflow-hidden"
      style={{
        width: '300px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
          }}
        />

        {/* Category badge — top left */}
        <span
          className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: cat.bg, color: cat.text }}
        >
          {category}
        </span>

        {/* Rating pill — top right */}
        <span
          className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.95)', color: '#1f2937' }}
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {Number(rating).toFixed(2)}
        </span>

        {/* Name + location — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3
            className="text-white font-bold leading-tight mb-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.15rem',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            {name}
          </h3>
          <span className="flex items-center gap-1 text-white/70 text-[11px] font-medium">
            <MapPin className="w-3 h-3" />
            Sri Lanka
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-4 pb-4 flex flex-col gap-3">

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {description}
        </p>

        

        {/* Duration + Price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              {duration_days} {duration_days === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 leading-none">From</p>
            <p className="text-base font-black leading-tight" style={{ color: '#F97316' }}>
              ${price_from.toLocaleString()}.00
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/destinations/${id}`} className="block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
            }}
          >
            Explore Now
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}