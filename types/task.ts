export const TaskType = {
  LAUNCH_BROWSER: 'LAUNCH_BROWSER',
} as const

export type TaskType = (typeof TaskType)[keyof typeof TaskType]

export const TaskParamType = {
  STRING: 'STRING',
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
