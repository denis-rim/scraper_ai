import { LucideProps, TextIcon } from 'lucide-react'
import { TaskParamType, TaskType } from '@/types/task'

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_ELEMENT_FROM_HTML,
  label: 'Extract text from element',
  icon: (props: LucideProps) => <TextIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'Extracted text',
      type: TaskParamType.STRING,
    },
  ],
}
