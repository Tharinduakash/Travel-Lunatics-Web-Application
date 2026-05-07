'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Trash2, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import { format } from 'date-fns'
import { toast } from 'sonner'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const limit = 20

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
    const res = await fetch(`/api/admin/subscribers?${params}`)
    const data = await res.json()
    setSubscribers(data.subscribers || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchSubscribers() }, [fetchSubscribers])

  async function deleteSubscriber() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/subscribers/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Subscriber removed')
    fetchSubscribers()
  }

  function exportCSV() {
    const rows = [['Name', 'Email', 'Subscribed At'], ...subscribers.map(s => [s.name || '', s.email, format(new Date(s.subscribed_at), 'yyyy-MM-dd')])]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Subscribers"
        description={`${total} newsletter subscribers`}
        action={
          <button onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search subscribers..."
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              {['Name', 'Email', 'Subscribed', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>{Array.from({ length: 4 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-24" /></td>)}</tr>
            )) : subscribers.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">No subscribers found</td></tr>
            ) : subscribers.map(s => (
              <tr key={s.id} className="hover:bg-muted/20 transition">
                <td className="px-4 py-3 font-medium">{s.name || '—'}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.email}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{format(new Date(s.subscribed_at), 'MMM d, yyyy')}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setDeleteId(s.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Remove Subscriber" description="This will remove this email from the newsletter list." onConfirm={deleteSubscriber} loading={deleting} />
    </div>
  )
}
