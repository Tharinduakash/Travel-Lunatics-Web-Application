'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

const ACTIVITY_TYPES = ['Hiking', 'Surfing', 'Wildlife Safari', 'Cultural Tour', 'Boat Ride', 'Camping', 'Snorkeling', 'Cycling', 'Cooking', 'Yoga']
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme']

interface ExperienceFormProps {
  initialData?: any
  isEdit?: boolean
}

export function ExperienceForm({ initialData, isEdit }: ExperienceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || [])

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    activity_type: initialData?.activity_type || '',
    duration: initialData?.duration || '',
    price: initialData?.price || '',
    location: initialData?.location || '',
    difficulty: initialData?.difficulty || '',
    featured: initialData?.featured || false,
    active: initialData?.active !== false,
  })

  function set(key: string, value: any) { setForm(f => ({ ...f, [key]: value })) }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImageFiles(prev => [...prev, ...files])
    files.forEach(f => setImagePreviews(prev => [...prev, URL.createObjectURL(f)]))
  }

  async function uploadImages(): Promise<string[]> {
    if (imageFiles.length === 0) return imagePreviews.filter(p => p.startsWith('http'))
    const fd = new FormData()
    imageFiles.forEach((f, i) => fd.append(`file${i}`, f))
    fd.append('folder', 'experiences')
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
    const data = await res.json()
    return [...imagePreviews.filter(p => p.startsWith('http')), ...(data.urls || [])]
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title) return toast.error('Title is required')
    setLoading(true)
    try {
      const images = await uploadImages()
      const payload = { ...form, images, price: form.price || null }
      const url = isEdit ? `/api/admin/experiences/${initialData.id}` : '/api/admin/experiences'
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      toast.success(isEdit ? 'Experience updated' : 'Experience created')
      router.push('/admin/experiences')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} required
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Activity Type</label>
              <select value={form.activity_type} onChange={e => set('activity_type', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
                <option value="">Select type</option>
                {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Difficulty</label>
              <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none">
                <option value="">Select difficulty</option>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Price ($)</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Duration</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 3 hours" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          <div className="flex gap-6">
            {[['featured', 'Featured'], ['active', 'Active']].map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={form[key as keyof typeof form] as boolean} onChange={e => set(key, e.target.checked)} className="h-4 w-4 rounded" />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Images</label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 hover:bg-muted/30 transition">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to upload images</span>
            <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
          </label>
          {imagePreviews.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg">
                  <img src={src} alt="" className="h-20 w-full object-cover" />
                  <button type="button" onClick={() => { setImagePreviews(prev => prev.filter((_, j) => j !== i)); setImageFiles(prev => prev.filter((_, j) => j !== i)) }}
                    className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 border-t pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-accent transition">Cancel</button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Experience' : 'Create Experience'}
        </button>
      </div>
    </form>
  )
}
