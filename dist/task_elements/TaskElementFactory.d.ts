import { TaskElement } from "./TaskElement.js";
import { Task } from "../tasks/Task.js";
export declare class TaskElementFactory {
    private _type;
    private _onEdit;
    private _onDelete;
    constructor(type: TaskElementType, onEdit: (element: TaskElement) => void, onDelete: (element: TaskElement) => void);
    create(task: Task): TaskElement;
}
export declare enum TaskElementType {
    Basic = 0,
    Urgent = 1
}
//# sourceMappingURL=TaskElementFactory.d.ts.map