import { TaskType } from '@/types/task'
import { AppNode } from '@/types/appNode'

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number },
): AppNode {
  return {
    id: crypto.randomUUID(),
    dragHandle: '.drag-handle',
    type: 'FlowScrapeNode',
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 0, y: 0 },
  }
}
