import { z } from 'zod'

export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(80),
  description: z.string().min(1).max(160).optional(),
})
