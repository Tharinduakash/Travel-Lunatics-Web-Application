'use client'

import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { PageHeader } from '@/components/admin/page-header'
import { toast } from 'sonner'

const SETTINGS_FIELDS = [
  { key: 'site_name', label: 'Site Name', type: 'text', section: 'General' },
  { key: 'site_tagline', label: 'Tagline', type: 'text', section: 'General' },
  { key: 'meta_description', label: 'Meta Description', type: 'textarea', section: 'General' },
  { key: 'contact_email', label: 'Contact Email', type: 'email', section: 'Contact' },
  { key: 'contact_phone', label: 'Contact Phone', type: 'text', section: 'Contact' },
  { key: 'contact_address', label: 'Address', type: 'text', section: 'Contact' },
  { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text', section: 'Contact' },
  { key: 'google_maps_url', label: 'Google Maps URL', type: 'url', section: 'Contact' },
  { key: 'facebook_url', label: 'Facebook URL', type: 'url', section: 'Social Media' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url', section: 'Social Media' },
  { key: 'twitter_url', label: 'Twitter/X URL', type: 'url', section: 'Social Media' },
]

const SECTIONS = ['General', 'Contact', 'Social Media']

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => { setSettings(d.settings || {}); setLoading(false) })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    if (res.ok) toast.success('Settings saved')
    else toast.error('Failed to save settings')
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <PageHeader title="Settings" />
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 rounded-xl border bg-card animate-pulse" />)}</div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="Manage website settings and configuration" />

      <form onSubmit={handleSave} className="space-y-6">
        {SECTIONS.map(section => {
          const fields = SETTINGS_FIELDS.filter(f => f.section === section)
          return (
            <div key={section} className="rounded-xl border bg-card p-5">
              <h3 className="mb-4 font-semibold">{section}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map(field => (
                  <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label className="mb-1.5 block text-sm font-medium">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={settings[field.key] || ''}
                        onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key] || ''}
                        onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
