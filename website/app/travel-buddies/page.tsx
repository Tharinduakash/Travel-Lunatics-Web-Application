'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Star, Upload, X, MapPin, Calendar, Camera,
  ChevronRight, ChevronLeft, CheckCircle, Heart, ArrowRight, Loader2,
} from 'lucide-react'

/* ── Types ────────────────────────────────────────────────────── */
interface Review {
  id: number
  name: string
  country: string
  rating: number
  travel_type: string
  places: string[]
  travel_date: string
  review: string
  image_url: string | null
  approved: boolean
  created_at?: string
  _pending?: boolean
}

/* ── Data ─────────────────────────────────────────────────────── */
const SL_PLACES = [
  'Sigiriya Rock Fortress','Ella Rock','Little Adams Peak','Nine Arch Bridge',
  'Mirissa Beach','Unawatuna Beach','Hikkaduwa Beach','Arugam Bay',
  'Nilaveli Beach','Bentota Beach','Tangalle Beach','Pasikudah Beach',
  'Temple of Sacred Tooth (Kandy)','Dambulla Cave Temple','Anuradhapura',
  'Polonnaruwa','Galle Fort','Yala National Park','Udawalawe National Park',
  'Wilpattu National Park','Minneriya National Park','Kaudulla National Park',
  "Adams Peak (Sri Pada)","Horton Plains & World's End",'Knuckles Range',
  'Pidurangala Rock','Sinharaja Forest Reserve','Ravana Falls',
  'Bambarakanda Falls','Diyaluma Falls','Kitulgala','Nuwara Eliya',
  'Tea Plantations (Hatton)','Nainativu Island','Trincomalee',
  'Colombo City','Negombo','Jaffna','Mannar Island','Delft Island',
]

const TRAVEL_TYPES = [
  { id: 'solo',    label: 'Solo',       emoji: '🧳' },
  { id: 'couple',  label: 'Couple',     emoji: '💑' },
  { id: 'family',  label: 'Family',     emoji: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends',    emoji: '👯' },
  { id: 'group',   label: 'Group Tour', emoji: '🚌' },
]

const FALLBACK_IMAGES = [
  '/webp/Travel1.webp',
  '/webp/78.webp',
  '/webp/shutterstock_374392756- surfer.webp',
  '/webp/arugam-bay-surfing.webp',
  '/webp/adams-peak.webp',
  '/webp/pexels-freestockpro-320184.webp',
]

const SEED_REVIEWS: Review[] = [
  
]



/* ── Helpers ─────────────────────────────────────────────────── */
function travelLabel(id: string) {
  const t = TRAVEL_TYPES.find(t => t.id === id)
  return t ? `${t.emoji} ${t.label}` : id
}
function pickFallback(id: number) {
  return FALLBACK_IMAGES[Math.abs(id) % FALLBACK_IMAGES.length]
}

/* ── Sub-components ──────────────────────────────────────────── */
function StepDot({ active, done, n }: { active: boolean; done: boolean; n: number }) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
      done ? 'text-[#04100a]' : active ? 'text-[#04100a]' : 'text-[var(--text-faint)]'
    }`} style={{ background: done || active ? 'var(--accent)' : 'var(--bg-card)', border: done || active ? 'none' : '1px solid var(--border)' }}>
      {done ? <CheckCircle size={14} /> : n}
    </div>
  )
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button" onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110">
          <Star size={28}
            fill={(hover || value) >= i ? 'var(--accent)' : 'transparent'}
            stroke={(hover || value) >= i ? 'var(--accent)' : 'var(--border-h)'} />
        </button>
      ))}
    </div>
  )
}

function PlaceTag({ place, selected, onToggle }: { place: string; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      style={{
        background: selected ? 'var(--accent)' : 'var(--bg-card)',
        color: selected ? 'var(--badge-text)' : 'var(--text-muted)',
        border: selected ? 'none' : '1px solid var(--border)',
        transform: selected ? 'scale(1.03)' : 'scale(1)',
      }}>
      {place}
    </button>
  )
}

/* ── ReviewCard — uniform size ───────────────────────────────── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const imgSrc = review.image_url 
  return (
    <motion.div
      className="tb-card rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.07 }}>

      {/* Photo — fixed 200px, identical for every card */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
          {imgSrc ? (
            <img src={imgSrc} alt={review.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          ) : (
            // Clean gradient placeholder when no photo uploaded
            <div className="w-full h-full" style={{
              background: 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)'
            }} />
          )}
          {/* ...rest of overlays unchanged */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--accent)' }}>
          <Star size={10} fill="var(--accent)" stroke="none" />
          {review.rating}.0
        </div>

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md"
          style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.85)' }}>
          {travelLabel(review.travel_type)}
        </div>

        {review._pending && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: 'var(--accent2)', color: '#fff' }}>
            ⏳ Pending approval
          </div>
        )}
      </div>

      {/* Content — flex-1 stretches to match tallest card in row */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{review.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{review.country}</p>
          </div>
          <div className="flex items-center gap-1 text-xs flex-shrink-0 ml-2" style={{ color: 'var(--text-faint)' }}>
            <Calendar size={10} />{review.travel_date}
          </div>
        </div>

        {/* Clamped to exactly 3 lines — content never pushes card taller */}
        <p className="text-sm leading-relaxed mb-4 review-text flex-1" style={{ color: 'var(--text-muted)' }}>
          &ldquo;{review.review}&rdquo;
        </p>

        {/* Max 3 place tags — tag row always 1 line */}
        <div className="flex flex-wrap gap-1.5">
          {review.places.slice(0, 3).map((p, pi) => (
            <span key={pi} className="text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
              style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
              📍 {p}
            </span>
          ))}
          {review.places.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--bg-card)', color: 'var(--text-faint)', border: '1px solid var(--border)' }}>
              +{review.places.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ══ Main page ════════════════════════════════════════════════ */
export default function TravelBuddiesPage() {
  const [step, setStep]           = useState(1)
  const [showForm, setShowForm]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [placeSearch, setPlaceSearch] = useState('')
  const [dragOver, setDragOver]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const [reviews, setReviews]           = useState<Review[]>(SEED_REVIEWS)
  const [loadingReviews, setLoadingReviews] = useState(true)

  /* Fetch live reviews from DB on mount — replace seeds if any exist */
  useEffect(() => {
    fetch('/api/travel-buddies')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          // Merge: DB approved reviews + any optimistic pending reviews still in state
          setReviews(prev => {
            const pending = prev.filter(r => r._pending)
            return [...pending, ...data.reviews]
          })
        }
      })
      .catch(() => {/* keep seeds */})
      .finally(() => setLoadingReviews(false))
  }, [])

  const [formData, setFormData] = useState({
    name: '', email: '', country: '', travel_type: '',
    places: [] as string[], travel_date: '', rating: 0, review: '',
    images: [] as { file: File; preview: string }[],
  })

  const filteredPlaces = SL_PLACES.filter(p =>
    p.toLowerCase().includes(placeSearch.toLowerCase())
  )

  const togglePlace = (place: string) =>
    setFormData(prev => ({
      ...prev,
      places: prev.places.includes(place)
        ? prev.places.filter(p => p !== place)
        : [...prev.places, place],
    }))

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const newImgs = Array.from(files).slice(0, 5 - formData.images.length)
      .map(f => ({ file: f, preview: URL.createObjectURL(f) }))
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImgs] }))
  }, [formData.images.length])

  const removeImage = (i: number) =>
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))

  const canNext = () => {
    if (step === 1) return !!(formData.name && formData.email && formData.country && formData.travel_type)
    if (step === 2) return formData.places.length > 0 && !!formData.travel_date
    if (step === 3) return formData.rating > 0 && formData.review.length >= 20
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    // Optimistically insert at top (pending badge)
    const optimisticId = Date.now()
    const optimistic: Review = {
      id: optimisticId,
      name: formData.name, country: formData.country,
      rating: formData.rating, travel_type: formData.travel_type,
      places: formData.places, travel_date: formData.travel_date,
      review: formData.review,
      image_url: formData.images[0]?.preview || null,
      approved: false, _pending: true,
    }
    setReviews(prev => [optimistic, ...prev])

    // POST to DB
    const body = new FormData()
    body.append('name',        formData.name)
    body.append('email',       formData.email)
    body.append('country',     formData.country)
    body.append('travel_type', formData.travel_type)
    body.append('places',      JSON.stringify(formData.places))
    body.append('travel_date', formData.travel_date)
    body.append('rating',      String(formData.rating))
    body.append('review',      formData.review)
    formData.images.forEach((img, i) => body.append(`image_${i}`, img.file))

    try {
      const res  = await fetch('/api/travel-buddies', { method: 'POST', body })
      const data = await res.json()
      if (data.success && data.review) {
        // Swap optimistic card with real DB row
        setReviews(prev => prev.map(r =>
          r.id === optimisticId
            ? { ...data.review, image_url: data.review.image_url || optimistic.image_url, _pending: true }
            : r
        ))
      }
    } catch { /* optimistic card stays */ }

    setSubmitting(false)
    setSubmitted(true)
    setShowForm(false)
    setStep(1)
    setFormData({
      name: '', email: '', country: '', travel_type: '',
      places: [], travel_date: '', rating: 0, review: '', images: [],
    })
  }

  const STEPS = ['About You', 'Your Journey', 'Your Review', 'Photos']

  return (
    <div className="tb-root min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dark .tb-root, .tb-root {
          --bg:           #080c0a;  --bg-alt:       #0a1410;
          --bg-card:      rgba(255,255,255,0.03);
          --border:       rgba(255,255,255,0.07);  --border-h:     rgba(0,229,200,0.28);
          --text:         #ffffff;  --text-muted:   rgba(255,255,255,0.55);
          --text-faint:   rgba(255,255,255,0.30);
          --accent:       #00e5c8;  --accent2:      #ff7a45;
          --accent-bg:    rgba(0,229,200,0.10);
          --hero-from:    #0a2218;  --hero-to:      #04100a;
          --badge-text:   #04100a;
          --input-bg:     rgba(255,255,255,0.04);
          --input-border: rgba(255,255,255,0.10);
          --input-focus:  rgba(0,229,200,0.35);
          --hero-glow:    rgba(0,229,200,0.07);
        }
        html:not(.dark) .tb-root {
          --bg:           #f4f1eb;  --bg-alt:       #e8f5f0;
          --bg-card:      rgba(0,0,0,0.03);
          --border:       rgba(0,0,0,0.09);  --border-h:     rgba(0,130,110,0.35);
          --text:         #0d1f19;  --text-muted:   rgba(13,31,25,0.60);
          --text-faint:   rgba(13,31,25,0.36);
          --accent:       #00695c;  --accent2:      #b5430b;
          --accent-bg:    rgba(0,105,92,0.09);
          --hero-from:    #c8e8df;  --hero-to:      #a8d5ca;
          --badge-text:   #ffffff;
          --input-bg:     rgba(255,255,255,0.70);
          --input-border: rgba(0,0,0,0.12);
          --input-focus:  rgba(0,105,92,0.30);
          --hero-glow:    rgba(0,105,92,0.10);
        }

        .tb-root { background: var(--bg); color: var(--text); transition: background 0.3s, color 0.3s; }
        .font-display { font-family: 'Cormorant Garamond', serif; }

        .tb-input {
          width: 100%; padding: 12px 16px; border-radius: 12px;
          background: var(--input-bg); color: var(--text);
          border: 1px solid var(--input-border);
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .tb-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--input-focus); }
        .tb-input::placeholder { color: var(--text-faint); }

        .section-label::before {
          content: ''; display: inline-block;
          width: 28px; height: 1.5px; background: var(--accent); flex-shrink: 0;
        }

        /* ── UNIFORM CARD GRID ─────────────────────────────── */
        .reviews-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px)  { .reviews-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .reviews-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Clamp review text to exactly 3 lines */
        .review-text {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tb-card:hover { border-color: var(--border-h) !important; transform: translateY(-4px); }
      `}</style>

      <Navbar />
      <main>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)' }} />
          <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -55%)' }} />

          <motion.div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-24"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-6 justify-center"
              style={{ color: 'var(--accent)' }}>
              Real Travelers · Real Stories
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
              style={{ color: 'var(--text)' }}>
              Share Your<br /><em style={{ color: 'var(--accent)' }}>Sri Lanka Story</em>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ color: 'var(--text-muted)' }}>
              Every journey leaves a mark. Share your memories, photos, and the places that
              touched your heart — inspire the next traveler to discover Sri Lanka.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-semibold transition-all hover:opacity-85"
                style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}>
                <Camera size={16} /> Share My Story
              </button>
              <a href="#reviews"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-semibold transition-all hover:opacity-75"
                style={{ color: 'var(--text)', border: '1px solid var(--border)' }}>
                Read Stories <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
          <div className="absolute left-1/2 bottom-0 w-px h-20"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        </section>

        {/* ══ SUCCESS BANNER ════════════════════════════════════ */}
        <AnimatePresence>
          {submitted && (
            <motion.div className="mx-4 sm:mx-8 lg:mx-auto max-w-4xl mt-6 p-5 rounded-2xl flex items-center gap-3"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-h)' }}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <CheckCircle size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                  Thank you for sharing your story!
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Your review is saved and visible below (marked pending). It'll be fully published after a quick check.
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="ml-auto flex-shrink-0 opacity-50 hover:opacity-100">
                <X size={16} style={{ color: 'var(--text)' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ FORM MODAL ════════════════════════════════════════ */}
        <AnimatePresence>
          {showForm && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="absolute inset-0 backdrop-blur-sm"
                style={{ background: 'rgba(0,0,0,0.7)' }}
                onClick={() => !submitting && setShowForm(false)} />

              <motion.div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-h)' }}
                initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 24 }} transition={{ type: 'spring', damping: 22 }}>

                <button onClick={() => setShowForm(false)} disabled={submitting}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <X size={14} style={{ color: 'var(--text)' }} />
                </button>

                {/* Step dots */}
                <div className="flex items-center gap-2 mb-8">
                  {STEPS.map((label, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center gap-1">
                        <StepDot n={i+1} active={step === i+1} done={step > i+1} />
                        <span className="text-[9px] tracking-wide font-medium hidden sm:block"
                          style={{ color: step === i+1 ? 'var(--accent)' : 'var(--text-faint)' }}>{label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="flex-1 h-px mt-[-12px]"
                          style={{ background: step > i+1 ? 'var(--accent)' : 'var(--border)' }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>Tell us about yourself</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>A little bit about who you are</p>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                          <input className="tb-input" placeholder="e.g. Sophie Müller"
                            value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Email *</label>
                          <input className="tb-input" type="email" placeholder="your@email.com"
                            value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Country *</label>
                        <input className="tb-input" placeholder="e.g. Germany 🇩🇪"
                          value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>How did you travel? *</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {TRAVEL_TYPES.map(t => (
                            <button key={t.id} type="button"
                              onClick={() => setFormData(p => ({ ...p, travel_type: t.id }))}
                              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-xs font-medium transition-all"
                              style={{
                                background: formData.travel_type === t.id ? 'var(--accent)' : 'var(--bg-card)',
                                color: formData.travel_type === t.id ? 'var(--badge-text)' : 'var(--text-muted)',
                                border: formData.travel_type === t.id ? 'none' : '1px solid var(--border)',
                              }}>
                              <span className="text-xl">{t.emoji}</span>{t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>Where did you explore?</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Select all the places you visited</p>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>When did you travel? *</label>
                        <input className="tb-input" placeholder="e.g. February 2025"
                          value={formData.travel_date} onChange={e => setFormData(p => ({ ...p, travel_date: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                          Places Visited * — <span style={{ color: 'var(--accent)' }}>{formData.places.length} selected</span>
                        </label>
                        <input className="tb-input mb-3" placeholder="🔍 Search destinations..."
                          value={placeSearch} onChange={e => setPlaceSearch(e.target.value)} />
                        <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
                          {filteredPlaces.map(place => (
                            <PlaceTag key={place} place={place}
                              selected={formData.places.includes(place)}
                              onToggle={() => togglePlace(place)} />
                          ))}
                        </div>
                      </div>
                      {formData.places.length > 0 && (
                        <div className="p-3 rounded-xl" style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-h)' }}>
                          <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>✓ Selected:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {formData.places.map(p => (
                              <span key={p} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                                style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}>
                                {p}<button onClick={() => togglePlace(p)}><X size={10} /></button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>Your experience</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Rate your trip and share what made it special</p>
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="block text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Overall Rating *</label>
                        <StarRating value={formData.rating} onChange={v => setFormData(p => ({ ...p, rating: v }))} />
                        {formData.rating > 0 && (
                          <p className="text-xs mt-2" style={{ color: 'var(--accent)' }}>
                            {['','Disappointing','Could be better','Good','Great!','Absolutely Incredible! ✨'][formData.rating]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                          Your Story * <span style={{ color: 'var(--text-faint)' }}>({formData.review.length}/500)</span>
                        </label>
                        <textarea className="tb-input resize-none" rows={6}
                          placeholder="Tell us about your most memorable moments, the people you met, the food you tried..."
                          value={formData.review}
                          onChange={e => setFormData(p => ({ ...p, review: e.target.value.slice(0, 500) }))} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>Add your photos</h2>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Up to 5 photos from your journey (optional)</p>
                    <div className="relative rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 mb-5"
                      style={{
                        border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border-h)'}`,
                        background: dragOver ? 'var(--accent-bg)' : 'var(--bg-card)',
                      }}
                      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
                      onClick={() => fileRef.current?.click()}>
                      <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                        onChange={e => handleFiles(e.target.files)} />
                      <Upload size={28} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                      <p className="font-medium text-sm mb-1" style={{ color: 'var(--text)' }}>Drop photos here or click to browse</p>
                      <p className="text-xs" style={{ color: 'var(--text-faint)' }}>JPG, PNG, WEBP · Max 5 photos · 10MB each</p>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            <img src={img.preview} alt="" className="w-full h-full object-cover" />
                            <button onClick={() => removeImage(i)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                              style={{ background: 'rgba(0,0,0,0.7)' }}>
                              <X size={12} color="white" />
                            </button>
                          </div>
                        ))}
                        {formData.images.length < 5 && (
                          <button onClick={() => fileRef.current?.click()}
                            className="aspect-square rounded-xl flex items-center justify-center"
                            style={{ border: '2px dashed var(--border-h)', background: 'var(--bg-card)' }}>
                            <span style={{ color: 'var(--accent)', fontSize: 24 }}>+</span>
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Nav buttons */}
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button onClick={() => setStep(s => s - 1)} disabled={submitting}
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-75"
                      style={{ color: 'var(--text)', border: '1px solid var(--border)' }}>
                      <ChevronLeft size={15} /> Back
                    </button>
                  )}
                  <button
                    onClick={() => step < 4 ? setStep(s => s + 1) : handleSubmit()}
                    disabled={!canNext() || submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all"
                    style={{
                      background: canNext() && !submitting ? 'var(--accent)' : 'var(--bg-card)',
                      color: canNext() && !submitting ? 'var(--badge-text)' : 'var(--text-faint)',
                      border: canNext() && !submitting ? 'none' : '1px solid var(--border)',
                      cursor: canNext() && !submitting ? 'pointer' : 'not-allowed',
                    }}>
                    {submitting ? (
                      <><Loader2 size={15} className="animate-spin" /> Saving…</>
                    ) : step === 4 ? (
                      <><CheckCircle size={15} /> Submit My Story</>
                    ) : (
                      <>Continue <ChevronRight size={15} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ STATS ═════════════════════════════════════════════ */}
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: '500+', label: 'Happy Travelers',    icon: Heart },
                { n: '40+',  label: 'Destinations Covered', icon: MapPin },
                { n: '98%',  label: '5-Star Reviews',       icon: Star  },
              ].map((s, i) => (
                <motion.div key={i}
                  className="tb-card text-center py-7 px-4 rounded-2xl border transition-all duration-300 cursor-default"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <s.icon size={18} className="mx-auto mb-2" style={{ color: 'var(--accent)' }} />
                  <p className="font-display text-4xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{s.n}</p>
                  <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ REVIEWS GRID ══════════════════════════════════════ */}
        <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-alt)' }}>
          <div className="mx-auto max-w-6xl">
            <motion.div className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="section-label inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.35em] uppercase mb-5 justify-center"
                style={{ color: 'var(--accent)' }}>
                From Our Travelers
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-bold" style={{ color: 'var(--text)' }}>
                Real Stories,<br /><em style={{ color: 'var(--accent)' }}>Real Memories</em>
              </h2>
            </motion.div>

            {loadingReviews ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
              </div>
            ) : (
              <div className="reviews-grid">
                {reviews.map((review, i) => (
                  <ReviewCard key={review.id} review={review} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ BOTTOM CTA ════════════════════════════════════════ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="relative overflow-hidden rounded-[28px] p-12 text-center"
              style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-h)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="absolute w-96 h-96 rounded-full pointer-events-none -top-20 -right-20"
                style={{ background: 'radial-gradient(circle, var(--hero-glow) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <Camera size={32} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                <h2 className="font-display text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  Had an amazing trip?<br /><em style={{ color: 'var(--accent)' }}>Share it with the world.</em>
                </h2>
                <p className="mb-8 max-w-md mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
                  Your story might be exactly what someone needs to take the leap and discover Sri Lanka for themselves.
                </p>
                <button onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:opacity-85"
                  style={{ background: 'var(--accent)', color: 'var(--badge-text)' }}>
                  <Camera size={16} /> Share My Story <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}