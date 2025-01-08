'use client'

import { useReactFlow } from '@xyflow/react'
import { TaskParam, TaskParamType } from '@/types/task'
import StringParam from '@/app/workflow/_components/nodes/param/StringParam'
import { AppNode } from '@/types/appNode'
import { useCallback } from 'react'

function NodeParamField({ param, nodeId }: { param: TaskParam; nodeId: string }) {
  const { updateNodeData, getNode } = useReactFlow()

  const node = getNode(nodeId) as AppNode
  const value = node?.data.inputs[param.name]

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        ...node.data,
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      })
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs],
  )

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      )
    default:
      return (
        <div className="w-full">
          <div className="text-sm text-muted-foreground ">
            Unknown param type: {param.type}
          </div>
        </div>
      )
  }
}

export default NodeParamField
