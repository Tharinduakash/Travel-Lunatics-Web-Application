'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export function HomeAboutSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Section title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Sri Lanka&apos;s Leading
            <br />
            <span className="text-gradient bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Travel Experience
            </span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left image */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop"
                alt="Travel experience in Sri Lanka"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </motion.div>

          {/* Center content */}
          <motion.div
            className="lg:col-span-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Experience the enchantment of Sri Lanka with Travel Lunatics...
            </h3>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Travel Lunatics has been a leader in the Sri Lankan tourism industry for over five decades of excellence, 
              organizing inbound tours for couples on holiday or honeymoon, for individual adventurers and nature lovers, 
              as well as for special interest and incentives holiday groups and convention delegates.
            </p>

            {/* Bullet points */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  A subsidiary of Sri Lanka&apos;s largest conglomerate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Trusted partner for leading global travel brands
                </span>
              </li>
            </ul>

            {/* About Us button */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-3 w-fit px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              ABOUT US
            </Link>
          </motion.div>

          {/* Right image */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=800&fit=crop"
                alt="Sri Lanka coastal view"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
