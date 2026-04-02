import type { UIElement } from "../interfaces/UIElement.js";
import { Task } from "../tasks/Task.js";
export declare abstract class TaskElement implements UIElement {
    readonly Task: Task;
    Element: HTMLElement;
    onEdit: ((element: TaskElement) => void);
    onDelete: ((element: TaskElement) => void);
    edit(element: TaskElement): void;
    delete(element: TaskElement): void;
    constructor(task: Task);
    abstract create(): HTMLElement;
    protected createCellForValue(val: string): HTMLElement;
    protected createButtonCell(): HTMLElement;
    protected createEditButton(): HTMLElement;
    protected createDeleteButton(): HTMLElement;
}
//# sourceMappingURL=TaskElement.d.ts.map