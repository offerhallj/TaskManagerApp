import type { TaskDetail } from "./TaskDetail.js";
import type { UIElement } from "../interfaces/UIElement.js";
import { Task } from "../tasks/Task.js";
export declare abstract class TaskElement implements UIElement {
    static details: TaskDetail[];
    readonly Task: Task;
    Element: HTMLElement;
    onEdit: ((element: TaskElement) => void);
    onDelete: ((element: TaskElement) => void);
    onSetStatus: ((element: TaskElement) => void);
    edit(element: TaskElement): void;
    delete(element: TaskElement): void;
    setStatus(element: TaskElement): void;
    constructor(task: Task);
    abstract create(): HTMLElement;
    protected createCellForValue(val: string): HTMLElement;
    protected createButtonCell(): HTMLElement;
    protected createEditButton(): HTMLElement;
    protected createDeleteButton(): HTMLElement;
    get isFilteredOut(): boolean;
    protected createHTMLElement(element: string, ...classes: string[]): HTMLElement;
    protected createImage(res: string, width: number, ...classes: string[]): HTMLImageElement;
    protected createParentElement(type: string): HTMLElement;
    protected createDetailContent(): HTMLElement;
    protected createTagElement(): HTMLElement;
    protected createTextElement(type: string, content: string): HTMLElement;
    protected createActionContainer(type: string): HTMLElement;
    protected createActionButton(label: string, rsc: string, action: () => void, withLabel?: boolean): HTMLElement;
    protected createStatusSetter(rsc: string): HTMLElement;
    private createStatusOption;
}
//# sourceMappingURL=TaskElement.d.ts.map