import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  try {
    const [
      [bookings],
      [inquiries],
      [packages],
      [destinations],
      [experiences],
      [subscribers],
      [travelBuddies],
      [testimonials],
      recentBookings,
      recentInquiries,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM trip_requests`,
      sql`SELECT COUNT(*)::int AS count FROM inquiries`,
      sql`SELECT COUNT(*)::int AS count FROM tour_packages WHERE active = true`,
      sql`SELECT COUNT(*)::int AS count FROM destinations`,
      sql`SELECT COUNT(*)::int AS count FROM experiences WHERE active = true`,
      sql`SELECT COUNT(*)::int AS count FROM newsletter_subscribers`,
      sql`SELECT COUNT(*)::int AS count FROM travel_buddies WHERE approved = false`,
      sql`SELECT COUNT(*)::int AS count FROM testimonials`,
      sql`SELECT id, name, email, status, created_at FROM trip_requests ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT id, name, email, subject, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5`,
    ])

    return NextResponse.json({
      stats: {
        bookings: bookings.count,
        inquiries: inquiries.count,
        packages: packages.count,
        destinations: destinations.count,
        experiences: experiences.count,
        subscribers: subscribers.count,
        pendingReviews: travelBuddies.count,
        testimonials: testimonials.count,
      },
      recentBookings,
      recentInquiries,
    })
  } catch (err: any) {
    console.error('Dashboard stats error:', err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
