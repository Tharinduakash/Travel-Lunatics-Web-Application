'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+94 70 123 4567',
      link: 'tel:+94701234567',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@travellunatics.com',
      link: 'mailto:info@travellunatics.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Colombo, Sri Lanka',
      link: '#',
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
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have questions about your next adventure? We'd love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900">
                          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {info.title}
                          </h3>
                          <a
                            href={info.link}
                            className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          >
                            {info.content}
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Response Time */}
                <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Response Time
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We typically respond to inquiries within 2-4 hours during business hours
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                  >
                    ✓ Thank you! We'll be in touch soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 70 123 4567"
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Trip inquiry"
                      required
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans..."
                      required
                      rows={6}
                      className="rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
