import { TaskDetail } from "../task_elements/TaskDetail.js";
import { TaskStatus, TaskPriority } from "../tasks/Task.js";
import { Order } from "../utils/TaskSorter.js";

// I referenced this post to initiaize the map with initial values
// https://stackoverflow.com/questions/41769955/initialize-a-map-containing-arrays-in-typescript
/** Saves the sorting and filtering preferences of the task table */
export class View {
    public id: number | undefined;
    public user: string = "";
    
    public statusFilters: Map<TaskStatus, boolean> = new Map<TaskStatus, boolean>([
        [TaskStatus.InProgress, true],
        [TaskStatus.Complete, true],
        [TaskStatus.ToDo, true]
    ]);

    public priorityFilters: Map<TaskPriority, boolean> = new Map<TaskPriority, boolean>([
        [TaskPriority.High, true],
        [TaskPriority.Medium, true],
        [TaskPriority.Low, true]
    ]);

    public sortHeader: TaskDetail = TaskDetail.CreatedDate;
    public sortOrder: Order = Order.Desc;

    public searchFilter: TaskDetail = TaskDetail.Title;
    public searchValue: string = "";
}