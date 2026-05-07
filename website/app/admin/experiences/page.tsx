'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const limit = 15

  const fetchExperiences = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
    const res = await fetch(`/api/admin/experiences?${params}`)
    const data = await res.json()
    setExperiences(data.experiences || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchExperiences() }, [fetchExperiences])

  async function deleteExp() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/experiences/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Experience deleted')
    fetchExperiences()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Experiences"
        description={`${total} experiences`}
        action={
          <Link href="/admin/experiences/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-4 w-4" /> Add Experience
          </Link>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search experiences..."
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Image', 'Title', 'Type', 'Location', 'Price', 'Difficulty', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 8 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-20" /></td>)}</tr>
              )) : experiences.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No experiences found. <Link href="/admin/experiences/new" className="underline">Add one</Link></td></tr>
              ) : experiences.map(e => (
                <tr key={e.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 overflow-hidden rounded-md bg-muted">
                      {e.images?.[0] && <img src={e.images[0]} alt={e.title} className="h-full w-full object-cover" loading="lazy" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{e.title}</td>
                  <td className="px-4 py-3">
                    {e.activity_type && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{e.activity_type}</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.location || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.price ? `$${e.price}` : '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.difficulty || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full ${e.featured ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/experiences/${e.id}`} className="rounded p-1.5 hover:bg-accent transition"><Pencil className="h-4 w-4" /></Link>
                      <button onClick={() => setDeleteId(e.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition"><Trash2 className="h-4 w-4" /></button>
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

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Experience" description="This will permanently delete this experience." onConfirm={deleteExp} loading={deleting} />
    </div>
  )
}
