import { PackageForm } from '@/components/admin/package-form'
import { PageHeader } from '@/components/admin/page-header'
import sql from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [pkg] = await sql`SELECT * FROM tour_packages WHERE id = ${id}`
  if (!pkg) notFound()

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Package" description={pkg.title} />
      <div className="rounded-xl border bg-card p-6">
        <PackageForm initialData={pkg} isEdit />
      </div>
    </div>
  )
}
