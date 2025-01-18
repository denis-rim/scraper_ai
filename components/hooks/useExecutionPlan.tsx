import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'
import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from '@/lib/workflow/FlowToExecutionPlan'
import { AppNode } from '@/types/appNode'
import useFlowValidation from '@/components/hooks/useFlowValidation'
import { toast } from 'sonner'

const useExecutionPlan = () => {
  const { toObject } = useReactFlow()
  const { setInvalidInputs, clearErrors } = useFlowValidation()

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('No entry point found')
          break
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          setInvalidInputs(error.invalidElements)
          toast.error('Invalid inputs found')
          break
        default:
          toast.error('An error occurred')
          break
      }
    },
    [setInvalidInputs],
  )

  return useCallback(() => {
    const { nodes, edges } = toObject()
    const { executionPlan, error } = FlowToExecutionPlan(nodes as AppNode[], edges)

    if (error) {
      handleError(error)
      return null
    }

    clearErrors()
    return executionPlan
  }, [clearErrors, handleError, toObject])
}

export default useExecutionPlan
