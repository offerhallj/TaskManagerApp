import { canSort, Order } from "../utils/TaskSorter.js";
import { TaskHeader } from "./TaskHeader.js";
export class TaskTable {
    sort(header, order) { this.onSort(header, order); }
    constructor() {
        this.Element = this.create();
    }
    getTableWithHeaders(...headers) {
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
    createHeaderElement(header) {
        let th = document.createElement("th");
        th.textContent = header;
        this.addHeaderSort(header, th);
        return th;
    }
    addHeaderSort(header, th) {
        if (!canSort(header))
            return;
        th.addEventListener("click", () => {
            if (TaskTable._activeHeaderElement != undefined && th != TaskTable._activeHeaderElement) {
                TaskTable._activeHeaderElement.classList.remove("asc");
                TaskTable._activeHeaderElement.classList.remove("dsc");
            }
            let order = Order.Asc;
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
    filterElements(elements) {
        for (let element of elements) {
            if (!element.isFilteredOut)
                continue;
            this.Body.removeChild(element.Element);
        }
    }
}
//# sourceMappingURL=TaskTable.js.map