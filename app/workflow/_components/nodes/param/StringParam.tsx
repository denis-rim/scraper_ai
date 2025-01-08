'use client'

import { useId, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ParamProps } from '@/types/appNode'

function StringParam({ param, updateNodeParamValue, value }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value || '')
  const id = useId()
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Input
        id={id}
        className="text-sm"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(internalValue)}
      />
      {param.helperText && <p className="text-muted-foreground">{param.helperText}</p>}
    </div>
  )
}

export default StringParam
