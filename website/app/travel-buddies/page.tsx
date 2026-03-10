'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Users, MapPin, Calendar, MessageSquare } from 'lucide-react'

export default function TravelBuddiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    travel_date: '',
    travelers_count: 1,
    bio: '',
    interests: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/travel-buddies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interests: formData.interests.split(',').map((i) => i.trim()),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          destination: '',
          travel_date: '',
          travelers_count: 1,
          bio: '',
          interests: '',
        })
        setShowForm(false)
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Failed to submit:', error)
    }
  }

  const sampleBuddies = [
    {
      id: 1,
      name: 'Alex Thompson',
      destination: 'Ella Rock',
      travel_date: 'April 15-22',
      travelers_count: 2,
      interests: ['Hiking', 'Photography', 'Local Food'],
    },
    {
      id: 2,
      name: 'Maria Garcia',
      destination: 'Mirissa Beach',
      travel_date: 'April 20-27',
      travelers_count: 3,
      interests: ['Beach', 'Surfing', 'Whale Watching'],
    },
    {
      id: 3,
      name: 'James Wilson',
      destination: 'Sigiriya',
      travel_date: 'April 18-25',
      travelers_count: 1,
      interests: ['History', 'Adventure', 'Culture'],
    },
    {
      id: 4,
      name: 'Priya Patel',
      destination: 'Kandy Temple',
      travel_date: 'April 25-May 2',
      travelers_count: 2,
      interests: ['Spirituality', 'Culture', 'Local Customs'],
    },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                <Users className="h-4 w-4" />
                Travel Community
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Find Your Travel Buddies
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Connect with fellow travelers and explore Sri Lanka together
              </p>
            </motion.div>
          </div>
        </section>

        {/* Join Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-4xl">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
              >
                ✓ Thanks for joining! We'll help match you with travel buddies.
              </motion.div>
            )}

            {!showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Find Travel Buddies
                </Button>
              </motion.div>
            )}

            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tell Us About You
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      name="destination"
                      placeholder="Destination you're visiting"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                    <Input
                      type="text"
                      name="travel_date"
                      placeholder="Travel dates (e.g., April 15-22)"
                      value={formData.travel_date}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="number"
                      name="travelers_count"
                      placeholder="Number of travelers"
                      value={formData.travelers_count}
                      onChange={handleChange}
                      min="1"
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                    <Input
                      type="text"
                      name="interests"
                      placeholder="Interests (e.g., hiking, photography, food)"
                      value={formData.interests}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  <Textarea
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                    >
                      Find Buddies
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </section>

        {/* Travel Buddies List */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Available Travel Buddies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleBuddies.map((buddy, index) => (
                <motion.div
                  key={buddy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {buddy.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Looking for travel companions</p>
                    </div>
                    <div className="text-4xl">👤</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {buddy.destination}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {buddy.travel_date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      {buddy.travelers_count} traveler(s)
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Interests:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {buddy.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Connect
                  </Button>
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
