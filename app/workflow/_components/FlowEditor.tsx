'use client'

import { Workflow } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { DeletableEdge } from '@/app/workflow/_components/edges/DeletableEdge'
import NodeComponent from '@/app/workflow/_components/nodes/NodeComponent'
import React, { useCallback, useEffect } from 'react'
import { AppNode } from '@/types/appNode'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
}

const edgeTypes = {
  default: DeletableEdge,
}

const snapGrid: [number, number] = [25, 25]
const fitViewOptions = { padding: 2 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>([])
  const { setViewport, screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const taskType = event.dataTransfer.getData('application/reactflow')
      if (typeof taskType === undefined || !taskType) return

      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
      const newNode = CreateFlowNode(taskType as TaskType, position)
      setNodes((nodes) => nodes.concat(newNode))
    },
    [setNodes],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges))
    },
    [setEdges],
  )

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
        edgeTypes={edgeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
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
