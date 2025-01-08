'use client'

import { useRouter } from 'next/navigation'
import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import SaveButton from '@/app/workflow/_components/topbar/SaveButton'

interface Props {
  title: string
  subTitle?: string
  workflowId: string
}

function TopBar({ title, subTitle, workflowId }: Props) {
  const router = useRouter()
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full sticky bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
        <div className="flex gap-1 flex-1 justify-end">
          <SaveButton workflowId={workflowId} />
        </div>
      </div>
    </header>
  )
}

export default TopBar
