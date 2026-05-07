import { PackageForm } from '@/components/admin/package-form'
import { PageHeader } from '@/components/admin/page-header'

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Tour Package" description="Create a new tour package" />
      <div className="rounded-xl border bg-card p-6">
        <PackageForm />
      </div>
    </div>
  )
}
