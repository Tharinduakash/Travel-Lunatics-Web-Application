'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function AboutCta() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#FFFFFF' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="relative overflow-hidden rounded-[28px] p-10 sm:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            border: '1px solid rgba(249,115,22,0.20)',
            boxShadow: '0 8px 40px rgba(249,115,22,0.10)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -top-20 -right-20 opacity-40"
            style={{ background: 'radial-gradient(circle, #FED7AA 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10 bg-orange-400" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#F97316' }}>
                Ready to Explore?
              </span>
              <span className="h-px w-10 bg-orange-400" />
            </div>

            <h2
              className="font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Start Your Sri Lanka{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Adventure Today
              </span>
            </h2>

            <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              Contact Nilitha directly and let us design a personalized journey based on your
              interests, pace, and travel style.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90 hover:gap-3"
                style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:Travellunatics@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[14px] font-semibold text-gray-700 border border-gray-300 transition-all hover:border-orange-400 hover:text-orange-600"
              >
                Travellunatics@gmail.com
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              📞 WhatsApp / Phone: +94 74 358 2799
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>
    </section>
  )
}
