'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Trash2, ChevronLeft, ChevronRight, Eye, Mail } from 'lucide-react'
import { StatusBadge } from '@/components/admin/status-badge'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import { format } from 'date-fns'
import { toast } from 'sonner'

const STATUSES = ['', 'unread', 'read', 'replied']

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)
  const limit = 15

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search, status })
    const res = await fetch(`/api/admin/inquiries?${params}`)
    const data = await res.json()
    setInquiries(data.inquiries || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search, status])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  async function updateStatus(id: number, newStatus: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchInquiries()
  }

  async function deleteInquiry() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/inquiries/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Inquiry deleted')
    fetchInquiries()
  }

  async function openDetail(inq: any) {
    setSelected(inq)
    if (inq.status === 'unread') await updateStatus(inq.id, 'read')
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader title="Inquiries" description={`${total} contact messages`} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by name, email, or subject..."
            className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1) }}
          className="rounded-lg border bg-background px-3 py-2 text-sm outline-none"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>)}
        </select>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Sender', 'Subject', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 5 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-24" /></td>)}</tr>
              )) : inquiries.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No inquiries found</td></tr>
              ) : inquiries.map(inq => (
                <tr key={inq.id} className={`hover:bg-muted/20 transition ${inq.status === 'unread' ? 'font-semibold' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium">{inq.name}</div>
                    <div className="text-xs text-muted-foreground">{inq.email}</div>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-muted-foreground">{inq.subject}</td>
                  <td className="px-4 py-3"><StatusBadge status={inq.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                    {format(new Date(inq.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openDetail(inq)} className="rounded p-1.5 hover:bg-accent transition" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <a href={`mailto:${inq.email}?subject=Re: ${inq.subject}`} onClick={() => updateStatus(inq.id, 'replied')}
                        className="rounded p-1.5 hover:bg-accent transition" title="Reply">
                        <Mail className="h-4 w-4" />
                      </a>
                      <button onClick={() => setDeleteId(inq.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition">
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
              <h2 className="text-lg font-bold">Inquiry from {selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="w-20 font-medium text-muted-foreground">Email</span><span>{selected.email}</span></div>
              {selected.phone && <div className="flex gap-3"><span className="w-20 font-medium text-muted-foreground">Phone</span><span>{selected.phone}</span></div>}
              <div className="flex gap-3"><span className="w-20 font-medium text-muted-foreground">Subject</span><span>{selected.subject}</span></div>
              <div className="flex gap-3"><span className="w-20 font-medium text-muted-foreground">Date</span><span>{format(new Date(selected.created_at), 'MMM d, yyyy HH:mm')}</span></div>
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-1 text-xs font-medium text-muted-foreground uppercase">Message</p>
                <p className="leading-relaxed">{selected.message}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  onClick={() => updateStatus(selected.id, 'replied')}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
                  Reply via Email
                </a>
                <select
                  value={selected.status}
                  onChange={e => { updateStatus(selected.id, e.target.value); setSelected({ ...selected, status: e.target.value }) }}
                  className="rounded-lg border bg-background px-3 text-sm outline-none"
                >
                  {['unread', 'read', 'replied'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Inquiry"
        description="This will permanently delete this inquiry."
        onConfirm={deleteInquiry}
        loading={deleting}
      />
    </div>
  )
}
