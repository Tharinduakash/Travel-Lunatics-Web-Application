'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { DestinationCard } from './destination-card'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
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
}

function CardSkeleton() {
  return (
    <div
      className="flex-shrink-0 w-72 rounded-2xl overflow-hidden animate-pulse"
      style={{ border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="h-52 w-full bg-orange-50" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-orange-50 rounded-full w-2/3" />
        <div className="h-3 bg-orange-50 rounded-full w-full" />
        <div className="h-3 bg-orange-50 rounded-full w-4/5" />
        <div className="h-8 bg-orange-50 rounded-xl mt-4" />
      </div>
    </div>
  )
}

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        if (!Array.isArray(data)) return
        setDestinations(data.slice(0, 8))
      } catch (error) {
        console.error('Failed to fetch destinations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDestinations()
  }, [])

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAFAF8, #FFF7ED)' }}
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(249,115,22,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-orange-400" />
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
                ✦ Tour Categories
              </p>
            </div>

            <h2
              className="font-bold leading-tight text-gray-900"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
            >
              Sri Lanka&apos;s Top{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Destinations
              </span>
            </h2>
            <div
              className="h-[3px] w-14 mt-3 rounded-full"
              style={{ background: 'linear-gradient(to right, #F97316, #FCD34D)' }}
            />
            <p className="text-gray-500 mt-2 text-sm max-w-sm leading-relaxed">
              As Sri Lanka&apos;s leading travel agency, we craft seamless journeys to iconic and hidden destinations.
            </p>
          </div>

          {/* Right: nav arrows + view all */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border"
              style={{
                background: canScrollLeft ? '#F97316' : 'white',
                borderColor: canScrollLeft ? '#F97316' : 'rgba(0,0,0,0.1)',
                color: canScrollLeft ? 'white' : '#d1d5db',
                boxShadow: canScrollLeft ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border"
              style={{
                background: canScrollRight ? '#F97316' : 'white',
                borderColor: canScrollRight ? '#F97316' : 'rgba(0,0,0,0.1)',
                color: canScrollRight ? 'white' : '#d1d5db',
                boxShadow: canScrollRight ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <Link
              href="/destinations"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 ml-2"
              style={{
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                boxShadow: '0 4px 14px rgba(249,115,22,0.30)',
              }}
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scroll track */}
        <div className="relative">
          {/* Left fade */}
          {canScrollLeft && (
            <div
              className="absolute left-0 top-0 bottom-4 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #FAFAF8, transparent)' }}
            />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 bottom-4 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #FFF7ED, transparent)' }}
            />
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`.feat-scroll::-webkit-scrollbar { display: none }`}</style>

            {loading
              ? [...Array(5)].map((_, i) => <CardSkeleton key={i} />)
              : destinations.map((dest, i) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <DestinationCard {...dest} />
                  </motion.div>
                ))}
          </div>
        </div>

        {/* Mobile: view all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6 sm:hidden"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
            style={{ color: '#F97316' }}
          >
            View All Destinations
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}