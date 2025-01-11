'use client'

import { Workflow } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
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
import { TaskRegistry } from '@/lib/workflow/task/registry'

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
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

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
    [screenToFlowPosition, setNodes],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges))
      if (!connection.targetHandle) return

      //   Remove input value if is present on connection
      const node = nodes.find((node) => node.id === connection.target)
      if (!node) return

      const nodeInputs = node.data.inputs
      delete nodeInputs[connection.targetHandle]
      updateNodeData(node.id, { inputs: nodeInputs })
    },
    [setEdges, nodes, updateNodeData],
  )

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self connections allowed
      if (connection.source === connection.target) {
        return false
      }
      // Same taskParam type connections are not allowed
      const sourceNode = nodes.find((node) => node.id === connection.source)
      const targetNode = nodes.find((node) => node.id === connection.target)
      if (!sourceNode || !targetNode) {
        console.error('Source or target node not found')
        return false
      }

      const sourceTask = TaskRegistry[sourceNode.data.type]
      const targetTask = TaskRegistry[targetNode.data.type]
      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle,
      )
      const output = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle,
      )

      if (input?.type !== output?.type) {
        console.error('Invalid connection: type mismatch')
        return false
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false
        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true
          if (hasCycle(outgoer, visited)) return true
        }
      }
      return !hasCycle(targetNode)
    },
    [edges, nodes],
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
        isValidConnection={isValidConnection}
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
