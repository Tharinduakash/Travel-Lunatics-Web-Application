'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Trash2, CheckCircle, XCircle, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import { StatusBadge } from '@/components/admin/status-badge'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [approved, setApproved] = useState('all')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)
  const limit = 15

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
    if (approved !== 'all') params.set('approved', approved)
    const res = await fetch(`/api/admin/travel-buddies?${params}`)
    const data = await res.json()
    setReviews(data.reviews || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search, approved])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  async function toggleApproval(id: number, value: boolean) {
    const res = await fetch(`/api/admin/travel-buddies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: value }),
    })
    if (res.ok) { toast.success(value ? 'Approved' : 'Approval revoked'); fetchReviews() }
    else toast.error('Failed')
  }

  async function deleteReview() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/travel-buddies/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Review deleted')
    fetchReviews()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Customer Reviews"
        description={`${total} travel buddy reviews — approve to show on website`}
      />

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
          value={approved}
          onChange={e => { setApproved(e.target.value); setPage(1) }}
          className="rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Reviews</option>
          <option value="false">Pending Approval</option>
          <option value="true">Approved</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Reviewer', 'Country', 'Rating', 'Review', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-20" /></td>
                  ))}</tr>
                ))
              ) : reviews.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No reviews found</td></tr>
              ) : reviews.map(r => (
                <tr key={r.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {r.image_url
                        ? <img src={r.image_url} alt={r.name} className="h-8 w-8 rounded-full object-cover" />
                        : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{r.name?.[0] || '?'}</div>
                      }
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.country || '—'}</td>
                  <td className="px-4 py-3 text-amber-500 font-medium">{r.rating ? `${r.rating}/5` : '—'}</td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">{r.review}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.approved ? 'approved' : 'pending'} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                    {format(new Date(r.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setSelected(r)} className="rounded p-1.5 hover:bg-accent transition" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      {!r.approved ? (
                        <button onClick={() => toggleApproval(r.id, true)} className="rounded p-1.5 text-green-600 hover:bg-green-50 transition" title="Approve">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      ) : (
                        <button onClick={() => toggleApproval(r.id, false)} className="rounded p-1.5 text-orange-500 hover:bg-orange-50 transition" title="Revoke">
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button onClick={() => setDeleteId(r.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition">
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded p-1 hover:bg-accent disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded p-1 hover:bg-accent disabled:opacity-40">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <h2 className="font-bold">Review by {selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Email', selected.email],
                ['Country', selected.country || '—'],
                ['Travel Type', selected.travel_type || '—'],
                ['Places', Array.isArray(selected.places) ? selected.places.join(', ') : '—'],
                ['Rating', selected.rating ? `${selected.rating}/5` : '—'],
                ['Status', selected.approved ? 'Approved' : 'Pending'],
              ].map(([l, v]) => (
                <div key={l} className="flex gap-3">
                  <span className="w-28 shrink-0 font-medium text-muted-foreground">{l}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div className="mt-3 rounded-lg bg-muted p-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Review</p>
                <p className="whitespace-pre-wrap">{selected.review}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {!selected.approved ? (
                  <button
                    onClick={() => { toggleApproval(selected.id, true); setSelected(null) }}
                    className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                  >
                    Approve & Publish
                  </button>
                ) : (
                  <button
                    onClick={() => { toggleApproval(selected.id, false); setSelected(null) }}
                    className="flex-1 rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600 transition"
                  >
                    Revoke Approval
                  </button>
                )}
                <button
                  onClick={() => { setDeleteId(selected.id); setSelected(null) }}
                  className="flex-1 rounded-lg bg-destructive py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Review"
        description="This will permanently delete this customer review."
        onConfirm={deleteReview}
        loading={deleting}
      />
    </div>
  )
}
