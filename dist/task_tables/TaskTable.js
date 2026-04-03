import { TaskHeader } from "./TaskHeader.js";
export class TaskTable {
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
        return th;
    }
}
//# sourceMappingURL=TaskTable.js.map