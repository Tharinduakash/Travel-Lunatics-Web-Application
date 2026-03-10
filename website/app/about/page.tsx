'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      title: 'Authenticity',
      description: 'We believe in authentic experiences that connect travelers with real Sri Lankan culture',
    },
    {
      title: 'Excellence',
      description: 'Our commitment to quality ensures every trip exceeds expectations',
    },
    {
      title: 'Sustainability',
      description: 'We support responsible tourism that benefits local communities',
    },
    {
      title: 'Innovation',
      description: 'We constantly innovate to bring fresh, unique travel experiences',
    },
  ]

  const team = [
    { name: 'Rohan Silva', role: 'Founder & CEO', image: '🧑‍💼' },
    { name: 'Priya Perera', role: 'Travel Director', image: '👩‍💼' },
    { name: 'Malith Kumar', role: 'Operations Manager', image: '🧑‍💼' },
    { name: 'Aisha Mohamed', role: 'Customer Experience Lead', image: '👩‍💼' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <main className="pt-8">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                About Travel Lunatics
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We're passionate about helping you discover the magic of Sri Lanka
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Travel Lunatics was founded with a simple mission: to create unforgettable travel
                experiences that showcase the true beauty and culture of Sri Lanka. What started as
                a passion project has grown into a trusted travel partner for thousands of adventurers
                from around the world.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                With over 10 years of experience in the travel industry, our team of expert guides
                and travel planners are dedicated to crafting personalized itineraries that bring
                your dreams to life. From ancient temples to pristine beaches, from mountain adventures
                to culinary experiences, we cover it all.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            >
              {[
                { number: '5000+', label: 'Happy Travelers' },
                { number: '50+', label: 'Destinations' },
                { number: '10+', label: 'Years Experience' },
                { number: '98%', label: 'Satisfaction Rate' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-center"
                >
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center"
            >
              Our Core Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center"
            >
              Meet Our Team
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="text-4xl mb-3">{member.image}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
