'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DestinationCard } from '@/components/destination-card'
import { Search } from 'lucide-react'

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

const CATEGORIES = ['All', 'Beach', 'Historical', 'Adventure', 'Nature', 'Spiritual', 'Wildlife', 'Cultural']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filtered, setFiltered] = useState<Destination[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.json())
      .then(data => { setDestinations(data); setFiltered(data) })
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = destinations
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      )
    }
    if (category !== 'All') {
      result = result.filter(d => d.category === category)
    }
    setFiltered(result)
  }, [query, category, destinations])

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '72vh',
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        <img
          src="/webp/sigiriya2.webp"
          alt="Explore Sri Lanka"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(15,5,0,0.88) 100%)',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', zIndex: 2,
            maxWidth: 1200, margin: '0 auto',
            width: '100%', padding: '0 40px 72px',
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316' }}>
              Explore Destinations
            </span>
            <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 5.8vw, 74px)',
            fontWeight: 900, fontStyle: 'italic',
            color: '#FFFFFF', margin: '0 0 14px',
            lineHeight: 1.06, letterSpacing: '-0.01em', maxWidth: 680,
            textShadow: '0 4px 28px rgba(0,0,0,0.45)',
          }}>
            Discover Sri Lanka
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 32px', maxWidth: 480, lineHeight: 1.7, fontWeight: 300,
          }}>
            From ancient kingdoms to golden beaches — explore every corner of this extraordinary island.
          </p>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            background: 'rgba(255,255,255,0.96)',
            borderRadius: 50, overflow: 'hidden',
            maxWidth: 520,
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
          }}>
            <div style={{ padding: '0 18px', display: 'flex', alignItems: 'center' }}>
              <Search style={{ width: 18, height: 18, color: '#B8A090' }} />
            </div>
            <input
              type="text"
              placeholder="Search destinations..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: '#1A0A00', padding: '16px 0',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ padding: '0 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9B8878', fontSize: 18 }}
              >
                ×
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── CATEGORY FILTERS ─────────────────────────────── */}
      <section style={{ background: '#FFF7ED', borderBottom: '1px solid #FED7AA', padding: '20px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8A090', marginRight: 4 }}>
            Filter:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 18px', borderRadius: 24, border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600,
                transition: 'all 0.2s ease',
                background: category === cat ? 'linear-gradient(135deg, #F97316, #EA580C)' : '#FFFFFF',
                color: category === cat ? '#fff' : '#6B5744',
                boxShadow: category === cat
                  ? '0 4px 14px rgba(249,115,22,0.32)'
                  : '0 1px 4px rgba(0,0,0,0.08)',
                border: category === cat ? 'none' : '1px solid #E5DDD0',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── DESTINATIONS GRID ────────────────────────────── */}
      <section style={{ padding: '56px 40px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Results count */}
          {!loading && (
            <motion.p
              {...fadeUp()}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, color: '#9B8878', marginBottom: 32,
                fontWeight: 500,
              }}
            >
              Showing <strong style={{ color: '#F97316' }}>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
              {category !== 'All' ? ` in ${category}` : ''}
              {query ? ` for "${query}"` : ''}
            </motion.p>
          )}

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ height: 380, borderRadius: 16, background: '#F0EAE2', animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                >
                  <DestinationCard {...dest} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 28, fontWeight: 700, color: '#1A0A00', marginBottom: 12,
              }}>
                No destinations found
              </p>
              <p style={{ fontSize: 15, color: '#9B8878' }}>
                Try a different search term or category filter.
              </p>
              <button
                onClick={() => { setQuery(''); setCategory('All') }}
                style={{
                  marginTop: 24, padding: '12px 28px', borderRadius: 40, border: 'none',
                  background: 'linear-gradient(135deg, #F97316, #EA580C)',
                  color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(249,115,22,0.32)',
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
