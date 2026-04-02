import type { UIElement } from "../../../dist/interfaces/UIElement.js";
import { Task } from "../../../dist/tasks/Task.js";
export declare abstract class TaskElement implements UIElement {
    protected _task: Task;
    constructor(task: Task);
    abstract create(): HTMLElement;
}
//# sourceMappingURL=TaskElement.d.ts.map