import { ExperienceForm } from '@/components/admin/experience-form'
import { PageHeader } from '@/components/admin/page-header'
import sql from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const [exp] = await sql`SELECT * FROM experiences WHERE id = ${params.id}`
  if (!exp) notFound()

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Experience" description={exp.title} />
      <div className="rounded-xl border bg-card p-6">
        <ExperienceForm initialData={exp} isEdit />
      </div>
    </div>
  )
}
