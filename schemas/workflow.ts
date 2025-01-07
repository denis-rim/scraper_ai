import { z } from 'zod'

export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(80),
  description: z.string().max(160).optional(),
})

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>
