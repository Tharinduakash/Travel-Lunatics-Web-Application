import { DestinationForm } from '@/components/admin/destination-form'
import { PageHeader } from '@/components/admin/page-header'
import sql from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [dest] = await sql`SELECT * FROM destinations WHERE id = ${id}`
  if (!dest) notFound()

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Destination" description={dest.name} />
      <div className="rounded-xl border bg-card p-6">
        <DestinationForm initialData={dest} isEdit />
      </div>
    </div>
  )
}
