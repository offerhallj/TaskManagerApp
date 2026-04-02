import type { UIElement } from "../interfaces/UIElement.js";
import { Task } from "../tasks/Task.js";
export declare class TaskElementFactory {
    private _type;
    constructor(type: TaskElementType);
}
export declare enum TaskElementType {
    Basic = 0,
    Urgent = 1
}
export declare abstract class TaskElement implements UIElement {
    protected _task: Task;
    constructor(task: Task);
    abstract create(): HTMLElement;
}
//# sourceMappingURL=TaskElementFactory.d.ts.map