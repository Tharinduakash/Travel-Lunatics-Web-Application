'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown, Globe } from 'lucide-react'
import type { SupportedLanguage } from '@/lib/translate'
import { LANGUAGE_NAMES } from '@/lib/translate'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bgOpacity = scrolled ? Math.max(0.55, 1 - scrollY / 400) : 1

  const languages: { code: SupportedLanguage; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
  ]

  const links = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations', hasDropdown: true },
    { href: '/tours', label: 'Tours', hasDropdown: true },
    { href: '/experiences', label: 'Experiences', hasDropdown: true },
    { href: '/travel-guide', label: 'Travel Guide', hasDropdown: true },
    { href: '/about', label: 'About Us', hasDropdown: true },
    { href: '/contact', label: 'Contact', hasDropdown: true },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .tl-nav {
          position: fixed;
          top: 0;
          z-index: 50;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .tl-overlay {
          position: absolute;
          inset: 0;
          z-index: -3;
          background: rgba(4, 18, 30, var(--overlay-op, 0));
          transition: background 0.4s ease;
        }

        .tl-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: linear-gradient(
            100deg,
            rgba(10, 18, 40,  var(--op, 1)) 0%,
            rgba(6,  38,  58,  var(--op, 1)) 35%,
            rgba(4,  72,  80,  var(--op, 1)) 70%,
            rgba(2,  90,  80,  var(--op, 1)) 100%
          );
          transition: all 0.5s ease;
        }

        .tl-blur {
          position: absolute;
          inset: 0;
          z-index: -1;
          transition: backdrop-filter 0.4s ease;
        }
        .tl-blur.on {
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }

        .tl-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #00e5c8 25%,
            #ff7a45 55%,
            #00e5c8 80%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .tl-line.on { opacity: 0.75; }

        .tl-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.4s cubic-bezier(.4,0,.2,1);
        }

        /* Logo */
        .tl-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .tl-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #2563eb);
          border: 2px solid rgba(0, 229, 200, 0.5);
          box-shadow: 0 0 12px rgba(0,229,200,0.25);
          font-weight: 800;
          font-size: 16px;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          flex-shrink: 0;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
        }
        .tl-logo:hover .tl-logo-icon {
          border-color: rgba(0,229,200,0.95);
          box-shadow: 0 0 20px rgba(0,229,200,0.5), 0 0 40px rgba(255,122,69,0.2);
        }

        .tl-logo-main {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #ffffff;
          text-shadow: 0 1px 8px rgba(0,0,0,0.6);
          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.7));
        }

        /* Desktop links */
        .tl-links {
          display: none;
          align-items: center;
          gap: 0;
        }
        @media (min-width: 768px) { .tl-links { display: flex; } }

        .tl-link {
          position: relative;
          padding: 9px 15px;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          text-decoration: none;
          letter-spacing: 0.015em;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
          text-shadow: 0 1px 6px rgba(0,0,0,0.55);
        }
        .tl-link::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 15px; right: 15px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #00e5c8, #ff7a45);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .tl-link:hover {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.18);
          text-shadow: 0 0 12px rgba(0,229,200,0.5);
        }
        .tl-link:hover::after { transform: scaleX(1); }

        /* Right side actions */
        .tl-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Language selector */
        .language-selector {
          position: relative;
        }

        .language-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0, 0, 0, 0.25);
          color: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
          font-size: 13px;
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        .language-btn:hover {
          background: rgba(0,229,200,0.18);
          border-color: rgba(0,229,200,0.6);
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: rgba(10, 18, 40, 0.98);
          border: 1px solid rgba(0,229,200,0.3);
          border-radius: 12px;
          min-width: 180px;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 100;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .language-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .language-option {
          display: block;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #ffffff;
          text-align: left;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .language-option:hover {
          background: rgba(0,229,200,0.15);
          padding-left: 20px;
        }

        .language-option.active {
          background: rgba(0,229,200,0.25);
          color: #00e5c8;
          font-weight: 700;
        }

        /* Search icon */
        .search-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          background: rgba(0,0,0,0.25);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .search-btn:hover {
          background: rgba(0,229,200,0.18);
        }

        /* Inquire button */
        .inquire-nav-btn {
          padding: 10px 24px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #ff7a45, #ff6b2c);
          color: white;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
          box-shadow: 0 4px 12px rgba(255,122,69,0.3);
        }

        .inquire-nav-btn:hover {
          background: linear-gradient(135deg, #ff6b2c, #ff5213);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255,122,69,0.4);
        }

        /* Hamburger */
        .tl-burger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0, 0, 0, 0.25);
          color: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .tl-burger:hover {
          background: rgba(0,229,200,0.18);
          border-color: rgba(0,229,200,0.6);
        }
        @media (min-width: 768px) { .tl-burger { display: none; } }

        /* Mobile menu */
        .tl-mobile {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.38s cubic-bezier(.4,0,.2,1), opacity 0.3s ease;
        }
        .tl-mobile.open { max-height: 480px; opacity: 1; }

        .tl-mobile-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 10px 1.75rem 22px;
          border-top: 1px solid rgba(255,255,255,0.15);
          display: flex;
          flex-direction: column;
          gap: 3px;
          background: rgba(4, 18, 30, 0.35);
        }

        .tl-mlink {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          border-radius: 10px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
          transition: all 0.2s ease;
        }
        .tl-mlink:hover {
          color: #fff;
          background: rgba(0,0,0,0.2);
          padding-left: 20px;
        }
        .tl-mdot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00e5c8, #ff7a45);
          opacity: 0;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }
        .tl-mlink:hover .tl-mdot { opacity: 1; }

        /* Mobile language selector */
        .tl-mlang {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: 8px;
        }

        .tl-mlang-select {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.2);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .tl-mlang-select:hover {
          background: rgba(0,229,200,0.18);
          border-color: rgba(0,229,200,0.6);
        }
      `}</style>

      <nav className="tl-nav">
        {/* Dark overlay */}
        <div
          className="tl-overlay"
          style={{ '--overlay-op': scrolled ? Math.min(0.6, (scrollY - 30) / 250) : 0 } as React.CSSProperties}
        />
        {/* Gradient bg */}
        <div
          className="tl-bg"
          style={{ '--op': bgOpacity } as React.CSSProperties}
        />
        <div className={`tl-blur ${scrolled ? 'on' : ''}`} />
        <div className={`tl-line ${scrolled ? 'on' : ''}`} />

        {/* Main row */}
        <div className="tl-inner" style={{ height: scrolled ? 62 : 72 }}>

          {/* Logo */}
          <Link href="/" className="tl-logo">
            <div className="tl-logo-icon">TL</div>
            <span className="tl-logo-main">Travel Lunatics</span>
          </Link>

          {/* Desktop links */}
          <div className="tl-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="tl-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Language Selector + Search + Inquire + Burger */}
          <div className="tl-actions">
            {/* Language Selector */}
            <div className="language-selector">
              <button
                className="language-btn"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                aria-label="Select language"
              >
                <Globe size={16} />
                {currentLanguage.toUpperCase()}
                <ChevronDown size={14} />
              </button>

              <div
                className={`language-dropdown ${showLanguageDropdown ? 'open' : ''}`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${
                      currentLanguage === lang.code ? 'active' : ''
                    }`}
                    onClick={() => {
                      setCurrentLanguage(lang.code)
                      setShowLanguageDropdown(false)
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Icon */}
            <button
              className="search-btn"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Inquire Button */}
            <button className="inquire-nav-btn">
              INQUIRE
            </button>

            {/* Hamburger */}
            <button
              className="tl-burger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`tl-mobile ${isOpen ? 'open' : ''}`}>
          <div className="tl-mobile-inner">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="tl-mlink"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <span className="tl-mdot" />
              </Link>
            ))}
            <div className="tl-mlang">
              <span>Language</span>
              <select
                className="tl-mlang-select"
                value={currentLanguage}
                onChange={(e) => {
                  setCurrentLanguage(e.target.value as SupportedLanguage)
                  setIsOpen(false)
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
