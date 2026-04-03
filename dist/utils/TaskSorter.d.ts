import { TaskElement } from "../task_elements/TaskElement";
import { TaskHeader } from "../task_tables/TaskHeader";
export declare function sort(header: TaskHeader, elements: TaskElement[], order?: Order): TaskElement[] | undefined;
export declare function canSort(header: TaskHeader): boolean;
export declare enum Order {
    Asc = 0,
    Desc = 1
}
//# sourceMappingURL=TaskSorter.d.ts.map