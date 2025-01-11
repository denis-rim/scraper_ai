'use client'

import { useEffect, useId, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ParamProps } from '@/types/appNode'
import { Textarea } from '@/components/ui/textarea'

function StringParam({ param, updateNodeParamValue, value, disabled }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value || '')
  const id = useId()

  let Component: any = Input
  if (param.variant === 'textarea') {
    Component = Textarea
  }

  useEffect(() => {
    setInternalValue(value || '')
  }, [value])
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-sm"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && <p className="text-muted-foreground">{param.helperText}</p>}
    </div>
  )
}

export default StringParam
