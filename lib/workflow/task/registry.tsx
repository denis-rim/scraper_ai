import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser'
import { PageToHtmlTask } from '@/lib/workflow/task/PageToHtml'
import { ExtractTextFromElementTask } from '@/lib/workflow/task/ExtractTextFromElementTask'
import { TaskType } from '@/types/task'
import { WorkflowTask } from '@/types/workflow'

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K }
}

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_ELEMENT_FROM_HTML: ExtractTextFromElementTask,
}
