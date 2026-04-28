'use client'

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
}: DestinationCardProps) {
  const cat = CAT_COLORS[category] ?? { bg: '#FED7AA', text: '#C2410C' }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        width: '100%',
        background: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="group"
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 230 }}>
        <img
          src={image_url}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="group-hover:scale-105"
        />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
        }} />

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 14, left: 14,
          fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20,
          background: cat.bg, color: cat.text,
        }}>
          {category}
        </span>

        {/* Rating pill */}
        <span style={{
          position: 'absolute', top: 14, right: 14,
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
          background: 'rgba(255,255,255,0.95)', color: '#1f2937',
        }}>
          <Star style={{ width: 12, height: 12, fill: '#F59E0B', color: '#F59E0B' }} />
          {Number(rating).toFixed(1)}
        </span>

        {/* Name + location */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 16px' }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.18rem', fontWeight: 700,
            color: '#fff', margin: '0 0 4px',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            lineHeight: 1.25,
          }}>
            {name}
          </h3>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.72)', fontSize: 11, fontWeight: 500 }}>
            <MapPin style={{ width: 11, height: 11 }} />
            Sri Lanka
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <p style={{
          fontSize: 13, color: '#6B5744', lineHeight: 1.65, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9B8878' }}>
            <Clock style={{ width: 13, height: 13 }} />
            <span style={{ fontSize: 12, fontWeight: 500 }}>
              {duration_days} {duration_days === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, color: '#B8A090', margin: '0 0 1px', letterSpacing: '0.04em' }}>From</p>
            <p style={{ fontSize: 17, fontWeight: 800, color: '#F97316', margin: 0, lineHeight: 1 }}>
              ${price_from.toLocaleString()}
            </p>
          </div>
        </div>

        <Link href={`/destinations/${id}`} style={{ display: 'block', textDecoration: 'none', marginTop: 'auto' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              boxShadow: '0 4px 14px rgba(249,115,22,0.32)',
            }}
          >
            Explore Now
            <ArrowUpRight style={{ width: 15, height: 15 }} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}
