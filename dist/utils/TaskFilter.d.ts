import { TaskDetail } from "../task_elements/TaskDetail.js";
import { Task } from "../tasks/Task.js";
/** Checks the current Task against the filters in the current View to determine if the task should be visible in the taskview or filtered out */
export declare function isFilteredOut(task: Task): boolean;
/** Returns true if the provided TaskDetail is a valid filter in the searchbar */
export declare function canFilter(header: TaskDetail): boolean;
//# sourceMappingURL=TaskFilter.d.ts.map