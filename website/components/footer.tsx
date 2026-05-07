'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

// ── LINK DATA ────────────────────────────────────────────────────
const COL_A = [
  { label: 'Home',            href: '/' },
  { label: 'Destinations',    href: '/destinations' },
  { label: 'Tours',           href: '/tours' },
  { label: 'Experiences',     href: '/experiences' },
  { label: 'Travel Guide',    href: '/travel-guide' },
  { label: 'About Us',        href: '/about' },
  { label: 'Contact',         href: '/contact' },
  { label: 'Book Now',        href: '/book' },
]

const COL_B = [
  { label: 'Sri Lanka Tours',   href: '/tours' },
  { label: 'Cultural Tours',    href: '/tours/cultural' },
  { label: 'Wildlife Safaris',  href: '/experiences/wildlife' },
  { label: 'Beach Escapes',     href: '/destinations/beaches' },
  { label: 'Honeymoon Packages',href: '/tours/honeymoon' },
  { label: 'Custom Private Tour',href: '/contact' },
  { label: 'Reviews',           href: '/about/reviews' },
  { label: 'Blog',              href: '/blog' },
]

const LEGAL = [
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy',     href: '/legal/privacy' },
  { label: 'Cookie Policy',      href: '/legal/cookies' },
  { label: 'Refund Policy',      href: '/legal/refund' },
]

const SOCIALS = [
  { Icon: Facebook,  href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Youtube,   href: '#', label: 'YouTube' },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const year = new Date().getFullYear()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {}
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="tl-footer">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .tl-footer {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── BACKGROUND IMAGE ───────────── */
        .tl-footer-bg {
          position: absolute; inset: 0;
          background:
            /* heavy dark overlay so text is readable */
            linear-gradient(
              180deg,
              rgba(5,8,18,0.82) 0%,
              rgba(5,8,18,0.75) 50%,
              rgba(5,8,18,0.92) 100%
            ),
            url('/webp/1770271346_banner_image.jpg') center / cover no-repeat;
          z-index: 0;
        }

        /* Gold top accent */
        .tl-footer-bg::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #c6a25c 30%, #e8c97a 50%, #c6a25c 70%, transparent);
        }

        /* ── MAIN BODY ──────────────────── */
        .tl-footer-body {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 72px 2.5rem 48px;
          display: grid;
          grid-template-columns: 280px 1fr 1fr 300px;
          gap: 0 56px;
        }
        @media (max-width: 1100px) {
          .tl-footer-body { grid-template-columns: 1fr 1fr; gap: 40px 40px; }
          .tl-footer-col-contact { grid-column: 1; }
          .tl-footer-col-links-a { grid-column: 2; }
          .tl-footer-col-links-b { grid-column: 1; }
          .tl-footer-col-right   { grid-column: 2; }
        }
        @media (max-width: 640px) {
          .tl-footer-body { grid-template-columns: 1fr; gap: 36px; padding: 52px 1.5rem 40px; }
          .tl-footer-col-contact,
          .tl-footer-col-links-a,
          .tl-footer-col-links-b,
          .tl-footer-col-right { grid-column: 1; }
        }

        /* ── LOGO ───────────────────────── */
        .tl-footer-logo {
          display: flex; flex-direction: column;
          text-decoration: none; margin-bottom: 28px;
        }
        .tl-footer-logo-text {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 24px; font-weight: 700; color: #fff; line-height: 1;
          letter-spacing: 0.01em;
        }
        .tl-footer-logo-text span { color: #c6a25c; }
        .tl-footer-logo-sub {
          font-size: 9px; font-weight: 400; letter-spacing: 0.22em;
          color: rgba(198,162,92,0.65); text-transform: uppercase; margin-top: 4px;
        }

        /* ── COLUMN LABEL ───────────────── */
        .tl-col-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: rgba(198,162,92,0.8);
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: relative;
        }
        .tl-col-label::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 28px; height: 1px; background: #c6a25c;
        }

        /* ── CONTACT ITEMS ──────────────── */
        .tl-contact-list { display: flex; flex-direction: column; gap: 0; }
        .tl-contact-item {
          display: flex; gap: 0; flex-direction: column;
          margin-bottom: 24px;
        }
        .tl-contact-item:last-child { margin-bottom: 0; }
        .tl-contact-type {
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(198,162,92,0.75);
          margin-bottom: 6px;
        }
        .tl-contact-val {
          font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.82);
          line-height: 1.65; text-decoration: none;
          transition: color 0.22s ease;
        }
        .tl-contact-val:hover { color: #c6a25c; }

        /* ── NAV LINKS ──────────────────── */
        .tl-footer-links { display: flex; flex-direction: column; gap: 0; }
        .tl-footer-link {
          font-size: 13.5px; font-weight: 300;
          color: rgba(255,255,255,0.65); text-decoration: none;
          padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
          letter-spacing: 0.02em;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .tl-footer-link:last-child { border-bottom: none; }
        .tl-footer-link:hover { color: #c6a25c; padding-left: 6px; }

        /* ── NEWSLETTER ─────────────────── */
        .tl-newsletter-form {
          display: flex; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.18); border-radius: 3px;
          margin-bottom: 28px; background: rgba(255,255,255,0.05);
          transition: border-color 0.25s ease;
        }
        .tl-newsletter-form:focus-within { border-color: rgba(198,162,92,0.5); }
        .tl-newsletter-input {
          flex: 1; padding: 12px 16px; background: transparent; border: none;
          outline: none; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300; color: #fff;
          letter-spacing: 0.02em;
        }
        .tl-newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
        .tl-newsletter-btn {
          padding: 10px 16px; background: #c6a25c; border: none;
          color: #1a1209; cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.06em;
          transition: background 0.25s ease; flex-shrink: 0;
          display: flex; align-items: center; gap: 6px;
        }
        .tl-newsletter-btn:hover { background: #d4b06a; }
        .tl-newsletter-ok {
          font-size: 13px; font-weight: 400; color: rgba(198,162,92,0.9);
          padding: 8px 0; margin-bottom: 20px;
        }

        /* ── SOCIALS ────────────────────── */
        .tl-socials { display: flex; gap: 10px; }
        .tl-social {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.65);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: all 0.25s ease;
        }
        .tl-social:hover {
          background: rgba(198,162,92,0.15);
          border-color: rgba(198,162,92,0.55);
          color: #c6a25c;
        }

        /* ── BOTTOM BAR ─────────────────── */
        .tl-footer-bottom {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .tl-footer-bottom-inner {
          max-width: 1300px; margin: 0 auto;
          padding: 20px 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .tl-copyright {
          font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
        }
        .tl-legal-links { display: flex; flex-wrap: wrap; gap: 6px 24px; align-items: center; }
        .tl-legal-link {
          font-size: 11px; font-weight: 400; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.35); text-decoration: none;
          transition: color 0.2s ease;
        }
        .tl-legal-link:hover { color: #c6a25c; }
        .tl-legal-sep {
          width: 1px; height: 12px; background: rgba(255,255,255,0.15);
        }

        @media (max-width: 640px) {
          .tl-footer-bottom-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .tl-legal-links { gap: 6px 16px; }
        }
      `}</style>

      {/* Background image */}
      <div className="tl-footer-bg" />

      {/* Main content */}
      <div className="tl-footer-body">

        {/* Col 1 — Contact */}
        <div className="tl-footer-col-contact">
          <Link href="/" className="tl-footer-logo">
            <span className="tl-footer-logo-text">Travel <span>Lunatics</span></span>
            <span className="tl-footer-logo-sub">www.travellunatics.com</span>
          </Link>

          <div className="tl-contact-list">
            <div className="tl-contact-item">
              <span className="tl-contact-type">Address</span>
              <span className="tl-contact-val">
                No. 45, Galle Road,<br />
                Colombo 03, Sri Lanka.
              </span>
            </div>
            <div className="tl-contact-item">
              <span className="tl-contact-type">Phone</span>
              <a href="tel:+94701234567" className="tl-contact-val">+94 70 123 4567</a>
            </div>
            <div className="tl-contact-item">
              <span className="tl-contact-type">Email</span>
              <a href="mailto:info@travellunatics.com" className="tl-contact-val">info@travellunatics.com</a>
            </div>
          </div>
        </div>

        {/* Col 2 — Quick Links A */}
        <div className="tl-footer-col-links-a">
          <div className="tl-col-label">Quick Links</div>
          <div className="tl-footer-links">
            {COL_A.map((l) => (
              <Link key={l.href} href={l.href} className="tl-footer-link">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Quick Links B */}
        <div className="tl-footer-col-links-b">
          <div className="tl-col-label">Explore</div>
          <div className="tl-footer-links">
            {COL_B.map((l) => (
              <Link key={l.href} href={l.href} className="tl-footer-link">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Newsletter + Socials */}
        <div className="tl-footer-col-right">
          <div className="tl-col-label">Newsletter</div>

          {submitted ? (
            <p className="tl-newsletter-ok">✓ Thank you — you're subscribed!</p>
          ) : (
            <form className="tl-newsletter-form" onSubmit={handleSubmit}>
              <input
                className="tl-newsletter-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="tl-newsletter-btn" type="submit">
                →
              </button>
            </form>
          )}

          <div style={{ marginBottom: 20 }}>
            <div className="tl-col-label" style={{ marginTop: 0 }}>Follow Us</div>
            <div className="tl-socials">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} className="tl-social" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="tl-footer-bottom">
        <div className="tl-footer-bottom-inner">
          <p className="tl-copyright">© {year} Travel Lunatics. All rights reserved.</p>
          <div className="tl-legal-links">
            {LEGAL.map((l, i) => (
              <React.Fragment key={l.href}>
                {i > 0 && <span className="tl-legal-sep" />}
                <Link href={l.href} className="tl-legal-link">{l.label}</Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}