import type { UIElement } from "../interfaces/UIElement.js";
import { TaskHeader } from "./TaskHeader.js";

export abstract class TaskTable implements UIElement {
    Element: HTMLElement;
    Body!: HTMLElement;

    constructor() {
        this.Element = this.create();
    }

    abstract create(): HTMLElement;

    protected getTableWithHeaders(...headers: TaskHeader[]): HTMLElement {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        for (let header of headers) {
            tr.appendChild(this.createHeaderElement(header));
        }

        thead.appendChild(tr);
        table.appendChild(thead);
        this.Body = document.createElement("tbody");
        table.appendChild(this.Body);
        return table;
    }

    protected createHeaderElement(header: TaskHeader): HTMLElement {
        let th = document.createElement("th");
        th.textContent = header;
        return th;
    }
}