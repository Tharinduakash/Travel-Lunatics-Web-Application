import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminThemeForcer } from '@/components/admin/admin-theme-forcer'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Admin – Travel Lunatics',
  description: 'Travel Lunatics Admin Dashboard',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Strip dark class before first paint so no flash of dark content */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');`,
        }}
      />
      <AdminThemeForcer />
      <div className="admin-panel flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-6 lg:p-8">
            {children}
          </div>
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </>
  )
}
