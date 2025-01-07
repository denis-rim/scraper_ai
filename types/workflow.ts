export const WorkflowStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const

export type WorkflowStatusType = (typeof WorkflowStatus)[keyof typeof WorkflowStatus]
