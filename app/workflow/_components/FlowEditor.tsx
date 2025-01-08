'use client'

import { Workflow } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import NodeComponent from '@/app/workflow/_components/nodes/NodeComponent'

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
}

const snapGrid: [number, number] = [25, 25]
const fitViewOptions = { padding: 2 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ])
  const [edges, setEdges, onEdgeChange] = useEdgesState([])
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
