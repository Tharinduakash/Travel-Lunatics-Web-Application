import { ExperienceForm } from '@/components/admin/experience-form'
import { PageHeader } from '@/components/admin/page-header'

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Experience" description="Create a new experience" />
      <div className="rounded-xl border bg-card p-6">
        <ExperienceForm />
      </div>
    </div>
  )
}
