'use client'

import { useEffect, useState } from 'react'
import type { ComponentType, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Star, MapPin, Clock, Calendar, ArrowLeft, Shield, Users, Camera, Compass, Waves, TreePine, CheckCircle2 } from 'lucide-react'
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

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Beach:      { bg: '#DBEAFE', text: '#1D4ED8' },
  Historical: { bg: '#FEF3C7', text: '#92400E' },
  Adventure:  { bg: '#FEE2E2', text: '#B91C1C' },
  Nature:     { bg: '#D1FAE5', text: '#065F46' },
  Spiritual:  { bg: '#EDE9FE', text: '#6D28D9' },
  Cultural:   { bg: '#FED7AA', text: '#C2410C' },
  Wildlife:   { bg: '#FEF9C3', text: '#713F12' },
}

type ActivityEntry = { label: string; Icon: ComponentType<{ style?: CSSProperties }> }

const CATEGORY_ACTIVITIES: Record<string, ActivityEntry[]> = {
  Wildlife:   [{ label: 'Jeep Safari', Icon: Compass }, { label: 'Photography', Icon: Camera }, { label: 'Bird Watching', Icon: TreePine }, { label: 'Nature Walk', Icon: TreePine }, { label: 'Expert Guides', Icon: Users }, { label: 'Conservation Tours', Icon: Shield }],
  Beach:      [{ label: 'Swimming', Icon: Waves }, { label: 'Surfing', Icon: Waves }, { label: 'Whale Watching', Icon: Compass }, { label: 'Photography', Icon: Camera }, { label: 'Snorkeling', Icon: Waves }, { label: 'Sunset Cruise', Icon: Compass }],
  Historical: [{ label: 'Guided Tours', Icon: Compass }, { label: 'Photography', Icon: Camera }, { label: 'Cultural Walk', Icon: Users }, { label: 'Archaeology', Icon: Shield }, { label: 'Heritage Trail', Icon: TreePine }, { label: 'Expert Guides', Icon: Users }],
  Nature:     [{ label: 'Hiking', Icon: TreePine }, { label: 'Photography', Icon: Camera }, { label: 'Bird Watching', Icon: Compass }, { label: 'Nature Walks', Icon: TreePine }, { label: 'Waterfall Visits', Icon: Waves }, { label: 'Expert Guides', Icon: Users }],
  Spiritual:  [{ label: 'Temple Visits', Icon: Compass }, { label: 'Meditation', Icon: Shield }, { label: 'Cultural Tours', Icon: Users }, { label: 'Photography', Icon: Camera }, { label: 'Pilgrimage Walks', Icon: TreePine }, { label: 'Local Rituals', Icon: Calendar }],
  Adventure:  [{ label: 'Trekking', Icon: TreePine }, { label: 'Rock Climbing', Icon: Shield }, { label: 'Photography', Icon: Camera }, { label: 'Guided Hikes', Icon: Compass }, { label: 'White Water', Icon: Waves }, { label: 'Expert Guides', Icon: Users }],
  Cultural:   [{ label: 'Guided Tours', Icon: Compass }, { label: 'Photography', Icon: Camera }, { label: 'Local Markets', Icon: Users }, { label: 'Cooking Class', Icon: Shield }, { label: 'Dance Shows', Icon: Calendar }, { label: 'Craft Villages', Icon: TreePine }],
}

const DEFAULT_ACTIVITIES: ActivityEntry[] = [
  { label: 'Guided Tours', Icon: Compass },
  { label: 'Photography', Icon: Camera },
  { label: 'Cultural Experience', Icon: Users },
  { label: 'Nature Walks', Icon: TreePine },
  { label: 'Local Cuisine', Icon: Calendar },
  { label: 'Expert Guides', Icon: Shield },
]

export default function DestinationDetailPage() {
  const params = useParams()
  const destinationId = params.id as string
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.json())
      .then((data: Destination[]) => {
        setDestination(data.find(d => d.id.toString() === destinationId) ?? null)
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [destinationId])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
        <Navbar />
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '3px solid #FED7AA', borderTopColor: '#F97316',
              margin: '0 auto 16px', animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#9B8878', fontSize: 14 }}>Loading destination…</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
        <Navbar />
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#1A0A00' }}>Destination not found</p>
          <Link href="/destinations" style={{
            padding: '12px 28px', borderRadius: 40, textDecoration: 'none',
            background: 'linear-gradient(135deg, #F97316, #EA580C)', color: '#fff',
            fontSize: 14, fontWeight: 700,
          }}>
            Back to Destinations
          </Link>
        </div>
      </div>
    )
  }

  const cat = CAT_COLORS[destination.category] ?? { bg: '#FED7AA', text: '#C2410C' }
  const activities = CATEGORY_ACTIVITIES[destination.category] ?? DEFAULT_ACTIVITIES

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '88vh',
        minHeight: 560,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        <motion.img
          src={destination.image_url}
          alt={destination.name}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.22) 40%, rgba(5,2,0,0.88) 100%)',
        }} />

        {/* Back button */}
        <Link href="/destinations" style={{
          position: 'absolute', top: 28, left: 40, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.22)',
          padding: '9px 16px', borderRadius: 40,
          textDecoration: 'none', color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, fontWeight: 600,
          transition: 'background 0.2s ease',
        }}>
          <ArrowLeft style={{ width: 15, height: 15 }} />
          All Destinations
        </Link>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            position: 'relative', zIndex: 2,
            maxWidth: 1200, margin: '0 auto',
            width: '100%', padding: '0 40px 64px',
          }}
        >
          {/* Category badge */}
          <span style={{
            display: 'inline-block', marginBottom: 16,
            padding: '5px 14px', borderRadius: 20,
            background: cat.bg, color: cat.text,
            fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            {destination.category}
          </span>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900, fontStyle: 'italic',
            color: '#FFFFFF', margin: '0 0 18px',
            lineHeight: 1.06, letterSpacing: '-0.01em', maxWidth: 750,
            textShadow: '0 4px 28px rgba(0,0,0,0.5)',
          }}>
            {destination.name}
          </h1>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
              <MapPin style={{ width: 15, height: 15, color: '#F97316' }} />
              Sri Lanka
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
              <Star style={{ width: 15, height: 15, fill: '#F59E0B', color: '#F59E0B' }} />
              {Number(destination.rating).toFixed(1)}
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                ({destination.reviews_count.toLocaleString()} reviews)
              </span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>
              <Clock style={{ width: 15, height: 15, color: '#F97316' }} />
              {destination.duration_days} {destination.duration_days === 1 ? 'day' : 'days'}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section style={{ padding: '64px 40px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>

          {/* ─ Left Column ─────────────────────────────── */}
          <div>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                background: '#FFFFFF', borderRadius: 16, overflow: 'hidden',
                border: '1px solid #F3EDE3',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                marginBottom: 48,
              }}
            >
              {[
                {
                  label: 'Guest Rating',
                  value: (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Star style={{ width: 18, height: 18, fill: '#F59E0B', color: '#F59E0B' }} />
                      {Number(destination.rating).toFixed(1)}
                    </span>
                  ),
                  sub: `${destination.reviews_count.toLocaleString()} reviews`,
                },
                {
                  label: 'Duration',
                  value: (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar style={{ width: 18, height: 18, color: '#F97316' }} />
                      {destination.duration_days}
                    </span>
                  ),
                  sub: destination.duration_days === 1 ? 'day' : 'days',
                },
                {
                  label: 'Starting From',
                  value: <span style={{ color: '#F97316' }}>${destination.price_from.toLocaleString()}</span>,
                  sub: 'per person',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '28px 24px', textAlign: 'center',
                    borderRight: i < 2 ? '1px solid #F3EDE3' : undefined,
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8A090', margin: '0 0 10px' }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 26, fontWeight: 700, color: '#1A0A00', margin: '0 0 4px', lineHeight: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 12, color: '#9B8878', margin: 0 }}>{stat.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              style={{ marginBottom: 48 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 4, height: 28, background: 'linear-gradient(180deg, #F97316, #EA580C)', borderRadius: 4 }} />
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700,
                  color: '#1A0A00', margin: 0,
                }}>
                  About This Destination
                </h2>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.8, color: '#5A4030', margin: 0 }}>
                {destination.description}
              </p>
            </motion.div>

            {/* Highlights */}
            {destination.highlights?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
                style={{ marginBottom: 48 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 28, background: 'linear-gradient(180deg, #F97316, #EA580C)', borderRadius: 4 }} />
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700,
                    color: '#1A0A00', margin: 0,
                  }}>
                    Highlights
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                  {destination.highlights.map((hl, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      background: '#FFFFFF', borderRadius: 12, padding: '14px 18px',
                      border: '1px solid #F3EDE3',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                      <CheckCircle2 style={{ width: 18, height: 18, color: '#F97316', flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#5A4030', lineHeight: 1.5 }}>
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 4, height: 28, background: 'linear-gradient(180deg, #F97316, #EA580C)', borderRadius: 4 }} />
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 700,
                  color: '#1A0A00', margin: 0,
                }}>
                  Activities & Experiences
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {activities.map(({ label, Icon }, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '20px 16px', borderRadius: 12, textAlign: 'center',
                    background: '#FFFFFF', border: '1px solid #F3EDE3',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    cursor: 'default',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon style={{ width: 20, height: 20, color: '#F97316' }} />
                    </div>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#3D2010' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─ Right Column: Booking Card ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ position: 'sticky', top: 100 }}
          >
            <div style={{
              background: '#FFFFFF', borderRadius: 20,
              border: '1px solid #F3EDE3',
              boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{
                background: 'linear-gradient(135deg, #1A0A00 0%, #3D1800 100%)',
                padding: '28px 28px 24px',
              }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 6px' }}>
                  Starting from
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 44, fontWeight: 900, color: '#F97316',
                  margin: '0 0 4px', lineHeight: 1,
                }}>
                  ${destination.price_from.toLocaleString()}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  per person · {destination.duration_days} {destination.duration_days === 1 ? 'day' : 'days'}
                </p>
              </div>

              {/* Card body */}
              <div style={{ padding: '24px 28px 28px' }}>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    flex: 1, padding: '14px', borderRadius: 10,
                    background: '#FFF7ED', border: '1px solid #FED7AA', textAlign: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 3 }}>
                      <Star style={{ width: 14, height: 14, fill: '#F59E0B', color: '#F59E0B' }} />
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1A0A00' }}>
                        {Number(destination.rating).toFixed(1)}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#9B8878', margin: 0 }}>Guest rating</p>
                  </div>
                  <div style={{
                    flex: 1, padding: '14px', borderRadius: 10,
                    background: '#FFF7ED', border: '1px solid #FED7AA', textAlign: 'center',
                  }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1A0A00', display: 'block', marginBottom: 3 }}>
                      {destination.duration_days}
                    </span>
                    <p style={{ fontSize: 11, color: '#9B8878', margin: 0 }}>
                      {destination.duration_days === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    href="/contact"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '15px 24px', borderRadius: 12,
                      background: 'linear-gradient(135deg, #F97316, #EA580C)',
                      color: '#fff', textDecoration: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14, fontWeight: 700, letterSpacing: '0.04em',
                      boxShadow: '0 6px 20px rgba(249,115,22,0.38)',
                    }}
                  >
                    Enquire About This Trip →
                  </Link>
                  <a
                    href="https://wa.me/94XXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '14px 24px', borderRadius: 12,
                      background: '#25D366', color: '#fff', textDecoration: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14, fontWeight: 700, letterSpacing: '0.04em',
                      boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                    }}
                  >
                    WhatsApp Us
                  </a>
                  <Link
                    href="/destinations"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '13px 24px', borderRadius: 12,
                      border: '1.5px solid #E5DDD0', background: 'transparent',
                      color: '#6B5744', textDecoration: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13, fontWeight: 600,
                    }}
                  >
                    ← Browse All Destinations
                  </Link>
                </div>

                {/* Trust badges */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #F3EDE3', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { Icon: Users, text: 'Expert local guides included' },
                    { Icon: Shield, text: 'Flexible booking & cancellation' },
                    { Icon: CheckCircle2, text: '24/7 customer support' },
                  ].map(({ Icon, text }, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Icon style={{ width: 13, height: 13, color: '#F97316' }} />
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6B5744' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FEF3C7 100%)',
        padding: '72px 40px',
        borderTop: '1px solid #FED7AA',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EA580C', marginBottom: 12 }}>
            Ready to visit?
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700,
            color: '#1A0A00', margin: '0 0 14px', lineHeight: 1.2,
          }}>
            Let Us Plan Your {destination.name} Experience
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#6B5744', lineHeight: 1.75, margin: '0 0 32px' }}>
            Our expert team crafts personalized itineraries around your interests and budget — completely free.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#fff', padding: '14px 30px', borderRadius: 40,
              textDecoration: 'none', fontSize: 14, fontWeight: 700,
              boxShadow: '0 6px 20px rgba(249,115,22,0.38)',
            }}>
              Contact Our Team →
            </Link>
            <Link href="/destinations" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#FFFFFF', color: '#5A4030',
              padding: '14px 30px', borderRadius: 40,
              textDecoration: 'none', fontSize: 14, fontWeight: 600,
              border: '1.5px solid #E5DDD0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              Explore More Destinations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
