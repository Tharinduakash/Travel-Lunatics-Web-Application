import { cn } from '@/lib/utils'

const statusConfig: Record<string, { label: string; className: string }> = {
  pending:   { label: 'Pending',   className: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800' },
  unread:    { label: 'Unread',    className: 'bg-orange-100 text-orange-800' },
  read:      { label: 'Read',      className: 'bg-gray-100 text-gray-700' },
  replied:   { label: 'Replied',   className: 'bg-green-100 text-green-800' },
  archived:  { label: 'Archived',  className: 'bg-slate-100 text-slate-600' },
  approved:  { label: 'Approved',  className: 'bg-green-100 text-green-800' },
  rejected:  { label: 'Rejected',  className: 'bg-red-100 text-red-800' },
  active:    { label: 'Active',    className: 'bg-green-100 text-green-800' },
  inactive:  { label: 'Inactive',  className: 'bg-gray-100 text-gray-700' },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-700' }
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', config.className)}>
      {config.label}
    </span>
  )
}
