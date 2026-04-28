'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown, Globe } from 'lucide-react'
import type { SupportedLanguage } from '@/lib/translate'

// ─── DROPDOWN DATA ────────────────────────────────────────────
const dropdownData: Record<string, { label: string; href: string }[]> = {
  destinations: [
    { label: 'Colombo',           href: '/destinations/colombo' },
    { label: 'Kandy',             href: '/destinations/kandy' },
    { label: 'Sigiriya',          href: '/destinations/sigiriya' },
    { label: 'Galle',             href: '/destinations/galle' },
    { label: 'Ella',              href: '/destinations/ella' },
    { label: 'Nuwara Eliya',      href: '/destinations/nuwara-eliya' },
    { label: 'Top Destinations',  href: '/destinations/top' },
    { label: 'Hidden Gems',       href: '/destinations/hidden-gems' },
    { label: 'Beaches',           href: '/destinations/beaches' },
    { label: 'Cultural Triangle', href: '/destinations/cultural-triangle' },
    { label: 'Hill Country',      href: '/destinations/hill-country' },
  ],
  tours: [
    { label: 'All Tours',          href: '/tours' },
    { label: 'Discover Sri Lanka', href: '/discover-sri-lanka' },
    { label: 'Wildlife Tours',     href: '/wildlife-tours' },
    { label: 'Beach Tours',        href: '/beach-tours' },
    { label: 'Cultural Tours',     href: '/cultural-tours' },
    { label: 'Food Tours',         href: '/food-tours' },
    { label: 'Sacred Sri Lanka',   href: '/sacred-sri-lanka' },
  ],
  experiences: [
    { label: 'Wildlife Safaris',      href: '/experiences/wildlife' },
    { label: 'Cultural Experiences',  href: '/experiences/cultural' },
    { label: 'Food Tours',            href: '/experiences/food' },
    { label: 'Adventure Activities',  href: '/experiences/adventure' },
    { label: 'Train Journeys',        href: '/experiences/train' },
    { label: 'Hiking & Trekking',     href: '/experiences/hiking' },
    { label: 'Water Activities',      href: '/experiences/water' },
  ],
  'travel-guide': [
    { label: 'Travel Tips',          href: '/travel-guide/tips' },
    { label: 'Visa Information',     href: '/travel-guide/visa' },
    { label: 'Best Time to Visit',   href: '/travel-guide/best-time' },
    { label: 'Transportation Guide', href: '/travel-guide/transport' },
    { label: 'Currency & Costs',     href: '/travel-guide/currency' },
    { label: 'Safety Tips',          href: '/travel-guide/safety' },
    { label: 'Packing Guide',        href: '/travel-guide/packing' },
  ],
  about: [
    { label: 'Our Story',              href: '/about/story' },
    { label: 'Why Choose Us',          href: '/about/why-us' },
    { label: 'Meet the Team',          href: '/about/team' },
    { label: 'Reviews & Testimonials', href: '/about/reviews' },
  ],
  contact: [
    { label: 'Contact Form',  href: '/contact' },
    { label: 'WhatsApp Chat', href: '/contact/whatsapp' },
    { label: 'Email Us',      href: '/contact/email' },
    { label: 'Location Map',  href: '/contact/map' },
  ],
}

const megaMenuSections = [
  {
    title: 'Quick Links',
    items: [
      { label: 'Home',       href: '/' },
      { label: 'Book Now',   href: '/book' },
      { label: 'Reviews',    href: '/about/reviews' },
      { label: 'Gallery',    href: '/gallery' },
      { label: 'Blog',       href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  { title: 'Destinations', items: dropdownData['destinations'] },
  { title: 'Tours',        items: dropdownData['tours'] },
  { title: 'Experiences',  items: dropdownData['experiences'] },
  { title: 'Travel Guide', items: dropdownData['travel-guide'] },
]

const links = [
  { href: '/',             label: 'Home',         key: '' },
  { href: '/destinations', label: 'Destinations', key: 'destinations' },
  { href: '/tours',        label: 'Tours',        key: 'tours' },
  { href: '/experiences',  label: 'Experiences',  key: 'experiences' },
  { href: '/travel-guide', label: 'Travel Guide', key: 'travel-guide' },
  { href: '/about',        label: 'About Us',     key: 'about' },
  { href: '/contact',      label: 'Contact',      key: 'contact' },
]

const languages: { code: SupportedLanguage; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
]

export function Navbar() {
  const [scrolled, setScrolled]               = useState(false)
  const [activeDropdown, setActiveDropdown]   = useState<string | null>(null)
  const [megaOpen, setMegaOpen]               = useState(false)
  const [searchOpen, setSearchOpen]           = useState(false)
  const [searchQuery, setSearchQuery]         = useState('')
  const [langOpen, setLangOpen]               = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')

  const dropdownTimer = useRef<NodeJS.Timeout | null>(null)
  const searchRef     = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100)
  }, [searchOpen])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.tl-nav')) {
        setActiveDropdown(null)
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = megaOpen || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [megaOpen, searchOpen])

  const handleLinkEnter = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    if (key) setActiveDropdown(key)
  }
  const handleLinkLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 180)
  }
  const handleDropdownEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .tl-nav * { box-sizing: border-box; }

        .tl-nav {
          position: fixed;
          top: 0; z-index: 1000;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── GOLD ACCENT ── */
        .tl-accent {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(198,162,92,0.5) 20%, rgba(198,162,92,1) 50%, rgba(198,162,92,0.5) 80%, transparent 100%);
          transform: scaleX(0); opacity: 0; transform-origin: center;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.4s ease;
        }
        .tl-nav.scrolled .tl-accent { transform: scaleX(1); opacity: 1; }

        /* ── MAIN ROW ── */
        .tl-main {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.25rem; height: 72px;
          background: transparent; border-bottom: 1px solid transparent;
          backdrop-filter: none; -webkit-backdrop-filter: none;
          transition: height 0.4s cubic-bezier(.4,0,.2,1), background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease;
          gap: 12px;
        }
        @media (min-width: 768px)  { .tl-main { padding: 0 2rem;   height: 78px; } }
        @media (min-width: 1024px) { .tl-main { padding: 0 2.5rem; height: 82px; } }

        .tl-nav.scrolled .tl-main {
          height: 60px;
          background: linear-gradient(180deg, rgba(5,10,20,0.96) 0%, rgba(5,10,20,0.88) 100%);
          border-bottom-color: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
        }
        @media (min-width: 1024px) { .tl-nav.scrolled .tl-main { height: 66px; } }

        /* ── LOGO ── */
        .tl-logo { display:flex; flex-direction:column; align-items:flex-start; text-decoration:none; flex-shrink:0; }
        .tl-logo-text { font-family:'Playfair Display',serif; font-style:italic; font-weight:700; font-size:20px; color:#fff; letter-spacing:0.01em; line-height:1; text-shadow:0 2px 16px rgba(0,0,0,.65); }
        @media (min-width: 480px)  { .tl-logo-text { font-size:22px; } }
        @media (min-width: 768px)  { .tl-logo-text { font-size:25px; } }
        @media (min-width: 1024px) { .tl-logo-text { font-size:26px; } }
        .tl-logo-text span { color:#c6a25c; }
        .tl-logo-sub { font-size:8px; font-weight:400; letter-spacing:0.22em; color:rgba(198,162,92,0.75); text-transform:uppercase; margin-top:4px; }
        @media (max-width: 480px) { .tl-logo-sub { display: none; } }

        /* ── DESKTOP NAV LINKS ── */
        .tl-links { display:none; align-items:center; list-style:none; gap:0; margin:0; padding:0; }
        @media (min-width:1024px) { .tl-links { display:flex; } }
        .tl-link-wrap { position:relative; }
        .tl-link {
          position:relative; display:flex; align-items:center; gap:4px;
          padding:8px 12px; font-size:11px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:rgba(255,255,255,0.92); text-decoration:none;
          white-space:nowrap; cursor:pointer; background:none; border:none;
          font-family:'DM Sans',sans-serif; transition:color 0.25s ease;
          text-shadow:0 1px 10px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.5);
        }
        .tl-link::after {
          content:''; position:absolute; bottom:2px; left:12px; right:12px; height:1.5px;
          background:#c6a25c; transform:scaleX(0); transform-origin:left;
          transition:transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .tl-link:hover, .tl-link.open { color:#fff; }
        .tl-link:hover::after, .tl-link.open::after { transform:scaleX(1); }
        .tl-link svg { width:11px; height:11px; stroke:currentColor; stroke-width:2.5; fill:none; opacity:0.7; flex-shrink:0; transition:transform 0.25s ease; }
        .tl-link.open svg { transform:rotate(180deg); opacity:1; }

        /* ── DESKTOP DROPDOWN ── */
        .tl-dropdown {
          position:absolute; top:calc(100% + 4px); left:50%; transform:translateX(-50%) translateY(-6px);
          background:rgba(8,14,30,0.97); border:1px solid rgba(198,162,92,0.18);
          border-radius:4px; min-width:210px; overflow:hidden;
          opacity:0; visibility:hidden;
          transition:opacity 0.22s ease, transform 0.22s ease, visibility 0.22s;
          z-index:200; backdrop-filter:blur(20px); box-shadow:0 16px 48px rgba(0,0,0,0.5);
        }
        .tl-dropdown.open { opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }
        .tl-dropdown::before { content:''; display:block; height:2px; background:linear-gradient(90deg, transparent, #c6a25c, transparent); }
        .tl-dropdown-item {
          display:block; padding:11px 20px; font-size:11px; font-weight:600;
          letter-spacing:0.09em; text-transform:uppercase; color:rgba(255,255,255,0.65);
          text-decoration:none; border-bottom:1px solid rgba(255,255,255,0.04); transition:all 0.18s ease;
        }
        .tl-dropdown-item:last-child { border-bottom:none; }
        .tl-dropdown-item:hover { color:#c6a25c; background:rgba(198,162,92,0.07); padding-left:26px; }

        /* ── RIGHT ACTIONS ── */
        .tl-actions { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        @media (min-width: 768px) { .tl-actions { gap:8px; } }

        .lang-wrap { position:relative; display:none; }
        @media (min-width: 640px) { .lang-wrap { display:block; } }
        .lang-btn {
          display:flex; align-items:center; gap:5px; padding:7px 10px; border-radius:2px;
          border:1px solid rgba(255,255,255,0.35); background:rgba(0,0,0,0.18);
          color:rgba(255,255,255,0.9); cursor:pointer; transition:all 0.25s ease;
          font-size:11px; font-weight:600; letter-spacing:0.07em; font-family:'DM Sans',sans-serif;
        }
        .lang-btn:hover { background:rgba(198,162,92,0.14); border-color:rgba(198,162,92,0.6); color:#c6a25c; }
        .tl-nav.scrolled .lang-btn { border-color:rgba(198,162,92,0.35); }
        .lang-dropdown {
          position:absolute; top:calc(100% + 8px); right:0;
          background:rgba(5,10,22,0.98); border:1px solid rgba(198,162,92,0.22);
          border-radius:4px; min-width:158px; overflow:hidden;
          opacity:0; visibility:hidden; transform:translateY(-8px);
          transition:all 0.25s ease; z-index:300; backdrop-filter:blur(16px);
          box-shadow:0 12px 40px rgba(0,0,0,0.5);
        }
        .lang-dropdown.open { opacity:1; visibility:visible; transform:translateY(0); }
        .lang-opt {
          display:block; width:100%; padding:11px 16px; border:none; background:none;
          color:rgba(255,255,255,0.7); text-align:left; font-size:12px; font-weight:500;
          letter-spacing:0.04em; cursor:pointer; font-family:'DM Sans',sans-serif;
          border-bottom:1px solid rgba(255,255,255,0.05); transition:all 0.18s ease;
        }
        .lang-opt:last-child { border-bottom:none; }
        .lang-opt:hover { background:rgba(198,162,92,0.1); color:#c6a25c; padding-left:22px; }
        .lang-opt.active { background:rgba(198,162,92,0.15); color:#c6a25c; font-weight:700; }

        .search-btn {
          width:36px; height:36px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.35); background:rgba(0,0,0,0.18);
          color:rgba(255,255,255,0.9); cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:all 0.25s ease; flex-shrink:0;
        }
        .search-btn:hover { background:rgba(198,162,92,0.15); border-color:rgba(198,162,92,0.6); color:#c6a25c; }
        .tl-nav.scrolled .search-btn { border-color:rgba(255,255,255,0.18); background:rgba(255,255,255,0.05); }

        .inquire-btn { display:none; }
        @media (min-width: 768px) {
          .inquire-btn {
            display:block; position:relative; overflow:hidden; padding:9px 18px; border-radius:2px;
            border:1px solid rgba(255,255,255,0.55); background:rgba(0,0,0,0.18); color:#fff;
            font-family:'DM Sans',sans-serif; font-weight:700; font-size:10px;
            letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; white-space:nowrap;
            transition:color 0.35s ease, border-color 0.45s ease, background 0.45s ease;
          }
        }
        .tl-nav.scrolled .inquire-btn { border-color:rgba(198,162,92,0.7); color:#c6a25c; background:transparent; }
        .inquire-btn::before { content:''; position:absolute; inset:0; background:#c6a25c; transform:translateX(-102%); transition:transform 0.32s cubic-bezier(.4,0,.2,1); }
        .inquire-btn span { position:relative; z-index:1; }
        .inquire-btn:hover { color:#0a0f1a !important; }
        .inquire-btn:hover::before { transform:translateX(0); }

        .burger-btn {
          display:flex; align-items:center; justify-content:center;
          width:38px; height:38px; border-radius:2px;
          border:1px solid rgba(255,255,255,0.35); background:rgba(0,0,0,0.18);
          color:rgba(255,255,255,0.9); cursor:pointer; transition:all 0.25s ease; flex-shrink:0;
          position:relative; z-index:1001;
        }
        .burger-btn:hover { background:rgba(198,162,92,0.12); border-color:rgba(198,162,92,0.5); color:#c6a25c; }

        /* Close button — right side of topbar row */
        .mega-close {
          flex-shrink: 0;
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15); background: #f5f5f5;
          color: #1a1a1a; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .mega-close:hover { background:rgba(198,162,92,0.15); border-color:#c6a25c; color:#c6a25c; }

        /* ═══════════════════════════════════════════════════
           MEGA MENU — flex-column so topbar never overlaps
        ═══════════════════════════════════════════════════ */
        .mega-overlay {
          position: fixed; inset: 0; z-index: 1100;
          /* flex column: topbar is fixed height, body scrolls */
          display: flex; flex-direction: column; overflow: hidden;
          background: rgba(255,255,255,0.99);
          opacity: 0; visibility: hidden;
          transition: opacity 0.38s ease, visibility 0.38s;
        }
        .mega-overlay.open { opacity: 1; visibility: visible; }

        /* Top bar — full width row, logo LEFT · X RIGHT */
        .mega-topbar {
          /* Never overlaps: it's a normal flex child, not position:fixed */
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 62px;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        @media (min-width: 768px) { .mega-topbar { padding: 0 36px; height: 70px; } }

        /* Logo inside overlay */
        .mega-logo {
          display:flex; flex-direction:column; align-items:flex-start;
          text-decoration:none; flex-shrink:0;
        }
        .mega-logo-text {
          font-family:'Playfair Display',serif; font-style:italic; font-weight:700;
          font-size:22px; color:#1a1a1a; letter-spacing:0.01em; line-height:1;
        }
        @media (min-width:768px) { .mega-logo-text { font-size:25px; } }
        .mega-logo-text span { color:#c6a25c; }
        .mega-logo-sub { font-size:8px; font-weight:400; letter-spacing:0.22em; color:rgba(198,162,92,0.65); text-transform:uppercase; margin-top:4px; }

        /* Scrollable content */
        .mega-body { flex: 1; overflow-y: auto; }
        .mega-inner { max-width:1300px; margin:0 auto; padding:28px 20px 60px; }
        @media (min-width: 768px)  { .mega-inner { padding:36px 36px 80px; } }
        @media (min-width: 1024px) { .mega-inner { padding:48px 3rem 80px; } }

        .mega-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:32px 20px;
        }
        @media (min-width: 640px)  { .mega-grid { grid-template-columns:repeat(3,1fr); gap:40px 28px; } }
        @media (min-width: 1024px) { .mega-grid { grid-template-columns:repeat(5,1fr); gap:0 48px; } }

        .mega-col-title {
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.14em;
          text-transform:uppercase; color:#1a1a1a;
          padding-bottom:12px; margin-bottom:14px;
          border-bottom:1.5px solid rgba(0,0,0,0.12); position:relative;
        }
        .mega-col-title::after { content:''; position:absolute; bottom:-1.5px; left:0; width:32px; height:1.5px; background:#c6a25c; }
        .mega-col-item {
          display:block; padding:7px 0; font-size:13px; font-weight:400; color:#444;
          text-decoration:none; letter-spacing:0.02em;
          border-bottom:1px solid rgba(0,0,0,0.04); transition:all 0.18s ease;
        }
        .mega-col-item:last-child { border-bottom:none; }
        .mega-col-item:hover { color:#c6a25c; padding-left:6px; }
        .mega-col-item.highlight { color:#c6a25c; font-weight:600; }

        /* ── Search overlay ── */
        .search-overlay {
          position:fixed; inset:0; z-index:1200;
          background:rgba(255,255,255,0.97);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          opacity:0; visibility:hidden;
          transition:opacity 0.32s ease, visibility 0.32s; padding:1rem;
        }
        .search-overlay.open { opacity:1; visibility:visible; }
        .search-close {
          position:absolute; top:20px; right:20px; width:44px; height:44px; border-radius:50%;
          border:1px solid rgba(0,0,0,0.12); background:transparent; color:#1a1a1a; cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:all 0.25s ease;
        }
        @media (min-width: 768px) { .search-close { top:28px; right:36px; } }
        .search-close:hover { background:rgba(198,162,92,0.1); border-color:#c6a25c; color:#c6a25c; }
        .search-form { width:100%; max-width:640px; display:flex; flex-direction:column; align-items:center; gap:24px; }
        .search-label { font-family:'Playfair Display',serif; font-style:italic; font-size:clamp(20px,5vw,40px); font-weight:700; color:#1a1a1a; text-align:center; margin-bottom:8px; }
        .search-label span { color:#c6a25c; }
        .search-input-wrap { width:100%; border-bottom:2px solid #1a1a1a; display:flex; align-items:center; gap:12px; padding-bottom:10px; }
        .search-input-wrap svg { color:rgba(0,0,0,0.35); flex-shrink:0; }
        .search-input { flex:1; border:none; outline:none; background:transparent; font-family:'DM Sans',sans-serif; font-size:clamp(14px,3vw,18px); font-weight:400; color:#1a1a1a; letter-spacing:0.02em; }
        .search-input::placeholder { color:rgba(0,0,0,0.25); }
        .search-hint { font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.06em; color:rgba(0,0,0,0.35); text-align:center; }
      `}</style>

      {/* ── Search overlay ── */}
      <div className={`search-overlay ${searchOpen ? 'open' : ''}`}>
        <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search">
          <X size={20} />
        </button>
        <div className="search-form">
          <p className="search-label">Find your next <span>adventure</span></p>
          <div className="search-input-wrap">
            <Search size={20} />
            <input
              ref={searchRef}
              className="search-input"
              type="text"
              placeholder="Search destinations, tours, experiences…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
            />
          </div>
          <p className="search-hint">Press ESC to close</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MEGA MENU
          flex-column layout guarantees the topbar
          (logo + X) is always a proper row with
          no overlap possible on any screen size
      ══════════════════════════════════════════ */}
      <div className={`mega-overlay ${megaOpen ? 'open' : ''}`}>

        {/* ── Top bar: logo ← · → X ── */}
        <div className="mega-topbar">
          <Link href="/" className="mega-logo" onClick={() => setMegaOpen(false)}>
            <span className="mega-logo-text">Travel <span>Lunatics</span></span>
            <span className="mega-logo-sub">www.travellunatics.com</span>
          </Link>
          <button
            className="mega-close"
            onClick={() => setMegaOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable grid ── */}
        <div className="mega-body">
          <div className="mega-inner">
            <div className="mega-grid">
              {megaMenuSections.map((section) => (
                <div key={section.title}>
                  <div className="mega-col-title">{section.title}</div>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mega-col-item ${item.label === 'Home' ? 'highlight' : ''}`}
                      onClick={() => setMegaOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className={`tl-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="tl-accent" />

        <div className="tl-main">
          <Link href="/" className="tl-logo">
            <span className="tl-logo-text">Travel <span>Lunatics</span></span>
            <span className="tl-logo-sub">www.travellunatics.com</span>
          </Link>

          <ul className="tl-links">
            {links.map((link) => {
              const hasDropdown = !!link.key && !!dropdownData[link.key]
              const isOpen = activeDropdown === link.key
              return (
                <li
                  key={link.href}
                  className="tl-link-wrap"
                  onMouseEnter={() => handleLinkEnter(link.key)}
                  onMouseLeave={handleLinkLeave}
                >
                  <Link href={link.href} className={`tl-link ${isOpen ? 'open' : ''}`}>
                    {link.label}
                    {hasDropdown && <svg viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4" /></svg>}
                  </Link>
                  {hasDropdown && (
                    <div
                      className={`tl-dropdown ${isOpen ? 'open' : ''}`}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      {dropdownData[link.key].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="tl-dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="tl-actions">
            <div className="lang-wrap">
              <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} aria-label="Language">
                <Globe size={13} />
                {currentLanguage.toUpperCase()}
                <ChevronDown size={11} style={{ transform: langOpen ? 'rotate(180deg)' : '', transition: 'transform 0.25s' }} />
              </button>
              <div className={`lang-dropdown ${langOpen ? 'open' : ''}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-opt ${currentLanguage === lang.code ? 'active' : ''}`}
                    onClick={() => { setCurrentLanguage(lang.code); setLangOpen(false) }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="search-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={15} />
            </button>

            <button className="inquire-btn">
              <span>INQUIRE</span>
            </button>

            <button className="burger-btn" onClick={() => setMegaOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}