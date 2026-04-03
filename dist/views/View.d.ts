import { TaskDetail } from "../task_elements/TaskDetail.js";
import { TaskStatus, TaskPriority } from "../tasks/Task.js";
import { Order } from "../utils/TaskSorter.js";
/** Saves the sorting and filtering preferences of the task table */
export declare class View {
    id: number | undefined;
    user: string;
    statusFilters: Map<TaskStatus, boolean>;
    priorityFilters: Map<TaskPriority, boolean>;
    sortHeader: TaskDetail;
    sortOrder: Order;
    searchFilter: TaskDetail;
    searchValue: string;
}
//# sourceMappingURL=View.d.ts.map