'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TaskType } from '@/types/task'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { Button } from '@/components/ui/button'

export function TaskMenu() {
  return (
    <aside className="w-[340px min-w-[340px] max-w-[3400px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion type="multiple" className="w-full" defaultValue={['extraction']}>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">Data Extraction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuButton taskType={TaskType.EXTRACT_ELEMENT_FROM_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType]
  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      onDragStart={(event) => onDragStart(event, taskType)}
      draggable
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  )
}
