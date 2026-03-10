'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-emerald-500 to-blue-600 dark:from-emerald-900 dark:via-emerald-800 dark:to-blue-900">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready for Your Adventure?
          </h2>
          <p className="text-lg text-emerald-50 mb-8">
            Start planning your dream trip to Sri Lanka today and create memories that last a lifetime
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold"
              >
                Plan Your Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              <Mail className="mr-2 h-5 w-5" />
              Subscribe to Newsletter
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-white/20"
          >
            {[
              { number: '5000+', label: 'Happy Travelers' },
              { number: '50+', label: 'Destinations' },
              { number: '10+', label: 'Years Experience' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-white">{stat.number}</p>
                <p className="text-emerald-100">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
