export const TaskType = {
  LAUNCH_BROWSER: 'LAUNCH_BROWSER',
  PAGE_TO_HTML: 'PAGE_TO_HTML',
  EXTRACT_ELEMENT_FROM_HTML: 'EXTRACT_ELEMENT_FROM_HTML',
} as const

export type TaskType = (typeof TaskType)[keyof typeof TaskType]

export const TaskParamType = {
  STRING: 'STRING',
  BROWSER_INSTANCE: 'BROWSER_INSTANCE',
} as const

export type TaskParamType = (typeof TaskParamType)[keyof typeof TaskParamType]

export interface TaskParam {
  name: string
  type: TaskParamType
  helperText?: string
  required?: boolean
  hideHandle?: boolean

  [key: string]: any
}
