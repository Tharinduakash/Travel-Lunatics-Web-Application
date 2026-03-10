'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, LinkedinIcon } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Services', href: '/#services' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Travel Tips', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Travel Guides', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="border-t border-gray-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 text-white font-bold">
                  TL
                </div>
                <span className="text-xl font-bold text-white">Travel Lunatics</span>
              </div>
              <p className="text-sm mb-4">
                Discover the magic of Sri Lanka with our curated travel experiences
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-emerald-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <a href="mailto:info@travellunatics.com" className="text-sm hover:text-emerald-400 transition-colors">
                    info@travellunatics.com
                  </a>
                </li>
                <li className="flex gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <a href="tel:+94701234567" className="text-sm hover:text-emerald-400 transition-colors">
                    +94 70 123 4567
                  </a>
                </li>
                <li className="flex gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-sm">Colombo, Sri Lanka</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">
                &copy; {currentYear} Travel Lunatics. All rights reserved.
              </p>
              <p className="text-sm">
                Made with ❤️ for travel enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
