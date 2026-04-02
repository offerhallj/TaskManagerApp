import { Task } from "../../dist/tasks/Task.js";
export declare class TaskElementFactory {
    private _type;
    constructor(type: TaskElementType);
    create(task: Task): TaskElement;
}
export declare enum TaskElementType {
    Basic = 0,
    Urgent = 1
}
//# sourceMappingURL=TaskElementFactory.d.ts.map