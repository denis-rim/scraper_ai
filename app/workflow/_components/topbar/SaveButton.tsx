'use client'

import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import { useReactFlow } from '@xyflow/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow'

function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow()
  const { isPending, mutate } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success('Workflow saved successfully', { id: 'save-workflow' })
    },
    onError: () => {
      toast.error('Failed to save workflow', { id: 'save-workflow' })
    },
  })

  const handleSaveWorkflow = async () => {
    toast.loading('Saving workflow...', { id: 'save-workflow' })
    const workflow = JSON.stringify(toObject())
    mutate({ id: workflowId, definition: workflow })
  }
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => handleSaveWorkflow()}
      disabled={isPending}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  )
}

export default SaveButton
