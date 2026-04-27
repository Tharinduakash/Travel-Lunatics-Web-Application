'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── TYPES ────────────────────────────────────────────────────────
type DayEntry = { day: string; title: string; desc: string }
export type TourPackage = {
  id: number
  name: string
  duration: string
  theme: string
  perfectFor?: string
  description?: string
  days: DayEntry[]
  includes: string[]
  badge?: string
  image?: string
}
type TourPageLayoutProps = {
  heroImage: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroGradient: string
  allInclude: string[]
  packages: TourPackage[]
}

// ─── ANIMATION HELPERS ────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── PACKAGE CARD ─────────────────────────────────────────────────
function PackageCard({ pkg, index }: { pkg: TourPackage; index: number }) {
  const [open, setOpen] = useState(false)
  const hasImage = Boolean(pkg.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="pkg-card"
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.09)',
        border: '1px solid rgba(0,0,0,0.06)',
        marginBottom: 36,
      }}
    >
      {/* ── Left: Image Panel ─────────────────────────── */}
      {hasImage && (
        <div className="pkg-image-panel" style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={pkg.image}
            alt={pkg.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Right-side fade to blend into content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 60%, rgba(255,255,255,0.06) 100%)',
          }} />
          {/* Bottom scrim for badge readability */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
          }} />
          {/* Number badge overlaid on image */}
          <div style={{
            position: 'absolute',
            bottom: 18,
            left: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 17,
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              flexShrink: 0,
            }}>
              {pkg.id}
            </div>
            {pkg.badge && (
              <span style={{
                background: 'linear-gradient(135deg, #F97316, #EA580C)',
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                {pkg.badge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Right: Content Panel ───────────────────────── */}
      <div className="pkg-content-panel" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Package Header */}
        <div style={{ padding: '28px 32px 22px', borderBottom: '1px solid #F3EDE3' }}>
          {/* When no image, show number badge inline */}
          {!hasImage && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F97316, #EA580C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: '#fff',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontSize: 18,
                boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
              }}>
                {pkg.id}
              </div>
              <div style={{ flex: 1 }}>
                <PackageTitle pkg={pkg} />
              </div>
            </div>
          )}

          {/* When image exists, title is full width */}
          {hasImage && (
            <div>
              <PackageTitle pkg={pkg} />
            </div>
          )}

          {pkg.description && (
            <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.75, color: '#5A4030' }}>
              {pkg.description}
            </p>
          )}
        </div>

        {/* Accordion Toggle */}
        <div style={{ padding: '18px 32px' }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: open ? '#FFF7ED' : 'transparent',
              border: `1.5px solid ${open ? '#FED7AA' : '#E5DDD0'}`,
              borderRadius: 8,
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              color: open ? '#EA580C' : '#5A4030',
              transition: 'all 0.25s ease',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <span style={{ flex: 1 }}>View Full Itinerary</span>
            <span style={{
              display: 'inline-block',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: 12,
            }}>
              ▼
            </span>
          </button>

          {/* Accordion Content */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="accordion"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: 24 }}>
                  <div style={{ position: 'relative', paddingLeft: 28 }}>
                    <div style={{
                      position: 'absolute',
                      left: 7, top: 8, bottom: 8,
                      width: 2,
                      background: 'linear-gradient(180deg, #F97316 0%, #FED7AA 100%)',
                      borderRadius: 2,
                    }} />
                    {pkg.days.map((d, i) => (
                      <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
                        <div style={{
                          position: 'absolute',
                          left: -28, top: 4,
                          width: 16, height: 16,
                          borderRadius: '50%',
                          background: '#F97316',
                          border: '2px solid #FFF7ED',
                          boxShadow: '0 0 0 2px #F97316',
                        }} />
                        <div>
                          <span style={{ fontWeight: 700, color: '#EA580C', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            {d.day}
                          </span>
                          <h4 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 16, fontWeight: 700, color: '#1A0A00',
                            margin: '2px 0 4px',
                          }}>
                            {d.title}
                          </h4>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#6B5744' }}>
                            {d.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Package Includes & CTA */}
        <div style={{
          padding: '22px 32px 28px',
          background: '#FAFAF8',
          borderTop: '1px solid #F3EDE3',
          marginTop: 'auto',
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 15, fontWeight: 700, color: '#1A0A00',
            margin: '0 0 14px',
          }}>
            This Package Includes
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px 20px',
            marginBottom: 22,
          }}>
            {pkg.includes.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: '#F97316', fontWeight: 700, fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: '#5A4030', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: 40,
              textDecoration: 'none',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.06em',
              boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
            }}
          >
            Enquire About This Package →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Shared sub-component for package title + pills
function PackageTitle({ pkg }: { pkg: TourPackage }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(17px, 2.2vw, 22px)',
          fontWeight: 700, color: '#1A0A00',
          margin: 0, lineHeight: 1.2,
        }}>
          {pkg.name}
        </h2>
        {pkg.badge && !pkg.image && (
          <span style={{
            background: 'linear-gradient(135deg, #F97316, #EA580C)',
            color: '#fff', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 4,
          }}>
            {pkg.badge}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: pkg.perfectFor ? 8 : 0 }}>
        <span style={{
          background: '#FFF7ED', border: '1px solid #FED7AA',
          color: '#EA580C', fontSize: 12, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
        }}>
          {pkg.duration}
        </span>
        <span style={{
          background: '#FAFAF8', border: '1px solid #E5DDD0',
          color: '#6B5744', fontSize: 12, fontWeight: 500,
          padding: '4px 12px', borderRadius: 20,
        }}>
          {pkg.theme}
        </span>
      </div>
      {pkg.perfectFor && (
        <p style={{ margin: 0, fontSize: 13, color: '#8B6F4E', fontStyle: 'italic' }}>
          Perfect for: {pkg.perfectFor}
        </p>
      )}
    </>
  )
}

// ─── MAIN LAYOUT ──────────────────────────────────────────────────
export function TourPageLayout({
  heroImage,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroGradient,
  allInclude,
  packages,
}: TourPageLayoutProps) {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

        .pkg-card {
          display: flex;
          flex-direction: row;
        }
        .pkg-image-panel {
          width: 340px;
          min-height: 340px;
        }
        .pkg-content-panel {
          flex: 1;
        }
        @media (max-width: 900px) {
          .pkg-image-panel { width: 280px; min-height: 280px; }
        }
        @media (max-width: 680px) {
          .pkg-card { flex-direction: column; }
          .pkg-image-panel { width: 100% !important; height: 220px; min-height: 220px !important; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', height: '100vh', minHeight: 520,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', overflow: 'hidden',
      }}>
        <img
          src={heroImage}
          alt={heroTitle}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: heroGradient }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', zIndex: 2,
            maxWidth: 1200, margin: '0 auto',
            padding: '0 40px 80px', width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 2, background: '#F97316', borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#F97316' }}>
              {heroEyebrow}
            </span>
            <div style={{ width: 36, height: 2, background: '#F97316', borderRadius: 2 }} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900, color: '#FFFFFF',
            margin: '0 0 16px', lineHeight: 1.08,
            letterSpacing: '-0.01em', maxWidth: 700,
          }}>
            {heroTitle}
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 32px', maxWidth: 540,
            lineHeight: 1.7, fontWeight: 300,
          }}>
            {heroSubtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, opacity: 0.7 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Scroll to explore
            </span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, rgba(249,115,22,0.8), transparent)' }} />
          </div>
        </motion.div>
      </section>

      {/* ── INCLUSIONS BANNER ─────────────────────────────────── */}
      <section style={{ background: '#FFF7ED', padding: '64px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EA580C', marginBottom: 12 }}>
              Included in every package
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 700, color: '#1A0A00', margin: 0,
            }}>
              All Packages Include
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {allInclude.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.06)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  background: '#FFFFFF', borderRadius: 10,
                  padding: '16px 20px',
                  border: '1px solid #FED7AA',
                  boxShadow: '0 2px 8px rgba(249,115,22,0.06)',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F97316, #EA580C)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#fff', fontSize: 12, fontWeight: 700,
                }}>
                  ✓
                </div>
                <span style={{ fontSize: 14, color: '#5A4030', lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES SECTION ──────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EA580C', marginBottom: 12 }}>
              Choose your journey
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.8vw, 44px)',
              fontWeight: 700, color: '#1A0A00', margin: 0,
            }}>
              Our Tour Packages
            </h2>
          </motion.div>

          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FEF3C7 100%)',
        padding: '80px 40px',
        borderTop: '1px solid #FED7AA',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EA580C', marginBottom: 12 }}>
              Ready to explore?
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700, color: '#1A0A00',
              margin: '0 0 16px', lineHeight: 1.2,
            }}>
              Let Us Plan Your Perfect Sri Lanka Journey
            </h2>
            <p style={{ fontSize: 16, color: '#6B5744', lineHeight: 1.75, margin: '0 0 36px' }}>
              Our expert travel team will craft a personalized itinerary around your interests, pace, and budget — completely free.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #F97316, #EA580C)',
                  color: '#fff', padding: '15px 32px', borderRadius: 40,
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.04em',
                  boxShadow: '0 6px 20px rgba(249,115,22,0.4)',
                }}
              >
                Contact Our Team →
              </Link>

              <a
                href="https://wa.me/94XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: '#fff',
                  padding: '15px 32px', borderRadius: 40,
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.04em',
                  boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
                }}
              >
                WhatsApp Us →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
