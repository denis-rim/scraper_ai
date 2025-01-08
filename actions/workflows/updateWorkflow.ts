'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { WorkflowStatus } from '@/types/workflow'

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string
  definition: string
}) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('User not authenticated')
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id, userId },
  })

  if (!workflow) {
    throw new Error('Failed to update workflow')
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('Cannot update published workflow')
  }

  await prisma.workflow.update({
    where: { id, userId },
    data: { definition },
  })
}
