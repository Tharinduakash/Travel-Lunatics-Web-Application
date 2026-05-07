'use client'

import { useState } from 'react'
import { Upload, X, Copy, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'

interface UploadedFile {
  url: string
  name: string
}

export default function MediaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [folder, setFolder] = useState('admin-uploads')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || [])
    if (selected.length === 0) return
    setUploading(true)

    const fd = new FormData()
    selected.forEach((f, i) => fd.append(`file${i}`, f))
    fd.append('folder', folder)

    const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)

    if (data.urls?.length) {
      const newFiles = data.urls.map((url: string, i: number) => ({ url, name: selected[i]?.name || `image-${i + 1}` }))
      setFiles(prev => [...newFiles, ...prev])
      toast.success(`${data.urls.length} image(s) uploaded`)
    } else {
      toast.error('Upload failed')
    }
    e.target.value = ''
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    toast.success('URL copied')
  }

  function removeFile(url: string) {
    setFiles(prev => prev.filter(f => f.url !== url))
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Media Library" description="Upload and manage images" />

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium">Upload Folder</label>
          <select value={folder} onChange={e => setFolder(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
            {['admin-uploads', 'destinations', 'tour-packages', 'experiences', 'testimonials', 'general'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <label className="cursor-pointer">
          <div className={`flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition ${uploading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary/90 cursor-pointer'}`}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading...' : 'Upload Images'}
          </div>
          <input type="file" accept="image/*" multiple disabled={uploading} onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {files.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Uploaded this session</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {files.map(f => (
              <div key={f.url} className="group relative overflow-hidden rounded-xl border bg-card">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={f.url} alt={f.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="mb-2 truncate text-xs font-medium">{f.name}</p>
                  <div className="flex gap-2">
                    <button onClick={() => copyUrl(f.url)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs hover:bg-accent transition">
                      <Copy className="h-3 w-3" /> Copy URL
                    </button>
                    <button onClick={() => removeFile(f.url)}
                      className="rounded-lg border px-2 py-1.5 text-destructive hover:bg-destructive/10 transition">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && !uploading && (
        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed bg-muted/20 py-16 transition hover:bg-muted/30">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Click to upload images</p>
            <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP up to 10MB each</p>
          </div>
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
      )}
    </div>
  )
}
