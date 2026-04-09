'use client'

import React from 'react'
import Image from 'next/image'
import { Lightbulb, MapPin, Users, Heart, DollarSign, Shield } from 'lucide-react'

interface WhyTravelItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  imageSrc: string
  imageAlt: string
}

export function WhyTravelSection() {
  const reasons: WhyTravelItem[] = [
    {
      id: 1,
      title: 'Local Experts, Real Experiences',
      description: 'Guides who know Sri Lanka beyond the guidebooks.',
      icon: <Users className="w-8 h-8" />,
      imageSrc: '/images/reason-1-guides.jpg',
      imageAlt: 'Expert guides at ancient temple',
    },
    {
      id: 2,
      title: 'Tailor-Made Journeys',
      description: 'Trips customized to your style and pace.',
      icon: <MapPin className="w-8 h-8" />,
      imageSrc: '/images/reason-2-planning.jpg',
      imageAlt: 'Couple planning trip with map',
    },
    {
      id: 3,
      title: 'Authentic & Immersive',
      description: 'Experience real culture, food, and village life.',
      icon: <Heart className="w-8 h-8" />,
      imageSrc: '/images/reason-3-cooking.jpg',
      imageAlt: 'Cooking with locals',
    },
    {
      id: 4,
      title: 'Trusted & Reliable Service',
      description: '24/7 support and smooth travel.',
      icon: <Shield className="w-8 h-8" />,
      imageSrc: '/images/reason-4-pickup.jpg',
      imageAlt: 'Airport pickup service',
    },
    {
      id: 5,
      title: 'Best Value for Your Journey',
      description: 'Premium experiences at competitive prices.',
      icon: <DollarSign className="w-8 h-8" />,
      imageSrc: '/images/reason-5-luxury.jpg',
      imageAlt: 'Luxury hotel pool with jungle view',
    },
    {
      id: 6,
      title: 'Safe & Comfortable Travel',
      description: 'Professional guides and quality transport.',
      icon: <Lightbulb className="w-8 h-8" />,
      imageSrc: '/images/reason-6-vehicle.jpg',
      imageAlt: 'Clean private vehicle',
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 text-balance">
            Why Travel With Travel Lunatics?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Discover what makes us the premier choice for authentic Sri Lankan experiences
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                <Image
                  src={reason.imageSrc}
                  alt={reason.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Container */}
              <div className="p-6 bg-white">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-orange-100 rounded-full text-orange-600">
                  {reason.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-sans">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Accent Line */}
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
