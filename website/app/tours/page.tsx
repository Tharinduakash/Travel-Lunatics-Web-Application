'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Sun, Map, Star, Wallet, Users, Heart, Globe, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

const TOUR_TYPES = [
  {
    id: 1,
    icon: Sun,
    label: 'Day Tours',
    title: 'Day Tours',
    color: '#F59E0B',
    colorBg: '#FEF3C7',
    image: '/webp/udawalawe.webp',
    tagline: 'Quick island escapes — done in a day',
    description: 'Perfect 1-2 day safari and sightseeing experiences to Sri Lanka\'s most iconic sites. No overnight commitment required.',
    features: ['Jeep safaris & wildlife parks', 'Ancient site guided tours', 'Comfortable transport included'],
    packages: '12+ packages',
    duration: '1–2 days',
    href: '/tours/day-tours',
  },
  {
    id: 2,
    icon: Map,
    label: 'Multi-Day Tours',
    title: 'Multi-Day Tours',
    color: '#16A34A',
    colorBg: '#D1FAE5',
    image: '/webp/sigiriya1.webp',
    tagline: 'Complete island journeys, 9 to 16 days',
    description: 'Comprehensive round tours covering culture, wildlife, highlands and beaches. The definitive way to experience all of Sri Lanka.',
    features: ['Full round-island circuits', 'Half-board hotel stays', 'Airport transfers included'],
    packages: '5+ packages',
    duration: '9–16 days',
    href: '/tours/multi-day',
  },
  {
    id: 3,
    icon: Star,
    label: 'Luxury Tours',
    title: 'Luxury Tours',
    color: '#C6A25C',
    colorBg: '#FEF9C3',
    image: '/webp/WELIGAMA.webp',
    tagline: 'Premium experiences, boutique stays',
    description: 'High-end curated journeys with boutique hotels, private guides and exclusive experiences for discerning travellers.',
    features: ['Boutique & luxury hotels', 'Private chauffeur guides', 'VIP airport & site access'],
    packages: '4+ packages',
    duration: '7–16 days',
    href: '/tours/luxury',
    badge: 'Premium',
  },
  {
    id: 4,
    icon: Wallet,
    label: 'Budget Tours',
    title: 'Budget Tours',
    color: '#0EA5E9',
    colorBg: '#E0F2FE',
    image: '/webp/ella-rock-7.webp',
    tagline: 'Incredible Sri Lanka, great value prices',
    description: 'Affordable island adventures that never compromise on experience. Quality hotels, expert guides, and best-value routes.',
    features: ['All-inclusive pricing', 'Quality star-class hotels', 'No hidden costs'],
    packages: '5+ packages',
    duration: '6–13 days',
    href: '/tours/budget',
  },
  {
    id: 5,
    icon: Users,
    label: 'Private Tours',
    title: 'Private Tours',
    color: '#7C3AED',
    colorBg: '#EDE9FE',
    image: '/webp/Sigiriya Frescoes 01.webp',
    tagline: 'Fully customized, exclusively yours',
    description: 'Personalized private journeys designed around your exact dates, pace and interests. Your Sri Lanka, your way.',
    features: ['Custom itinerary built for you', 'Private vehicle & guide', 'Fully flexible schedule'],
    packages: '5+ packages',
    duration: 'Flexible',
    href: '/tours/private',
  },
  {
    id: 6,
    icon: Globe,
    label: 'Group Tours',
    title: 'Group Tours',
    color: '#EA580C',
    colorBg: '#FFEDD5',
    image: '/webp/kandy2.webp',
    tagline: 'Travel together, share the adventure',
    description: 'Join like-minded travellers on shared journeys with expert guides, fixed departures and the energy of a great group.',
    features: ['Fixed group departures', 'Expert group guides', 'Social travel experience'],
    packages: '3+ packages',
    duration: '7–14 days',
    href: '/tours/group',
  },
  {
    id: 7,
    icon: Heart,
    label: 'Honeymoon Packages',
    title: 'Honeymoon Packages',
    color: '#DB2777',
    colorBg: '#FCE7F3',
    image: '/webp/mirissa-beach.webp',
    tagline: 'Romantic Sri Lanka for two',
    description: 'Magical romantic escapes for couples — from secluded beaches and candlelit dinners to private highland retreats.',
    features: ['Romantic beachfront hotels', 'Couples-only experiences', 'Private transfers & dining'],
    packages: '4+ packages',
    duration: '7–11 days',
    href: '/tours/honeymoon',
    badge: 'Romantic',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function ToursPage() {
  const [hovered, setHovered] = useState<number | null>(null)

  const featured = TOUR_TYPES.slice(0, 3)
  const standard = TOUR_TYPES.slice(3)

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .feat-img { transition: transform 0.7s cubic-bezier(.4,0,.2,1); }
        .feat-card:hover .feat-img { transform: scale(1.06); }

        .std-img { transition: transform 0.6s cubic-bezier(.4,0,.2,1); }
        .std-card:hover .std-img { transform: scale(1.08); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F5EDE4; }
        ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.4); border-radius: 3px; }

        .cta-fill {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 2px; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #F97316; border: 1px solid rgba(249,115,22,0.5);
          background: transparent;
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .cta-fill::before {
          content: ''; position: absolute; inset: 0;
          background: #F97316;
          transform: translateX(-102%);
          transition: transform 0.35s cubic-bezier(.4,0,.2,1);
        }
        .cta-fill:hover { color: #fff; border-color: #F97316; }
        .cta-fill:hover::before { transform: translateX(0); }
        .cta-fill span { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }

        .cta-solid {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 2px; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          background: #F97316; color: #fff;
          border: 1px solid #F97316;
          transition: background 0.25s ease;
        }
        .cta-solid:hover { background: #EA580C; }
      `}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '72vh', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <img
          src="/webp/sigiriya2.webp"
          alt="Sri Lanka Tour Packages"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(15,5,0,0.88) 100%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 40px 72px' }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316' }}>
              Tour Packages
            </span>
            <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 5.8vw, 74px)',
            fontWeight: 900, fontStyle: 'italic',
            color: '#FFFFFF', margin: '0 0 14px',
            lineHeight: 1.06, maxWidth: 680,
            textShadow: '0 4px 28px rgba(0,0,0,0.45)',
          }}>
            Find Your Perfect{' '}
            <span style={{ color: '#F97316' }}>Sri Lanka</span> Tour
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 32px', maxWidth: 480, lineHeight: 1.7, fontWeight: 300,
          }}>
            From short day safaris to 16-day grand circuits — browse our full range of Sri Lanka tour packages by style.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            {[
              { n: '7', l: 'Tour Styles' },
              { n: '30+', l: 'Packages' },
              { n: '4.9★', l: 'Avg Rating' },
            ].map(({ n, l }) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontStyle: 'italic', color: '#F97316', lineHeight: 1 }}>{n}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PAGE BODY ─────────────────────────────────────── */}
      <div style={{ background: '#FAFAF8' }}>

        {/* ── FEATURED TOURS ───────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 0' }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316', margin: 0 }}>
                Featured Experiences
              </p>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, fontStyle: 'italic',
              color: '#1A0A00', margin: 0,
            }}>
              Most Popular <span style={{ color: '#F97316' }}>Journeys</span>
            </h2>
          </motion.div>

          {/* 3-column asymmetric: tall left, two stacked right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>

            {/* Large featured card */}
            {featured.slice(0, 1).map((tour) => {
              const Icon = tour.icon
              const isHov = hovered === tour.id
              return (
                <motion.div
                  key={tour.id}
                  {...fadeUp(0)}
                  className="feat-card"
                  style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: 4, boxShadow: isHov ? '0 16px 48px rgba(0,0,0,0.18)' : '0 4px 20px rgba(0,0,0,0.10)', transition: 'box-shadow 0.35s ease' }}
                  onMouseEnter={() => setHovered(tour.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{ position: 'relative', height: '100%', minHeight: 560 }}>
                    <img src={tour.image} alt={tour.title} className="feat-img"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,0,0.96) 0%, rgba(10,5,0,0.15) 55%, transparent 100%)' }} />

                    {/* Top row */}
                    <div style={{ position: 'absolute', top: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', padding: '5px 12px 5px 8px', borderRadius: 2 }}>
                        <div style={{ width: 28, height: 28, background: tour.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                          <Icon style={{ width: 14, height: 14, color: '#fff' }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B5744' }}>
                          {tour.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '5px 10px', borderRadius: 2 }}>
                        <Clock style={{ width: 11, height: 11, color: '#9B8878' }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#6B5744', fontWeight: 600 }}>{tour.duration}</span>
                      </div>
                    </div>

                    {/* Content at bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 28px' }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: tour.color, marginBottom: 8 }}>
                        {tour.tagline}
                      </p>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, fontStyle: 'italic', color: '#fff', margin: '0 0 12px', lineHeight: 1.1 }}>
                        {tour.title}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: '0 0 18px' }}>
                        {tour.description}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22 }}>
                        {tour.features.map((f) => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 4, height: 4, transform: 'rotate(45deg)', background: tour.color, flexShrink: 0 }} />
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em' }}>{tour.packages}</span>
                        <Link href={tour.href} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 7,
                          padding: '9px 20px',
                          background: isHov ? tour.color : 'rgba(255,255,255,0.15)',
                          border: `1px solid ${isHov ? tour.color : 'rgba(255,255,255,0.3)'}`,
                          color: '#fff', textDecoration: 'none',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                          borderRadius: 2, transition: 'all 0.3s ease',
                        }}>
                          View Packages <ArrowRight style={{ width: 12, height: 12 }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Two smaller featured cards */}
            {featured.slice(1).map((tour, fi) => {
              const Icon = tour.icon
              const isHov = hovered === tour.id
              return (
                <motion.div
                  key={tour.id}
                  {...fadeUp(0.1 + fi * 0.12)}
                  className="feat-card"
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: 272, borderRadius: 4, boxShadow: isHov ? '0 12px 36px rgba(0,0,0,0.16)' : '0 4px 16px rgba(0,0,0,0.10)', transition: 'box-shadow 0.35s ease' }}
                  onMouseEnter={() => setHovered(tour.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <img src={tour.image} alt={tour.title} className="feat-img"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,0,0.94) 0%, rgba(10,5,0,0.10) 60%, transparent 100%)' }} />
                  {tour.badge && (
                    <span style={{
                      position: 'absolute', top: 16, left: 16,
                      background: tour.color, color: '#fff',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 2,
                    }}>{tour.badge}</span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 9px', borderRadius: 2 }}>
                    <Clock style={{ width: 10, height: 10, color: '#9B8878' }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#6B5744', fontWeight: 600 }}>{tour.duration}</span>
                  </div>

                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                      <div style={{ width: 24, height: 24, background: tour.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                        <Icon style={{ width: 11, height: 11, color: '#fff' }} />
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{tour.label}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: '#fff', margin: '0 0 6px', lineHeight: 1.15 }}>{tour.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.62)', margin: '0 0 14px', lineHeight: 1.55 }}>{tour.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em' }}>{tour.packages}</span>
                      <Link href={tour.href} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '7px 14px',
                        background: isHov ? tour.color : 'rgba(255,255,255,0.12)',
                        border: `1px solid ${isHov ? tour.color : 'rgba(255,255,255,0.25)'}`,
                        color: '#fff', textDecoration: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                        borderRadius: 2, transition: 'all 0.3s ease', whiteSpace: 'nowrap',
                      }}>
                        View <ArrowRight style={{ width: 10, height: 10 }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── STANDARD TOURS ───────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px 0' }}>
          <motion.div {...fadeUp()} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 32, height: 2, background: '#F97316', borderRadius: 2 }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316', margin: 0 }}>
                  More Ways to Explore
                </p>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, fontStyle: 'italic', color: '#1A0A00', margin: 0 }}>
                All Travel <span style={{ color: '#F97316' }}>Styles</span>
              </h2>
            </div>
            <Link href="/contact" className="cta-fill">
              <span>Custom Tour Enquiry <ArrowRight style={{ width: 14, height: 14 }} /></span>
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {standard.map((tour, i) => {
              const Icon = tour.icon
              const isHov = hovered === tour.id
              return (
                <motion.div
                  key={tour.id}
                  {...fadeUp(i * 0.08)}
                  className="std-card"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${isHov ? tour.color + '55' : '#F0E8DC'}`,
                    borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                    boxShadow: isHov ? `0 12px 36px rgba(0,0,0,0.12), 0 0 0 1px ${tour.color}22` : '0 2px 12px rgba(0,0,0,0.07)',
                    transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                    display: 'flex', flexDirection: 'column',
                  }}
                  onMouseEnter={() => setHovered(tour.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                    <img src={tour.image} alt={tour.title} className="std-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,5,0,0.55) 0%, transparent 55%)' }} />

                    {/* Top labels */}
                    <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(8px)', padding: '4px 10px 4px 6px', borderRadius: 2 }}>
                        <div style={{ width: 20, height: 20, background: tour.color, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                          <Icon style={{ width: 10, height: 10, color: '#fff' }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B5744' }}>{tour.label}</span>
                      </div>
                      {tour.badge ? (
                        <span style={{ background: tour.color, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 7, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2 }}>{tour.badge}</span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(8px)', padding: '4px 8px', borderRadius: 2 }}>
                          <Clock style={{ width: 9, height: 9, color: '#9B8878' }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: '#6B5744', fontWeight: 600 }}>{tour.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Accent bar bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: tour.color, opacity: isHov ? 1 : 0, transition: 'opacity 0.35s ease' }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: tour.color, margin: '0 0 7px' }}>
                      {tour.tagline}
                    </p>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: '#1A0A00', margin: '0 0 8px', lineHeight: 1.2 }}>
                      {tour.title}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9B8878', lineHeight: 1.65, margin: '0 0 14px', flex: 1 }}>
                      {tour.description}
                    </p>

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                      {tour.features.map((f) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 3, height: 3, transform: 'rotate(45deg)', background: tour.color, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#6B5744', lineHeight: 1.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #F0E8DC' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#B8A090', letterSpacing: '0.1em' }}>{tour.packages}</span>
                      <Link href={tour.href} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '7px 14px',
                        background: isHov ? tour.color : 'transparent',
                        border: `1px solid ${isHov ? tour.color : tour.color + '55'}`,
                        color: isHov ? '#fff' : tour.color,
                        textDecoration: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                        borderRadius: 2, transition: 'all 0.25s ease', whiteSpace: 'nowrap',
                      }}>
                        View Packages <ArrowRight style={{ width: 10, height: 10 }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '64px auto 0', padding: '0 40px 96px' }}>
          <motion.div
            {...fadeUp()}
            style={{
              position: 'relative', overflow: 'hidden',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: 8,
              padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 72px)',
            }}
          >
            {/* Ambient glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(249,115,22,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #F97316 30%, #F97316 70%, transparent)', borderRadius: '8px 8px 0 0' }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F97316', marginBottom: 14 }}>
                Can't find what you're looking for?
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, fontStyle: 'italic',
                color: '#1A0A00', margin: '0 0 14px', lineHeight: 1.2,
              }}>
                We Design Custom Itineraries —{' '}
                <span style={{ color: '#F97316' }}>Free of Charge</span>
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '18px 0 24px' }}>
                <div style={{ width: 32, height: 1, background: 'rgba(249,115,22,0.35)' }} />
                <div style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: 'rgba(249,115,22,0.5)' }} />
                <div style={{ width: 32, height: 1, background: 'rgba(249,115,22,0.35)' }} />
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#6B5744', lineHeight: 1.75, margin: '0 0 36px', fontWeight: 400 }}>
                Tell our travel experts your dream Sri Lanka journey — we'll build a personalized itinerary around your dates, interests and budget.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" className="cta-solid">
                  Plan My Custom Tour <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
                <a href="https://wa.me/94XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="cta-fill">
                  <span>WhatsApp Us <ArrowRight style={{ width: 14, height: 14 }} /></span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      <Footer />
    </main>
  )
}
