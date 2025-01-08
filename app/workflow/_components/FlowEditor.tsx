'use client'

import { Workflow } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import NodeComponent from '@/app/workflow/_components/nodes/NodeComponent'
import { useEffect } from 'react'

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
}

const snapGrid: [number, number] = [25, 25]
const fitViewOptions = { padding: 2 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState([])
  const [edges, setEdges, onEdgeChange] = useEdgesState([])
  const { setViewport } = useReactFlow()

  useEffect(() => {
    try {
      const parsedWorkflow = JSON.parse(workflow.definition)
      if (!parsedWorkflow) return
      setNodes(parsedWorkflow.nodes || [])
      setEdges(parsedWorkflow.edges || [])
      if (!parsedWorkflow.viewport) return
      const { x = 1, y = 1, zoom = 1 } = parsedWorkflow.viewport
      setViewport({ x, y, zoom })
    } catch (e) {
      console.error('Failed to parse workflow', e)
    }
  }, [workflow.definition, setNodes, setEdges, setViewport])
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
