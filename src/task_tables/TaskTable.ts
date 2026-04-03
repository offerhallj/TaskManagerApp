import type { UIElement } from "../interfaces/UIElement.js";
import type { TaskElement } from "../task_elements/TaskElement.js";
import { canSort, Order } from "../utils/TaskSorter.js";
import { TaskHeader } from "./TaskHeader.js";

export abstract class TaskTable implements UIElement {
    private static _activeHeaderElement: HTMLElement | undefined;
    Element: HTMLElement;
    Body!: HTMLElement;
    
    public onSort!: ((header: TaskHeader, order: Order) => void);
    public sort(header: TaskHeader, order: Order): void { this.onSort(header, order); }

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
        this.addHeaderSort(header, th);
        return th;
    }

    private addHeaderSort(header: TaskHeader, th: HTMLElement) {
        if (!canSort(header)) return; 
        
        th.addEventListener("click", () => {
            if (TaskTable._activeHeaderElement != undefined && th != TaskTable._activeHeaderElement) {
                TaskTable._activeHeaderElement.classList.remove("asc");
                TaskTable._activeHeaderElement.classList.remove("dsc");
            }

            let order: Order = Order.Asc;
            if (th.classList.contains("asc")) {
                th.classList.remove("asc");
                th.classList.add("dsc");
                order = Order.Desc;
            }

            else {
                th.classList.remove("dsc");
                th.classList.add("asc");
            }
            
            TaskTable._activeHeaderElement = th;
            this.sort(header, order);
        });
    }

    public filterElements(elements: TaskElement[]) {
        for (let element of elements) {
            if (!element.isFilteredOut) continue;
            this.Body.removeChild(element.Element);
        }
    }
}