'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  MapPin,
  Users,
  Shield,
  Camera,
  Utensils,
} from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Flight Arrangements',
    description: 'Convenient flight bookings and airport transfers to start your journey',
  },
  {
    icon: MapPin,
    title: 'Custom Itineraries',
    description: 'Personalized travel plans tailored to your preferences and interests',
  },
  {
    icon: Users,
    title: 'Expert Guides',
    description: 'Local guides with deep knowledge of Sri Lankan culture and history',
  },
  {
    icon: Shield,
    title: '24/7 Support',
    description: 'Round-the-clock customer support throughout your entire journey',
  },
  {
    icon: Camera,
    title: 'Photography Tours',
    description: 'Professional photography tours to capture Sri Lanka\'s beauty',
  },
  {
    icon: Utensils,
    title: 'Culinary Experiences',
    description: 'Authentic local food tastings and cooking experiences',
  },
]

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive travel services designed to make your Sri Lankan adventure unforgettable
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 transition-all duration-300 hover:shadow-lg dark:hover:shadow-emerald-900/20"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100 group-hover:scale-110 transition-transform dark:from-emerald-900 dark:to-blue-900">
                  <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>

                {/* Animated Border */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
