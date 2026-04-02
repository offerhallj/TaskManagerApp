import { TaskElement } from "../../../dist/tasks/task_elements/TaskElementFactory.js";
export class BasicTaskElement extends TaskElement {
    create() {
        const tr = document.createElement("tr");
        tr.appendChild(this.createCellForValue(this._task.title));
        tr.appendChild(this.createCellForValue(this._task.description));
        tr.appendChild(this.createCellForValue(this._task.dueDate.toDateString()));
        tr.appendChild(this.createCellForValue(this._task.priority));
        tr.appendChild(this.createCellForValue(this._task.status));
        const buttonCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => { });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => { });
        buttonCell.appendChild(editButton);
        buttonCell.appendChild(deleteButton);
        tr.appendChild(buttonCell);
        return tr;
    }
    createCellForValue(val) {
        let td = document.createElement("td");
        td.textContent = val;
        return td;
    }
}
//# sourceMappingURL=BasicTaskElement.js.map