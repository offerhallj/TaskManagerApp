import { TaskElement } from "../task_elements/TaskElement.js";
import { TaskDetail } from "../task_elements/TaskDetail.js";
/** SOrts the given taskElement list according the speciied taskDetail and order */
export declare function sort(header: TaskDetail, elements: TaskElement[], order: Order): TaskElement[] | undefined;
/** Returns true if the given taskDetail is able to be sorted */
export declare function canSort(header: TaskDetail): boolean;
/** Defines the order in which task elements are to be sorted */
export declare enum Order {
    Asc = "Asc",
    Desc = "Desc"
}
//# sourceMappingURL=TaskSorter.d.ts.map