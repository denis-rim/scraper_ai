import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser'
import { PageToHtmlTask } from '@/lib/workflow/task/PageToHtml'
import { ExtractTextFromElementTask } from '@/lib/workflow/task/ExtractTextFromElementTask'

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_ELEMENT_FROM_HTML: ExtractTextFromElementTask,
}
