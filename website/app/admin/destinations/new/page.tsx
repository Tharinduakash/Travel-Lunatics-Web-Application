import { DestinationForm } from '@/components/admin/destination-form'
import { PageHeader } from '@/components/admin/page-header'

export default function NewDestinationPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Destination" description="Create a new destination" />
      <div className="rounded-xl border bg-card p-6">
        <DestinationForm />
      </div>
    </div>
  )
}
