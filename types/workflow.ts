import { LucideProps } from 'lucide-react'
import { TaskParam, TaskType } from '@/types/task'

export const WorkflowStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const

export type WorkflowStatusType = (typeof WorkflowStatus)[keyof typeof WorkflowStatus]

export type WorkflowTask = {
  label: string
  icon: React.FC<LucideProps>
  type: TaskType
  isEntryPoint?: boolean
  inputs: TaskParam[]
  outputs: TaskParam[]
  credits: number
}
