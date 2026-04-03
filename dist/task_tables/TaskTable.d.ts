import type { UIElement } from "../interfaces/UIElement.js";
import type { TaskElement } from "../task_elements/TaskElement.js";
import { Order } from "../utils/TaskSorter.js";
import { TaskHeader } from "./TaskHeader.js";
export declare abstract class TaskTable implements UIElement {
    private static _activeHeaderElement;
    Element: HTMLElement;
    Body: HTMLElement;
    onSort: ((header: TaskHeader, order: Order) => void);
    sort(header: TaskHeader, order: Order): void;
    constructor();
    abstract create(): HTMLElement;
    protected getTableWithHeaders(...headers: TaskHeader[]): HTMLElement;
    protected createHeaderElement(header: TaskHeader): HTMLElement;
    private addHeaderSort;
    filterElements(elements: TaskElement[]): void;
}
//# sourceMappingURL=TaskTable.d.ts.map