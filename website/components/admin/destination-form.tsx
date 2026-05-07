'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

const CATEGORIES = ['Beach', 'Adventure', 'Nature', 'Wildlife', 'Spiritual', 'Historical', 'Cultural']

interface DestinationFormProps {
  initialData?: any
  isEdit?: boolean
}

export function DestinationForm({ initialData, isEdit }: DestinationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || '')
  const [highlightInput, setHighlightInput] = useState('')

  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || '',
    price_from: initialData?.price_from || '',
    duration_days: initialData?.duration_days || '',
    rating: initialData?.rating || '',
    reviews_count: initialData?.reviews_count || 0,
    highlights: initialData?.highlights || [],
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    featured: initialData?.featured || false,
    active: initialData?.active !== false,
  })

  function set(key: string, value: any) { setForm(f => ({ ...f, [key]: value })) }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function addHighlight() {
    const h = highlightInput.trim()
    if (!h || form.highlights.includes(h)) return
    set('highlights', [...form.highlights, h])
    setHighlightInput('')
  }

  function removeHighlight(h: string) {
    set('highlights', form.highlights.filter((x: string) => x !== h))
  }

  async function uploadImage(): Promise<string> {
    if (!imageFile) return form.image_url
    const fd = new FormData()
    fd.append('file0', imageFile)
    fd.append('folder', 'destinations')
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
    const data = await res.json()
    return data.urls?.[0] || form.image_url
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name) return toast.error('Name is required')
    setLoading(true)
    try {
      const image_url = await uploadImage()
      const payload = { ...form, image_url, price_from: form.price_from || null, duration_days: form.duration_days || null, rating: form.rating || null, latitude: form.latitude || null, longitude: form.longitude || null }

      const url = isEdit ? `/api/admin/destinations/${initialData.id}` : '/api/admin/destinations'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }
      toast.success(isEdit ? 'Destination updated' : 'Destination created')
      router.push('/admin/destinations')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Price From ($)</label>
              <input type="number" value={form.price_from} onChange={e => set('price_from', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Duration (days)</label>
              <input type="number" value={form.duration_days} onChange={e => set('duration_days', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Rating (0–5)</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set('rating', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Latitude</label>
              <input type="number" step="any" value={form.latitude} onChange={e => set('latitude', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Longitude</label>
              <input type="number" step="any" value={form.longitude} onChange={e => set('longitude', e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Highlights</label>
            <div className="flex gap-2">
              <input
                value={highlightInput}
                onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlight() } }}
                placeholder="Add a highlight and press Enter"
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none"
              />
              <button type="button" onClick={addHighlight}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-accent transition">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.highlights.map((h: string) => (
                <span key={h} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                  {h}
                  <button type="button" onClick={() => removeHighlight(h)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            {[['featured', 'Featured'], ['active', 'Active']].map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={form[key as keyof typeof form] as boolean}
                  onChange={e => set(key, e.target.checked)} className="h-4 w-4 rounded" />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right column – image */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Cover Image</label>
            <div className="relative overflow-hidden rounded-xl border-2 border-dashed bg-muted/30 p-4">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                  <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); set('image_url', '') }}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 py-8 text-muted-foreground hover:text-foreground transition">
                  <Upload className="h-8 w-8" />
                  <span className="text-sm font-medium">Click to upload image</span>
                  <span className="text-xs">JPG, PNG, WEBP up to 10MB</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Or enter image URL</label>
            <input value={form.image_url} onChange={e => { set('image_url', e.target.value); setImagePreview(e.target.value); setImageFile(null) }}
              placeholder="https://..."
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 border-t pt-4">
        <button type="button" onClick={() => router.back()}
          className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-accent transition">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Destination' : 'Create Destination'}
        </button>
      </div>
    </form>
  )
}
