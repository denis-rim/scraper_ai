'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import useFlowValidation from '@/components/hooks/useFlowValidation'

function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  children: ReactNode
  nodeId: string
  isSelected: boolean
}) {
  const { getNode, setCenter } = useReactFlow()
  const { invalidInputs } = useFlowValidation()
  const hasInvalidInputs = invalidInputs.some((input) => input.nodeId === nodeId)

  const onDoubleClick = () => {
    const node = getNode(nodeId)
    if (!node) return

    const { position, measured } = node

    if (!measured || !measured) return

    const { width, height } = measured
    const x = position.x + width! / 2
    const y = position.y + height! / 2

    if (x === undefined || y === undefined) return

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    })
  }

  return (
    <div
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-sm flex flex-col',
        isSelected && 'border-primary',
        hasInvalidInputs && 'border-destructive border-2',
      )}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  )
}

export default NodeCard
