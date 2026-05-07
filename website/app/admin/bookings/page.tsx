'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import { format } from 'date-fns'
import { toast } from 'sonner'

const STATUSES = ['', 'unread', 'read', 'replied', 'archived']
const ROW_STATUSES = ['unread', 'read', 'replied', 'archived']

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)

  const limit = 15

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search, status })
    const res = await fetch(`/api/admin/bookings?${params}`)
    const data = await res.json()
    setBookings(data.bookings || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search, status])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  async function updateStatus(id: number, newStatus: string) {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) { toast.success('Status updated'); fetchBookings() }
    else toast.error('Failed to update status')
  }

  async function deleteBooking() {
    if (!deleteId) return
    setDeleting(true)
    const res = await fetch(`/api/admin/bookings/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    if (res.ok) { toast.success('Inquiry deleted'); fetchBookings() }
    else toast.error('Failed to delete')
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader title="Contact Inquiries" description={`${total} total inquiries from contact form`} />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1) }}
          className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Customer', 'Subject', 'Message', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-24" /></td>
                    ))}
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No inquiries found</td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.email}</div>
                    {b.phone && <div className="text-xs text-muted-foreground">{b.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[160px]">
                    <span className="line-clamp-1">{b.subject || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs">
                    <p className="truncate">{b.message}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, e.target.value)}
                      className="rounded border bg-background px-2 py-1 text-xs outline-none"
                    >
                      {ROW_STATUSES.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                    {format(new Date(b.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(b)} className="rounded p-1.5 hover:bg-accent transition" title="View details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(b.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <span className="text-xs text-muted-foreground">{(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded p-1 hover:bg-accent disabled:opacity-40 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded p-1 hover:bg-accent disabled:opacity-40 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-lg font-bold">Inquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="grid gap-2 text-sm">
              {[
                ['Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone || '—'],
                ['Subject', selected.subject || '—'],
                ['Status', selected.status],
                ['Received', format(new Date(selected.created_at), 'MMM d, yyyy HH:mm')],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-20 shrink-0 font-medium text-muted-foreground">{label}</span>
                  <span className="flex-1">{value}</span>
                </div>
              ))}
              {selected.message && (
                <div className="mt-2 rounded-lg bg-muted p-3">
                  <p className="mb-1 font-medium text-muted-foreground">Message</p>
                  <p className="whitespace-pre-wrap">{selected.message}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <a href={`mailto:${selected.email}`}
                className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                Reply via Email
              </a>
              <button onClick={() => { updateStatus(selected.id, 'replied'); setSelected(null) }}
                className="flex-1 rounded-lg border py-2 text-sm font-medium hover:bg-accent transition">
                Mark Replied
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Inquiry"
        description="This will permanently delete this inquiry. This action cannot be undone."
        onConfirm={deleteBooking}
        loading={deleting}
      />
    </div>
  )
}
