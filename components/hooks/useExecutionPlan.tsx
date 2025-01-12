import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'
import { FlowToExecutionPlan } from '@/lib/workflow/FlowToExecutionPlan'
import { AppNode } from '@/types/appNode'

const useExecutionPlan = () => {
  const { toObject } = useReactFlow()

  return useCallback(() => {
    const { nodes, edges } = toObject()
    const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges)
    return executionPlan
  }, [toObject])
}

export default useExecutionPlan
