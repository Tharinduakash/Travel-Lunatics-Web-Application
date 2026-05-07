'use client'

import { useEffect, useState } from 'react'
import {
  CalendarCheck, MessageSquare, MapPin, Package,
  Compass, Mail, Star, Globe, Clock, ExternalLink
} from 'lucide-react'
import { StatCard } from '@/components/admin/stat-card'
import { StatusBadge } from '@/components/admin/status-badge'
import { PageHeader } from '@/components/admin/page-header'
import Link from 'next/link'
import { format } from 'date-fns'

interface DashboardData {
  stats: {
    bookings: number
    inquiries: number
    packages: number
    destinations: number
    experiences: number
    subscribers: number
    pendingReviews: number
    testimonials: number
  }
  recentBookings: any[]
  recentInquiries: any[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Welcome to your admin dashboard" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl border bg-card animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const stats = data?.stats

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to Travel Lunatics admin panel"
        action={
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Website
          </Link>
        }
      />

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Bookings" value={stats?.bookings ?? 0} icon={CalendarCheck} color="blue" description="All trip requests" />
        <StatCard title="Inquiries" value={stats?.inquiries ?? 0} icon={MessageSquare} color="orange" description="Contact messages" />
        <StatCard title="Destinations" value={stats?.destinations ?? 0} icon={MapPin} color="teal" description="Active destinations" />
        <StatCard title="Tour Packages" value={stats?.packages ?? 0} icon={Package} color="purple" description="Active packages" />
        <StatCard title="Experiences" value={stats?.experiences ?? 0} icon={Compass} color="green" description="Active experiences" />
        <StatCard title="Subscribers" value={stats?.subscribers ?? 0} icon={Mail} color="blue" description="Newsletter list" />
        <StatCard title="Pending Reviews" value={stats?.pendingReviews ?? 0} icon={Globe} color="orange" description="Travel buddy approvals" />
        <StatCard title="Testimonials" value={stats?.testimonials ?? 0} icon={Star} color="teal" description="Customer reviews" />
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent bookings */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="font-semibold">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-xs text-muted-foreground hover:text-foreground transition">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {data?.recentBookings?.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">No bookings yet</p>
            )}
            {data?.recentBookings?.map((b: any) => (
              <div key={b.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{b.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{b.email}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1">
                  <StatusBadge status={b.status} />
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(b.created_at), 'MMM d')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="font-semibold">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-xs text-muted-foreground hover:text-foreground transition">
              View all →
            </Link>
          </div>
          <div className="divide-y">
            {data?.recentInquiries?.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">No inquiries yet</p>
            )}
            {data?.recentInquiries?.map((inq: any) => (
              <div key={inq.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{inq.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{inq.subject}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1">
                  <StatusBadge status={inq.status} />
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(inq.created_at), 'MMM d')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="mb-4 font-semibold">Quick Actions</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Add Destination', href: '/admin/destinations/new', icon: MapPin },
            { label: 'Add Package', href: '/admin/packages/new', icon: Package },
            { label: 'Add Experience', href: '/admin/experiences/new', icon: Compass },
            { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
          ].map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-accent"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
