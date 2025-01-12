'use client'

import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import UseExecutionPlan from '@/components/hooks/useExecutionPlan'

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generate = UseExecutionPlan()
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate()
        console.log('--- plan ---')
        console.table(plan)
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  )
}

export default ExecuteButton
