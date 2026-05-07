'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Upload, X, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface PackageFormProps {
  initialData?: any
  isEdit?: boolean
}

export function PackageForm({ initialData, isEdit }: PackageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || [])
  const [includedInput, setIncludedInput] = useState('')
  const [excludedInput, setExcludedInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  const CATEGORIES = [
    'Beach Tours',
    'Wildlife Tours',
    'Cultural Tours',
    'Food Tours',
    'Sacred Sri Lanka',
    'Discover Sri Lanka',
    'Local Experiences',
  ]

  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    duration: initialData?.duration || '',
    location: initialData?.location || '',
    included: initialData?.included || [],
    excluded: initialData?.excluded || [],
    itinerary: initialData?.itinerary || [],
    cover_image: initialData?.cover_image || '',
    tags: initialData?.tags || [],
    featured: initialData?.featured || false,
    active: initialData?.active !== false,
  })

  function set(key: string, value: any) { setForm(f => ({ ...f, [key]: value })) }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImageFiles(prev => [...prev, ...files])
    files.forEach(f => {
      const url = URL.createObjectURL(f)
      setImagePreviews(prev => [...prev, url])
    })
  }

  function removeImage(index: number) {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  function addToList(key: 'included' | 'excluded' | 'tags', value: string, clear: () => void) {
    if (!value.trim() || form[key].includes(value.trim())) return
    set(key, [...form[key], value.trim()])
    clear()
  }

  function removeFromList(key: 'included' | 'excluded' | 'tags', item: string) {
    set(key, form[key].filter((x: string) => x !== item))
  }

  function addItineraryDay() {
    set('itinerary', [...form.itinerary, { day: form.itinerary.length + 1, title: '', description: '' }])
  }

  function updateItinerary(index: number, field: string, value: string) {
    const updated = [...form.itinerary]
    updated[index] = { ...updated[index], [field]: value }
    set('itinerary', updated)
  }

  async function uploadImages(): Promise<string[]> {
    if (imageFiles.length === 0) return imagePreviews.filter(p => p.startsWith('http'))
    const fd = new FormData()
    imageFiles.forEach((f, i) => fd.append(`file${i}`, f))
    fd.append('folder', 'tour-packages')
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
    const data = await res.json()
    const existingUrls = imagePreviews.filter(p => p.startsWith('http'))
    return [...existingUrls, ...(data.urls || [])]
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.slug) return toast.error('Title and slug are required')
    setLoading(true)
    try {
      const images = await uploadImages()
      const cover_image = images[0] || form.cover_image
      const payload = { ...form, images, cover_image, price: form.price || null }

      const url = isEdit ? `/api/admin/packages/${initialData.id}` : '/api/admin/packages'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      toast.success(isEdit ? 'Package updated' : 'Package created')
      router.push('/admin/packages')
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Title *</label>
              <input value={form.title} onChange={e => { set('title', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)) }} required
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Slug *</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} required
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none font-mono" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
              <option value="">— Select category —</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Short Description</label>
            <textarea value={form.short_description} onChange={e => set('short_description', e.target.value)} rows={2} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none resize-none" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Full Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none resize-none" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Price ($)</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Duration</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 7 days" className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          {/* Included */}
          {(['included', 'excluded'] as const).map(key => (
            <div key={key}>
              <label className="mb-1.5 block text-sm font-medium capitalize">{key}</label>
              <div className="flex gap-2">
                <input
                  value={key === 'included' ? includedInput : excludedInput}
                  onChange={e => key === 'included' ? setIncludedInput(e.target.value) : setExcludedInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList(key, key === 'included' ? includedInput : excludedInput, key === 'included' ? () => setIncludedInput('') : () => setExcludedInput('')) } }}
                  placeholder={`Add ${key} item...`}
                  className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none"
                />
                <button type="button" onClick={() => addToList(key, key === 'included' ? includedInput : excludedInput, key === 'included' ? () => setIncludedInput('') : () => setExcludedInput(''))}
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-accent transition">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form[key].map((item: string) => (
                  <span key={item} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${key === 'included' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item}
                    <button type="button" onClick={() => removeFromList(key, item)} className="hover:opacity-70"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Tags</label>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList('tags', tagInput, () => setTagInput('')) } }}
                placeholder="Add tag..." className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none" />
              <button type="button" onClick={() => addToList('tags', tagInput, () => setTagInput(''))} className="rounded-lg border px-3 py-2 text-sm hover:bg-accent">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.tags.map((t: string) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                  {t}<button type="button" onClick={() => removeFromList('tags', t)}><X className="h-3 w-3" /></button>
                </span>
              ))}
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

        <div className="space-y-4">
          {/* Images */}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Gallery Images</label>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 hover:bg-muted/30 transition">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload images (multiple)</span>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
            </label>
            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <img src={src} alt="" className="h-20 w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70">
                      <X className="h-3 w-3" />
                    </button>
                    {i === 0 && <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Itinerary */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Itinerary</label>
              <button type="button" onClick={addItineraryDay} className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-accent transition">
                <Plus className="h-3 w-3" /> Add Day
              </button>
            </div>
            <div className="space-y-2">
              {form.itinerary.map((day: any, i: number) => (
                <div key={i} className="rounded-lg border bg-muted/30 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Day {day.day}</span>
                    <button type="button" onClick={() => set('itinerary', form.itinerary.filter((_: any, j: number) => j !== i))}
                      className="text-destructive hover:opacity-70"><Trash2 className="h-3 w-3" /></button>
                  </div>
                  <input value={day.title} onChange={e => updateItinerary(i, 'title', e.target.value)}
                    placeholder="Day title" className="mb-2 w-full rounded border bg-background px-2 py-1.5 text-sm outline-none" />
                  <textarea value={day.description} onChange={e => updateItinerary(i, 'description', e.target.value)}
                    placeholder="Day description" rows={2} className="w-full rounded border bg-background px-2 py-1.5 text-xs outline-none resize-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 border-t pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-accent transition">Cancel</button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  )
}
