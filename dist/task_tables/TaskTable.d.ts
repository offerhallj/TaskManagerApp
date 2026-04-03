import type { UIElement } from "../interfaces/UIElement.js";
import { TaskHeader } from "./TaskHeader.js";
export declare abstract class TaskTable implements UIElement {
    Element: HTMLElement;
    Body: HTMLElement;
    constructor();
    abstract create(): HTMLElement;
    protected getTableWithHeaders(...headers: TaskHeader[]): HTMLElement;
    protected createHeaderElement(header: TaskHeader): HTMLElement;
}
//# sourceMappingURL=TaskTable.d.ts.map