'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { PageHeader } from '@/components/admin/page-header'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const limit = 15

  const fetchPackages = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search })
    const res = await fetch(`/api/admin/packages?${params}`)
    const data = await res.json()
    setPackages(data.packages || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchPackages() }, [fetchPackages])

  async function deletePkg() {
    if (!deleteId) return
    setDeleting(true)
    await fetch(`/api/admin/packages/${deleteId}`, { method: 'DELETE' })
    setDeleting(false)
    setDeleteId(null)
    toast.success('Package deleted')
    fetchPackages()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Tour Packages"
        description={`${total} packages`}
        action={
          <Link href="/admin/packages/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
            <Plus className="h-4 w-4" /> Add Package
          </Link>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search packages..."
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                {['Image', 'Title', 'Location', 'Price', 'Duration', 'Featured', 'Active', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 8 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded bg-muted animate-pulse w-20" /></td>)}</tr>
              )) : packages.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No packages found. <Link href="/admin/packages/new" className="underline">Add one</Link></td></tr>
              ) : packages.map(p => (
                <tr key={p.id} className="hover:bg-muted/20 transition">
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 overflow-hidden rounded-md bg-muted">
                      {p.cover_image && <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.title}</div>
                    {p.category && (
                      <span className="mt-0.5 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{p.category}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.location || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.price ? `$${p.price}` : '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.duration || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full ${p.featured ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full ${p.active ? 'bg-green-500' : 'bg-red-400'}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/packages/${p.id}`} className="rounded p-1.5 hover:bg-accent transition"><Pencil className="h-4 w-4" /></Link>
                      <button onClick={() => setDeleteId(p.id)} className="rounded p-1.5 text-destructive hover:bg-destructive/10 transition"><Trash2 className="h-4 w-4" /></button>
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

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Package"
        description="This will permanently delete this tour package."
        onConfirm={deletePkg}
        loading={deleting}
      />
    </div>
  )
}
