'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'
import { format } from 'date-fns'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [form, setForm] = useState({ name: '', rating: 5, review: '', image_url: '' })
  const [saving, setSaving] = useState(false)
  const limit = 15

  const fetchTestimonials = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
    const res = await fetch(`/api/admin/testimonials?${params}`)
    const data = await res.json()
    setTestimonials(data.testimonials || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchTestimonials() }, [fetchTestimonials])

  function openNew() { setForm({ name: '', rating: 5, review: '', image_url: '' }); setEditItem(null); setShowForm(true) }
  function openEdit(t: any) { setForm({ name: t.name, rating: t.rating, review: t.review, image_url: t.image_url || '' }); setEditItem(t); setShowForm(true) }

  async function saveTestimonial(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const url = editItem ? `/api/admin/testimonials/${editItem.id}` : '/api/admin/testimonials'
    const method = editItem ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    if (res.ok) { toast.success(editItem ? 'Updated' : 'Created'); setShowForm(false); fetchTestimonials() }
    else toast.error('Failed to save')
  }

  async function deleteTestimonial() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/testimonials/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Testimonial deleted')
    fetchTestimonials()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Testimonials"
        description={`${total} reviews`}
        action={
          <button onClick={openNew}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search testimonials..."
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Customer', 'Destination', 'Rating', 'Review', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-24" /></td>)}</tr>
              )) : testimonials.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No testimonials found</td></tr>
              ) : testimonials.map(t => (
                <tr key={t.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {t.image_url ? (
                        <img src={t.image_url} alt={t.name} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{t.name[0]}</div>
                      )}
                      <span className="font-medium">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.destination_name || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">{t.review}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{format(new Date(t.created_at), 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(t)} className="rounded p-1.5 hover:bg-accent transition"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(t.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition"><Trash2 className="h-4 w-4" /></button>
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="rounded p-1 hover:bg-accent disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded p-1 hover:bg-accent disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">{editItem ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={saveTestimonial} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Customer Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Rating</label>
                <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Review</label>
                <textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} required rows={4}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none resize-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Photo URL (optional)</label>
                <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border py-2 text-sm hover:bg-accent transition">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Testimonial" description="This will permanently delete this testimonial." onConfirm={deleteTestimonial} loading={deleting} />
    </div>
  )
}
