import type { UIElement } from "../../dist/interfaces/UIElement.js";
import { Task } from "../../dist/tasks/Task.js";
export declare abstract class TaskElement implements UIElement {
    readonly Task: Task;
    protected _element: HTMLElement;
    protected edit: ((element: TaskElement) => void);
    protected delete: ((element: TaskElement) => void);
    set onEdit(callback: (element: TaskElement) => void);
    set onDelete(callback: (element: TaskElement) => void);
    constructor(task: Task);
    get Element(): HTMLElement;
    abstract create(): HTMLElement;
}
//# sourceMappingURL=TaskElement.d.ts.map