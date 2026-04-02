import { TaskDisplayType } from "../task_tables/TaskTableFactory.js";
import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
export declare class TaskElementFactory {
    private _type;
    private _onEdit;
    private _onDelete;
    constructor(type: TaskDisplayType, onEdit: (element: TaskElement) => void, onDelete: (element: TaskElement) => void);
    setDisplayType(type: TaskDisplayType): void;
    create(task: Task): TaskElement;
    /** Convert an existing list of taskElements to a new list according to the current display type */
    convertElements(taskElements: TaskElement[]): TaskElement[];
}
//# sourceMappingURL=TaskElementFactory.d.ts.map